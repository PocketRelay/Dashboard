<script lang="ts">
    import { player } from "$lib/api/api";
    import { PlayerRole } from "$lib/api/players";
    import {
        CHARACTER_CLASSES,
        MAX_CHARACTER_LEVEL,
        UNSAFE_MAX,
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
                <div class="card__left">
                    <img src={`/assets/characters/${character.image}`} alt="" />
                </div>

                <div class="card__right">
                    <h2 class="card__name">{character.name}</h2>
                    <span class="card__value">
                        {inventory[character.index]}
                    </span>

                    {#if $player.role == PlayerRole.Admin || $player.role == PlayerRole.SuperAdmin}
                        <label class="input">
                            <input
                                class="input__value"
                                type="number"
                                bind:value={inventory[character.index]}
                                min="0"
                                max="255"
                            />
                        </label>

                        <div class="actions">
                            <button
                                class="button action"
                                on:click={() =>
                                    (inventory[character.index] = 0)}
                                >Min</button
                            >
                            <button
                                class="button action"
                                on:click={() =>
                                    (inventory[character.index] =
                                        MAX_CHARACTER_LEVEL)}>Max</button
                            >
                            <button
                                class="button action"
                                on:click={() =>
                                    (inventory[character.index] = UNSAFE_MAX)}
                                >GOD</button
                            >
                        </div>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    .card {
        display: flex;
        gap: 2rem;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        flex: auto;
    }

    .card__right {
        flex: auto;
        display: flex;
        flex-flow: column;
        gap: 1rem;
        max-width: 450px;
    }

    .actions {
        display: flex;
        flex-flow: row;
        gap: 1rem;
    }

    .action {
        flex: auto;
    }

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
        display: flex;
        flex-flow: row wrap;
        gap: 1rem;
        align-content: flex-start;
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

    .card__value {
        color: #72b2b6;
        font-weight: bold;
    }
</style>
