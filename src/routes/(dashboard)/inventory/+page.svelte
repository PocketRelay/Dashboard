<script lang="ts">
    import { player } from "$lib/api/api";
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
    let credits = 0;

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
            await setPlayerData($player.id, "Base", encodedPlayerBase);

            playerBase = newBase;
        } catch (e) {}
    }

    function onReset() {
        if (playerBase != null) {
            inventory = parseInventory(playerBase.inventory);
        }
    }

    $: {
        load($player.id).then().catch();
    }
</script>

<div class="wrapper">
    <h1 class="title">Inventory</h1>
    <span class="ident">POCKET RELAY MANAGER</span>
    <p class="text">Click an inventory category to view its contents</p>
    {#if inventory}
        <Inventory on:save={onSave} on:reset={onReset} {inventory} {credits} />
    {/if}
</div>

<style lang="scss">
    .wrapper {
        height: 100%;

        display: flex;
        flex-flow: column;
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
