// src/components/ProductCard.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { toast } from "sonner"

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, description, price, imageUrl }) => {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart({
      id, name, price, quantity: 1, ImageUrl: imageUrl
    });

    // Mostrar el toast con el nombre del producto agregado
    toast(`${name} agregado al carrito`, {
      description: `Se ha agregado "${name}" a tu carrito de compras.`,
    });
  };
  const handleNavigateToDetail = () => {
    router.push(`/shop/${id}`);
  };

  return (
    <div 
      className="border p-4 rounded shadow bg-white flex flex-col cursor-pointer"
      onClick={handleNavigateToDetail}
    >
      <img 
        src={imageUrl} 
        alt={name} 
        className="w-full h-48 object-cover mb-4 rounded" 
      />
      <h2 className="text-xl font-bold">{name || 'Sin nombre'}</h2>
      <p className="text-gray-700 mb-2">{description || 'Sin descripción'}</p>
      <p className="text-lg font-semibold mb-2">
        ${price ? price.toFixed(2) : '0.00'}
      </p>
      <Button 
        className="mt-auto bg-blue-400 hover:bg-blue-600 rounded-xl" 
        onClick={(e) => {
          e.stopPropagation(); // Evitar que se dispare el evento de click del div
          handleAddToCart();
        }}
      >
        Agregar al Carrito
      </Button>
    </div>
  );
};

export default ProductCard;
