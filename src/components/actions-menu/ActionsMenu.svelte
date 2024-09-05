<script lang="ts">
  import { actions } from "$lib/editor/actions/actions";
  import ListMenu from "../ListMenu.svelte";
  import ActionsLineRenderer from "./ActionsLineRenderer.svelte";
</script>

<ListMenu title="Actions" width={15} items={actions} lineRenderer={ActionsLineRenderer} />
