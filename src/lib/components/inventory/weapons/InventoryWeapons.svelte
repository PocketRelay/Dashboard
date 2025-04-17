<script lang="ts">
  import { type PlayerData } from "$lib/data/parser";

  import { Tabs } from "bits-ui";
  import { WEAPON_CATEGORIES } from "$lib/data/weapons";
  import WeaponEditor from "./WeaponEditor.svelte";

  export let playerData: PlayerData;
  export let editable: boolean;
</script>

<Tabs.Root>
  <Tabs.List class="tabs">
    {#each WEAPON_CATEGORIES as category}
      <Tabs.Trigger value={category.name} class="tab">
        {category.name}
      </Tabs.Trigger>
    {/each}
  </Tabs.List>
  {#each WEAPON_CATEGORIES as category}
    <Tabs.Content value={category.name}>
      <div class="weapons-grid">
        {#each category.values as weapon}
          <WeaponEditor {weapon} bind:playerData {editable} />
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
