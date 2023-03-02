<script lang="ts">
    import { page } from "$app/stores";
    import Classes from "$lib/components/Classes.svelte";
    import DashboardPage from "$lib/components/DashboardPage.svelte";

    const playerId = parseInt($page.params.id);
    if (Number.isNaN(playerId)) throw "NaN Player ID";
</script>

<DashboardPage
    title="Other Classes"
    text="Below is a list of all your classes along with their level and total promotions"
>
    <Classes {playerId}>
        <a href={`/players/${playerId}`} class="button button--alt back">Back</a
        >
    </Classes>
</DashboardPage>
