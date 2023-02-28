<script lang="ts">
    import { player } from "$lib/api/api";
    import DashboardPage from "$lib/components/DashboardPage.svelte";
    import Inventory from "$lib/components/Inventory.svelte";
</script>

<DashboardPage
    title="Inventory"
    text="Click an inventory category to view its contents"
>
    <Inventory playerId={$player.id} />
</DashboardPage>
