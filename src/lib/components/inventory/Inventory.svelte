<script lang="ts">
  import { type PlayerData } from "$lib/api/parser";

  import { Tabs } from "bits-ui";
  import InventoryCharacters from "./InventoryClasses.svelte";
  import InventoryWeapons from "./weapons/InventoryWeapons.svelte";
  import InventoryWeaponMods from "./weapon_mods/InventoryWeaponMods.svelte";
  import InventoryConsumables from "./consumables/InventoryConsumables.svelte";
  import InventoryGear from "./gear/InventoryGear.svelte";
  import InventoryOther from "./other/InventoryOther.svelte";

  export let playerData: PlayerData;
  export let editable: boolean;
</script>

<Tabs.Root let:value>
  <Tabs.List class="inventory-tabs">
    <Tabs.Trigger value="characters" class="inventory-tab"
      >Characters</Tabs.Trigger
    >
    <Tabs.Trigger value="weapons" class="inventory-tab">Weapons</Tabs.Trigger>
    <Tabs.Trigger value="weapon-mods" class="inventory-tab">
      Weapon Mods
    </Tabs.Trigger>
    <Tabs.Trigger value="consumables" class="inventory-tab">
      Consumables
    </Tabs.Trigger>
    <Tabs.Trigger value="gear" class="inventory-tab">Gear</Tabs.Trigger>
    <Tabs.Trigger value="other" class="inventory-tab">Other</Tabs.Trigger>
  </Tabs.List>

  <Tabs.Content value="characters">
    {#if value === "characters"}
      <InventoryCharacters bind:playerData {editable} />
    {/if}
  </Tabs.Content>
  <Tabs.Content value="weapons">
    {#if value === "weapons"}
      <InventoryWeapons bind:playerData {editable} />
    {/if}
  </Tabs.Content>
  <Tabs.Content value="weapon-mods">
    {#if value === "weapon-mods"}
      <InventoryWeaponMods bind:playerData {editable} />
    {/if}
  </Tabs.Content>
  <Tabs.Content value="consumables">
    {#if value === "consumables"}
      <InventoryConsumables bind:playerData {editable} />
    {/if}
  </Tabs.Content>
  <Tabs.Content value="gear">
    {#if value === "gear"}
      <InventoryGear bind:playerData {editable} />
    {/if}
  </Tabs.Content>
  <Tabs.Content value="other">
    {#if value === "other"}
      <InventoryOther bind:playerData {editable} />
    {/if}
  </Tabs.Content>
</Tabs.Root>

<style lang="scss">
  :global(.inventory-tabs) {
    position: relative;

    display: flex;
    padding: 1rem 0;
    border-bottom: 1px solid #333;
    margin-bottom: 1rem;
  }

  :global(.inventory-tab) {
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

  :global(.inventory-tab[data-state="active"]) {
    background-color: #222;
    border: 1px solid #333;
    border-radius: 0.25rem;
  }
</style>
