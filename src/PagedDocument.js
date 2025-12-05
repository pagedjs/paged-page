import { LitElement, html } from "lit";
import { ref, createRef } from "lit/directives/ref.js";
import { PagedPage } from "./PagedPage/PagedPage.js";

export class PagedDocument extends LitElement {
  static properties = {
    pages: { type: Array },
  };

  constructor() {
    super();
    this.pages = new Array();
    this.pagesTemplate = Array();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  addPage() {
    let newPage = {
      ref: createRef(),
    };
    this.pages.push(newPage);
    this.pagesTemplate.push(
      html`<paged-page
        ${ref(newPage.ref)}
        index="${this.pagesTemplate.length + 1}"
      ></paged-page>`,
    );
    this.requestUpdate();
  }

  render() {
    return html` <slot> ${this.pagesTemplate} </slot> `;
  }
}

customElements.define("paged-document", PagedDocument);

