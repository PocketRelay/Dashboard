<script lang="ts">
  import { base } from "$app/paths";
  import { isPlayerEditable, player } from "$lib/api/api";
  import { getPlayers, type PlayerAccount } from "$lib/api/players";
  import DashboardPage from "$lib/components/DashboardPage.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import QueryPagination from "$lib/components/QueryPagination.svelte";

  let loading = true;
  let error: string | null = null;

  // The current entries list
  let entries: PlayerAccount[] = [];
  // Whether there are more entries at the next offset
  let more: boolean = false;

  // Query parameters
  let count: number = 20;
  let offset: number = 0;

  /**
   * Loads the players list at the provided offset
   * and loads the provided number of entries
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
      let response = await getPlayers(offset, count);
      entries = response.players;
      more = response.more;
    } catch (e) {
      let err = e as Error;
      console.error("Failed to load players list", err);
      error = err.message;
    } finally {
      loading = false;
    }
  }

  /**
   * Refreshes the current players query to get the
   * up-to-date players list
   */
  function refresh() {
    load(offset, count);
  }

  $: load(offset, count);
</script>

<DashboardPage
  title="Players"
  text="Below is a list of player accounts on this server"
>
  <svelte:fragment slot="heading">
    <QueryPagination bind:count bind:offset {more} on:refresh={refresh} />
  </svelte:fragment>

  {#if loading}
    <Loader />
  {/if}

  <table class="table">
    <thead class="table__head">
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>View</th>
      </tr>
    </thead>
    <tbody class="table__body">
      {#each entries as entry}
        <tr class="table__entry">
          <td>{entry.display_name}</td>
          <td>{entry.email}</td>
          <td>{entry.role}</td>
          <td>
            {#if isPlayerEditable($player, entry)}
              <a class="button" href={`${base}/players/${entry.id}`}> View </a>
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</DashboardPage>
