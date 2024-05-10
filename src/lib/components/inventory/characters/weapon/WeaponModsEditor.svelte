<script lang="ts">
  import { type PlayerCharacterWeaponMod } from "$lib/api/parser";
  import type { Weapon } from "$lib/data/weapons";
  import WeaponModSlotEditor from "./WeaponModSlotEditor.svelte";

  export let weapon: Weapon;
  export let weaponMods: PlayerCharacterWeaponMod[];

  export let editable: boolean;

  export let onChangeWeaponMods: (
    index: number,
    weapon: PlayerCharacterWeaponMod | null
  ) => void;
</script>

<div class="weapon-mods">
  <WeaponModSlotEditor
    {weapon}
    weaponMod={weaponMods[0]}
    otherWeaponMod={weaponMods[1]}
    onChangeWeaponMods={(weaponMod) => onChangeWeaponMods(0, weaponMod)}
    {editable}
  />

  <WeaponModSlotEditor
    {weapon}
    weaponMod={weaponMods[1]}
    otherWeaponMod={weaponMods[0]}
    onChangeWeaponMods={(weaponMod) => onChangeWeaponMods(1, weaponMod)}
    {editable}
  />
</div>

<style lang="scss">
  .weapon-mods {
    display: flex;
    flex-flow: row;
    gap: 1rem;
    align-items: stretch;
  }
</style>
