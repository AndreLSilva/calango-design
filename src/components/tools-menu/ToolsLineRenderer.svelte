<script lang="ts">
  import type { MenuItem } from "$lib/editor/editor.types";
  import { tools } from "$lib/editor/tools/tools";
  import type { ToolType } from "$lib/editor/tools/tools.types";
  import { selectedTool } from "../../lib/stores/editor-stores";

  export let content: string = "";
  export let index: number = 0;

  const [tool] = Object.entries(tools)[index] as [ToolType, MenuItem];

  $: style = (() => {
    let result = "";
    if (tool === $selectedTool) result += `background: white;`;
    return result;
  })();

  const handleSelectTool = () => {
    selectedTool.set(tool);
  };
</script>

<button {style} on:click={handleSelectTool}>{content}</button>

<style>
  button {
    color: cornflowerblue;

    &:hover {
      background: white;
    }
  }
</style>
