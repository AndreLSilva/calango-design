<script lang="ts">
  import { goto } from "$app/navigation";
  import { createDesign } from "$lib/api/designs/create";
  import type { DesignData } from "$lib/api/designs/designs.types";
  import { listDesigns } from "$lib/api/designs/list";
  import { onMount } from "svelte";
  import Button from "../components/Button.svelte";
  import Card from "../components/Card.svelte";

  let designs: DesignData[];

  /** Creates a new design. */
  const handleNewDesign = async () => {
    const newDesign = await createDesign(32, 14); // Default size hardcoded for now.
    goto(`/editor?id=${newDesign.id}`);
  };

  // Loads all the designs.
  onMount(async () => {
    designs = await listDesigns();
  });
</script>

<div class="container">
  <div>
    <Button onClick={handleNewDesign}>New design</Button>
    <br />
    <Card title="Designs" width={36} height={designs?.length || 1}>
      {#if designs?.length}
        <!-- Designs list -->
        {#each designs as design}
          <Button href={`/editor?id=${design.id}`}>{design.name}</Button>
        {/each}
      {:else if designs}
        <!-- Designs empty state -->
        <p>Empty</p>
      {:else}
        <!-- Designs loading state -->
        <p>Loading...</p>
      {/if}
    </Card>
  </div>
</div>

<style>
  .container {
    display: flex;
    height: 100%;

    overflow: hidden;

    /* Designs list */
    & > div:first-child {
      padding: 1ch;
      background: var(--surface);
    }
  }
</style>
