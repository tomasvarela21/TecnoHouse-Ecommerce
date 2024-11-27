// pages/search/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { db } from '@/lib/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import ProductCard from '@/components/ProductCard';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    ImageUrl: string;
  }
  
const SearchResultsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const productsRef = collection(db, 'products');
        const q = query(productsRef, where('name', '>=', queryParam), where('name', '<=', queryParam + '\uf8ff'));
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(productsData);
      } catch (error) {
        console.error('Error al obtener los resultados de búsqueda:', error);
      } finally {
        setLoading(false);
      }
    };

    if (queryParam) {
      fetchSearchResults();
    }
  }, [queryParam]);

  if (loading) {
    return <p>Cargando resultados...</p>;
  }

  if (!products.length) {
    return <p>No se encontraron productos para la búsqueda: "{queryParam}"</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Resultados de búsqueda para: "{queryParam}"</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            imageUrl={product.ImageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
