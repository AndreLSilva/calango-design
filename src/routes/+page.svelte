<script lang="ts">
  import { onMount } from "svelte";
  import ActionsLineRenderer from "../components/ActionsLineRenderer.svelte";
  import ButtonsRowLineRenderer from "../components/ButtonsRowLineRenderer.svelte";
  import Canvas from "../components/Canvas.svelte";
  import Card from "../components/Card.svelte";
  import ShapesMenu from "../components/shapes-menu/ShapesMenu.svelte";
  import ToolsMenu from "../components/tools-menu/ToolsMenu.svelte";

  const characters = [
    "┌┐┍┑┎┒┏┓╒╕╓╖╔╗╭╮─┈┄━┉┅═",
    "└┘┕┙┖┚┗┛╘╛╙╜╚╝╰╯│┊┆┃┋┇║",
    "├┬┤┝┯┥┠┰┨┣┳┫╞╤╡╟╥╢╠╦╣",
    " ┼  ┿  ╂  ╋  ╪  ╫  ╬ ",
    " ┴  ┷  ┸  ┻  ╧  ╨  ╩ ",
    "░▒▓█▀▄▌▐■x○●",
  ];

  //                                           ┞  ┟
  //    ┡  ┢           ┦  ┧    ┩  ┪      ┬  ┭  ┮
  //    ┱  ┲     ┴  ┵  ┶        ┹  ┺       ┽  ┾
  // ╀  ╁     ╃  ╄  ╅  ╆  ╇  ╈  ╉  ╊     ╌  ╍  ╎  ╏
  //
  //    ╱  ╲  ╳  ╴  ╵  ╶  ╷  ╸  ╹  ╺  ╻  ╼  ╽  ╾  ╿

  const colors = ["        ", "        "];
  const colorsData = [
    "#000000",
    "#800000",
    "#008000",
    "#808000",
    "#000080",
    "#800080",
    "#008080",
    "#c0c0c0",
    "#808080",
    "#ff0000",
    "#00ff00",
    "#ffff00",
    "#0000ff",
    "#ff00ff",
    "#00ffff",
    "#ffffff",
  ];

  const actions = ["Export", "Reset"];

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
    <Card
      title="Characters"
      width={32}
      content={characters}
      lineRenderer={ButtonsRowLineRenderer}
    />
    <!-- <Card
      title="Palette"
      width={32}
      content={colors}
      lineRenderer={ColorsPaletteLineRenderer}
      lineRendererProps={{ data: colorsData }}
    /> -->
    <div style="display: flex;">
      <ToolsMenu />
      <ShapesMenu />
    </div>

    <Card title="Actions" width={15} content={actions} lineRenderer={ActionsLineRenderer} />
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
