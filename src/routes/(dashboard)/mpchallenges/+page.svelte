<script lang="ts">
  import { player } from "$lib/api/api";
  import DashboardPage from "$lib/components/DashboardPage.svelte";
  import Challenges from "$lib/components/MpChallenges.svelte";
</script>

<DashboardPage title="MP Challenges">
  <Challenges playerId={$player.id} />
</DashboardPage>
