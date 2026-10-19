// componentes/boton-contacto.js · Autor: Cristian · Unidad 1: Web Components
// Botón de llamada a la acción que abre WhatsApp. Atributos: telefono, mensaje, variante.
const plantilla = document.createElement("template");
plantilla.innerHTML = `
  <style>
    :host { display: inline-block; font-family: system-ui, -apple-system, "Segoe UI", Arial, sans-serif; }
    a {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 12px 22px; border-radius: 999px; border: 2px solid var(--color-marca, #176A91);
      background: var(--color-marca, #176A91); color: #FFFFFF;
      font-size: .92rem; font-weight: 700; text-decoration: none; cursor: pointer;
      transition: transform .15s ease, box-shadow .15s ease, background .15s ease;
    }
    a:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(23, 106, 145, .3); }
    a:focus-visible { outline: 3px solid #65DFE8; outline-offset: 2px; }
    :host([variante="secundario"]) a { background: transparent; color: var(--color-marca, #176A91); }
    :host([variante="claro"]) a { background: #FFFFFF; border-color: #FFFFFF; color: #163760; }
    @media (prefers-reduced-motion: reduce) { a { transition: none; } a:hover { transform: none; } }
  </style>
  <a part="boton" id="enlace" target="_blank" rel="noopener noreferrer">
    <span aria-hidden="true"></span><slot>Solicitar servicio</slot>
  </a>
`;

export class BotonContacto extends HTMLElement {
  static get observedAttributes() { return ["telefono", "mensaje", "variante"]; }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!this.shadowRoot.querySelector("a")) {
      this.shadowRoot.append(plantilla.content.cloneNode(true));
      this.shadowRoot.getElementById("enlace").addEventListener("click", () => {
        // Evento personalizado: la página puede escuchar "contacto-click".
        this.dispatchEvent(new CustomEvent("contacto-click", {
          bubbles: true, composed: true, detail: { telefono: this.telefono },
        }));
      });
    }
    this.actualizarEnlace();
  }

  attributeChangedCallback(nombre, anterior, nuevo) {
    if (anterior !== nuevo) this.actualizarEnlace();
  }

  get telefono() { return this.getAttribute("telefono") ?? ""; }
  set telefono(valor) { this.setAttribute("telefono", String(valor)); }

  actualizarEnlace() {
    const enlace = this.shadowRoot.getElementById("enlace");
    if (!enlace) return; // Plantilla aún no clonada.
    const numero = this.telefono.replace(/\D/g, "");
    const mensaje = this.getAttribute("mensaje") ?? "Hola, quiero información sobre sus servicios.";
    enlace.href = numero
      ? `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`
      : "#";
  }
}

if (!customElements.get("boton-contacto")) {
  customElements.define("boton-contacto", BotonContacto);
}
