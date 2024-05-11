import {
  DEV_VERSION_NUMBER,
  VERSION_NUMBER,
  parseIntWithDefault,
  serializeValues,
} from "./utils";

// Player data key for the player base data
export const PLAYER_BASE_KEY: string = "Base";

// Decoded format of the player base data
export interface PlayerBase {
  // The number of credits for the player
  credits: number;

  nextPackToConsume: number;
  numCopiesToConsume: number;

  // The number of credits the player has spent
  creditsSpent: number;
  platformCurrencySpent: number;

  // The number of games the player has played
  gamesPlayed: number;
  // The number seconds the player has spent in game
  secondsPlayed: number;
  lastLevelUpTime: number;
  // The encoded inventory string
  inventory: number[];
}

/**
 * Parses the player base player data value into a
 * editable format
 *
 * Format:
 * 20;4;CREDITS;UNKNOWN;UNKNOWN;CREDITS_SPENT;UNKNOWN;GAMES_PLAYED;SECONDS_PLAYED;UNKNOWN;INVENTORY
 *
 * @param value The raw encoded player base value
 * @returns
 */
export function parsePlayerBase(value: string): PlayerBase {
  const parts: string[] = value.split(";");

  // Use a default if the data is invalid
  if (parts.length < 11) return createDefaultPlayerBase();

  const credits: number = parseIntWithDefault(parts[2]);

  const nextPackToConsume: number = parseIntWithDefault(parts[3], -1);
  const numCopiesToConsume: number = parseIntWithDefault(parts[4]);

  const creditsSpent: number = parseIntWithDefault(parts[5]);

  const platformCurrencySpent: number = parseIntWithDefault(parts[6]);

  const gamesPlayed: number = parseIntWithDefault(parts[7]);
  const secondsPlayed: number = parseIntWithDefault(parts[8]);

  const lastLevelUpTime: number = parseIntWithDefault(parts[9]);
  const inventory: number[] = parseInventory(parts[10]);

  return {
    credits,
    nextPackToConsume,
    numCopiesToConsume,
    creditsSpent,
    platformCurrencySpent,
    gamesPlayed,
    secondsPlayed,
    lastLevelUpTime,
    inventory,
  };
}

export function createDefaultPlayerBase(): PlayerBase {
  return {
    credits: 0,
    nextPackToConsume: -1,
    numCopiesToConsume: 0,
    creditsSpent: 0,
    platformCurrencySpent: 0,
    gamesPlayed: 0,
    secondsPlayed: 0,
    lastLevelUpTime: 0,
    inventory: DEFAULT_INVENTORY,
  };
}

/**
 * Encodes the decoded player base value back into
 * a string to be stored as player data
 *
 * @param value The decoded player base data
 * @returns The encoded value
 */
export function encodePlayerBase(value: PlayerBase) {
  return serializeValues([
    VERSION_NUMBER,
    DEV_VERSION_NUMBER,
    value.credits,
    value.nextPackToConsume,
    value.numCopiesToConsume,
    value.creditsSpent,
    value.platformCurrencySpent,
    value.gamesPlayed,
    value.secondsPlayed,
    value.lastLevelUpTime,
    encodeInventory(value.inventory),
  ]);
}

// Default inventory data
const DEFAULT_INVENTORY: number[] = [
  1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

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

      // Pad the hex to two chars
      while (hex.length < 2) {
        hex = "0" + hex;
      }
      output += hex;
    }
  }
  return output;
}
