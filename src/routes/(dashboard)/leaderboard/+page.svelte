<script lang="ts">
    import {
        getLeaderboard,
        LeaderboardName,
        type LeaderboardEntry,
    } from "$lib/api/leaderboard";
    import DashboardPage from "$lib/components/DashboardPage.svelte";
    import { getNumberWithOrdinal } from "$lib/tools/numbers";

    let selected = LeaderboardName.N7Rating;

    let loading = true;

    let entries: LeaderboardEntry[] = [];
    let more: boolean = false;

    let count: number = 20;
    let offset: number = 0;

    async function load(name: LeaderboardName, offset: number, count: number) {
        loading = true;

        try {
            let response = await getLeaderboard(name, offset, count);
            entries = response.entries;
            more = response.more;
        } catch (e) {}

        loading = false;
    }

    $: {
        load(selected, offset, count).then().catch();
    }
</script>

<DashboardPage
    title="Leaderboard"
    text="Click a leaderboard category to show results based on that leaderboard"
>
    <svelte:fragment slot="heading">
        <div class="names">
            <button
                class="name card"
                class:name--selected={selected == LeaderboardName.N7Rating}
                on:click={() => (selected = LeaderboardName.N7Rating)}
            >
                <h2 class="name__title">N7 Rating</h2>
                <p class="name__desc">
                    This leaderboard is ranked based on your total class levels
                    and promotions combined
                </p>
            </button>

            <button
                class="name card"
                class:name--selected={selected ==
                    LeaderboardName.ChallengePoints}
                on:click={() => (selected = LeaderboardName.ChallengePoints)}
            >
                <h2 class="name__title">Challenge Points</h2>
                <p class="name__desc">
                    This leaderboard is ranked based on the amount challenge
                    points you’ve gained from completing challenges
                </p>
            </button>
        </div>

        <div class="actions">
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
    </svelte:fragment>

    <table class="entries">
        <thead class="entries__head">
            <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Value</th>
            </tr>
        </thead>
        <tbody class="entries__body">
            {#each entries as entry}
                <tr class="entry">
                    <td class="entry__place"
                        >{getNumberWithOrdinal(entry.rank)}</td
                    >
                    <td class="entry__name">{entry.player_name}</td>
                    <td class="entry__value">{entry.value}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</DashboardPage>

<style lang="scss">
    .entries {
        position: relative;
        width: 100%;
        border-collapse: collapse;
    }

    .entries__head {
        position: sticky;
        top: 0;
        background-color: #222;
    }

    .entry {
        border-collapse: collapse;
        background-color: #0f0f0f;
    }

    .entry > td,
    .entries__head th {
        padding: 1rem;
    }

    .entries__head th {
        text-align: left;
    }

    .entries__head th:last-child {
        text-align: right;
    }

    .entry:nth-child(even) {
        background-color: #1a1a1a;
    }

    .entry__place {
        color: #72b2b6;
        font-weight: bold;
    }

    .entry__name {
        text-align: left;
    }

    .entry__value {
        color: #72b2b6;
        text-align: right;
    }
    .names {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
    }

    .name {
        cursor: pointer;
        border: none;
        color: white;
        text-align: left;
        padding: 1rem;
    }

    .name--selected {
        background-color: #4e5382;
    }

    .name__title {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
    }

    .name__desc {
        font-size: 1rem;
        max-width: 500px;
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
</style>
