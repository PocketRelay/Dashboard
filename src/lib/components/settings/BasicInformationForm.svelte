<script lang="ts">
  import { player } from "$lib/api/api";
  import { setSelfDetailsRequest, type PlayerAccount } from "$lib/api/players";
  import Loader from "$lib/components/Loader.svelte";
  import Account from "~icons/ph/user-fill";
  import { createMutation } from "@tanstack/svelte-query";

  let username: string;
  let email: string;

  const updateBasicMutation = createMutation({
    mutationFn: setSelfDetailsRequest,
    onSuccess: (_, request) => {
      // Update the local stored player state
      player.update((value) => {
        if (value === null) return null;

        return {
          ...value,
          email: request.email,
          display_name: request.username,
        };
      });
    },
  });

  function setDefaults(account: PlayerAccount | null) {
    if (account === null) return;

    username = account.display_name;
    email = account.email;
  }

  // Update the initial values with the player details
  $: setDefaults($player);
</script>

<form
  class="form card"
  on:submit|preventDefault={() => {
    $updateBasicMutation.mutate({
      username,
      email,
    });
  }}
>
  <h2 class="form__title">
    <Account class="form__icon" /> Basic Information
  </h2>
  <p class="text">Here you can modify your basic account information</p>
  {#if $updateBasicMutation.isError}
    <p class="error">{$updateBasicMutation.error}</p>
  {/if}
  {#if $updateBasicMutation.isPending}
    <Loader />
  {/if}
  <label class="input">
    <span class="input__label">Username</span>
    <input class="input__value" type="text" bind:value={username} required />
  </label>
  <label class="input">
    <span class="input__label">Email</span>
    <input class="input__value" type="email" bind:value={email} required />
  </label>
  <button type="submit" class="button align-start">Save Changes</button>
</form>
