<script lang="ts">
    import { goto } from "$app/navigation";
    import { setToken, type RequestError } from "$lib/api/api";
    import { doLogin } from "$lib/api/auth";
    import Loader from "$lib/components/Loader.svelte";

    // Form fields
    let email: string = "";
    let password: string = "";

    // State
    let loading: boolean = false;
    let error: string | null = null;

    /**
     * Handles attempting to login to the backend server
     * using the provided credentials
     */
    async function login() {
        error = null;
        loading = true;

        try {
            const { token } = await doLogin(email, password);

            // Assign the token
            setToken(token);

            await goto("/");
        } catch (e) {
            let err = e as RequestError;
            console.error(err);
            error = err.text;
        } finally {
            loading = false;
        }
    }
</script>

{#if loading}
    <Loader />
{/if}

<main class="background">
    <form class="form card" on:submit|preventDefault={login}>
        <h1>Login</h1>
        <span class="ident">POCKET RELAY MANAGER</span>
        <p class="text">Login to an existing account on the server</p>
        {#if error}
            <p class="error">{error}</p>
        {/if}

        <label class="input">
            <span class="input__label">Email</span>
            <input
                class="input__value"
                type="email"
                bind:value={email}
                required
            />
        </label>

        <label class="input">
            <span class="input__label">Password</span>
            <input
                class="input__value"
                type="password"
                bind:value={password}
                required
            />
        </label>

        <button type="submit" class="button">Login</button>
    </form>
</main>

<style lang="scss">
    .background {
        width: 100%;
        height: 100vh;

        display: flex;
        flex-flow: column;

        justify-content: center;
        align-items: center;

        background: linear-gradient(
                rgba(0, 0, 0, 0.7),
                rgba(0, 0, 0, 0.9),
                rgba(0, 0, 0, 0.7)
            ),
            url("/login-background.webp") center no-repeat;
        background-size: cover;
    }

    .form {
        display: flex;
        flex-flow: column;
        gap: 1rem;
    }

    .button {
        font-size: 1.2rem;
        margin-top: 0.5rem;
        font-weight: bold;
    }
</style>
