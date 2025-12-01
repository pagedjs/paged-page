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

    #top-left-corner { grid-area: top-left-corner; }
    #top { grid-area: top;}
    #top-right-corner { grid-area: top-right-corner; }

    #right { grid-area: right; }

    #bottom-left-corner { grid-area: bottom-left-corner; }
    #bottom { grid-area: bottom; }
    #bottom-right-corner { grid-area: bottom-right-corner; }

    #left { grid-area: left; }

    paged-margin-box {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #top,
    #bottom {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
    }
    
    #left,
    #right {
      display: grid;
      grid-template-rows: 1fr 1fr 1fr;
    }

    #top-left,
    #bottom-left {
      text-align: left;
      justify-content: start;
    }

    #top-right,
    #bottom-right {
      text-align: right;
      justify-content: end;
    }

    #left-top,
    #right-top {
      align-items: start;
    }

    #left-bottom,
    #right-bottom {
      align-items: end;
    }
  `

  render () {
    return html`
      <paged-margin-box id="top-left-corner" part="margin-box top-left-corner">
        <slot name="top-left-corner"></slot>
      </paged-margin-box>

      <div id="top" part="margin-box-group top">
        <paged-margin-box id="top-left" part="margin-box top-left">
          <slot name="top-left"></slot>
        </paged-margin-box>
        <paged-margin-box id="top-center" part="margin-box top-center">
          <slot name="top-center"></slot>
        </paged-margin-box>
        <paged-margin-box id="top-right" part="margin-box top-right">
          <slot name="top-right"></slot>
        </paged-margin-box>
      </div>

      <paged-margin-box id="top-right-corner" part="margin-box top-right-corner">
        <slot name="top-right-corner"></slot>
      </paged-margin-box>
      
      <div id="left" part="margin-box-group left">
        <paged-margin-box id="left-top" part="margin-box left-top">
          <slot name="left-top"></slot>
        </paged-margin-box>
        <paged-margin-box id="left-middle" part="margin-box left-middle">
          <slot name="left-middle"></slot>
        </paged-margin-box>
        <paged-margin-box id="left-bottom" part="margin-box left-bottom">
          <slot name="left-bottom"></slot>
        </paged-margin-box>
      </div>

      <div id="right" part="margin-box-group right">
        <paged-margin-box id="right-top" part="margin-box right-top">
          <slot name="right-top"></slot>
        </paged-margin-box>
        <paged-margin-box id="right-middle" part="margin-box right-middle">
          <slot name="right-middle"></slot>
        </paged-margin-box>
        <paged-margin-box id="right-bottom" part="margin-box right-bottom">
          <slot name="right-bottom"></slot>
        </paged-margin-box>
      </div>
      
      <paged-margin-box id="bottom-left-corner" part="margin-box bottom-left-corner">
        <slot name="bottom-left-corner"></slot>
      </paged-margin-box>
      
      <div id="bottom" part="margin-box-group bottom">
        <paged-margin-box id="bottom-left" part="margin-box bottom-left">
          <slot name="bottom-left"></slot>
        </paged-margin-box>
        <paged-margin-box id="bottom-center" part="margin-box bottom-center">
          <slot name="bottom-center"></slot>
        </paged-margin-box>
        <paged-margin-box id="bottom-right" part="margin-box bottom-right">
          <slot name="bottom-right"></slot>
        </paged-margin-box>
      </div>

      <paged-margin-box id="bottom-right-corner" part="margin-box bottom-right-corner">
        <slot name="bottom-right-corner"></slot>
      </paged-margin-box>
    `;
  }
}

customElements.define("paged-margin-content", PagedMarginContent);
customElements.define("paged-margin-box", PagedMarginBox);
customElements.define("paged-margin", PagedMargin);