<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";

  export let selected: boolean = false;
  export let onClick: MouseEventHandler<HTMLButtonElement>;
</script>

<button class:selected on:click={onClick}>
  <slot />
</button>

<style>
  button {
    display: block;

    width: 100%;
    text-align: left;
    white-space: pre;

    color: cornflowerblue;

    &:hover {
      background: white;
    }
  }

  .selected {
    color: cornflowerblue;
    background: white;
  }
</style>
