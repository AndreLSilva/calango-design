<script lang="ts">
  import { onMount } from "svelte";
  import Canvas from "../components/editor/Canvas.svelte";
  import ShapesMenu from "../components/editor/ShapesMenu.svelte";
  import ToolsMenu from "../components/editor/ToolsMenu.svelte";
  import ActionsMenu from "../components/editor/ActionsMenu.svelte";
  import ColorsPaletteMenu from "../components/editor/ColorPalette/ColorsPaletteMenu.svelte";
  import SymbolsMenu from "../components/editor/SymbolsMenu.svelte";

  //                                           ┞  ┟
  //    ┡  ┢           ┦  ┧    ┩  ┪      ┬  ┭  ┮
  //    ┱  ┲     ┴  ┵  ┶        ┹  ┺       ┽  ┾
  // ╀  ╁     ╃  ╄  ╅  ╆  ╇  ╈  ╉  ╊     ╌  ╍  ╎  ╏
  //
  //    ╱  ╲  ╳  ╴  ╵  ╶  ╷  ╸  ╹  ╺  ╻  ╼  ╽  ╾  ╿

  const handleBeforeUnload: OnBeforeUnloadEventHandler = (event) => {
    event.preventDefault();
    return "";
  };

  onMount(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.addEventListener("beforeunload", handleBeforeUnload);
  });
</script>

<svelte:head>
  <title>Calango Design</title>
</svelte:head>

<div style="display: flex;">
  <div>
    <SymbolsMenu />
    <ColorsPaletteMenu />
    <div style="display: flex;">
      <ToolsMenu />
      <ShapesMenu />
    </div>
    <ActionsMenu />
  </div>

  <Canvas width={80} height={30} />
</div>

<!-- Version label -->
<pre class="version-label">╭Calango Design v0.1.0</pre>
<pre class="version-label">╰By André Lima e Silva </pre>

<style>
  :global(html) {
    font-family: monospace;
    font-size: 16px;
  }

  :global(body) {
    margin: 0;

    color: #ffffff;
    background: #000000;
  }

  :global(pre) {
    margin: 0;
  }

  :global(button) {
    appearance: none;

    border: none;
    padding: 0;

    font-family: monospace;
    font-size: 1rem;

    cursor: pointer;

    background: none;
  }

  :global(.white-space) {
    color: transparent;
    user-select: none;
  }

  .version-label {
    opacity: 0.38;
    font-size: 0.75rem;
  }
</style>
