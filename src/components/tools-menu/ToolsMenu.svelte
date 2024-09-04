<script>
  import { tools } from "$lib/editor/tools/tools";
  import Card from "../Card.svelte";
  import ToolsLineRenderer from "./ToolsLineRenderer.svelte";

  $: content = Object.entries(tools).map(([shape, data]) => {
    return data.label;
  });
</script>

<Card title="Tools" width={15} {content} lineRenderer={ToolsLineRenderer} />
