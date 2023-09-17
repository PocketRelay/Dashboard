<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import {
    deletePlayer,
    getPlayer,
    PlayerRole,
    setPlayerDetails,
    setPlayerPassword,
    setPlayerRole,
    type AllowedSetRoles,
    type PlayerAccount,
    getAllPlayerData,
    deletePlayerData,
    setPlayerData,
  } from "$lib/api/players";
  import { player as selfPlayer } from "$lib/api/api";
  import DashboardPage from "$lib/components/DashboardPage.svelte";
  import Dialog from "$lib/components/Dialog.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import Account from "svelte-material-icons/Account.svelte";
  import Key from "svelte-material-icons/Key.svelte";
  import Delete from "svelte-material-icons/Delete.svelte";
  import AccountCog from "svelte-material-icons/AccountCog.svelte";
  import { acceptUpload, startDownload } from "$lib/tools/files";

  // Basic form state extended by the other forms
  interface FormState {
    // Form loading state
    loading: boolean;
    // Form error state
    error: string | null;
  }

  // Password state adding password fields to the form
  type PasswordState = {
    // The new password
    new: string;
    // The password confirmation value
    confirm: string;
    // Show the confirmation screen
    showConfirm: boolean;
  } & FormState;

  // Delete state for account deletion
  type DeleteState = {
    // Whether the confirm screen is shown
    showConfirm: boolean;
  } & FormState;

  // State for clearing player data
  type ClearDataState = {
    // Whether the confirm screen is shown
    showConfirm: boolean;
  } & FormState;

  // State for importing player data
  type ImportDataState = {
    // Whether the confirm screen is shown
    showConfirm: boolean;
  } & FormState;

  type RoleState = {
    role: AllowedSetRoles;
  } & FormState;

  const basic: FormState = {
    // Form state
    loading: false,
    error: null,
  };

  const password: PasswordState = {
    new: "",
    confirm: "",
    showConfirm: false,
    // Form state
    loading: false,
    error: null,
  };

  const deleteState: DeleteState = {
    showConfirm: false,
    // Form state
    loading: false,
    error: null,
  };

  const clearState: ClearDataState = {
    showConfirm: false,
    // Form state
    loading: false,
    error: null,
  };

  const importState: ImportDataState = {
    showConfirm: false,
    // Form state
    loading: false,
    error: null,
  };

  const role: RoleState = {
    role: PlayerRole.Default,
    loading: false,
    error: null,
  };

  const roles: PlayerRole[] = [PlayerRole.Default, PlayerRole.Admin];

  const playerId = parseInt($page.params.id);
  if (Number.isNaN(playerId)) throw "NaN Player ID";

  let player: PlayerAccount | null = null;
  let loading: boolean = false;
  let error: string | null = null;

  async function load(id: number) {
    error = null;
    loading = true;

    try {
      let response = await getPlayer(id);
      player = response;
      if (player.role != PlayerRole.SuperAdmin) {
        role.role = player.role;
      }
    } catch (e) {
      let err = e as Error;
      error = err.message;
      console.error(e);
    } finally {
      loading = false;
    }
  }

  async function updateBasic() {
    if (!player) return;

    basic.error = null;
    basic.loading = true;
    try {
      await setPlayerDetails(player.id, player.display_name, player.email);
    } catch (e) {
      let err = e as Error;
      basic.error = err.message;
      console.error(e);
    } finally {
      basic.loading = false;
    }
  }

  async function updatePassword() {
    if (!player) return;

    password.showConfirm = false;

    if (password.new !== password.confirm) {
      password.error = "Passwords don't match";
      return;
    }

    password.error = null;
    password.loading = true;
    try {
      await setPlayerPassword(player.id, password.new);
    } catch (e) {
      let err = e as Error;
      password.error = err.message;
      console.error(err);
    } finally {
      password.loading = false;
    }
  }

  async function updateRole() {
    if (!player) return;

    role.error = null;
    role.loading = true;
    try {
      await setPlayerRole(player.id, role.role);
    } catch (e) {
      let err = e as Error;
      role.error = err.message;
      console.error(err);
    } finally {
      role.loading = false;
    }
  }

  async function doDelete() {
    if (!player) return;

    deleteState.showConfirm = false;
    deleteState.error = null;
    deleteState.loading = true;

    try {
      await deletePlayer(player.id);

      // Account was deleted update all associated state and redirect to login

      await goto("/players");
    } catch (e) {
      let err = e as Error;
      deleteState.error = err.message;
      console.error(err);
    } finally {
      deleteState.loading = false;
    }
  }

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
    if (password.new.length <= 0 || password.confirm.length <= 0) {
      password.error = "Passwords cannot be empty";
      return;
    }

    // Display the confirm dialog
    password.showConfirm = true;
  }

  function promptDelete() {
    deleteState.showConfirm = true;
  }

  async function exportData() {
    if (!player) return;

    loading = true;
    const savePlayer = player;

    let playerData: Record<string, string>;

    try {
      playerData = await getAllPlayerData(savePlayer.id);
    } catch (e) {
      let err = e as Error;
      deleteState.error = err.message;
      console.error(err);
      clearState.loading = false;
      return;
    } finally {
      loading = false;
    }

    const dataBlob = new Blob([JSON.stringify(playerData)], {
      type: "application/json",
    });

    const fileName = `PocketRelay-${savePlayer.display_name}.dat`;
    startDownload(fileName, dataBlob);
  }

  async function importData() {
    importState.showConfirm = false;

    loading = true;

    const file = await acceptUpload("dat");
    if (file == null) {
      loading = false;
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
      console.error("Uploaded file was invalid format");
      loading = false;
      return;
    }

    let promises = Object.keys(parsed).map((key) => {
      const value = parsed[key];
      if (typeof value !== "string") {
        console.error("Skipping non string value from import", key, value);
        return Promise.resolve();
      }
      return setPlayerData(playerId, key, value);
    });

    try {
      await Promise.all(promises);
    } catch (e) {
      let err = e as Error;
      importState.error = err.message;
      console.error(err);
      return;
    } finally {
      loading = false;
    }
  }

  function promptClearData() {
    clearState.showConfirm = true;
  }

  function promptImportData() {
    importState.showConfirm = true;
  }

  async function clearData() {
    if (!player) return;

    clearState.showConfirm = false;
    clearState.error = null;
    clearState.loading = true;

    const playerId = player.id;

    let playerData: Record<string, string>;

    try {
      playerData = await getAllPlayerData(playerId);
    } catch (e) {
      let err = e as Error;
      deleteState.error = err.message;
      console.error(err);
      clearState.loading = false;
      return;
    }

    let promises = Object.keys(playerData).map((key) =>
      deletePlayerData(playerId, key)
    );

    try {
      await Promise.all(promises);
    } catch (e) {
      let err = e as Error;
      deleteState.error = err.message;
      console.error(err);
      return;
    } finally {
      clearState.loading = false;
    }
  }

  load(playerId);
