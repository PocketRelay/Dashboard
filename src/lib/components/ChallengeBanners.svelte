<script lang="ts">
  import {
    setPlayerData,
    type PlayerData,
    getPlayerData,
  } from "$lib/api/players";
  import { onMount } from "svelte";
  import Loader from "./Loader.svelte";

  export let playerId: number;

  const REWARD_KEY: string = "csreward";

  let rewardId: number = 0;

  // Loading state
  let loading: boolean = true;

  /**
   * Loader function for loading the player classes by loading
   * the player data and parsing the class data
   */
  async function load(): Promise<void> {
    loading = true;
    console.debug("Loading challenge banner");

    // Load the player data
    let response: PlayerData;
    try {
      response = await getPlayerData(playerId, REWARD_KEY);
    } catch (e) {
      let err = e as Error;
      console.error(err);
      loading = false;
      return;
    }

    let value = parseInt(response.value);
    if (Number.isNaN(value)) value = 0;

    rewardId = value;
    loading = false;
  }

  /**
   * Handles saving all the classes in their encoded format
   * and sending them to the server
   */
  async function save() {
    loading = true;
    console.debug("Saving challenge banner");

    try {
      await setPlayerData(playerId, REWARD_KEY, rewardId.toString());
    } catch (e) {
      let err = e as Error;
      console.error(err);
    } finally {
      loading = false;
    }
  }

  // Load classes on mount
  onMount(load);
</script>

{#if loading}
  <Loader />
{/if}

<style lang="scss">
  .info {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  .title {
    margin-bottom: 0.5rem;
  }

  .classes {
    display: flex;
    flex-flow: row wrap;
    gap: 2rem;
    margin-top: 1rem;
  }

  .tabs {
    display: flex;
    gap: 1rem;
  }
</style>
