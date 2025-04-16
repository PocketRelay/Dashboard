<script lang="ts">
  import { player } from "$lib/api/api";
  import DashboardPage from "$lib/components/DashboardPage.svelte";
  import Challenges from "$lib/components/Challenges.svelte";
</script>

<DashboardPage title="Challenges">
  <Challenges playerId={$player.id} />
</DashboardPage>
