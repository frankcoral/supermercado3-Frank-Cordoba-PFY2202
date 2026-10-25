import { Link } from "react-router-dom";

const STOCK_BAJO = 5;

function obtenerEstado(stock) {
  if (stock === 0) {
    return {
      texto: "Sin stock",
      estilo: "bg-red-100 text-red-700",
    };
  }

  if (stock <= STOCK_BAJO) {
    return {
      texto: "Stock bajo",
      estilo: "bg-amber-100 text-amber-800",
    };
  }

  return {
    texto: "Disponible",
    estilo: "bg-green-100 text-green-800",
  };
}

function FilaProducto({ producto }) {
  const estado = obtenerEstado(producto.stock);

  return (
    <tr className="even:bg-gray-50/70 transition-colors hover:bg-green-50">
      <td className="px-5 py-5 font-medium text-gray-800">
        <Link
          to={`/producto/${producto.id}`}
          className="font-semibold text-green-700 hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-green-700"
        >
          {producto.nombre}
        </Link>
      </td>

      <td className="px-5 py-5 text-gray-600">{producto.marca}</td>

      <td className="px-5 py-5 text-gray-600">{producto.tipo}</td>

      <td className="whitespace-nowrap px-5 py-5 font-medium text-gray-700">
        ${producto.precio.toLocaleString("es-CL")}
      </td>

      <td className="px-5 py-5 text-gray-700">{producto.stock}</td>

      <td className="px-5 py-5">
        <span
          className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${estado.estilo}`}
        >
          {estado.texto}
        </span>
      </td>
    </tr>
  );
}

export default FilaProducto;
