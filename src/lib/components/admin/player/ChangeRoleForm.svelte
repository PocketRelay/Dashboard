<script lang="ts">
  import {
    PlayerRole,
    setPlayerRole,
    type PlayerAccount,
  } from "$lib/api/players";
  import Loader from "$lib/components/Loader.svelte";
  import { createMutation, useQueryClient } from "@tanstack/svelte-query";
  import AccountCog from "~icons/ph/user-gear-fill";

  export let player: PlayerAccount;

  let role: PlayerRole = player.role;

  const roles: PlayerRole[] = [PlayerRole.Default, PlayerRole.Admin];

  const client = useQueryClient();

  // Mutation to update the player details
  const changeRoleMutation = createMutation({
    mutationFn: () => setPlayerRole(player.id, role),
    // Invalidate the current player details
    onSuccess: () => {
      // Update the stored player data to match
      client.setQueryData(
        ["player", player.id],
        (playerData: PlayerAccount) => ({
          ...playerData,
          role,
        })
      );
    },
  });
</script>

<form
  class="form card"
  on:submit|preventDefault={() => $changeRoleMutation.mutate()}
>
  <h2 class="form__title">
    <AccountCog class="form__icon" />
    Role
  </h2>
  <p class="text">Set the role of this account</p>
  {#if $changeRoleMutation.isError}
    <p class="error">{$changeRoleMutation.error}</p>
  {/if}
  {#if $changeRoleMutation.isPending}
    <Loader />
  {/if}
  <select class="select" bind:value={role}>
    {#each roles as roleOption}
      <option value={roleOption}>{roleOption}</option>
    {/each}
  </select>

  <button type="submit" class="button align-start">Apply Role</button>
</form>
