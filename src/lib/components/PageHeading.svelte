<script lang="ts">
  import CaretLeft from "~icons/ph/caret-left-bold";

  export let title: string;
  export let text: string | undefined = undefined;
  export let backURL: string | undefined = undefined;
</script>

<div class="wrapper">
  {#if backURL !== undefined}
    <a href={backURL} class="back">
      <CaretLeft width="2rem" height="2rem" />
    </a>
  {/if}
  <div class="heading">
    <h1 class="title">{title}</h1>
    {#if text}
      <p class="text">{text}</p>
    {/if}
  </div>

  <div class="actions">
    <slot name="actions" />
  </div>
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    flex-flow: row;
    gap: 1rem;
    align-items: center;
    border-bottom: 1px solid #111;
    flex: auto;
  }

  .actions {
    display: flex;
    flex-flow: row;
    justify-content: flex-end;
    flex: auto;
  }

  .back {
    text-decoration: none;
    color: #999;
  }

  .heading {
    margin-bottom: 1rem;
    padding-top: 1rem;
  }

  .title {
    font-size: 1.25rem;
  }

  .text {
    font-size: 1rem;
  }

  .title,
  .text {
    margin-bottom: 0.5rem;
  }
</style>
