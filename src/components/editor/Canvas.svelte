<script lang="ts">
  import type { CanvasCell } from "$lib/editor/editor.types";
  import ShapeLine from "$lib/editor/shapes/fill/shape-line.svelte";
  import ShapeRectangle from "$lib/editor/shapes/rectangle/shape-rectangle.svelte";
  import { drawFill } from "$lib/editor/shapes/shape-fill";
  import ShapeText from "$lib/editor/shapes/shape-text.svelte";
  import { decodeCanvas } from "$lib/utils/canvas.utils";
  import { eventPosToLocal, newMatrix } from "$lib/utils/number.utils";
  import { onMount } from "svelte";
  import type { MouseEventHandler } from "svelte/elements";
  import {
    canvasH,
    canvasW,
    designData,
    selectedChar,
    selectedColor,
    selectedDrawMode,
    selectedShape,
  } from "../../lib/stores/editor-stores";
  import Card from "../Card.svelte";

  // designData is loaded on the page component. The canvas should only be rendered if it is defined.
  if (!$designData) throw new Error("Design data not loaded");

  let canvasEl: HTMLDivElement;
  let x0: number = 0;
  let y0: number = 0;
  let x: number = 0;
  let y: number = 0;
  let mouseDown = false;
  let content: CanvasCell[][] = decodeCanvas($designData.content);
  let previewContent: CanvasCell[][];

  $canvasW = content[0].length;
  $canvasH = content.length;
  previewContent = newMatrix($canvasW, $canvasH, ["", "", ""]);

  // Adjusts canvas matrix when size is changed.
  $: (() => {
    const deltaH = $canvasH - content.length;
    const deltaW = $canvasW - content[0].length;

    // Adjusts size vertically
    if (deltaH < 0) {
      for (let i = 0, n = Math.abs(deltaH); i < n; i++) {
        content.pop();
        previewContent.pop();
      }
    } else if (deltaH > 0) {
      for (let i = 0, n = deltaH; i < n; i++) {
        content.push(Array($canvasW).fill([" ", "", ""]));
        previewContent.push(Array($canvasW).fill(["", "", ""]));
      }
    }

    // Adjusts size horizontally
    if (deltaW < 0) {
      for (let y = 0; y < $canvasH; y++) {
        for (let i = 0, n = Math.abs(deltaW); i < n; i++) {
          content[y].pop();
          previewContent[y].pop();
        }
      }
    } else if (deltaW > 0) {
      for (let y = 0; y < $canvasH; y++) {
        for (let i = 0; i < deltaW; i++) {
          content[y].push([" ", "", ""]);
          previewContent[y].push(["", "", ""]);
        }
      }
    }
  })();

  // Called every time the cursor position changes to either update the preview content or the actual one.
  $: (() => {
    if (mouseDown) {
      switch ($selectedShape[0]) {
        case "brush":
          updateContent(x, y);
          break;
        case "eraser":
          eraseCanvasMatrix(x, y);
          break;
      }
    }
  })();

  const updatePreview = (x: number, y: number, char: string = $selectedChar) => {
    switch ($selectedDrawMode) {
      case "symbols":
        previewContent[y][x] = [char, previewContent[y][x][1], previewContent[y][x][2]];
        break;
      case "style":
        previewContent[y][x] = [content[y][x][0], ...$selectedColor];
        break;
      case "both":
        previewContent[y][x] = [char, ...$selectedColor];
        break;
    }
  };

  const updateContent = (x: number, y: number, char: string = $selectedChar) => {
    switch ($selectedDrawMode) {
      case "symbols":
        content[y][x] = [char, content[y][x][1], content[y][x][2]];
        break;
      case "style":
        content[y][x] = [content[y][x][0], ...$selectedColor];
        break;
      case "both":
        content[y][x] = [char, ...$selectedColor];
        break;
    }
  };

  const eraseCanvasMatrix = (x: number, y: number) => {
    switch ($selectedDrawMode) {
      case "symbols":
        content[y][x] = [" ", content[y][x][1], content[y][x][2]];
        break;
      case "style":
        content[y][x] = [content[y][x][0], "", ""];
        break;
      case "both":
        content[y][x] = [" ", "", ""];
        break;
    }
  };

  /** Updates cursor's information. */
  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
    [x0, y0] = eventPosToLocal(event, $canvasW, $canvasH);
    mouseDown = true;
  };

  /** Updates cursor's current position. */
  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    const [x1, y1] = eventPosToLocal(event, $canvasW, $canvasH);

    // Only update if position has changed.
    if (x1 !== x) x = x1;
    if (y1 !== y) y = y1;
  };

  /** Updates cursor's information. */
  const handleMouseUp = () => {
    mouseDown = false;

    switch ($selectedShape[0]) {
      case "fill":
        {
          let target: CanvasCell;
          if ($selectedDrawMode === "symbols") target = [$selectedChar, ...$selectedColor];
          else if ($selectedDrawMode === "style") target = [content[y][x][0], ...$selectedColor];
          else if ($selectedDrawMode === "both") target = [content[y][x][0], ...$selectedColor];
          else throw new Error(`Unknown draw mode "${$selectedDrawMode}"`);

          drawFill(x, y, $canvasW, $canvasH, target, content, updateContent);
        }
        break;
    }

    // TODO: Save change
  };

  const clearPreview = () => {
    previewContent = newMatrix($canvasW, $canvasH, ["", "", ""]);
  };

  // Resets the canvas if event is triggered.
  onMount(() => {
    const handleReset = () => {
      content = newMatrix($canvasW, $canvasH, [" ", "", ""]);
      previewContent = newMatrix($canvasW, $canvasH, ["", "", ""]);
    };

    window.addEventListener("canvas-reset", handleReset);
    return () => window.removeEventListener("canvas-reset", handleReset);
  });
</script>

<ShapeLine
  {canvasEl}
  {x0}
  {y0}
  {x}
  {y}
  {mouseDown}
  {updatePreview}
  {clearPreview}
  {updateContent}
/>
<ShapeRectangle
  {canvasEl}
  {x0}
  {y0}
  {x}
  {y}
  {mouseDown}
  {updatePreview}
  {clearPreview}
  {updateContent}
/>
<ShapeText {canvasEl} {updatePreview} {clearPreview} {updateContent} />

<!-- svelte-ignore a11y-no-static-element-interactions -->
<Card
  title={$designData.name}
  width={$canvasW}
  height={$canvasH}
  footer={`${$canvasW} x ${$canvasH}`}
>
  <div
    id="canvas"
    bind:this={canvasEl}
    on:mousedown={handleMouseDown}
    on:mouseup={handleMouseUp}
    on:mousemove={handleMouseMove}
  >
    {#each { length: $canvasH } as _, y}
      <div style:white-space="pre" style:pointer-events="none">
        {#each { length: $canvasW } as _, x}
          {#if previewContent[y][x][0]}
            <span style:color={previewContent[y][x][1]} style:background={previewContent[y][x][2]}>
              {previewContent[y][x][0]}
            </span>
          {:else}
            <span style:color={content[y][x][1]} style:background={content[y][x][2]}>
              {content[y][x][0]}
            </span>
          {/if}
        {/each}
      </div>
    {/each}
  </div>
</Card>
