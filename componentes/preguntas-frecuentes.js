// componentes/preguntas-frecuentes.js · Autor: Diego · Unidad 1: Web Components
// Ítem de acordeón. Atributo booleano: abierto. Slots: pregunta y respuesta (sin nombre).
const plantilla = document.createElement("template");
plantilla.innerHTML = `
  <style>
    :host {
      display: block; background: #FFFFFF; border: 1px solid #E1EAF3; border-radius: 14px;
      overflow: hidden; color: #172842;
      font-family: system-ui, -apple-system, "Segoe UI", Arial, sans-serif;
    }
    :host([abierto]) { border-color: var(--color-marca, #176A91); }
    button {
      display: flex; width: 100%; align-items: center; justify-content: space-between; gap: 12px;
      padding: 16px 20px; border: 0; background: transparent; cursor: pointer;
      font: inherit; text-align: left; color: #193655;
    }
    button:focus-visible { outline: 3px solid #65DFE8; outline-offset: -3px; }
    ::slotted([slot="pregunta"]) { margin: 0; font-size: 1rem; font-weight: 700; }
    .icono { color: var(--color-marca, #176A91); font-size: 1.4rem; font-weight: 700; transition: transform .2s ease; }
    :host([abierto]) .icono { transform: rotate(45deg); }
    .respuesta { padding: 0 20px 18px; color: #65778C; line-height: 1.65; font-size: .92rem; }
    .respuesta[hidden] { display: none; }
    ::slotted(p) { margin: 0; }
    @media (prefers-reduced-motion: reduce) { .icono { transition: none; } }
  </style>
  <button id="boton" aria-expanded="false" aria-controls="respuesta">
    <slot name="pregunta">Pregunta</slot>
    <span class="icono" aria-hidden="true">+</span>
  </button>
  <div class="respuesta" id="respuesta" role="region" hidden><slot>Respuesta no disponible.</slot></div>
`;

export class PreguntasFrecuentes extends HTMLElement {
  static get observedAttributes() { return ["abierto"]; }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.shadowRoot.querySelector("button")) {
      this.shadowRoot.append(plantilla.content.cloneNode(true));
      this.shadowRoot.getElementById("boton").addEventListener("click", () => {
        this.abierto = !this.abierto;
      });
    }
    this.sincronizar();
  }

  attributeChangedCallback(nombre, anterior, nuevo) {
    if (anterior !== nuevo) this.sincronizar();
  }

  // Atributo booleano <-> propiedad.
  get abierto() { return this.hasAttribute("abierto"); }
  set abierto(valor) { this.toggleAttribute("abierto", Boolean(valor)); }

  sincronizar() {
    const boton = this.shadowRoot.getElementById("boton");
    if (!boton) return; // Plantilla aún no clonada.
    boton.setAttribute("aria-expanded", String(this.abierto));
    this.shadowRoot.getElementById("respuesta").hidden = !this.abierto;
    this.dispatchEvent(new CustomEvent("cambio-estado", { bubbles: true, composed: true, detail: { abierto: this.abierto } }));
  }
}

if (!customElements.get("preguntas-frecuentes")) {
  customElements.define("preguntas-frecuentes", PreguntasFrecuentes);
}
