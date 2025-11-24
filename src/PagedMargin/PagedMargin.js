import { LitElement, html, css } from "lit";

/**
 * Expected use:
 * PagedHorizontalMarginAutosize
 *    PagedMarginBoxAutosize
 *      slot
 *    PagedMarginBoxAutosize
 *      slot
 *    PagedMarginBoxAutosize
 *      slot
 * 
 * 
 * The PagedMarginBoxAutosize measures length of its slotted content after 
 * it is added to DOM. It then emits an event `intrinsic-content-width`.
 * 
 * PagedHorizontalMarginAutosize listens for this event. When it receives it
 * it will update its internal registry and update sizes of the content
 * boxes by updating template column string.
 * 
 * At the moment changes in the element are not recognized.
 * slotchange event exists but only fires when nodes are added or removed.
 */

/**
 * Essentially a no-op wrapper.
 * But makes it easier to style, but mostly select the box in javascript.
 */
export class PagedMarginBox extends LitElement {
  static properties = {
    position: { type: String }
  };

  constructor() {
    super();
  }

  render () {
    return html`<slot></slot>`;
  }
}

export class PagedHorizontalMargin extends LitElement {
  static properties = {
    side: { type: String}
  };

  constructor() {
    super();
  }

  static styles = css`
  :host {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  ::slotted(paged-margin-box) {
    display: flex;
    align-items: center;
  }

  
  [name="left"]::slotted(paged-margin-box) {
    grid-column: 1;
  }

  [name="center"]::slotted(paged-margin-box) {
    grid-column: 2;
    text-align: center;
    justify-content: center;
  }

  [name="right"]::slotted(paged-margin-box) {
    grid-column: 3;
    text-align: right;
    justify-content: end;
  }
  `

  render () {
    return html`
    <slot name="left"></slot>
    <slot name="center"></slot>
    <slot name="right"></slot>
    `;
  }
}

customElements.define("paged-margin-box", PagedMarginBox)
customElements.define("paged-horizontal-margin", PagedHorizontalMargin);