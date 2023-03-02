<script lang="ts">
    import { getGames, type Game } from "$lib/api/games";
    import DashboardPage from "$lib/components/DashboardPage.svelte";
    import GameComponent from "$lib/components/GameComponent.svelte";
    import Loader from "$lib/components/Loader.svelte";
    import Refresh from "svelte-material-icons/Refresh.svelte";

    let games: Game[] = [];

    let loading: boolean = false;
    let count: number = 20;
    let offset: number = 0;
    let more: boolean = false;

    async function load(offset: number, count: number) {
        loading = true;
        try {
            let response = await getGames(offset, count);
            games = response.games;
            more = response.more;
        } catch (e) {
            console.error(e);
        } finally {
            loading = false;
        }
    }

    function refresh() {
        load(offset, count);
    }

    $: load(offset, count);
</script>

<DashboardPage
    title="Games"
    text="Below is a list of games that are currently running"
>
    <svelte:fragment slot="heading">
        <div class="button-group">
            <button class=" button button--dark" on:click={refresh}>
                <Refresh width={24} height={24} />
            </button>
            <button
                class="button button--dark"
                disabled={offset == 0}
                on:click={() => (offset -= 1)}
            >
                Previous
            </button>
            <select class="select" bind:value={count}>
                <option value={2}>2</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20} selected>20</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
            </select>
            <button
                class="button button--dark"
                disabled={!more}
                on:click={() => (offset += 1)}
            >
                Next
            </button>
        </div>
    </svelte:fragment>
    <div class="games">
        {#if loading}
            <Loader />
        {:else}
            {#each games as game}
                <GameComponent {game} />
            {/each}
        {/if}
    </div>
</DashboardPage>

<style lang="scss">
    .games {
        display: flex;
        flex-flow: row wrap;
        align-items: flex-start;
        gap: 1rem;
    }
</style>
