import { LitElement, html, css } from "lit";

/**
 *  TO Discuss
 *  1. background should be in a preview/component component ?
 *  2. preview would put the page in a grid and therefore paged-page will not need any margin
 *  3. insert style with lower priority?
 *  4. use has: to define the grid subdivision with css
 *
 **/

export class PagedPage extends LitElement {
  static properties = {
    index: { type: Number },
    width: { type: String },
    height: { type: String },
    name: { type: String },
  };

  static styles = css`
    :host {
      width: calc(var(--page-width, 210mm) + var(--bleed, 0mm));
      height: calc(var(--page-height, 297mm) + var(--bleed, 0mm));
      overflow: hidden;
      break-after: page;
      outline: 1px solid red;
      display: grid;
      margin: auto;
      --margin-left: 8mm;
      --margin-right: 10mm;
      --margin-top: 6mm;
      --margin-bottom: 12mm;
      display: grid;
      grid-template-rows:
        [bleed-top-start] var(--bleed, 5mm)
        [bleed-top-end margin-top-start] var(--margin-top)
        [margin-top-end page-area-start] minmax(1px, 1fr)
        [page-area-end margin-bottom-start] var(--margin-bottom)
        [margin-bottom-end bleed-bottom-start] var(--bleed, 5mm)
        [bleed-bottom-end];
      grid-template-columns:
        [bleed-left-start] var(--bleed, 5mm)
        [bleed-left-end margin-left-start] var(--margin-left)
        [margin-left-end page-area-start] 1fr
        [page-area-end margin-right-start] var(--margin-right)
        [margin-right-end bleed-right-start] var(--bleed, 5mm)
        [bleed-right-end];
    }

    .page-area {
      grid-column: page-area-start / page-area-end;
      grid-row: page-area-start / page-area-end;
    }

    .margin-bottom {
      grid-row: margin-bottom;
      grid-column: page-area;
      display: flex;
      
      [name="mbl"],
      [name="mbc"],
      [name="mbr"],
      .empty {
        flex: 1 0 33%;
      }

      [name="mbr"] {
        text-align: right;
      }
      [name="mbc"] {
        text-align: center;
      }
    }

    :is([name="mbl"], [name="mbc"], [name="mbr"])::slotted(*) {
      flex: 1 0 33%;
    }

    @media screen {
      :host {
        outline: 1px solid gainsboro;
        background: white;
        margin: 2rem auto;
      }
    }
  `;

  constructor() {
    super();
    this.index = null;
    this.width = "210mm";
    this.height = "297mm";
    this.name = "";
  }

  connectedCallback() {
    super.connectedCallback();

    let styles = new CSSStyleSheet();
    styles.replaceSync(`
      body {
        margin: 0;
        padding: 0;
      }

      /*
       * cant really use variable for that, because the variables are created from within, how to change the variable for that page 
       * since you can only have one root, and the variable are not part of the element, you can’t really manipulate that.
       */
      @page ${this.name} {
        margin: 0;
        size: calc(${this.width} + var(--bleed, 0mm)) calc(${this.height} + var(--bleed, 0mm));
      }

    [name="${this.name}"] {
        --page-width: ${this.width}; 
        --page-height: ${this.height};
        page: ${this.name}
    }

    @media screen {
        body {
          /*background: whitesmoke;*/
        }
      }
    `);

    document.adoptedStyleSheets.push(styles);
  }

  render() {
    return html`
      <div class="page-area"><slot></slot></div>
      <div class="margin-bottom" part="margin-bottom" >
        <!--  mbl mbc mbr  -->
        <slot name="mbl">
          <div class="empty"></div>
        </slot>
        <slot name="mbc">
          <div class="empty"></div>
        </slot>
        <slot name="mbr">
          <div class="empty"></div>
        </slot>
      </div>
    `;
  }
}

customElements.define("paged-page", PagedPage);
