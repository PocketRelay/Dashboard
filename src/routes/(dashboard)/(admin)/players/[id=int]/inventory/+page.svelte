<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import DashboardPage from "$lib/components/DashboardPage.svelte";
  import Inventory from "$lib/components/inventory/Inventory.svelte";

  const playerId = parseInt($page.params.id);
</script>

<DashboardPage
  title="Other Inventory"
  text="Click an inventory category to view its contents"
>
  <Inventory {playerId}>
    <a href={`${base}/players/${playerId}`} class="button button--alt">
      Back
    </a>
  </Inventory>
</DashboardPage>
