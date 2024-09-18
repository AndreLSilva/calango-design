<script lang="ts">
  import { colorsPalette } from "$lib/editor/colors-palette/colors-palette";
  import Card from "../../Card.svelte";
  import ColorPaletteItem from "./ColorPaletteItem.svelte";

  const sortedColors: string[][] = [[], [], []];
  colorsPalette.forEach((color, i) => {
    if (i < 16) sortedColors[0].push(color);
    else if (i < 232) sortedColors[1].push(color);
    else sortedColors[2].push(color);
  });
</script>

<Card title="Colors palette" width={36}>
  <div style="display: flex;">
    {#each sortedColors[0] as color}
      <ColorPaletteItem {color} />
    {/each}
  </div>

  {#each { length: 6 } as _, i}
    <div style="display: flex;">
      {#each { length: 36 } as _, j}
        <ColorPaletteItem color={sortedColors[1][j + i * 36]} />
      {/each}
    </div>
  {/each}

  <div style="display: flex;">
    {#each sortedColors[2] as color}
      <ColorPaletteItem {color} />
    {/each}
  </div>
</Card>
