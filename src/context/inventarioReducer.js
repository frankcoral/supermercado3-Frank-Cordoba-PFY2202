export function inventarioReducer(estado, accion) {
  switch (accion.type) {
    case "AGREGAR_PRODUCTO":
      return {
        ...estado,
        productos: [...estado.productos, accion.producto],
      };

    case "AGREGAR_AL_CARRITO": {
      const producto = estado.productos.find((p) => p.id === accion.id);

      if (!producto || producto.stock <= 0) return estado;

      const existente = estado.carrito.find((item) => item.id === accion.id);

      return {
        productos: estado.productos.map((p) =>
          p.id === accion.id ? { ...p, stock: p.stock - 1 } : p,
        ),
        carrito: existente
          ? estado.carrito.map((item) =>
              item.id === accion.id
                ? { ...item, cantidad: item.cantidad + 1 }
                : item,
            )
          : [...estado.carrito, { id: accion.id, cantidad: 1 }],
      };
    }

    case "DISMINUIR_CANTIDAD": {
      const existente = estado.carrito.find((item) => item.id === accion.id);

      if (!existente) return estado;

      return {
        productos: estado.productos.map((p) =>
          p.id === accion.id ? { ...p, stock: p.stock + 1 } : p,
        ),
        carrito:
          existente.cantidad === 1
            ? estado.carrito.filter((item) => item.id !== accion.id)
            : estado.carrito.map((item) =>
                item.id === accion.id
                  ? { ...item, cantidad: item.cantidad - 1 }
                  : item,
              ),
      };
    }

    default:
      return estado;
  }
}
