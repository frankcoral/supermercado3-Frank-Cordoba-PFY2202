import { useContext } from "react";
import { InventarioContext } from "../context/InventarioContext";

export function useInventario() {
  const contexto = useContext(InventarioContext);

  if (!contexto) {
    throw new Error("useInventario debe utilizarse dentro de InventarioProvider");
  }

  return contexto;
}