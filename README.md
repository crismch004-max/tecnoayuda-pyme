# TecnoAyuda JACD — Laboratorio `<tarjeta-producto>`

**Universidad de las Fuerzas Armadas – ESPE**  
**Asignatura:** Programación Integrativa de Componentes Web  
**Unidad 1:** Web Components  
**Actividad:** Práctica de laboratorio — Construye `<tarjeta-producto>`  
**NRC:** 36643  
**Fecha:** 14 de octubre de 2026  
**Repositorio:** https://github.com/crismch004-max/tarjeta-producto-tecnoayuda  
**Rama principal:** `main`

## Integrantes

| Integrante | Inicial |
|---|:---:|
| Jeremmy Alexander Vilaña Guzman | J |
| Amaro Benjamín Caiza Sandoval | A |
| Cristian Patricio Mañay Changoluisa | C |
| Diego Fabián Arias Vera | D |

## Propuesta del emprendimiento

**Nombre:** TecnoAyuda JACD.

El nombre **JACD** surge de la unión de las iniciales de los cuatro integrantes del equipo: **J**eremmy, **A**maro, **C**ristian y **D**iego. Representa la identidad compartida y el trabajo colaborativo detrás del emprendimiento.

**Problema que resuelve:** Actualmente, numerosos pequeños negocios y usuarios particulares dependen de equipos informáticos, conexiones a internet y servicios digitales para desarrollar sus actividades cotidianas. Sin embargo, no siempre cuentan con los conocimientos técnicos o los recursos necesarios para resolver problemas de funcionamiento, conectividad y pérdida de información.

Ante esta necesidad, **TecnoAyuda JACD** surge como un emprendimiento dedicado a ofrecer soluciones tecnológicas accesibles, confiables y oportunas mediante servicios de mantenimiento de computadoras, instalación y revisión de redes Wi-Fi y respaldo de información en la nube.

**Clientes objetivo:** Pequeños negocios (tiendas, consultorios, oficinas, restaurantes y emprendimientos) y personas particulares (estudiantes, profesionales y familias) que requieran asistencia tecnológica.

**Color institucional elegido:** azul tecnológico `#176A91`, utilizado como valor de la variable CSS `--color-marca` del componente. Este tono se asocia con confianza, profesionalismo e innovación.

## Servicios ofrecidos

| # | Servicio | Descripción | Precio |
|---|---|---|---|
| 1 | Mantenimiento de computadoras | Limpieza, formateo, antivirus y optimización de equipos. | **$25** por servicio |
| 2 | Instalación y revisión de red Wi-Fi | Configuración del router, cobertura y seguridad de la red. | **$40** por servicio |
| 3 | Respaldo de información en la nube | Copias automáticas de archivos en la nube. | **$15** por mes |

Cada servicio se muestra en una instancia independiente del mismo Web Component, sin necesidad de duplicar su plantilla y sus estilos.

## Tecnologías y estructura del proyecto

- **HTML5:** estructura semántica e instancias del componente.
- **CSS3:** diseño adaptable y variable de marca.
- **JavaScript (ES Modules):** registro del elemento personalizado, plantilla, Shadow DOM y actualización del precio.
- **SVG:** ilustraciones locales con texto alternativo (`alt`).
- **Visual Studio Code y Live Server:** desarrollo y pruebas en el navegador.
- **Git y GitHub:** control de versiones y repositorio del equipo.

```text
proyecto/
├── index.html
├── estilos.css
├── README.md
├── img/
│   ├── mantenimiento.svg
│   ├── wifi.svg
│   ├── respaldo.svg
│   └── favicon.svg
└── componentes/
    └── tarjeta-producto.js
```

## Cómo ejecutar el proyecto

1. Descargar o clonar este repositorio.
2. Abrir la carpeta del proyecto en **Visual Studio Code**.
3. Instalar la extensión **Live Server** si todavía no está disponible.
4. Hacer clic derecho sobre `index.html` y seleccionar **Open with Live Server**.
5. Comprobar las tres tarjetas y abrir **F12 → Console** para las pruebas.

