<script lang="ts">
  import {
    selectedChar,
    // selectedColor,
    // selectedTool,
    selectedShape,
  } from "../lib/stores/editor-stores";
  import type { MouseEventHandler } from "svelte/elements";
  import Card from "./Card.svelte";
  import CanvasRowLineRenderer from "./CanvasRowLineRenderer.svelte";
  import { onMount } from "svelte";
  import { drawLine } from "$lib/editor/shapes/shape-line";
  import { drawRect } from "$lib/editor/shapes/shape-rectangle";
  import { drawFill } from "$lib/editor/shapes/shape-fill";
  import { newMatrix } from "$lib/utils/number.utils";

  export let width: number;
  export let height: number;

  let currentPos = { x: 0, y: 0 };
  let startPos = { x: 0, y: 0 };
  let mouseDown = false;
  let content: string[][] = newMatrix(width, height, "");
  let previewContent: string[][] = newMatrix(width, height, "");

  /** Represents the content that is currently being displayed. Being the sum of the actual content with the preview. */
  $: displayContent = (() => {
    const result: string[] = [];
    for (let y = 0; y < height; y++) {
      let line = "";
      for (let x = 0; x < width; x++) {
        line += previewContent[y][x] || content[y][x] || " ";
      }
      result.push(line);
    }
    return result;
  })();

  // Called every time the cursor position changes to either update the preview content or the actual one.
  $: (() => {
    // Resets preview content array
    // TODO: check if here is the best place to put this.
    previewContent = newMatrix(width, height, "");

    if (mouseDown) {
      switch ($selectedShape[0]) {
        case "brush":
          content[currentPos.y][currentPos.x] = $selectedChar;
          // {
          //   const cell = container.children[0].children[y].children[x] as HTMLSpanElement;

          //   switch ($selectedTool) {
          //     case "Symbol":
          //       cell.textContent = $selectedChar;
          //       cell.style.color = $selectedColor;
          //       break;
          //     case "Eraser":
          //       cell.textContent = " ";
          //       cell.style.color = "";
          //       break;
          //     case "Style":
          //       cell.style.color = $selectedColor;
          //       break;
          //   }
          // }
          break;
        case "line":
          drawLine(
            startPos.x,
            startPos.y,
            currentPos.x,
            currentPos.y,
            (x, y) => (previewContent[y][x] = $selectedChar)
          );
          break;
        case "rect":
          drawRect(
            $selectedShape[1],
            startPos.x,
            startPos.y,
            currentPos.x,
            currentPos.y,
            (x, y) => (previewContent[y][x] = $selectedChar)
          );
          break;
      }
    }
  })();

  /**
   * Converts the event position from screen based to canvas based.
   * @param event The mouse event containing the position.
   */
  const eventPosToLocal = (event: MouseEvent) => {
    const containerRect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
    let x = Math.floor(((event.x - containerRect.x) * (width + 2)) / containerRect.width) - 1;
    let y = Math.floor(((event.y - containerRect.y) * (height + 2)) / containerRect.height) - 1;

    if (x < 0) x = 0;
    else if (x >= width) x = width - 1;

    if (y < 0) y = 0;
    else if (y >= height) y = height - 1;

    return { x, y };
  };

  /** Updates cursor's information. */
  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
    startPos = eventPosToLocal(event);
    mouseDown = true;
  };

  /** Updates cursor's current position. */
  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    const pos = eventPosToLocal(event);

    // Only update if position has changed.
    if (pos.x !== currentPos.x) currentPos.x = pos.x;
    if (pos.y !== currentPos.y) currentPos.y = pos.y;
  };

  const handleMouseUp: MouseEventHandler<HTMLDivElement> = (event) => {
    mouseDown = false;

    switch ($selectedShape[0]) {
      // Commits the line to the content array.
      case "line":
        drawLine(
          startPos.x,
          startPos.y,
          currentPos.x,
          currentPos.y,
          (x, y) => (content[y][x] = $selectedChar)
        );
        break;
      case "rect":
        drawRect(
          $selectedShape[1],
          startPos.x,
          startPos.y,
          currentPos.x,
          currentPos.y,
          (x, y) => (content[y][x] = $selectedChar)
        );
        break;
      case "fill":
        drawFill(currentPos.x, currentPos.y, width, height, $selectedChar, content);
        break;
    }

    // TODO: Save change
  };

  // Resets the canvas if event is triggered.
  onMount(() => {
    const handleReset = () => (content = newMatrix(width, height, ""));

    window.addEventListener("canvas-reset", handleReset);
    return () => window.removeEventListener("canvas-reset", handleReset);
  });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:mousemove={handleMouseMove} on:mousedown={handleMouseDown} on:mouseup={handleMouseUp}>
  <Card
    id="canvas"
    title="Canvas"
    {width}
    content={displayContent}
    lineRenderer={CanvasRowLineRenderer}
  />
</div>
