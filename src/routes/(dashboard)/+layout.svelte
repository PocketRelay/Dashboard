<script lang="ts">
  import { navigating } from "$app/stores";
  import Loader from "$lib/components/Loader.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import RequireAccess from "../../lib/components/RequireAccess.svelte";
</script>

<RequireAccess>
  <div class="dashboard">
    <Sidebar />

    <main class="main">
      {#if $navigating}
        <Loader />
      {:else}
        <slot />
      {/if}
    </main>
  </div>
</RequireAccess>

<style lang="scss">
  .dashboard {
    width: 100%;
    height: 100%;

    display: flex;
    gap: 1rem;
  }

  .main {
    flex: auto;
    height: 100%;
    overflow: auto;
    position: relative;
    padding-right: 1rem;
  }
</style>
