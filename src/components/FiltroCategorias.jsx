export default function FiltroCategorias({
  productos,
  categoriaSeleccionada,
  onCambiarCategoria,
}) {
  const categorias = [
    ...new Set(productos.map((producto) => producto.tipo)),
  ].sort((a, b) => a.localeCompare(b, "es"));

  return (
    <div className="mb-5">
      <label
        htmlFor="filtro-categoria"
        className="mb-2 block font-semibold text-gray-700"
      >
        Filtrar por categoría
      </label>

      <select
        id="filtro-categoria"
        value={categoriaSeleccionada}
        onChange={(e) => onCambiarCategoria(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white p-3 sm:max-w-xs"
      >
        <option value="">Todas las categorías</option>

        {categorias.map((categoria) => (
          <option key={categoria} value={categoria}>
            {categoria}
          </option>
        ))}
      </select>
    </div>
  );
}
