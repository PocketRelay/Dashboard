<script lang="ts">
  import { getGames } from "$lib/api/games";
  import DashboardPage from "$lib/components/DashboardPage.svelte";
  import GameComponent from "$lib/components/GameComponent.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import QueryPagination from "$lib/components/QueryPagination.svelte";
  import { createQuery } from "@tanstack/svelte-query";
  import { writable, type Writable, derived } from "svelte/store";

  // Query parameters
  let perPage: Writable<number> = writable(20);
  let page: Writable<number> = writable(1);

  const query = createQuery(
    derived([page, perPage], ([$page, $perPage]) => ({
      queryKey: ["games", $page, $perPage],
      queryFn: () => getGames($page - 1, $perPage),
    }))
  );

  /**
   * Refreshes the current games query to get the
   * up-to-date games list
   */
  function refresh() {
    $query.refetch();
  }
</script>

<DashboardPage
  title="Games"
  text="Below is a list of games that are currently running"
>
  <svelte:fragment slot="heading">
    <QueryPagination
      count={$query.data?.total_items ?? 1}
      bind:perPage={$perPage}
      bind:page={$page}
      on:refresh={refresh}
    />

    {#if $query.error}
      <p class="error">{$query.error}</p>
    {/if}
  </svelte:fragment>
  <div class="games">
    {#if $query.isLoading}
      <Loader />
    {:else if $query.data}
      {#if $query.data.games.length > 0}
        {#each $query.data.games as game}
          <GameComponent {game} />
        {/each}
      {:else}
        <p>No games found</p>
      {/if}
    {/if}
  </div>
</DashboardPage>

<style lang="scss">
  .games {
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    gap: 1rem;
  }
</style>
