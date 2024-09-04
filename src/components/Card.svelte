<script lang="ts">
  export let id: string | undefined = undefined;
  export let width: number;
  export let height: number | undefined = undefined;
  export let content: string[] = [];
  export let title: string | undefined = undefined;
  export let footer: string | undefined = undefined;
  export let lineRenderer: any = undefined;
  export let lineRendererProps: any = {};

  if (height === undefined) height = content.length;

  const getCardHeader = () => {
    let result = title ? `╭─┤ ${title} ├` : "╭";
    for (let i = 0, n = width - result.length + 1; i < n; i++) {
      result += "─";
    }
    result += "╮";

    return result;
  };

  const getLineWhitespace = (line?: string) => {
    let result = "";
    for (let i = 0, n = width - (line?.length ?? 0); i < n; i++) {
      result += " ";
    }

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
  <span aria-hidden="true">{getCardHeader()}</span>

  <!-- Content -->
  {#each { length: height } as _, i}
    <pre class="line">
      <!-- Line's left border -->
      <span>│</span>

      {#if content[i]}
        <svelte:component
          this={lineRenderer}
          content={content[i] + getLineWhitespace(content[i])}
          index={i}
          {...lineRendererProps}
        />
      {/if}

      <!-- Line's right border and whitespace -->
      <span>│</span>
    </pre>
  {/each}

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
</style>
