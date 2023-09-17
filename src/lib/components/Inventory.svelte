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
    getPlayerData,
    setPlayerData,
    type PlayerData,
  } from "$lib/api/players";
  import { onMount } from "svelte";
  import InventoryCharacters from "./inventory/InventoryCharacters.svelte";
  import InventoryConsumables from "./inventory/InventoryConsumables.svelte";
  import InventoryGear from "./inventory/InventoryGear.svelte";
  import InventoryOther from "./inventory/InventoryOther.svelte";
  import InventoryWeaponMods from "./inventory/InventoryWeaponMods.svelte";
  import InventoryWeapons from "./inventory/InventoryWeapons.svelte";
  import Loader from "./Loader.svelte";

  export let playerId: number;

  let initialLoading: boolean = false;
  let loading: boolean = false;

  let playerBase: PlayerBase | null = null;
  let inventory: number[] = [];
  let credits: number = 0;

  async function load() {
    initialLoading = true;
    console.debug("Loading inventory");

    let response: PlayerData;
    try {
      response = await getPlayerData(playerId, PLAYER_BASE_KEY);
    } catch (e) {
      let err = e as Error;
      console.error(err);
      initialLoading = false;
      return;
    }
    playerBase = parsePlayerBase(response.value);
    if (playerBase == null) return;
    credits = playerBase.credits;
    inventory = parseInventory(playerBase.inventory);
    initialLoading = false;
  }

  async function save() {
    if (!playerBase) return;
    loading = true;
    console.debug("Saving inventory");

    let encodedInventory = encodeInventory(inventory);
    let newBase: PlayerBase = {
      ...playerBase,
      credits,
      inventory: encodedInventory,
    };

    let encodedBase = encodePlayerBase(newBase);
    try {
      await setPlayerData(playerId, PLAYER_BASE_KEY, encodedBase);
      playerBase = newBase;
    } catch (e) {
      let err = e as Error;
      console.error(err);
    } finally {
      loading = false;
    }
  }

  /**
   * Reset the contents of the inventory by reparsing the
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

  onMount(load);
</script>

<div class="wrapper">
  <div class="button-group">
    <slot />

    {#if inventory.length > 0}
      {#if isAdmin($player)}
        <button
          class="button button--alt"
          on:click={save}
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
    {#if initialLoading}
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

    {#if loading}
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
    height: 100%;

    flex: auto;
    overflow: auto;
    gap: 1rem;
  }

  .contents {
    flex: auto;
    display: flex;
    flex-flow: column;
    overflow: auto;
  }
</style>
