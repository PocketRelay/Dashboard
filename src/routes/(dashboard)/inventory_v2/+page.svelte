<script lang="ts">
  import { getAllPlayerData, setPlayerData } from "$lib/api/players";
  import { createQuery } from "@tanstack/svelte-query";

  import { isAdmin, player } from "$lib/api/api";
  import { derived, writable, type Writable } from "svelte/store";
  import {
    decodePlayerData,
    encodePlayerData,
    type PlayerData,
  } from "$lib/api/parser";
  import Loader from "$lib/components/Loader.svelte";
  import Inventory from "$lib/components/inventory_v2/Inventory.svelte";
  import deepCopy from "$lib/tools/copy";
  import { createMutation, useQueryClient } from "@tanstack/svelte-query";

  // Local editable copy of the player data
  let localPlayerData: Writable<PlayerData | undefined> = writable();

  // Admins can edit player inventories
  const editable = isAdmin($player);

  const client = useQueryClient();

  // Query to load all the player data
  const playerData = createQuery(
    derived(player, ($player) => ({
      queryKey: ["player-data-all", $player.id],
      queryFn: async () => {
        const response = await getAllPlayerData($player.id);
        return decodePlayerData(response);
      },
    }))
  );

  $: {
    // Local data uses a copy so it can be restored
    localPlayerData.set(
      $playerData.data === undefined ? undefined : deepCopy($playerData.data)
    );
  }

  const saveMutation = createMutation(
    derived([player, localPlayerData], ([$player, $localPlayerData]) => ({
      mutationFn: async () => {
        if ($localPlayerData === undefined) return;

        // Encode the player data
        const playerDataMap = encodePlayerData($localPlayerData);

        // Create a promise to update each peace of data
        const promises = Object.entries(playerDataMap).map(([key, value]) =>
          setPlayerData($player.id, key, value!)
        );

        // Wait for the results
        await Promise.all(promises);
      },
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ["player-data-all", $player.id] });
      },
    }))
  );

  /**
   * Reset the local copy of the data to match the current data
   * on the server
   */
  function reset() {
    localPlayerData.set(deepCopy($playerData.data));
  }
</script>

{#if $playerData.isLoading}
  <Loader />
{:else if $playerData.isError}
  <p class="error">{$playerData.error}</p>
{:else if $localPlayerData}
  <div class="button-group">
    {#if editable}
      <button
        class="button button--alt"
        on:click={() => $saveMutation.mutate()}
        title="Saves any changes made to the inventory"
      >
        Save
      </button>
      <button class="button button--alt" on:click={reset}> Reset </button>
    {/if}
  </div>

  <Inventory bind:playerData={$localPlayerData} {editable} />
{/if}
