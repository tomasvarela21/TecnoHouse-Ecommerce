// components/ProtectedRoute.tsx
"use client";

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { getUserRole } from '@/lib/userService';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Agregamos un estado de carga

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const role = await getUserRole(user.email || '');
        if (role !== 'admin') {
          router.push('/'); // Redirige a la página de inicio si no es admin
        } else {
          setLoading(false); // Si es admin, ya no está cargando
        }
      } else {
        router.push('/'); // Redirige a la página de inicio si no está autenticado
      }
    });

    return () => unsubscribe(); // Cleanup del listener
  }, [router]);

  if (loading) {
    return <div>Cargando...</div>; // Puedes agregar un spinner o un mensaje de carga aquí
  }

  return <>{children}</>; // Renderiza los hijos si el acceso está permitido
};

export default ProtectedRoute;
