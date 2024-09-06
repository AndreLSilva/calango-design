<script lang="ts">
  import { tools } from "$lib/editor/tools/tools";
  import type { ToolType } from "$lib/editor/tools/tools.types";
  import { selectedTool } from "$lib/stores/editor-stores";
  import Card from "../Card.svelte";
  import ListMenu from "../list-menu/ListMenu.svelte";

  const handleSelectTool = (tool: string) => {
    selectedTool.set(tool as ToolType);
  };
</script>

<Card title="Tools" width={17}>
  <ListMenu items={tools} selectedKey={$selectedTool} onSelectItem={handleSelectTool} />
</Card>
