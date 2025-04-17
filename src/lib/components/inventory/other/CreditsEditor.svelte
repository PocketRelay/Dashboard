<script lang="ts">
  import { type PlayerData } from "$lib/data/parser";
  import { Tooltip } from "bits-ui";

  export let playerData: PlayerData;
  export let editable: boolean;
</script>

<Tooltip.Root>
  <Tooltip.Trigger>
    <div class="weapon">
      <div class="weapon__head">
        <p>Credits</p>
        <span class="weapon__level">{playerData.base.credits}</span>
      </div>
      {#if editable}
        <div>
          <input
            class="level-input"
            type="number"
            bind:value={playerData.base.credits}
            required
            min={0}
            max={Number.MAX_SAFE_INTEGER}
          />
        </div>
      {/if}
    </div>
  </Tooltip.Trigger>
</Tooltip.Root>

<style lang="scss">
  .level-input {
    background-color: #222;
    width: 100%;
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
    border-radius: 0.25rem;

    &:disabled {
      cursor: not-allowed;
    }
  }

  .weapon {
    display: flex;
    flex-flow: column;
    gap: 1rem;

    border: 1px solid #444;
    padding: 1rem;
    border-radius: 0.25rem;
    color: white;
    text-align: left;

    &__level {
      border: 1px solid #444;
      font-size: 0.8rem;
      padding: 0.5rem 0.75rem;
      border-radius: 0.25rem;
    }

    &__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
</style>
