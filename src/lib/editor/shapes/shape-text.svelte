<script lang="ts">
  import { selectedShape } from "$lib/stores/editor-stores";
  import { eventPosToLocal } from "$lib/utils/number.utils";
  import { safeWindow } from "$lib/utils/window.utils";
  import { onDestroy } from "svelte";

  export let canvasEl: HTMLDivElement;
  export let canvasW: number;
  export let canvasH: number;
  export let updatePreview: (x: number, y: number, char: string) => void;
  export let clearPreview: () => void;
  export let updateContent: (x: number, y: number, char: string) => void;

  let typing: boolean = false;
  let value: string = "";
  let x0: number = 0;
  let y0: number = 0;
  let cursorVisible: boolean = false;
  let cursorInterval: number = 0;

  $: (() => {
    if ($selectedShape[0] === "text") {
      canvasEl?.addEventListener("click", handleClick);
      window.addEventListener("canvas-reset", reset);
      window.addEventListener("keydown", handleKeyDown);
    } else {
      if (value) commit(); // If there is previous, not committed text, commits it.

      canvasEl?.removeEventListener("click", handleClick);
      safeWindow()?.removeEventListener("canvas-reset", reset);
      safeWindow()?.removeEventListener("keydown", handleKeyDown);
    }
  })();

  // Controles the cursor blink.
  $: (() => {
    if (typing) {
      if (cursorInterval) clearInterval(cursorInterval);
      cursorInterval = setInterval(updateCursor, 500);
    } else {
      clearInterval(cursorInterval);
    }
  })();

  // Updates the typing cursor visibility.
  const updateCursor = () => {
    if (cursorVisible) updatePreview(x0 + value.length, y0, "");
    else updatePreview(x0 + value.length, y0, "_");
    cursorVisible = !cursorVisible;
  };

  const handleClick = (event: MouseEvent) => {
    if (value) commit(); // If there is previous, not committed text, commits it.
    [x0, y0] = eventPosToLocal(event, canvasW, canvasH); // Stores text position.
    typing = true; // Indicates user is now typing.
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    // Early returns if: Text is not the current selected shape or user has not selected a place to start typing.
    if (!typing) return;

    const x = x0 + value.length;
    const y = y0;

    switch (event.key) {
      case "Backspace":
        // If cursor is currently visible, clears the cursor from the preview matrix.
        if (cursorVisible) updatePreview(x0 + value.length, y0, "");

        // Clears the last character from the current value.
        if (value.length) {
          value = value.substring(0, value.length - 1);
          updatePreview(x - 1, y, "");
        }
        break;
      case "Enter":
        // Writes the current value to the canvas.
        commit();
        break;
      default:
        // Adds the key to the current value.
        if (event.key.length === 1) {
          value += event.key;
          updatePreview(x, y, event.key);
        }
    }
  };

  const commit = () => {
    // Writes the current text to the canvas.
    for (let i = 0, n = value.length; i < n; i++) {
      updateContent(x0 + i, y0, value[i]);
    }

    reset();
  };

  const reset = () => {
    clearPreview(); // Clears the value from the preview matrix.
    typing = false; // Indicates the user is not typing anymore.
    value = ""; // Resets the typed value.
  };

  // Makes sure all the events are cleared if the component is destroyed.
  onDestroy(() => {
    canvasEl?.removeEventListener("click", handleClick);

    if (typeof window === "undefined") return;
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("canvas-reset", reset);
  });
</script>
