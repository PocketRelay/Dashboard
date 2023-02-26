<script lang="ts">
    import { player } from "$lib/api/api";
    import { PlayerRole } from "$lib/api/players";
    import {
        CONSUMABLES,
        MAX_GEAR_LEVEL,
        UNSAFE_MAX,
        type Category,
        type TieredConsumable,
    } from "$lib/data/inventory";

    const weaponMods = CONSUMABLES;

    export let inventory: number[];
    let selected: Category<TieredConsumable> = weaponMods[0];

    let tierNames = ["I", "II", "III", "IV", "V"];
</script>

<div class="wrapper">
    <aside class="tabs">
        {#each weaponMods as category}
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
        {#each selected.values as consumable}
            <div class="card">
                <img src={`/assets/consumables/${consumable.image}`} alt="" />

                <div class="card__values">
                    <h2>{consumable.name}</h2>
                    {#each consumable.indexes as index, i}
                        <div class="tier">
                            <h3 class="tier__name">{tierNames[i]}</h3>

                            {#if $player.role == PlayerRole.Admin || $player.role == PlayerRole.SuperAdmin}
                                <div class="tier__values">
                                    <label class="input input--value">
                                        <input
                                            class="input__value"
                                            type="number"
                                            bind:value={inventory[index]}
                                            min="0"
                                            max="255"
                                        />
                                    </label>

                                    <button
                                        class="button tier__button"
                                        on:click={() => (inventory[index] = 0)}
                                        >Min</button
                                    >
                                    <button
                                        class="button tier__button"
                                        on:click={() =>
                                            (inventory[index] = MAX_GEAR_LEVEL)}
                                        >Max</button
                                    >
                                    <button
                                        class="button tier__button"
                                        on:click={() =>
                                            (inventory[index] = UNSAFE_MAX)}
                                        >GOD</button
                                    >
                                </div>
                            {:else}
                                <span class="card__value"
                                    >{inventory[index]}</span
                                >
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    .card {
        display: flex;
        flex-flow: column;
        gap: 2rem;
        align-items: center;
        padding: 1rem;
        flex: auto;
    }

    .tier {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: space-between;
    }

    .tier__name {
        width: 2rem;
    }

    .tier__button {
        padding: 0.5rem;
        background-color: #272727;
    }

    .tier__values {
        display: flex;
        gap: 1rem;
    }

    .card__values {
        display: flex;
        flex-flow: column;
        gap: 1rem;
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
