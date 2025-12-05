# Design notes `<paged-horizontal-margin>`

## ::part

Came across the [`part`-attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/part) and the [`part::()`-selector](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) they allow to expose parts of the compent for styling. In `paged-horizontal-margin` it could be the parts `left`, `right` and `center`. It would allow to both style these parts as well as to set content using the `::before` with a syntax like:

```css
paged-horizontal-margin::part(center) {
  background: lavender;
}

paged-horizontal-margin::part(center)::before {
  content: "Center";
}
```

I thought it would be exciting to support both a `::part` based approach, as well as slots. The first `paged-horizontal-margin` component used the following template, since the part attribute seems not to work on a `slot`-element.

```html
<paged-margin-box part="left margin-box" position="left">
  <slot name="left"></slot>
</paged-margin-box>
<paged-margin-box part="center margin-box" position="center">
  <slot name="center"></slot>
</paged-margin-box>
<paged-margin-box part="right margin-box" position="right">
  <slot name="right"></slot>
</paged-margin-box>
```

The `part`-attributes make the individual boxes stylable, while the `slots`
allow to set content through the DOM. 

The boxes are sized through grid column definitions. The following css is part of the `paged-horizontal-margin` component.

```css
:host {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
```

The template of the `margin-box` is only a slot:

```html
<slot></slot>
```

Inserting it into the DOM without any children, renders empty margins, unless they are filled with CSS:

```html
<paged-horizontal-margin></paged-horizontal-margin>
```

It is also possible to set the content with a slot:

```html
<paged-horizontal-margin>
  <span slot="center">Center content</span>
</paged-horizontal-margin>
```

There are several downsides to this approach. The `paged-margin-box` elements
are always present in the (shadow-)DOM, even if the slot is not filled, making it slightly harder to hide them with CSS. Further, to select the `paged-margin-box` themselves with javascript it is necessary to
go through the shadowroot:

```js
document.querySelector('paged-margin-box').shadowRoot.querySelector('paged-margin-box[position="left"]')
```

This could be considered just an unconvenience, but, it is also hard to get back into the regular DOM from within the shadowRoot:

```js
  let marginbox = document.querySelector('paged-margin-box').shadowRoot.querySelector('paged-margin-box[position="left"]');

  marginbox.parentElement; // null
```

Finally, to fill the slots an additional layer of html is required:

```html
<span slot="center">Center content</span> 
```

In a second version the `<paged-margin-box>`-es are not part of the `<paged-horizontal-margin>`-template rather, the user provides a `<paged-margin-box>` and assigns it to a slot. An example of how the component would be used:

```html
<paged-horizontal-margin>
  <paged-margin-box slot="left">Left content</paged-margin-box>
  <paged-margin-box slot="center">Center content</paged-margin-box>
</paged-horizontal-margin>
```

The template of the `<paged-horizontal-margin>` is simplified to:

```html
<slot name="left"></slot>
<slot name="center"></slot>
<slot name="right"></slot>
```

Making the `<paged-margin-box>` part of the regular DOM offers a few advantages: the extra `span` is no longer necessary, the `<paged-margin-box>` elements can be directly styled with CSS with tag based selectors, hierachical or through assigned class and id-attributes.

```css
.pagedjs_page:nth-of-type(5) paged-margin-box {
  justify-content: center;
  color: purple;
  font-weight: bold;
}
```

Finally it is easier to select them with javascript:

```js
document.querySelectorAll('paged-margin-box');
```

And to travel up the DOM, if necessary.

```js
document.querySelector('paged-margin-box').parentElement;
// <paged-horizontal-margin> 
```

Also, the margin boxes can be styled through the hierarchy selectors
of the regular DOM:



## Sizing

In September Julien and I looked at simplifying the [existing sizing algorithm](https://github.com/pagedjs/pagedjs/blob/ba1e3c5e4b8d4404b577fbdb0f2b9356a67107e6/src/modules/paged-media/atpage.js#L1771-L1907), which I assume is based on [this spec](https://www.w3.org/TR/css-page-3/#margin-dimension). Given the column size depends not only on which columns have content, but also on the proportion of the size of the content I think javascript remains necessary.

I implemented a simplified version of the sizing algorithm based on the new elements in a test page. At first I included this behaviour in the component, but I'm not sure this is desired.

## Issues

Filling a slot twice leads to weird results, as an extra row is created in the grid:

```html
<paged-horizontal-margin>
  <paged-margin-box slot="left">
    Maecenas arcu massa, egestas vel est nec, mollis venenatis tortor. Ut eu finibus libero.
  </paged-margin-box>
  <paged-margin-box slot="left">
      Phasellus pharetra ante a purus ornare, eget facilisis sem ultricies.
  </paged-margin-box>
  <paged-margin-box slot="right">
    Ut eu finibus libero.
  </paged-margin-box>
</paged-horizontal-margin>
```

This can be solved by fixing the `grid-row` of slotted elements. But this would make them overlap.


## Learnings

- The Lit callbacks `firstUpdated` and `updated` are useful as they are triggered
when the component is attached and thus has geometry. This event was for me triggered
though before the child component was attached. Making that the child didn't have
geometry yet.

- There is something to say to keep as much structure as possible in the normal DOM. Perhaps a rule of thumb is to avoid using `<paged-*>`-components within other `<paged-*>`-components?

## Next steps / thoughts

Naming? 

Thought about this approach, where each box is a slot. Makes it harder to style or
target sides?

```html
<paged-margin>
  <paged-margin-box slot="top-center">Content at the top center of the page.</paged-margin-box>
  <paged-margin-box slot="left-middle">Content in the middle of the left side of the page.</paged-margin-box>
</paged-margin>


<paged-margin-corner side="top-left">
</paged-margin-corner>
<paged-horizontal-margin side="top">
</paged-horizontal-margin>
<paged-margin-corner side="top-right">
</paged-margin-corner>
<paged-vertical-margin side="right">
</paged-vertical-margin>
<paged-margin-corner side="bottom-right">
</paged-margin-corner>
<paged-horizontal-margin side="bottom">
</paged-horizontal-margin>
<paged-margin-corner side="bottom-left">
</paged-margin-corner>
<paged-vertical-margin side="left">
</paged-vertical-margin>
```




- Don't see a way to attach part names to slots.
- margin-box-group or margin-box-side?

- It works to attach 'part' to a slot. As long as it's on the top level. The 'downside' is that it is then on the slot. Some kind of in between element which has `display: contents`. Changing the display mode makes it break.

- The part and the margin-box are not the same. The margin-box is a descendant of the div with the partname.