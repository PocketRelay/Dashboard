<script lang="ts">
  import { isAdmin, player } from "$lib/api/api";
  import { CHARACTER_CLASSES, MAX_CHARACTER_LEVEL } from "$lib/data/characters";
  import InventoryList from "./InventoryList.svelte";
  import LevelInput from "./LevelInput.svelte";

  // Inventory values array
  export let inventory: number[];
</script>

<InventoryList tabs={CHARACTER_CLASSES} let:selected>
  {#each selected.values as character}
    <div class="card inv-card">
      <img
        src={`/assets/characters/${character.image}`}
        alt={character.name}
        width={140}
        height={280}
      />

      <div class="inv-card__value">
        <h2>{character.name}</h2>
        <span class="annot">
          {inventory[character.index]}
        </span>

        {#if isAdmin($player)}
          <LevelInput
            bind:value={inventory[character.index]}
            min={0}
            max={MAX_CHARACTER_LEVEL}
          />
        {/if}
      </div>
    </div>
  {/each}
</InventoryList>
