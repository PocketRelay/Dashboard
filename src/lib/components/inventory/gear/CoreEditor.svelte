<script lang="ts">
  import { type PlayerData } from "$lib/data/parser";
  import LevelInput from "$lib/components/inventory/LevelInput.svelte";
  import { Tooltip } from "bits-ui";
  import { MAX_GEAR_LEVEL, type CoreConsumable } from "$lib/data/consumables";

  export let playerData: PlayerData;
  export let consumable: CoreConsumable;
  export let editable: boolean;

  // Available in stock
  $: stock = playerData.base.inventory[consumable.stock_index] ?? 0;
  // Available capacity in-game
  $: capacity = playerData.base.inventory[consumable.capacity_index] ?? 0;
</script>

<Tooltip.Root>
  <Tooltip.Trigger>
    <div class="weapon">
      <img
        class="weapon__icon"
        src={`/assets/consumables/${consumable.stock_image}`}
        alt={consumable.name}
        width={160}
        height={120}
      />
      <div class="weapon__details">
        <div class="weapon__details__head">
          <p>
            {consumable.name}
          </p>
        </div>
        <div class="levels">
          <span class="weapon__level"> Stock {stock}</span>
          <span class="weapon__level"> Capacity {capacity}</span>
        </div>
        {#if editable}
          <div class="input">
            <span class="input__label">Stock</span>
            <LevelInput
              bind:value={playerData.base.inventory[consumable.stock_index]}
              min={0}
              max={MAX_GEAR_LEVEL}
              allowUnsafe
            />
          </div>
          <div class="input">
            <span class="input__label">Capacity</span>
            <LevelInput
              bind:value={playerData.base.inventory[consumable.capacity_index]}
              min={0}
              max={MAX_GEAR_LEVEL}
              allowUnsafe
            />
          </div>
        {/if}
      </div>
    </div>
  </Tooltip.Trigger>
</Tooltip.Root>

<style lang="scss">
  .levels {
    display: flex;
    gap: 0.5rem;
    margin: 0.25rem 0;
  }

  .weapon {
    display: flex;
    flex-flow: column;

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

    &__icon {
      width: auto;
      height: 120px;
      align-self: center;

      padding: 0 2rem 0 1rem;
      margin-bottom: 1rem;
    }

    &__details {
      padding-top: 1rem;
      border-top: 1px solid #444;
      display: flex;
      flex-flow: column;
      gap: 0.5rem;

      &__head {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
</style>
