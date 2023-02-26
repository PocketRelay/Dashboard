<script lang="ts">
    import { player } from "$lib/api/api";
    import { PlayerRole } from "$lib/api/players";
    import {
        CONSUMABLES,
        CORE_CONSUMABLES,
        GEAR_CONSUMABLES,
        MAX_GEAR_LEVEL,
        OTHER_CONSUMABLES,
        UNSAFE_MAX,
        type Category,
        type TieredConsumable,
    } from "$lib/data/inventory";

    export let inventory: number[];

    const enum Tab {
        Gear,
        Core,
        Other,
    }

    let tab = Tab.Gear;
</script>

<div class="wrapper">
    <aside class="tabs">
        <button
            class="button tab"
            class:tab--active={tab == Tab.Gear}
            on:click={() => (tab = Tab.Gear)}
        >
            Gear
        </button>
        <button
            class="button tab"
            class:tab--active={tab == Tab.Core}
            on:click={() => (tab = Tab.Core)}
        >
            Core
        </button>
        <button
            class="button tab"
            class:tab--active={tab == Tab.Other}
            on:click={() => (tab = Tab.Other)}
        >
            Other
        </button>
    </aside>
    <div class="contents">
        {#if tab == Tab.Gear}
            {#each GEAR_CONSUMABLES as consumable}
                <div class="card" title={consumable.text}>
                    <div class="card__left">
                        <img src={`/assets/gear/${consumable.image}`} alt="" />
                    </div>

                    <div class="card__right">
                        <h2 class="card__name">{consumable.name}</h2>
                        <span class="card__value">
                            {inventory[consumable.index]}
                        </span>

                        {#if $player.role == PlayerRole.Admin || $player.role == PlayerRole.SuperAdmin}
                            <label class="input">
                                <input
                                    class="input__value"
                                    type="number"
                                    bind:value={inventory[consumable.index]}
                                    min="0"
                                    max="255"
                                />
                            </label>

                            <div class="actions">
                                <button
                                    class="button action"
                                    on:click={() =>
                                        (inventory[consumable.index] = 0)}
                                    >Min</button
                                >
                                <button
                                    class="button action"
                                    on:click={() =>
                                        (inventory[consumable.index] =
                                            MAX_GEAR_LEVEL)}>Max</button
                                >
                                <button
                                    class="button action"
                                    on:click={() =>
                                        (inventory[consumable.index] =
                                            UNSAFE_MAX)}>GOD</button
                                >
                            </div>
                        {/if}
                    </div>
                </div>
            {/each}
        {:else if tab == Tab.Core}
            {#each CORE_CONSUMABLES as consumable}
                <div class="card" title={consumable.text}>
                    <div class="card__left">
                        <img
                            src={`/assets/consumables/${consumable.stock_image}`}
                            alt=""
                        />
                    </div>

                    <div class="card__right">
                        <h2 class="card__name">{consumable.name}</h2>
                        <span class="card__value">
                            Stock: {inventory[consumable.stock_index]}
                        </span>
                        <span class="card__value">
                            Capacity: {inventory[consumable.capacity_index]}
                        </span>

                        {#if $player.role == PlayerRole.Admin || $player.role == PlayerRole.SuperAdmin}
                            <div>
                                <label class="input">
                                    <span class="input__label">Stock</span>
                                    <input
                                        class="input__value"
                                        type="number"
                                        bind:value={inventory[
                                            consumable.stock_index
                                        ]}
                                        min="0"
                                        max="255"
                                    />
                                </label>

                                <div class="actions">
                                    <button
                                        class="button action"
                                        on:click={() =>
                                            (inventory[
                                                consumable.stock_index
                                            ] = 0)}>Min</button
                                    >
                                    <button
                                        class="button action"
                                        on:click={() =>
                                            (inventory[consumable.stock_index] =
                                                MAX_GEAR_LEVEL)}>Max</button
                                    >
                                    <button
                                        class="button action"
                                        on:click={() =>
                                            (inventory[consumable.stock_index] =
                                                UNSAFE_MAX)}>GOD</button
                                    >
                                </div>
                            </div>
                            <div>
                                <label class="input">
                                    <span class="input__label">Capacity</span>
                                    <input
                                        class="input__value"
                                        type="number"
                                        bind:value={inventory[
                                            consumable.capacity_index
                                        ]}
                                        min="0"
                                        max="255"
                                    />
                                </label>

                                <div class="actions">
                                    <button
                                        class="button action"
                                        on:click={() =>
                                            (inventory[
                                                consumable.capacity_index
                                            ] = 0)}>Min</button
                                    >
                                    <button
                                        class="button action"
                                        on:click={() =>
                                            (inventory[
                                                consumable.capacity_index
                                            ] = MAX_GEAR_LEVEL)}>Max</button
                                    >
                                    <button
                                        class="button action"
                                        on:click={() =>
                                            (inventory[
                                                consumable.capacity_index
                                            ] = UNSAFE_MAX)}>GOD</button
                                    >
                                </div>
                            </div>
                        {/if}
                    </div>
                </div>
            {/each}
        {:else if tab == Tab.Other}
            {#each OTHER_CONSUMABLES as consumable}
                <div class="card">
                    <div class="card__left">
                        <img
                            src={`/assets/consumables/${consumable.image}`}
                            alt=""
                        />
                    </div>

                    <div class="card__right">
                        <h2 class="card__name">{consumable.name}</h2>
                        <span class="card__value">
                            {inventory[consumable.index]}
                        </span>

                        {#if $player.role == PlayerRole.Admin || $player.role == PlayerRole.SuperAdmin}
                            <label class="input">
                                <input
                                    class="input__value"
                                    type="number"
                                    bind:value={inventory[consumable.index]}
                                    min="0"
                                    max="255"
                                />
                            </label>

                            <div class="actions">
                                <button
                                    class="button action"
                                    on:click={() =>
                                        (inventory[consumable.index] = 0)}
                                    >Min</button
                                >
                                <button
                                    class="button action"
                                    on:click={() =>
                                        (inventory[consumable.index] =
                                            MAX_GEAR_LEVEL)}>Max</button
                                >
                                <button
                                    class="button action"
                                    on:click={() =>
                                        (inventory[consumable.index] =
                                            UNSAFE_MAX)}>GOD</button
                                >
                            </div>
                        {/if}
                    </div>
                </div>
            {/each}}
        {/if}
    </div>
</div>

<style lang="scss">
    .card {
        display: flex;
        flex-flow: column;
        gap: 2rem;
        align-items: center;
        justify-content: center;
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
