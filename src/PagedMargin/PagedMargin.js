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

export class PagedMarginContent extends LitElement {
  constructor() {
    super();
  }

  render () {
    return html`<slot></slot>`;
  }
}

/**
 * Essentially a no-op wrapper.
 * But makes it easier to style, but mostly select the box in javascript.
 */
export class PagedMarginBox extends LitElement {
  constructor() {
    super();
  }

  render () {
    return html`<slot></slot>`;
  }
}


export class PagedMarginGroupHorizontal extends LitElement {
  constructor() {
    super();
  }

  static styles = css`
  :host {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  paged-margin-box {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  #center {
    text-align: center;
    justify-content: center;
  }

  #right {
    text-align: right;
    justify-content: end;
  }
  `

  render () {
    return html`
    <paged-margin-box part="left margin-box" id="left">
      <slot name="left"></slot>
    </paged-margin-box>
    <paged-margin-box part="center margin-box" id="center">
      <slot name="center"></slot>
    </paged-margin-box>
    <paged-margin-box part="right margin-box" id="right">
      <slot name="right"></slot>
    </paged-margin-box>
    `;
  }
}


export class PagedMarginGroupVertical extends LitElement {
  static properties = {
    side: { type: String}
  };

  constructor() {
    super();
  }

  static styles = css`
  :host {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
  }

  paged-margin-box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  #top {
    align-items: start;
  }

  #bottom {
    align-items: end;
  }
  `

  render () {
    return html`
    <paged-margin-box part="top margin-box" id="top">
      <slot name="top"></slot>
    </paged-margin-box>
    <paged-margin-box part="middle margin-box" id="middle">
      <slot name="middle"></slot>
    </paged-margin-box>
    <paged-margin-box part="bottom margin-box" id="bottom">
      <slot name="bottom"></slot>
    </paged-margin-box>
    `;
  }
}


export class PagedMargin extends LitElement {
  constructor () {
    super();
  }

  static styles = css`
    :host {
      --margin-top: 15mm;
      --margin-right: 5mm;
      --margin-bottom: 10mm;
      --margin-left: 5mm;

      display: grid;
      grid-template-columns: 
        [margin-left-start] var(--margin-left)
        [margin-left-end page-area-start] 1fr
        [margin-right-start page-area-end] var(--margin-right)
        [margin-right-end];
      grid-template-rows:
        [margin-top-start] var(--margin-top)
        [margin-top-end page-area-start] 1fr
        [margin-bottom-start page-area-end] var(--margin-bottom)
        [margin-bottom-end];
      grid-template-areas:
        "top-left-corner top top-right-corner"
        "left page-area right"
        "bottom-left-corner bottom bottom-right-corner";
    }

    paged-margin-box {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #top-left-corner { grid-area: top-left-corner; }
    #top { grid-area: top; }
    #top-right-corner { grid-area: top-right-corner; }

    #right { grid-area: right; }

    #bottom-left-corner { grid-area: bottom-left-corner; }
    #bottom { grid-area: bottom; }
    #bottom-right-corner { grid-area: bottom-right-corner; }

    #left { grid-area: left; }
  `

  render () {
    return html`
      <paged-margin-box id="top-left-corner" part="margin-box top-left-corner">
        <slot name="top-left-corner"></slot>
      </paged-margin-box>

      <paged-margin-group-horizontal 
        id="top"
        part="margin-box-group top"
        exportparts="margin-box, left:top-left, center:top-center, right:top-right"
      >
        <slot name="top-left" slot="left"></slot>
        <slot name="top-center" slot="center"></slot>
        <slot name="top-right" slot="right"></slot>
      </paged-margin-group-horizontal>

      <paged-margin-box id="top-right-corner" part="margin-box top-right-corner">
        <slot name="top-right-corner"></slot>
      </paged-margin-box>
      
      <paged-margin-group-vertical
        id="left"  
        part="margin-box-group left"
        exportparts="margin-box, top:left-top, middle:left-middle, bottom:left-bottom"
      >
        <slot name="left-top" slot="top"></slot>
        <slot name="left-middle" slot="middle"></slot>
        <slot name="left-bottom" slot="bottom"></slot>
      </paged-margin-group-vertical>

      <paged-margin-group-vertical
        id="right"
        part="margin-box-group right"
        exportparts="margin-box, top:right-top, middle:right-middle, bottom:right-bottom"
      >
        <slot name="right-top" slot="top"></slot>
        <slot name="right-middle" slot="middle"></slot>
        <slot name="right-bottom" slot="bottom"></slot>
      </paged-margin-group-vertical>
      
      <paged-margin-box id="bottom-left-corner" part="margin-box bottom-left-corner">
        <slot name="bottom-left-corner"></slot>
      </paged-margin-box>
      
      <paged-margin-group-horizontal
        id="bottom"
        part="margin-box-group bottom"
        exportparts="margin-box, left:bottom-left, center:bottom-center, right:bottom-right"
      >
        <slot name="bottom-left" slot="left"></slot>
        <slot name="bottom-center" slot="center"></slot>
        <slot name="bottom-right" slot="right"></slot>
      </paged-margin-group-horizontal>

      <paged-margin-box id="bottom-right-corner" part="margin-box bottom-right-corner">
        <slot name="bottom-right-corner"></slot>
      </paged-margin-box>
    `;
  }
}

customElements.define("paged-margin-content", PagedMarginContent);
customElements.define("paged-margin-box", PagedMarginBox);
customElements.define("paged-margin-group-horizontal", PagedMarginGroupHorizontal);
customElements.define("paged-margin-group-vertical", PagedMarginGroupVertical);
customElements.define("paged-margin", PagedMargin);