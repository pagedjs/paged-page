# PagedMargin

The PagedMargin components facilitates rendering margin content on a page as defined in the W3C paged media spec.

## Usage

The paged-margin component renders the margin boxes. It is intended to be
used with a paged-page component. But can also be used by itself:

```html
<paged-margin></paged-margin>
```


### Assigning content

The paged-margin component renders a series of margin boxes. Content can be assigned through CSS or the DOM. 

#### CSS

Content can be assigned with CSS through a combination of a `::part`-selector
which targets the relevant `<margin-box>` and a `::before` or `::after` pseudo-selector
which create a pseudo-element.

This snippet will render a `<paged-margin>` with the text 'Hello, world!' printed
at the top center.

Note: the `<paged-margin>` doesn't have an inherent size, much a like a `<div>`. The component is expected to be used in contexts where it either receives geometry from its parent or it being set with CSS, like in the example code:

```html
<style>
paged-margin {
  width: 210mm;
  height: 297mm;
}

paged-margin::part(top-center)::before {
  content: "Hello, world!";
}
</style>

<paged-margin></paged-margin>
```

#### DOM

Content can also be assigned directly in the DOM by inserting elements into the provided slots. The `<paged-margin-content>` component is the most transparent way to insert plain text. But arbitrary elements can be assigned to the slots.

This snippet will render a paged-margin box with the text 'Hello, world!' printed at the top center. It uses the `<paged-margin-content>` component and targets the margin-box with the `slot`-attribute.

```html
<style>
paged-margin {
  width: 210mm;
  height: 297mm;
}
</style>

<paged-margin>
  <paged-margin-content slot="top-center">Hello, world!</paged-margin-content>
</paged-margin>
```

It is possible to assign any HTML-element to a marginbox using the slot attribute. This snippet will render a h1 element at the top center of the page.

```html
<style>
paged-margin {
  width: 210mm;
  height: 297mm;
}
</style>

<paged-margin>
  <h1 slot="top-center">Hello, world!</h1>
</paged-margin>
```

### Setting the margin size

The paged-margin has default margins of 15mm. The margin-sizes can be influenced through four custom css properties: `--margin-top`, `--margin-right`, `--margin-bottom` & `--margin-left`.

```html
<style>
paged-margin {
  width: 210mm;
  height: 297mm;

  --margin-top: 30mm;
  --margin-right: 10mm;
  --margin-bottom: 10mm;
  --margin-left: 10mm;
}
</style>

<paged-margin>
  <paged-margin-content slot="top-center">Hello, world!</paged-margin-content>
</paged-margin>
```


### Styling the margin boxes

The `paged-margin` component exposes a set of parts to style and set content on the margin-boxes. The parts for the individual margin-boxes follow the naming scheme of the paged media spec.

The following sample changes the font-style and background for the bottom-center margin box:

```html
<style>
  paged-margin {
    width: 210mm;
    height: 297mm;
  }

  paged-margin::part(bottom-center) {
    color: white;
    background: black;
    font-weight: bold;
  }
</style>

<paged-margin></paged-margin>
```

### Adjusting the margin inline size

The inline size of margin boxes which belong to a margin-box-group is defined through the grid declaration of the margin-box-group. Therefor the inline size can be changed by changing the grid declaration, this is possible by using the part for the relevant margin-box-group.

Note: As both the inline and block size of the corners is defined through the size of the margins, their size can only be changed through the custom css properties.

The following sample changes the size of the top-center margin box by adjusting the grid of the margin-box-group-top.

```html
<style>
  paged-margin {
    width: 210mm;
    height: 297mm;
  }

  paged-margin::part(margin-box-group-top) {
    grid-template-columns: 0 1fr 0;
  }
</style>

<paged-margin></paged-margin>
```

### Special parts

In addition to the individual boxes the component also offers parts to target all the margin boxes or a subset of them. The sample below uses the `margin-box` part to set the background of all margin-boxes while it uses the part `left` to set the color of the margin-boxes on the left side of the page.

Note: the corner boxes are always part of two side. Top-left-corner box will be targeted by both the `left` as well as the `top`-part.

