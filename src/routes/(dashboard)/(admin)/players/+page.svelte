<script lang="ts">
  import { base } from "$app/paths";
  import { isPlayerEditable, player } from "$lib/api/api";
  import { getPlayers, type PlayerAccount } from "$lib/api/players";
  import DashboardPage from "$lib/components/DashboardPage.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import QueryPagination from "$lib/components/QueryPagination.svelte";
  import { createQuery } from "@tanstack/svelte-query";
  import { writable, type Writable, derived } from "svelte/store";

  // Query parameters
  let perPage: Writable<number> = writable(20);
  let page: Writable<number> = writable(1);

  const query = createQuery(
    derived([page, perPage], ([$page, $perPage]) => ({
      queryKey: ["players", $page, $perPage],
      queryFn: () => getPlayers($page - 1, $perPage),
    }))
  );

  /**
   * Refreshes the current players query to get the
   * up-to-date players list
   */
  function refresh() {
    $query.refetch();
  }
</script>

<DashboardPage
  title="Players"
  text="Below is a list of player accounts on this server"
>
  <svelte:fragment slot="heading">
    <QueryPagination
      count={$query.data?.total_items ?? 0}
      bind:perPage={$perPage}
      bind:page={$page}
      on:refresh={refresh}
    />
  </svelte:fragment>

  {#if $query.isLoading}
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
      {#if $query.data}
        {#each $query.data.players as entry}
          <tr class="table__entry">
            <td>{entry.display_name}</td>
            <td>{entry.email}</td>
            <td>{entry.role}</td>
            <td>
              {#if isPlayerEditable($player, entry)}
                <a class="button" href={`${base}/players/${entry.id}`}>
                  View
                </a>
              {/if}
            </td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</DashboardPage>
