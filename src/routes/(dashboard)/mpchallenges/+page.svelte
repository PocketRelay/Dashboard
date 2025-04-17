<script lang="ts">
  import { player } from "$lib/api/api";
  import { getPlayerData } from "$lib/api/players";
  import { getPlayerChallenges } from "$lib/data/parser/challenges";
  import Loader from "$lib/components/Loader.svelte";
  import {PLAYER_CHALLENGES_KEY} from "$lib/data/parser/challenges";
  import { createQuery } from "@tanstack/svelte-query";
  import { derived } from "svelte/store";
  import PageHeading from "$lib/components/PageHeading.svelte";
  import Challenges from "$lib/components/MpChallenges.svelte";

  const query = createQuery(
    derived(player, ($player) => ({
      queryKey: [PLAYER_CHALLENGES_KEY, $player?.id],
      queryFn: async () => {
        if ($player === null) throw new Error("Not authenticated");

        const response = await getPlayerData($player.id, PLAYER_CHALLENGES_KEY);
        return getPlayerChallenges(response.value);
      },
    }))
  );

</script>

<PageHeading title="MP Challenges"/>
{#if $query.error}
  <p class="error">{$query.error}</p>
{/if}

{#if $query.isLoading}
<Loader />
{:else if $query.data}
<Challenges playerChallenges={$query.data} />
{:else}
  <p>No challenges found</p>
{/if}