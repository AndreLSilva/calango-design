<script lang="ts">
  import { selectedChar } from "../lib/stores/editor-stores";

  export let content: string = "";

  $: getStyle = (char: string) => {
    let result = "";

    if (char === $selectedChar) result += `background: white;`;

    return result;
  };

  const handleSelectChar = (char: string) => {
    selectedChar.set(char);
  };
</script>

{#each content as char}
  {#if char === " "}
    <div class="white-space">{"."}</div>
  {:else}
    <button style={getStyle(char)} class="char" on:click={() => handleSelectChar(char)}
      >{char}</button
    >
  {/if}
{/each}

<style>
  .char {
    color: darkgoldenrod;

    &:hover {
      background: white;
    }
  }
</style>
