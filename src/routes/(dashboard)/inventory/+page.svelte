<script lang="ts">
    import { player } from "$lib/api/api";
    import Inventory from "$lib/components/Inventory.svelte";
</script>

<div class="wrapper">
    <h1 class="title">Inventory</h1>
    <span class="ident">POCKET RELAY MANAGER</span>
    <p class="text">Click an inventory category to view its contents</p>
    <Inventory playerId={$player.id} />
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
