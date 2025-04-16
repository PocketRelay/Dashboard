<script lang="ts">
  import { type PlayerData } from "$lib/api/parser";

  import { Tabs } from "bits-ui";
  import WeaponModEditor from "./GearEditor.svelte";
  import { WEAPON_MODS } from "$lib/data/weapon_mods";
  import {
    CONSUMABLES,
    CORE_CONSUMABLES,
    GEAR_CONSUMABLES,
    OTHER_CONSUMABLES,
  } from "$lib/data/consumables";
  import ConsumableEditor from "./GearEditor.svelte";
  import GearEditor from "./GearEditor.svelte";
  import CoreEditor from "./CoreEditor.svelte";
  import OtherEditor from "./OtherEditor.svelte";

  export let playerData: PlayerData;
  export let editable: boolean;
</script>

<Tabs.Root>
  <Tabs.List class="weapon-tabs">
    <Tabs.Trigger value="gear" class="weapon-tab">Gear</Tabs.Trigger>
    <Tabs.Trigger value="core" class="weapon-tab">Core</Tabs.Trigger>
    <Tabs.Trigger value="other" class="weapon-tab">Other</Tabs.Trigger>
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

  :global(.weapon-tabs) {
    position: relative;

    display: flex;
    padding: 1rem 0;
    border-bottom: 1px solid #333;
    margin-bottom: 1rem;
  }

  :global(.weapon-tab) {
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

  :global(.weapon-tab[data-state="active"]) {
    background-color: #222;
    border: 1px solid #333;
    border-radius: 0.25rem;
  }
</style>
