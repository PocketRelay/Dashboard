<script lang="ts">
    import { isAdmin, player } from "$lib/api/api";
    import { MAX_WEAPON_LEVEL, WEAPON_CATEGORIES } from "$lib/data/inventory";
    import InventoryList from "./InventoryList.svelte";
    import LevelInput from "./LevelInput.svelte";

    // Inventory values array
    export let inventory: number[];
</script>

<InventoryList tabs={WEAPON_CATEGORIES} let:selected>
    {#each selected.values as weapon}
        <div class="card inv-card">
            <img
                src={`/assets/weapons/${weapon.image}`}
                alt={weapon.name}
                width={160}
                height={120}
            />

            <div class="inv-card__value">
                <h2>{weapon.name}</h2>
                <span class="annot">
                    {inventory[weapon.level_index]}
                </span>

                {#if isAdmin($player)}
                    <LevelInput
                        bind:value={inventory[weapon.level_index]}
                        min={0}
                        max={MAX_WEAPON_LEVEL}
                    />
                {/if}
            </div>
        </div>
    {/each}
</InventoryList>
