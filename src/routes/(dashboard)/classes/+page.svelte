<script lang="ts">
    import { player } from "$lib/api/api";
    import Classes from "$lib/components/Classes.svelte";
    import DashboardPage from "$lib/components/DashboardPage.svelte";
</script>

<DashboardPage
    title="Classes"
    text="Below is a list of all your classes along with their level and total promotions"
>
    <Classes playerId={$player.id} />
</DashboardPage>
