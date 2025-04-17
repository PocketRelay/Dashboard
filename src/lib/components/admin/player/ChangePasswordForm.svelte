<script lang="ts">
  import { setPlayerPassword, type PlayerAccount } from "$lib/api/players";
  import Dialog from "$lib/components/Dialog.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import UtcTimestamp from "$lib/components/UtcTimestamp.svelte";
  import { createMutation } from "@tanstack/svelte-query";
  import Key from "~icons/ph/key-fill";

  export let player: PlayerAccount;

  let confirmPasswordInput: HTMLInputElement | undefined;

  let password: string = "";
  let confirmPassword: string = "";
  let showConfirm: boolean = false;

  // Mutation to update the player details
  const changePasswordMutation = createMutation({
    mutationFn: () => setPlayerPassword(player.id, password),
    onSettled: () => {
      showConfirm = false;
    },
  });

  $: {
    if (password !== confirmPassword) {
      confirmPasswordInput?.setCustomValidity("Password must match");
    } else {
      confirmPasswordInput?.setCustomValidity("");
    }
  }
</script>

<form
  class="form card"
  on:submit|preventDefault={() => {
    showConfirm = true;
  }}
>
  <h2 class="form__title">
    <Key class="form__icon" /> Password
  </h2>
  <p class="text">Change the account password to the provided password</p>

  {#if $changePasswordMutation.isError}
    <p class="error">{$changePasswordMutation.error}</p>
  {/if}

  {#if $changePasswordMutation.isPending}
    <Loader />
  {/if}

  <label class="input">
    <span class="input__label">New Password</span>
    <input
      class="input__value"
      type="password"
      bind:value={password}
      required
      autocomplete="off"
    />
  </label>
  <label class="input">
    <span class="input__label">Confirm Password</span>
    <input
      class="input__value"
      type="password"
      bind:value={confirmPassword}
      required
      autocomplete="off"
      bind:this={confirmPasswordInput}
    />
  </label>

  <button
    type="submit"
    class="button align-start"
    disabled={$changePasswordMutation.isPending}
  >
    Change Password
  </button>

  {#if player.last_login_at !== null}
    <p class="last-login">
      Last login at: <UtcTimestamp timestamp={player.last_login_at} />
    </p>
  {/if}
</form>

<!-- Password change confirmation -->
<Dialog visible={showConfirm}>
  <h3>Confirm Change Password</h3>
  <p class="text">Are you sure you want to change this accounts password?</p>

  <div class="button-group">
    <button class="button" on:click={() => $changePasswordMutation.mutate()}>
      Confirm
    </button>
    <button class="button" on:click={() => (showConfirm = false)}>
      Cancel
    </button>
  </div>
</Dialog>

<style lang="scss">
  .last-login {
    color: #999;
  }
</style>
