<script lang="ts">
    import { player } from "$lib/api/api";
    import { PlayerRole } from "$lib/api/players";
    import { createEventDispatcher } from "svelte";
    import InventoryCharacters from "./inventory/InventoryCharacters.svelte";
    import InventoryWeaponMods from "./inventory/InventoryWeaponMods.svelte";
    import InventoryWeapons from "./inventory/InventoryWeapons.svelte";

    export let inventory: number[];

    interface Events {
        // Event triggering a save of the inventory
        save: undefined;
        reset: undefined;
    }

    let dispatch = createEventDispatcher<Events>();

    const enum Tab {
        Characters,
        Weapons,
        WeaponMods,
        Consumables,
        Gear,
    }

    let tab = Tab.Characters;
</script>

<div class="wrapper">
    <div class="tabs">
        {#if $player.role == PlayerRole.Admin || $player.role == PlayerRole.SuperAdmin}
            <button
                class="button button--alt"
                on:click={() => dispatch("save")}
            >
                Save
            </button>
            <button
                class="button button--alt"
                on:click={() => dispatch("reset")}
            >
                Reset
            </button>
        {/if}
        <button
            class="button tab"
            class:tab--active={tab == Tab.Characters}
            on:click={() => (tab = Tab.Characters)}
        >
            Characters
        </button>
        <button
            class="button tab"
            class:tab--active={tab == Tab.Weapons}
            on:click={() => (tab = Tab.Weapons)}
        >
            Weapons
        </button>
        <button
            class="button tab"
            class:tab--active={tab == Tab.WeaponMods}
            on:click={() => (tab = Tab.WeaponMods)}
        >
            Weapon Mods
        </button>
        <button
            class="button tab"
            class:tab--active={tab == Tab.Consumables}
            on:click={() => (tab = Tab.Consumables)}
        >
            Consumables
        </button>
        <button
            class="button tab"
            class:tab--active={tab == Tab.Gear}
            on:click={() => (tab = Tab.Gear)}
        >
            Gear
        </button>
    </div>

    <div class="contents">
        {#if tab == Tab.Characters}
            <InventoryCharacters {inventory} />
        {:else if tab == Tab.Weapons}
            <InventoryWeapons {inventory} />
        {:else if tab == Tab.WeaponMods}
            <InventoryWeaponMods {inventory} />
        {/if}
    </div>
</div>

<style lang="scss">
    .wrapper {
        display: flex;
        flex-flow: column;

        flex: auto;
        overflow: auto;
        gap: 1rem;
    }

    .contents {
        flex: auto;
        display: flex;
        flex-flow: column;
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
        gap: 1rem;
    }
</style>
