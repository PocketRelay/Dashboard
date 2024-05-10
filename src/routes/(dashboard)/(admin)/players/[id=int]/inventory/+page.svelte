<script lang="ts">
  import { getAllPlayerData, getPlayer, setPlayerData } from "$lib/api/players";
  import { createQuery } from "@tanstack/svelte-query";

  import { isAdmin, player as activePlayer } from "$lib/api/api";
  import { derived, writable, type Writable } from "svelte/store";
  import {
    decodePlayerData,
    encodePlayerData,
    type PlayerData,
  } from "$lib/data/parser";
  import Loader from "$lib/components/Loader.svelte";
  import Inventory from "$lib/components/inventory/Inventory.svelte";
  import { createMutation, useQueryClient } from "@tanstack/svelte-query";

  import _ from "lodash";
  import PageHeading from "$lib/components/PageHeading.svelte";
  import { page } from "$app/stores";
  import { base } from "$app/paths";

  const playerId = derived(page, ($page) => parseInt($page.params.id));

  const playerQuery = createQuery(
    derived(playerId, ($playerId) => ({
      queryKey: ["player", $playerId],
      queryFn: () => getPlayer($playerId),
      retry: false,
    }))
  );

  $: player = $playerQuery.data;

  // Local editable copy of the player data
  let localPlayerData: Writable<PlayerData | undefined> = writable();

  // Admins can edit player inventories
  const editable = isAdmin($activePlayer);

  const client = useQueryClient();

  // Query to load all the player data
  const playerData = createQuery(
    derived(playerId, ($playerId) => ({
      queryKey: ["player-data-all", $playerId],
      queryFn: async () => {
        const response = await getAllPlayerData($playerId);
        return decodePlayerData(response);
      },
    }))
  );

  $: {
    // Local data uses a copy so it can be restored
    localPlayerData.set(
      $playerData.data === undefined ? undefined : _.cloneDeep($playerData.data)
    );
  }

  $: isDirty = !_.isEqual($localPlayerData, $playerData.data);

  const saveMutation = createMutation(
    derived([playerId, localPlayerData], ([$playerId, $localPlayerData]) => ({
      mutationFn: async () => {
        if ($localPlayerData === undefined) return;

        // Encode the player data
        const playerDataMap = encodePlayerData($localPlayerData);

        // Create a promise to update each peace of data
        const promises = Object.entries(playerDataMap).map(([key, value]) =>
          setPlayerData($playerId, key, value!)
        );

        // Wait for the results
        await Promise.all(promises);
      },
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ["player-data-all", $playerId] });
      },
    }))
  );

  /**
   * Reset the local copy of the data to match the current data
   * on the server
   */
  function reset() {
    localPlayerData.set(_.cloneDeep($playerData.data));
  }
</script>

<PageHeading
  title={player ? `${player.display_name} Inventory` : "Other Inventory"}
  text="Click an inventory category to view its contents"
  backURL={`${base}/players/${$playerId}`}
/>

{#if $playerData.isLoading}
  <Loader message="Loading player data" />
{:else if $saveMutation.isPending}
  <Loader message="Saving player data" />
{:else if $playerData.isError}
  <p class="error">{$playerData.error}</p>
{:else if $localPlayerData}
  <Inventory bind:playerData={$localPlayerData} {editable} />

  {#if isDirty}
    <div class="unsaved">
      <p>You have unsaved changes</p>
      {#if editable}
        <div class="unsaved__buttons">
          <button
            on:click={() => $saveMutation.mutate()}
            title="Saves any changes made to the inventory"
          >
            Save
          </button>
          <button on:click={reset}> Reset </button>
        </div>
      {/if}
    </div>
  {/if}
{/if}

<style lang="scss">
  .unsaved {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 1rem;
    border: 1px solid #444;
    background-color: #111;
    border-radius: 0.25rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 0.5rem;
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.5);
  }

  .unsaved__buttons {
    display: flex;
    gap: 0.5rem;
  }

  .unsaved button {
    border: 1px solid #444;
    padding: 0.5rem;
    color: #fff;
    border-radius: 0.25rem;
    background-color: #111;
  }
</style>
