import { CHARACTERS, type Character } from "$lib/data/inventory";
import type { PlayerDataMap } from "./players";

const VERSION_NUMBER = 20;
const DEV_VERSION_NUMBER = 4;

/**
 * Serializes the provided array of values as a string
 * separated by the ";" character
 *
 * @param values
 * @returns
 */
function serializeValues(values: (string | number | boolean)[]): string {
  return values
    .map((value) => {
      if (typeof value === "boolean") {
        return value ? "True" : "False";
      } else if (typeof value === "number") {
        if (Number.isInteger(value)) {
          return value.toString();
        } else {
          // Floats are formatted to 4dp
          return value.toFixed(4);
        }
      } else {
        return value.toString();
      }
    })
    .join(";");
}

export interface PlayerData {
  // Base player data
  base: PlayerBase;
  // All classes for the player (Uses default for those that are missing)
  classes: PlayerClass[];
  // All characters for the player (Uses defaults for those that are missing)
  characters: PlayerCharacter[];
}

export function decodePlayerData(input: PlayerDataMap): PlayerData {
  const baseValue: string | undefined = input[PLAYER_BASE_KEY];

  const base: PlayerBase = baseValue
    ? parsePlayerBase(baseValue)
    : createDefaultPlayerBase();

  const classes = getPlayerClasses(input);
  const characters = getPlayerCharacters(input);

  return {
    base,
    classes,
    characters,
  };
}

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
 * Parses an int value from a string returning a default value
 * if the provided string was not a number
 *
 * @param rawValue     The raw string to parse
 * @param defaultValue The default value to use
 * @returns            The parsed number or default string
 */
