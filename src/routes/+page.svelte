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

<div class="editor">
  <!-- Tools -->
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

  <!-- Canvas -->
  <div>
    <Canvas />
  </div>
</div>

<style>
  .editor {
    display: flex;
    height: 100%;

    overflow: hidden;

    /* Tools */
    & > div:first-child {
      padding: 1ch;
      background: var(--surface);
    }

    /* Canvas */
    & > div:last-child {
      width: 100%;

      padding: 1ch;
      overflow: auto;
    }
  }
</style>
