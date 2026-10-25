import { NavLink } from "react-router-dom";
import "./MenuInferior.css";

function MenuInferior() {
  return (
    <nav className="menu-inferior" aria-label="Navegación principal">
      <NavLink to="/" end>
        Inicio
      </NavLink>

      <NavLink to="/quienes-somos">Quiénes somos</NavLink>

      <NavLink to="/contactanos">Contáctanos</NavLink>

      <NavLink to="/agregar-producto">Agregar producto</NavLink>

      <NavLink to="/listado-inventario">Inventario</NavLink>

      <NavLink to="/carrito">Carrito</NavLink>
    </nav>
  );
}

export default MenuInferior;
