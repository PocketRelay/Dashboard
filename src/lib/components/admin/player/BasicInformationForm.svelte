<script lang="ts">
  import { setPlayerDetails, type PlayerAccount } from "$lib/api/players";
  import Loader from "$lib/components/Loader.svelte";
  import { createMutation, useQueryClient } from "@tanstack/svelte-query";
  import UserIcon from "~icons/ph/user-fill";

  export let player: PlayerAccount;

  let displayName: string = "";
  let email: string = "";

  const client = useQueryClient();

  // Mutation to update the player details
  const updateBasicMutation = createMutation({
    mutationFn: () => setPlayerDetails(player.id, displayName, email),

    onMutate: () => {
      // Update the stored player data to match
      client.setQueryData(
        ["player", player.id],
        (previousData: PlayerAccount) => ({
          ...previousData,
          display_name: displayName,
          email,
        })
      );
    },
    // Invalidate the current player details
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["player", player.id] });
    },
  });

  // Update the form data to match the player state
  $: {
    displayName = player.display_name;
    email = player.email;
  }
</script>

<form
  class="form card"
  on:submit|preventDefault={() => $updateBasicMutation.mutate()}
>
  <h2 class="form__title">
    <UserIcon class="form__icon" /> Basic Information
  </h2>
  <p class="text">Modify basic account information</p>
  {#if $updateBasicMutation.isError}
    <p class="error">{$updateBasicMutation.error}</p>
  {/if}
  {#if $updateBasicMutation.isPending}
    <Loader />
  {/if}

  <label class="input">
    <span class="input__label">Username</span>
    <input
      class="input__value"
      type="text"
      bind:value={player.display_name}
      required
    />
  </label>

  <label class="input">
    <span class="input__label">Email</span>
    <input
      class="input__value"
      type="email"
      bind:value={player.email}
      required
    />
  </label>

  <button
    type="submit"
    class="button"
    disabled={$updateBasicMutation.isPending}
  >
    Save Changes
  </button>
</form>
