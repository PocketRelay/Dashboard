<script lang="ts">
    import { page } from "$app/stores";
    import { isAdmin, player } from "$lib/api/api";
    import {
        encodePlayerClass,
        parsePlayerClass,
        type PlayerClass,
    } from "$lib/api/parser";
    import {
        getAllPlayerData,
        setPlayerData,
        type PlayerData,
    } from "$lib/api/players";

    interface ClassData {
        index: number;
        value: PlayerClass;
    }
    const playerId = parseInt($page.params.id);
    if (Number.isNaN(playerId)) throw "NaN Player ID";

    let classes: ClassData[] = [];

    async function loadPlayerData() {
        try {
            let response = await getAllPlayerData(playerId);

            let values = [];

            for (const key of Object.keys(response)) {
                let value = response[key];
                if (key.startsWith("class")) {
                    let index = parseInt(key.substring(5));
                    let clazz = parsePlayerClass(value);
                    if (!Number.isNaN(index) && clazz != null) {
                        values.push({
                            index,
                            value: clazz,
                        });
                    }
                }
            }

            classes = values;
        } catch (e) {
            console.error(e);
        }
    }

    async function onSave() {
        console.log("Save");

        try {
            let encodedData: PlayerData[] = [];

            for (const clazz of classes) {
                let encoded = encodePlayerClass(clazz.value);
                encodedData.push({
                    key: `class${clazz.index}`,
                    value: encoded,
                });
            }

            let promises: Promise<any>[] = [];

            for (const data of encodedData) {
                promises.push(setPlayerData(playerId, data.key, data.value));
            }

            await Promise.all(promises);
        } catch (e) {
            console.error(e);
        }
    }

    loadPlayerData().then().catch();
</script>

<h1 class="title">Player Classes</h1>
<span class="ident">POCKET RELAY MANAGER</span>
<p class="text">
    Below is a list of all your classes along with their level and total
    promotions
</p>

<div>
    <a href={`/players/${playerId}`} class="button button--alt back">Back</a>
    <button
        class="button button--alt"
        on:click={onSave}
        title="Saves any changes made to the classes"
    >
        Save
    </button>
</div>

<div class="classes">
    {#each classes as clazz}
        <div class="card">
            <h2>{clazz.value.name}</h2>
            <img
                src={`/assets/icons/${clazz.value.name}.webp`}
                alt={clazz.value.name}
            />

            <div class="card__value">
                <div>
                    <h3>Level</h3>

                    <label class="input">
                        <span class="input__label" />
                        <input
                            type="number"
                            class="input__value"
                            bind:value={clazz.value.level}
                            min={1}
                            max={20}
                        />
                    </label>
                </div>
                <div>
                    <h3>Promotions</h3>

                    <label class="input">
                        <span class="input__label" />
                        <input
                            type="number"
                            class="input__value"
                            bind:value={clazz.value.promotions}
                            min={1}
                        />
                    </label>
                </div>
            </div>
        </div>
    {/each}
</div>

<style lang="scss">
    .title,
    .ident,
    .text {
        margin-bottom: 0.5rem;
    }

    .text {
        color: #999999;
    }

    .classes {
        display: flex;
        flex-flow: row wrap;
        gap: 2rem;
        margin-top: 1rem;
    }

    .card {
        flex: auto;
        text-align: center;
    }

    .card__value {
        display: flex;
        flex-flow: column;
        gap: 1rem;
        max-width: 500px;
        margin: 0 auto;
    }
</style>
