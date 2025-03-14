<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import { setToken } from "$lib/api/api";
  import { loginRequest } from "$lib/api/auth";
  import Loader from "$lib/components/Loader.svelte";
  import { disableAccountCreation } from "$lib/dashboard.state";
  import { CLIENT_DOWNLOAD_LINK, WEBSITE_LINK } from "$lib/data/pocket-relay";
  import { createMutation } from "@tanstack/svelte-query";

  // Form fields
  let email: string = "";
  let password: string = "";

  const loginMutation = createMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      // Assign the token
      setToken(data.token);

      goto(`${base}/`);
    },
  });
</script>

{#if $loginMutation.isPending}
  <Loader />
{/if}

<form
  class="form"
  on:submit|preventDefault={() => {
    $loginMutation.mutate({
      email,
      password,
    });
  }}
>
  <h1>Login</h1>
  <span class="ident">POCKET RELAY MANAGER</span>
  <p class="text">Login to an existing account on the server</p>
  {#if $loginMutation.isError}
    <p class="error">{$loginMutation.error}</p>
  {/if}

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

  <button type="submit" class="button">Login</button>

  <div class="links">
    {#if !$disableAccountCreation}
      <a href="{base}/create" class="annot">Create an account</a>
    {/if}

    <a href="{base}/request-code" class="annot">Request Code</a>
  </div>

  <div class="info">
    <a
      class="annot"
      href={CLIENT_DOWNLOAD_LINK}
      rel="noreferrer"
      target="_blank"
      title="Download the latest client version">Download Client</a
    >

    <a
      class="annot"
      href={WEBSITE_LINK}
      rel="noreferrer"
      target="_blank"
      title="View the website for the Pocket Relay project"
      >Pocket Relay Website</a
    >
  </div>
</form>

<style lang="scss">
  .info {
    display: flex;
    justify-content: space-between;

    margin-top: 0.25rem;
    padding-top: 1rem;
    border-top: 1px solid #333;
  }

  .links {
    display: flex;
    justify-content: space-between;
  }

  .form {
    flex: none;
    width: 100%;
    max-width: 400px;
  }

  .button {
    margin-top: 0.5rem;
    font-weight: bold;
  }
</style>
