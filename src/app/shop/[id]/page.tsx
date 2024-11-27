"use client";
import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useCart } from '@/context/CartContext';
import ProductCardDetail from '@/components/ProductCardDetail'; // Importamos el nuevo componente

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  ImageUrl: string;
}

interface ProductDetailPageProps {
  params: { id: string }; // Aseguramos que los parámetros incluyen el 'id'
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ params }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Agregamos manejo de errores
  const { id } = params; // Obtenemos el ID desde los parámetros
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const productRef = doc(db, 'products', id);
        const productSnapshot = await getDoc(productRef);

        if (productSnapshot.exists()) {
          setProduct({
            id: productSnapshot.id,
            ...productSnapshot.data(),
          } as Product);
        } else {
          setError('El producto no existe');
        }
      } catch (error) {
        setError('Error al obtener los detalles del producto. Inténtalo de nuevo más tarde.');
        console.error('Error al obtener los detalles del producto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">Cargando detalles del producto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">Producto no encontrado</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <ProductCardDetail product={product} onAddToCart={addToCart} /> {/* Usamos el nuevo componente aquí */}
    </div>
  );
};

export default ProductDetailPage;
