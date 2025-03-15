<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import { requestLoginCode } from "$lib/api/auth";
  import Loader from "$lib/components/Loader.svelte";
  import { CLIENT_DOWNLOAD_LINK, WEBSITE_LINK } from "$lib/data/pocket-relay";
  import { createMutation } from "@tanstack/svelte-query";

  // Form fields
  let email: string = "";

  const loginMutation = createMutation({
    mutationFn: requestLoginCode,
    onSuccess: () => {
      // Go to the exchange code page on success
      goto(`${base}/exchange-code`);
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
    });
  }}
>
  <h1>Login Code</h1>
  <span class="ident">POCKET RELAY MANAGER</span>
  <p class="text">
    Request an in-game login code. You must be connected to this server and be
    on the game main-menu to receive a code
  </p>
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

  <button type="submit" class="button">Request code</button>

  <a href="{base}/login" class="annot">Back to Login</a>

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
    max-width: 400px;
  }

  .button {
    margin-top: 0.5rem;
    font-weight: bold;
  }
</style>
