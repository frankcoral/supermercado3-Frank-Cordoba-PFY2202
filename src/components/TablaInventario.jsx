import FilaProducto from "./FilaProducto";

function TablaInventario({ productos }) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-md">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="bg-green-800 text-white">
          <tr>
            <th className="px-4 py-4">Producto</th>
            <th className="px-4 py-4">Marca</th>
            <th className="px-4 py-4">Tipo</th>
            <th className="px-4 py-4">Precio</th>
            <th className="px-4 py-4">Stock</th>
            <th className="px-4 py-4">Estado</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {productos.map((producto) => (
            <FilaProducto key={producto.id} producto={producto} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaInventario;
