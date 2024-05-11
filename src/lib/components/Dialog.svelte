<script lang="ts">
  export let visible: boolean;
</script>

{#if visible}
  <div class="dialog-wrapper">
    <div class="card dialog">
      <slot />
    </div>
  </div>
{/if}

<style lang="scss">
  .dialog-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dialog {
    display: flex;
    flex-flow: column;
    gap: 1rem;
    max-width: 500px;
    width: 100%;
    animation: dialog 0.15s ease forwards;
  }

  @keyframes dialog {
    0% {
      opacity: 0;
      transform: translateY(15px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
