<script lang="ts">
  import { type PlayerData } from "$lib/data/parser";

  import CreditsEditor from "./CreditsEditor.svelte";

  export let playerData: PlayerData;
  export let editable: boolean;
</script>

<div class="weapons-grid">
  <CreditsEditor bind:playerData {editable} />
</div>

<style lang="scss">
  .weapons-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 1rem;
  }

  @media screen and (max-width: 1700px) {
    .weapons-grid {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  @media screen and (max-width: 1400px) {
    .weapons-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media screen and (max-width: 1000px) {
    .weapons-grid {
      grid-template-columns: 1fr;
    }
  }

  :global(.weapon-tabs) {
    position: relative;

    display: flex;
    padding: 1rem 0;
    border-bottom: 1px solid #333;
    margin-bottom: 1rem;
  }

  :global(.weapon-tab) {
    display: flex;
    flex-flow: column;
    border: none;
    background-color: transparent;
    text-align: center;
    color: white;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border: 1px solid transparent;
  }

  :global(.weapon-tab[data-state="active"]) {
    background-color: #222;
    border: 1px solid #333;
    border-radius: 0.25rem;
  }
</style>