</script>

{#if loading}
  <Loader />
{:else if error}
  <h1>Failed to load player</h1>
  <p class="error">{error}</p>
{:else if player}
  <DashboardPage
    title={`Viewing ${player.email}`}
    text="Edit the settings for this account below"
  >
    <svelte:fragment slot="heading">
      <nav class="button-group">
        <a href="/players" class="button button--dark">Back</a>
        <a href={`/players/${playerId}/inventory`} class="button button--dark">
          Edit Inventory
        </a>
        <a href={`/players/${playerId}/classes`} class="button button--dark">
          Edit Classes
        </a>
      </nav>
    </svelte:fragment>
    <div class="forms">
      <form class="form card" on:submit|preventDefault={updateBasic}>
        <h2 class="form__title">
          <Account class="form__icon" /> Basic Information
        </h2>
        <p class="text">Modify basic account information</p>
        {#if basic.error}
          <p class="error">{basic.error}</p>
        {/if}
        {#if basic.loading}
          <Loader />
        {/if}
        <label class="input">
          <span class="input__label">Username</span>
          <input
            class="input__value"
            type="text"
            bind:value={player.display_name}
            required
          />
        </label>
        <label class="input">
          <span class="input__label">Email</span>
          <input
            class="input__value"
            type="email"
            bind:value={player.email}
            required
          />
        </label>
        <button type="submit" class="button">Save Changes</button>
      </form>
      <form class="form card" on:submit|preventDefault={promptConfirmChange}>
        <h2 class="form__title">
          <Key class="form__icon" /> Password
        </h2>
        <p class="text">Change the account password to the provided password</p>
        {#if password.error}
          <p class="error">{password.error}</p>
        {/if}
        {#if password.loading}
          <Loader />
        {/if}
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
        <button type="submit" class="button"> Change Password </button>
      </form>

      {#if $selfPlayer.role == PlayerRole.SuperAdmin && $selfPlayer.id !== playerId}
        <form class="form card" on:submit|preventDefault={updateRole}>
          <h2 class="form__title">
            <AccountCog class="form__icon" />
            Role
          </h2>
          <p class="text">Set the role of this account</p>
          {#if role.error}
            <p class="error">{deleteState.error}</p>
          {/if}
          {#if role.loading}
            <Loader />
          {/if}
          <select class="select" bind:value={role.role}>
            {#each roles as role}
              <option value={role}>{role}</option>
            {/each}
          </select>

          <button type="submit" class="button">Apply Role</button>
        </form>
      {/if}

      <div class="form card">
        <h2 class="form__title">
          <Delete class="form__icon" />
          Player Data
        </h2>
        <p class="text">
          Here you can import and export the player data for this account.
          Careful not to import non player data files as it may make the account
          unusable
        </p>
        {#if clearState.error}
          <p class="error">{clearState.error}</p>
        {/if}
        {#if clearState.loading}
          <Loader />
        {/if}
        <button type="button" class="button" on:click={exportData}
          >Export Data</button
        >
        <button type="button" class="button" on:click={promptImportData}
          >Import Data</button
        >
        <button
          type="button"
          class="button button--danger"
          on:click={promptClearData}>Clear Data</button
        >
      </div>
      {#if $selfPlayer.id !== playerId}
        <form
          class="form card"
          class:form--wide={$selfPlayer.role !== PlayerRole.SuperAdmin}
          on:submit|preventDefault={promptDelete}
        >
          <h2 class="form__title">
            <Delete class="form__icon" />
            Delete Account
          </h2>
          <p class="text">
            <span class="danger">DANGER ZONE</span> Warning deleting an account is
            perminent and cannot be reversed
          </p>
          {#if deleteState.error}
            <p class="error">{deleteState.error}</p>
          {/if}
          {#if deleteState.loading}
            <Loader />
          {/if}

          <button type="submit" class="button button--danger"
            >Delete Account</button
          >
        </form>
      {/if}
    </div>
  </DashboardPage>
  <!-- Password change confirmation -->
  <Dialog visible={password.showConfirm}>
    <h3>Confirm Change Password</h3>
    <p class="text">Are you sure you want to change your account password?</p>

    <div class="button-group">
      <button class="button button--dark" on:click={updatePassword}>
        Confirm
      </button>
      <button
        class="button button--dark"
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
      <b>perminent</b> and cannot be reversed
    </p>

    <div class="button-group">
      <button class="button button--danger" on:click={doDelete}>
        Confirm
      </button>
      <button
        class="button button--dark"
        on:click={() => (deleteState.showConfirm = false)}
      >
        Cancel
      </button>
    </div>
  </Dialog>

  <!-- Clear data confirmation -->
  <Dialog visible={clearState.showConfirm}>
    <h3>Confirm Clear Data</h3>
    <p class="text">
      <span class="danger">WARNING:</span> Clearing player data is
      <b>perminent</b> and cannot be reversed. Make sure you export your data player
      data or it will be lost
    </p>

    <div class="button-group">
      <button class="button button--danger" on:click={clearData}>
        Confirm
      </button>
      <button
        class="button button--dark"
        on:click={() => (clearState.showConfirm = false)}
      >
        Cancel
      </button>
    </div>
  </Dialog>

  <!-- Import data confirmation -->
  <Dialog visible={importState.showConfirm}>
    <h3>Confirm Import Data</h3>
    <p class="text">
      <span class="danger">WARNING:</span> Importing data will replace any existing
      data, make sure to export your existing data if you don't want to loose it.
      Uploading invalid files can corrupt your player account so make sure to use
      the right file
    </p>

    <div class="button-group">
      <button class="button button--danger" on:click={importData}>
        Confirm
      </button>
      <button
        class="button button--dark"
        on:click={() => (importState.showConfirm = false)}
      >
        Cancel
      </button>
    </div>
  </Dialog>
{/if}
