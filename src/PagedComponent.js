import { html, render } from 'lit-html';

class PagedComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return [];
  }
  
  get someProperty() {
    return this.#someProperty;
  }
  
  get someProperty(val) {
    this.#someProperty = val;
    this.update();
  }

  connectedCallback() {
    this.update();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.update();
    }
  }

  update() {
    render(this.render, this.shadowRoot);
  }

  render() {
    return html``;
  }
}

customElements.define('paged-component', PagedComponent);