<script lang="ts">
    import { player } from "$lib/api/api";
    import {
        getLeaderboard,
        getPlayerEntry,
        LeaderboardName,
    } from "$lib/api/leaderboard";
    import { getServerDetails } from "$lib/api/server";
    import DashboardPage from "$lib/components/DashboardPage.svelte";
    import { getNumberWithOrdinal } from "$lib/tools/numbers";
    import Account from "svelte-material-icons/Account.svelte";
    import AccountMultiple from "svelte-material-icons/AccountMultiple.svelte";
    import List from "svelte-material-icons/FormatListNumbered.svelte";
    import Sync from "svelte-material-icons/Sync.svelte";

    // Loading state
    let loading = true;

    let n7Placing = 0;
    let cpPlacing = 0;

    let n7Rating = 0;
    let challengePoints = 0;

    let totalPlayers = 0;

    let serverVersion = "";
    let serverBranch = "";
    let serverHash = "";

    async function updateData(id: number) {
        loading = true;
        try {
            let [n7Entry, cpEntry, leaderboard, serverDetails] =
                await Promise.all([
                    getPlayerEntry(LeaderboardName.N7Rating, id),
                    getPlayerEntry(LeaderboardName.ChallengePoints, id),
                    getLeaderboard(LeaderboardName.N7Rating, 0, 1),
                    getServerDetails(),
                ]);
            n7Placing = n7Entry.rank;
            n7Rating = n7Entry.value;

            cpPlacing = cpEntry.rank;
            challengePoints = cpEntry.value;

            totalPlayers = leaderboard.total;

            serverVersion = serverDetails.version;
            serverBranch = serverDetails.branch;
            serverHash = serverDetails.hash;

            loading = false;
        } catch (e) {
            console.error(e);
        }
    }

    $: {
        let id = $player.id;
        updateData(id).then().catch();
    }
</script>

<DashboardPage title={"Dashboard Home"}>
    <div class="cards">
        <div class="card">
            <div class="card__head">
                <Account class="card__head__icon" />
                <h2 class="card__head__title">Current Player</h2>
            </div>
            <p class="card__text">
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
            <p class="card__text">
                You currently rank <span class="annot"
                    >{getNumberWithOrdinal(n7Placing)}</span
                >
                place in the N7 Rating leaderboard and
                <span class="annot">{getNumberWithOrdinal(cpPlacing)}</span> place
                in the Challenge Points leaderboard
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
            <p class="card__text">
                Below is the total number of players apart of this server
            </p>
            <span class="card__value">{totalPlayers}</span>
        </div>
        <div class="card">
            <div class="card__head">
                <Sync class="card__head__icon" />
                <h2 class="card__head__title">Server Version</h2>
            </div>
            <p class="card__text">
                The Pocket Relay server you are connected to is currently on
                version
            </p>
            <span><b>Branch:</b> {serverBranch}</span>
            <a
                class="card__value"
                href={`https://github.com/PocketRelay/Server/commit/${serverHash}`}
                target="_blank"
                rel="noreferrer"
                >{serverVersion}
                <span class="git">{serverBranch} / {serverHash}</span></a
            >
        </div>
        <div class="card">
            <div class="card__head">
                <List class="card__head__icon" />
                <h2 class="card__head__title">N7 Rating</h2>
            </div>
            <p class="card__text">
                Your current N7 rating is below this is accumulated from
                leveling up
            </p>
            <span class="card__value">{n7Rating}</span>
        </div>
        <div class="card">
            <div class="card__head">
                <List class="card__head__icon" />
                <h2 class="card__head__title">Challenge Points</h2>
            </div>
            <p class="card__text">
                Your current total challenge point count is listed below. You
                can get these by completing challenges
            </p>
            <span class="card__value">{challengePoints}</span>
        </div>
    </div>
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

    .card__text {
        line-height: 1.5;
        margin-bottom: 0.5rem;
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
