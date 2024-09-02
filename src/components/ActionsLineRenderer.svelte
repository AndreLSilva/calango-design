<script lang="ts">
  import { sanitizeCanvas } from "$lib/utils/canvas.utils";
  import { downloadFile } from "$lib/utils/misc.utils";

  export let content: string = "";

  const handleSelectTool = () => {
    switch (content) {
      case "Export":
        {
          const content = sanitizeCanvas(document.getElementById("canvas") as HTMLDivElement);
          downloadFile("Canvas", content);
        }
        break;
      case "Reset":
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
