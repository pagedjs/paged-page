import { LitElement, html, css } from 'lit';
import { PagedDocument } from './PagedDocument.js';
import { PagedPage } from './PagedPage.js';
import { PagedHorizontalMarginThroughPseudo, PagedMarginBoxThroughPseudo } from './PagedMargin/research/PagedMarginPseudo.js';
import { PagedHorizontalMarginAutosize, PagedMarginBoxAutosize } from './PagedMargin/research/PagedMarginAutosize.js';
import { PagedHorizontalMarginAutosizeSimplified } from './PagedMargin/research/PagedMarginAutosizeSimplified.js'; 
import { PagedMarginBox } from './PagedMargin/PagedMargin.js';
// import { pagedjs } from 'pagedjs';

export class PagedPreview extends LitElement {
  static styles = css``;

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    //pagedjs.preview(this);
  }

  render() {
    return html`
      <slot>
        <paged-document></paged-document>
      </slot>
    `;
  }
}

customElements.define('paged-preview', PagedPreview);