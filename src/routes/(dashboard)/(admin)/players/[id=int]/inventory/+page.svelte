<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import PageHeading from "$lib/components/PageHeading.svelte";
  import Inventory from "$lib/components/inventory/Inventory.svelte";

  const playerId = parseInt($page.params.id);
</script>

<PageHeading
  title="Other Inventory"
  text="Click an inventory category to view its contents"
/>

<Inventory {playerId}>
  <a href={`${base}/players/${playerId}`} class="button button--alt"> Back </a>
</Inventory>
