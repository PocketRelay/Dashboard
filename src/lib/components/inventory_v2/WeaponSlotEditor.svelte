<script lang="ts">
  import { type PlayerCharacterWeapon } from "$lib/api/parser";
  import { Select, type Selected } from "bits-ui";
  import {
    WEAPON_CATEGORIES,
    getWeaponCategory,
    type Weapon,
  } from "$lib/data/weapons";

  // Other selected weapon (To prevent selecting two of the same type)
  export let otherWeapon: PlayerCharacterWeapon | undefined;

  // The selected weapon in the slot
  export let weapon: PlayerCharacterWeapon | undefined = undefined;

  $: otherWeaponCategory =
    otherWeapon !== undefined && otherWeapon.weapon !== undefined
      ? getWeaponCategory(otherWeapon.weapon)
      : undefined;

  export let editable: boolean;

  const selected: Selected<Weapon> | undefined =
    weapon !== undefined && weapon.weapon !== undefined
      ? { value: weapon.weapon }
      : undefined;

  export let onChangeWeapon: (
    weapon: PlayerCharacterWeapon | undefined
  ) => void;

  // Only used for typing the selector
  const items: Selected<Weapon>[] = [];

  const onChangeSelected = (value: Selected<Weapon> | undefined) => {
    if (value !== undefined) {
      const selectedWeapon = value.value;
      onChangeWeapon({
        weaponIndex: selectedWeapon.level_index,
        weapon: selectedWeapon,
      });
    } else {
      onChangeWeapon(undefined);
    }
  };
</script>

<Select.Root
  {items}
  {selected}
  onSelectedChange={onChangeSelected}
  disabled={!editable}
>
  <Select.Trigger class="weapon-slot-button">
    {#if weapon !== undefined}
      {#if weapon.weapon !== undefined}
        <div class="weapon-slot-button__details">
          <img
            class="weapon-select__image"
            src={`/assets/weapons/${weapon.weapon.image}`}
            alt={weapon.weapon.name}
            width={160}
            height={120}
          />

          <span class="weapon-select__name">{weapon.weapon.name}</span>
        </div>
        {#if editable}
          <span class="weapon-select__change">Click to change</span>
        {/if}
      {:else}
        <span class="weapon-select__name">Unknown Weapon</span>
      {/if}
    {:else}
      <p>No Weapon Selected</p>
    {/if}
  </Select.Trigger>
  <Select.Content sameWidth={false}>
    {#each WEAPON_CATEGORIES as category}
      {#if category !== otherWeaponCategory}
        <Select.Group>
          <Select.Label>{category.name}</Select.Label>
          {#each category.values as weapon}
            <Select.Item value={weapon}>
              <Select.ItemIndicator />

              <div class="weapon-select">
                <img
                  class="weapon-select__image"
                  src={`/assets/weapons/${weapon.image}`}
                  alt={weapon.name}
                  width={160}
                  height={120}
                />

                <span class="weapon-select__name">{weapon.name}</span>
              </div>
            </Select.Item>
          {/each}
        </Select.Group>
      {/if}
    {/each}
    <Select.Arrow />
  </Select.Content>
</Select.Root>

<style lang="scss">
  .weapon-select {
    display: flex;

    flex-flow: row;
    align-items: center;
    gap: 0.5rem;

    &__image {
      width: auto;
      height: 64px;
    }

    &__change {
      color: #999;
      font-size: 0.75rem;
    }
  }

  :global(.weapon-slot-button) {
    display: flex;
    flex-flow: column;
    align-items: center;

    background-color: transparent;
    border: 1px solid #444;
    color: white;
    padding: 0.5rem 1rem;
    padding-right: 2rem;
    cursor: pointer;
    border-radius: 0.25rem;

    &:disabled {
      cursor: default;
    }
  }

  :global(.weapon-slot-button__details) {
    display: flex;
    flex-flow: row;
    align-items: center;
    gap: 0.5rem;
  }
</style>
