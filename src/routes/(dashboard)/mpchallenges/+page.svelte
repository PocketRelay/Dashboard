<script lang="ts">
  import { player } from "$lib/api/api";
  import PageHeading from "$lib/components/PageHeading.svelte";
  import Challenges from "$lib/components/MpChallenges.svelte";
</script>

<PageHeading title="MP Challenges"/>
<Challenges playerId={$player.id} />