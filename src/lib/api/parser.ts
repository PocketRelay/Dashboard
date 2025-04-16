// Player data key for the player base data
export const PLAYER_BASE_KEY: string = "Base";

// Player data key for the player challenges data
export const PLAYER_CHALLENGES_KEY: string = "Progress";

// Decoded format of the player base data
export interface PlayerBase {
    // The number of credits for the player
    credits: number;
    // The number of credits the player has spent
    creditsSpent: number;
    // The number of games the player has played
    gamesPlayed: number;
    // The number seconds the player has spent in game
    secondsPlayed: number;
    // The encoded inventory string
    inventory: string;


    // Unknown values
    u1: string;
    u2: string;
    u3: string;
    u4: string;
}

// Decoded format of the player challenges data
export interface PlayerChallenges {
    rawnumbers: number[];
}


/**
 * Parses the player challenges data value into an editable format
 * 
 * Format: 
 * 22;0...X (overall 746 values). We are interested in only 344 values.
 * See file challenges_format.txt for more information.
 */
export function parsePlayerChallenges(value: string): PlayerChallenges | null {
    const parts: string[] = value.split(",");
    if (parts.length < 347) return null;

    let rawnumbers: number[] = [];
    for (let index = 0; index < parts.length; index += 1) {
        let value: number = parseInt(parts[index]);

        // Handle invalid values
        if (Number.isNaN(value)) value = 0;

        rawnumbers.push(value);
    }

    return { rawnumbers };
}


/**
 * Parses an int value from a string returning a default value
 * if the provided string was not a number
 * 
 * @param rawValue     The raw string to parse
 * @param defaultValue The default value to use
 * @returns            The parsed number or default string
 */
function parseIntWithDefault(rawValue: string, defaultValue: number = 0): number {
    const value: number = parseInt(rawValue);
    if (Number.isNaN(value)) return defaultValue;
    return value;
}

/**
 * Parses the player base player data value into a 
 * editable format
 * 
 * Format: 
 * 20;4;CREDITS;UNKNOWN;UKNOWN;CREDITS_SPENT;UKNOWN;GAMES_PLAYED;SECONDS_PLAYED;UKNOWN;INVENTORY
 * 
 * @param value The raw encoded player base value
 * @returns 
 */
export function parsePlayerBase(value: string): PlayerBase | null {
    const parts: string[] = value.split(";");
    if (parts.length < 11) return null;

    const credits: number = parseIntWithDefault(parts[2]);

    const u1: string = parts[3];
    const u2: string = parts[4];

    const creditsSpent: number = parseIntWithDefault(parts[5]);

    const u3: string = parts[6];

    const gamesPlayed: number = parseIntWithDefault(parts[7]);
    const secondsPlayed: number = parseIntWithDefault(parts[8]);

    const u4: string = parts[9];
    const inventory: string = parts[10];

    return {
        credits,
        creditsSpent,
        gamesPlayed,
        secondsPlayed,
        inventory,
        u1,
        u2,
        u3,
        u4,
    }
}

/**
 * Parses the raw player inventory string as the
 * literal number array that it represents the 
 * inventory is stored as a list of hex values
 * 
 * FF 0F AB FF (But without spaces)
 * 
 * @param inventory The inventory string
 * @returns         The inventory value array
 */
export function parseInventory(inventory: string): number[] {
    let values: number[] = [];
    for (let index = 0; index < inventory.length; index += 2) {
        // Take the hex slice
        let first: string = inventory.substring(index, index + 2);
        let value: number = parseInt(first, 16);

        // Handle invalid values
        if (Number.isNaN(value)) value = 0;

        values.push(value);
    }
    return values;
}

/**
 * Encodes the decoded player base value back into
 * a string to be stored as player data
 * 
 * @param value The decoded player base data
 * @returns The encoded value
 */
export function encodePlayerBase(value: PlayerBase) {
    return `20;4;${value.credits};${value.u1};${value.u2};${value.creditsSpent};${value.u3};${value.gamesPlayed};${value.secondsPlayed};${value.u4};${value.inventory}`;
}

/**
 * Encodes the provided inventory value list back into its
 * string encoded value form 
 * 
 * @param inventory The inventory values
 * @returns The encoded form
 */
export function encodeInventory(inventory: number[]): string {
    let output = "";
    for (let value of inventory) {
        if (value > 255) {
            // Handle prevent values from overflowing the allotted space
            output += "ff";
        } else {
            // Convert the value into hex
            let hex = value.toString(16).toLowerCase();

            // Padd the hex to two chars
            while (hex.length < 2) {
                hex = "0" + hex;
            }
            output += hex;
        }
    }
    return output;
}

// Decoded format of a player class
export interface PlayerClass {
    // The name of the class (e.g Adept)
    name: string;
    // The level of the class
    level: number;
    // The exp value (Not parsed here)
    exp: string;
    // The number of promotions for this class
    promotions: number;
}

// 20;4;NAME;LEVEL;EXP;PROMOTIONS

/**
 * Parses the provided raw player class value into 
 * the decoded format 
 * 
 * @param value The raw player class value
 * @returns The decoded format or null for invalid values
 */
export function parsePlayerClass(value: string): PlayerClass | null {
    const parts: string[] = value.split(";");
    if (parts.length < 6) return null;

    const name: string = parts[2];
    const level: number = parseIntWithDefault(parts[3]);
    const exp: string = parts[4];
    const promotions: number = parseIntWithDefault(parts[5]);

    return { name, level, exp, promotions }
}

/**
 * Encodes the decoded player class value back into
 * its encoded form for storing
 * 
 * @param value The decoded player class value
 * @returns     The encoded value
 */
export function encodePlayerClass(value: PlayerClass): string {
    return `20;4;${value.name};${value.level};${value.exp};${value.promotions}`;
}