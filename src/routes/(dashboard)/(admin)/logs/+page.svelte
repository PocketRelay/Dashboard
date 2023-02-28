<script lang="ts">
    import { getServerLog } from "$lib/api/server";
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

<div class="wrapper">
    <div class="heading">
        <h1 class="title">Server Logs</h1>
        <span class="ident">POCKET RELAY MANAGER</span>
        <p class="text">
            Click a log file below to view its contents and press the download
            button to download a copy
        </p>

        {#if contents !== null}
            <button class="button button--alt" on:click={download}>
                <Download />
            </button>
        {/if}
    </div>

    <div class="card log">
        {#if loading}
            <Loader />
        {:else if contents !== null}
            <pre>{contents}</pre>
        {/if}
    </div>
</div>

<style>
    .log {
        flex: auto;
        overflow: auto;
        padding: 1rem;
        color: #999;
    }

    .title,
    .ident,
    .text {
        margin-bottom: 0.5rem;
    }

    .text {
        color: #999999;
    }

    .select {
        background-color: #0f0f0f;
        border-radius: 10px;
        color: white;
        padding: 1rem;
        font-size: 1rem;
        border: none;
    }

    .wrapper {
        display: flex;
        flex-flow: column;
        gap: 1rem;
        height: 100%;
    }
</style>
