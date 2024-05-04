<script lang="ts">
  import { type PlayerCharacterPower, type PlayerData } from "$lib/api/parser";
  import type { Power } from "$lib/data/powers";

  export let playerData: PlayerData;
  export let powerData: PlayerCharacterPower;

  const power: Power = powerData.power!;
</script>

<div class="power-level">
  <div>
    <div class="power-icon rank-1">
      <img
        src={`/assets/powers/${power.iconSet}.png`}
        alt={power.evolutions[0].name}
      />
    </div>
    <p class="power-level-name">{power.evolutions[0].name}</p>
  </div>
  <div class="meter">
    <div
      class="meter-cell"
      class:meter-cell--active={powerData.powerProgress > 0}
    ></div>
    <div
      class="meter-cell"
      class:meter-cell--active={powerData.powerProgress > 1}
    ></div>
    <div
      class="meter-cell"
      class:meter-cell--active={powerData.powerProgress > 2}
    ></div>
    <div
      class="meter-cell"
      class:meter-cell--active={powerData.powerProgress > 3}
    ></div>
    <div
      class="meter-cell"
      class:meter-cell--active={powerData.powerProgress > 4}
    ></div>
    <div
      class="meter-cell"
      class:meter-cell--active={powerData.powerProgress > 5}
    ></div>
  </div>
</div>

<style lang="scss">
  .power-level {
    justify-content: space-between;
    align-items: center;
    display: flex;
    gap: 1rem;
  }

  .power-level-name {
    font-size: 0.75rem;
    text-align: center;
  }

  .meter {
    display: flex;
  }

  .meter-cell {
    width: 2rem;
    height: 2rem;
    border: 1px solid #444;
  }

  .meter-cell--active {
    background-color: #fff;
  }

  .character {
    display: flex;
    gap: 1rem;
    align-items: center;
    border: 1px solid #444;
    padding: 1rem;
    border-radius: 0.25rem;

    &__icon {
      width: auto;
      height: 280px;
      margin-right: 1rem;
      padding: 0 2rem 0 1rem;
      border-right: 1px solid #444;
    }

    &__details {
      display: flex;
      flex-flow: column;
      gap: 1rem;
    }
  }
</style>
