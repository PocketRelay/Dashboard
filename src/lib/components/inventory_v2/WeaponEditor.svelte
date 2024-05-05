<script lang="ts">
  import type { PlayerCharacter, PlayerCharacterWeapon } from "$lib/api/parser";
  import WeaponSlotEditor from "./WeaponSlotEditor.svelte";

  export let playerCharacter: PlayerCharacter;
  export let editable: boolean;

  let onChangeWeapon = (
    index: number,
    weapon: PlayerCharacterWeapon | undefined
  ) => {
    if (weapon !== undefined) {
      if (index >= playerCharacter.weapons.length) {
        playerCharacter.weapons.push(weapon);
      } else {
        playerCharacter.weapons[index] = weapon;
      }
    } else {
      if (index < playerCharacter.weaponMods.length) {
        delete playerCharacter.weapons[index];
      }
    }
  };
</script>

<div class="weapon-slots">
  <WeaponSlotEditor
    weapon={playerCharacter.weapons[0]}
    onChangeWeapon={(weapon) => onChangeWeapon(0, weapon)}
    {editable}
  />
  <WeaponSlotEditor
    weapon={playerCharacter.weapons[1]}
    onChangeWeapon={(weapon) => onChangeWeapon(1, weapon)}
    {editable}
  />
</div>

<style lang="scss">
  .weapon-slots {
    display: flex;
    gap: 1rem;
  }
</style>
