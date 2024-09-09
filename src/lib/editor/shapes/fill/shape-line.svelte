<script lang="ts">
  import { selectedShape } from "$lib/stores/editor-stores";
  import { eventPosToLocal } from "$lib/utils/number.utils";
  import { drawLine } from "./shape-line";

  export let canvasEl: HTMLDivElement;
  export let canvasW: number;
  export let canvasH: number;
  export let x0: number;
  export let y0: number;
  export let mouseDown: boolean;
  export let updatePreview: (x: number, y: number) => void;
  export let clearPreview: () => void;
  export let updateContent: (x: number, y: number) => void;

  $: (() => {
    if (!canvasEl) return;

    if ($selectedShape[0] === "line") {
      console.log("add");
      canvasEl.addEventListener("mousemove", handleMouseMove);
      canvasEl.addEventListener("mouseup", handleMouseUp);
    } else {
      canvasEl.removeEventListener("mousemove", handleMouseMove);
      canvasEl.removeEventListener("mouseup", handleMouseUp);
    }
  })();

  const handleMouseMove = (event: MouseEvent) => {
    if (!mouseDown) return;
    const [x, y] = eventPosToLocal(event, canvasW, canvasH);

    clearPreview();
    drawLine(x0, y0, x, y, updatePreview);
  };

  const handleMouseUp = (event: MouseEvent) => {
    console.log("here");
    const [x, y] = eventPosToLocal(event, canvasW, canvasH);

    drawLine(x0, y0, x, y, updateContent);
  };
</script>
