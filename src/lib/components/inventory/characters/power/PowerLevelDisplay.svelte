<script lang="ts">
  import { type PlayerCharacterPower } from "$lib/data/parser";

  export let powerData: PlayerCharacterPower;

  $: power = powerData.power!;
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
</style>
