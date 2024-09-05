<script lang="ts">
  import { actions } from "$lib/editor/actions/actions";
  import Card from "../Card.svelte";
  import ActionsLineRenderer from "./ActionsLineRenderer.svelte";

  $: content = Object.entries(actions).map(([shape, data]) => {
    return ` ${data.label} `;
  });
</script>

<Card title="Actions" width={15} {content} lineRenderer={ActionsLineRenderer} />
