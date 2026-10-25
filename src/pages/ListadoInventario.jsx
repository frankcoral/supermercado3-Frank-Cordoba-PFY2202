import { useState } from "react";
import { useInventario } from "../hooks/useInventario";
import TablaInventario from "../components/TablaInventario";
import FiltroCategorias from "../components/FiltroCategorias";

function ListadoInventario() {
  const { productos } = useInventario();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  const productosFiltrados = productos.filter(
    (producto) =>
      !categoriaSeleccionada || producto.tipo === categoriaSeleccionada,
  );

  return (
    <main className="mx-auto my-8 w-full max-w-6xl rounded-2xl border border-gray-200 bg-white p-6 shadow-md sm:p-8">
      <h1 className="mb-3 text-3xl font-bold text-green-800">
        Listado de inventario
      </h1>

      <p className="mb-6 text-gray-600">
        Consulta todos los artículos registrados en nuestro supermercado.
      </p>

      <FiltroCategorias
        productos={productos}
        categoriaSeleccionada={categoriaSeleccionada}
        onCambiarCategoria={setCategoriaSeleccionada}
      />

      <p className="mb-4 text-sm text-gray-600" role="status">
        Mostrando {productosFiltrados.length} de {productos.length} productos.
      </p>

      <TablaInventario productos={productosFiltrados} />
    </main>
  );
}

export default ListadoInventario;
