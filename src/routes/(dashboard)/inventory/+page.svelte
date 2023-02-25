<script lang="ts">
    import { player } from "$lib/api/api";
    import {
        parseInventory,
        parsePlayerBase,
        type PlayerBase,
    } from "$lib/api/parser";
    import { getPlayerData } from "$lib/api/players";
    import Inventory from "$lib/components/Inventory.svelte";

    let playerBase: PlayerBase | null = null;
    let inventory: number[] | null = null;

    async function load(player: number) {
        try {
            let response = await getPlayerData(player, "Base");
            playerBase = parsePlayerBase(response.value);
            if (playerBase != null) {
                inventory = parseInventory(playerBase.inventory);
            }
        } catch (e) {
            console.log(e);
        }
    }

    function onSave() {
        console.log("Save");
    }

    $: {
        load($player.id).then().catch();
    }
</script>

<h1 class="title">Inventory</h1>
<span class="ident">POCKET RELAY MANAGER</span>
<p class="text">Click an inventory category to view its contents</p>
{#if inventory}
    <Inventory on:save={onSave} {inventory} />
{/if}

<style lang="scss">
    .title,
    .ident,
    .text {
        margin-bottom: 0.5rem;
    }

    .text {
        color: #999999;
    }
</style>
