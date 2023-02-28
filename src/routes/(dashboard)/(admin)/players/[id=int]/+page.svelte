<script lang="ts">
    import { page } from "$app/stores";
    import type { RequestError } from "$lib/api/api";
    import {
        getPlayer,
        setPlayerDetails,
        setPlayerPassword,
        type PlayerAccount,
    } from "$lib/api/players";
    import DashboardPage from "$lib/components/DashboardPage.svelte";
    import Loader from "$lib/components/Loader.svelte";
    import Account from "svelte-material-icons/Account.svelte";
    import Key from "svelte-material-icons/Key.svelte";

    let newPassword = "";
    let confirmPassword = "";

    let loading1 = false;
    let error1: string | null = null;

    let loading2 = false;
    let error2: string | null = null;

    const playerId = parseInt($page.params.id);
    if (Number.isNaN(playerId)) throw "NaN Player ID";

    let loading = true;
    let error: string | null = null;
    let player: PlayerAccount | null = null;

    async function load(id: number) {
        loading = true;
        try {
            let response = await getPlayer(id);
            player = response;
        } catch (e) {
            let err = e as RequestError;
            error = err.text;
            console.error(e);
        }
        loading = false;
    }

    async function onUpdateBasic() {
        if (!player) return;
        error1 = null;
        loading1 = true;
        try {
            await setPlayerDetails(
                player.id,
                player.display_name,
                player.email
            );
        } catch (e) {
            let err = e as RequestError;
            error1 = err.text;
            console.error(e);
        } finally {
            loading1 = false;
        }
    }

    async function onUpdatePassword() {
        if (!player) return;
        if (newPassword !== confirmPassword) {
            error2 = "Passwords don't match";
            return;
        }

        error2 = null;
        loading2 = true;
        try {
            await setPlayerPassword(player.id, newPassword);
            alert("Password updated");
        } catch (e) {
            let err = e as RequestError;
            error2 = err.text;
            console.error(e);
        } finally {
            loading2 = false;
        }
    }

    load(playerId).then().catch();
</script>

{#if loading}
    <Loader />
{:else if player}
    <DashboardPage
        title={`Viewing ${player.email}`}
        text="Edit the settings for this account below"
    >
        <svelte:fragment slot="heading">
            <nav class="nav">
                <a href="/players" class="button button--alt ">Back</a>
                <a
                    href={`/players/${playerId}/inventory`}
                    class="button button--alt "
                >
                    Edit Inventory
                </a>
                <a
                    href={`/players/${playerId}/classes`}
                    class="button button--alt "
                >
                    Edit Classes
                </a>
                <button class="button button--alt delete">Delete Account</button
                >
            </nav>
        </svelte:fragment>
        <div class="forms">
            <form class="form card" on:submit|preventDefault={onUpdateBasic}>
                <div class="form__wrapper">
                    <div class="form__head">
                        <Account class="form__icon" />
                        <h2 class="form__title">Basic Information</h2>
                    </div>
                    <p class="text">Modify basic account information</p>
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
                </div>
            </form>
            <form class="form card" on:submit|preventDefault={onUpdatePassword}>
                <div class="form__wrapper">
                    <div class="form__head">
                        <Key class="form__icon" />
                        <h2 class="form__title">Password</h2>
                    </div>
                    <p class="text">
                        Change the account password to the provided password
                    </p>
                    {#if error2}
                        <p class="error">{error2}</p>
                    {/if}
                    {#if loading2}
                        <Loader />
                    {/if}
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
                    <button type="submit" class="button">Change Password</button
                    >
                </div>
            </form>
        </div>
    </DashboardPage>
{/if}

<style lang="scss">
    .nav {
        margin-bottom: 1rem;
        display: flex;
        flex-flow: row;
        gap: 1rem;
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

    :global(.form__icon) {
        display: inline;
        width: 24px;
        height: 24px;
        vertical-align: middle;
        fill: white;
    }
    .button--alt {
        background-color: #0f0f0f;
    }
    .button--alt:hover {
        background-color: #1f1f1f;
    }

    .delete {
        background-color: #a74343;
    }
    .delete:hover {
        background-color: #b65a5a;
    }
</style>
