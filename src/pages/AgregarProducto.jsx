import { useState } from "react";
import { useInventario } from "../hooks/useInventario";

const CATEGORIAS = [
  "Abarrotes",
  "Bebidas",
  "Carnes y pescados",
  "Congelados",
  "Frutas y verduras",
  "Higiene",
  "Lácteos",
  "Limpieza",
  "Panadería",
];

const TEXTO_VALIDO = /^(?=.*[\p{L}])[\p{L}\p{N}\s.,'()&/+-]+$/u;

const CLASE_CONTROL =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200";

const formularioInicial = {
  nombre: "",
  marca: "",
  tipo: "",
  precio: "",
  stock: "",
};

function validarProducto(formulario) {
  const errores = {};
  const nombre = formulario.nombre.trim();
  const marca = formulario.marca.trim();
  const precio = Number(formulario.precio);
  const stock = Number(formulario.stock);

  if (!nombre || !TEXTO_VALIDO.test(nombre)) {
    errores.nombre = "Ingresa un nombre válido que contenga letras.";
  }

  if (!marca || !TEXTO_VALIDO.test(marca)) {
    errores.marca = "Ingresa una marca válida que contenga letras.";
  }

  if (!CATEGORIAS.includes(formulario.tipo)) {
    errores.tipo = "Selecciona una categoría válida.";
  }

  if (!/^\d+$/.test(formulario.precio) || !Number.isSafeInteger(precio)) {
    errores.precio = "El precio debe ser un número entero mayor o igual a 0.";
  }

  if (!/^\d+$/.test(formulario.stock) || !Number.isSafeInteger(stock)) {
    errores.stock = "El stock debe ser un número entero mayor o igual a 0.";
  }

  return errores;
}

function CampoFormulario({
  nombre,
  etiqueta,
  valor,
  onChange,
  error,
  tipo = "text",
  opciones,
}) {
  return (
    <div>
      <label htmlFor={nombre} className="mb-2 block font-medium text-gray-700">
        {etiqueta}
      </label>

      {opciones ? (
        <select
          id={nombre}
          name={nombre}
          value={valor}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${nombre}-error` : undefined}
          className={CLASE_CONTROL}
        >
          <option value="">Selecciona una categoría</option>

          {opciones.map((opcion) => (
            <option key={opcion} value={opcion}>
              {opcion}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={nombre}
          name={nombre}
          type={tipo}
          value={valor}
          onChange={onChange}
          min={tipo === "number" ? "0" : undefined}
          step={tipo === "number" ? "1" : undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${nombre}-error` : undefined}
          className={CLASE_CONTROL}
        />
      )}

      {error && (
        <p
          id={`${nombre}-error`}
          role="alert"
          className="mt-2 text-sm font-medium text-red-700"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function AgregarProducto() {
  const { agregarProducto } = useInventario();

  const [formulario, setFormulario] = useState(formularioInicial);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");

  function manejarCambio(evento) {
    const { name, value } = evento.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));

    setErrores((anterior) => ({
      ...anterior,
      [name]: "",
    }));

    setMensaje("");
  }

  function manejarEnvio(evento) {
    evento.preventDefault();

    const nuevosErrores = validarProducto(formulario);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      setMensaje("");
      return;
    }

    agregarProducto({
      nombre: formulario.nombre.trim(),
      marca: formulario.marca.trim(),
      tipo: formulario.tipo,
      precio: Number(formulario.precio),
      stock: Number(formulario.stock),
    });

    setFormulario({ ...formularioInicial });
    setErrores({});
    setMensaje("Producto agregado correctamente.");
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8">
        <h1 className="mb-2 text-3xl font-bold text-green-800">
          Agregar producto
        </h1>

        <p className="mb-8 text-gray-600">
          Registra nuevos artículos en el inventario del supermercado.
        </p>

        <form
          onSubmit={manejarEnvio}
          noValidate
          className="grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
          <CampoFormulario
            nombre="nombre"
            etiqueta="Nombre del producto"
            valor={formulario.nombre}
            onChange={manejarCambio}
            error={errores.nombre}
          />

          <CampoFormulario
            nombre="marca"
            etiqueta="Marca"
            valor={formulario.marca}
            onChange={manejarCambio}
            error={errores.marca}
          />

          <CampoFormulario
            nombre="tipo"
            etiqueta="Categoría del producto"
            valor={formulario.tipo}
            onChange={manejarCambio}
            error={errores.tipo}
            opciones={CATEGORIAS}
          />

          <CampoFormulario
            nombre="precio"
            etiqueta="Precio ($)"
            tipo="number"
            valor={formulario.precio}
            onChange={manejarCambio}
            error={errores.precio}
          />

          <CampoFormulario
            nombre="stock"
            etiqueta="Stock"
            tipo="number"
            valor={formulario.stock}
            onChange={manejarCambio}
            error={errores.stock}
          />

          <button
            type="submit"
            className="rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 sm:col-span-2"
          >
            Guardar producto
          </button>
        </form>

        {mensaje && (
          <p
            role="status"
            className="mt-5 rounded-lg bg-green-50 p-4 text-green-800"
          >
            {mensaje}
          </p>
        )}
      </section>
    </main>
  );
}

export default AgregarProducto;
