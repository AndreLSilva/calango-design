<script lang="ts">
  import { selectedColor } from "../lib/stores/editor-stores";

  export let content: string;
  export let index: number;
  export let data: string[];

  const handleSelectColor = (color: string) => {
    selectedColor.set(color);
  };
</script>

{#each content as _, i}
  <button
    style={`background: ${data[i + content.length * index]}`}
    class="char"
    on:click={() => handleSelectColor(data[i + content.length * index])}>.</button
  >
{/each}

<style>
  .char {
    color: transparent;
  }
</style>
