<script lang="ts">
  import { selectedChar, selectedColor, selectedTool } from "../lib/stores/editor-stores";
  import type { MouseEventHandler } from "svelte/elements";
  import Card from "./Card.svelte";
  import { charMultiply } from "$lib/utils/string.utils";
  import CanvasRowLineRenderer from "./CanvasRowLineRenderer.svelte";
  import { onDestroy, onMount } from "svelte";

  export let width: number;
  export let height: number;
  let container: HTMLDivElement | undefined;
  $: containerRect = container?.getBoundingClientRect();

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!container || !containerRect) return;
    const x = Math.floor(((event.x - containerRect.x) * (width + 2)) / containerRect.width);
    const y = Math.floor(((event.y - containerRect.y) * (height + 2)) / containerRect.height);

    if (x < 1 || x > width || y < 1 || y > height) return;

    if (event.buttons === 1) {
      const cell = container.children[0].children[y].children[x] as HTMLSpanElement;

      switch ($selectedTool) {
        case "Brush":
          cell.textContent = $selectedChar;
          cell.style.color = $selectedColor;
          break;
        case "Eraser":
          cell.textContent = " ";
          cell.style.color = "";
          break;
        case "Style":
          cell.style.color = $selectedColor;
          break;
      }
    }
  };

  const handleReset = () => {
    if (!container) throw new Error("Missing container");
    const canvas = container.children[0];

    for (let y = 1, yn = canvas.children.length - 1; y < yn; y++) {
      const row = canvas.children[y];
      for (let x = 1, xn = row.children.length - 1; x < xn; x++) {
        row.children[x].textContent = " ";
      }
    }
  };

  onMount(() => {
    window.addEventListener("canvas-reset", handleReset);
    return () => window.removeEventListener("canvas-reset", handleReset);
  });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div bind:this={container} on:mousemove={handleMouseMove}>
  <Card
    id="canvas"
    title="Canvas"
    {width}
    content={Array(height).fill(charMultiply(" ", width))}
    lineRenderer={CanvasRowLineRenderer}
  />
</div>
