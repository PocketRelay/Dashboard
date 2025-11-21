<script lang="ts">
    import {
        createDefaultPowerSelections,
        type PlayerCharacterPower,
        type PlayerData,
    } from "$lib/data/parser";
    import type { Power } from "$lib/data/powers";
    import InventoryCharacterPowerLevel from "./PowerLevelDisplay.svelte";
    import PowerEditorEvolution from "./PowerEditorEvolution.svelte";

    export let playerData: PlayerData;
    export let powerData: PlayerCharacterPower;
    export let editable: boolean;

    $: power = powerData.power! as Power;

    enum Path {
        A,
        B,
    }

    function onChoosePowerProgress(progress: number) {
        if (progress === 1.0 && powerData.powerProgress === 1.0) {
            // Selecting the first box twice will clear it
            powerData.powerProgress = 0.0;
        } else {
            powerData.powerProgress = progress;
        }

        if (progress < 3.0) {
            powerData.powerSelections = createDefaultPowerSelections();
        }

        playerData = playerData;
    }

    function getPathAtIndex(index: number): Path | undefined {
        const [a, b] = powerData.powerSelections[index];

        return a ? Path.A : b ? Path.B : undefined;
    }

    function setPathAtIndex(index: number, path: Path) {
        powerData.powerSelections[index] =
            path === Path.A ? [true, false] : [false, true];
    }

    function onChoosePowerPath(progress: number, index: number, path: Path) {
        for (let i = 0; i < index; i += 1) {
            const pathAt = getPathAtIndex(i);
            if (pathAt === undefined) {
                setPathAtIndex(i, path);
            }
        }

        setPathAtIndex(index, path);

        powerData.powerProgress = progress;
        playerData = playerData;
    }
</script>

<div class="evolutions-wrapper">
    <InventoryCharacterPowerLevel {powerData} />

    <div class="evolutions">
        <PowerEditorEvolution
            index={0}
            active={powerData.powerProgress > 0}
            onClickEvolution={() => onChoosePowerProgress(1.0)}
            {power}
            {editable}
        />

        <PowerEditorEvolution
            index={1}
            active={powerData.powerProgress > 1}
            onClickEvolution={() => onChoosePowerProgress(2.0)}
            {power}
            {editable}
        />

        <PowerEditorEvolution
            index={2}
            active={powerData.powerProgress > 2}
            onClickEvolution={() => onChoosePowerProgress(3.0)}
            {power}
            {editable}
        />

        <div class="evolution-group">
            <PowerEditorEvolution
                index={3}
                active={powerData.powerProgress > 3 &&
                    getPathAtIndex(0) == Path.A}
                onClickEvolution={() => onChoosePowerPath(4.0, 0, Path.A)}
                {power}
                {editable}
            />

            <PowerEditorEvolution
                index={4}
                active={powerData.powerProgress > 3 &&
                    getPathAtIndex(0) == Path.B}
                onClickEvolution={() => onChoosePowerPath(4.0, 0, Path.B)}
                {power}
                {editable}
            />
        </div>

        <div class="evolution-group">
            <PowerEditorEvolution
                index={5}
                active={powerData.powerProgress > 4 &&
                    getPathAtIndex(1) == Path.A}
                onClickEvolution={() => onChoosePowerPath(5.0, 1, Path.A)}
                {power}
                {editable}
            />

            <PowerEditorEvolution
                index={6}
                active={powerData.powerProgress > 4 &&
                    getPathAtIndex(1) == Path.B}
                onClickEvolution={() => onChoosePowerPath(5.0, 1, Path.B)}
                {power}
                {editable}
            />
        </div>
        <div class="evolution-group">
            <PowerEditorEvolution
                index={7}
                active={powerData.powerProgress > 5 &&
                    getPathAtIndex(2) == Path.A}
                onClickEvolution={() => onChoosePowerPath(6.0, 2, Path.A)}
                {power}
                {editable}
            />

            <PowerEditorEvolution
                index={8}
                active={powerData.powerProgress > 5 &&
                    getPathAtIndex(2) == Path.B}
                onClickEvolution={() => onChoosePowerPath(6.0, 2, Path.B)}
                {power}
                {editable}
            />
        </div>
    </div>
</div>

<style lang="scss">
    .evolutions {
        display: flex;
        flex-flow: row;
        gap: 1rem;
        align-items: center;
        overflow-x: auto;
        width: 100%;
        padding: 1rem;
        border: 1px solid #444;
        border-radius: 0.25rem;
        margin-bottom: 1rem;
    }

    .evolutions-wrapper {
        display: flex;
        flex-flow: column;
        gap: 2rem;
        align-items: flex-start;
    }

    .evolution-group {
        display: flex;
        flex-flow: column;
        gap: 1rem;
    }
</style>
