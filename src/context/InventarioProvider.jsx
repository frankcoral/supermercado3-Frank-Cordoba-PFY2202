import { useReducer } from "react";
import { InventarioContext } from "./InventarioContext";
import { inventarioReducer } from "./inventarioReducer";
import { productosIniciales } from "../data/productosIniciales";

const estadoInicial = {
  productos: productosIniciales,
  carrito: [],
};

export function InventarioProvider({ children }) {
  const [estado, dispatch] = useReducer(inventarioReducer, estadoInicial);

  function agregarProducto(producto) {
    dispatch({
      type: "AGREGAR_PRODUCTO",
      producto: {
        ...producto,
        id: crypto.randomUUID(),
      },
    });
  }

  function agregarAlCarrito(id) {
    dispatch({ type: "AGREGAR_AL_CARRITO", id });
  }

  function disminuirCantidad(id) {
    dispatch({ type: "DISMINUIR_CANTIDAD", id });
  }

  return (
    <InventarioContext.Provider
      value={{
        productos: estado.productos,
        carrito: estado.carrito,
        agregarProducto,
        agregarAlCarrito,
        disminuirCantidad,
      }}
    >
      {children}
    </InventarioContext.Provider>
  );
}
