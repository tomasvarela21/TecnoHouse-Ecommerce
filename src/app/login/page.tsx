"use client";

import React, { useState } from 'react';
import { auth, db } from '@/lib/firebaseConfig'; // Asegúrate de importar Firestore
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';

const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Verificar el rol en Firestore
      const role = await getUserRole(user.email || ''); // Asegúrate de que no sea null
      if (role === 'admin') {
        window.location.href = '/admin'; // Redirigir a la página de administración
      } else {
        window.location.href = '/'; // Redirigir al home después del login
      }
    } catch (e) {
      setError('Usuario o contraseña incorrectos.');
    }
  };

  const handleRegister = async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Agregar el usuario a Firestore
      await addDoc(collection(db, 'users'), {
        email: user.email,
        role: 'user', // Asigna el rol por defecto o cambia según sea necesario
        createdAt: new Date(), // Guarda la fecha actual
      });

      window.location.href = '/'; // Redirigir al home después del registro
    } catch (e) {
      setError('Error al registrar el usuario.');
    }
  };

  const getUserRole = async (email: string) => {
    const usersCollection = collection(db, 'users');
    const q = query(usersCollection, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      return userDoc.data().role; // Retorna el rol del usuario
    }
    
    return null; // No se encontró el usuario
  };

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-center bg-gray-100 container mx-auto px-4 py-6">
        <form onSubmit={handleLogin} className="bg-white shadow-lg rounded-lg p-8 flex flex-col space-y-4">
          <h2 className="text-2xl font-semibold text-center">Iniciar Sesión</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit" 
            className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 transition duration-200"
          >
            Ingresar
          </button>
          <p className="text-center">
            ¿No tienes una cuenta? 
            <button 
              type="button" 
              onClick={handleRegister} 
              className="text-blue-600 hover:underline mx-2"
            >
              Registrarse
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
