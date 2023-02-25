<script lang="ts">
    import {
        CHARACTER_CLASSES,
        type Category,
        type Character,
    } from "$lib/data/inventory";

    const classes = CHARACTER_CLASSES;

    export let inventory: number[];
    let selected: Category<Character> = classes[0];
</script>

<div class="wrapper">
    <aside class="tabs">
        {#each classes as category}
            <button
                class="button tab"
                class:tab--active={selected.name == category.name}
                on:click={() => (selected = category)}
            >
                {category.name}
            </button>
        {/each}
    </aside>
    <div class="contents">
        {#each selected.values as character}
            <div class="card">
                <h2>{character.name}</h2>
                <img
                    src={`/assets/characters/${character.image}`}
                    alt=""
                    width="86"
                    height="auto"
                />
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    .wrapper {
        flex: auto;
        display: flex;
        gap: 1rem;
        height: 100%;
    }

    .contents {
        flex: auto;
        height: 100%;
        overflow: auto;
    }

    .tab {
        background-color: #0f0f0f;
    }

    .tab--active {
        background-color: #4e5382;
    }

    .tabs {
        display: flex;
        flex-flow: column;
        gap: 1rem;
    }
</style>
