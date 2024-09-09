<script lang="ts">
  import { selectedColor } from "$lib/stores/editor-stores";
  import { isLightColor } from "$lib/utils/number.utils";

  export let color: string;

  $: isFore = color === $selectedColor[0];
  $: isBack = color === $selectedColor[1];
  $: style = (() => {
    let result = "";

    result += `background: ${color};`;
    if (isLightColor(color)) result += "color: black;";
    else result += "color: white;";

    return result;
  })();

  const selectColor = (foreground: boolean) => {
    if (foreground) {
      if ($selectedColor[0] === color) selectedColor.update((current) => ["", current[1]]);
      else selectedColor.update((current) => [color, current[1]]);
    } else {
      if ($selectedColor[1] === color) selectedColor.update((current) => [current[0], ""]);
      else selectedColor.update((current) => [current[0], color]);
    }
  };
</script>

<button
  class="color"
  {style}
  on:click={() => selectColor(true)}
  on:contextmenu={() => selectColor(false)}
>
  {#if isFore && isBack}
    a
  {:else if isFore}
    f
  {:else if isBack}
    b
  {:else}
    {" "}
  {/if}
</button>

<style>
  .color {
    display: block;
    white-space: pre;
  }
</style>
