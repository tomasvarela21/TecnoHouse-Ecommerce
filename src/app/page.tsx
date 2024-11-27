// index.tsx
import ProductList from '@/components/ProductList';
import "../../styles/globals.css";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="p-6">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Todos los Productos</h2>
          {/* Carga del componente de la lista de productos */}
          <ProductList searchQuery={''} />
        </div>
        
        
      </main>
    </div>
  );
}
