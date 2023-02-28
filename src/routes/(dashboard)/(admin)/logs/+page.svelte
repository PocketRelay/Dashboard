<script lang="ts">
    import { getServerLog } from "$lib/api/server";
    import DashboardPage from "$lib/components/DashboardPage.svelte";
    import Loader from "$lib/components/Loader.svelte";
    import { onMount } from "svelte";
    import Download from "svelte-material-icons/Download.svelte";

    let contents: string | null = null;
    let loading = false;

    async function load() {
        try {
            let response = await getServerLog();
            contents = response;
        } catch (e) {
            console.error(e);
        }
    }

    function download() {
        if (!contents) {
            return;
        }

        var element = document.createElement("a");
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

    onMount(() => {
        load().then().catch();
    });
</script>

<DashboardPage title="Server Logs">
    <svelte:fragment slot="heading">
        {#if contents !== null}
            <button class="button button--alt" on:click={download}>
                <Download />
            </button>
        {/if}
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
