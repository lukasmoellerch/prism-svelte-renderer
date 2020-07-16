<script>
  import { flatten } from "./flatten";

  export var theme;
  export var Prism;
  export var language;
  export var text;

  $: lines = flatten(
    Prism.tokenize(text, Prism.languages[language], language),
    lines
  );
  $: colorMap = theme.styles.reduce((old, value) => {
    for (let type of value.types) {
      old[type] = value.style;
    }
    return old;
  }, {});

  function getStyle(token, prop) {
    const defaultValue = prop === "color" ? theme.plain.color : "inherit";
    return (colorMap[token.type] || {})[prop] || defaultValue;
  }
</script>

<style>
  .monospace {
    white-space: pre-wrap;
    font-family: monospace;
  }
</style>

<svelte:options immutable={true} />

<slot {getStyle} {lines}>
  {#each lines as line}
    <div class="monospace">
      {#each line as token}
        <span
          style="color: {getStyle(token, 'color')}; font-style: {getStyle(token, 'fontStyle')};">
          {token.content}
        </span>
      {/each}
    </div>
  {/each}
</slot>
