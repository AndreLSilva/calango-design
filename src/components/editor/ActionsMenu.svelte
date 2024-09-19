<script lang="ts">
  import type { DesignData } from "$lib/api/designs/designs.types";
  import { updateDesign } from "$lib/api/designs/update";
  import { ShortcutsController } from "$lib/ShortcutsController";
  import { designData, editorScreen } from "$lib/stores/editor-stores";
  import { sanitizeCanvas } from "$lib/utils/canvas.utils";
  import { downloadFile } from "$lib/utils/misc.utils";
  import { onMount } from "svelte";
  import Button from "../Button.svelte";
  import Card from "../Card.svelte";

  const handleSettings = () => {
    editorScreen.set("settings");
  };

  const handleSave = async () => {
    const canvasEl = document.getElementById("canvas");
    if (!canvasEl) throw new Error("Missing canvas element");
    if (!$designData) throw new Error("Missing design data");

    const updatedData: DesignData = {
      ...$designData,
      content: sanitizeCanvas(canvasEl),
    };

    await updateDesign(updatedData);
  };

  const handleExport = () => {
    const canvasEl = document.getElementById("canvas");
    if (!canvasEl) throw new Error("Missing canvas element");

    const content = sanitizeCanvas(canvasEl);
    downloadFile("Canvas", content);
  };

  const handleReset = () => {
    const resetEvent = new CustomEvent("canvas-reset", { bubbles: true });
    window.dispatchEvent(resetEvent);
  };

  // Add shortcuts
  onMount(() => {
    ShortcutsController.addShortcutListener(["Control", "s"], handleSave);
    return () => ShortcutsController.removeShortcutListener(["Control", "s"], handleSave);
  });
</script>

<Card title="Actions" width={17}>
  <Button onClick={handleSettings}>Settings</Button>
  <Button onClick={handleSave} title="Ctrl + S">Save</Button>
  <Button onClick={handleExport}>Export</Button>
  <Button onClick={handleReset}>Reset</Button>
</Card>
