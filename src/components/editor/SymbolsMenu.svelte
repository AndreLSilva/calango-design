<script lang="ts">
  import { selectedChar } from "$lib/stores/editor-stores";
  import Card from "../Card.svelte";

  const symbols: string[] = [
    // "◫▤▥▦▧▨▩◧◨◩◪◰◳◲◱▢▣",
    "☺☻♥♦♣♠♂♀♪♫☼•●◘○◙▪■□▲►▼◄",
    "↔↕↨↑↓→←▬∟⌂!?¿‼¶§$%&#()[]{}",
    "0123456789≤<=≡>≥@\"'`^*+±-_~,.:;",
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "abcdefghijklmnopqrstuvwxyzü",
    "αßΓπΣσµτΦΘΩδ∞φε∩⌠⌡÷≈°∙√ⁿ²",
    "┌┐┍┑┎┒┏┓╒╕╓╖╔╗╭╮─┈┄━┉┅═░▒▓█▀▄▌▐/\\╱╲╳",
    "└┘┕┙┖┚┗┛╘╛╙╜╚╝╰╯│┊┆┃┋┇║╴╵╶╷╸╹╺╻╼╽╾╿",
    "├┬┤┝┯┥┠┰┨┣┳┫╞╤╡╟╥╢╠╦╣",
    " ┼  ┿  ╂  ╋  ╪  ╫  ╬ ",
    " ┴  ┷  ┸  ┻  ╧  ╨  ╩ ",
  ];
</script>

<Card title="Symbols" width={36} height={symbols.length}>
  {#each symbols as line}
    <div>
      {#each line as char}
        {#if char === " "}
          <span style:white-space="pre">{" "}</span>
        {:else}
          <button
            class="char"
            style:background={char === $selectedChar ? "var(--secondary-on)" : ""}
            on:click={() => selectedChar.set(char)}
          >
            {char}
          </button>
        {/if}
      {/each}
    </div>
  {/each}
</Card>

<style>
  .char {
    color: var(--secondary);

    &:hover {
      background: var(--secondary-on);
    }
  }
</style>
