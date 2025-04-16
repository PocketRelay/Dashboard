<script lang="ts">
  import { isAdmin, player } from "$lib/api/api";
  import {
    encodeInventory,
    encodePlayerBase,
    parseInventory,
    parsePlayerBase,
    PLAYER_BASE_KEY,
    type PlayerBase,
  } from "$lib/api/parser";
  import {
    getAllPlayerData,
    getPlayerData,
    setPlayerData,
  } from "$lib/api/players";
  import InventoryCharacters from "./InventoryCharacters.svelte";
  import InventoryConsumables from "./InventoryConsumables.svelte";
  import InventoryGear from "./InventoryGear.svelte";
  import InventoryOther from "./InventoryOther.svelte";
  import InventoryWeaponMods from "./InventoryWeaponMods.svelte";
  import InventoryWeapons from "./InventoryWeapons.svelte";
  import Loader from "../Loader.svelte";
  import {
    createMutation,
    createQuery,
    useQueryClient,
  } from "@tanstack/svelte-query";

  export let playerId: number;

  let playerBase: PlayerBase | null = null;
  let inventory: number[] = [];
  let credits: number = 0;

  const client = useQueryClient();

  // Query to load all the player data
  const playerData = createQuery({
    queryKey: ["player-data-all", playerId],
    queryFn: () => getAllPlayerData(playerId),
  });

  const playerDataBase = createQuery({
    queryKey: ["player-data-base", playerId],
    queryFn: () => getPlayerData(playerId, PLAYER_BASE_KEY),
  });

  $: {
    const data = $playerDataBase.data;
    if (data !== undefined) {
      playerBase = parsePlayerBase(data.value);
      if (playerBase !== null) {
        credits = playerBase.credits;
        inventory = parseInventory(playerBase.inventory);
      }
    }
  }

  const saveMutation = createMutation({
    mutationFn: async () => {
      if (!playerBase) return;
      let encodedInventory = encodeInventory(inventory);
      let newBase: PlayerBase = {
        ...playerBase,
        credits,
        inventory: encodedInventory,
      };

      let encodedBase = encodePlayerBase(newBase);
      await setPlayerData(playerId, PLAYER_BASE_KEY, encodedBase);
    },
    onSuccess: () =>
      client.invalidateQueries({ queryKey: ["player-data-base", playerId] }),
  });

  /**
   * Reset the contents of the inventory by re-parsing the
   * stored inventory
   */
  function reset() {
    if (!playerBase) return;
    inventory = parseInventory(playerBase.inventory);
  }

  const TABS: string[] = [
    "Characters",
    "Weapons",
    "WeaponMods",
    "Consumables",
    "Gear",
    "Other",
  ];

  let tab: string = TABS[0];
</script>

<div class="wrapper">
  <div class="button-group">
    <slot />

    {#if inventory.length > 0}
      {#if isAdmin($player)}
        <button
          class="button button--alt"
          on:click={() => $saveMutation.mutate()}
          title="Saves any changes made to the inventory"
        >
          Save
        </button>
        <button class="button button--alt" on:click={reset}> Reset </button>
      {/if}
      <select class="select" bind:value={tab}>
        {#each TABS as tab}
          <option value={tab}>{tab}</option>
        {/each}
      </select>
    {/if}
  </div>

  <div class="contents">
    {#if $playerDataBase.isLoading}
      <Loader />
    {:else if inventory.length == 0}
      <h2 class="title">Inventory not initialized</h2>
      <p class="text text--wrapped">
        This account inventory has not yet been created. In order to create the
        inventory the player must have visited the multiplayer menu
      </p>
      <div class="info">
        <a
          class="annot"
          href="https://github.com/PocketRelay/Client/releases/latest/download/pocket-relay-client.exe"
          rel="noreferrer"
          target="_blank"
          title="Download the latest client version">Download Client</a
        >

        <a
          class="annot"
          href="https://pocket-relay.pages.dev/"
          rel="noreferrer"
          target="_blank"
          title="View the website for the Pocket Relay project"
          >Pocket Relay Website</a
        >
      </div>
    {:else if tab == "Characters"}
      <InventoryCharacters {inventory} />
    {:else if tab == "Weapons"}
      <InventoryWeapons {inventory} />
    {:else if tab == "WeaponMods"}
      <InventoryWeaponMods {inventory} />
    {:else if tab == "Consumables"}
      <InventoryConsumables {inventory} />
    {:else if tab == "Gear"}
      <InventoryGear {inventory} />
    {:else if tab == "Other"}
      <InventoryOther bind:credits />
    {/if}

    {#if $saveMutation.isPending}
      <Loader />
    {/if}
  </div>
</div>

<style lang="scss">
  .info {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  .title {
    margin-bottom: 0.5rem;
  }

  .wrapper {
    display: flex;
    flex-flow: column;

    flex: auto;
    gap: 1rem;
  }

  .contents {
    flex: auto;
    display: flex;
    flex-flow: column;
  }
</style>
