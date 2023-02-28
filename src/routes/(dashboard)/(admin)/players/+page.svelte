<script lang="ts">
    import { player } from "$lib/api/api";
    import {
        getPlayers,
        PlayerRole,
        type PlayerAccount,
    } from "$lib/api/players";

    let loading = true;

    let entries: PlayerAccount[] = [];
    let more: boolean = false;

    let count: number = 20;
    let offset: number = 0;

    async function load(offset: number, count: number) {
        loading = true;

        try {
            let response = await getPlayers(offset, count);
            entries = response.players;
            more = response.more;
        } catch (e) {}

        loading = false;
    }

    $: {
        load(offset, count).then().catch();
    }
</script>

<div class="wrapper">
    <div class="heading">
        <h1 class="title">Players</h1>
        <span class="ident">POCKET RELAY MANAGER</span>
        <p class="text">Below is a list of player accounts on this server</p>

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
    </div>

    <div class="entries-wrapper">
        <table class="entries">
            <thead class="entries__head">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>View</th>
                </tr>
            </thead>
            <tbody class="entries__body">
                {#each entries as entry}
                    <tr class="entry">
                        <td class="entry__name">{entry.display_name}</td>
                        <td class="entry__value">{entry.email}</td>
                        <td class="entry__value">{entry.role}</td>
                        <td class="entry__value">
                            {#if entry.role == PlayerRole.Default}
                                <a class="button" href={`/players/${entry.id}`}>
                                    View
                                </a>
                            {/if}
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

<style lang="scss">
    .entries-wrapper {
        height: 100%;
        overflow: auto;
    }

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
        text-align: left;
    }

    .entries__head th:last-child,
    .entry > td:last-child {
        text-align: right;
    }

    .entry:nth-child(even) {
        background-color: #1a1a1a;
    }
    .entry__name {
        text-align: left;
    }

    .entry__value {
        color: #72b2b6;
        text-align: right;
    }

    .wrapper {
        display: flex;
        flex-flow: column;
        gap: 1rem;
        height: 100%;
    }

    .title,
    .ident,
    .text {
        margin-bottom: 0.5rem;
    }

    .text {
        color: #999999;
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
