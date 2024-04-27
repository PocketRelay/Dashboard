<script lang="ts">
  import { getLeaderboard, LeaderboardName } from "$lib/api/leaderboard";
  import DashboardPage from "$lib/components/DashboardPage.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import QueryPagination from "$lib/components/QueryPagination.svelte";
  import { getNumberWithOrdinal } from "$lib/tools/numbers";
  import { createQuery } from "@tanstack/svelte-query";
  import { writable, type Writable, derived } from "svelte/store";

  // The selected leaderboard name
  let selected: Writable<LeaderboardName> = writable(LeaderboardName.N7Rating);

  // Query parameters
  let perPage: Writable<number> = writable(20);
  let page: Writable<number> = writable(1);

  const query = createQuery(
    derived([selected, page, perPage], ([$selected, $page, $perPage]) => ({
      queryKey: ["leaderboard", $selected, $page, $perPage],
      queryFn: () => getLeaderboard($selected, $page - 1, $perPage),
    }))
  );

  function onSelectCategory(name: LeaderboardName) {
    return () => {
      $selected = name;
      $page = 1;
    };
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
        class:name--selected={$selected == LeaderboardName.N7Rating}
        on:click={onSelectCategory(LeaderboardName.N7Rating)}
      >
        <h2 class="name__title">N7 Rating</h2>
        <p class="text text--wrapped">
          This leaderboard is ranked based on your total class levels and
          promotions combined
        </p>
      </button>

      <button
        class="name card"
        class:name--selected={$selected == LeaderboardName.ChallengePoints}
        on:click={onSelectCategory(LeaderboardName.ChallengePoints)}
      >
        <h2 class="name__title">Challenge Points</h2>
        <p class="text text--wrapped">
          This leaderboard is ranked based on the amount challenge points you’ve
          gained from completing challenges
        </p>
      </button>
    </div>

    <QueryPagination
      count={$query.data?.total ?? 0}
      bind:perPage={$perPage}
      bind:page={$page}
      on:refresh={() => $query.refetch()}
    />

    {#if $query.error}
      <p class="error">{$query.error}</p>
    {/if}
  </svelte:fragment>

  <table class="table">
    {#if $query.isLoading}
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
      {#if $query.data}
        {#each $query.data.entries as entry}
          <tr class="table__entry">
            <td class="annot">{getNumberWithOrdinal(entry.rank)}</td>
            <td>{entry.player_name}</td>
            <td class="annot">{entry.value}</td>
          </tr>
        {/each}
      {/if}
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
