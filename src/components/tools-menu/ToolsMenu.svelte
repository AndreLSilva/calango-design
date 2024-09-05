<script>
  import { tools } from "$lib/editor/tools/tools";
  import { selectedTool } from "$lib/stores/editor-stores";
  import ListMenu from "../ListMenu.svelte";
  import ToolsLineRenderer from "./ToolsLineRenderer.svelte";
</script>

<ListMenu
  title="Tools"
  width={15}
  items={tools}
  selectedKey={$selectedTool}
  lineRenderer={ToolsLineRenderer}
/>
