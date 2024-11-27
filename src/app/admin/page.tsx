// src/app/admin/page.tsx
"use client";

import React, { useState } from 'react';
import { storage } from '@/lib/firebaseConfig'; // Importa tu configuración de Firebase
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '@/lib/firebaseConfig'; // Asegúrate de importar Firestore
import { collection, setDoc, doc } from 'firebase/firestore'; // Cambia addDoc por setDoc
import { toast } from 'sonner';
import ProtectedRoute from '@/components/ProtectedRoute';

const AdminPage = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const handleAddProduct = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!image) {
      toast.error('Por favor selecciona una imagen.');
      return;
    }

    try {
      // Subir la imagen a Firebase Storage
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);

      // Obtener la URL de la imagen
      const imageUrl = await getDownloadURL(imageRef);

      // Agregar el producto a Firestore con un ID específico
      const productData = {
        name,
        description,
        price: parseFloat(price),
        ImageUrl: imageUrl,
      };

      // Utiliza setDoc para establecer la ID personalizada
      await setDoc(doc(db, 'products', id), productData);
      console.log('Documento escrito con ID: ', id);

      toast.success('Producto agregado exitosamente.');

      // Limpiar el formulario
      setId('');
      setName('');
      setDescription('');
      setPrice('');
      setImage(null);
    } catch (error) {
      console.error('Error agregando el producto: ', error);
      toast.error('Error al agregar el producto.');
    }
  };

  return (
    <ProtectedRoute>
    <div className="min-h-screen">
      <div className="flex items-center justify-center bg-gray-100 container mx-auto px-4 py-6">
        <form onSubmit={handleAddProduct} className="bg-white shadow-lg rounded-lg p-8 flex flex-col space-y-4">
          <h2 className="text-2xl font-semibold text-center">Agregar Producto</h2>
          <input
            type="text"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Precio"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit" 
            className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 transition duration-200"
          >
            Agregar Producto
          </button>
        </form>
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default AdminPage;
