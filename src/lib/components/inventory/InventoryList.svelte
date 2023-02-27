<script lang="ts">
    type Tab<V> = { name: string } & V;

    export let tabs: Tab<any>[];

    let selected: typeof tabs[0] = tabs[0];
</script>

<div class="wrapper">
    <aside class="tabs">
        {#each tabs as tab}
            <button
                class="button tab"
                class:tab--active={selected.name == tab.name}
                on:click={() => (selected = tab)}
            >
                {tab.name}
            </button>
        {/each}
    </aside>

    <div class="contents">
        <slot {selected} />
    </div>
</div>

<style lang="scss">
    // Wrapper to span alotted height
    .wrapper {
        flex: auto;
        display: flex;
        gap: 1rem;
        height: 100%;
    }

    // Content handling preventing overflow
    .contents {
        flex: auto;
        height: 100%;
        overflow: auto;
        display: flex;
        flex-flow: row wrap;
        gap: 1rem;
        align-content: flex-start;
    }

    // Tabs verticle list
    .tabs {
        display: flex;
        flex-flow: column;
        gap: 1rem;
    }

    // Default tab background color
    .tab {
        background-color: #0f0f0f;
    }

    // Handle active tab highlighting
    .tab--active {
        background-color: #4e5382;
    }
</style>
