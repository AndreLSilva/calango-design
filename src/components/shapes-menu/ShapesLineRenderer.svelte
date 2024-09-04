<script lang="ts">
  import type { MenuItem } from "$lib/editor/editor.types";
  import { shapes } from "$lib/editor/shapes/shapes";
  import type { ShapeType } from "$lib/editor/shapes/shapes.types";
  import { warp } from "$lib/utils/number.utils";
  import { selectedShape } from "../../lib/stores/editor-stores";

  export let content: string = "";
  export let index: number = 0;

  const [shape, data] = Object.entries(shapes)[index] as [ShapeType, MenuItem];

  $: style = (() => {
    let result = "";
    if (shape === $selectedShape[0]) result += `background: white;`;
    return result;
  })();

  const handleSelectShape = () => {
    // If the same item is being selected, scroll through variants, otherwise resets it to 0.
    let variant: number;
    if (!data.variants || $selectedShape[0] !== shape) variant = 0;
    else variant = warp($selectedShape[1] + 1, data.variants?.length - 1);

    selectedShape.set([shape, variant]);
  };
</script>

<button {style} on:click={handleSelectShape}>{content}</button>

<style>
  button {
    color: cornflowerblue;

    &:hover {
      background: white;
    }
  }
</style>
