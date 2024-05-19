<script lang="ts">
  import { getLeaderboard, LeaderboardName } from "$lib/api/leaderboard";
  import Loader from "$lib/components/Loader.svelte";
  import PageHeading from "$lib/components/PageHeading.svelte";
  import { getNumberWithOrdinal } from "$lib/tools/numbers";
  import { createQuery } from "@tanstack/svelte-query";

  const query = createQuery({
    queryKey: ["leaderboard-public-n7"],
    queryFn: () => getLeaderboard(LeaderboardName.N7Rating, 0, 20),
  });
</script>

<div class="leaderboard">
  <PageHeading title="Leaderboard" text="N7 Rating" />

  {#if $query.error}
    <p class="error">{$query.error}</p>
  {/if}

  <div class="table-container">
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
  </div>
</div>

<style lang="scss">
  .leaderboard {
    padding: 1rem;
  }
</style>
