<script lang="ts">
  import { player } from "$lib/api/api";
  import { setSelfDetails, type PlayerAccount } from "$lib/api/players";
  import Loader from "$lib/components/Loader.svelte";
  import Account from "~icons/ph/user-fill";
  import { createMutation } from "@tanstack/svelte-query";

  // Basic state adding username and email fields to the form
  type BasicState = {
    // The new account username
    username: string;
    // The new account email
    email: string;
  };

  const basic: BasicState = {
    username: "",
    email: "",
  };

  const updateBasicMutation = createMutation({
    mutationFn: async () => {
      await setSelfDetails(basic.username, basic.email);
      // Update the local stored player state
      player.update((value) => {
        value.email = basic.email;
        value.display_name = basic.username;
        return value;
      });
    },
  });

  function setDefaults(account: PlayerAccount) {
    basic.username = account.display_name;
    basic.email = account.email;
  }

  // Update the initial values with the player details
  $: setDefaults($player);
</script>

<form
  class="form card"
  on:submit|preventDefault={() => $updateBasicMutation.mutate()}
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
    <input
      class="input__value"
      type="text"
      bind:value={basic.username}
      required
    />
  </label>
  <label class="input">
    <span class="input__label">Email</span>
    <input
      class="input__value"
      type="email"
      bind:value={basic.email}
      required
    />
  </label>
  <button type="submit" class="button">Save Changes</button>
</form>
