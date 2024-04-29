<script lang="ts">
  import {
    getPlayerCharacters,
    type PlayerClass,
    type PlayerData,
  } from "$lib/api/parser";

  import { Tabs } from "bits-ui";
  import InventoryClassDetails from "./InventoryClassDetails.svelte";
  import InventoryCharacterDetails from "./InventoryCharacterDetails.svelte";

  export let playerData: PlayerData;
  export let playerClass: PlayerClass;

  const filteredCharacters = playerData.characters.filter(
    (char) => char.character.className === playerClass.name
  );
</script>

<Tabs.Root>
  <Tabs.List class="character-tabs">
    {#each filteredCharacters as character}
      <Tabs.Trigger value={character.kitName} class="character-tab">
        <img
          src={`/assets/characters/${character.character.image}`}
          alt={character.character.name}
          width={140}
          height={280}
        />

        {character.character.name}
      </Tabs.Trigger>
    {/each}
  </Tabs.List>
  {#each filteredCharacters as character}
    <Tabs.Content value={character.kitName}>
      <InventoryCharacterDetails
        bind:playerData
        bind:playerCharacter={character}
      />
    </Tabs.Content>
  {/each}
</Tabs.Root>

<style lang="scss">
  :global(.character-tabs) {
    flex-flow: nowrap;
    display: flex;
    overflow-x: auto;
    padding: 1rem 0;
    border-bottom: 1px solid #333;
    border-top: 1px solid #333;
    margin: 1rem 0;
  }

  :global(.character-tab) {
    display: flex;
    flex-flow: column;
    border: none;
    background-color: transparent;
    text-align: center;
    color: white;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border: 1px solid transparent;
  }

  :global(.character-tab[data-state="active"]) {
    background-color: #222;
    border: 1px solid #333;
    border-radius: 0.25rem;
  }
</style>
