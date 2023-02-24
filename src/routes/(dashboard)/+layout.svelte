<script lang="ts">
    import Sidebar from "$lib/components/Sidebar.svelte";
    import RequireAccess from "../../lib/components/RequireAccess.svelte";
</script>

<RequireAccess>
    <div class="dashboard">
        <Sidebar />
        <main class="main">
            <slot />
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
    }
</style>
