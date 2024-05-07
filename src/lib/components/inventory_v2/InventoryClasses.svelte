<script lang="ts">
  import type { PlayerData } from "$lib/api/parser";

  import { Tabs } from "bits-ui";
  import InventoryClassDetails from "./InventoryClassDetails.svelte";
  import InventoryCharacters from "./characters/InventoryCharacters.svelte";

  export let playerData: PlayerData;
  export let editable: boolean;
</script>

<Tabs.Root>
  <Tabs.List class="class-tabs">
    {#each playerData.classes as playerClass}
      <Tabs.Trigger value={playerClass.name} class="class-tab">
        {playerClass.name}
      </Tabs.Trigger>
    {/each}
  </Tabs.List>
  {#each playerData.classes as playerClass}
    <Tabs.Content value={playerClass.name}>
      <InventoryClassDetails bind:playerClass />
      <InventoryCharacters {playerClass} bind:playerData {editable} />
    </Tabs.Content>
  {/each}
</Tabs.Root>

<style lang="scss">
  :global(.class-tabs) {
    position: relative;

    display: flex;
    padding: 1rem 0;
    border-bottom: 1px solid #333;
    margin: 1rem 0;
  }

  :global(.class-tab) {
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

  :global(.class-tab[data-state="active"]) {
    background-color: #222;
    border: 1px solid #333;
    border-radius: 0.25rem;
  }
</style>
