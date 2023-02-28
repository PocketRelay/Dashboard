<script lang="ts">
    import { page } from "$app/stores";
    import {
        encodeInventory,
        encodePlayerBase,
        parseInventory,
        parsePlayerBase,
        type PlayerBase,
    } from "$lib/api/parser";
    import { getPlayerData, setPlayerData } from "$lib/api/players";
    import Inventory from "$lib/components/Inventory.svelte";

    let playerBase: PlayerBase | null = null;
    let inventory: number[] | null = null;
    let credits: number = 0;

    const playerId = parseInt($page.params.id);
    if (Number.isNaN(playerId)) throw "NaN Player ID";

    async function load(player: number) {
        try {
            let response = await getPlayerData(player, "Base");
            playerBase = parsePlayerBase(response.value);
            if (playerBase != null) {
                credits = playerBase.credits;
                inventory = parseInventory(playerBase.inventory);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function onSave() {
        if (!inventory || !playerBase) {
            return;
        }
        console.log("Save");

        try {
            let encodedInventory = encodeInventory(inventory);
            let newBase: PlayerBase = {
                ...playerBase,
                credits,
                inventory: encodedInventory,
            };
            let encodedPlayerBase = encodePlayerBase(newBase);
            await setPlayerData(playerId, "Base", encodedPlayerBase);

            playerBase = newBase;
        } catch (e) {}
    }

    function onReset() {
        if (playerBase != null) {
            inventory = parseInventory(playerBase.inventory);
        }
    }

    load(playerId).then().catch();
</script>

<div class="wrapper">
    <h1 class="title">Other Inventory</h1>
    <span class="ident">POCKET RELAY MANAGER</span>
    <div class="w">
        <a href={`/players/${playerId}`} class="button button--alt back">Back</a
        >
        <p class="text">Click an inventory category to view its contents</p>
    </div>
    {#if inventory}
        <Inventory
            on:save={onSave}
            on:reset={onReset}
            {inventory}
            bind:credits
        />
    {/if}
</div>

<style lang="scss">
    .back {
        display: inline-block;
        vertical-align: middle;
    }

    .wrapper {
        height: 100%;

        display: flex;
        flex-flow: column;
    }

    .w {
        display: flex;
        flex-flow: row;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .title,
    .ident,
    .text {
        margin-bottom: 0.5rem;
    }

    .text {
        color: #999999;
    }
</style>
