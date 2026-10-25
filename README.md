# Supermercado — Sistema de Gestión de Inventario y Carrito de Compras

**Duoc UC | Desarrollo Frontend II (PFY2202) | Semana 3**  
**Actividad sumativa:** Desarrollando sitios web con React avanzado  
**Caso:** Supermercado — Forma B

## Descripción

Aplicación web de supermercado desarrollada con **React 19, Vite 8, React Router DOM 7 y Tailwind CSS 4**. Continúa el proyecto de las semanas anteriores e incorpora un **filtro de inventario por categoría**, una **pantalla de detalle de producto** y un **carrito de compras** que modifica las existencias disponibles.

El inventario y el carrito comparten el estado mediante **Context API y `useReducer`**. Los cambios se reflejan entre las páginas sin recargar la aplicación. Es un proyecto frontend académico: no utiliza backend ni base de datos.

## Funcionalidades implementadas

- **Inicio:** muestra la tabla del inventario y los indicadores de productos registrados, unidades disponibles y artículos agotados.
- **Agregar producto:** formulario para nombre, marca, categoría, precio y stock. Incorpora categorías predefinidas, validaciones por campo y confirmación de registro.
- **Inventario:** lista nombre, marca, categoría, precio, stock y estado de cada producto.
- **Filtro por categoría:** permite seleccionar una categoría o mostrar todas. Filtra la visualización sin modificar la lista original.
- **Detalle de producto:** al seleccionar el nombre de un artículo se abre su información mediante la ruta `#/producto/:id`. Desde allí puede agregarse una unidad al carrito si hay stock.
- **Carrito de compras:** muestra los productos agregados, sus cantidades, precio unitario, subtotal y total. Los botones `+` y `−` actualizan las cantidades y el stock compartido.
- **Control de stock:** agregar una unidad descuenta existencias; disminuir la cantidad devuelve una unidad. Si se retira la última unidad, el artículo desaparece del carrito. Los productos agotados no pueden agregarse.
- **Páginas informativas:** Quiénes somos y Contáctanos.
- **Página 404:** informa cuando la ruta solicitada no existe.
- **Menú inferior:** navegación compartida con indicación de ruta activa; en móvil presenta seis enlaces en dos filas de tres.

### Estados de inventario

| Stock | Estado |
| --- | --- |
| 0 | Sin stock |
| 1 a 5 | Stock bajo |
| 6 o más | Disponible |

Los precios se muestran en pesos chilenos con formato `es-CL`.

## Tecnologías utilizadas

| Tecnología | Uso en el proyecto |
| --- | --- |
| React 19 y JSX | Construcción de componentes y páginas |
| Context API y `useReducer` | Estado compartido y acciones sobre inventario y carrito |
| `useState` | Formularios, filtro de categoría y mensajes |
| `useInventario` | Hook para consultar el contexto desde los componentes que lo utilizan |
| React Router DOM 7 y `HashRouter` | Navegación, detalle con parámetro `:id` y página 404 |
| `Layout`, `Outlet` y `NavLink` | Estructura compartida y menú activo |
| Tailwind CSS 4 y CSS | Diseño y adaptación a pantallas móviles |
| Vite 8 | Servidor de desarrollo y compilación |
| ESLint | Revisión estática del código |
| Git y GitHub | Control de versiones y entrega |

Se mantiene `react-router-dom` por compatibilidad con la implementación actual; no se ha realizado una migración de dependencia.

## Estructura del proyecto

