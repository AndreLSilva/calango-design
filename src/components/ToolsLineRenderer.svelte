<script lang="ts">
  import { selectedTool } from "../lib/stores/editor-stores";

  export let content: string = "";

  $: style = (() => {
    let result = "";

    if (content === $selectedTool) result += `background: white;`;

    return result;
  })();

  const handleSelectTool = () => {
    selectedTool.set(content);
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
