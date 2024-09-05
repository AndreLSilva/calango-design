<script lang="ts">
  import type { MenuItems } from "$lib/editor/editor.types";

  export let items: MenuItems<string>;
  export let selectedKey: string | undefined = undefined;
  export let selectedVariant: number = 0;
  export let onSelectItem: (key: string) => void;

  $: getLabel = (key: string) => {
    const data = items[key];
    let label = data.label;

    if (data.shortcut) label += ` (${data.shortcut})`;
    if (selectedKey && data.variants) {
      const variant = key === selectedKey ? selectedVariant : 0;
      label += ` ${data.variants[variant]}`;
    }

    return label;
  };

  $: getStyle = (key: string) => {
    let result = "";
    if (key === selectedKey) result += `background: white;`;
    return result;
  };
</script>

<div style="">
  {#each Object.keys(items) as key}
    <button style={getStyle(key)} on:click={() => onSelectItem(key)}>{getLabel(key)}</button>
  {/each}
</div>

<style>
  button {
    display: block;

    width: 100%;
    text-align: left;

    color: cornflowerblue;

    &:hover {
      background: white;
    }
  }
</style>
