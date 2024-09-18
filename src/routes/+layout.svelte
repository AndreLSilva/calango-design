<script>
  import "../app.css";
</script>

<svelte:head>
  <title>Calango Design</title>
</svelte:head>

<div class="container">
  <!-- header -->
  <header class="header">
    <h1>Calango Design<span>{" "}v0.2.0</span></h1>
    <p>
      └─ By André Lima e Silva ─ <a
        href="https://github.com/AndreLSilva/calango-design/"
        target="_blank">Github</a
      >
      ─ <a href="https://discord.gg/59YQ4pQd3q" target="_blank">Discord</a>
    </p>
  </header>

  <slot />
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .header {
    padding: 1ch 1ch;

    background: var(--surface);

    & > h1 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 400;

      & > span {
        font-size: 0.75rem;
        color: var(--text-medium);
      }
    }

    & > p {
      font-size: 0.75rem;
      color: var(--text-medium);
    }
  }
</style>
