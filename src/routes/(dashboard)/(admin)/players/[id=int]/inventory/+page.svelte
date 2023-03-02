<script lang="ts">
    import { page } from "$app/stores";
    import DashboardPage from "$lib/components/DashboardPage.svelte";
    import Inventory from "$lib/components/Inventory.svelte";

    const playerId = parseInt($page.params.id);
    if (Number.isNaN(playerId)) throw "NaN Player ID";
</script>

<DashboardPage
    title="Other Inventory"
    text="Click an inventory category to view its contents"
>
    <Inventory {playerId}>
        <a href={`/players/${playerId}`} class="button button--alt"> Back </a>
    </Inventory>
</DashboardPage>
