<script lang="ts">
    import {
        createDefaultPowerSelections,
        type PlayerCharacter,
        type PlayerData,
    } from "$lib/data/parser";
    import { MAX_CHARACTER_LEVEL } from "$lib/data/inventory";
    import LevelInput from "$lib/components/inventory/LevelInput.svelte";
    import InventoryCharacterPowerLevel from "./power/PowerLevelDisplay.svelte";
    import InventoryCharacterPowerEditor from "./power/PowerEditor.svelte";
    import WeaponEditor from "./weapon/WeaponEditor.svelte";

    export let playerData: PlayerData;
    export let playerCharacter: PlayerCharacter;
    export let editable: boolean;
    export let classLevel: number;

    // Whether to cap the maximum power level to the games defaults
    let cappedPoweredLevels: boolean = true;

    // Level of the character
    $: characterLevel =
        playerData.base.inventory[playerCharacter.character.index] ?? 0;

    $: maximumPoints = cappedPoweredLevels
        ? getAvailablePoints(classLevel)
        : Infinity;
    $: distributedPoints = getDistributedPoints(playerCharacter);
    $: availablePoints = maximumPoints - distributedPoints;

    function getAvailablePoints(classLevel: number) {
        let points = 0;

        if (classLevel >= 1) {
            points += 2; // level 1
        }
        if (classLevel >= 2) {
            points += (Math.min(classLevel, 7) - 1) * 3; // levels 2–7
        }
        if (classLevel >= 8) {
            points += (Math.min(classLevel, 12) - 7) * 4; // levels 8–12
        }
        if (classLevel >= 13) {
            points += (Math.min(classLevel, 16) - 12) * 5; // levels 13–16
        }
        if (classLevel >= 17) {
            points += (Math.min(classLevel, 20) - 16) * 6; // levels 17–20
        }

        return points;
    }

    function getDistributedPoints(playerCharacter: PlayerCharacter) {
        let points = 0;

        // Only check the first 5 (The rest are Consumable_ powers for like rockets and such)
        for (let i = 0; i <= Math.min(playerCharacter.powers.length, 4); i++) {
            const powerProgress = playerCharacter.powers[i]?.powerProgress ?? 0;
            const rank = Math.floor(powerProgress);
            points += (rank * (rank + 1)) / 2;
        }

        return points;
    }

    function onResetPowers() {
        for (const power of playerCharacter.powers) {
            power.powerProgress = 0.0;
            power.powerSelections = createDefaultPowerSelections();
        }

        playerData = playerData;
    }
</script>

<div class="character">
    <div class="character__head">
        <div class="character__content">
            <div class="character__icon-wrapper">
                <img
                    class="character__icon"
                    src={`/assets/characters/${playerCharacter.character.image}`}
                    alt={playerCharacter.character.name}
                    width={140}
                    height={280}
                />
            </div>
            <div class="character__details">
                <h2>Level {characterLevel}</h2>
                <p>
                    {playerCharacter.character.name} - {playerCharacter.characterName}
                </p>

                {#if editable}
                    <div class="input">
                        <span class="input__label">Level</span>
                        <LevelInput
                            bind:value={
                                playerData.base.inventory[
                                    playerCharacter.character.index
                                ]
                            }
                            min={0}
                            max={MAX_CHARACTER_LEVEL}
                        />
                    </div>
                {/if}

                <WeaponEditor bind:playerData bind:playerCharacter {editable} />
            </div>
        </div>
        <div class="character__power-levels">
            {#each playerCharacter.powers as power}
                {#if power.power !== undefined}
                    <InventoryCharacterPowerLevel powerData={power} />
                {/if}
            {/each}
        </div>
    </div>
</div>

<div class="character-powers">
    {#if editable}
        <div class="character-powers__actions">
            <button type="button" class="button" on:click={onResetPowers}>
                Reset Powers
            </button>
            <button
                type="button"
                class="button"
                on:click={() => {
                    cappedPoweredLevels = !cappedPoweredLevels;
                }}
            >
                {#if cappedPoweredLevels}
                    Disable Power Level Cap
                {:else}
                    Enable Power Level Cap
                {/if}
            </button>

            {#if !cappedPoweredLevels}
                <p class="uncapped-notice">
                    Uncapped power levels will be reverted by the game
                    automatically in most cases without additional client side
                    modifications
                </p>
            {/if}

            {#if availablePoints !== Infinity}
                <p>
                    {availablePoints} point{availablePoints === 1 ? "" : "s"} remaining
                    of {maximumPoints}
                </p>
            {/if}
        </div>
    {/if}

    {#each playerCharacter.powers as power}
        {#if power.power !== undefined}
            <InventoryCharacterPowerEditor
                bind:powerData={power}
                bind:playerData
                {editable}
                {availablePoints}
            />
        {/if}
    {/each}
</div>

<style lang="scss">
    .character-powers {
        padding: 1rem;
        border: 1px solid #444;
        border-radius: 0.25rem;
    }

    .character-powers__actions {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    .uncapped-notice {
        color: #999;
    }

    .character__head {
        display: flex;
        justify-content: space-between;
        width: 100%;
        gap: 1rem;
        align-items: center;
    }

    .character {
        display: flex;
        gap: 1rem;
        align-items: center;
        border: 1px solid #444;
        padding: 1rem;
        border-radius: 0.25rem;
        flex-wrap: wrap;
        margin-bottom: 2rem;

        &__icon {
            width: auto;
            height: 280px;
            margin-right: 1rem;
            padding: 0 2rem 0 1rem;
        }

        &__details {
            display: flex;
            flex-flow: column;
            gap: 1rem;
            flex: auto;
        }

        &__content {
            display: flex;
            flex-flow: row;
        }
    }

    @media screen and (max-width: 1200px) {
        .character__head {
            flex-flow: column;
            align-items: flex-start;
            flex: auto;
        }
    }

    @media screen and (max-width: 800px) {
        .character__content {
            flex-flow: column;
            align-items: flex-start;
            flex: auto;
        }
    }
</style>
