<script lang="ts">
  import { type PlayerData } from "$lib/data/parser";
  import { MAX_CHARACTER_LEVEL } from "$lib/data/inventory";
  import LevelInput from "$lib/components/inventory/LevelInput.svelte";
  import { type Weapon } from "$lib/data/weapons";
  import { formatRomanNumeral } from "$lib/tools/numbers";
  import { Tooltip } from "bits-ui";

  export let playerData: PlayerData;
  export let weapon: Weapon;
  export let editable: boolean;

  // Level of the weapon
  $: weaponLevel = playerData.base.inventory[weapon.level_index] ?? 0;
</script>

<Tooltip.Root>
  <Tooltip.Trigger>
    <div class="weapon">
      <img
        class="weapon__icon"
        src={`/assets/weapons/${weapon.image}`}
        alt={weapon.name}
        width={160}
        height={120}
      />
      <div class="weapon__details">
        <div class="weapon__details__head">
          <p>
            {weapon.name}
          </p>
          <span class="weapon__level"
            >{weaponLevel > 0
              ? formatRomanNumeral(weaponLevel)
              : "Locked"}</span
          >
        </div>
        {#if editable}
          <div class="input">
            <span class="input__label">Level</span>
            <LevelInput
              bind:value={playerData.base.inventory[weapon.level_index]}
              min={0}
              max={MAX_CHARACTER_LEVEL}
              allowUnsafe
            />
          </div>
        {/if}
      </div>
    </div>
  </Tooltip.Trigger>
</Tooltip.Root>

<style lang="scss">
  .weapon {
    display: flex;
    flex-flow: column;

    border: 1px solid #444;
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

    &__icon {
      width: auto;
      height: 120px;
      align-self: center;

      padding: 0 2rem 0 1rem;
      margin-bottom: 1rem;
    }

    &__details {
      padding-top: 1rem;
      border-top: 1px solid #444;
      display: flex;
      flex-flow: column;
      gap: 0.25rem;

      &__head {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
</style>
