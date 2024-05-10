<script lang="ts">
  import {
    type PlayerCharacterWeapon,
    type PlayerCharacterWeaponMod,
  } from "$lib/data/parser";
  import { Select, type Selected } from "bits-ui";
  import {
    WEAPON_CATEGORIES,
    getWeaponCategory,
    type Weapon,
  } from "$lib/data/weapons";
  import WeaponModsEditor from "./WeaponModsEditor.svelte";
  import Delete from "~icons/ph/trash-fill";

  // Other selected weapon (To prevent selecting two of the same type)
  export let otherWeapon: PlayerCharacterWeapon | undefined;

  // The selected weapon in the slot
  export let weapon: PlayerCharacterWeapon | undefined;

  // Mods attached to the selected weapon
  export let weaponMods: PlayerCharacterWeaponMod[];

  $: otherWeaponCategory =
    otherWeapon !== undefined && otherWeapon.weapon !== undefined
      ? getWeaponCategory(otherWeapon.weapon)
      : undefined;

  export let editable: boolean;

  const selected: Selected<Weapon | null> | undefined =
    weapon !== undefined && weapon.weapon !== undefined
      ? { value: weapon.weapon }
      : { value: null };

  export let onChangeWeapon: (weapon: PlayerCharacterWeapon | null) => void;

  export let onChangeWeaponMods: (
    index: number,
    weaponMod: PlayerCharacterWeaponMod | null
  ) => void;

  // Only used for typing the selector
  const items: Selected<Weapon>[] = [];

  const onChangeSelected = (value: Selected<Weapon | null> | undefined) => {
    if (value !== undefined) {
      const selectedWeapon = value.value;

      onChangeWeapon(
        selectedWeapon
          ? {
              weaponIndex: selectedWeapon.level_index,
              weapon: selectedWeapon,
            }
          : null
      );
    } else {
      onChangeWeapon(null);
    }
  };
</script>

<div class="weapon">
  <Select.Root
    {items}
    {selected}
    onSelectedChange={onChangeSelected}
    disabled={!editable}
  >
    <Select.Trigger class="weapon-slot-button">
      {#if weapon !== undefined}
        {#if weapon.weapon !== undefined}
          <img
            class="weapon-select__image"
            src={`/assets/weapons/${weapon.weapon.image}`}
            alt={weapon.weapon.name}
            width={160}
            height={120}
          />

          <div class="weapon-slot-button__details">
            <span class="weapon-select__name">{weapon.weapon.name}</span>
            {#if editable}
              <span class="weapon-select__change">Click to change</span>
            {/if}
          </div>

          <button
            class="weapon-slot-button__remove"
            on:click={(event) => {
              event.preventDefault();
              onChangeSelected({ value: null });
            }}
          >
            <Delete />
          </button>
        {:else}
          <span class="weapon-select__name">Unknown Weapon</span>
        {/if}
      {:else}
        <div class="weapon-slot-button__details">
          <p>No Weapon Selected</p>
        </div>
      {/if}
    </Select.Trigger>
    <Select.Content sameWidth={false}>
      <Select.Group>
        <Select.Item value={null}>
          <div class="weapon-select">None</div>
        </Select.Item>
      </Select.Group>

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

  {#if weapon !== undefined && weapon.weapon !== undefined}
    <WeaponModsEditor
      weapon={weapon.weapon}
      {weaponMods}
      {editable}
      {onChangeWeaponMods}
    />
  {/if}
</div>

<style lang="scss">
  .weapon {
    display: flex;
    flex-flow: column;

    gap: 1rem;
  }

  .weapon-slot-button__remove {
    justify-self: flex-end;
    margin-left: auto;
    background-color: transparent;
    border: 1px solid #444;
    width: 2rem;
    height: 2rem;
    color: #fff;
    border-radius: 0.25rem;
    line-height: 0;
    cursor: pointer;
  }

  .weapon-select {
    display: flex;

    flex-flow: row;
    align-items: center;
    gap: 0.5rem;
    height: 64px;
    padding: 1rem;

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
    flex-flow: row;
    align-items: center;
    gap: 1rem;

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
    flex-flow: column;
    text-align: left;
    gap: 0.5rem;
  }
</style>
