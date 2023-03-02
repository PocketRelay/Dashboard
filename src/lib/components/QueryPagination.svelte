<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Refresh from "svelte-material-icons/Refresh.svelte";

    // The pagination amount
    export let count: number;
    // The current offset
    export let offset: number;
    // Whether there are more entires at the next offset
    export let more: boolean;

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
    <!-- Back page button -->
    <button
        class="button button--dark"
        disabled={offset == 0}
        on:click={() => (offset -= 1)}
    >
        Previous
    </button>
    <!-- Pagination count selector -->
    <select class="select" bind:value={count}>
        <option value={5}>5</option>
        <option value={10} selected>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
        <option value={50}>50</option>
    </select>
    <!-- Next page button -->
    <button
        class="button button--dark"
        disabled={!more}
        on:click={() => (offset += 1)}
    >
        Next
    </button>
</div>
