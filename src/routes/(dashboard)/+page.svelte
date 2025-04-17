<script lang="ts">
  import { player } from "$lib/api/api";
  import { getLatestRelease, type GitHubRelease } from "$lib/api/github";
  import {
    getLeaderboard,
    getPlayerEntry,
    LeaderboardName,
    type LeaderboardEntry,
  } from "$lib/api/leaderboard";
  import { PlayerRole, type PlayerAccount } from "$lib/api/players";
  import { getServerDetails } from "$lib/api/server";
  import PageHeading from "$lib/components/PageHeading.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import { serverVersion } from "$lib/dashboard.state";
  import { getNumberWithOrdinal } from "$lib/tools/numbers";
  import AccountMultiple from "~icons/ph/users-three-fill";
  import List from "~icons/ph/list-numbers-bold";
  import Sync from "~icons/ph/arrow-clockwise-bold";
  import Account from "~icons/ph/user-fill";
  import semver from "semver-lite";

  interface Data {
    n7Entry: LeaderboardEntry | null;
    cpEntry: LeaderboardEntry | null;
    totalPlayers: number;
  }

  // Loading state
  let loading = true;
  // Loaded data state
  let data: Data | null = null;

  let newerRelease: GitHubRelease | null = null;

  async function load(id: number) {
    loading = true;
    try {
      let [n7Entry, cpEntry, leaderboard] = await Promise.allSettled([
        getPlayerEntry(LeaderboardName.N7Rating, id),
        getPlayerEntry(LeaderboardName.ChallengePoints, id),
        getLeaderboard(LeaderboardName.N7Rating, 0, 1),
      ]);

      data = {
        n7Entry: n7Entry.status === "fulfilled" ? n7Entry.value : null,
        cpEntry: cpEntry.status === "fulfilled" ? cpEntry.value : null,
        totalPlayers:
          leaderboard.status === "fulfilled" ? leaderboard.value.total : 0,
      };
    } catch (e) {
      let err = e as Error;
      console.error(err);
    } finally {
      loading = false;
    }
  }

  // Load the player data
  $: {
    if ($player !== null) {
      load($player.id);
    }
  }
  async function updateCheck(
    player: PlayerAccount | null,
    currentVersion: string | null
  ) {
    // Only check for updates on the super admin account
    if (player === null || player.role !== PlayerRole.SuperAdmin) {
      return;
    }

    // Server version isn't loaded yet
    if (currentVersion === null) {
      return;
    }

    try {
      const release = await getLatestRelease();
      if (semver.gt(currentVersion, release.tag_name)) {
        console.debug(
          `Server is running future relase version ${currentVersion} (Latest: ${release.tag_name})`,
        );
      } else if (semver.lt(currentVersion, release.tag_name)) {
        console.debug(
          `Server is running outdated relase version ${currentVersion} (Latest: ${release.tag_name})`,
        );
        newerRelease = release;
      }
    } catch (error) {
      console.error("Failed to check latest GitHub release", error);
    }
  }

  $: updateCheck($player, $serverVersion);
</script>

<PageHeading title="Dashboard Home" />

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
          >{getNumberWithOrdinal($player ? $player.id : 0)}</span
        > player to join this server
      </p>
      <span class="card__value">{$player?.display_name}</span>
    </div>
    <div class="card">
      <div class="card__head">
        <List class="card__head__icon" />
        <h2 class="card__head__title">Leaderboard Placing</h2>
      </div>
      <p>
        You currently rank <span class="annot"
          >{data.n7Entry !== null
            ? getNumberWithOrdinal(data.n7Entry.rank)
            : "Not yet ranked"}</span
        >
        place in the N7 Rating leaderboard and
        <span class="annot"
          >{data.cpEntry !== null
            ? getNumberWithOrdinal(data.cpEntry.rank)
            : "Not yet ranked"}</span
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
    <div class="card" data-warning={newerRelease !== null}>
      <div class="card__head">
        <Sync class="card__head__icon" />
        <h2 class="card__head__title">
          Server Version {#if newerRelease !== null}
            <b class="outdated">Outdated</b>
          {/if}
        </h2>
      </div>
      <p>
        The Pocket Relay server you are connected to is currently on version
      </p>
      {#if newerRelease === null}
        <span class="card__value">{$serverVersion ?? "Loading..."}</span>
      {:else}
        <p class="version">
          Current version: <b class="version__old">v{$serverVersion ?? "..."}</b
          >
          Latest version:
          <a
            class="version__new"
            href={newerRelease.html_url}
            target="_blank"
            rel="noreferrer">{newerRelease.tag_name}</a
          >
        </p>
      {/if}
    </div>
    <div class="card">
      <div class="card__head">
        <List class="card__head__icon" />
        <h2 class="card__head__title">N7 Rating</h2>
      </div>
      <p>
        Your current N7 rating is below this is accumulated from leveling up
      </p>
      <span class="card__value"
        >{data.n7Entry !== null ? data.n7Entry.value : "Not yet ranked"}</span
      >
    </div>
    <div class="card">
      <div class="card__head">
        <List class="card__head__icon" />
        <h2 class="card__head__title">Challenge Points</h2>
      </div>
      <p>
        Your current total challenge point count is listed below. You can get
        these by completing challenges
      </p>
      <span class="card__value"
        >{data.cpEntry !== null ? data.cpEntry.value : "Not yet ranked"}</span
      >
    </div>
  </div>
{/if}

<style lang="scss">
  .cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .version {
    margin-top: 1rem;
  }

  .version__old {
    color: #ee4e1d;
    text-decoration: underline;
  }

  .version__new {
    color: #72b2b6;
    text-decoration: underline;
    font-weight: bold;
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

  .card[data-warning="true"] {
    border: 2px solid #ee4e1d;
  }

  .outdated {
    border: 2px solid #ee4e1d;
    padding: 0.5rem;
    border-radius: 0.5rem;
    margin-left: 0.5rem;
    // float: right;
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
