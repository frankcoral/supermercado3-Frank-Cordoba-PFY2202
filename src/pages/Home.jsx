import { Link } from "react-router-dom";
import { useInventario } from "../hooks/useInventario";
import TablaInventario from "../components/TablaInventario";

function Home() {
  const { productos } = useInventario();

  const totalProductos = productos.length;
  const totalUnidades = productos.reduce(
    (total, producto) => total + producto.stock,
    0,
  );
  const productosSinStock = productos.filter(
    (producto) => producto.stock === 0,
  ).length;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-green-800">Supermercado</h1>

        <h2 className="mb-3 text-xl font-semibold text-green-700">
          Sistema de Gestión de Inventario
        </h2>

        <p className="text-gray-600">
          Bienvenido al sistema de gestión de inventario. Consulta los productos
          disponibles y administra los artículos de nuestro supermercado.
        </p>
      </header>

      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Productos registrados</p>
          <p className="mt-2 text-3xl font-bold text-green-800">
            {totalProductos}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Unidades disponibles</p>
          <p className="mt-2 text-3xl font-bold text-green-800">
            {totalUnidades}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Productos sin stock</p>
          <p className="mt-2 text-3xl font-bold text-red-600">
            {productosSinStock}
          </p>
        </div>
      </section>

      <section>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-green-800">
            Inventario de productos
          </h2>

          <Link
            to="/agregar-producto"
            className="rounded-lg bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            + Agregar producto
          </Link>
        </div>

        <TablaInventario productos={productos} />
      </section>
    </main>
  );
}

export default Home;
