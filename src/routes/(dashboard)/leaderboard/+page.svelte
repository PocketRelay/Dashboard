<script lang="ts">
  import { getLeaderboard, LeaderboardName } from "$lib/api/leaderboard";
  import Loader from "$lib/components/Loader.svelte";
  import PageHeading from "$lib/components/PageHeading.svelte";
  import Pagination from "$lib/components/Pagination.svelte";
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

<PageHeading
  title="Leaderboard"
  text="Click a leaderboard category to show results based on that leaderboard"
/>

<div class="names">
  <button
    class="name card"
    class:name--selected={$selected == LeaderboardName.N7Rating}
    on:click={onSelectCategory(LeaderboardName.N7Rating)}
  >
    <h2 class="name__title">N7 Rating</h2>
    <p class="text text--wrapped">
      This leaderboard is ranked based on your total class levels and promotions
      combined
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

{#if $query.error}
  <p class="error">{$query.error}</p>
{/if}

<div class="table-container">
  <div class="table-pagination">
    <Pagination
      count={$query.data?.total ?? 0}
      bind:perPage={$perPage}
      bind:page={$page}
    />
  </div>

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
  <div class="table-pagination">
    <Pagination
      count={$query.data?.total ?? 0}
      bind:perPage={$perPage}
      bind:page={$page}
    />
  </div>
</div>

<style lang="scss">
  .names {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
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
