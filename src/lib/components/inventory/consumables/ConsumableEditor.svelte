<script lang="ts">
  import { type PlayerData } from "$lib/api/parser";
  import { Tooltip } from "bits-ui";
  import type { TieredConsumable } from "$lib/data/consumables";
  import ConsumableTierEditor from "./ConsumableTierEditor.svelte";

  export let playerData: PlayerData;
  export let consumable: TieredConsumable;
  export let editable: boolean;
</script>

<Tooltip.Root>
  <Tooltip.Trigger>
    <div class="weapon">
      <img
        class="weapon__icon"
        src={`/assets/consumables/${consumable.image}`}
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
        <div class="tiers">
          {#each consumable.indexes as index, tier}
            <ConsumableTierEditor bind:playerData {editable} {index} {tier} />
          {/each}
        </div>
      </div>
    </div>
  </Tooltip.Trigger>
</Tooltip.Root>

<style lang="scss">
  .tiers {
    display: flex;
    flex-flow: column;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  .weapon {
    display: flex;
    flex-flow: column;

    border: 1px solid #444;
    padding: 1rem;
    border-radius: 0.25rem;
    color: white;
    text-align: left;

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
      gap: 0.25rem;

      &__head {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
</style>
