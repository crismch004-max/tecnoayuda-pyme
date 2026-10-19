
 // componentes/testimonio-cliente.js
 // Autor: Amaro
 // Unidad 1: Web Components
 // Componente de testimonios con calificación de 0 a 5 estrellas.
 // Slots: foto, nombre y comentario.

// Crear la plantilla HTML del componente.
const plantilla = document.createElement("template");

plantilla.innerHTML = `
  <style>
    :host {
      display: block; box-sizing: border-box; height: 100%;
      background: #FFFFFF; border: 1px solid #E1EAF3;
      border-left: 4px solid var(--color-marca, #176A91);
      border-radius: 17px; padding: 22px; color: #172842;
      box-shadow: 0 8px 25px rgba(21, 55, 89, .065);
      font-family: system-ui, -apple-system, "Segoe UI", Arial, sans-serif;
    }

    figure {
      display: flex; flex-direction: column;
      height: 100%; margin: 0;
    }

    .estrellas {
      color: #F5A623; font-size: 1.15rem;
      letter-spacing: .1em; margin-bottom: 12px;
    }

    .comentario {
      flex: 1; color: #4A5D73;
      line-height: 1.65; font-size: .93rem;
    }

    ::slotted(p) { margin: 0; }

    figcaption {
      display: flex; align-items: center; gap: 12px;
      margin-top: 18px; padding-top: 16px;
      border-top: 1px solid #E7EDF4;
    }

    .foto {
      width: 46px; height: 46px; border-radius: 50%;
      overflow: hidden; background: #E8F4FC;
      flex-shrink: 0;
    }

    ::slotted(img[slot="foto"]) {
      display: block; width: 100%;
      height: 100%; object-fit: cover;
    }

    ::slotted([slot="nombre"]) {
      color: #193655; font-weight: 700; font-size: .95rem;
    }
  </style>

  <figure>
    <div class="estrellas" id="estrellas" role="img"></div>

    <blockquote class="comentario" style="margin:0">
      <slot>Sin comentario.</slot>
    </blockquote>

    <figcaption>
      <div class="foto">
        <slot name="foto"></slot>
      </div>

      <slot name="nombre">Cliente anónimo</slot>
    </figcaption>
  </figure>
`;

// Validar la calificación entre 0 y 5 estrellas.
function validarEstrellas(valor) {
  if (valor === null || valor === "") {
    return 0;
  }

  const numero = Number(valor);

  // Si no es un número válido, devolver 0.
  if (!Number.isFinite(numero)) {
    return 0;
  }

  // Redondear y limitar al rango permitido.
  return Math.min(5, Math.max(0, Math.round(numero)));
}

// Definición del Web Component.
export class TestimonioCliente extends HTMLElement {

  // Atributos que se van a observar.
  static get observedAttributes() {
    return ["estrellas"];
  }

  constructor() {
    super();

    // Crear Shadow DOM para encapsular el componente.
    this.attachShadow({ mode: "open" });
  }

  // Se ejecuta cuando el componente se conecta al DOM.
  connectedCallback() {

    // Clonar la plantilla sin duplicarla.
    if (!this.shadowRoot.querySelector("figure")) {
      this.shadowRoot.append(
        plantilla.content.cloneNode(true)
      );
    }

    // Mostrar las estrellas iniciales.
    this.dibujarEstrellas();
  }

  // Detectar modificaciones del atributo estrellas.
  attributeChangedCallback(nombre, anterior, nuevo) {

    if (nombre !== "estrellas" || anterior === nuevo) {
      return;
    }

    // Normalizar el atributo si contiene un valor incorrecto.
    if (nuevo !== null) {
      const valorValidado = String(validarEstrellas(nuevo));

      if (nuevo !== valorValidado) {
        this.setAttribute("estrellas", valorValidado);
        return;
      }
    }

    // Actualizar las estrellas automáticamente.
    this.dibujarEstrellas();
  }

  // Getter: obtener las estrellas.
  get estrellas() {
    return validarEstrellas(
      this.getAttribute("estrellas")
    );
  }

  // Setter: establecer una nueva calificación válida.
  set estrellas(valor) {
    this.setAttribute(
      "estrellas",
      String(validarEstrellas(valor))
    );
  }

  // Dibujar estrellas llenas y vacías.
  dibujarEstrellas() {

    const contenedor =
      this.shadowRoot.getElementById("estrellas");

    // Evitar errores si la plantilla aún no se ha insertado.
    if (!contenedor) {
      return;
    }

    const valor = this.estrellas;

    // Estrellas llenas y estrellas vacías.
    const llenas = "\u2605".repeat(valor);
    const vacias = "\u2606".repeat(5 - valor);

    contenedor.textContent = llenas + vacias;

    // Accesibilidad para lectores de pantalla.
    contenedor.setAttribute(
      "aria-label",
      `Calificación: ${valor} de 5 estrellas`
    );
  }
}

// Registrar el elemento personalizado una sola vez.
if (!customElements.get("testimonio-cliente")) {
  customElements.define(
    "testimonio-cliente",
    TestimonioCliente
  );
}
