// contacto.tsx
import { Button } from '@/components/ui/button';


export default function Contacto() {
  return (
    <div className="min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-6">
        <section>
          
          <form className="bg-white p-4 rounded shadow-md max-w-sm mx-auto">
          <h2 className="text-2xl font-semibold text-center">Contactanos</h2>
            <div className="mb-2">
              <label htmlFor="name" className="block text-gray-700 text-lg font-semibold">
                Nombre:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 p-1 border border-gray-300 rounded w-full"
                placeholder="Tu nombre"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="block text-gray-700 text-lg font-semibold">
                Correo Electrónico:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 p-1 border border-gray-300 rounded w-full"
                placeholder="Tu correo electrónico"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="message" className="block text-gray-700 text-lg font-semibold">
                Mensaje:
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={3}
                className="mt-1 p-1 border border-gray-300 rounded w-full"
                placeholder="Escribe tu mensaje aquí..."
              ></textarea>
            </div>
            <Button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Enviar
            </Button>
          </form>
        </section>
      </main>
      </div>
  );
}
