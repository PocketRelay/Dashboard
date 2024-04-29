<script lang="ts">
  import {
    getPlayerCharacters,
    type PlayerCharacter,
    type PlayerClass,
    type PlayerData,
  } from "$lib/api/parser";

  import { Tabs } from "bits-ui";
  import InventoryClassDetails from "./InventoryClassDetails.svelte";

  export let playerData: PlayerData;
  export let playerCharacter: PlayerCharacter;
</script>

<img
  src={`/assets/characters/${playerCharacter.character.image}`}
  alt={playerCharacter.character.name}
  width={140}
  height={280}
/>

<h2>{playerCharacter.characterName}</h2>
<p>{playerCharacter.character.name}</p>

<style lang="scss">
</style>
