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
    :global(body) {
        width: 100%;
        height: 100vh;
    }

    .dashboard {
        width: 100%;
        height: 100%;

        padding: 2rem;

        display: flex;
        gap: 2rem;
    }

    .main {
        flex: auto;
        height: 100%;
        overflow: auto;
        position: relative;
    }
</style>
