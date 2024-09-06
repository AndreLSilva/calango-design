<script lang="ts">
  import { actions } from "$lib/editor/actions/actions";
  import { sanitizeCanvas } from "$lib/utils/canvas.utils";
  import { downloadFile } from "$lib/utils/misc.utils";
  import Card from "../Card.svelte";
  import ListMenu from "../list-menu/ListMenu.svelte";

  const handleSelectAction = (action: string) => {
    switch (action) {
      case "export":
        {
          const content = sanitizeCanvas(document.getElementById("canvas") as HTMLDivElement);
          downloadFile("Canvas", content);
        }
        break;
      case "reset":
        window.dispatchEvent(new CustomEvent("canvas-reset", { bubbles: true }));
        break;
    }
  };
</script>

<Card title="Actions" width={17}>
  <ListMenu items={actions} onSelectItem={handleSelectAction} />
</Card>
