<script lang="ts">
    import { isAdmin, player } from "$lib/api/api";

    export let level: number;
    export let promotions: number;

    export let name: string;

    $: {
        if (level > 20) level = 20;
        if (level < 1) level = 1;

        if (promotions < 0) promotions = 0;
    }
</script>

<div class="card">
    <h2>{name}</h2>
    <img src={`/assets/icons/${name}.webp`} alt={name} />

    <div class="fields">
        <div>
            <h3>Level</h3>

            {#if isAdmin($player)}
                <label class="input">
                    <span class="input__label" />
                    <input
                        type="number"
                        class="input__value"
                        bind:value={level}
                        min={1}
                        max={20}
                    />
                </label>
            {:else}
                <span class="annot">{level}</span>
            {/if}
        </div>
        <div>
            <h3>Promotions</h3>

            {#if isAdmin($player)}
                <label class="input">
                    <span class="input__label" />
                    <input
                        type="number"
                        class="input__value"
                        bind:value={promotions}
                        min={0}
                    />
                </label>
            {:else}
                <span class="annot">{promotions}</span>
            {/if}
        </div>
    </div>
</div>

<style lang="scss">
    .card {
        flex: auto;
        text-align: center;
    }

    .fields {
        display: flex;
        flex-flow: column;
        gap: 1rem;
        max-width: 500px;
        margin: 0 auto;
    }
</style>
