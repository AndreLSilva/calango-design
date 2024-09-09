<script lang="ts">
  import { selectedShape } from "$lib/stores/editor-stores";
  import { eventPosToLocal } from "$lib/utils/number.utils";
  import { onDestroy } from "svelte";
  import { drawLine } from "./shape-line";

  export let canvasEl: HTMLDivElement;
  export let canvasW: number;
  export let canvasH: number;
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
    if ($selectedShape[0] === "line") {
      canvasEl.addEventListener("mouseup", handleMouseUp);
    } else {
      canvasEl.removeEventListener("mouseup", handleMouseUp);
    }
  })();

  // Updates the line preview
  $: (() => {
    if (!($selectedShape[0] === "line" && mouseDown)) return;
    clearPreview();
    drawLine(x0, y0, x, y, updatePreview);
  })();

  /** Writes the line rectangle on the canvas.  */
  const handleMouseUp = (event: MouseEvent) => {
    const [x, y] = eventPosToLocal(event, canvasW, canvasH);

    clearPreview();
    drawLine(x0, y0, x, y, updateContent);
  };

  onDestroy(() => {
    canvasEl?.removeEventListener("mouseup", handleMouseUp);
  });
</script>
