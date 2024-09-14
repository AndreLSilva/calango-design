<script lang="ts">
  export let id: string | undefined = undefined;
  export let width: number;
  export let height: number | undefined = undefined;
  export let title: string | undefined = undefined;
  export let footer: string | undefined = undefined;

  let headerElement: HTMLSpanElement;
  let contentContainer: HTMLDivElement;

  $: (() => {
    if (!contentContainer && !headerElement) return;
    height =
      contentContainer.getBoundingClientRect().height /
      headerElement.getBoundingClientRect().height;
  })();

  $: cardHeader = (() => {
    let result = title ? `┌─┤ ${title} ├` : "┌";
    for (let i = 0, n = width - result.length + 1; i < n; i++) {
      result += "─";
    }
    result += "┐";

    return result;
  })();

  $: cardFooter = (() => {
    let result = footer ? `┤ ${footer} ├─┘` : "┘";
    for (let i = 0, n = width - result.length + 1; i < n; i++) {
      result = "─" + result;
    }
    result = "└" + result;

    return result;
  })();
</script>

<div class="card" {id}>
  <!-- Header -->
  <span bind:this={headerElement} aria-hidden="true">{cardHeader}</span>

  <!-- Content -->
  <div>
    {#each { length: Math.floor(height ?? 0) } as _}
      <pre class="line">
        <span>│</span>
        <div />
        <span>│</span>
      </pre>
    {/each}
  </div>

  <div bind:this={contentContainer} class="content" style:width={`${width}ch`}>
    <slot />
  </div>

  <!-- Footer -->
  <span aria-hidden="true">{cardFooter}</span>
</div>

<style>
  .card {
    width: fit-content;
    user-select: none;

    & > span:first-child,
    & > span:last-child {
      color: var(--divider);
    }

    & > div:first-of-type {
      height: 0;
      pointer-events: none;
      color: var(--divider);

      & > pre > div {
        width: 100%;
      }
    }
  }

  .line {
    display: flex;
  }

  .content {
    padding: 0 1ch;
  }
</style>
