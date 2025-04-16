<script lang="ts">
  import { type PlayerData } from "$lib/api/parser";

  import { Tabs } from "bits-ui";
  import InventoryCharacters from "./InventoryClasses.svelte";

  export let playerData: PlayerData;
  export let editable: boolean;
</script>

<Tabs.Root>
  <Tabs.List>
    <Tabs.Trigger value="characters">Characters</Tabs.Trigger>
    <Tabs.Trigger value="weapons">Weapons</Tabs.Trigger>
    <Tabs.Trigger value="weapon-mods">Weapon Mods</Tabs.Trigger>
    <Tabs.Trigger value="consumables">Consumables</Tabs.Trigger>
    <Tabs.Trigger value="gear">Gear</Tabs.Trigger>
    <Tabs.Trigger value="other">Other</Tabs.Trigger>
  </Tabs.List>

  <Tabs.Content value="characters">
    <InventoryCharacters bind:playerData {editable} />
  </Tabs.Content>
</Tabs.Root>
