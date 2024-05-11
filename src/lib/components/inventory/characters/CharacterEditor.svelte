<script lang="ts">
  import { type PlayerCharacter, type PlayerData } from "$lib/data/parser";
  import { MAX_CHARACTER_LEVEL } from "$lib/data/inventory";
  import LevelInput from "$lib/components/inventory/LevelInput.svelte";
  import InventoryCharacterPowerLevel from "./power/PowerLevelDisplay.svelte";
  import InventoryCharacterPowerEditor from "./power/PowerEditor.svelte";
  import WeaponEditor from "./weapon/WeaponEditor.svelte";

  export let playerData: PlayerData;
  export let playerCharacter: PlayerCharacter;
  export let editable: boolean;

  // Level of the character
  $: characterLevel =
    playerData.base.inventory[playerCharacter.character.index] ?? 0;
</script>

<div class="character">
  <div class="character__head">
    <div class="character__left">
      <img
        class="character__icon"
        src={`/assets/characters/${playerCharacter.character.image}`}
        alt={playerCharacter.character.name}
        width={140}
        height={280}
      />
      <div class="character__details">
        <h2>Level {characterLevel}</h2>
        <p>
          {playerCharacter.character.name} - {playerCharacter.characterName}
        </p>

        {#if editable}
          <div class="input">
            <span class="input__label">Level</span>
            <LevelInput
              bind:value={playerData.base.inventory[
                playerCharacter.character.index
              ]}
              min={0}
              max={MAX_CHARACTER_LEVEL}
            />
          </div>
        {/if}

        <WeaponEditor bind:playerData bind:playerCharacter {editable} />
      </div>
    </div>

    <div class="character__power-levels">
      {#each playerCharacter.powers as power}
        {#if power.power !== undefined}
          <InventoryCharacterPowerLevel powerData={power} />
        {/if}
      {/each}
    </div>
  </div>
</div>

<div>
  {#each playerCharacter.powers as power}
    {#if power.power !== undefined}
      <InventoryCharacterPowerEditor
        bind:powerData={power}
        bind:playerData
        {editable}
      />
    {/if}
  {/each}
</div>

<style lang="scss">
  .character__head {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .character__left {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .character {
    display: flex;
    gap: 1rem;
    align-items: center;
    border: 1px solid #444;
    padding: 1rem;
    border-radius: 0.25rem;

    &__icon {
      width: auto;
      height: 280px;
      margin-right: 1rem;
      padding: 0 2rem 0 1rem;
      border-right: 1px solid #444;
    }

    &__details {
      display: flex;
      flex-flow: column;
      gap: 1rem;
    }
  }
</style>
