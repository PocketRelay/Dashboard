<script lang="ts">
  import { getGames, type Game } from "$lib/api/games";
  import DashboardPage from "$lib/components/DashboardPage.svelte";
  import GameComponent from "$lib/components/GameComponent.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import QueryPagination from "$lib/components/QueryPagination.svelte";

  let loading: boolean = true;
  let error: string | null = null;

  // The current games list
  let games: Game[] = [];
  // Whether there are more entries at the next offset
  let more: boolean = false;

  // Query parameters
  let count: number = 10;
  let offset: number = 0;

  /**
   * Loads the games list for at the provided
   * offset and loads the provided number of entries
   *
   * Handles errors and loading state
   *
   * @param offset The offset to query
   * @param count  The number of entries to query for
   */
  async function load(offset: number, count: number) {
    loading = true;
    error = null;

    try {
      let response = await getGames(offset, count);
      games = response.games;
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
   * Refreshes the current games query to get the
   * up-to-date games list
   */
  function refresh() {
    load(offset, count);
  }

  $: load(offset, count);
</script>

<DashboardPage
  title="Games"
  text="Below is a list of games that are currently running"
>
  <svelte:fragment slot="heading">
    <QueryPagination bind:count bind:offset {more} on:refresh={refresh} />

    {#if error}
      <p class="error">{error}</p>
    {/if}
  </svelte:fragment>
  <div class="games">
    {#if loading}
      <Loader />
    {:else}
      {#each games as game}
        <GameComponent {game} />
      {/each}
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
