<script lang="ts">
  import type { PlayerData } from "$lib/api/parser";

  import { Tabs } from "bits-ui";
  import InventoryClassDetails from "./InventoryClassDetails.svelte";
  import InventoryCharacters from "./InventoryCharacters.svelte";

  export let playerData: PlayerData;
</script>

<Tabs.Root>
  <Tabs.List>
    {#each playerData.classes as playerClass}
      <Tabs.Trigger value={playerClass.name}>
        {playerClass.name}
      </Tabs.Trigger>
    {/each}
  </Tabs.List>
  {#each playerData.classes as playerClass}
    <Tabs.Content value={playerClass.name}>
      <InventoryClassDetails bind:playerClass />
      <InventoryCharacters {playerClass} bind:playerData />
    </Tabs.Content>
  {/each}
</Tabs.Root>
