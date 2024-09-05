<script lang="ts">
  import type { MenuItems } from "$lib/editor/editor.types";
  import Card from "./Card.svelte";

  export let title: string;
  export let width: number;
  export let items: MenuItems<string>;
  export let selectedKey: string | undefined = undefined;
  export let selectedVariant: number = 0;
  export let lineRenderer: any;

  $: content = Object.entries(items).map(([key, data]) => {
    let label = data.label;

    if (data.shortcut) label += ` (${data.shortcut})`;
    if (selectedKey && data.variants) {
      const variant = key === selectedKey ? selectedVariant : 0;
      label += ` ${data.variants[variant]}`;
    }

    return ` ${label} `;
  });
</script>

<Card {title} {width} {content} {lineRenderer} />
