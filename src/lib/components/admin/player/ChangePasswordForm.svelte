<script lang="ts">
  import { setPlayerPassword, type PlayerAccount } from "$lib/api/players";
  import Dialog from "$lib/components/Dialog.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import { createMutation } from "@tanstack/svelte-query";
  import Key from "~icons/ph/key-fill";

  export let player: PlayerAccount;

  let confirmPasswordInput: HTMLInputElement;

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

  function submit() {
    if (confirmPasswordInput === undefined) return;
    if (password !== confirmPassword) {
      confirmPasswordInput.setCustomValidity("Passwords must match");
      return;
    }
    showConfirm = true;
  }
</script>

<form class="form card" on:submit|preventDefault={submit}>
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
    class="button"
    disabled={$changePasswordMutation.isPending}
  >
    Change Password
  </button>
</form>

<!-- Password change confirmation -->
<Dialog visible={showConfirm}>
  <h3>Confirm Change Password</h3>
  <p class="text">Are you sure you want to change this accounts password?</p>

  <div class="button-group">
    <button
      class="button button--dark"
      on:click={() => $changePasswordMutation.mutate()}
    >
      Confirm
    </button>
    <button class="button button--dark" on:click={() => (showConfirm = false)}>
      Cancel
    </button>
  </div>
</Dialog>
