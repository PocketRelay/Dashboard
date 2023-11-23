<!-- Component for requiring authentication before displaying the slot -->
<script lang="ts">
  import { goto } from "$app/navigation";
  import { loadPlayer, player } from "$lib/api/api";
  import { onMount } from "svelte";
  import Loader from "./Loader.svelte";
  import { base } from "$app/paths";

  const enum State {
    Loading = 0,
    Loaded = 1,
  }

  let state = State.Loading;

  onMount(async () => {
    state = State.Loading;

    let loaded = await loadPlayer();

    if (!loaded) {
      await goto(`${base}/login`);
    } else {
      state = State.Loaded;
    }
  });
</script>

{#if state === State.Loading}
  <Loader />
{:else if state === State.Loaded && $player}
  <slot />
{/if}
