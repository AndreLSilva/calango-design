<script lang="ts">
  import { selectedColor } from "../lib/stores/editor-stores";

  export let content: string;
  export let row: number;
  export let data: string[];

  const handleSelectColor = (color: string) => {
    selectedColor.set(color);
  };
</script>

{#each content as _, i}
  <button
    style={`background: ${data[i + content.length * row]}`}
    class="char"
    on:click={() => handleSelectColor(data[i + content.length * row])}>.</button
  >
{/each}

<style>
  .char {
    color: transparent;
  }
</style>
