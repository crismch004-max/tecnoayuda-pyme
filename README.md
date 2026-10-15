# Práctica de laboratorio · `<tarjeta-producto>`

**Programación Integrativa de Componentes Web · Unidad 1: Web Components**

> Propuesta individual para evaluar con el equipo antes de seleccionar la versión que se publicará en el repositorio colaborativo. No publicar como trabajo final sin completar los datos y verificar las pruebas.

| Dato | Información |
|---|---|
| Emprendimiento | TecnoAyuda PyME |
| Estudiantes (Apellido Nombre) | **PENDIENTE: registrar los integrantes reales del equipo** |
| NRC | **36642 (dato del kit; confirmar con el horario del curso)** |
| Fecha | 14/10/2026 |
| Enlace del repositorio | **PENDIENTE: añadir enlace de GitHub cuando el equipo publique la versión elegida** |

## Propuesta del emprendimiento

- **Nombre del emprendimiento:** TecnoAyuda PyME.
- **Problema que resuelve:** Muchos pequeños negocios dependen de equipos informáticos y conexiones de red, pero no cuentan con personal de TI propio. Una falla de las computadoras, la red Wi-Fi o los sistemas de respaldo puede detener su atención y exponer su información. TecnoAyuda PyME propone soporte técnico accesible y servicios con precios transparentes para disminuir estas dificultades.
- **Cliente al que se dirige:** Dueños y administradores de tiendas, consultorios, oficinas y establecimientos pequeños que utilizan computadoras y acceso a internet para sus actividades.

## Cómo abrir el proyecto

1. Extraer esta carpeta completa.
2. Abrir la carpeta `TecnoAyuda_PyME_Propuesta` en Visual Studio Code.
3. Instalar la extensión **Live Server** (si no está instalada).
4. Clic derecho en `index.html` → **Open with Live Server**; los módulos ES pueden fallar al abrir con `file://`.
5. Abrir **F12 → Console** para las pruebas. No se requieren dependencias, servidor de bases de datos ni acceso a internet para cargar las ilustraciones SVG.

## Estructura del proyecto

```text
TecnoAyuda_PyME_Propuesta/
├─ index.html
├─ estilos.css
├─ README.md
├─ img/
│  ├─ mantenimiento.svg
│  ├─ wifi.svg
│  └─ respaldo.svg
└─ componentes/
   └─ tarjeta-producto.js
```

## Registro de los pasos

### Paso 1 · `index.html` y módulo ES

- **Etiqueta registrada:** `<tarjeta-producto>`.
- **¿Por qué lleva guion?** La especificación de elementos personalizados exige un guion en el nombre para diferenciarlo de las etiquetas HTML incorporadas.
- **Ruta y carga del módulo:** `componentes/tarjeta-producto.js` exporta la clase `TarjetaProducto`, que se registra mediante `customElements.define("tarjeta-producto", TarjetaProducto)`. La página lo carga con `<script type="module" src="./componentes/tarjeta-producto.js"></script>`.

### Paso 2 · Plantilla, Shadow DOM y slots

- **Plantilla:** `const plantilla = document.createElement("template")` se declara una única vez, fuera de la clase.
- **Shadow DOM:** `this.attachShadow({ mode: "open" })` en el constructor, sin insertar HTML en él.
- **Slots con nombre:** `foto` y `nombre`.
- **Slot sin nombre y texto de respaldo:** `<slot>Descripción no disponible.</slot>`.
- **¿Qué ocurre sin `cloneNode(true)`?** No se crearía una copia independiente del contenido de la plantilla para cada instancia. El `DocumentFragment` se vacía al mover sus nodos; las demás tarjetas no recibirían su propia estructura.
- **Clonación:** `connectedCallback()` agrega `plantilla.content.cloneNode(true)` solamente si la estructura aún no existe.

### Paso 3 · Atributo `precio` y variables CSS

