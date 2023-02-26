<script lang="ts">
    import { player, type RequestError } from "$lib/api/api";
    import {
        setSelfDetails,
        setSelfPassword,
        type PlayerAccount,
    } from "$lib/api/players";
    import Loader from "$lib/components/Loader.svelte";
    import Account from "svelte-material-icons/Account.svelte";
    import Key from "svelte-material-icons/Key.svelte";

    let username = "";
    let email = "";

    let currentPassword = "";
    let newPassword = "";
    let confirmPassword = "";

    let loading1 = false;
    let error1: string | null = null;

    let loading2 = false;
    let error2: string | null = null;

    async function onUpdateBasic() {
        error1 = null;
        loading1 = true;
        try {
            await setSelfDetails(username, email);

            player.update((value) => {
                value.email = email;
                value.display_name = username;
                return value;
            });
        } catch (e) {
            let err = e as RequestError;
            error1 = err.text;
            console.error(e);
        } finally {
            loading1 = false;
        }
    }

    async function onUpdatePassword() {
        if (newPassword !== confirmPassword) {
            error2 = "Passwords don't match";
            return;
        }

        error2 = null;
        loading2 = true;
        try {
            await setSelfPassword(currentPassword, newPassword);
            alert("Password updated");
        } catch (e) {
            let err = e as RequestError;
            error2 = err.text;
            console.error(e);
        } finally {
            loading2 = false;
        }
    }

    function setDefaults(player: PlayerAccount) {
        username = player.display_name;
        email = player.email;
    }

    $: {
        if (process.browser) {
            setDefaults($player);
        }
    }
</script>

<h1 class="title">Settings</h1>
<span class="ident">POCKET RELAY MANAGER</span>
<p class="text">Edit the settings for your account below</p>
<div class="forms">
    <form class="form card" on:submit|preventDefault={onUpdateBasic}>
        <div class="form__wrapper">
            <div class="form__head">
                <Account class="form__icon" />
                <h2 class="form__title">Basic Information</h2>
            </div>
            <p class="text">
                Here you can modify your basic account information
            </p>
            {#if error1}
                <p class="error">{error1}</p>
            {/if}
            {#if loading1}
                <Loader />
            {/if}
            <label class="input">
                <span class="input__label">Username</span>
                <input
                    class="input__value"
                    type="text"
                    bind:value={username}
                    required
                />
            </label>
            <label class="input">
                <span class="input__label">Email</span>
                <input
                    class="input__value"
                    type="email"
                    bind:value={email}
                    required
                />
            </label>
            <button type="submit" class="button">Save Changes</button>
        </div>
    </form>
    <form class="form card" on:submit|preventDefault={onUpdatePassword}>
        <div class="form__wrapper">
            <div class="form__head">
                <Key class="form__icon" />
                <h2 class="form__title">Password</h2>
            </div>
            <p class="text">
                Here you can change your account password using your current
                password
            </p>
            {#if error2}
                <p class="error">{error2}</p>
            {/if}
            {#if loading2}
                <Loader />
            {/if}
            <label class="input">
                <span class="input__label">Current Password</span>
                <input
                    class="input__value"
                    type="password"
                    bind:value={currentPassword}
                    required
                />
            </label>
            <label class="input">
                <span class="input__label">New Password</span>
                <input
                    class="input__value"
                    type="password"
                    bind:value={newPassword}
                    required
                />
            </label>
            <label class="input">
                <span class="input__label">Confirm Password</span>
                <input
                    class="input__value"
                    type="password"
                    bind:value={confirmPassword}
                    required
                />
            </label>
            <button type="submit" class="button">Change Password</button>
        </div>
    </form>
</div>

<style lang="scss">
    .title,
    .ident,
    .text {
        margin-bottom: 0.5rem;
    }

    .text {
        color: #999999;
    }

    .form {
        margin-bottom: 2rem;
    }

    .form__wrapper {
        max-width: 400px;
        widows: 100%;
        flex: auto;

        display: flex;
        flex-flow: column;
        gap: 1rem;
    }
    .form__head {
        display: flex;
        gap: 1rem;
    }

    .form__title {
    }

    :global(.form__icon) {
        display: inline;
        width: 24px;
        height: 24px;
        vertical-align: middle;
        fill: white;
    }
</style>
