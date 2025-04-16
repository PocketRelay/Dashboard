<script lang="ts">
  import { getAllPlayerData } from "$lib/api/players";
  import { createQuery } from "@tanstack/svelte-query";

  import { player } from "$lib/api/api";
  import { derived } from "svelte/store";
  import { decodePlayerData, type PlayerData } from "$lib/api/parser";
  import Loader from "$lib/components/Loader.svelte";
  import Inventory from "$lib/components/inventory_v2/Inventory.svelte";

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

  let localPlayerData: PlayerData | undefined;

  $: {
    localPlayerData = $playerData.data;
  }
</script>

{#if $playerData.isLoading}
  <Loader />
{:else if $playerData.isError}
  <p class="error">{$playerData.error}</p>
{:else if localPlayerData}
  <Inventory bind:playerData={localPlayerData} />
{/if}
