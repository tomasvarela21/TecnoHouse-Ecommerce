// Componente para items en el carrito
// src/components/CartItem.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const CartItem: React.FC<CartItemProps> = ({ id, name, price, quantity, imageUrl }) => {
  const { removeFromCart } = useCart();

  const handleRemove = () => {
    removeFromCart(id);
  };

  return (
    <div className="flex items-center border-b py-4">
      <img src={imageUrl} alt={name} className="w-16 h-16 object-cover mr-4" />
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-700">Precio: ${price.toFixed(2)}</p>
        <p className="text-gray-700">Cantidad: {quantity}</p>
      </div>
      <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={handleRemove}>
        Eliminar
      </Button>
    </div>
  );
};

export default CartItem;
