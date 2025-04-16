<script lang="ts">
  import { type PlayerData } from "$lib/api/parser";

  import { Tabs } from "bits-ui";
  import { WEAPON_CATEGORIES } from "$lib/data/weapons";

  export let playerData: PlayerData;
  export let editable: boolean;
</script>

<Tabs.Root>
  <Tabs.List class="weapon-tabs">
    {#each WEAPON_CATEGORIES as category}
      <Tabs.Trigger value={category.name} class="weapon-tab">
        {category.name}
      </Tabs.Trigger>
    {/each}
  </Tabs.List>
  {#each WEAPON_CATEGORIES as category}
    <Tabs.Content value={category.name}>
      {#each category.values as weapon}
        {weapon.name}
      {/each}
    </Tabs.Content>
  {/each}
</Tabs.Root>

<style lang="scss">
</style>
