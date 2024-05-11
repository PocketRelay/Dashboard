<script lang="ts">
  import {
    deletePlayerData,
    getAllPlayerData,
    setPlayerData,
    type PlayerAccount,
  } from "$lib/api/players";
  import Dialog from "$lib/components/Dialog.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import { acceptUpload, startDownload } from "$lib/tools/files";
  import { createMutation, useQueryClient } from "@tanstack/svelte-query";
  import Delete from "~icons/ph/trash-fill";

  export let player: PlayerAccount;

  let confirmClearData: boolean = false;
  let confirmImportData: boolean = false;

  const client = useQueryClient();

  // Mutation to update the player details
  const clearDataMutation = createMutation({
    mutationFn: async () => {
      // Load all the player data keys
      const playerData: Partial<Record<string, string>> =
        await getAllPlayerData(player.id);

      // Clear all the player data
      const promises = Object.keys(playerData).map((key) =>
        deletePlayerData(player.id, key)
      );

      await Promise.all(promises);
    },
    // Invalidate the player data
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["player-data-base", player.id] });
      client.invalidateQueries({ queryKey: ["player-data-all", player.id] });
    },

    onSettled: () => {
      confirmClearData = false;
    },
  });

  // Mutation to update the player details
  const importDataMutation = createMutation({
    mutationFn: async () => {
      const file = await acceptUpload("dat");
      if (file == null) {
        return;
      }

      const reader = new FileReader();
      // Await the reading process
      await new Promise((resolve, reject) => {
        reader.onload = resolve;
        reader.onerror = reject;
        reader.onabort = reject;

        // Load the file as a string
        reader.readAsText(file);
      });

      const data = reader.result as string;
      const parsed = JSON.parse(data);

      if (typeof parsed !== "object") {
        throw new Error("Uploaded file was invalid format");
      }

      const promises = Object.keys(parsed).map((key) => {
        const value = parsed[key];
        if (typeof value !== "string") {
          console.error("Skipping non string value from import", key, value);
          return Promise.resolve();
        }
        return setPlayerData(player.id, key, value);
      });

      await Promise.all(promises);
    },
    // Invalidate the current player details
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["player-data-base", player.id] });
      client.invalidateQueries({ queryKey: ["player-data-all", player.id] });
    },
    onSettled: () => {
      confirmImportData = false;
    },
  });

  // Mutation to update the player details
  const exportDataMutation = createMutation({
    mutationFn: async () => {
      const playerData: Partial<Record<string, string>> =
        await getAllPlayerData(player.id);

      const dataBlob = new Blob([JSON.stringify(playerData)], {
        type: "application/json",
      });

      const fileName = `PocketRelay-${player.display_name}.dat`;
      startDownload(fileName, dataBlob);
    },
  });
</script>

<div class="form card">
  <h2 class="form__title">
    <Delete class="form__icon" />
    Player Data
  </h2>
  <p class="text">
    Here you can import and export the player data for this account. Careful not
    to import non player data files as it may make the account unusable
  </p>
  {#if $clearDataMutation.isError}
    <p class="error">{$clearDataMutation.error}</p>
  {/if}
  {#if $clearDataMutation.isPending}
    <Loader />
  {/if}
  <div class="button-group">
    <button
      type="button"
      class="button"
      on:click={() => $exportDataMutation.mutate()}>Export Data</button
    >
    <button
      type="button"
      class="button"
      on:click={() => (confirmImportData = true)}
    >
      Import Data
    </button>
    <button
      type="button"
      class="button button--danger"
      on:click={() => (confirmClearData = true)}
    >
      Clear Data
    </button>
  </div>
</div>

<!-- Clear data confirmation -->
<Dialog visible={confirmClearData}>
  <h3>Confirm Clear Data</h3>
  <p class="text">
    <span class="danger">WARNING:</span> Clearing player data is
    <b>permanent</b> and cannot be reversed. Make sure you export your data player
    data or it will be lost
  </p>

  <div class="button-group">
    <button
      class="button button--danger"
      on:click={() => $clearDataMutation.mutate()}
    >
      Confirm
    </button>
    <button class="button" on:click={() => (confirmClearData = false)}>
      Cancel
    </button>
  </div>
</Dialog>

<!-- Import data confirmation -->
<Dialog visible={confirmImportData}>
  <h3>Confirm Import Data</h3>
  <p class="text">
    <span class="danger">WARNING:</span> Importing data will replace any existing
    data, make sure to export your existing data if you don't want to loose it. Uploading
    invalid files can corrupt your player account so make sure to use the right file
  </p>

  <div class="button-group">
    <button
      class="button button--danger"
      on:click={() => $importDataMutation.mutate()}
    >
      Confirm
    </button>
    <button class="button" on:click={() => (confirmImportData = false)}>
      Cancel
    </button>
  </div>
</Dialog>
