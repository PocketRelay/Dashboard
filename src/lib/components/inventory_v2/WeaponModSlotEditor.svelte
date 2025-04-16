<script lang="ts">
  import { type PlayerCharacterWeaponMod } from "$lib/api/parser";
  import { Select, type Selected } from "bits-ui";
  import { getWeaponType, type Weapon } from "$lib/data/weapons";
  import { getModsForWeaponType, type WeaponMod } from "$lib/data/weapon_mods";

  export let weapon: Weapon;

  // Other selected weapon mod (To prevent selecting two of the same type)
  export let otherWeaponMod: PlayerCharacterWeaponMod | undefined;

  // TODO: Filter to ignore matching types with the other weapon mod
  $: availableMods =
    weapon !== undefined
      ? getModsForWeaponType(getWeaponType(weapon)).filter(
          (mod) =>
            otherWeaponMod === undefined ||
            otherWeaponMod.weaponModIndex !== mod.level_index
        )
      : undefined;

  // The selected weapon mod in the slot
  export let weaponMod: PlayerCharacterWeaponMod | undefined = undefined;

  export let editable: boolean;

  const selected: Selected<WeaponMod | null> | undefined =
    weaponMod !== undefined && weaponMod.weaponMod !== undefined
      ? { value: weaponMod.weaponMod }
      : { value: null };

  export let onChangeWeaponMods: (
    weapon: PlayerCharacterWeaponMod | null
  ) => void;

  // Only used for typing the selector
  const items: Selected<WeaponMod>[] = [];

  const onChangeSelected = (value: Selected<WeaponMod | null> | undefined) => {
    if (value !== undefined) {
      const selectedWeaponMod = value.value;
      onChangeWeaponMods(
        selectedWeaponMod
          ? {
              weaponModIndex: selectedWeaponMod.level_index,
              weaponMod: selectedWeaponMod,
            }
          : null
      );
    } else {
      onChangeWeaponMods(null);
    }
  };
</script>

<Select.Root
  {items}
  {selected}
  onSelectedChange={onChangeSelected}
  disabled={!editable}
>
  <Select.Trigger class="weapon-mod-slot-button">
    {#if weaponMod !== undefined}
      {#if weaponMod.weaponMod !== undefined}
        <img
          class="weapon-mod-select__image"
          src={`/assets/weapon_mods/${weaponMod.weaponMod.image}`}
          alt={weaponMod.weaponMod.name}
          width={160}
          height={120}
        />

        <div class="weapon-mod-slot-button__details">
          <span class="weapon-mod-select__name">{weaponMod.weaponMod.name}</span
          >
          {#if editable}
            <span class="weapon-mod-select__change">Click to change</span>
          {/if}
        </div>
      {:else}
        <span class="weapon-mod-select__name">Unknown Mod</span>
      {/if}
    {:else}
      <p>No Mod Selected</p>
    {/if}
  </Select.Trigger>
  <Select.Content sameWidth={false}>
    <Select.Item value={null}>
      <div class="weapon-mod-select">
        <span class="weapon-mod-select__name">None</span>
      </div>
    </Select.Item>

    {#if availableMods}
      {#each availableMods as weaponMod}
        <Select.Item value={weaponMod}>
          <Select.ItemIndicator />

          <div class="weapon-mod-select">
            <img
              class="weapon-mod-select__image"
              src={`/assets/weapon_mods/${weaponMod.image}`}
              alt={weaponMod.name}
              width={160}
              height={120}
            />

            <span class="weapon-mod-select__name">{weaponMod.name}</span>
          </div>
        </Select.Item>
      {/each}
    {/if}
    <Select.Arrow />
  </Select.Content>
</Select.Root>

<style lang="scss">
  .weapon-mod-select {
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

    &__name {
      white-space: nowrap;
    }
  }

  :global(.weapon-mod-slot-button) {
    display: flex;
    flex-flow: row;
    align-items: center;
    gap: 1rem;

    background-color: transparent;
    border: 1px solid #444;
    color: white;
    padding: 1rem;
    padding-right: 2rem;
    cursor: pointer;
    border-radius: 0.25rem;

    .weapon-mod-select__image {
      height: 32px;
    }

    &:disabled {
      cursor: default;
    }
  }

  :global(.weapon-mod-slot-button__details) {
    display: flex;
    flex-flow: column;
    text-align: left;
    gap: 0.5rem;
  }
</style>
