# TecnoAyuda JACD — Laboratorio `<tarjeta-producto>` y kit de componentes

**Universidad de las Fuerzas Armadas – ESPE**  
**Asignatura:** Programación Integrativa de Componentes Web  
**Unidad 1:** Web Components  
**Actividad:** Práctica de laboratorio — Construye `<tarjeta-producto>`  
**NRC:** 36643  
**Fecha:** 18 de octubre de 2026  
**Repositorio:** https://github.com/crismch004-max/tecnoayuda-pyme  
**Rama principal:** `develop`

## Integrantes

| Integrante | Inicial | Componente a cargo |
|---|:---:|---|
| Jeremy Alexander Vilaña Guamán | J | `<tarjeta-producto>` |
| Amaro Benjamín Caiza Sandoval | A | `<testimonio-cliente>` |
| Cristian Patricio Mañay Changoluisa | C | `<boton-contacto>` |
| Diego Fabián Arias Vera | D | `<preguntas-frecuentes>` |

## Propuesta del emprendimiento

**Nombre:** TecnoAyuda JACD.

El nombre **JACD** surge de la unión de las iniciales de los cuatro integrantes del equipo: **J**eremy, **A**maro, **C**ristian y **D**iego. Representa la identidad compartida y el trabajo colaborativo detrás del emprendimiento.

**Problema que resuelve:** Numerosos pequeños negocios y usuarios particulares dependen de equipos informáticos, conexiones a internet y servicios digitales para sus actividades cotidianas. Sin embargo, no siempre cuentan con los conocimientos técnicos o los recursos necesarios para resolver problemas de funcionamiento, conectividad y pérdida de información.

Ante esta necesidad, **TecnoAyuda JACD** ofrece soluciones tecnológicas accesibles, confiables y oportunas mediante servicios de mantenimiento de computadoras, instalación y revisión de redes Wi-Fi y respaldo de información en la nube.

**Clientes objetivo:** Pequeños negocios (tiendas, consultorios, oficinas, restaurantes y emprendimientos) y personas particulares (estudiantes, profesionales y familias) que requieran asistencia tecnológica.

**Color institucional elegido:** azul tecnológico `#176A91`, utilizado como valor de la variable CSS `--color-marca` en todos los componentes. Este tono se asocia con confianza, profesionalismo e innovación.

## Servicios ofrecidos

| # | Servicio | Descripción | Precio |
|---|---|---|---|
| 1 | Mantenimiento de computadoras | Limpieza, formateo, antivirus y optimización de equipos. | **$25** por servicio |
| 2 | Instalación y revisión de red Wi-Fi | Configuración del router, cobertura y seguridad de la red. | **$40** por servicio |
| 3 | Respaldo de información en la nube | Copias automáticas de archivos en la nube. | **$15** por mes |

## Kit de componentes del equipo

Cada integrante desarrolla un componente web personalizado, encapsulado y reutilizable. Todos siguen la misma estructura: módulo ES propio en `componentes/`, una sola plantilla `<template>` fuera de la clase clonada con `cloneNode(true)`, Shadow DOM, slots y estilos con `:host` que leen `var(--color-marca, respaldo)`.

| Integrante | Componente | Dónde va en la página | Para qué sirve | Atributos, slots y eventos | Conceptos que demuestra |
|---|---|---|---|---|---|
| Jeremy | `<tarjeta-producto>` | Sección «Servicios» (catálogo de 3 tarjetas) | Muestra cada servicio con su foto, nombre, descripción y precio | Atributo `precio`. Slots `foto`, `nombre` y uno sin nombre para la descripción | Plantilla clonada, Shadow DOM, slots, `observedAttributes`, propiedad sincronizada con get/set, `:host` |
| Cristian | `<boton-contacto>` | Sección de presentación y pie de página | Botón de llamada a la acción que abre WhatsApp con un mensaje ya escrito | Atributos `telefono`, `mensaje` y `variante` (`secundario` o `claro`). Slot sin nombre para el texto. Evento `contacto-click` | Atributos observados, `CustomEvent`, `::part`, variantes con `:host([variante])`, variables CSS |
| Amaro | `<testimonio-cliente>` | Sección «Lo que dicen nuestros clientes» | Muestra la reseña de un cliente con estrellas para dar confianza | Atributo `estrellas` (0 a 5). Slots `foto`, `nombre` y uno sin nombre para el comentario | Dibujar contenido según un atributo, validar el rango del valor, getter y setter, slots con nombre |
| Diego | `<preguntas-frecuentes>` | Sección «Preguntas frecuentes» | Ítem de acordeón: al hacer clic en la pregunta se despliega la respuesta | Atributo booleano `abierto`. Slots `pregunta` y uno sin nombre para la respuesta. Evento `cambio-estado` | Eventos de clic, atributo booleano con `toggleAttribute`, `attributeChangedCallback`, accesibilidad con `aria-expanded` |

