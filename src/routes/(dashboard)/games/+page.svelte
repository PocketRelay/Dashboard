<script lang="ts">
    import { getGames, type Game } from "$lib/api/games";
    import GameComponent from "$lib/components/GameComponent.svelte";
    import { onMount } from "svelte";

    let games: Game[] = [];

    let count: number = 20;
    let offset: number = 0;
    let more: boolean = false;

    async function load(offset: number, count: number) {
        try {
            let response = await getGames(offset, count);
            games = response.games;
            more = response.more;
        } catch (e) {
            console.error(e);
        }
    }

    function refresh() {
        load(offset, count).then().catch();
    }

    $: {
        load(offset, count).then().catch();
    }
</script>

<div class="wrapper">
    <div class="heading">
        <h1 class="title">Games</h1>
        <span class="ident">POCKET RELAY MANAGER</span>
        <p class="text">Below is a list of games that are currently running</p>
        <div class="actions">
            <button class="action button" on:click={refresh}> Refresh </button>
            <button
                class="action button"
                disabled={offset == 0}
                on:click={() => (offset -= 1)}
            >
                Previous
            </button>
            <select class="action action-list" bind:value={count}>
                <option value={2}>2</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20} selected>20</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
            </select>
            <button
                class="action button"
                disabled={!more}
                on:click={() => (offset += 1)}
            >
                Next
            </button>
        </div>
    </div>

    <div class="games">
        {#each games as game}
            <GameComponent {game} />
        {/each}
    </div>
</div>

<style lang="scss">
    .games {
        height: 100%;
        overflow: auto;

        display: flex;
        flex-flow: row wrap;
        align-items: flex-start;
        gap: 1rem;
    }

    .actions {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
    }

    .action-list {
        padding: 0.75rem;
        color: #ffffff;
        background-color: #41445e;
        text-decoration: none;

        color: white;
        font-size: 1rem;
        border-radius: 5px;

        letter-spacing: 0.1rem;
        border: none;
    }

    .wrapper {
        display: flex;
        flex-flow: column;
        gap: 1rem;
        height: 100%;
    }
</style>
