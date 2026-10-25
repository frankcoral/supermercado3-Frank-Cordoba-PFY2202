import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useInventario } from "../hooks/useInventario";

function DetalleProducto() {
  const { id } = useParams();
  const { productos, agregarAlCarrito } = useInventario();
  const [mensaje, setMensaje] = useState("");

  const producto = productos.find((item) => item.id === id);

  const formatoPrecio = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });

  if (!producto) {
    return (
      <main className="mx-auto my-8 max-w-3xl rounded-2xl bg-white p-8 shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-red-700">
          Producto no encontrado
        </h1>
        <Link to="/listado-inventario" className="text-green-700 underline">
          Volver al inventario
        </Link>
      </main>
    );
  }

  function handleAgregar() {
    if (producto.stock <= 0) {
      setMensaje("Este producto no tiene stock disponible.");
      return;
    }

    agregarAlCarrito(producto.id);
    setMensaje("Producto agregado al carrito correctamente.");
  }

  return (
    <main className="mx-auto my-8 w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-md sm:p-8">
      <h1 className="mb-6 text-3xl font-bold text-green-800">
        Detalle del producto
      </h1>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          {producto.nombre}
        </h2>

        <p>
          <strong>Marca:</strong> {producto.marca}
        </p>
        <p>
          <strong>Categoría:</strong> {producto.tipo}
        </p>
        <p>
          <strong>Precio:</strong> {formatoPrecio.format(producto.precio)}
        </p>
        <p>
          <strong>Stock disponible:</strong> {producto.stock}
        </p>

        <button
          type="button"
          onClick={handleAgregar}
          disabled={producto.stock === 0}
          className="w-full rounded-lg bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-400 sm:w-auto"
        >
          Agregar al carrito
        </button>

        {mensaje && (
          <p className="font-medium text-green-700" role="status">
            {mensaje}
          </p>
        )}

        <div>
          <Link
            to="/listado-inventario"
            className="inline-block text-green-700 underline hover:text-green-900"
          >
            Volver al inventario
          </Link>
        </div>
      </div>
    </main>
  );
}

export default DetalleProducto;
