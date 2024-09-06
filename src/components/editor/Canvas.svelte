<script lang="ts">
  import {
    selectedChar,
    selectedColor,
    selectedShape,
    selectedTool,
  } from "../../lib/stores/editor-stores";
  import type { MouseEventHandler } from "svelte/elements";
  import Card from "../Card.svelte";
  import { onMount } from "svelte";
  import { drawLine } from "$lib/editor/shapes/shape-line";
  import { drawRect } from "$lib/editor/shapes/shape-rectangle";
  import { drawFill } from "$lib/editor/shapes/shape-fill";
  import { newMatrix } from "$lib/utils/number.utils";
  import type { CanvasCell } from "$lib/editor/editor.types";

  export let width: number;
  export let height: number;

  let currentPos = { x: 0, y: 0 };
  let startPos = { x: 0, y: 0 };
  let mouseDown = false;
  let content: CanvasCell[][] = newMatrix(width, height, [" ", "", ""]);
  let previewContent: CanvasCell[][] = newMatrix(width, height, ["", "", ""]);

  // Called every time the cursor position changes to either update the preview content or the actual one.
  $: (() => {
    // Resets preview content array
    // TODO: check if here is the best place to put this.
    previewContent = newMatrix(width, height, ["", "", ""]);

    if (mouseDown) {
      switch ($selectedShape[0]) {
        case "brush":
          updateCanvasMatrix(currentPos.x, currentPos.y, false);
          break;
        case "line":
          drawLine(startPos.x, startPos.y, currentPos.x, currentPos.y, (x, y) =>
            updateCanvasMatrix(x, y, true)
          );
          break;
        case "rect":
          drawRect($selectedShape[1], startPos.x, startPos.y, currentPos.x, currentPos.y, (x, y) =>
            updateCanvasMatrix(x, y, true)
          );
          break;
      }
    }
  })();

  $: updateCanvasMatrix = (x: number, y: number, preview: boolean) => {
    switch ($selectedTool) {
      case "symbols":
        if (preview) previewContent[y][x] = [$selectedChar, ...$selectedColor];
        else content[y][x] = [$selectedChar, ...$selectedColor];
        break;
      case "eraser":
        if (preview) previewContent[y][x] = [" ", "", ""];
        else content[y][x] = [" ", "", ""];
        break;
    }
  };

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
        drawLine(startPos.x, startPos.y, currentPos.x, currentPos.y, (x, y) =>
          updateCanvasMatrix(x, y, false)
        );
        break;
      case "rect":
        drawRect($selectedShape[1], startPos.x, startPos.y, currentPos.x, currentPos.y, (x, y) =>
          updateCanvasMatrix(x, y, false)
        );
        break;
      case "fill":
        {
          let target: CanvasCell = ["", "", ""];
          if ($selectedTool === "symbols") target = [$selectedChar, ...$selectedColor];
          else if ($selectedTool === "eraser") target = [" ", "", ""];
          // else target = [" ", ...$selectedColor];

          drawFill(currentPos.x, currentPos.y, width, height, target, content, (x, y) =>
            updateCanvasMatrix(x, y, false)
          );
        }

        break;
    }

    // TODO: Save change
  };

  // Resets the canvas if event is triggered.
  onMount(() => {
    const handleReset = () => (content = newMatrix(width, height, [" ", "", ""]));

    window.addEventListener("canvas-reset", handleReset);
    return () => window.removeEventListener("canvas-reset", handleReset);
  });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:mousemove={handleMouseMove} on:mousedown={handleMouseDown} on:mouseup={handleMouseUp}>
  <Card id="canvas" title="Canvas" {width}>
    {#each { length: height } as _, y}
      <div style="white-space: pre;">
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
  </Card>
</div>
