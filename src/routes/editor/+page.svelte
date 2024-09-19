<script lang="ts">
  import { page } from "$app/stores";
  import { readDesign } from "$lib/api/designs/read";
  import { ShortcutsController } from "$lib/ShortcutsController";
  import { designData, editorScreen } from "$lib/stores/editor-stores";
  import { onMount } from "svelte";
  import ActionsMenu from "../../components/editor/ActionsMenu.svelte";
  import Canvas from "../../components/editor/Canvas.svelte";
  import ColorsPaletteMenu from "../../components/editor/ColorPalette/ColorsPaletteMenu.svelte";
  import DrawModeMenu from "../../components/editor/DrawModeMenu.svelte";
  import EditorSettingsMenu from "../../components/editor/EditorSettingsMenu.svelte";
  import ShapesMenu from "../../components/editor/ShapesMenu.svelte";
  import SymbolsMenu from "../../components/editor/SymbolsMenu.svelte";

  // Loads target design data.
  onMount(async () => {
    const designId = $page.url.searchParams.get("id");
    if (!designId) throw new Error("Missing design id");

    $designData = await readDesign(designId);
  });

  // Inits the Shortcuts Controller.
  onMount(() => {
    ShortcutsController.init();
    return () => ShortcutsController.destroy();
  });

  // Listens to the before unload event to prevent the user accidentally close the editor.
  onMount(() => {
    const handleBeforeUnload: OnBeforeUnloadEventHandler = (event) => {
      event.preventDefault();
      return "";
    };

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
    {#if $designData}
      <Canvas />
    {/if}
  </div>
</div>

<style>
  .editor {
    display: flex;
    height: 100%;

    overflow: hidden;

    /* Tools */
    & > div:first-child {
      flex-shrink: 0;

      padding: 1ch;
      overflow: auto;

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
