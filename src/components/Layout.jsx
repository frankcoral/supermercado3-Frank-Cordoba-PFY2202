import { Outlet } from "react-router-dom";
import MenuInferior from "./MenuInferior";

function Layout() {
  return (
    <>
      <Outlet />
      <MenuInferior />
    </>
  );
}

export default Layout;
