<script lang="ts">
  import { getPlayerClasses, type PlayerClass } from "$lib/api/parser";
  import { Tabs } from "bits-ui";
  import PlayerClassCard from "$lib/components/classes/PlayerClass.svelte";

  // Immutable player data set from the server
  export let remotePlayerData: Record<string, string>;

  let localPlayerClasses: PlayerClass[] = [];

  function createLocalData(remote: Record<string, string>) {
    localPlayerClasses = getPlayerClasses(remote);
  }

  $: {
    createLocalData(remotePlayerData);
  }
</script>

<Tabs.Root>
  <Tabs.List>
    {#each localPlayerClasses as localPlayerClass}
      <Tabs.Trigger value={localPlayerClass.name} class="class-tab">
        <span>{localPlayerClass.name}</span>
      </Tabs.Trigger>
    {/each}
  </Tabs.List>
  {#each localPlayerClasses as localPlayerClass}
    <Tabs.Content value={localPlayerClass.name}>
      <PlayerClassCard
        name={localPlayerClass.name}
        level={localPlayerClass.level}
        promotions={localPlayerClass.promotions}
      />
    </Tabs.Content>
  {/each}
</Tabs.Root>

<style lang="scss">
  :global(.class-tab) {
    display: inline-flex;
    flex-flow: column;
    gap: 0.25em;
    border: none;
    padding: 0.5rem 1rem;
    align-items: center;
  }
</style>
