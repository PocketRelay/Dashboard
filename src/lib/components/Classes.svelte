<script lang="ts">
    import { isAdmin, player, type RequestError } from "$lib/api/api";
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
    import PlayerClassComponent from "./classes/PlayerClass.svelte";
    import Loader from "./Loader.svelte";

    export let playerId: number;

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

{#if loading}
    <Loader />
{:else}
    <div class="tabs">
        <slot />
        {#if isAdmin($player) && stored.length != 0}
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
        {#if stored.length == 0}
            <div>
                <h2>Classes not initialized</h2>
                <p class="text text--wrapped">
                    This account classes have not yet been created. In order to
                    create the classes the player must have completed the class
                    selection screen for first time opening multiplayer
                </p>
            </div>
        {:else}
            {#each stored as { value }}
                <PlayerClassComponent
                    name={value.name}
                    bind:level={value.level}
                    bind:promotions={value.promotions}
                />
            {/each}
        {/if}
    </div>
{/if}

<style lang="scss">
    .classes {
        display: flex;
        flex-flow: row wrap;
        gap: 2rem;
        margin-top: 1rem;
    }

    .tabs {
        display: flex;
        gap: 1rem;
    }
</style>
