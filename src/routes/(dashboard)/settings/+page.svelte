<script lang="ts">
  import { goto } from "$app/navigation";
  import { clearToken, player } from "$lib/api/api";
  import {
    deleteSelf,
    setSelfDetails,
    setSelfPassword,
    type PlayerAccount,
  } from "$lib/api/players";
  import DashboardPage from "$lib/components/DashboardPage.svelte";
  import Dialog from "$lib/components/Dialog.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import Account from "~icons/ph/user-fill";
  import Delete from "~icons/ph/trash-fill";
  import { base } from "$app/paths";
  import Key from "~icons/ph/key-fill";
  import { createMutation } from "@tanstack/svelte-query";

  // Basic state adding username and email fields to the form
  type BasicState = {
    // The new account username
    username: string;
    // The new account email
    email: string;
  };

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

  // Delete state for account deletion
  type DeleteState = {
    // The account password
    password: string;
    // Whether the confirm screen is shown
    showConfirm: boolean;
  };

  const basic: BasicState = {
    username: "",
    email: "",
  };

  const password: PasswordState = {
    current: "",
    new: "",
    confirm: "",
    showConfirm: false,
    error: undefined,
  };

  const deleteState: DeleteState = {
    password: "",
    showConfirm: false,
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

  const updatePasswordMutation = createMutation({
    mutationFn: async () => {
      await setSelfPassword(password.current, password.new);
    },
  });

  const deleteMutation = createMutation({
    mutationFn: async () => {
      deleteState.showConfirm = false;

      await deleteSelf(deleteState.password);

      // Account was deleted update all associated state and redirect to login
      clearToken();
      await goto(`${base}/login`);
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

  function promptDelete() {
    deleteState.showConfirm = true;
  }

  function setDefaults(account: PlayerAccount) {
    basic.username = account.display_name;
    basic.email = account.email;
  }

  // Update the initial values with the player details
  $: setDefaults($player);
</script>

<DashboardPage title="Settings" text="Edit the settings for your account below">
  <div class="forms">
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
    <form class="form card" on:submit|preventDefault={promptDelete}>
      <h2 class="form__title">
        <Delete class="form__icon" />
        Delete Account
      </h2>
      <p class="text">
        <span class="danger">DANGER ZONE</span> Warning deleting your account is
        permanent and cannot be reversed
      </p>
      {#if $updatePasswordMutation.isError}
        <p class="error">{$updatePasswordMutation.error}</p>
      {/if}
      {#if $updatePasswordMutation.isPending}
        <Loader />
      {/if}

      <button type="submit" class="button button--danger">Delete Account</button
      >
    </form>
  </div>
</DashboardPage>

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

<!-- Account deletion confirmation -->
<Dialog visible={deleteState.showConfirm}>
  <h3>Confirm Account Deletion</h3>
  <p class="text">
    <span class="danger">WARNING:</span> Account Deletion is
    <b>perminent</b> and cannot be reversed enter your password below to confirm
    deletion
  </p>

  <label class="input">
    <span class="input__label"> Password</span>
    <input
      class="input__value"
      type="password"
      bind:value={deleteState.password}
      required
      autocomplete="current-password"
    />
  </label>
  <div class="button-group">
    <button
      class="button button--danger"
      on:click={() => $deleteMutation.mutate()}
    >
      Confirm
    </button>
    <button
      class="button button--alt"
      on:click={() => (deleteState.showConfirm = false)}
    >
      Cancel
    </button>
  </div>
</Dialog>
