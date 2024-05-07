<script lang="ts">
  import { type PlayerData } from "$lib/api/parser";
  import { MAX_CHARACTER_LEVEL } from "$lib/data/inventory";
  import LevelInput from "$lib/components/inventory/LevelInput.svelte";
  import { formatRomanNumeral } from "$lib/tools/numbers";
  import { Tooltip } from "bits-ui";

  export let playerData: PlayerData;
  export let index: number;
  export let tier: number;
  export let editable: boolean;

  const tierName = formatRomanNumeral(tier + 1);

  // Level of the weapon
  $: tierLevel = playerData.base.inventory[index] ?? 0;
</script>

<Tooltip.Root>
  <Tooltip.Trigger>
    <div class="tier">
      <div class="tier__head">
        <span class="tier__level">
          {tierName}
        </span>
        {#if editable}
          <LevelInput
            bind:value={playerData.base.inventory[index]}
            min={0}
            max={MAX_CHARACTER_LEVEL}
            allowUnsafe
          />
        {/if}
        <span class="tier__level"
          >{tierLevel > 0 ? formatRomanNumeral(tierLevel) : "Locked"}</span
        >
      </div>
    </div>
  </Tooltip.Trigger>
</Tooltip.Root>

<style lang="scss">
  .tier {
    display: flex;
    flex-flow: column;

    border-bottom: 1px solid #444;
    padding: 1rem;
    border-radius: 0.25rem;
    color: white;
    text-align: left;

    &__level {
      border: 1px solid #444;
      font-size: 0.8rem;
      padding: 0.5rem 0.75rem;
      border-radius: 0.25rem;
    }

    .tier__head {
      display: flex;
      align-items: center;
      gap: 1rem;
      justify-content: space-between;
    }
  }
</style>
