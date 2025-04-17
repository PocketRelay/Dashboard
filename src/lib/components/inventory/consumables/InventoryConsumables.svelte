<script lang="ts">
  import { type PlayerData } from "$lib/data/parser";

  import { Tabs } from "bits-ui";
  import { CONSUMABLES } from "$lib/data/consumables";
  import ConsumableEditor from "./ConsumableEditor.svelte";

  export let playerData: PlayerData;
  export let editable: boolean;
</script>

<Tabs.Root>
  <Tabs.List class="tabs">
    {#each CONSUMABLES as category}
      <Tabs.Trigger value={category.name} class="tab">
        {category.name}
      </Tabs.Trigger>
    {/each}
  </Tabs.List>
  {#each CONSUMABLES as category}
    <Tabs.Content value={category.name}>
      <div class="weapons-grid">
        {#each category.values as consumable}
          <ConsumableEditor {consumable} bind:playerData {editable} />
        {/each}
      </div>
    </Tabs.Content>
  {/each}
</Tabs.Root>

<style lang="scss">
  .weapons-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 1rem;
    align-items: start;
  }

  @media screen and (max-width: 1700px) {
    .weapons-grid {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  @media screen and (max-width: 1400px) {
    .weapons-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media screen and (max-width: 1000px) {
    .weapons-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
