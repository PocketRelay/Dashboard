<script lang="ts">
    import type { RequestError } from "$lib/api/api";
    import { getServerLog } from "$lib/api/server";
    import DashboardPage from "$lib/components/DashboardPage.svelte";
    import Loader from "$lib/components/Loader.svelte";
    import { onMount } from "svelte";
    import Download from "svelte-material-icons/Download.svelte";
    import Refresh from "svelte-material-icons/Refresh.svelte";

    let loading = false;
    let error: string | null = null;

    // The log file contents
    let contents: string | null = null;

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
            let err = e as RequestError;
            console.error(err);
            error = err.text;
        } finally {
            loading = false;
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

<style>
    .log {
        flex: auto;
        overflow: auto;
        padding: 1rem;
        color: #999;
    }
</style>
