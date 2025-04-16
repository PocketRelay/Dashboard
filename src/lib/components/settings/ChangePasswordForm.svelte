<script lang="ts">
  import { setSelfPassword } from "$lib/api/players";
  import Dialog from "$lib/components/Dialog.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import Key from "~icons/ph/key-fill";
  import { createMutation } from "@tanstack/svelte-query";

  // Password state adding password fields to the form
  type PasswordState = {
    // The current password
    current: string;
    // The new password
    new: string;
    // The password confirmation value
    confirm: string;
    // Show the confirmation screen
    showConfirm: boolean;
    // Error
    error: string | undefined;
  };

  const password: PasswordState = {
    current: "",
    new: "",
    confirm: "",
    showConfirm: false,
    error: undefined,
  };

  const updatePasswordMutation = createMutation({
    mutationFn: async () => {
      await setSelfPassword(password.current, password.new);
    },
  });

  /**
   * Toggles the confirm password screen if the provided
   * password values are valid
   */
  function promptConfirmChange() {
    // Fail if the passwords don't match
    if (password.new !== password.confirm) {
      password.error = "Passwords don't match";
      return;
    }

    // Don't allow empty password fields
    if (
      password.new.length <= 0 ||
      password.confirm.length <= 0 ||
      password.current.length <= 0
    ) {
      password.error = "Passwords cannot be empty";
      return;
    }

    // Display the confirm dialog
    password.showConfirm = true;
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
  {#if password.error}
    <p class="error">{password.error}</p>
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
      bind:value={password.current}
      required
      autocomplete="current-password"
    />
  </label>
  <label class="input">
    <span class="input__label">New Password</span>
    <input
      class="input__value"
      type="password"
      bind:value={password.new}
      required
      autocomplete="off"
    />
  </label>
  <label class="input">
    <span class="input__label">Confirm Password</span>
    <input
      class="input__value"
      type="password"
      bind:value={password.confirm}
      required
      autocomplete="off"
    />
  </label>
  <button type="submit" class="button">Change Password</button>
</form>

<!-- Password change confirmation -->
<Dialog visible={password.showConfirm}>
  <h3>Confirm Change Password</h3>
  <p class="text">Are you sure you want to change your account password?</p>

  <div class="button-group">
    <button
      class="button button--alt"
      on:click={() => $updatePasswordMutation.mutate()}
    >
      Confirm
    </button>
    <button
      class="button button--alt"
      on:click={() => (password.showConfirm = false)}
    >
      Cancel
    </button>
  </div>
</Dialog>
