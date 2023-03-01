<script lang="ts">
    import { isAdmin, player, type RequestError } from "$lib/api/api";
    import {
        encodeInventory,
        encodePlayerBase,
        parseInventory,
        parsePlayerBase,
        type PlayerBase,
    } from "$lib/api/parser";
    import {
        getPlayerData,
        setPlayerData,
        type PlayerData,
    } from "$lib/api/players";
    import { onMount } from "svelte";
    import InventoryCharacters from "./inventory/InventoryCharacters.svelte";
    import InventoryConsumables from "./inventory/InventoryConsumables.svelte";
    import InventoryGear from "./inventory/InventoryGear.svelte";
    import InventoryOther from "./inventory/InventoryOther.svelte";
    import InventoryWeaponMods from "./inventory/InventoryWeaponMods.svelte";
    import InventoryWeapons from "./inventory/InventoryWeapons.svelte";
    import Loader from "./Loader.svelte";

    export let playerId: number;

    let loading: boolean = true;

    let playerBase: PlayerBase | null = null;
    let inventory: number[] = [];
    let credits: number = 0;

    async function load() {
        loading = true;
        console.debug("Loading inventory");

        let response: PlayerData;
        try {
            response = await getPlayerData(playerId, "Base");
        } catch (e) {
            let err = e as RequestError;
            console.error(err);
            loading = false;
            return;
        }
        playerBase = parsePlayerBase(response.value);
        if (playerBase == null) return;
        credits = playerBase.credits;
        inventory = parseInventory(playerBase.inventory);
        loading = false;
    }

    async function save() {
        if (!playerBase) return;
        loading = true;
        console.debug("Saving inventory");

        let encodedInventory = encodeInventory(inventory);
        let newBase: PlayerBase = {
            ...playerBase,
            credits,
            inventory: encodedInventory,
        };

        let encodedBase = encodePlayerBase(newBase);
        try {
            await setPlayerData(playerId, "Base", encodedBase);
            playerBase = newBase;
        } catch (e) {
            let err = e as RequestError;
            console.error(err);
            loading = false;
            return;
        }
    }

    /**
     * Reset the contents of the inventory by reparsing the
     * stored inventory
     */
    function reset() {
        if (!playerBase) return;
        inventory = parseInventory(playerBase.inventory);
    }

    const enum Tab {
        Characters,
        Weapons,
        WeaponMods,
        Consumables,
        Gear,
        Other,
    }

    let tab = Tab.Characters;

    onMount(load);
</script>

<div class="wrapper">
    <div class="tabs">
        <slot />
        {#if isAdmin($player)}
            <button
                class="button button--alt"
                on:click={save}
                title="Saves any changes made to the inventory"
            >
                Save
            </button>
            <button class="button button--alt" on:click={reset}> Reset </button>
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
        <button
            class="button tab"
            class:tab--active={tab == Tab.Other}
            on:click={() => (tab = Tab.Other)}
        >
            Other
        </button>
    </div>

    <div class="contents">
        {#if inventory.length == 0}
            <h2>Inventory not initialized</h2>
            <p class="text">
                This account inventory has not yet been created. In order to
                create the inventory the player must have visited the
                multiplayer menu
            </p>
        {:else}
            {#if loading}
                <Loader />
            {/if}
            {#if tab == Tab.Characters}
                <InventoryCharacters {inventory} />
            {:else if tab == Tab.Weapons}
                <InventoryWeapons {inventory} />
            {:else if tab == Tab.WeaponMods}
                <InventoryWeaponMods {inventory} />
            {:else if tab == Tab.Consumables}
                <InventoryConsumables {inventory} />
            {:else if tab == Tab.Gear}
                <InventoryGear {inventory} />
            {:else if tab == Tab.Other}
                <InventoryOther bind:credits />
            {/if}
        {/if}
    </div>
</div>

<style lang="scss">
    .wrapper {
        display: flex;
        flex-flow: column;
        height: 100%;

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
