<script lang="ts">
  import { selectedShape } from "../lib/stores/editor-stores";

  export let content: string = "";

  $: style = (() => {
    let result = "";

    if (content === $selectedShape) result += `background: white;`;

    return result;
  })();

  const handleSelectShape = () => {
    selectedShape.set(content);
  };
</script>

<button {style} on:click={handleSelectShape}>{content}</button>

<style>
  button {
    color: cornflowerblue;

    &:hover {
      background: white;
    }
  }
</style>
