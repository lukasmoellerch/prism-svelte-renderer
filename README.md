<h1 align="center">
  prism-svelte-renderer
  <br>
</h1>
<p align="center" style="font-size: 1.2rem;">
 A port of <a href="https://github.com/FormidableLabs/prism-react-renderer">prism-react-renderer</a> to svelte.
</p>
## Why?

In contrast to other svelte prismjs libraries this library doesn't generate HTML and inject it as raw HTML. As it tries to have an API similar to `prism-react-renderer` you can customize how your code is displayed using the default slot.

## Installation

You have to install `prismjs` along with `prism-svelte-renderer`. You also have to make sure that the languages you want to use are registered as well.

## Usage

### Basic Example

Import PrismJS and `prism-svelte-rnederer`:

```js
import Prism from "prismjs";
import Highlight from "prism-svelte-renderer";
```

Import a theme:

```js
import theme from "prism-svelte-renderer/themes/dracula";
```

Add the following to your template code:

```sv
<div style="background-color: {theme.plain.backgroundColor}">
  <Highlight {theme} {Prism} text={simpleExample} language=html />
</div>
```

### Advanced Usage

You can provide a slot along with the component if you want to customize how your code is rendered.

The following code will display line-numbers:

```sv
<div style="background-color: {theme.plain.backgroundColor}" class="wrapper">
  <Highlight
    {theme}
    {Prism}
    text={advancedExample}
    language=html
    let:lines
    let:getStyle>
    {#each lines as line, index}
      <div class="line">
        <div class="line-number">{index + 1}</div>

        {#each line as token}
          <span
            style="
              color: {getStyle(token, 'color')};
              font-style: {getStyle(token, 'fontStyle')};">
            {token.content}
          </span>
        {/each}

      </div>
    {/each}
  </Highlight>
</div>
```
