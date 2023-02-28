<script lang="ts">
    import type { RequestError } from "$lib/api/api";
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
    import { onMount } from "svelte";

    export let playerId: number;
    export let isAdmin: boolean;

    interface Events {
        // Event triggering a save of the classes
        save: undefined;
    }

    // Type representing a class loaded from key values
    interface StoredClass {
        // The class key index value
        index: number;
        // The actual player classs
        value: PlayerClass;
    }

    // The loaded stored classes
    let stored: StoredClass[] = [];
    // Loading state
    let loading: boolean = true;

    /**
     * Loader function for loading the player classes by loading
     * the player data and parsing the class data
     */
    async function load(): Promise<void> {
        loading = true;
        console.debug("Loading classes");

        // Load the player data
        let response: Record<string, string>;
        try {
            response = await getAllPlayerData(playerId);
        } catch (e) {
            let err = e as RequestError;
            console.error(err);
            loading = false;
            return;
        }

        // Filter the class keys
        let classFilter = (key: string) => key.startsWith("class");
        let keys = Object.keys(response).filter(classFilter);

        // Clear the existing stored data
        stored = [];

        for (const key of keys) {
            let index = parseInt(key.substring(5));
            let value = parsePlayerClass(response[key]);
            // Skip invalid classes
            if (Number.isNaN(index) || value == null) continue;
            stored.push({
                index,
                value,
            });
        }

        loading = false;
    }

    /**
     * Handles saving all the classes in their encoded format
     * and sending them to the server
     */
    async function save() {
        loading = true;
        console.debug("Saving classes");

        // Encoded player data to save to the server
        const data: PlayerData[] = [];

        for (const clazz of stored) {
            const key = "class" + clazz.index;
            const value = encodePlayerClass(clazz.value);
            data.push({ key, value });
        }

        // Collection of promises for data to be saved
        const promises: Promise<any>[] = data.map((data) => {
            return setPlayerData(playerId, data.key, data.value);
        });

        try {
            await Promise.all(promises);
        } catch (e) {
            let err = e as RequestError;
            console.error(err);
        } finally {
            loading = false;
        }
    }

    // Load classes on mount
    onMount(load);
</script>

<div>
    {#if isAdmin}
        <button
            class="button button--alt"
            on:click={save}
            title="Saves any changes made to the classes"
        >
            Save
        </button>
    {/if}
</div>

<div class="classes">
    {#each stored as { value }}
        <div class="card">
            <h2>{value.name}</h2>
            <img src={`/assets/icons/${value.name}.webp`} alt={value.name} />

            <div class="fields">
                <div>
                    <h3>Level</h3>

                    {#if isAdmin}
                        <label class="input">
                            <span class="input__label" />
                            <input
                                type="number"
                                class="input__value"
                                bind:value={value.level}
                                min={1}
                                max={20}
                            />
                        </label>
                    {:else}
                        <span class="annot">{value.level}</span>
                    {/if}
                </div>
                <div>
                    <h3>Promotions</h3>

                    {#if isAdmin}
                        <label class="input">
                            <span class="input__label" />
                            <input
                                type="number"
                                class="input__value"
                                bind:value={value.promotions}
                                min={1}
                            />
                        </label>
                    {:else}
                        <span class="annot">{value.promotions}</span>
                    {/if}
                </div>
            </div>
        </div>
    {/each}
</div>

<style lang="scss">
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

    .fields {
        display: flex;
        flex-flow: column;
        gap: 1rem;
        max-width: 500px;
        margin: 0 auto;
    }
</style>
