<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import {
    PlayerRole,
    deletePlayerRequest,
    type PlayerAccount,
  } from "$lib/api/players";
  import Dialog from "$lib/components/Dialog.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import { createMutation, useQueryClient } from "@tanstack/svelte-query";
  import { player as selfPlayer } from "$lib/api/api";
  import Delete from "~icons/ph/trash-fill";

  export let player: PlayerAccount;

  let confirmDelete: boolean = false;

  const client = useQueryClient();

  // Mutation to update the player details
  const deleteAccountMutation = createMutation({
    mutationFn: deletePlayerRequest,
    // Invalidate the current player details
    onSuccess: () => {
      // Invalidate query for the player
      client.invalidateQueries({ queryKey: ["player", player.id] });

      // Redirect to players list
      goto(`${base}/players`);

      // TODO: Invalid players list queries?
    },
  });
</script>

<form
  class="form card"
  class:form--wide={$selfPlayer?.role !== PlayerRole.SuperAdmin}
  on:submit|preventDefault={() => (confirmDelete = true)}
>
  <h2 class="form__title">
    <Delete class="form__icon" />
    Delete Account
  </h2>
  <p class="text">
    <span class="danger">DANGER ZONE</span> Warning deleting an account is perminent
    and cannot be reversed
  </p>
  {#if $deleteAccountMutation.isError}
    <p class="error">{$deleteAccountMutation.error}</p>
  {/if}
  {#if $deleteAccountMutation.isPending}
    <Loader />
  {/if}

  <button type="submit" class="button button--danger align-start"
    >Delete Account</button
  >
</form>

<!-- Account deletion confirmation -->
<Dialog visible={confirmDelete}>
  <h3>Confirm Account Deletion</h3>
  <p class="text">
    <span class="danger">WARNING:</span> Account Deletion is
    <b>permanent</b> and cannot be reversed
  </p>

  <div class="button-group">
    <button
      class="button button--danger"
      on:click={() => $deleteAccountMutation.mutate(player.id)}
    >
      Confirm
    </button>
    <button class="button" on:click={() => (confirmDelete = false)}>
      Cancel
    </button>
  </div>
</Dialog>