> La página debe ejecutarse mediante un servidor local porque utiliza un módulo ES; no se recomienda abrirla directamente mediante `file://`. Las ilustraciones SVG se cargan desde la carpeta `img/`.

## Registro de los cinco pasos de la práctica

### Paso 1. Custom Element y módulo ES

- **Etiqueta registrada:** `<tarjeta-producto>`.
- **¿Por qué lleva guion?** Los nombres de los elementos personalizados deben incluir un guion para diferenciarse de los elementos HTML estándar.
- **Archivo del módulo:** `componentes/tarjeta-producto.js`.
- **Clase exportada:** `TarjetaProducto`, que extiende `HTMLElement`.
- **Registro:** `customElements.define("tarjeta-producto", TarjetaProducto)`.
- **Importación desde la página:** `<script type="module" src="./componentes/tarjeta-producto.js"></script>` en `index.html`.

### Paso 2. HTML Template, Shadow DOM y slots

- La plantilla se crea **una sola vez fuera de la clase**, utilizando `document.createElement("template")`.
- En el constructor se ejecuta `super()` y se prepara el Shadow DOM mediante `this.attachShadow({ mode: "open" })`, sin dibujar el contenido HTML en ese momento.
- **Slots con nombre:** `foto` y `nombre`.
- **Slot sin nombre:** recibe la descripción del servicio.
- **Texto de respaldo del slot sin nombre:** `Descripción no disponible.`
- En `connectedCallback()` se inserta una copia de la plantilla con `plantilla.content.cloneNode(true)`, evitando duplicar el contenido si el elemento vuelve a conectarse.
- **¿Qué pasaría si no se clonara?** Al añadir directamente el contenido de la plantilla, sus nodos se moverían en lugar de obtenerse copias independientes. Las demás instancias no contarían con su propia estructura completa.

### Paso 3. Atributo `precio` y estilos mediante `:host`

- `precio` se declara en `observedAttributes` para detectar modificaciones.
- `attributeChangedCallback()` responde al cambio y llama a `actualizarPrecio()`.
- El getter `get precio()` permite leer el valor numérico del atributo y el setter `set precio(valor)` lo actualiza mediante `setAttribute()`.
- `actualizarPrecio()` comprueba que el elemento `#precio` exista antes de escribir, ya que `attributeChangedCallback()` puede ejecutarse antes de `connectedCallback()`.
- **Estilos encapsulados:** el selector `:host` establece `display: block` y los estilos propios de cada tarjeta.
- **Color de marca:** `--color-marca: #176A91`, definido para `tarjeta-producto` desde `estilos.css`.
- **Valor de respaldo:** `#176A91`, mediante `var(--color-marca, #176A91)` dentro del componente.
- Así, la página puede modificar el color de marca mediante la variable pública, sin acceder ni alterar los estilos internos del Shadow DOM.

### Paso 4. Tres tarjetas con servicios del emprendimiento

Se utilizan **tres instancias de `<tarjeta-producto>`** dentro de `index.html`, con contenido diferente en cada una:

1. **Mantenimiento de computadoras:** `precio="25"`, imagen `mantenimiento.svg`.
2. **Instalación y revisión de red Wi-Fi:** `precio="40"`, imagen `wifi.svg`.
3. **Respaldo de información en la nube:** `precio="15"`, imagen `respaldo.svg` y descripción que indica el cobro mensual.

Las imágenes incluyen atributos `alt` descriptivos; el favicon `img/favicon.svg` evita la solicitud de un icono inexistente. Los títulos se proporcionan por el slot `nombre`, las imágenes por `foto` y las descripciones por el slot sin nombre.

### Paso 5. Repositorio y colaboración del equipo

