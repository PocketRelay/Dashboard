<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import Classes from "$lib/components/Classes.svelte";
  import DashboardPage from "$lib/components/DashboardPage.svelte";

  const playerId = parseInt($page.params.id);
</script>

<DashboardPage
  title="Other Classes"
  text="Below is a list of all your classes along with their level and total promotions"
>
  <Classes {playerId}>
    <a href={`${base}/players/${playerId}`} class="button button--alt back">
      Back
    </a>
  </Classes>
</DashboardPage>
