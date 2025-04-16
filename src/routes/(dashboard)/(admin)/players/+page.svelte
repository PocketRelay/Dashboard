<script lang="ts">
  import { base } from "$app/paths";
  import { isPlayerEditable, player } from "$lib/api/api";
  import { getPlayers } from "$lib/api/players";
  import Loader from "$lib/components/Loader.svelte";
  import PageHeading from "$lib/components/PageHeading.svelte";
  import Pagination from "$lib/components/Pagination.svelte";
  import { createQuery } from "@tanstack/svelte-query";
  import { writable, type Writable, derived } from "svelte/store";
  import Refresh from "~icons/ph/arrow-clockwise-bold";
  import ArrowSquareUpRight from "~icons/ph/arrow-square-up-right-fill";

  // Query parameters
  let perPage: Writable<number> = writable(20);
  let page: Writable<number> = writable(1);

  const query = createQuery(
    derived([page, perPage], ([$page, $perPage]) => ({
      queryKey: ["players", $page, $perPage],
      queryFn: () => getPlayers($page - 1, $perPage),
    }))
  );
</script>

<PageHeading
  title="Players"
  text="Below is a list of player accounts on this server"
/>

{#if $query.isLoading}
  <Loader />
{/if}

<div class="table-container">
  <div class="table-pagination">
    <Pagination
      count={$query.data?.total_items ?? 0}
      bind:perPage={$perPage}
      bind:page={$page}
    />
  </div>
  <table class="table">
    <thead class="table__head">
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody class="table__body">
      {#if $query.isLoading}
        <tr class="table__entry">
          <td colspan="4" class="table-item-center"></td>
        </tr>
      {:else if $query.isError}
        <tr class="table__entry">
          <td colspan="4" class="table-item-center">
            <p class="error">Failed to load players list: {$query.error}</p>
          </td>
        </tr>
      {:else if $query.data}
        {#each $query.data.players as entry}
          <tr class="table__entry">
            <td>
              <a class="name" href={`${base}/players/${entry.id}`}>
                {entry.display_name}
              </a>
            </td>
            <td>{entry.email}</td>
            <td>{entry.role}</td>
            <td>
              {#if isPlayerEditable($player, entry)}
                <a class="open-link" href={`${base}/players/${entry.id}`}>
                  <ArrowSquareUpRight width="2rem" height="2rem" />
                </a>
              {/if}
            </td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
  <div class="table-pagination">
    <Pagination
      count={$query.data?.total_items ?? 0}
      bind:perPage={$perPage}
      bind:page={$page}
    />
  </div>
</div>

<style lang="scss">
  .open-link {
    color: #999;

    &:hover {
      color: #fff;
    }
  }

  .name {
    color: #fff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
</style>
