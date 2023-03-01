<script lang="ts">
    import { player, type RequestError } from "$lib/api/api";
    import {
        setSelfDetails,
        setSelfPassword,
        type PlayerAccount,
    } from "$lib/api/players";
    import DashboardPage from "$lib/components/DashboardPage.svelte";
    import Dialog from "$lib/components/Dialog.svelte";
    import Loader from "$lib/components/Loader.svelte";
    import Account from "svelte-material-icons/Account.svelte";
    import Key from "svelte-material-icons/Key.svelte";

    // Basic form state extended by the other forms
    interface FormState {
        // Form loading state
        loading: boolean;
        // Form error state
        error: string | null;
    }

    // Basic state adding username and email fields to the form
    type BasicState = {
        // The new account username
        username: string;
        // The new account email
        email: string;
    } & FormState;

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
    } & FormState;

    // Delete state for account deletion
    type DeleteState = {
        password: string;
        showConfirm: boolean;
    } & FormState;

    const basic: BasicState = {
        username: "",
        email: "",
        // Form state
        loading: false,
        error: null,
    };

    const password: PasswordState = {
        current: "",
        new: "",
        confirm: "",
        showConfirm: false,
        // Form state
        loading: false,
        error: null,
    };

    const deleteState: DeleteState = {
        password: "",
        showConfirm: false,
        // Form state
        loading: false,
        error: null,
    };

    async function updateBasic() {
        // Prepare the state
        basic.error = null;
        basic.loading = true;

        try {
            await setSelfDetails(basic.username, basic.email);

            player.update((value) => {
                value.email = basic.email;
                value.display_name = basic.username;
                return value;
            });
        } catch (e) {
            let err = e as RequestError;
            basic.error = err.text;
            console.error(e);
        } finally {
            basic.loading = false;
        }
    }

    async function updatePassword() {
        // Prepare the state
        password.showConfirm = false;
        password.error = null;
        password.loading = true;

        try {
            await setSelfPassword(password.current, password.new);
        } catch (e) {
            let err = e as RequestError;
            password.error = err.text;
            console.error(err);
        } finally {
            password.loading = false;
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

    $: {
        // Update the initial values with the player details
        let account = $player;
        basic.username = account.display_name;
        basic.email = account.email;
    }
</script>

<DashboardPage title="Settings" text="Edit the settings for your account below">
    <div class="forms">
        <form class="form card" on:submit|preventDefault={updateBasic}>
            <h2 class="form__title">
                <Account class="form__icon" />Basic Information
            </h2>
            <p class="text">
                Here you can modify your basic account information
            </p>
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
                Here you can change your account password using your current
                password
            </p>
            {#if password.error}
                <p class="error">{password.error}</p>
            {/if}
            {#if password.loading}
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
    </div>
</DashboardPage>

<Dialog visible={password.showConfirm}>
    <h3>Confirm Change Password</h3>
    <p>Are you sure you want to change your account password?</p>
    <div>
        <button class="button button--alt" on:click={updatePassword}>
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

<style lang="scss">
    .forms {
        display: flex;
        flex-flow: row wrap;
        gap: 1rem;
        align-items: flex-start;
    }

    .form {
        margin-bottom: 2rem;

        flex: auto;

        display: flex;
        flex-flow: column;
        gap: 1rem;
    }

    :global(.form__icon) {
        margin-right: 0.5rem;
        display: inline;
        width: 24px;
        height: 24px;
        vertical-align: middle;
        fill: white;
    }
</style>
