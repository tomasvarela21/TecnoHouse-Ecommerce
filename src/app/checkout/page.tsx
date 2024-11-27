// src/app/checkout/page.tsx
"use client"
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';

export default function Checkout() {
  const cartContext = useContext(CartContext);

  // Verificamos si el contexto existe antes de usarlo
  if (!cartContext) {
    return <p>Error: el contexto del carrito no está disponible.</p>;
  }

  const { cart } = cartContext;

  // Calcular el precio total basado en los productos del carrito
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      {cart.length === 0 ? (
        <p>No tienes productos en tu carrito.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between py-2 border-b">
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)} x {item.quantity}</span>
              </li>
            ))}
          </ul>
          <p className="text-right font-bold mt-4">
            Total: ${totalPrice.toFixed(2)}
          </p>
          <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600">
            Confirmar Compra
          </button>
        </>
      )}
    </div>
  );
}
