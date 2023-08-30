<script lang="ts">
  import { goto } from "$app/navigation";
  import { setToken, type RequestError } from "$lib/api/api";
  import { doCreate } from "$lib/api/auth";
  import Loader from "$lib/components/Loader.svelte";
  import { disableAccountCreation } from "$lib/dashboard.state";

  // Form fields
  let username: string = "";
  let email: string = "";
  let password: string = "";

  // State
  let loading: boolean = false;
  let error: string | null = null;

  /**
   * Handles attempting to create on the backend server
   * using the provided credentials
   */
  async function createAccount() {
    error = null;
    loading = true;

    try {
      const { token } = await doCreate(username, email, password);

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

  $: if ($disableAccountCreation) {
    goto("/login");
  }
</script>

{#if loading}
  <Loader />
{/if}

<main class="background">
  <form class="form card" on:submit|preventDefault={createAccount}>
    <h1>Create</h1>
    <span class="ident">POCKET RELAY MANAGER</span>
    <p class="text">Create an account to login to the server.</p>
    {#if error}
      <p class="error">{error}</p>
    {/if}

    <label class="input">
      <span class="input__label">Username</span>
      <input
        class="input__value"
        type="text"
        bind:value={username}
        required
        autocomplete="username"
      />
    </label>

    <label class="input">
      <span class="input__label">Email</span>
      <input
        class="input__value"
        type="email"
        bind:value={email}
        required
        autocomplete="email"
      />
    </label>

    <label class="input">
      <span class="input__label">Password</span>
      <input
        class="input__value"
        type="password"
        bind:value={password}
        required
        autocomplete="current-password"
      />
    </label>

    <button type="submit" class="button">Create</button>
    <a href="/login" class="annot">Login to an account</a>
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
    flex: none;
    max-width: 450px;
    width: 100%;
  }

  .button {
    margin-top: 0.5rem;
    font-weight: bold;
  }
</style>
