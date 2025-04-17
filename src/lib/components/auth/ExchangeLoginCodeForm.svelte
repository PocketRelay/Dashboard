<script lang="ts">
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";
  import { setToken } from "$lib/api/api";
  import { exchangeLoginCode } from "$lib/api/auth";
  import Loader from "$lib/components/Loader.svelte";
  import { createMutation } from "@tanstack/svelte-query";
  import { PinInput } from "bits-ui";

  // Form fields
  let login_code: string[] = [];

  const loginMutation = createMutation({
    mutationFn: exchangeLoginCode,
    onSuccess: (data) => {
      // Assign the token
      setToken(data.token);

      goto(`${base}/`);
    },
  });

  $: generatedCode = login_code.map((value) => value.toUpperCase()).join("");
</script>

{#if $loginMutation.isPending}
  <Loader />
{/if}

<form
  class="form"
  on:submit|preventDefault={() => {
    $loginMutation.mutate({
      login_code: generatedCode,
    });
  }}
>
  <h1>Login Code</h1>
  <span class="ident">POCKET RELAY MANAGER</span>
  <p class="text">Enter the code you received in-game to login</p>
  {#if $loginMutation.isError}
    <p class="error">{$loginMutation.error}</p>
  {/if}

  <div class="login-code">
    <PinInput.Root bind:value={login_code} type="text" placeholder="0">
      <PinInput.Input />
      <PinInput.Input />
      <PinInput.Input />
      <PinInput.Input />
      <PinInput.Input />
      <PinInput.HiddenInput />
    </PinInput.Root>
  </div>

  <button type="submit" class="button" disabled={generatedCode.length < 5}
    >Login</button
  >

  <a href="{base}/login" class="annot">Back to Login</a>

  <div class="info">
    <a
      class="annot"
      href="https://github.com/PocketRelay/Client/releases/latest/download/pocket-relay-client.exe"
      rel="noreferrer"
      target="_blank"
      title="Download the latest client version">Download Client</a
    >

    <a
      class="annot"
      href="https://pocket-relay.pages.dev/"
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

  .login-code {
    display: flex;
    justify-content: center;
    border: 1px solid #444;
    padding: 1rem;
    border-radius: 0.25rem;
  }
</style>
