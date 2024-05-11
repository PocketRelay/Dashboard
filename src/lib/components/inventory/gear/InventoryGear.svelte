<script lang="ts">
  import { type PlayerData } from "$lib/data/parser";

  import { Tabs } from "bits-ui";
  import {
    CORE_CONSUMABLES,
    GEAR_CONSUMABLES,
    OTHER_CONSUMABLES,
  } from "$lib/data/consumables";
  import GearEditor from "./GearEditor.svelte";
  import CoreEditor from "./CoreEditor.svelte";
  import OtherEditor from "./OtherEditor.svelte";

  export let playerData: PlayerData;
  export let editable: boolean;
</script>

<Tabs.Root>
  <Tabs.List class="tabs">
    <Tabs.Trigger value="gear" class="tab">Gear</Tabs.Trigger>
    <Tabs.Trigger value="core" class="tab">Core</Tabs.Trigger>
    <Tabs.Trigger value="other" class="tab">Other</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="gear">
    <div class="weapons-grid">
      {#each GEAR_CONSUMABLES as consumable}
        <GearEditor bind:playerData {consumable} {editable} />
      {/each}
    </div>
  </Tabs.Content>
  <Tabs.Content value="core">
    <div class="weapons-grid">
      {#each CORE_CONSUMABLES as consumable}
        <CoreEditor bind:playerData {consumable} {editable} />
      {/each}
    </div>
  </Tabs.Content>
  <Tabs.Content value="other">
    <div class="weapons-grid">
      {#each OTHER_CONSUMABLES as consumable}
        <OtherEditor bind:playerData {consumable} {editable} />
      {/each}
    </div>
  </Tabs.Content>
</Tabs.Root>

<style lang="scss">
  .weapons-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 1rem;
    align-items: start;
  }

  @media screen and (max-width: 1700px) {
    .weapons-grid {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  @media screen and (max-width: 1400px) {
    .weapons-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media screen and (max-width: 1000px) {
    .weapons-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
