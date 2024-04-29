<script lang="ts">
  import type { PlayerData } from "$lib/api/parser";

  import { Tabs } from "bits-ui";
  import { setContext } from "svelte";
  import { writable, type Writable } from "svelte/store";
  import InventoryCharacters from "./InventoryClasses.svelte";

  export let playerData: PlayerData;
</script>

<Tabs.Root>
  <Tabs.List></Tabs.List>

  <InventoryCharacters bind:playerData />
</Tabs.Root>
