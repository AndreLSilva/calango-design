<script lang="ts">
  export let content: string = "";
</script>

{#each content as char}
  <span>{char}</span>
{/each}
