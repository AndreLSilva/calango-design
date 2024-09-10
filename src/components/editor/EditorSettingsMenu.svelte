<script lang="ts">
  import { onMount } from "svelte";
  import Card from "../Card.svelte";
  import RangeInput from "./RangeInput.svelte";
  import Button from "../Button.svelte";
  import { canvasH, canvasW, editorScreen } from "$lib/stores/editor-stores";

  let editorSize = 16;
  const editorSizeMin: number = 8;

  const handleEditorSizeChange = (value: number) => {
    const rootEl = document.querySelector("html")!;
    rootEl.style.fontSize = `${value}px`;
    editorSize = value;
  };

  onMount(() => {
    const rootEl = document.querySelector("html")!;
    editorSize = (rootEl.computedStyleMap().get("font-size") as CSSUnitValue).value ?? 16;
  });
</script>

<Button onClick={() => editorScreen.set("tools")}>← Back</Button>
<br />
<Card title="Settings" width={36}>
  <RangeInput
    label="Editor base size:"
    value={editorSize}
    min={editorSizeMin}
    onChange={handleEditorSizeChange}
  />

  <div style:display="flex" style:justify-content="space-between">
    <p>Canvas size:</p>
    <RangeInput value={$canvasW} min={0} onChange={(value) => canvasW.set(value)} />
    <p>x</p>
    <RangeInput value={$canvasH} min={0} onChange={(value) => canvasH.set(value)} />
  </div>
</Card>
