<script lang="ts">
  import { selectedShape } from "$lib/stores/editor-stores";
  import ShapesLineRenderer from "./ShapesLineRenderer.svelte";
  import { shapes } from "$lib/editor/shapes/shapes";
  import ListMenu from "../ListMenu.svelte";
</script>

<ListMenu
  title="Shapes"
  width={15}
  items={shapes}
  selectedKey={$selectedShape[0]}
  selectedVariant={$selectedShape[1]}
  lineRenderer={ShapesLineRenderer}
/>
