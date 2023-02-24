<script lang="ts">
    import { player } from "$lib/api/api";
    import { getNumberWithOrdinal } from "$lib/tools/numbers";
    import Account from "svelte-material-icons/Account.svelte";
    import AccountMultiple from "svelte-material-icons/AccountMultiple.svelte";
    import List from "svelte-material-icons/FormatListNumbered.svelte";
    import Sync from "svelte-material-icons/Sync.svelte";

    let n7placing = 15;
    let cpplacing = 24;

    let n7rating = 700;
    let cp = 300;

    let totalPlayers = 20;

    let serverVersion = "0.3.0";
</script>

<h1 class="title">Dashboard Home</h1>
<span class="ident">POCKET RELAY MANAGER</span>

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
                >{getNumberWithOrdinal(n7placing)}</span
            >
            place in the N7 Rating leaderboard and
            <span class="annot">{getNumberWithOrdinal(cpplacing)}</span> place in
            the Challenge Points leaderboard
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
            The Pocket Relay server you are connected to is currently on version
        </p>
        <span class="card__value">{serverVersion}</span>
    </div>
    <div class="card">
        <div class="card__head">
            <List class="card__head__icon" />
            <h2 class="card__head__title">N7 Rating</h2>
        </div>
        <p class="card__text">
            Your current N7 rating is below this is accumulated from leveling up
        </p>
        <span class="card__value">{n7rating}</span>
    </div>
    <div class="card">
        <div class="card__head">
            <List class="card__head__icon" />
            <h2 class="card__head__title">Challenge Points</h2>
        </div>
        <p class="card__text">
            Your current total challenge point count is listed below. You can
            get these by completing challenges
        </p>
        <span class="card__value">{cp}</span>
    </div>
</div>

<style lang="scss">
    .title,
    .ident {
        margin-bottom: 0.5rem;
    }

    .cards {
        margin-top: 1rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
    }

    .card {
        display: flex;
        flex-flow: column;
        flex: auto;
        justify-content: space-between;

        background-color: #0f0f0f;
        border-radius: 10px;
        padding: 2rem;
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
    }
</style>
