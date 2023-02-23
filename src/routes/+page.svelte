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

            await goto("/dashboard");
        } catch (e) {
            let err = e as RequestError;
            console.error(error);
            error = err.text;
        } finally {
            loading = false;
        }
    }
</script>

<main>
    <form on:submit|preventDefault={onLogin}>
        <span>POCKET RELAY MANAGER</span>
        <h1>Login</h1>
        <p>Login to an existing account on the server</p>
        {#if error}
            <p>{error}</p>
        {/if}
        <label>
            <span>Email</span>
            <input type="email" bind:value={email} required />
        </label>

        <label>
            <span>Password</span>
            <input type="password" bind:value={password} required />
        </label>

        <button type="submit">Login</button>
    </form>
</main>
