// src/lib/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Importa el Storage

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "tecnohouse-3452c.firebaseapp.com",
  projectId: "tecnohouse-3452c",
  storageBucket: "tecnohouse-3452c.appspot.com",
  messagingSenderId: "419060894080",
  appId: "1:419060894080:web:1cefbf454277d975ee1965",
  measurementId: "G-7SGP9SBS2R"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // Inicializa el Storage

// Function to get all products
export const getProducts = async () => {
  const productsCollection = collection(db, 'products');
  const productSnapshot = await getDocs(productsCollection);
  const productList = productSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  return productList;
};



