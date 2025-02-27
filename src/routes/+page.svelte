<script lang="ts">
  import { onMount } from "svelte";
  import Canvas from "../components/editor/Canvas.svelte";
  import ShapesMenu from "../components/editor/ShapesMenu.svelte";
  import DrawModeMenu from "../components/editor/DrawModeMenu.svelte";
  import ActionsMenu from "../components/editor/ActionsMenu.svelte";
  import ColorsPaletteMenu from "../components/editor/ColorPalette/ColorsPaletteMenu.svelte";
  import SymbolsMenu from "../components/editor/SymbolsMenu.svelte";
  import { editorScreen } from "$lib/stores/editor-stores";
  import EditorSettingsMenu from "../components/editor/EditorSettingsMenu.svelte";

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

<div style:margin="1ch">
  <!-- Title -->
  <div style:padding-bottom="1ch">
    <h1 class="title">Calango Design<span class="version-label">{" "}v0.1.0</span></h1>
    <p class="version-label">
      └─ By André Lima e Silva ─ <a
        href="https://github.com/AndreLSilva/calango-design/"
        target="_blank">Github</a
      >
      ─ <a href="https://discord.gg/59YQ4pQd3q" target="_blank">Discord</a>
    </p>
  </div>

  <!-- Content -->
  <div style:display="flex">
    <div>
      {#if $editorScreen === "tools"}
        <SymbolsMenu />
        <ColorsPaletteMenu />
        <div style:display="flex">
          <div>
            <DrawModeMenu />
            <ActionsMenu />
          </div>
          <ShapesMenu />
        </div>
      {:else if $editorScreen === "settings"}
        <EditorSettingsMenu />
      {/if}
    </div>

    <Canvas />
  </div>
</div>

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

  :global(a) {
    color: inherit;
  }

  :global(p) {
    margin: 0;
  }

  :global(.white-space) {
    color: transparent;
    user-select: none;
  }

  .title {
    margin: 0;
    opacity: 0.6;
  }

  .version-label {
    font-size: 0.75rem;
    opacity: 0.38;
  }
</style>
