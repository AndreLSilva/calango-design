<script lang="ts">
  export let id: string | undefined = undefined;
  export let width: number;
  export let height: number | undefined = undefined;
  export let content: string[] = [];
  export let title: string | undefined = undefined;
  export let footer: string | undefined = undefined;

  let headerElement: HTMLSpanElement;
  let contentContainer: HTMLDivElement;

  if (height === undefined) height = content.length;

  $: (() => {
    if (!contentContainer && !headerElement) return;
    height =
      contentContainer.getBoundingClientRect().height /
      headerElement.getBoundingClientRect().height;
  })();

  const getCardHeader = () => {
    let result = title ? `╭─┤ ${title} ├` : "╭";
    for (let i = 0, n = width - result.length + 1; i < n; i++) {
      result += "─";
    }
    result += "╮";

    return result;
  };

  const getCardFooter = () => {
    let result = footer ? `┤ ${footer} ├─╯` : "╯";
    for (let i = 0, n = width - result.length + 1; i < n; i++) {
      result = "─" + result;
    }
    result = "╰" + result;

    return result;
  };
</script>

<div class="card" {id}>
  <!-- Header -->
  <span bind:this={headerElement} aria-hidden="true">{getCardHeader()}</span>

  <!-- Content -->
  <div style="height: 0; pointer-events: none;">
    {#each { length: height ?? 0 } as _, i}
      <pre class="line">
        <span>│</span>
          <div style="width: 100%;" />
        <span>│</span>
      </pre>
    {/each}
  </div>
  <div bind:this={contentContainer} class="content" style={`width: ${width}ch;`}>
    <slot />
  </div>

  <!-- Footer -->
  <span aria-hidden="true">{getCardFooter()}</span>
</div>

<style>
  .card {
    width: fit-content;
    user-select: none;
  }

  .line {
    display: flex;
  }

  .content {
    padding: 0 1ch;
  }
</style>
