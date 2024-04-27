<script lang="ts">
  import { Pagination } from "bits-ui";
  import { createEventDispatcher } from "svelte";
  import Refresh from "~icons/ph/arrow-clockwise-bold";
  import PhCaretRightBold from "~icons/ph/caret-right-bold";
  import PhCaretLeftBold from "~icons/ph/caret-left-bold";

  // The pagination amount
  export let perPage: number;
  // The current offset
  export let page: number;
  // The total number of items
  export let count: number = 0;

  interface Events {
    // Event to trigger the paginated data to be refreshed
    refresh: undefined;
  }

  let dispatch = createEventDispatcher<Events>();
</script>

<div class="button-group">
  <!-- Refresh button -->
  <button class=" button button--dark" on:click={() => dispatch("refresh")}>
    <Refresh width={24} height={24} />
  </button>

  <!-- Pagination count selector -->
  <select class="select" bind:value={perPage}>
    <option value={5}>5</option>
    <option value={10} selected>10</option>
    <option value={20}>20</option>
    <option value={30}>30</option>
    <option value={50}>50</option>
  </select>

  <!-- Pagination buttons -->
  <Pagination.Root {count} bind:page {perPage} let:pages let:range>
    <div class="pagination-container">
      <Pagination.PrevButton>
        <PhCaretLeftBold width="1rem" height="1rem" />
      </Pagination.PrevButton>
      <div class="pagination-pages">
        {#each pages as page (page.key)}
          {#if page.type === "ellipsis"}
            <div>...</div>
          {:else}
            <Pagination.Page {page}>
              {page.value}
            </Pagination.Page>
          {/if}
        {/each}
      </div>
      <Pagination.NextButton>
        <PhCaretRightBold width="1rem" height="1rem" />
      </Pagination.NextButton>
    </div>
    <p>
      Showing {range.start} - {range.end}
    </p>
  </Pagination.Root>
</div>
