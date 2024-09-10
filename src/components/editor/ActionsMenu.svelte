<script lang="ts">
  import { editorScreen } from "$lib/stores/editor-stores";
  import { sanitizeCanvas } from "$lib/utils/canvas.utils";
  import { downloadFile } from "$lib/utils/misc.utils";
  import Button from "../Button.svelte";
  import Card from "../Card.svelte";

  const handleSettings = () => {
    editorScreen.set("settings");
  };

  const handleExport = () => {
    const content = sanitizeCanvas(document.getElementById("canvas") as HTMLDivElement);
    downloadFile("Canvas", content);
  };

  const handleReset = () => {
    window.dispatchEvent(new CustomEvent("canvas-reset", { bubbles: true }));
  };
</script>

<Card title="Actions" width={17}>
  <Button onClick={handleSettings}>Settings</Button>
  <Button onClick={handleExport}>Export</Button>
  <Button onClick={handleReset}>Reset</Button>
</Card>