- **Atributo observado:** `observedAttributes` devuelve `["precio"]`.
- **Método que reacciona a sus cambios:** `attributeChangedCallback()` llama a `actualizarPrecio()`.
- **Atributo y propiedad sincronizados:** `get precio()` devuelve el valor numérico y `set precio(valor)` llama a `setAttribute("precio", ...)`.
- **Cambio antes de crear el HTML:** `actualizarPrecio()` verifica que `#precio` exista en el Shadow DOM y evita errores antes de `connectedCallback()`.
- **Color de marca:** azul `#197BC6`, definido mediante `--color-marca` en `estilos.css`, selector `tarjeta-producto`.
- **Valor de respaldo:** `#197BC6` en `var(--color-marca, #197BC6)`, utilizado dentro de los estilos del componente.
- **Estilos encapsulados:** `:host` da comportamiento de bloque, borde de marca y estilo general a cada instancia. La página solo comunica el color público mediante una variable CSS, sin modificar la estructura del Shadow DOM.

### Paso 4 · Tres servicios propios del emprendimiento

| # | Servicio | Descripción | Precio |
|---|---|---|---|
| 1 | Mantenimiento de computadoras | Limpieza, formateo, antivirus y optimización de equipos | $25 por servicio |
| 2 | Instalación y revisión de red Wi-Fi | Configuración del router, cobertura y seguridad de la red | $40 por servicio |
| 3 | Respaldo de información | Copias automáticas de archivos en la nube | $15 por mes |

- Las tres ilustraciones SVG se guardan **localmente** en `img/` y tienen texto alternativo `alt`.
- `index.html` utiliza **tres instancias de un solo componente** y pasa sus nombres, imágenes y descripciones mediante slots.

### Paso 5 · Repositorio colaborativo del equipo

**Enlace del repositorio:** PENDIENTE.

> Al seleccionar la versión final, publicar el proyecto y registrar cambios reales hechos por cada integrante. La distribución siguiente se rellena con lo que realmente se realizó.

| Integrante | Qué hizo realmente en el laboratorio |
|---|---|
| PENDIENTE | PENDIENTE |
| PENDIENTE | PENDIENTE |
| PENDIENTE | PENDIENTE |
| PENDIENTE (si aplica) | PENDIENTE |

## Verificación

Marcar una casilla después de **comprobarla realmente en el navegador**.

- [ ] La etiqueta personalizada lleva guion.
- [ ] El módulo carga correctamente con `type="module"`.
- [ ] Se muestran tres tarjetas con imagen, nombre, descripción y precio.
- [ ] La página solo define el color de marca de la tarjeta mediante `--color-marca`.
- [ ] `setAttribute` actualiza el precio que se ve en pantalla sin recargar.
- [ ] La propiedad `precio` también actualiza su atributo.
- [ ] La consola del navegador no muestra errores.
- [ ] El repositorio está accesible para el docente desde incógnito o mediante permisos.
- [ ] La captura final incluye las tres tarjetas y la consola abierta.

**Prueba literal indicada por el docente:**

```javascript
document.querySelector("tarjeta-producto").setAttribute("precio", "25");
```

**Prueba visible recomendada (25 → 30 → 25):**

```javascript
document.querySelector("tarjeta-producto").setAttribute("precio", "30");
document.querySelector("tarjeta-producto").precio = 25;
```

**Resultado real observado en el navegador:** PENDIENTE DE REGISTRAR.

## Reto extra (opcional)

- [ ] Verificar que `document.querySelector("tarjeta-producto").setAttribute("destacado", "")` aumenta el grosor del borde superior.

## Uso de inteligencia artificial

- **Herramienta utilizada:** ChatGPT (OpenAI).
- **Para qué se consultó:** Asistencia en la planificación, elaboración de una propuesta de código, diseño de las ilustraciones SVG, documentación y preparación de pruebas de Web Components.
- **Qué cambió, entendió o comprobó el equipo:** PENDIENTE: escribir las verificaciones y modificaciones reales que realizaron sus integrantes en VS Code y el navegador. No atribuir a un compañero trabajo que no hizo.
