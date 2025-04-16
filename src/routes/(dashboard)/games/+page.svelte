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
      <p>No games found</p>
    {/if}
  {/if}
</div>

<style lang="scss">
  .games {
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    gap: 1rem;
  }
</style>