```text
supermercado/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── FilaProducto.jsx
│   │   ├── FiltroCategorias.jsx
│   │   ├── Layout.jsx
│   │   ├── MenuInferior.css
│   │   ├── MenuInferior.jsx
│   │   └── TablaInventario.jsx
│   ├── context/
│   │   ├── InventarioContext.js
│   │   ├── InventarioProvider.jsx
│   │   └── inventarioReducer.js
│   ├── data/
│   │   └── productosIniciales.js
│   ├── hooks/
│   │   └── useInventario.js
│   ├── pages/
│   │   ├── AgregarProducto.jsx
│   │   ├── CarritoCompras.jsx
│   │   ├── Contactanos.jsx
│   │   ├── DetalleProducto.jsx
│   │   ├── Home.jsx
│   │   ├── ListadoInventario.jsx
│   │   ├── NotFound.jsx
│   │   ├── Paginas.css
│   │   └── QuienesSomos.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

### Organización y flujo de datos

1. `productosIniciales.js` define los cuatro artículos iniciales, todos con identificadores de tipo `string`.
2. `main.jsx` utiliza `InventarioProvider` para compartir el estado de la aplicación.
3. `InventarioProvider.jsx` expone `productos`, `carrito` y las funciones para agregar productos, agregarlos al carrito y disminuir su cantidad.
4. `inventarioReducer.js` procesa las acciones `AGREGAR_PRODUCTO`, `AGREGAR_AL_CARRITO` y `DISMINUIR_CANTIDAD`, actualizando inventario y carrito en una misma operación.
5. `useInventario.js` encapsula el acceso al contexto para los componentes que usan este hook.
6. `ListadoInventario.jsx` filtra los productos de forma local. `TablaInventario.jsx` y `FilaProducto.jsx` se encargan de presentarlos.
7. `DetalleProducto.jsx` consulta el identificador de la URL y permite agregar unidades disponibles.
8. `CarritoCompras.jsx` permite ajustar cantidades y calcula subtotales y total.
9. `App.jsx` configura las rutas y `Layout.jsx` mantiene la navegación compartida.

## Instalación y ejecución

**Requisitos:** Node.js, npm y Git; se recomienda utilizar Visual Studio Code.

Clonar el repositorio de Semana 3:

```powershell
git clone https://github.com/frankcoral/supermercado3-Frank-Cordoba-PFY2202.git
cd supermercado3-Frank-Cordoba-PFY2202
```

Instalar las dependencias:

```powershell
npm.cmd install
```

Iniciar el servidor de desarrollo:

```powershell
npm.cmd run dev
```

Abrir la dirección que indique Vite. Con la configuración actual, la dirección habitual es:

```text
http://localhost:5173/supermercado3-Frank-Cordoba-PFY2202/#/
```

En Windows se utiliza `npm.cmd` para evitar las restricciones de PowerShell sobre `npm.ps1`.

### Rutas

| Página | Ruta interna |
| --- | --- |
| Inicio | `#/` |
| Quiénes somos | `#/quienes-somos` |
| Contáctanos | `#/contactanos` |
| Agregar producto | `#/agregar-producto` |
| Inventario | `#/listado-inventario` |
| Detalle de producto | `#/producto/:id` |
| Carrito | `#/carrito` |
| Página no encontrada | Cualquier ruta no definida |

Se utiliza **`HashRouter`** para mantener la navegación compatible con GitHub Pages.

## Cómo utilizar la aplicación

1. Abrir **Inventario** y seleccionar una categoría para filtrar los artículos, o elegir **Todas las categorías**.
2. Pulsar el nombre de un producto para consultar su detalle.
3. Seleccionar **Agregar al carrito**: el stock disponible disminuye en una unidad.
4. Entrar a **Carrito** y utilizar `+` para aumentar la cantidad, si hay stock, o `−` para disminuirla y devolver unidades al inventario.
5. Revisar el subtotal de cada producto y el total de la compra.
6. Desde **Agregar producto**, registrar un artículo nuevo. El producto aparecerá en el inventario compartido y podrá abrirse en el detalle y agregarse al carrito.

## Validaciones y pruebas realizadas

### Formulario de productos

- **Nombre y marca:** deben contener texto válido y no estar vacíos.
- **Categoría:** debe seleccionarse entre las opciones disponibles.
- **Precio y stock:** deben ser números enteros no negativos dentro del rango seguro de JavaScript.
- **Mensajes:** las entradas inválidas generan un error específico debajo de cada campo; un registro correcto limpia el formulario y muestra confirmación.

