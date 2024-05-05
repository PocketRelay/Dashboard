<script lang="ts">
  import { isAdmin, player } from "$lib/api/api";
  import { MAX_WEAPON_MOD_LEVEL, WEAPON_MODS } from "$lib/data/weapon_mods";
  import InventoryList from "./InventoryList.svelte";
  import LevelInput from "./LevelInput.svelte";

  // Inventory values array
  export let inventory: number[];
</script>

<InventoryList tabs={WEAPON_MODS} let:selected>
  {#each selected.values as weaponMod}
    <div class="card inv-card">
      <img
        src={`/assets/weapon_mods/${weaponMod.image}`}
        alt={weaponMod.name}
        width={160}
        height={120}
      />

      <div class="inv-card__value">
        <h2>{weaponMod.name}</h2>
        <span class="annot">
          {inventory[weaponMod.level_index]}
        </span>

        {#if isAdmin($player)}
          <LevelInput
            bind:value={inventory[weaponMod.level_index]}
            min={0}
            max={MAX_WEAPON_MOD_LEVEL}
          />
        {/if}
      </div>
    </div>
  {/each}
</InventoryList>
