import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-7xl font-bold text-green-800">404</h1>

      <h2 className="mb-4 text-2xl font-semibold text-gray-800">
        Página no encontrada
      </h2>

      <p className="mb-8 text-gray-600">
        La página que buscas no existe o no está disponible. Puedes regresar al
        inicio de nuestro supermercado.
      </p>

      <Link
        to="/"
        className="rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
      >
        Volver al inicio
      </Link>
    </main>
  );
}

export default NotFound;
