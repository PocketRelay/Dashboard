<script lang="ts">
  import { goto } from "$app/navigation";
  import { clearToken } from "$lib/api/api";
  import { deleteSelf } from "$lib/api/players";
  import Dialog from "$lib/components/Dialog.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import Delete from "~icons/ph/trash-fill";
  import { base } from "$app/paths";
  import { createMutation } from "@tanstack/svelte-query";

  // Delete state for account deletion
  type DeleteState = {
    // The account password
    password: string;
    // Whether the confirm screen is shown
    showConfirm: boolean;
  };

  const deleteState: DeleteState = {
    password: "",
    showConfirm: false,
  };

  const deleteMutation = createMutation({
    mutationFn: async () => {
      deleteState.showConfirm = false;

      await deleteSelf(deleteState.password);

      // Account was deleted update all associated state and redirect to login
      clearToken();
      await goto(`${base}/login`);
    },
  });

  function promptDelete() {
    deleteState.showConfirm = true;
  }
</script>

<form class="form card" on:submit|preventDefault={promptDelete}>
  <h2 class="form__title">
    <Delete class="form__icon" />
    Delete Account
  </h2>
  <p class="text">
    <span class="danger">DANGER ZONE</span> Warning deleting your account is permanent
    and cannot be reversed
  </p>
  {#if $deleteMutation.isError}
    <p class="error">{$deleteMutation.error}</p>
  {/if}
  {#if $deleteMutation.isPending}
    <Loader />
  {/if}

  <button type="submit" class="button button--danger">Delete Account</button>
</form>

<!-- Account deletion confirmation -->
<Dialog visible={deleteState.showConfirm}>
  <h3>Confirm Account Deletion</h3>
  <p class="text">
    <span class="danger">WARNING:</span> Account Deletion is
    <b>permanent</b> and cannot be reversed enter your password below to confirm
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