## Tecnologías y estructura del proyecto

- **HTML5:** estructura semántica e instancias de los componentes.
- **CSS3:** diseño adaptable y variable de marca.
- **JavaScript (ES Modules):** registro de los elementos personalizados, plantillas, Shadow DOM, atributos observados y eventos.
- **SVG:** ilustraciones locales con texto alternativo (`alt`).
- **Visual Studio Code y Live Server:** desarrollo y pruebas en el navegador.
- **Git y GitHub:** control de versiones y repositorio del equipo.

```text
tecnoayuda-pyme/
├── index.html
├── estilos.css
├── README.md
├── img/
│   ├── mantenimiento.svg
│   ├── wifi.svg
│   ├── respaldo.svg
│   └── favicon.svg
└── componentes/
    ├── tarjeta-producto.js       (Jeremy)
    ├── boton-contacto.js         (Cristian)
    ├── testimonio-cliente.js     (Amaro)
    └── preguntas-frecuentes.js   (Diego)
```

## Cómo ejecutar el proyecto

1. Descargar o clonar este repositorio.
2. Abrir la carpeta del proyecto en **Visual Studio Code**.
3. Instalar la extensión **Live Server** si todavía no está disponible.
4. Hacer clic derecho sobre `index.html` y seleccionar **Open with Live Server**.
5. Abrir **F12 → Console** para las pruebas.

> La página debe ejecutarse mediante un servidor local porque utiliza módulos ES; no funciona correctamente al abrirla directamente con `file://`.

## Registro de los cinco pasos de la práctica (`<tarjeta-producto>`)

### Paso 1. Custom Element y módulo ES

- **Etiqueta registrada:** `<tarjeta-producto>`.
- **¿Por qué lleva guion?** La especificación de elementos personalizados exige un guion en el nombre para diferenciarlos de los elementos HTML estándar y evitar conflictos con etiquetas futuras.
- **Archivo del módulo:** `componentes/tarjeta-producto.js`.
- **Clase exportada:** `TarjetaProducto`, que extiende `HTMLElement`.
- **Registro:** `customElements.define("tarjeta-producto", TarjetaProducto)`, protegido con `customElements.get(...)` para no registrarlo dos veces.
- **Importación desde la página:** `<script type="module" src="./componentes/tarjeta-producto.js"></script>` en `index.html`. Los otros tres componentes se cargan de la misma forma, cada uno desde su propio módulo.

### Paso 2. HTML Template, Shadow DOM y slots

- La plantilla se crea **una sola vez fuera de la clase**, utilizando `document.createElement("template")`.
- En el constructor se ejecuta `super()` y se prepara el Shadow DOM con `this.attachShadow({ mode: "open" })`, sin dibujar HTML en ese momento.
- **Slots con nombre:** `foto` y `nombre`.
- **Slot sin nombre:** recibe la descripción del servicio.
- **Texto de respaldo del slot sin nombre:** `Descripción no disponible.`
- En `connectedCallback()` se inserta una copia de la plantilla con `plantilla.content.cloneNode(true)`. Una condición evita duplicar el contenido si el elemento se desconecta y vuelve a conectarse.
- **¿Qué pasaría si no se clonara?** `append` movería los nodos de la plantilla en lugar de copiarlos: la primera tarjeta se quedaría con la estructura y las demás aparecerían vacías.

### Paso 3. Atributo `precio` y estilos mediante `:host`

- `precio` se declara en `observedAttributes` para detectar sus cambios.
- **Método que reacciona al cambio:** `attributeChangedCallback()`, que llama a `actualizarPrecio()`.
- El getter `get precio()` lee el valor numérico del atributo y el setter `set precio(valor)` lo actualiza con `setAttribute()`.
- `actualizarPrecio()` comprueba que `#precio` exista antes de escribir, porque si el atributo ya viene en el HTML `attributeChangedCallback()` se ejecuta antes que `connectedCallback()`.
- **Estilos encapsulados:** `:host` define `display: block` y los estilos propios de cada tarjeta.
- **Color de marca:** `--color-marca: #176A91`, definido en `estilos.css`.
- **Valor de respaldo:** `#176A91`, mediante `var(--color-marca, #176A91)` dentro del componente.
- La página solo modifica el color de marca mediante la variable pública, sin alterar los estilos internos del Shadow DOM.

### Paso 4. Tres tarjetas con servicios del emprendimiento

Se utilizan **tres instancias de `<tarjeta-producto>`** en `index.html`, con contenido diferente en cada una:

