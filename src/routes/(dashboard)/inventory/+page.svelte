<script lang="ts">
  import { player } from "$lib/api/api";
  import PageHeading from "$lib/components/PageHeading.svelte";
  import Inventory from "$lib/components/inventory/Inventory.svelte";
</script>

<PageHeading
  title="Inventory"
  text="Click an inventory category to view its contents"
/>

<Inventory playerId={$player.id} />
