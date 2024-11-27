import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  ImageUrl: string;
}

interface ProductCardDetailProps {
  product: Product;
  onAddToCart: (product: { id: string; name: string; ImageUrl: string; price: number; quantity: number }) => void;
}

const ProductCardDetail: React.FC<ProductCardDetailProps> = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    // Llamar a la función onAddToCart para agregar el producto al carrito
    onAddToCart({
      id: product.id,
      name: product.name,
      ImageUrl: product.ImageUrl,
      price: product.price,
      quantity: 1,
    });

    // Mostrar el toast con el nombre del producto agregado
    toast(`${product.name} agregado al carrito`, {
      description: `Se ha agregado "${product.name}" a tu carrito de compras.`,
    });
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch bg-gray-100 p-4 rounded-lg shadow-lg">
      <img
        src={product.ImageUrl}
        alt={product.name}
        className="w-96 h-96 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
      />
      <div className="flex flex-col bg-white p-4 rounded-lg shadow-md justify-between w-full">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">{product.name}</h1>
        <p className="text-gray-700 mb-2">{product.description}</p>
        <p className="text-2xl font-semibold text-blue-600 mb-4">${product.price.toFixed(2)}</p>
        <Button
          className="bg-blue-400 hover:bg-blue-600 text-white rounded-xl py-2 px-4 transition duration-200"
          onClick={handleAddToCart}
        >
          Agregar al Carrito
        </Button>
      </div>
    </div>
  );
};

export default ProductCardDetail;
