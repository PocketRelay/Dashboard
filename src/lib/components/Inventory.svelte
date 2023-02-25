<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let inventory: number[];

    interface Events {
        // Event triggering a save of the inventory
        save: undefined;
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

<div class="tabs">
    <button class="button" on:click={() => dispatch("save")}>Save</button>
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

<style lang="scss">
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
