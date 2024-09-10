<script lang="ts">
  import Button from "../Button.svelte";

  export let label: string = "";
  export let value: number;
  export let min: number | undefined = undefined;
  export let max: number | undefined = undefined;
  export let onChange: (value: number) => void;

  const handleChange = (dir: number) => {
    if (max !== undefined && value + dir > max) onChange(max);
    else if (min !== undefined && value + dir < min) onChange(min);
    else onChange(value + dir);
  };
</script>

<div style:display="flex" style:justify-content="space-between">
  {#if label}
    <p>{label}</p>
  {/if}
  <div style:display="flex" style:white-space="pre">
    <Button onClick={() => handleChange(1)}>{" + "}</Button>
    <p>
      {` ${value} `}
    </p>
    <Button onClick={() => handleChange(-1)}>{" - "}</Button>
  </div>
</div>
