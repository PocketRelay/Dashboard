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
     * Handler to handle the actual login process and
     * redirect the user to the dashboard once they
     * are logged in.
     */
    async function onLogin() {
        error = null;
        loading = true;

        try {
            let response = await doLogin(email, password);

            // Assign the token
            setToken(response.token);

            await goto("/");
        } catch (e) {
            let err = e as RequestError;
            console.error(error);
            error = err.text;
        } finally {
            loading = false;
        }
    }
</script>

<main class="background">
    <form class="form" on:submit|preventDefault={onLogin}>
        <span class="ident">POCKET RELAY MANAGER</span>
        <h1>Login</h1>
        <p class="text">Login to an existing account on the server</p>
        {#if error}
            <p class="error">{error}</p>
        {/if}

        {#if loading}
            <Loader />
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
    }

    .form {
        display: flex;
        flex-flow: column;
        gap: 1rem;

        padding: 2rem;
        border-radius: 10px;

        background-color: #0f0f0f;
    }

    .text {
        color: #c3c3c3;
    }

    .button {
        margin-top: 0.5rem;
        font-size: 1.2rem;
        font-weight: bold;
        padding: 1rem;
    }
</style>
