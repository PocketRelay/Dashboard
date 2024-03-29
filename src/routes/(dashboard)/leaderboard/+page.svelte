<script lang="ts">
  import {
    getLeaderboard,
    LeaderboardName,
    type LeaderboardEntry,
  } from "$lib/api/leaderboard";
  import DashboardPage from "$lib/components/DashboardPage.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import QueryPagination from "$lib/components/QueryPagination.svelte";
  import { getNumberWithOrdinal } from "$lib/tools/numbers";

  let loading: boolean = true;
  let error: string | null = null;

  // The current entries list
  let entries: LeaderboardEntry[] = [];
  // Whether there are more entries at the next offset
  let more: boolean = false;

  // The selected leaderboard name
  let selected: LeaderboardName = LeaderboardName.N7Rating;

  // Query parameters
  let count: number = 20;
  let offset: number = 0;

  /**
   * Loads the leaderboard for the provided name at the provided
   * offset and loads the provided number of entries
   *
   * Handles errors and loading state
   *
   * @param name   The name of the leaderboard to query
   * @param offset The offset to query
   * @param count  The number of entries to query for
   */
  async function load(name: LeaderboardName, offset: number, count: number) {
    loading = true;
    error = null;

    try {
      let response = await getLeaderboard(name, offset, count);
      entries = response.entries;
      more = response.more;
    } catch (e) {
      let err = e as Error;
      console.error(err);
      error = err.message;
    } finally {
      loading = false;
    }
  }

  /**
   * Refreshes the current leaderboard query to get the
   * up-to-date rankings
   */
  function refresh() {
    load(selected, offset, count);
  }

  $: load(selected, offset, count);
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
        <p class="text text--wrapped">
          This leaderboard is ranked based on your total class levels and
          promotions combined
        </p>
      </button>

      <button
        class="name card"
        class:name--selected={selected == LeaderboardName.ChallengePoints}
        on:click={() => (selected = LeaderboardName.ChallengePoints)}
      >
        <h2 class="name__title">Challenge Points</h2>
        <p class="text text--wrapped">
          This leaderboard is ranked based on the amount challenge points you’ve
          gained from completing challenges
        </p>
      </button>
    </div>

    <QueryPagination bind:count bind:offset {more} on:refresh={refresh} />

    {#if error}
      <p class="error">{error}</p>
    {/if}
  </svelte:fragment>

  <table class="table">
    {#if loading}
      <Loader />
    {/if}
    <thead class="table__head">
      <tr>
        <th>Rank</th>
        <th>Name</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody class="table__body">
      {#each entries as entry}
        <tr class="table__entry">
          <td class="annot">{getNumberWithOrdinal(entry.rank)}</td>
          <td>{entry.player_name}</td>
          <td class="annot">{entry.value}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</DashboardPage>

<style lang="scss">
  .names {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 1rem;
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

  .name--selected .text {
    color: #ececec;
  }
</style>
