<script lang="ts">
  import { UNSAFE_MAX } from "$lib/data/inventory";

  // The value to bind to
  export let value: number;

  // The minimum value to allow
  export let min: number;

  // The maximum value to allow
  export let max: number;

  // Whether to allow the unsafe got mode
  export let allowUnsafe: boolean = false;

  $: {
    // Prevent the input from changing the value to above the unsafe max
    if (value > UNSAFE_MAX) value = UNSAFE_MAX;
    if (!allowUnsafe && value > max) value = max;
    if (value == null) value = min;
  }
</script>

<div class="level-input">
  <button
    class="level-input__button level-input__button--min"
    on:click={() => (value = min)}
  >
    Min
  </button>
  <input class="level-input__value" type="number" bind:value {min} {max} />
  <button class="level-input__button" on:click={() => (value = max)}>
    Max
  </button>
  {#if allowUnsafe}
    <button
      class="level-input__button level-input__button--max"
      on:click={() => (value = UNSAFE_MAX)}
    >
      GOD
    </button>
  {/if}
</div>

<style>
  .level-input__button,
  .level-input__value {
    background-color: #333;
    border: none;
    border: 1px solid #444;
    border-left: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    padding: 0.75rem;
    height: 2rem;
    cursor: pointer;

    &[data-selected] {
      background-color: #444;
    }

    &:disabled {
      cursor: not-allowed;
    }

    &:nth-child(1) {
      border-top-left-radius: 0.25rem;
      border-bottom-left-radius: 0.25rem;
      border-left: 1px solid #444;
    }

    &:nth-last-child(1) {
      border-top-right-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
    }
  }

  .level-input__value {
    background-color: #222;
  }

  .level-input {
    display: flex;
    flex-flow: row;
  }
</style>
