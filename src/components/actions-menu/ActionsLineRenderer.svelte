<script lang="ts">
  import { actions } from "$lib/editor/actions/actions";
  import type { ActionType } from "$lib/editor/actions/actions.types";
  import type { MenuItem } from "$lib/editor/editor.types";
  import { sanitizeCanvas } from "$lib/utils/canvas.utils";
  import { downloadFile } from "$lib/utils/misc.utils";

  export let content: string = "";
  export let index: number = 0;

  const [shape] = Object.entries(actions)[index] as [ActionType, MenuItem];

  const handleSelectTool = () => {
    switch (shape) {
      case "export":
        {
          const content = sanitizeCanvas(document.getElementById("canvas") as HTMLDivElement);
          downloadFile("Canvas", content);
        }
        break;
      case "reset":
        window.dispatchEvent(new CustomEvent("canvas-reset", { bubbles: true }));
        break;
    }
  };
</script>

<button on:click={handleSelectTool}>{content}</button>

<style>
  button {
    color: cornflowerblue;

    &:hover {
      background: white;
    }
  }
</style>
