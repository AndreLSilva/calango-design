<script lang="ts">
  import Button from "../Button.svelte";
  import type { MenuItems } from "./ListMenu.types";

  export let items: MenuItems<string>;
  export let selectedKey: string | undefined = undefined;
  export let selectedVariant: number = 0;
  export let onSelectItem: (key: string) => void;

  $: getLabel = (key: string) => {
    const data = items[key];
    let label = data.label;

    if (selectedKey && data.variants) {
      const variant = key === selectedKey ? selectedVariant : 0;
      label += ` ${data.variants[variant]}`;
    }

    return label;
  };
</script>

<div style="">
  {#each Object.keys(items) as key}
    <Button
      selected={key === selectedKey}
      title={items[key].shortcut?.toUpperCase()}
      onClick={() => onSelectItem(key)}
    >
      {getLabel(key)}
    </Button>
  {/each}
</div>
