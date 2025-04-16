<script lang="ts">
  import {
    parsePlayerChallenges,
    PLAYER_CHALLENGES_KEY,
    type PlayerChallenges,
  } from "$lib/api/parser";
  import { getPlayerData, type PlayerData } from "$lib/api/players";
  import { onMount } from "svelte";
  import Loader from "./Loader.svelte";
  import GenerallChallenges from "./mpchallenges/GenerallChallenges.svelte";
  import AliensChallenges from "./mpchallenges/AliensChallenges.svelte";
  import WeaponsChallenges from "./mpchallenges/WeaponsChallenges.svelte";

  export let playerId: number;

  let initialLoading: boolean = false;
  let loading: boolean = false;

  let playerChallenges: PlayerChallenges | null = null;
  let responsAsNumbers: number[] = [];

  async function load() {
    initialLoading = true;
    console.debug("Loading MP challenges");

    let responseAsString: PlayerData;
    try {
      responseAsString = await getPlayerData(playerId, PLAYER_CHALLENGES_KEY);
    } catch (e) {
      let err = e as Error;
      console.error(err);
      initialLoading = false;
      return;
    }
    console.debug("Got from server: " + responseAsString.value);
    playerChallenges = parsePlayerChallenges(responseAsString.value);
    if (playerChallenges == null) return;

    responsAsNumbers = playerChallenges.rawnumbers;

    initialLoading = false;
  }

  const TABS: string[] = ["General", "Aliens", "Weapons"];

  let tab: string = TABS[0];

  onMount(load);
</script>

<!-- TODO embedd HTML -->
<div class="wrapper">
  <div class="button-group">
    <slot />

    {#if responsAsNumbers.length > 0}
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
    {:else if tab == "General"}
      <GenerallChallenges rawValues={responsAsNumbers} />
    {:else if tab == "Aliens"}
      <AliensChallenges rawValues={responsAsNumbers} />
    {:else if tab == "Weapons"}
      <WeaponsChallenges rawValues={responsAsNumbers} />
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