function parseIntWithDefault(
  rawValue: string,
  defaultValue: number = 0
): number {
  const value: number = parseInt(rawValue);
  if (Number.isNaN(value)) return defaultValue;
  return value;
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
 * Parses the player base player data value into a
 * editable format
 *
 * Format:
 * 20;4;CREDITS;UNKNOWN;UKNOWN;CREDITS_SPENT;UKNOWN;GAMES_PLAYED;SECONDS_PLAYED;UKNOWN;INVENTORY
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
export interface CharacterNames {
  kitName: string;
  characterName: string;
}

export interface PlayerCharacter {
  // Internal name for the character
  kitName: string;
  // Player given name for the character
  characterName: string;
  tint1ID: number;
  tint2ID: number;
  patternID: number;
  patternColorID: number;
  phongID: number;
  emissiveID: number;
  skinToneID: number;
  secondsPlayed: number;
  timestampYear: number;
  timestampMonth: number;
  timestampDay: number;
  timestampSeconds: number;
  powers: string;
  hotkeys: string;
  weapons: string;
  weaponMods: string;
  // Whether this character has been deployed (Created/used by the player)
  deployed: boolean;
  // Whether the character has leveled up
  leveledUp: boolean;

  // App state, not stored in the character data
  character: Character;
}

export function createDefaultPlayerCharacter(
  character: Character
): PlayerCharacter {
  return {
    kitName: character.kitName,
    characterName: character.characterName,
    tint1ID: 0,
    tint2ID: 45,
    patternID: 0,
    patternColorID: 47,
    phongID: 45,
    emissiveID: 9,
    skinToneID: 9,
    secondsPlayed: 0,
    timestampYear: 0,
    timestampMonth: 0,
    timestampDay: 0,
    timestampSeconds: 0,
    powers: "",
    hotkeys: "",
    weapons: "",
    weaponMods: "",
    deployed: false,
    leveledUp: true,
    character,
  };
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
export function parsePlayerCharacter(
  value: string,
  character: Character
): PlayerCharacter | null {
  const parts: string[] = value.split(";");

  // Use a default if the data is invalid
  if (parts.length < 22) return null;

  const kitName: string = parts[2];
  const characterName: string = parts[3];
  const tint1ID: number = parseIntWithDefault(parts[4]);
  const tint2ID: number = parseIntWithDefault(parts[4], 45);
  const patternID: number = parseIntWithDefault(parts[4]);
  const patternColorID: number = parseIntWithDefault(parts[4], 47);
  const phongID: number = parseIntWithDefault(parts[4], 45);
  const emissiveID: number = parseIntWithDefault(parts[4], 9);
  const skinToneID: number = parseIntWithDefault(parts[4], 9);
  const secondsPlayed: number = parseIntWithDefault(parts[4]);
  const timestampYear: number = parseIntWithDefault(parts[4]);
  const timestampMonth: number = parseIntWithDefault(parts[4]);
  const timestampDay: number = parseIntWithDefault(parts[4]);
  const timestampSeconds: number = parseIntWithDefault(parts[4]);
  const powers: string = parts[4];
  const hotkeys: string = parts[4];
  const weapons: string = parts[4];
  const weaponMods: string = parts[4];
  const deployed: boolean = parts[4] === "True";
  const leveledUp: boolean = parts[4] === "True";

  return {
    kitName,
    characterName,
    tint1ID,
    tint2ID,
    patternID,
    patternColorID,
    phongID,
    emissiveID,
    skinToneID,
    secondsPlayed,
    timestampYear,
    timestampMonth,
    timestampDay,
    timestampSeconds,
    powers,
    hotkeys,
    weapons,
    weaponMods,
    deployed,
    leveledUp,
    character,
  };
}

export function encodePlayerCharacter(value: PlayerCharacter): string {
  return serializeValues([
    VERSION_NUMBER,
    DEV_VERSION_NUMBER,
    value.kitName,
    value.characterName,
    value.tint1ID,
    value.tint2ID,
    value.patternID,
    value.patternColorID,
    value.phongID,
    value.emissiveID,
    value.skinToneID,
    value.secondsPlayed,
    value.timestampYear,
    value.timestampMonth,
    value.timestampDay,
    value.timestampSeconds,
    value.powers,
    value.hotkeys,
    value.weapons,
    value.weaponMods,
    value.deployed,
    value.leveledUp,
  ]);
}

export function getPlayerCharacters(
  playerData: Partial<Record<string, string>>
): PlayerCharacter[] {
  const characters: PlayerCharacter[] = [];

  for (let i = 0; i < CHARACTERS.length; i++) {
    const localChar = CHARACTERS[i];
    const key = `class${i + 1}`;
    const data = playerData[key];

    if (data === undefined) {
      // Create a default value if one isn't present
      characters.push(createDefaultPlayerCharacter(localChar));
      continue;
    }

    const parsedChar = parsePlayerCharacter(data, localChar);
    if (parsedChar === null) {
      // Create a default value if the existing one is not able to be parsed
      characters.push(createDefaultPlayerCharacter(localChar));
      continue;
    }

    characters.push(parsedChar);
  }

  return characters;
}

export function encodePlayerCharacters(
  characters: PlayerCharacter[]
): Record<string, string> {
  let output: Record<string, string> = {};

  for (const character of characters) {
    const classNameIndex = CHARACTERS.findIndex(
      (entry) => entry.kitName == character.kitName
    );
    if (classNameIndex === -1) continue;

    const key = `char${classNameIndex + 1}`;
    output[key] = encodePlayerCharacter(character);
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

  return { name, level, exp, promotions };
}

/**
 * Encodes the decoded player class value back into
 * its encoded form for storing
 *
 * @param value The decoded player class value
 * @returns     The encoded value
 */
export function encodePlayerClass(value: PlayerClass): string {
  return serializeValues([
    VERSION_NUMBER,
    DEV_VERSION_NUMBER,
    value.name,
    value.level,
    value.exp,
    value.promotions,
  ]);
}

// The order for this is STRICT, changing it may break the game
export const LOCAL_CLASS_NAMES: string[] = [
  "Adept",
  "Soldier",
  "Engineer",
  "Sentinel",
  "Infiltrator",
  "Vanguard",
];

function createDefaultClass(name: string): PlayerClass {
  return {
    name: name,
    level: 1,
    exp: "0.0000",
    promotions: 0,
  };
}

/**
 * Gets a list of player classes, attempts to parse them from
 * the provided player data, missing or invalid ones will be
 * replaced with default values
 *
 * @param playerData The player data to parse from
 * @returns The player classes
 */
export function getPlayerClasses(
  playerData: Partial<Record<string, string>>
): PlayerClass[] {
  const classes: PlayerClass[] = [];

  for (let i = 0; i < LOCAL_CLASS_NAMES.length; i++) {
    const localClassName = LOCAL_CLASS_NAMES[i];
    const key = `class${i + 1}`;
    const data = playerData[key];

    if (data === undefined) {
      // Create a default value if one isn't present
      classes.push(createDefaultClass(localClassName));
      continue;
    }

    const parsedClass = parsePlayerClass(data);
    if (parsedClass === null) {
      // Create a default value if the existing one is not able to be parsed
      classes.push(createDefaultClass(localClassName));
      continue;
    }

    // Force update the name to match (It should already anyway)
    parsedClass.name = localClassName;
    classes.push(parsedClass);
  }

  return classes;
}

export function encodePlayerClasses(
  classes: PlayerClass[]
): Record<string, string> {
  let output: Record<string, string> = {};

  for (const playerClass of classes) {
    const classNameIndex = LOCAL_CLASS_NAMES.indexOf(playerClass.name);
    if (classNameIndex === -1) continue;

    const key = `class${classNameIndex + 1}`;
    output[key] = encodePlayerClass(playerClass);
  }

  return output;
}
