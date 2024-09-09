<script lang="ts">
  import {
    selectedChar,
    selectedColor,
    selectedShape,
    selectedDrawMode,
  } from "../../lib/stores/editor-stores";
  import type { MouseEventHandler } from "svelte/elements";
  import Card from "../Card.svelte";
  import { onMount } from "svelte";
  import { drawRect } from "$lib/editor/shapes/shape-rectangle";
  import { drawFill } from "$lib/editor/shapes/shape-fill";
  import { eventPosToLocal, newMatrix } from "$lib/utils/number.utils";
  import type { CanvasCell } from "$lib/editor/editor.types";
  import ShapeText from "$lib/editor/shapes/shape-text.svelte";
  import ShapeLine from "$lib/editor/shapes/fill/shape-line.svelte";

  export let width: number;
  export let height: number;

  let canvasEl: HTMLDivElement;
  let currentPos = { x: 0, y: 0 };
  let startPos = { x: 0, y: 0 };
  let mouseDown = false;
  let content: CanvasCell[][] = newMatrix(width, height, [" ", "", ""]);
  let previewContent: CanvasCell[][] = newMatrix(width, height, ["", "", ""]);

  // Called every time the cursor position changes to either update the preview content or the actual one.
  $: (() => {
    if (mouseDown) {
      // Resets preview content array
      // previewContent = newMatrix(width, height, ["", "", ""]);
    }

    if (mouseDown) {
      switch ($selectedShape[0]) {
        case "brush":
          updateContent(currentPos.x, currentPos.y);
          break;
        case "eraser":
          eraseCanvasMatrix(currentPos.x, currentPos.y);
          break;
        case "rect":
          drawRect(
            $selectedShape[1],
            startPos.x,
            startPos.y,
            currentPos.x,
            currentPos.y,
            updatePreview
          );
          break;
      }
    }
  })();

  $: updatePreview = (x: number, y: number, char?: string) => {
    switch ($selectedDrawMode) {
      case "symbols":
        previewContent[y][x] = [
          char ?? $selectedChar,
          previewContent[y][x][1],
          previewContent[y][x][2],
        ];
        break;
      case "style":
        previewContent[y][x] = [content[y][x][0], ...$selectedColor];
        break;
      case "both":
        previewContent[y][x] = [char ?? $selectedChar, ...$selectedColor];
        break;
    }
  };

  $: updateContent = (x: number, y: number, char: string = $selectedChar) => {
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

  $: eraseCanvasMatrix = (x: number, y: number) => {
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
    const [x, y] = eventPosToLocal(event, width, height);
    startPos = { x, y };
    mouseDown = true;
  };

  /** Updates cursor's current position. */
  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    const [x, y] = eventPosToLocal(event, width, height);

    // Only update if position has changed.
    if (x !== currentPos.x) currentPos.x = x;
    if (y !== currentPos.y) currentPos.y = y;
  };

  const handleMouseUp: MouseEventHandler<HTMLDivElement> = (event) => {
    mouseDown = false;

    switch ($selectedShape[0]) {
      case "rect":
        drawRect(
          $selectedShape[1],
          startPos.x,
          startPos.y,
          currentPos.x,
          currentPos.y,
          updateContent
        );
        break;
      case "fill":
        {
          let target: CanvasCell;
          if ($selectedDrawMode === "symbols") target = [$selectedChar, ...$selectedColor];
          else if ($selectedDrawMode === "style")
            target = [content[currentPos.y][currentPos.y][0], ...$selectedColor];
          else if ($selectedDrawMode === "both")
            target = [content[currentPos.y][currentPos.y][0], ...$selectedColor];
          else throw new Error(`Unknown draw mode "${$selectedDrawMode}"`);

          drawFill(currentPos.x, currentPos.y, width, height, target, content, updateContent);
        }
        break;
    }

    // TODO: Save change
  };

  const clearPreview = () => {
    previewContent = newMatrix(width, height, ["", "", ""]);
  };

  // Resets the canvas if event is triggered.
  onMount(() => {
    const handleReset = () => {
      content = newMatrix(width, height, [" ", "", ""]);
      previewContent = newMatrix(width, height, ["", "", ""]);
    };

    window.addEventListener("canvas-reset", handleReset);
    return () => window.removeEventListener("canvas-reset", handleReset);
  });
</script>

<ShapeLine
  {canvasEl}
  canvasW={width}
  canvasH={height}
  x0={startPos.x}
  y0={startPos.y}
  {mouseDown}
  {updatePreview}
  {clearPreview}
  {updateContent}
/>

<ShapeText
  {canvasEl}
  canvasW={width}
  canvasH={height}
  {updatePreview}
  {clearPreview}
  {updateContent}
/>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<Card id="canvas" title="Canvas" {width}>
  <div
    bind:this={canvasEl}
    on:mousedown={handleMouseDown}
    on:mouseup={handleMouseUp}
    on:mousemove={handleMouseMove}
  >
    {#each { length: height } as _, y}
      <div style:white-space="pre" style:pointer-events="none">
        {#each { length: width } as _, x}
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
