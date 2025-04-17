<script lang="ts">
  import type { PlayerData } from "$lib/data/parser";

  import { Tabs } from "bits-ui";
  import InventoryClassDetails from "./InventoryClassDetails.svelte";
  import InventoryCharacters from "./characters/InventoryCharacters.svelte";

  export let playerData: PlayerData;
  export let editable: boolean;
</script>

<Tabs.Root let:value>
  <Tabs.List class="tabs">
    {#each playerData.classes as playerClass}
      <Tabs.Trigger value={playerClass.name} class="tab">
        {playerClass.name}
      </Tabs.Trigger>
    {/each}
  </Tabs.List>
  {#each playerData.classes as playerClass}
    <Tabs.Content value={playerClass.name}>
      {#if value === playerClass.name}
        <InventoryClassDetails bind:playerClass {editable} />
        <InventoryCharacters {playerClass} bind:playerData {editable} />
      {/if}
    </Tabs.Content>
  {/each}
</Tabs.Root>
