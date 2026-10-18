// componentes/testimonio-cliente.js · Autor: Amaro · Unidad 1: Web Components
// Reseña de un cliente. Atributo: estrellas (1 a 5). Slots: foto, nombre y comentario.
const plantilla = document.createElement("template");
plantilla.innerHTML = `
  <style>
    :host {
      display: block; box-sizing: border-box; height: 100%;
      background: #FFFFFF; border: 1px solid #E1EAF3; border-left: 4px solid var(--color-marca, #176A91);
      border-radius: 17px; padding: 22px; color: #172842;
      box-shadow: 0 8px 25px rgba(21, 55, 89, .065);
      font-family: system-ui, -apple-system, "Segoe UI", Arial, sans-serif;
    }
    figure { display: flex; flex-direction: column; height: 100%; margin: 0; }
    .estrellas { color: #F5A623; font-size: 1.15rem; letter-spacing: .1em; margin-bottom: 12px; }
    .comentario { flex: 1; color: #4A5D73; line-height: 1.65; font-size: .93rem; }
    ::slotted(p) { margin: 0; }
    figcaption { display: flex; align-items: center; gap: 12px; margin-top: 18px; padding-top: 16px; border-top: 1px solid #E7EDF4; }
    .foto { width: 46px; height: 46px; border-radius: 50%; overflow: hidden; background: #E8F4FC; flex-shrink: 0; }
    ::slotted(img[slot="foto"]) { display: block; width: 100%; height: 100%; object-fit: cover; }
    ::slotted([slot="nombre"]) { color: #193655; font-weight: 700; font-size: .95rem; }
  </style>
  <figure>
    <div class="estrellas" id="estrellas" role="img"></div>
    <blockquote class="comentario" style="margin:0"><slot>Sin comentario.</slot></blockquote>
    <figcaption>
      <div class="foto"><slot name="foto"></slot></div>
      <slot name="nombre">Cliente anónimo</slot>
    </figcaption>
  </figure>
`;

export class TestimonioCliente extends HTMLElement {
  static get observedAttributes() { return ["estrellas"]; }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.shadowRoot.querySelector("figure")) {
      this.shadowRoot.append(plantilla.content.cloneNode(true));
    }
    this.dibujarEstrellas();
  }

  attributeChangedCallback(nombre, anterior, nuevo) {
    if (anterior !== nuevo) this.dibujarEstrellas();
  }

  get estrellas() { return Number(this.getAttribute("estrellas")); }
  set estrellas(valor) { this.setAttribute("estrellas", String(valor)); }

  dibujarEstrellas() {
    const contenedor = this.shadowRoot.getElementById("estrellas");
    if (!contenedor) return; // Plantilla aún no clonada.
    // Se limita el valor al rango 0-5; si no es número, se muestran 0 estrellas.
    const valor = Math.min(5, Math.max(0, Math.round(this.estrellas) || 0));
    contenedor.textContent = "★".repeat(valor) + "☆".repeat(5 - valor);
    contenedor.setAttribute("aria-label", `Calificación: ${valor} de 5 estrellas`);
  }
}

if (!customElements.get("testimonio-cliente")) {
  customElements.define("testimonio-cliente", TestimonioCliente);
}
