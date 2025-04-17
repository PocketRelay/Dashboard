<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import { setToken } from "$lib/api/api";
  import { createRequest } from "$lib/api/auth";
  import Loader from "$lib/components/Loader.svelte";
  import { disableAccountCreation } from "$lib/dashboard.state";
  import { CLIENT_DOWNLOAD_LINK, WEBSITE_LINK } from "$lib/data/pocket-relay";
  import { createMutation } from "@tanstack/svelte-query";

  // Form fields
  let username: string = "";
  let email: string = "";
  let password: string = "";

  const createAccountMutation = createMutation({
    mutationFn: createRequest,
    onSuccess: (data) => {
      // Assign the token
      setToken(data.token);

      goto(`${base}/`);
    },
  });

  $: if ($disableAccountCreation) {
    goto(`${base}/login`);
  }
</script>

{#if $createAccountMutation.isPending}
  <Loader />
{/if}

<form
  class="form"
  on:submit|preventDefault={() => {
    $createAccountMutation.mutate({
      username,
      email,
      password,
    });
  }}
>
  <h1>Create</h1>
  <span class="ident">POCKET RELAY MANAGER</span>
  <p class="text">Create an account to login to the server.</p>
  {#if $createAccountMutation.isError}
    <p class="error">{$createAccountMutation.error}</p>
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

  <a href="{base}/login" class="annot">Login to an account</a>

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

  .form {
    flex: none;
    width: 100%;
    max-width: 450px;
  }

  .button {
    margin-top: 0.5rem;
    font-weight: bold;
  }
</style>