```html

<style>
paged-margin {
  width: 210mm;
  height: 297mm;

  --margin-top: 30mm;
  --margin-right: 10mm;
  --margin-left: 10mm;
  --margin-bottom: 10mm;
}

paged-margin::part(margin-box) {
  background: grey;
}

paged-margin::part(left) {
  background: red;
}
</style>

<paged-margin></paged-margin>

```

Note: the parts are not meant to be used to set the margin sizes, this might
lead to unexpected results.


## API

### PagedMargin `<paged-margin>`

#### properties

| Property | Attribute | Type | Default | Description |
| -------- | --------- | ---- | ------- | ----------- |
| marginBoxes | | { str: MarginBox \| null} \| null | | Returns a dictionary with the MarginBoxes or null. Keys are the names of the margin boxes. |


#### Methods

| Method | parameters | Returns | Description |
| ------ | ---------- | ------- | ----------- |


#### Slots

| Slot | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| top-left-corner | Element | `<empty>` | top left corner margin box |
| top-left | Element | `<empty>` | top left margin box |
| top-center | Element | `<empty>` | top center margin box |
| top-right | Element | `<empty>` | top right margin box |
| top-right-corner | Element | `<empty>` | top right corner margin box |
| left-top | Element | `<empty>` | left top margin box |
| left-middle | Element | `<empty>` | left middle margin box |
| left-bottom | Element | `<empty>` | left bottom margin box |
| right-top | Element | `<empty>` | right top margin box |
| right-middle | Element | `<empty>` | right middle margin box |
| right-bottom | Element | `<empty>` | right bottom margin box |
| bottom-left-corner | Element | `<empty>` | bottom left corner margin box |
| bottom-left | Element | `<empty>` | bottom left margin box |
| bottom-center | Element | `<empty>` | bottom center margin box |
| bottom-right | Element | `<empty>` | bottom right margin box |
| bottom-right-corner | Element | `<empty>` | bottom right corner margin box |

#### Parts

| Part | Description |
| ---- | ----------- |
| margin-box | all the margin boxes |
| top | all margin boxes on the top side of the page, including top left corner and top right corner |
| right | all margin boxes on the right side of the page, including top right and bottom right corner. |
| bottom | all margin boxes on the bottom side of the page, including bottom left corner and bottom right corner. |
| left | all margin boxes on the left side of the page, including top left corner and bottom left corner |
| margin-box-group | all the margin box groups |
| margin-box-group-top | top margin box group: top-left, top-center & top-right |
| margin-box-group-right | right margin box group: right-top, right-middle & right-bottom |
| margin-box-group-bottom | bottom margin box group: bottom-left, bottom-center & bottom-right |
| margin-box-group-left | left margin box group: left-top, left-middle & left-bottom |
| top-left-corner | the top left corner margin box |
| top-left | top left margin box |
| top-center | top center margin box |
| top-right | top right margin box |
| top-right-corner | top right corner margin box |
| left-top | the left top margin box |
| left-middle | the left middle margin box |
| left-bottom | the left bottom margin box |
| right-top | the right top margin box |
| right-middle | the right middle margin box |
| right-bottom | the right bottom margin box |
| bottom-left-corner | bottom top left corner margin box |
| bottom-left | bottom left margin box |
| bottom-center | bottom center margin box |
| bottom-right | bottom right margin box |
| bottom-right-corner | bottom right corner margin box |

#### Custom CSS Properties

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| --margin-top | length | 15mm | Size of the top margin |
| --margin-right | length | 15mm | Size of the right margin |
| --margin-bottom | length | 15mm | Size of the bottom margin |
| --margin-left | length | 15mm | Size of the left margin |


### PagedMarginContent `<paged-margin-content>`

#### Slots

| Slot | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| \<default\> | Element | - | Content |


### PagedMarginBox `<paged-margin-box>`

#### properties

| Property | Attribute | Type | Default | Description |
| -------- | --------- | ---- | ------- | ----------- |
| contentNodes | | Node[] \| null | | Returns an array with the nodes assigned to the slot of the margin box. |
| contentElements | | Element[] \| null | | Returns an array with the elements assigned to the slot of the margin box. |


#### Slots
| Slot | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| \<default\> | Element | - | Content to insert in the marginbox |