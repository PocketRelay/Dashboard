<script lang="ts">
  import { isAdmin, player } from "$lib/api/api";
  import { CONSUMABLES, MAX_GEAR_LEVEL } from "$lib/data/consumables";
  import InventoryList from "./InventoryList.svelte";
  import LevelInput from "./LevelInput.svelte";

  // Inventory values array
  export let inventory: number[];

  // Names of the different tier levels for consumables
  const TIER_NAMES: string[] = ["I", "II", "III", "IV", "V"];
</script>

<InventoryList tabs={CONSUMABLES} let:selected>
  {#each selected.values as consumable}
    <div class="card inv-card">
      <img
        src={`/assets/consumables/${consumable.image}`}
        alt={consumable.name}
        width={160}
        height={120}
      />

      <div class="inv-card__value">
        <h2>{consumable.name}</h2>
        {#each consumable.indexes as index, i}
          <div class="tier">
            <h3 class="tier__name">{TIER_NAMES[i]}</h3>

            {#if isAdmin($player)}
              <LevelInput
                bind:value={inventory[index]}
                min={0}
                max={MAX_GEAR_LEVEL}
              />
            {:else}
              <span class="annot">{inventory[index]}</span>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  {/each}
</InventoryList>

<style lang="scss">
  .tier {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .tier__name {
    width: 2rem;
  }
</style>
