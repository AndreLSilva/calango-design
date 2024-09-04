<script lang="ts">
  import Card from "../Card.svelte";
  import { selectedShape } from "$lib/stores/editor-stores";
  import ShapesLineRenderer from "./ShapesLineRenderer.svelte";
  import { shapes } from "$lib/editor/shapes/shapes";

  $: content = Object.entries(shapes).map(([shape, data]) => {
    let label = data.label;

    if (data.shortcut) label += ` (${data.shortcut})`;
    if (data.variants) {
      const variant = shape === $selectedShape[0] ? $selectedShape[1] : 0;
      label += ` ${data.variants[variant]}`;
    }

    return ` ${label} `;
  });
</script>

<Card title="Shapes" width={15} {content} lineRenderer={ShapesLineRenderer} />
