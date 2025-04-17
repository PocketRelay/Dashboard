<script lang="ts">
  import { setSelfPasswordRequest } from "$lib/api/players";
  import Dialog from "$lib/components/Dialog.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import Key from "~icons/ph/key-fill";
  import { createMutation } from "@tanstack/svelte-query";

  let passwordCurrent: string = "";
  let passwordNew: string = "";
  let passwordConfirm: string = "";

  let showConfirm: boolean = false;
  let error: string | undefined = undefined;

  const updatePasswordMutation = createMutation({
    mutationFn: setSelfPasswordRequest,
  });

  /**
   * Toggles the confirm password screen if the provided
   * password values are valid
   */
  function promptConfirmChange() {
    // Fail if the passwords don't match
    if (passwordNew !== passwordConfirm) {
      error = "Passwords don't match";
      return;
    }

    // Don't allow empty password fields
    if (
      passwordNew.length <= 0 ||
      passwordConfirm.length <= 0 ||
      passwordCurrent.length <= 0
    ) {
      error = "Passwords cannot be empty";
      return;
    }

    // Display the confirm dialog
    showConfirm = true;
  }
</script>

<form class="form card" on:submit|preventDefault={promptConfirmChange}>
  <h2 class="form__title">
    <Key class="form__icon" />
    Password
  </h2>
  <p class="text">
    Here you can change your account password using your current password
  </p>
  {#if error}
    <p class="error">{error}</p>
  {/if}

  {#if $updatePasswordMutation.isError}
    <p class="error">{$updatePasswordMutation.error}</p>
  {/if}

  {#if $updatePasswordMutation.isPending}
    <Loader />
  {/if}

  <label class="input">
    <span class="input__label">Current Password</span>
    <input
      class="input__value"
      type="password"
      bind:value={passwordCurrent}
      required
      autocomplete="current-password"
    />
  </label>
  <label class="input">
    <span class="input__label">New Password</span>
    <input
      class="input__value"
      type="password"
      bind:value={passwordNew}
      required
      autocomplete="off"
    />
  </label>
  <label class="input">
    <span class="input__label">Confirm Password</span>
    <input
      class="input__value"
      type="password"
      bind:value={passwordConfirm}
      required
      autocomplete="off"
    />
  </label>
  <button type="submit" class="button">Change Password</button>
</form>

<!-- Password change confirmation -->
<Dialog visible={showConfirm}>
  <h3>Confirm Change Password</h3>
  <p class="text">Are you sure you want to change your account password?</p>

  <div class="button-group">
    <button
      class="button button--alt"
      on:click={() => {
        $updatePasswordMutation.mutate({
          current_password: passwordCurrent,
          new_password: passwordNew,
        });
      }}
    >
      Confirm
    </button>
    <button class="button button--alt" on:click={() => (showConfirm = false)}>
      Cancel
    </button>
  </div>
</Dialog>
