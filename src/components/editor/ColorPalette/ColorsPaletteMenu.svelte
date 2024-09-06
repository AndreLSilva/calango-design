<script lang="ts">
  import { colorsPalette } from "$lib/editor/colors-palette/colors-palette";
  import Card from "../../Card.svelte";
  import ColorPaletteItem from "./ColorPaletteItem.svelte";
</script>

<Card title="Colors palette" width={36}>
  <div style="display: flex;">
    {#each colorsPalette[0] as color}
      <ColorPaletteItem {color} />
    {/each}
  </div>

  {#each { length: 6 } as _, i}
    <div style="display: flex;">
      {#each { length: 36 } as _, j}
        <ColorPaletteItem color={colorsPalette[1][j + i * 36]} />
      {/each}
    </div>
  {/each}

  <div style="display: flex;">
    {#each colorsPalette[2] as color}
      <ColorPaletteItem {color} />
    {/each}
  </div>
</Card>
