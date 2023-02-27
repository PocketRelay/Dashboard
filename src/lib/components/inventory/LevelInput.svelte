<script lang="ts">
    import { UNSAFE_MAX } from "$lib/data/inventory";

    // Whether to use the slim layout which displays the whole
    // input selection on the same row
    export let slim: boolean = false;

    // The value to bind to
    export let value: number;

    // The minimum value to allow
    export let min: number;

    // The maximum value to allow
    export let max: number;

    $: {
        // Prevent the input from changing the value to above the unsafe max
        if (value > UNSAFE_MAX) value = UNSAFE_MAX;
    }
</script>

<div class="wrapper" class:wrapper--slim={slim}>
    <label class="input">
        <input class="input__value" type="number" bind:value {min} {max} />
    </label>

    <div class="actions">
        <button class="button action" on:click={() => (value = min)}>
            Min
        </button>
        <button class="button action" on:click={() => (value = max)}>
            Max
        </button>
        <button class="button action" on:click={() => (value = UNSAFE_MAX)}>
            GOD
        </button>
    </div>
</div>

<style>
    .wrapper {
        display: flex;
        flex-flow: column;
        gap: 0.5rem;
    }

    .wrapper--slim {
        flex-flow: row;
    }

    .wrapper--slim .input__value {
        max-width: 4rem;
        padding: 0.5rem;
        font-size: 1rem;
    }

    .actions {
        display: flex;
        flex-flow: row;
        gap: 0.5rem;
    }

    .action {
        padding: 0.5rem;
        flex: auto;
        background-color: #272727;
    }

    .action:hover {
        background-color: #3f3f3f;
    }
</style>
