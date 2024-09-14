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

    color: var(--primary);

    &:hover {
      background: var(--primary-on);
    }

    &.selected {
      color: var(--primary);
      background: var(--primary-on);
    }
  }
</style>
