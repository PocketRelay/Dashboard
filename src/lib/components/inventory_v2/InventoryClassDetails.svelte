<script lang="ts">
  import { isAdmin, player } from "$lib/api/api";
  import type { PlayerClass } from "$lib/api/parser";

  export let playerClass: PlayerClass;
</script>

<div>
  <h2>{playerClass.name}</h2>
  <p>Level: {playerClass.level}</p>
  <p>Promotions: {playerClass.promotions}</p>

  {#if isAdmin($player)}
    <label class="input">
      <span class="input__label">Level</span>
      <input
        type="number"
        class="input__value"
        bind:value={playerClass.level}
        min={1}
        max={20}
      />
    </label>
    <label class="input">
      <span class="input__label">Promotions</span>
      <input
        type="number"
        class="input__value"
        bind:value={playerClass.promotions}
        min={1}
        max={20}
      />
    </label>
  {/if}
</div>

<style>
</style>
