<script lang="ts">
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

    let classes: ClassData[] = [];

    async function loadPlayerData(player: number) {
        try {
            let response = await getAllPlayerData(player);

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
                promises.push(setPlayerData($player.id, data.key, data.value));
            }

            await Promise.all(promises);
        } catch (e) {
            console.error(e);
        }
    }

    $: {
        loadPlayerData($player.id).then().catch();
    }
</script>

<h1 class="title">Classes</h1>
<span class="ident">POCKET RELAY MANAGER</span>
<p class="text">
    Below is a list of all your classes along with their level and total
    promotions
</p>

<div>
    {#if isAdmin($player)}
        <button
            class="button button--alt"
            on:click={onSave}
            title="Saves any changes made to the classes"
        >
            Save
        </button>
    {/if}
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

                    {#if isAdmin($player)}
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
                    {:else}
                        <span>{clazz.value.level}</span>
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
                                bind:value={clazz.value.promotions}
                                min={1}
                            />
                        </label>
                    {:else}
                        <span>{clazz.value.promotions}</span>
                    {/if}
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
