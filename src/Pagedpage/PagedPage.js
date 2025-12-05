import { LitElement, html, css } from "lit";

/**
 * `<paged-page>` — A printable, CSS-controlled page component with support for
 * margins, bleed, full-page grid layout, and print sizing via the `@page` rule.
 *
 * This element:
 * - Auto-assigns a unique page name when none is provided, ensuring consistent
 *   print and preview rendering.
 * - Reflects the `name`, `width`, and `height` properties to attributes so
 *   CSS selectors like `[name="..."]` work on both screen and print.
 * - Injects a dynamic `@page <name>` rule using `adoptedStyleSheets` so each
 *   page instance can have unique print dimensions.
 *
 * @element paged-page
 *
 * @slot - Main content of the page, placed inside the page-area grid region.
 *
 * @csspart page-area - The main printable content area.
 *
 * @cssprop --page-width - Internal CSS width used for layout.
 * @cssprop --page-height - Internal CSS height used for layout.
 * @cssprop --bleed - Extra print bleed size.
 * @cssprop --margin-top
 * @cssprop --margin-bottom
 * @cssprop --margin-left
 * @cssprop --margin-right
 */
export class PagedPage extends LitElement {
  /**
   * Lit properties for the component.
   *
   * @property {string} name
   *  The name of the page used in the `@page` rule and exposed as an attribute.
   *  Auto-generated if not provided.
   *
   * @property {number|null} index
   *  Optional index for multi-page contexts.
   *
   * @property {string} width
   *  Page width, e.g. `"210mm"`. Reflected so CSS `[width="..."]` selectors
   *  and internal sizing work consistently.
   *
   * @property {string} height
   *  Page height, e.g. `"297mm"`. Reflected so CSS `[height="..."]` selectors
   *  and internal sizing work consistently.
   */
  static properties = {
    name: { type: String, reflect: true },
    index: { type: Number },
    width: { type: String, reflect: true },
    height: { type: String, reflect: true },
  };

  /**
   * Component-wide stylesheet defining layout, grid tracks, default margins,
   * print behavior, and preview appearance.
   */
  static styles = css`
    body {
      margin: 0;
      padding: 0;
    }
    *,
    * * {
      box-sizing: border-box;
    }

    :host {
      width: calc(var(--page-width, 210mm) + var(--bleed, 0mm));
      height: calc(var(--page-height, 297mm) + var(--bleed, 0mm));
      overflow: hidden;
      break-after: page;
      background: orange;
      display: grid;
      margin: 0;
      padding: 0;
      --margin-left: 8mm;
      --margin-right: 10mm;
      --margin-top: 6mm;
      --margin-bottom: 12mm;

      grid-template-rows:
        [bleed-top-start] var(--bleed, 0mm)
        [bleed-top-end margin-top-start] var(--margin-top)
        [margin-top-end page-area-start] minmax(1px, 1fr)
        [page-area-end margin-bottom-start] var(--margin-bottom)
        [margin-bottom-end bleed-bottom-start] var(--bleed, 5mm)
        [bleed-bottom-end];

      grid-template-columns:
        [bleed-left-start] var(--bleed, 0mm)
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

    @media screen {
      :host {
        // outline: 1px solid gainsboro;
        // background: white;
        margin: 2rem auto;
      }
    }
  `;

  /**
   * Constructor initializes defaults.
   */
  constructor() {
    super();
    this.index = null;
    this.width = "210mm";
    this.height = "297mm";
    this.name = ""; // auto-filled in connectedCallback
  }

  /**
   * Lifecycle: Runs when component is added to the DOM.
   *
   * - Ensures the element has a valid `name` attribute.
   * - Injects a dynamic `@page` rule to ensure print sizing matches preview.
   */
  connectedCallback() {
    super.connectedCallback();

    // Auto-assign name if missing
    if (!this.hasAttribute("name") || !this.name?.trim()) {
      const autoName = `page-${crypto.randomUUID()}`;
      this.name = autoName; // reflect:true ensures the attribute is written
    }

    // Inject the @page rules
    this.#injectPageStyles();

    // Inject the  default printing rule
    this.#injectGlobalPrintStyles();
  }

  static globalPrintStylesApplied = false;

  /**
   * Injects global @media print rules into the document.
   * Ensures it only runs once.
   *
   * @private
   */
  #injectGlobalPrintStyles() {
    if (PagedPage.globalPrintStylesApplied) return;
    PagedPage.globalPrintStylesApplied = true;

    const sheet = new CSSStyleSheet();
    sheet.replaceSync(`
    @media print {
      body {
        margin: 0 !important;
        padding: 0 !important;
      }
    }
  `);

    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
  }

  /**
   * Injects a dynamic stylesheet that defines a unique `@page <name>` rule
   * and binds the host element to that page context.
   *
   * This is required because:
   * - CSS variables cannot be used in `@page`
   * - browsers do not always apply unnamed @page rules consistently
   *
   * @private
   */
  #injectPageStyles() {
    const sheet = new CSSStyleSheet();

    sheet.replaceSync(`
      @page ${this.name} {
        margin: 0;
        size: calc(${this.width} + var(--bleed, 0mm))
              calc(${this.height} + var(--bleed, 0mm));
      }

      [name="${this.name}"] {
        --page-width: calc( ${this.width} + var(--bleed, 0mm));
        --page-height: calc( ${this.height} + var(--bleed, 0mm));
        page: ${this.name};
      }
    `);

    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
  }

  /**
   * Renders the content area of the page.
   *
   * @returns {import("lit").TemplateResult}
   */
  render() {
    return html`
      <div class="page-area" part="page-area">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("paged-page", PagedPage);
