<script lang="ts">
    import {
        getPlayers,
        PlayerRole,
        type PlayerAccount,
    } from "$lib/api/players";
    import DashboardPage from "$lib/components/DashboardPage.svelte";
    import Loader from "$lib/components/Loader.svelte";
    import Refresh from "svelte-material-icons/Refresh.svelte";

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

    function refresh() {
        load(offset, count);
    }

    $: load(offset, count);
</script>

<DashboardPage
    title="Players"
    text="Below is a list of player accounts on this server"
>
    <svelte:fragment slot="heading">
        <div class="button-group">
            <button class="button button--dark" on:click={refresh}>
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
    {#if loading}
        <Loader />
    {/if}
    <table class="table">
        <thead class="table__head">
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>View</th>
            </tr>
        </thead>
        <tbody class="table__body">
            {#each entries as entry}
                <tr class="table__entry">
                    <td>{entry.display_name}</td>
                    <td>{entry.email}</td>
                    <td>{entry.role}</td>
                    <td>
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
</DashboardPage>
