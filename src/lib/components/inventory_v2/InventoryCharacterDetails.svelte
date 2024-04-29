<script lang="ts">
  import {
    getPlayerCharacters,
    type PlayerCharacter,
    type PlayerClass,
    type PlayerData,
  } from "$lib/api/parser";
  import { isAdmin, player } from "$lib/api/api";
  import { MAX_CHARACTER_LEVEL } from "$lib/data/inventory";
  import { Tabs } from "bits-ui";
  import InventoryClassDetails from "./InventoryClassDetails.svelte";
  import LevelInput from "$lib/components/inventory/LevelInput.svelte";

  export let playerData: PlayerData;
  export let playerCharacter: PlayerCharacter;

  // Level of the character
  $: characterLevel =
    playerData.base.inventory[playerCharacter.character.index] ?? 0;
</script>

<div class="character">
  <img
    class="character__icon"
    src={`/assets/characters/${playerCharacter.character.image}`}
    alt={playerCharacter.character.name}
    width={140}
    height={280}
  />
  <div class="character__details">
    <h2>Level {characterLevel}</h2>
    <p>{playerCharacter.character.name} - {playerCharacter.characterName}</p>

    {#if isAdmin($player)}
      <label class="input">
        <span class="input__label">Level</span>
        <LevelInput
          bind:value={playerData.base.inventory[
            playerCharacter.character.index
          ]}
          min={0}
          max={MAX_CHARACTER_LEVEL}
        />
      </label>
    {/if}
  </div>
</div>

<style lang="scss">
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
