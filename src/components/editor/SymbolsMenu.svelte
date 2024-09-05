<script lang="ts">
  import { selectedChar } from "$lib/stores/editor-stores";
  import Card from "../Card.svelte";

  const symbols: string[] = [
    "┌┐┍┑┎┒┏┓╒╕╓╖╔╗╭╮─┈┄━┉┅═",
    "└┘┕┙┖┚┗┛╘╛╙╜╚╝╰╯│┊┆┃┋┇║",
    "├┬┤┝┯┥┠┰┨┣┳┫╞╤╡╟╥╢╠╦╣",
    " ┼  ┿  ╂  ╋  ╪  ╫  ╬ ",
    " ┴  ┷  ┸  ┻  ╧  ╨  ╩ ",
    "░▒▓█▀▄▌▐■x○●",
  ];

  $: getStyle = (char: string) => {
    let result = "";

    if (char === $selectedChar) result += `background: white;`;

    return result;
  };

  const handleSelectChar = (char: string) => {
    selectedChar.set(char);
  };
</script>

<Card title="Symbols" width={36}>
  {#each symbols as line}
    <div>
      {#each line as char}
        {#if char === " "}
          <span class="white-space">{"."}</span>
        {:else}
          <button style={getStyle(char)} class="char" on:click={() => handleSelectChar(char)}>
            {char}
          </button>
        {/if}
      {/each}
    </div>
  {/each}
</Card>

<style>
  .char {
    color: darkgoldenrod;

    &:hover {
      background: white;
    }
  }
</style>
