"use client";
import "../../styles/globals.css";
import { ShoppingCartIcon, EnvelopeIcon, UserCircleIcon, HomeIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { ReactNode, useState } from "react";
import { CartProvider, useCart } from "@/context/CartContext";
import Link from "next/link";
import SearchBar from '@/components/SearchBar';
import { Toaster } from "@/components/ui/sonner";
import CartPage from "@/app/cart/page";
import logo from 'src\TecnoHouse-Logo.png';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isCartOpen, setCartOpen] = useState(false);

  // Alterna el estado del carrito para abrir/cerrar
  const handleCartToggle = () => {
    setCartOpen((prev) => !prev);
  };

  return (
    <CartProvider>
      <html lang="es">
        <body className="bg-gray-100 flex flex-col min-h-screen">
          <header className="bg-gray-200  shadow">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              {/* Título con logo */}
              <div className="flex items-center space-x-2">
              <img
                src="/Logo.png" // Cambia esta ruta si usas importación
                alt="Logo de TecnoHouse"
                className="h-17 w-17 md:h-20 md:w-20 object-contain" // Ajusta el tamaño del logo
              />
             {/* <h1 className="text-3xl font-bold text-gray-600">TecnoHouse</h1>
           */}</div>
             
              <SearchBar />  {/* Barra de búsqueda centrada */}

              {/* Secciones de navegación */}
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <Button asChild variant="link" className="flex items-center hover:underline">
                      <Link href="/" className="flex items-center">
                        <HomeIcon className="h-5 w-5 mr-1" />
                        Inicio
                      </Link>
                    </Button>
                  </li>
                  <li>
                    <Button asChild variant="link" className="flex items-center hover:underline">
                      <Link href="/contacto" className="flex items-center">
                        <EnvelopeIcon className="h-5 w-5 mr-1" />
                        Contacto
                      </Link>
                    </Button>
                  </li>
                  <li>
                    <Button asChild variant="link" className="flex items-center hover:underline">
                      <Link href="/login" className="flex items-center">
                        <UserCircleIcon className="h-5 w-5 mr-1" />
                        Ingresar
                      </Link>
                    </Button>
                  </li>
                  <li>
                    {/* Este botón controla la apertura del carrito */}
                    <Button
                      onClick={handleCartToggle}
                      variant="link"
                      className="flex items-center hover:underline relative"
                    >
                      <ShoppingCartIcon className="h-5 w-5" />
                      <span className="ml-1">Carrito</span>
                      {/* Usar el hook useCart DENTRO del CartProvider para obtener el cartCount */}
                      <CartCountBadge />
                    </Button>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
  
          <main className="flex-grow">
            {children}
            {/* Renderizar la página del carrito solo si isCartOpen es true */}
            {isCartOpen && <CartPage isOpen={isCartOpen} onClose={() => setCartOpen(false)} />}
          </main>
          <Toaster />
          <Footer />
        </body>
      </html>
    </CartProvider>
  );
  
}  

// Componente que obtiene el conteo del carrito
function CartCountBadge() {
  const { cartCount } = useCart(); // Ahora esto se ejecuta DENTRO del CartProvider
  return (
    cartCount > 0 && (
      <span className="bg-black text-white rounded-full text-xs absolute top-4 right-0 transform translate-x-1/2 -translate-y-1/2 px-1">
        {cartCount}
      </span>
    )
  );
}
