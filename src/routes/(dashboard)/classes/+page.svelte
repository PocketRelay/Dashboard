<script lang="ts">
    import { isAdmin, player } from "$lib/api/api";
    import Classes from "$lib/components/Classes.svelte";
</script>

<h1 class="title">Classes</h1>
<span class="ident">POCKET RELAY MANAGER</span>
<p class="text">
    Below is a list of all your classes along with their level and total
    promotions
</p>

<Classes playerId={$player.id} />

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