**Repositorio:** https://github.com/crismch004-max/tarjeta-producto-tecnoayuda

**Distribución del trabajo reportada por el equipo:**

| Integrante | Contribución |
|---|---|
| Jeremmy Alexander Vilaña Guzman | Desarrollo conjunto de `componentes/tarjeta-producto.js`, con la implementación del Web Component. |
| Amaro Benjamín Caiza Sandoval | Desarrollo conjunto de `componentes/tarjeta-producto.js`, con Shadow DOM, plantilla, slots y atributos dinámicos. |
| Cristian Patricio Mañay Changoluisa | Desarrollo de `estilos.css`, presentación visual y adaptación del diseño. |
| Diego Fabián Arias Vera | Desarrollo de `index.html`, estructura de la página e integración de los elementos y recursos. |
| Todo el equipo | Elaboración, revisión y documentación de `README.md`. |

El repositorio centraliza la versión seleccionada por el grupo. Los cambios y revisiones posteriores se registran mediante el historial de GitHub.

## Verificación y pruebas

**Comprobaciones efectuadas en Live Server:**

- [x] La etiqueta personalizada contiene un guion.
- [x] El módulo se carga mediante `type="module"`.
- [x] Se muestran las tres tarjetas con sus imágenes, nombres, descripciones y precios.
- [x] La estructura del componente utiliza una plantilla clonada y slots.
- [x] La página expone el color del componente mediante `--color-marca`.
- [x] `setAttribute("precio", "30")` modifica el precio de la primera tarjeta de **$25 a $30** sin recargar la página.
- [x] Asignar `.precio = 25` sincroniza la propiedad con el atributo: `getAttribute("precio")` devuelve `"25"`.
- [x] El repositorio está disponible públicamente en GitHub.
- [ ] Tomar la captura de entrega con **las tres tarjetas y la consola abierta** (pendiente de adjuntar).

**Prueba indicada por el docente:**

```javascript
document.querySelector("tarjeta-producto").setAttribute("precio", "25");
```

**Pruebas adicionales efectuadas:**

```javascript
document.querySelector("tarjeta-producto").setAttribute("precio", "30");
document.querySelector("tarjeta-producto").precio = 25;
document.querySelector("tarjeta-producto").getAttribute("precio");
```

**Resultado observado:** el cambio con `setAttribute` actualizó el precio de $25 a $30; la asignación mediante la propiedad devolvió el atributo al valor `"25"`, confirmado desde la consola. No fue necesario recargar la página.

**Notas de depuración:** se añadió `img/favicon.svg` y su enlace en `index.html` para evitar el error `favicon.ico` (404). En el navegador del equipo pueden aparecer advertencias de `content_script.js` causadas por extensiones: deben comprobar el sitio en incógnito sin extensiones o en un perfil limpio antes de obtener la captura final. Las pruebas de cambio de precio se realizaron en Live Server, según las verificaciones reportadas por el equipo.

## Reto adicional (opcional)

Se implementó el selector `:host([destacado])`, que incrementa el grosor del borde superior de la tarjeta cuando se añade el atributo `destacado`. Es opcional y se puede verificar en consola con `document.querySelector("tarjeta-producto").setAttribute("destacado", "")`.

## Declaración de uso de inteligencia artificial

Durante el desarrollo de **TecnoAyuda JACD** se utilizó **ChatGPT (OpenAI)** como herramienta de apoyo para generar una propuesta inicial de código, comprender conceptos relacionados con Web Components, organizar los archivos y detectar posibles errores. También se utilizó como apoyo para preparar la documentación y las pruebas.

El equipo es responsable de revisar, adaptar y validar el funcionamiento del código, así como de comprender y explicar las funcionalidades implementadas. Las contribuciones individuales se documentan de acuerdo con las actividades reportadas por sus integrantes.

---

**TecnoAyuda JACD — Programación Integrativa de Componentes Web — NRC 36643.**
