<script lang="ts">
  import { shapes } from "$lib/editor/shapes/shapes";
  import type { ShapeType } from "$lib/editor/shapes/shapes.types";
  import { ShortcutsController } from "$lib/ShortcutsController";
  import { selectedShape } from "$lib/stores/editor-stores";
  import { warp } from "$lib/utils/number.utils";
  import { onMount } from "svelte";
  import Card from "../Card.svelte";
  import ListMenu from "../list-menu/ListMenu.svelte";

  const handleSelectShape = (shape: string) => {
    const data = shapes[shape as ShapeType];

    // If the same item is being selected, scroll through variants, otherwise resets it to 0.
    let variant: number;
    if (!data.variants || $selectedShape[0] !== shape) variant = 0;
    else variant = warp($selectedShape[1] + 1, data.variants?.length - 1);

    selectedShape.set([shape as ShapeType, variant]);
  };

  const handleShortcut = (sequence: string) => {
    Object.entries(shapes).forEach(([shape, data]) => {
      if (data.shortcut !== sequence) return;
      handleSelectShape(shape);
    });
  };

  // Add shortcut listeners
  onMount(() => {
    ShortcutsController.addListener(handleShortcut);
    return () => ShortcutsController.removeListener(handleShortcut);
  });
</script>

<Card title="Shapes" width={17}>
  <ListMenu
    items={shapes}
    selectedKey={$selectedShape[0]}
    selectedVariant={$selectedShape[1]}
    onSelectItem={handleSelectShape}
  />
</Card>
