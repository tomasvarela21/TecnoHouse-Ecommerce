import React from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Buscar productos..." }) => {
  const [query, setQuery] = React.useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Redirigir a la página de resultados con el parámetro de búsqueda
      router.push(`/search?q=${encodeURIComponent(query)}`);
      // Limpiar el campo de búsqueda
      setQuery(""); // Agregar esta línea para limpiar el campo
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-1 justify-center">
      <div className="flex items-center w-full max-w-md">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 rounded-l-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-r-md py-2 px-4 hover:bg-blue-700 transition duration-200"
        >
          Buscar
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
