<script lang="ts">
  import { clearServerLog, getServerLog } from "$lib/api/server";
  import DashboardPage from "$lib/components/DashboardPage.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import Refresh from "~icons/ph/arrow-clockwise-bold";
  import Delete from "~icons/ph/trash-fill";
  import Dialog from "$lib/components/Dialog.svelte";
  import Download from "~icons/ph/download-simple-bold";
  import {
    createMutation,
    createQuery,
    useQueryClient,
  } from "@tanstack/svelte-query";

  let confirmClear: boolean = false;

  const client = useQueryClient();

  const query = createQuery({
    queryKey: ["server-log"],
    queryFn: () => getServerLog(),
  });

  const clearMutation = createMutation({
    mutationFn: () => clearServerLog(),
    onSuccess: () => client.invalidateQueries({ queryKey: ["server-log"] }),
    onSettled: () => {
      confirmClear = false;
    },
  });

  /**
   * Creates a temporary link element to use as a link
   * for downloading the log file
   */
  function download(data: string) {
    return () => {
      const element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(data)
      );
      element.setAttribute("download", "server.log");

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    };
  }
</script>

<DashboardPage title="Server Logs">
  <svelte:fragment slot="heading">
    <div class="button-group">
      {#if $query.data !== undefined}
        <button class="button button--alt" on:click={download($query.data)}>
          <Download width={24} height={24} />
        </button>
      {/if}

      <button class="button button--dark" on:click={() => $query.refetch()}>
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
    {#if $query.isLoading || $query.isRefetching || $clearMutation.isPending}
      <Loader />
    {:else if $query.data !== undefined}
      <pre>{$query.data}</pre>
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
    <button
      class="button button--danger"
      on:click={() => $clearMutation.mutate()}
    >
      Confirm
    </button>
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
