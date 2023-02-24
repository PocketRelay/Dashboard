<script lang="ts">
    import { goto } from "$app/navigation";
    import { setToken, type RequestError } from "$lib/api/api";
    import { doLogin } from "$lib/api/auth";

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

        console.log("Login");

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

        <button type="submit" class="submit">Login</button>
    </form>
</main>

<style lang="scss">
    .ident {
        color: #777777;
    }
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

    .error {
        color: #d17474;
    }

    .input {
        display: block;
    }

    .input__label {
        display: block;
        margin-bottom: 0.5rem;
        color: #999999;
    }

    .input__value {
        display: block;
        width: 100%;
        background-color: #343946;
        color: #dfdfdf;
        padding: 1rem;
        border: none;
        border-radius: 5px;
    }

    .text {
        color: #c3c3c3;
    }

    .submit {
        background-color: #4e5382;
        color: white;
        padding: 1rem;
        font-size: 1.2rem;
        border-radius: 5px;
        margin-top: 0.5rem;
        font-weight: bold;
        letter-spacing: 0.1rem;
        border: none;
    }
</style>
