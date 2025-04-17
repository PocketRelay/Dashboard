<script lang="ts">
  import { type PlayerChallenges } from "$lib/data/parser/challenges";
  import Loader from "./Loader.svelte";
  import GenerallChallenges from "./mpchallenges/GenerallChallenges.svelte";
  import AliensChallenges from "./mpchallenges/AliensChallenges.svelte";
  import WeaponsChallenges from "./mpchallenges/WeaponsChallenges.svelte";
    
  let initialLoading: boolean = false;
  let loading: boolean = false;

  export let playerChallenges: PlayerChallenges;

  $: responsAsNumbers = playerChallenges?.rawnumbers ?? [];

  const TABS: string[] = ["General", "Aliens", "Weapons"];

  let tab: string = TABS[0];
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
