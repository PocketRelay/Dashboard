<script lang="ts">
  import { isAdmin, player } from "$lib/api/api";
  import {
    CORE_CONSUMABLES,
    GEAR_CONSUMABLES,
    MAX_GEAR_LEVEL,
    OTHER_CONSUMABLES,
  } from "$lib/data/consumables";
  import InventoryList from "./InventoryList.svelte";
  import LevelInput from "./LevelInput.svelte";

  // Inventory values array
  export let inventory: number[];

  interface Tab {
    name: string;
  }

  // Tab values for the gear types
  const TABS: Tab[] = [{ name: "Gear" }, { name: "Core" }, { name: "Other" }];
</script>

<InventoryList tabs={TABS} let:selected>
  {#if selected.name == "Gear"}
    {#each GEAR_CONSUMABLES as consumable}
      <div class="card inv-card" title={consumable.text}>
        <img
          src={`/assets/gear/${consumable.image}`}
          alt={consumable.name}
          width={160}
          height={120}
        />

        <div class="inv-card__value">
          <h2>{consumable.name}</h2>

          {#if isAdmin($player)}
            <LevelInput
              bind:value={inventory[consumable.index]}
              min={0}
              max={MAX_GEAR_LEVEL}
            />
          {:else}
            <span class="annot">
              {inventory[consumable.index]}
            </span>
          {/if}
        </div>
      </div>
    {/each}
  {:else if selected.name == "Core"}
    {#each CORE_CONSUMABLES as consumable}
      <div class="card inv-card" title={consumable.text}>
        <img
          src={`/assets/consumables/${consumable.stock_image}`}
          alt={consumable.name}
          width={160}
          height={120}
        />

        <div class="inv-card__value">
          <h2>{consumable.name}</h2>
          <h3>Stock</h3>

          {#if isAdmin($player)}
            <LevelInput
              bind:value={inventory[consumable.stock_index]}
              min={0}
              max={MAX_GEAR_LEVEL}
            />
          {:else}
            <span class="annot">
              {inventory[consumable.stock_index]}
            </span>
          {/if}

          <h3>Capacity</h3>

          {#if isAdmin($player)}
            <LevelInput
              bind:value={inventory[consumable.capacity_index]}
              min={0}
              max={MAX_GEAR_LEVEL}
            />
          {:else}
            <span class="annot">
              {inventory[consumable.capacity_index]}
            </span>
          {/if}
        </div>
      </div>
    {/each}
  {:else if selected.name == "Other"}
    {#each OTHER_CONSUMABLES as consumable}
      <div class="card inv-card">
        <img
          src={`/assets/consumables/${consumable.image}`}
          alt={consumable.name}
          width={160}
          height={120}
        />

        <div class="inv-card__value">
          <h2>{consumable.name}</h2>

          {#if isAdmin($player)}
            <LevelInput
              bind:value={inventory[consumable.index]}
              min={0}
              max={MAX_GEAR_LEVEL}
            />
          {:else}
            <span class="annot">
              {inventory[consumable.index]}
            </span>
          {/if}
        </div>
      </div>
    {/each}}
  {/if}
</InventoryList>
