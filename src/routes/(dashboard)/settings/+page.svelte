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
        setDefaults($player);
    }
</script>

<h1 class="title">Settings</h1>
<span class="ident">POCKET RELAY MANAGER</span>
<p class="text">Edit the settings for your account below</p>
<div class="forms">
    <form class="form" on:submit|preventDefault={onUpdateBasic}>
        <div>
            <Account />
            <h2>Basic Information</h2>
        </div>
        <p class="text">Here you can modify your basic account information</p>
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
    </form>
    <form class="form" on:submit|preventDefault={onUpdatePassword}>
        <div>
            <Key />
            <h2>Password</h2>
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

    .forms {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
    }

    .form {
        flex: auto;

        display: flex;
        flex-flow: column;
        gap: 1rem;

        padding: 2rem;
        border-radius: 10px;

        background-color: #0f0f0f;
    }
</style>
