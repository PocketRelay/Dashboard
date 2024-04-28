<script lang="ts">
  export let title: string;
  export let text: string | undefined = undefined;
</script>

<div class="heading">
  <h1 class="title">{title}</h1>
  {#if text}
    <p class="text">{text}</p>
  {/if}

  <slot />
</div>

<style lang="scss">
  .heading {
    border-bottom: 1px solid #111;
    margin-bottom: 1rem;
    padding-top: 1rem;
  }

  .title,
  .ident,
  .text {
    margin-bottom: 0.5rem;
  }
</style>
