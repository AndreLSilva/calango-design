<script lang="ts">
  import { canvasH, canvasW, selectedShape } from "$lib/stores/editor-stores";
  import { eventPosToLocal } from "$lib/utils/number.utils";
  import { onDestroy } from "svelte";
  import { drawRect } from "./shape-rectangle";

  export let canvasEl: HTMLDivElement;
  export let x0: number;
  export let y0: number;
  export let x: number;
  export let y: number;
  export let mouseDown: boolean;
  export let updatePreview: (x: number, y: number) => void;
  export let clearPreview: () => void;
  export let updateContent: (x: number, y: number) => void;

  $: (() => {
    if (!canvasEl) return;
    if ($selectedShape[0] === "rect") {
      canvasEl.addEventListener("mouseup", handleMouseUp);
    } else {
      canvasEl.removeEventListener("mouseup", handleMouseUp);
    }
  })();

  // Updates the rectangle preview
  $: (() => {
    if (!($selectedShape[0] === "rect" && mouseDown)) return;

    clearPreview();
    drawRect($selectedShape[1], x0, y0, x, y, updatePreview);
  })();

  /** Writes the drawn rectangle on the canvas. */
  const handleMouseUp = (event: MouseEvent) => {
    const [x, y] = eventPosToLocal(event, $canvasW, $canvasH);
    drawRect($selectedShape[1], x0, y0, x, y, updateContent);
  };

  onDestroy(() => {
    canvasEl?.removeEventListener("mouseup", handleMouseUp);
  });
</script>
