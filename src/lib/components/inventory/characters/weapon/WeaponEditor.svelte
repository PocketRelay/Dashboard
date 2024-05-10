<script lang="ts">
  import type {
    PlayerCharacter,
    PlayerCharacterWeapon,
    PlayerCharacterWeaponMod,
    PlayerCharacterWeaponMods,
  } from "$lib/data/parser";
  import WeaponSlotEditor from "./WeaponSlotEditor.svelte";

  export let playerCharacter: PlayerCharacter;
  export let editable: boolean;

  let onChangeWeapon = (
    index: number,
    weapon: PlayerCharacterWeapon | null
  ) => {
    if (weapon !== null) {
      if (index >= playerCharacter.weapons.length) {
        playerCharacter.weapons.push(weapon);
      } else {
        playerCharacter.weapons[index] = weapon;
      }
    } else {
      if (index < playerCharacter.weapons.length) {
        playerCharacter.weapons.splice(index, 1);
      }
    }

    playerCharacter.weapons = playerCharacter.weapons;
  };

  function getWeaponMods(
    index: number,
    weaponMods: PlayerCharacterWeaponMods[]
  ): PlayerCharacterWeaponMod[] {
    const weapon = playerCharacter.weapons[index];
    if (weapon == undefined) return [];
    const mods = weaponMods.find(
      (weaponMod) => weaponMod.weapon.weaponIndex === weapon.weaponIndex
    );
    return mods?.weaponMods ?? [];
  }

  let onChangeWeaponMod = (
    weaponIndex: number,
    weaponModIndex: number,
    weaponMod: PlayerCharacterWeaponMod | null
  ) => {
    const charWeapon = playerCharacter.weapons[weaponIndex];
    if (charWeapon === undefined) return;

    const existingWeaponMods = playerCharacter.weaponMods.find(
      (value) => value.weapon.weaponIndex === charWeapon.weaponIndex
    );

    if (existingWeaponMods !== undefined) {
      if (weaponMod !== null) {
        if (weaponModIndex >= existingWeaponMods.weaponMods.length) {
          existingWeaponMods.weaponMods.push(weaponMod);
        } else {
          existingWeaponMods.weaponMods[weaponModIndex] = weaponMod;
        }
      } else {
        if (weaponModIndex < existingWeaponMods.weaponMods.length) {
          existingWeaponMods.weaponMods.splice(weaponModIndex, 1);
        }
      }
    } else {
      playerCharacter.weaponMods.push({
        weapon: charWeapon,
        weaponMods: weaponMod ? [weaponMod] : [],
      });
    }

    playerCharacter.weaponMods = playerCharacter.weaponMods;
  };
</script>

<div class="weapon-slots">
  <WeaponSlotEditor
    weapon={playerCharacter.weapons[0]}
    weaponMods={getWeaponMods(0, playerCharacter.weaponMods)}
    otherWeapon={playerCharacter.weapons[1]}
    onChangeWeapon={(weapon) => onChangeWeapon(0, weapon)}
    onChangeWeaponMods={(modIndex, weaponMod) =>
      onChangeWeaponMod(0, modIndex, weaponMod)}
    {editable}
  />
  <WeaponSlotEditor
    weapon={playerCharacter.weapons[1]}
    weaponMods={getWeaponMods(1, playerCharacter.weaponMods)}
    otherWeapon={playerCharacter.weapons[0]}
    onChangeWeapon={(weapon) => onChangeWeapon(1, weapon)}
    onChangeWeaponMods={(modIndex, weaponMod) =>
      onChangeWeaponMod(1, modIndex, weaponMod)}
    {editable}
  />
</div>

<style lang="scss">
  .weapon-slots {
    display: flex;
    gap: 1rem;
  }
</style>
