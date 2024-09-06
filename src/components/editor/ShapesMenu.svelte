<script lang="ts">
  import { selectedShape } from "$lib/stores/editor-stores";
  import { shapes } from "$lib/editor/shapes/shapes";
  import ListMenu from "../list-menu/ListMenu.svelte";
  import Card from "../Card.svelte";
  import type { ShapeType } from "$lib/editor/shapes/shapes.types";
  import { warp } from "$lib/utils/number.utils";

  const handleSelectShape = (shape: string) => {
    const data = shapes[shape as ShapeType];

    // If the same item is being selected, scroll through variants, otherwise resets it to 0.
    let variant: number;
    if (!data.variants || $selectedShape[0] !== shape) variant = 0;
    else variant = warp($selectedShape[1] + 1, data.variants?.length - 1);

    selectedShape.set([shape as ShapeType, variant]);
  };
</script>

<Card title="Shapes" width={17}>
  <ListMenu
    items={shapes}
    selectedKey={$selectedShape[0]}
    selectedVariant={$selectedShape[1]}
    onSelectItem={handleSelectShape}
  />
</Card>
