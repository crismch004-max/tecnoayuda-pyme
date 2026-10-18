// componentes/tarjeta-producto.js · Unidad 1: Web Components
// PASO 2: UNA plantilla HTML fuera de la clase; cada instancia usa su propia copia.
const plantilla = document.createElement("template");
plantilla.innerHTML = `
  <style>
    /* PASO 3: estilos del componente encapsulados con Shadow DOM. */
    :host {
      display: block;
      box-sizing: border-box;
      height: 100%;
      border: 1px solid #E1EAF3;
      border-top: 4px solid var(--color-marca, #176A91);
      border-radius: 17px;
      background: #FFFFFF;
      color: #172842;
      overflow: hidden;
      box-shadow: 0 8px 25px rgba(21, 55, 89, .065);
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
      transition: box-shadow .2s ease, transform .2s ease;
    }
    :host(:hover) { transform: translateY(-3px); box-shadow: 0 15px 37px rgba(21, 55, 89, .12); }
    :host([destacado]) { border-top-width: 7px; }
    article { display: flex; flex-direction: column; height: 100%; }
    .imagen { width: 100%; background: #E8F4FC; aspect-ratio: 16 / 9; overflow: hidden; }
    ::slotted(img[slot="foto"]) { display: block; width: 100%; height: 100%; object-fit: cover; }
    .cuerpo { display: flex; flex: 1; flex-direction: column; padding: 23px 22px 20px; }
    .categoria { color: var(--color-marca, #176A91); font-size: .68rem; letter-spacing: .15em; font-weight: 800; margin-bottom: 10px; }
    .nombre { min-height: 2.8em; }
    ::slotted([slot="nombre"]) { color: #193655; font-size: 1.19rem; line-height: 1.36; letter-spacing: -.025em; font-weight: 740; margin: 0; }
    .descripcion { color: #65778C; line-height: 1.65; font-size: .9rem; margin-top: 13px; flex: 1; }
    ::slotted(p) { margin: 0; }
    .pie { display: flex; justify-content: space-between; align-items: flex-end; gap: 10px; border-top: 1px solid #E7EDF4; padding-top: 16px; margin-top: 24px; }
    .etiqueta-precio { font-size: .76rem; color: #74859A; }
    #precio { display: block; margin-top: 2px; color: var(--color-marca, #176A91); font-size: 1.66rem; line-height: 1.15; font-weight: 830; letter-spacing: -.035em; }
    .sello { font-size: .69rem; color: #668398; background: #F0F6FB; padding: 7px 9px; border-radius: 999px; white-space: nowrap; }
    @media (prefers-reduced-motion: reduce) { :host { transition: none; } :host(:hover) { transform: none; } }
  </style>
  <!-- PASO 2: slots con nombre foto/nombre y slot sin nombre con respaldo. -->
  <article>
    <div class="imagen"><slot name="foto">Imagen no disponible.</slot></div>
    <div class="cuerpo">
      <span class="categoria">SERVICIO TECNOLÓGICO</span>
      <div class="nombre"><slot name="nombre">Servicio sin nombre.</slot></div>
      <div class="descripcion"><slot>Descripción no disponible.</slot></div>
      <div class="pie">
        <div><span class="etiqueta-precio">Precio</span><strong id="precio" aria-live="polite">—</strong></div>
        <span class="sello">Tarifa publicada</span>
      </div>
    </div>
  </article>
`;

// PASO 1: Custom Element exportado desde su propio módulo ES.
export class TarjetaProducto extends HTMLElement {
  // PASO 3: el navegador notifica las modificaciones del atributo precio.
  static get observedAttributes() { return ["precio"]; }

  constructor() {
    super();
    // Aquí solo se prepara Shadow DOM; NO se dibuja HTML ni se leen atributos.
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // PASO 2: cloneNode(true) crea una copia independiente para cada tarjeta.
    // El guard evita duplicar el HTML si el elemento se desconecta y reconecta.
    if (!this.shadowRoot.querySelector("article")) {
      this.shadowRoot.append(plantilla.content.cloneNode(true));
    }
    // PASO 3: ahora existe #precio y podemos mostrar el valor inicial.
    this.actualizarPrecio();
  }

  attributeChangedCallback(nombre, anterior, nuevo) {
    if (nombre === "precio" && anterior !== nuevo) {
      // Puede ocurrir antes de connectedCallback; actualizarPrecio lo comprueba.
      this.actualizarPrecio();
    }
  }

  // PASO 3: atributo HTML y propiedad JavaScript sincronizados.
  get precio() { return Number(this.getAttribute("precio")); }
  set precio(valor) { this.setAttribute("precio", String(valor)); }

  actualizarPrecio() {
    const elementoPrecio = this.shadowRoot.getElementById("precio");
    if (!elementoPrecio) return; // Plantilla aún no clonada.

    const texto = this.getAttribute("precio");
    const valor = Number(texto);
    if (texto === null || texto.trim() === "" || !Number.isFinite(valor) || valor < 0) {
      elementoPrecio.textContent = "Consultar";
      return;
    }
    elementoPrecio.textContent = `$${valor.toLocaleString("es-EC", { maximumFractionDigits: 2 })}`;
  }
}

// PASO 1: nombre personalizado válido; lleva guion y se importa desde index.html.
if (!customElements.get("tarjeta-producto")) {
  customElements.define("tarjeta-producto", TarjetaProducto);
}
