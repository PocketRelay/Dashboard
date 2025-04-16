<script lang="ts" context="module">
  // Path chosen when upgrading the power
  export enum Path {
    A = 0,
    B = 1,
  }
</script>

<script lang="ts">
  import {
    replaceTemplates,
    type Power,
    type PowerEvolution,
  } from "$lib/data/powers";
  import { Tooltip } from "bits-ui";

  export let index: number;
  export let editable: boolean;

  export let active: boolean;
  export let power: Power;
  export let onClickEvolution: VoidFunction;

  const evolution: PowerEvolution = power.evolutions[index];
</script>

<Tooltip.Root openDelay={100}>
  <Tooltip.Trigger>
    <button
      class="evolution"
      class:evolution--active={active}
      on:click={onClickEvolution}
      disabled={!editable}
    >
      <div class="evolution-icon" data-index={index}>
        <img src={`/assets/powers/${power.iconSet}.png`} alt={evolution.name} />
      </div>
      <p class="evolution-name">{evolution.name}</p>
    </button>
  </Tooltip.Trigger>

  <Tooltip.Content>
    <Tooltip.Arrow />

    <p class="evolution-description">
      {replaceTemplates(evolution.description, evolution.attributes)}
    </p>
  </Tooltip.Content>
</Tooltip.Root>

<style lang="scss">
  .evolution-description {
    max-width: 300px;
  }

  .evolution {
    cursor: pointer;
    display: flex;
    align-items: center;
    flex-flow: column;
    border: 1px solid #444;
    width: 10rem;
    padding: 0.5rem;
    flex-shrink: 0;
    background-color: transparent;

    &--active {
      background-color: #333;
    }
  }

  .evolution-name {
    font-size: 0.75rem;
    color: white;
    text-align: center;
  }
  .evolution-icon {
    height: 64px;
    overflow: hidden;
    width: 64px;
  }
  .evolution-icon > img {
    height: 128px;
    position: relative;
    // Scale the image down 50%.
    width: 384px;
  }

  .evolution-icon[data-index="0"] > img {
    left: 0;
  }
  .evolution-icon[data-index="1"] > img {
    left: -64px;
  }
  .evolution-icon[data-index="2"] > img {
    left: -128px;
  }
  .evolution-icon[data-index="3"] > img {
    left: -192px;
  }

  .evolution-icon[data-index="4"] > img {
    left: -192px;
    top: -64px;
  }
  .evolution-icon[data-index="5"] > img {
    left: -256px;
  }
  .evolution-icon[data-index="6"] > img {
    left: -256px;
    top: -64px;
  }
  .evolution-icon[data-index="7"] > img {
    left: -320px;
  }
  .evolution-icon[data-index="8"] > img {
    left: -320px;
    top: -64px;
  }
</style>