### Comprobaciones funcionales

| Prueba realizada | Resultado |
| --- | --- |
| Filtrar el inventario por categoría | Se muestran solo los productos correspondientes, sin borrar los originales |
| Abrir un producto desde el listado | Se muestra su detalle mediante la ruta dinámica |
| Agregar una unidad de Arroz 1 kg | El stock baja de 25 a 24 |
| Aumentar su cantidad en el carrito a 2 | El stock baja a 23 y el subtotal llega a $3.180 |
| Disminuir la cantidad a 1 | El stock vuelve a 24 y el subtotal a $1.590 |
| Retirar la última unidad | El carrito queda vacío y el stock del arroz vuelve a 25 |
| Enviar el formulario vacío | Aparecen cinco mensajes de validación |
| Registrar Yogur natural 1 kg, marca Soprole, categoría Lácteos, precio $2.990, stock 10 | El producto se agrega; el filtro Lácteos muestra dos artículos |
| Agregar una unidad de yogur al carrito | Su stock baja de 10 a 9 y aparece en el carrito |
| Consultar Pan de molde con stock 0 | El botón para agregar al carrito está deshabilitado |
| Revisar el menú y el carrito en iPhone 14 Pro | Se visualizan los seis enlaces en dos filas y los controles del carrito |
| Revisar el inventario en móvil | La tabla dispone de desplazamiento horizontal |

Estos resultados corresponden a las pruebas manuales realizadas durante el desarrollo. El contenido del carrito y el stock pueden variar según las interacciones de cada sesión.

### Comprobación técnica

```powershell
npm.cmd run lint
npm.cmd run build
```

Durante el desarrollo de Semana 3, **ESLint terminó sin errores** y **Vite compiló correctamente 43 módulos**. La compilación deberá repetirse después de cualquier modificación posterior.

Para revisar la compilación local:

```powershell
npm.cmd run preview
```

## Relación con la pauta sumativa de Semana 3

| Criterio | Puntaje máximo | Implementación |
| --- | ---: | --- |
| Listado completo de artículos | 15 | `ListadoInventario`, `TablaInventario` y `FilaProducto` |
| Filtro dinámico por categoría | 15 | `FiltroCategorias` y estado local de selección |
| Pantalla de detalle de producto | 15 | Ruta `/producto/:id` y `DetalleProducto` |
| Modificación del inventario | 15 | `inventarioReducer` y controles del carrito |
| Framework CSS y diseño responsive | 15 | Tailwind CSS, estilos adaptables y menú móvil |
| Organización y reutilización | 15 | Componentes, proveedor y hook `useInventario` |
| Repositorio, documentación y GitHub Pages | 10 | Repositorio de Semana 3, este README y publicación por completar |
| **Total posible** | **100** | **La evaluación definitiva corresponde al docente** |

## Repositorio y publicación

**Repositorio Semana 3:** https://github.com/frankcoral/supermercado3-Frank-Cordoba-PFY2202

**Dirección prevista de GitHub Pages:** https://frankcoral.github.io/supermercado3-Frank-Cordoba-PFY2202/

**Estado:** la publicación en GitHub Pages está pendiente. No se considera verificada hasta completar el despliegue y comprobar el sitio publicado.

El archivo `vite.config.js` está configurado con la base `/supermercado3-Frank-Cordoba-PFY2202/`.

## Alcance y limitaciones

- El inventario y el carrito se mantienen **en memoria**. Al recargar la página, se restablecen los productos iniciales y el carrito vacío; no existe persistencia mediante `localStorage` ni base de datos.
- El carrito permite seleccionar productos y ajustar cantidades, pero no incluye pago ni confirmación de compra.
- Los artículos iniciales y los datos de contacto son ejemplos académicos.
- No se incluye autenticación ni servidor backend, porque no forman parte de los requisitos de esta actividad.

---

**Proyecto académico — Duoc UC · Desarrollo Frontend II (PFY2202) · Semana 3**
