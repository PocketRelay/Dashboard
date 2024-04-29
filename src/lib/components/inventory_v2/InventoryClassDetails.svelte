<script lang="ts">
  import { isAdmin, player } from "$lib/api/api";
  import type { PlayerClass } from "$lib/api/parser";
  import LevelInput from "../inventory/LevelInput.svelte";

  export let playerClass: PlayerClass;
</script>

<div class="class-details">
  <img
    src={`/assets/icons/${playerClass.name}.webp`}
    alt={playerClass.name}
    width="160"
    height="120"
  />

  <div>
    <h2>{playerClass.name}</h2>
    <p><b>Level</b>: {playerClass.level}</p>
    <p><b>Promotions</b>: {playerClass.promotions}</p>
  </div>

  {#if isAdmin($player)}
    <div class="input">
      <span class="input__label">Level</span>
      <LevelInput bind:value={playerClass.level} min={1} max={20} />
    </div>
    <div class="input">
      <span class="input__label">Promotions</span>
      <LevelInput bind:value={playerClass.promotions} min={0} max={20} />
    </div>
  {/if}
</div>

<style>
  .class-details {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #444;
    margin-bottom: 2rem;
    align-items: center;
  }
</style>
