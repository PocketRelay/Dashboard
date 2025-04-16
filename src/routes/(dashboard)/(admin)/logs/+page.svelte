<script lang="ts">
  import { clearServerLog, getServerLog } from "$lib/api/server";
  import DashboardPage from "$lib/components/DashboardPage.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import { onMount } from "svelte";
  import Refresh from "~icons/ph/arrow-clockwise-bold";
  import Delete from "~icons/ph/trash-fill";
  import Dialog from "$lib/components/Dialog.svelte";
  import Download from "~icons/ph/download-simple-bold";

  let loading = false;
  let error: string | null = null;

  // The log file contents
  let contents: string | null = null;

  let confirmClear: boolean = false;

  /**
   * Loads the current server log file
   */
  async function load() {
    loading = true;
    error = null;

    try {
      let response = await getServerLog();
      contents = response;
    } catch (e) {
      let err = e as Error;
      console.error("Failed to load server logs", err);
      error = err.message;
    } finally {
      loading = false;
    }
  }

  async function clear() {
    confirmClear = true;
    loading = true;
    try {
      await clearServerLog();
      await load();
    } catch (e) {
      let err = e as Error;
      console.error("Failed to clear server logs", err);
      error = err.message;
    } finally {
      loading = false;
      confirmClear = false;
    }
  }

  /**
   * Creates a temporary link element to use as a link
   * for downloading the log file
   */
  function download() {
    // Ignore if the log is not loaded
    if (!contents) return;

    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(contents)
    );
    element.setAttribute("download", "server.log");

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  /**
   * Refreshes the log file contents with the
   * latest log file
   */
  function refresh() {
    load();
  }

  // Load the logs on mount
  onMount(load);
</script>

<DashboardPage title="Server Logs">
  <svelte:fragment slot="heading">
    <div class="button-group">
      {#if contents !== null}
        <button class="button button--alt" on:click={download}>
          <Download width={24} height={24} />
        </button>
      {/if}

      <button class="button button--dark" on:click={refresh}>
        <Refresh width={24} height={24} />
      </button>
      <button
        class="button button--dark"
        title="Clear Logs"
        on:click={() => (confirmClear = true)}
      >
        <Delete width={24} height={24} />
      </button>
    </div>
  </svelte:fragment>

  <div class="card log">
    {#if loading}
      <Loader />
    {:else if contents !== null}
      <pre>{contents}</pre>
    {/if}
  </div>
</DashboardPage>
<!-- Log Delete Confirmation -->
<Dialog visible={confirmClear}>
  <h3>Confirm Log Clear</h3>
  <p class="text">
    <span class="danger">WARNING:</span> Clearing your logs is
    <b>perminent</b> and cannot be reversed are you sure you want to clear them
  </p>

  <div class="button-group">
    <button class="button button--danger" on:click={clear}> Confirm </button>
    <button class="button button--alt" on:click={() => (confirmClear = false)}>
      Cancel
    </button>
  </div>
</Dialog>

<style>
  .log {
    flex: auto;
    overflow: auto;
    padding: 1rem;
    color: #999;
  }
</style>
