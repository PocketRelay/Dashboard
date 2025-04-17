<script lang="ts">
  import { page } from "$app/stores";
  import { getPlayer, PlayerRole } from "$lib/api/players";
  import { player as selfPlayer } from "$lib/api/api";
  import Loader from "$lib/components/Loader.svelte";
  import { base } from "$app/paths";
  import BasicInformationForm from "$lib/components/admin/player/BasicInformationForm.svelte";
  import ChangePasswordForm from "$lib/components/admin/player/ChangePasswordForm.svelte";
  import ChangeRoleForm from "$lib/components/admin/player/ChangeRoleForm.svelte";
  import PlayerDataForm from "$lib/components/admin/player/PlayerDataForm.svelte";
  import DeleteAccountForm from "$lib/components/admin/player/DeleteAccountForm.svelte";
  import { createQuery } from "@tanstack/svelte-query";
  import PageHeading from "$lib/components/PageHeading.svelte";

  const playerId = parseInt($page.params.id);

  const playerQuery = createQuery({
    queryKey: ["player", playerId],
    queryFn: () => getPlayer(playerId),
    retry: false,
  });

  $: player = $playerQuery.data;
</script>

{#if $playerQuery.isLoading || $playerQuery.isRefetching}
  <Loader />
{:else if $playerQuery.isError}
  <h1>Failed to load player</h1>
  <p class="error">{$playerQuery.error}</p>
{:else if player}
  <PageHeading
    title={`Viewing ${player.email}`}
    text="Edit the settings for this account below"
    backURL="{base}/players"
  >
    <nav class="button-group" slot="actions">
      <a
        href={`${base}/players/${playerId}/inventory`}
        class="button button--dark"
      >
        Edit Inventory
      </a>
    </nav>
  </PageHeading>

  <div class="forms">
    <BasicInformationForm {player} />
    <ChangePasswordForm {player} />

    {#if $selfPlayer !== null && $selfPlayer.role == PlayerRole.SuperAdmin && $selfPlayer.id !== playerId}
      <ChangeRoleForm {player} />
    {/if}

    <PlayerDataForm {player} />

    {#if $selfPlayer !== null && $selfPlayer.id !== playerId}
      <DeleteAccountForm {player} />
    {/if}
  </div>
{/if}
