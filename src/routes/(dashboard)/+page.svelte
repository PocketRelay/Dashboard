<script lang="ts">
    import { player, type RequestError } from "$lib/api/api";
    import {
        getLeaderboard,
        getPlayerEntry,
        LeaderboardName,
        type LeaderboardEntry,
    } from "$lib/api/leaderboard";
    import { getServerDetails, type ServerDetails } from "$lib/api/server";
    import DashboardPage from "$lib/components/DashboardPage.svelte";
    import Loader from "$lib/components/Loader.svelte";
    import { getNumberWithOrdinal } from "$lib/tools/numbers";
    import Account from "svelte-material-icons/Account.svelte";
    import AccountMultiple from "svelte-material-icons/AccountMultiple.svelte";
    import List from "svelte-material-icons/FormatListNumbered.svelte";
    import Sync from "svelte-material-icons/Sync.svelte";

    interface Data {
        n7Entry: LeaderboardEntry;
        cpEntry: LeaderboardEntry;
        totalPlayers: number;
        serverDetails: ServerDetails;
    }

    // Loading state
    let loading = true;
    // Loaded data state
    let data: Data | null = null;

    async function load(id: number) {
        loading = true;
        try {
            let [n7Entry, cpEntry, leaderboard, serverDetails] =
                await Promise.all([
                    getPlayerEntry(LeaderboardName.N7Rating, id),
                    getPlayerEntry(LeaderboardName.ChallengePoints, id),
                    getLeaderboard(LeaderboardName.N7Rating, 0, 1),
                    getServerDetails(),
                ]);

            data = {
                n7Entry,
                cpEntry,
                totalPlayers: leaderboard.total,
                serverDetails,
            };
        } catch (e) {
            let err = e as RequestError;
            console.error(err);
        } finally {
            loading = false;
        }
    }

    // Load the player data
    $: load($player.id);
</script>

<DashboardPage title={"Dashboard Home"}>
    {#if loading}
        <Loader />
    {:else if data}
        <div class="cards">
            <div class="card">
                <div class="card__head">
                    <Account class="card__head__icon" />
                    <h2 class="card__head__title">Current Player</h2>
                </div>
                <p>
                    Welcome to your dashboard you are the <span class="annot"
                        >{getNumberWithOrdinal($player.id)}</span
                    > player to join this server
                </p>
                <span class="card__value">{$player.display_name}</span>
            </div>
            <div class="card">
                <div class="card__head">
                    <List class="card__head__icon" />
                    <h2 class="card__head__title">Leaderboard Placing</h2>
                </div>
                <p>
                    You currently rank <span class="annot"
                        >{getNumberWithOrdinal(data.n7Entry.rank)}</span
                    >
                    place in the N7 Rating leaderboard and
                    <span class="annot"
                        >{getNumberWithOrdinal(data.cpEntry.rank)}</span
                    >
                    place in the Challenge Points leaderboard
                </p>
                <a class="card__value card__value--button" href="/leaderboard"
                    >View Leaderboard</a
                >
            </div>
            <div class="card">
                <div class="card__head">
                    <AccountMultiple class="card__head__icon" />
                    <h2 class="card__head__title">Total Players</h2>
                </div>
                <p>Below is the total number of players apart of this server</p>
                <span class="card__value">{data.totalPlayers}</span>
            </div>
            <div class="card">
                <div class="card__head">
                    <Sync class="card__head__icon" />
                    <h2 class="card__head__title">Server Version</h2>
                </div>
                <p>
                    The Pocket Relay server you are connected to is currently on
                    version
                </p>
                <a
                    class="card__value"
                    href={`https://github.com/PocketRelay/Server/commit/${data.serverDetails.hash}`}
                    target="_blank"
                    rel="noreferrer"
                    >{data.serverDetails.version}
                    <span class="git"
                        >{data.serverDetails.branch} / {data.serverDetails
                            .hash}</span
                    ></a
                >
            </div>
            <div class="card">
                <div class="card__head">
                    <List class="card__head__icon" />
                    <h2 class="card__head__title">N7 Rating</h2>
                </div>
                <p>
                    Your current N7 rating is below this is accumulated from
                    leveling up
                </p>
                <span class="card__value">{data.n7Entry.value}</span>
            </div>
            <div class="card">
                <div class="card__head">
                    <List class="card__head__icon" />
                    <h2 class="card__head__title">Challenge Points</h2>
                </div>
                <p>
                    Your current total challenge point count is listed below.
                    You can get these by completing challenges
                </p>
                <span class="card__value">{data.cpEntry.value}</span>
            </div>
        </div>
    {/if}
</DashboardPage>

<style lang="scss">
    .git {
        display: inline-block;
        vertical-align: middle;
        font-size: 0.9rem;
        color: #999;
    }

    .cards {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
    }

    @media screen and (max-width: 920px) {
        .cards {
            grid-template-columns: 1fr;
        }
    }

    .card {
        display: flex;
        flex-flow: column;
        flex: auto;
        justify-content: space-between;
    }

    .card__head {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        margin-bottom: 1rem;
    }

    :global(.card__head__icon) {
        width: 32px;
        height: 32px;
        vertical-align: middle;
    }

    .card__head__title {
        flex: auto;
        margin-left: 1rem;
        font-size: 1rem;
    }

    .card__value {
        color: #72b2b6;
        font-size: 1.25rem;
        font-weight: bold;
        align-self: stretch;
        margin-top: 1rem;
        text-decoration: none;
        display: block;
    }
</style>
