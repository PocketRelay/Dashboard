<script lang="ts">
    import { page } from "$app/stores";
    import Inventory from "$lib/components/Inventory.svelte";

    const playerId = parseInt($page.params.id);
    if (Number.isNaN(playerId)) throw "NaN Player ID";
</script>

<div class="wrapper">
    <h1 class="title">Other Inventory</h1>
    <span class="ident">POCKET RELAY MANAGER</span>
    <p class="text">Click an inventory category to view its contents</p>
    <Inventory {playerId}>
        <a href={`/players/${playerId}`} class="button button--alt back">
            Back
        </a>
    </Inventory>
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

    .title,
    .ident,
    .text {
        margin-bottom: 0.5rem;
    }

    .text {
        color: #999999;
    }
</style>
