<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";

  export let selected: boolean = false;
  export let href: string | undefined = undefined;
  export let title: string | undefined = undefined;
  export let onClick: MouseEventHandler<HTMLButtonElement> | undefined = undefined;
</script>

{#if href}
  <a class:selected {href} {title}>
    <slot />
  </a>
{:else}
  <button class:selected {title} on:click={onClick}>
    <slot />
  </button>
{/if}

<style>
  button,
  a {
    display: block;

    width: 100%;
    text-align: left;
    white-space: pre;
    text-decoration: none;

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
