<script lang="ts">
    import { page } from "$app/stores";
    import Classes from "$lib/components/Classes.svelte";
    const playerId = parseInt($page.params.id);
    if (Number.isNaN(playerId)) throw "NaN Player ID";
</script>

<h1 class="title">Player Classes</h1>
<span class="ident">POCKET RELAY MANAGER</span>
<p class="text">
    Below is a list of all your classes along with their level and total
    promotions
</p>

<div>
    <a href={`/players/${playerId}`} class="button button--alt back">Back</a>
</div>

<Classes {playerId} isAdmin />

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
