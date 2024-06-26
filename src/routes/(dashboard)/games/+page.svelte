<script lang="ts">
  import { getGames } from "$lib/api/games";
  import GameComponent from "$lib/components/GameComponent.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import PageHeading from "$lib/components/PageHeading.svelte";
  import Pagination from "$lib/components/Pagination.svelte";
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
</script>

<PageHeading
  title="Games"
  text="Below is a list of games that are currently running"
/>

{#if $query.data}
  <div>
    <div class="total">
      {#if $query.data.total_items == 0}
        No games are running
      {:else}
        There is {$query.data.total_items} games running
      {/if}
    </div>
  </div>
{/if}

<Pagination
  count={$query.data?.total_items ?? 1}
  bind:perPage={$perPage}
  bind:page={$page}
/>

{#if $query.error}
  <p class="error">{$query.error}</p>
{/if}

<div class="games">
  {#if $query.isLoading}
    <Loader />
  {:else if $query.data}
    {#if $query.data.games.length > 0}
      {#each $query.data.games as game}
        <GameComponent {game} />
      {/each}
    {:else}
      <p class="no-games">No games found</p>
    {/if}
  {/if}
</div>

<style lang="scss">
  .games {
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    gap: 1rem;
    margin-top: 1rem;
  }

  .no-games {
    margin: 1rem 0;
  }

  .total {
    display: inline-block;
    margin-bottom: 1rem;

    border: 1px solid #444;
    align-items: center;
    justify-content: center;
    background-color: #222;
    color: #ffffff;
    padding: 0.75rem;

    border-radius: 0.25rem;
  }
</style>
