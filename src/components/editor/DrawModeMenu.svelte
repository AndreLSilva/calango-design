<script lang="ts">
  import { drawModes } from "$lib/editor/draw-mode/draw-mode";
  import type { DrawModeType } from "$lib/editor/draw-mode/draw-mode.types";
  import { selectedColor, selectedDrawMode } from "$lib/stores/editor-stores";
  import Card from "../Card.svelte";
  import ListMenu from "../list-menu/ListMenu.svelte";

  const handleSelectDrawMode = (drawMode: string) => {
    selectedDrawMode.set(drawMode as DrawModeType);
  };
</script>

<Card title="Draw mode" width={17}>
  <ListMenu items={drawModes} selectedKey={$selectedDrawMode} onSelectItem={handleSelectDrawMode} />
  <br />
  <div>
    <p>
      Foreground <span style:color={$selectedColor[0]}>{$selectedColor[0] ? "■" : "□"}</span>
    </p>
    <p>
      Background <span style:color={$selectedColor[1]}>{$selectedColor[1] ? "■" : "□"}</span>
    </p>
  </div>
</Card>
