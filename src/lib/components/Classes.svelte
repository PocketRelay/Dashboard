<script lang="ts">
  import { isAdmin, player } from "$lib/api/api";
  import {
    encodePlayerClass,
    parsePlayerClass,
    type PlayerClass,
  } from "$lib/api/parser";
  import {
    getAllPlayerData,
    setPlayerData,
    type PlayerData,
  } from "$lib/api/players";
  import PlayerClassComponent from "./classes/PlayerClass.svelte";
  import Loader from "./Loader.svelte";
  import {
    createMutation,
    createQuery,
    useQueryClient,
  } from "@tanstack/svelte-query";

  export let playerId: number;

  const client = useQueryClient();

  // Type representing a class loaded from key values
  interface StoredClass {
    // The class key index value
    index: number;
    // The actual player class
    value: PlayerClass;
  }

  // The loaded stored classes
  let stored: StoredClass[] = [];

  const playerData = createQuery({
    queryKey: ["player-data-all", playerId],
    queryFn: () => getAllPlayerData(playerId),
  });

  $: {
    const data = $playerData.data;
    if (data !== undefined) {
      setStoredClasses(data);
    }
  }

  function setStoredClasses(input: Record<string, string>) {
    // Filter the class keys
    let classFilter = (key: string) => key.startsWith("class");
    let keys = Object.keys(input).filter(classFilter);

    const newStored = [];

    for (const key of keys) {
      let index = parseInt(key.substring(5));
      let value = parsePlayerClass(input[key]);
      // Skip invalid classes
      if (Number.isNaN(index) || value == null) continue;
      newStored.push({
        index,
        value,
      });
    }

    stored = newStored;
  }

  const saveMutation = createMutation({
    mutationFn: async () => {
      // Encoded player data to save to the server
      const data: PlayerData[] = [];

      for (const clazz of stored) {
        const key = "class" + clazz.index;
        const value = encodePlayerClass(clazz.value);
        data.push({ key, value });
      }

      // Collection of promises for data to be saved
      const promises: Promise<any>[] = data.map((data) => {
        return setPlayerData(playerId, data.key, data.value);
      });

      await Promise.all(promises);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["player-data-all", playerId] });
      client.invalidateQueries({ queryKey: ["player-data-base", playerId] });
    },
  });
</script>

{#if $playerData.isLoading}
  <Loader />
{:else if $playerData.isError}
  <p class="error">Failed to load classes: {$playerData.error}</p>
{:else}
  <div class="tabs">
    <slot />
    {#if isAdmin($player) && stored.length != 0}
      <button
        class="button button--alt"
        on:click={() => $saveMutation.mutate()}
        title="Saves any changes made to the classes"
      >
        Save
      </button>
    {/if}
  </div>

  <div class="classes">
    {#if stored.length == 0}
      <div>
        <h2 class="title">Classes not initialized</h2>
        <p class="text text--wrapped">
          This account classes have not yet been created. In order to create the
          classes the player must have completed the class selection screen for
          first time opening multiplayer
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
      </div>
    {:else}
      {#each stored as { value }}
        <PlayerClassComponent
          name={value.name}
          bind:level={value.level}
          bind:promotions={value.promotions}
        />
      {/each}
    {/if}
  </div>
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
