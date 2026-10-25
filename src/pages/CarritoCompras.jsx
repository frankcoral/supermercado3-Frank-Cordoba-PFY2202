import { Link } from "react-router-dom";
import { useInventario } from "../hooks/useInventario";

const formatoPrecio = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

function CarritoCompras() {
  const { productos, carrito, agregarAlCarrito, disminuirCantidad } =
    useInventario();

  const productosEnCarrito = carrito
    .map((item) => ({
      ...item,
      producto: productos.find((p) => p.id === item.id),
    }))
    .filter((item) => item.producto);

  const total = productosEnCarrito.reduce(
    (acumulado, item) => acumulado + item.producto.precio * item.cantidad,
    0,
  );

  return (
    <main className="mx-auto my-8 w-full max-w-5xl rounded-2xl border border-gray-200 bg-white p-6 shadow-md sm:p-8">
      <h1 className="mb-3 text-3xl font-bold text-green-800">
        Carrito de compras
      </h1>

      <p className="mb-6 text-gray-600">
        Revisa tus productos y modifica las cantidades.
      </p>

      {productosEnCarrito.length === 0 ? (
        <div className="rounded-xl bg-gray-50 p-8 text-center">
          <p className="mb-4 text-gray-600">Tu carrito está vacío.</p>

          <Link
            to="/listado-inventario"
            className="font-semibold text-green-700 underline"
          >
            Ver productos disponibles
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {productosEnCarrito.map(({ producto, cantidad }) => (
              <article
                key={producto.id}
                className="flex flex-col gap-4 rounded-xl border border-gray-200 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    {producto.nombre}
                  </h2>

                  <p className="text-sm text-gray-600">
                    {producto.marca} · {producto.tipo}
                  </p>

                  <p className="mt-2 font-semibold text-green-800">
                    {formatoPrecio.format(producto.precio)}
                  </p>

                  <p className="text-sm text-gray-600">
                    Stock disponible: {producto.stock}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => disminuirCantidad(producto.id)}
                    aria-label={`Disminuir cantidad de ${producto.nombre}`}
                    className="rounded-lg bg-gray-200 px-4 py-2 font-bold text-gray-800 hover:bg-gray-300"
                  >
                    −
                  </button>

                  <span
                    className="min-w-8 text-center font-bold"
                    aria-label={`Cantidad: ${cantidad}`}
                  >
                    {cantidad}
                  </span>

                  <button
                    type="button"
                    onClick={() => agregarAlCarrito(producto.id)}
                    disabled={producto.stock === 0}
                    aria-label={`Aumentar cantidad de ${producto.nombre}`}
                    className="rounded-lg bg-green-700 px-4 py-2 font-bold text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-400"
                  >
                    +
                  </button>

                  <p className="w-full font-semibold text-gray-800 sm:w-auto">
                    Subtotal: {formatoPrecio.format(producto.precio * cantidad)}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div
            className="mt-6 border-t border-gray-200 pt-5 text-right"
            role="status"
          >
            <p className="text-2xl font-bold text-green-800">
              Total: {formatoPrecio.format(total)}
            </p>
          </div>

          <Link
            to="/listado-inventario"
            className="mt-6 inline-block font-semibold text-green-700 underline"
          >
            Seguir comprando
          </Link>
        </>
      )}
    </main>
  );
}

export default CarritoCompras;