1. **Mantenimiento de computadoras:** `precio="25"`, imagen `mantenimiento.svg`.
2. **Instalación y revisión de red Wi-Fi:** `precio="40"`, imagen `wifi.svg`.
3. **Respaldo de información en la nube:** `precio="15"`, imagen `respaldo.svg`, con una descripción que indica el cobro mensual.

Las imágenes incluyen atributos `alt` descriptivos. El título de la página es el nombre del emprendimiento. El favicon `img/favicon.svg` evita el error 404 de `favicon.ico` en la consola.

### Paso 5. Repositorio y colaboración del equipo

**Repositorio:** https://github.com/crismch004-max/tecnoayuda-pyme

| Integrante | Contribución |
|---|---|
| Jeremy Alexander Vilaña Guamán | Desarrollo de `componentes/tarjeta-producto.js`: plantilla, Shadow DOM, slots, atributo `precio` sincronizado con su propiedad y estilos con `:host`. |
| Amaro Benjamín Caiza Sandoval | Desarrollo de `componentes/testimonio-cliente.js`: atributo `estrellas` con validación de rango, getter y setter, y slots `foto` y `nombre`. |
| Cristian Patricio Mañay Changoluisa | Desarrollo de `componentes/boton-contacto.js`: atributos `telefono`, `mensaje` y `variante`, evento `contacto-click` y variantes de estilo. Creación del repositorio en GitHub. |
| Diego Fabián Arias Vera | Desarrollo de `componentes/preguntas-frecuentes.js`: atributo booleano `abierto`, evento de clic, evento `cambio-estado` y accesibilidad con `aria-expanded`. |
| Todo el equipo | Integración de los componentes en `index.html` y `estilos.css`, pruebas en el navegador y documentación de `README.md`. |

## Verificación y pruebas

**Comprobaciones efectuadas en Live Server:**

- [x] Todas las etiquetas personalizadas contienen un guion.
- [x] Cada componente se carga desde su propio módulo con `type="module"`.
- [x] Se muestran las tres tarjetas con sus imágenes, nombres, descripciones y precios.
- [x] La página solo cambia el color de los componentes mediante `--color-marca`.
- [x] `setAttribute("precio", "30")` cambia el precio de la primera tarjeta de **$25 a $30** sin recargar.
- [x] Asignar `.precio = 25` sincroniza la propiedad con el atributo: `getAttribute("precio")` devuelve `"25"`.
- [x] `<testimonio-cliente>` limita las estrellas a un máximo de 5.
- [x] `<preguntas-frecuentes>` abre y cierra la respuesta al hacer clic.
- [x] `<boton-contacto>` genera el enlace de WhatsApp con el mensaje codificado.
- [x] La consola no muestra errores.
- [x] El repositorio está disponible públicamente en GitHub.
- [ ] Captura de entrega con **las tres tarjetas y la consola abierta** (se adjunta en la tarea).

**Prueba indicada por el docente:**

```javascript
document.querySelector("tarjeta-producto").setAttribute("precio", "25");
```

**Pruebas adicionales:**

```javascript
// tarjeta-producto
const t = document.querySelector("tarjeta-producto");
t.setAttribute("precio", "30");
t.precio = 25;
t.getAttribute("precio");          // "25"

// testimonio-cliente
document.querySelector("testimonio-cliente").estrellas = 9;   // muestra 5 estrellas

// preguntas-frecuentes
document.querySelectorAll("preguntas-frecuentes")[1].abierto = true;

// boton-contacto
document.addEventListener("contacto-click", e => console.log(e.detail));
```

**Resultado observado:** el cambio con `setAttribute` actualizó el precio de $25 a $30 y la asignación mediante la propiedad devolvió el atributo a `"25"`, sin recargar la página. Las estrellas fuera de rango se limitaron a 5 y el acordeón respondió al clic.

## Reto adicional (opcional)

Se implementó `:host([destacado])`, que aumenta el grosor del borde superior de la tarjeta cuando se añade el atributo `destacado`:

```javascript
document.querySelector("tarjeta-producto").setAttribute("destacado", "");
```

## Declaración de uso de inteligencia artificial

Durante el desarrollo de **TecnoAyuda JACD** se utilizaron **ChatGPT (OpenAI)** y **Claude (Anthropic)** como herramientas de apoyo para generar una propuesta inicial de código, comprender conceptos de Web Components, revisar el proyecto frente a la rúbrica, detectar errores y preparar la documentación y las pruebas.

El equipo es responsable de revisar, adaptar y validar el funcionamiento del código. Cada integrante comprende y puede explicar el componente que tiene a su cargo.

---

**TecnoAyuda JACD — Programación Integrativa de Componentes Web — NRC 36643.**
