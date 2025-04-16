<script lang="ts">
  import { Pagination } from "bits-ui";
  import PhCaretRightBold from "~icons/ph/caret-right-bold";
  import PhCaretLeftBold from "~icons/ph/caret-left-bold";

  // The pagination amount
  export let perPage: number;
  // The current offset
  export let page: number;
  // The total number of items
  export let count: number = 0;
</script>

<!-- Pagination buttons -->
<Pagination.Root
  count={count < 1 ? 1 : count}
  bind:page
  {perPage}
  let:pages
  let:range
>
  <!-- Pagination count selector -->
  <select bind:value={perPage} data-pagination-per-page-button>
    <option value={5}>5</option>
    <option value={10} selected>10</option>
    <option value={20}>20</option>
    <option value={30}>30</option>
    <option value={50}>50</option>
  </select>

  <Pagination.PrevButton>
    <PhCaretLeftBold width="1rem" height="1rem" />
  </Pagination.PrevButton>
  <div class="pagination-pages">
    {#each pages as page (page.key)}
      {#if page.type === "ellipsis"}
        <div data-pagination-page>...</div>
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
</Pagination.Root>
