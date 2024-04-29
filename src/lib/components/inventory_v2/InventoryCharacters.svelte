<script lang="ts">
  import {
    getPlayerCharacters,
    type PlayerClass,
    type PlayerData,
  } from "$lib/api/parser";

  import { Tabs } from "bits-ui";
  import InventoryClassDetails from "./InventoryClassDetails.svelte";
  import InventoryCharacterDetails from "./InventoryCharacterDetails.svelte";
  import PhCaretRightBold from "~icons/ph/caret-right-bold";
  import PhCaretLeftBold from "~icons/ph/caret-left-bold";

  export let playerData: PlayerData;
  export let playerClass: PlayerClass;

  const filteredCharacters = playerData.characters.filter(
    (char) => char.character.className === playerClass.name
  );

  let tabsContainer: HTMLDivElement | undefined;

  function doScrollLeft() {
    console.log("Trigger scroll");
    tabsContainer?.scrollBy({ left: -300, behavior: "smooth" });
  }

  function doScrollRight() {
    tabsContainer?.scrollBy({ left: 300, behavior: "smooth" });
  }
</script>

<Tabs.Root>
  <div class="character-tabs-container">
    <button
      type="button"
      class="scroll-btn scroll-btn--left"
      on:click={doScrollLeft}
    >
      <PhCaretLeftBold width="1em" height="1em" />
    </button>
    <Tabs.List class="character-tabs" bind:el={tabsContainer}>
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
    <button
      type="button"
      class="scroll-btn scroll-btn--right"
      on:click={doScrollRight}
    >
      <PhCaretRightBold width="1em" height="1em" />
    </button>
  </div>

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
  .character-tabs-container {
    position: relative;
  }

  .scroll-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    font-size: 1.5rem;
    background-color: #555;
    border: 1px solid #666;
    border-radius: 1rem;
    line-height: 0;
    color: #fff;
    padding: 0.25rem;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    margin: 0 0.5rem;

    &--left {
      left: 0;
    }

    &--right {
      right: 0;
    }
  }

  :global(.character-tabs) {
    position: relative;
    flex-flow: nowrap;
    display: flex;
    overflow-x: auto;
    padding: 1rem 0;
    border-bottom: 1px solid #333;
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
