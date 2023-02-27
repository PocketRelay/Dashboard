<script lang="ts">
    import { getServerLog, getServerLogs } from "$lib/api/server";
    import Loader from "$lib/components/Loader.svelte";
    import { onMount } from "svelte";

    let logs: string[] = [];

    async function load() {
        try {
            let response = await getServerLogs();
            logs = response.files;
        } catch (e) {
            console.error(e);
        }
    }

    async function loadActive(log: string) {
        activeContents = null;
        loading = true;

        try {
            let response = await getServerLog(log);
            activeContents = response;
        } catch (e) {}

        loading = false;
    }

    let active: string | null = null;
    let activeContents: string | null = null;
    let loading = false;

    onMount(() => {
        load().then().catch();
    });

    $: {
        if (active != null) {
            loadActive(active).then().catch();
        }
    }
</script>

<div class="wrapper">
    <div class="heading">
        <h1 class="title">Server Logs</h1>
        <span class="ident">POCKET RELAY MANAGER</span>
        <p class="text">
            Click a log file below to view its contents and press the download
            button to download a copy
        </p>

        <select class="select" bind:value={active}>
            <option value={null}>None</option>
            {#each logs as file}
                <option value={file}>{file}</option>
            {/each}
        </select>
    </div>

    <div class="card log">
        {#if loading}
            <Loader />
        {:else if activeContents !== null}
            <pre>{activeContents}</pre>
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
