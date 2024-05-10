<script lang="ts">
  import { type PlayerData } from "$lib/api/parser";

  import { Tabs } from "bits-ui";
  import WeaponModEditor from "./WeaponModEditor.svelte";
  import { WEAPON_MODS } from "$lib/data/weapon_mods";

  export let playerData: PlayerData;
  export let editable: boolean;
</script>

<Tabs.Root>
  <Tabs.List class="weapon-tabs">
    {#each WEAPON_MODS as category}
      <Tabs.Trigger value={category.name} class="weapon-tab">
        {category.name}
      </Tabs.Trigger>
    {/each}
  </Tabs.List>
  {#each WEAPON_MODS as category}
    <Tabs.Content value={category.name}>
      <div class="weapons-grid">
        {#each category.values as weaponMod}
          <WeaponModEditor {weaponMod} bind:playerData {editable} />
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

  :global(.weapon-tabs) {
    position: relative;

    display: flex;
    padding: 1rem 0;
    border-bottom: 1px solid #333;
    margin-bottom: 1rem;
  }

  :global(.weapon-tab) {
    display: flex;
    flex-flow: column;
    border: none;
    background-color: transparent;
    text-align: center;
    color: white;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border: 1px solid transparent;
  }

  :global(.weapon-tab[data-state="active"]) {
    background-color: #222;
    border: 1px solid #333;
    border-radius: 0.25rem;
  }
</style>
