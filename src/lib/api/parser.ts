import {
  CHARACTERS,
  getCharacterByKitName,
  type Character,
} from "$lib/data/inventory";
import {
  INTERNAL_POWERS,
  POWERS,
  getPowerByID,
  type InternalPower,
  type Power,
} from "$lib/data/powers";
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
function serializeValues(
  values: (string | number | boolean)[],
  separator: string = ";"
): string {
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
    .join(separator);
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

function parseFloatWithDefault(
  rawValue: string,
  defaultValue: number = 0.0
): number {
  const value: number = parseFloat(rawValue);
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

// Singularity 179 1.0000 0 0 0 0 0 0 0 True,Warp 185 0.0000 0 0 0 0 0 0 0 True,Shockwave 177 0.0000 0 0 0 0 0 0 0 True,MPPassive 206 0.0000 0 0 0 0 0 0 0 True,MPMeleePassive 200 0.0000 0 0 0 0 0 0 0 True,Consumable_Rocket 88 0.0000 0 0 0 0 0 0 0 False,Consumable_Revive 87 0.0000 0 0 0 0 0 0 0 False,Consumable_Shield 89 0.0000 0 0 0 0 0 0 0 False,Consumable_Ammo 86 0.0000 0 0 0 0 0 0 0 False

export interface PlayerCharacterPower {
  powerName: string;
  powerID: number;
  powerProgress: number;
  rank1: number;
  rank2: number;
  rank3: number;
  rank4: number;
  rank5: number;
  rank6: number;
  // Actual name not known but only set to false on the internal game ones like the Rockets
  charPower: boolean;

  // Internal power data
  power: Power | undefined;
}

export function encodePlayerCharacterPower(
  power: PlayerCharacterPower
): string {
  return serializeValues(
    [
      power.powerName,
      power.powerID,
      power.powerProgress.toFixed(4),
      power.rank1,
      power.rank2,
      power.rank3,
      power.rank4,
      power.rank5,
      power.rank6,
      power.charPower,
    ],
    " "
  );
}
export function encodePlayerCharacterPowers(
  powers: PlayerCharacterPower[]
): string {
  return serializeValues(powers.map(encodePlayerCharacterPower), ",");
}

export function createDefaultPlayerCharacterPowers(
  powers: Power[]
): PlayerCharacterPower[] {
  const out = [];
  for (const power of powers) {
    out.push(createDefaultPlayerCharacterPower(power));
  }

  for (const internalPower of INTERNAL_POWERS) {
    out.push(createDefaultPlayerCharacterPowerInternal(internalPower));
  }

  return out;
}

export function createDefaultPlayerCharacterPower(
  power: Power
): PlayerCharacterPower {
  return {
    powerName: power.internalName,
    powerID: power.id,
    powerProgress: 0.0,
    rank1: 0,
    rank2: 0,
    rank3: 0,
    rank4: 0,
    rank5: 0,
    rank6: 0,
    charPower: true,
    power,
  };
}

export function createDefaultPlayerCharacterPowerInternal(
  power: InternalPower
) {
  return {
    powerName: power.name,
    powerID: power.id,
    powerProgress: 1.0,
    rank1: 0,
    rank2: 0,
    rank3: 0,
    rank4: 0,
    rank5: 0,
    rank6: 0,
    charPower: false,
    power: undefined,
  };
}

export function parsePlayerCharacterPowers(
  character: Character,
  input: string,
  powers: Power[]
): PlayerCharacterPower[] {
  const parts = input.split(",");

  const characterPowers = [];
  for (const part of parts) {
    if (part.length < 1) continue;
    const parsed = parsePlayerCharacterPower(part);
    if (parsed !== null) {
      if (parsed.power === undefined) {
        const isInternal =
          INTERNAL_POWERS.find((intern) => intern.id == parsed.powerID) !==
          undefined;

        if (!isInternal) {
          console.error("UNKNOWN POWER", parsed);
        }
      }

      characterPowers.push(parsed);
    } else {
      console.error("Failed to parse character power", part);
    }
  }

  for (const power of powers) {
    const parsedPower = characterPowers.find(
      (charPow) => charPow.powerID === power.id
    );
    if (parsedPower === undefined) {
      const matchingName = characterPowers.find(
        (charPOw) => charPOw.powerName === power.internalName
      );

      console.error("Missing power", character.kitName, power, matchingName);
      // TODO: Create default power data
    }
  }

  return characterPowers;
}

export function parsePlayerCharacterPower(
  input: string
): PlayerCharacterPower | null {
  const parts = input.split(" ");

  if (parts.length < 10) return null;

  const powerName = parts[0];
  const powerID = parseIntWithDefault(parts[1], -1);
  if (powerID === -1) {
    return null;
  }

  const powerProgress = parseFloatWithDefault(parts[2]);
  const rank1 = parseIntWithDefault(parts[3]);
  const rank2 = parseIntWithDefault(parts[4]);
  const rank3 = parseIntWithDefault(parts[5]);
  const rank4 = parseIntWithDefault(parts[6]);
  const rank5 = parseIntWithDefault(parts[7]);
  const rank6 = parseIntWithDefault(parts[8]);
  const gamePower = parts[9] === "True";

  const power = getPowerByID(powerID);

  return {
    powerName,
    powerID,
    powerProgress,
    rank1,
    rank2,
    rank3,
    rank4,
    rank5,
    rank6,
    charPower: gamePower,
    power,
  };
}

export interface PlayerCharacter {
  index: number;
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
  powers: PlayerCharacterPower[];
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
  index: number,
  character: Character
): PlayerCharacter {
  return {
    index,
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
    powers: createDefaultPlayerCharacterPowers(character.powers),
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
  index: number,
  value: string
): PlayerCharacter | null {
  const parts: string[] = value.split(";");

  // Use a default if the data is invalid
  if (parts.length < 22) return null;

  const kitName: string = parts[2];
  const character = getCharacterByKitName(kitName);
  if (character === undefined) {
    console.error("Unknown character kitName", kitName);
    return null;
  }

  const characterName: string = parts[3];
  const tint1ID: number = parseIntWithDefault(parts[4]);
  const tint2ID: number = parseIntWithDefault(parts[5], 45);
  const patternID: number = parseIntWithDefault(parts[6]);
  const patternColorID: number = parseIntWithDefault(parts[7], 47);
  const phongID: number = parseIntWithDefault(parts[8], 45);
  const emissiveID: number = parseIntWithDefault(parts[9], 9);
  const skinToneID: number = parseIntWithDefault(parts[10], 9);
  const secondsPlayed: number = parseIntWithDefault(parts[11]);
  const timestampYear: number = parseIntWithDefault(parts[12]);
  const timestampMonth: number = parseIntWithDefault(parts[13]);
  const timestampDay: number = parseIntWithDefault(parts[14]);
  const timestampSeconds: number = parseIntWithDefault(parts[15]);
  const powers: PlayerCharacterPower[] = parsePlayerCharacterPowers(
    character,
    parts[16],
    character.powers
  );
  const hotkeys: string = parts[17];
  const weapons: string = parts[18];
  const weaponMods: string = parts[19];
  const deployed: boolean = parts[20] === "True";
  const leveledUp: boolean = parts[21] === "True";

  return {
    index,
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
    encodePlayerCharacterPowers(value.powers),
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

  let nextIndex = 1;

  // Parse all the character data
  for (const entry of Object.entries(playerData)) {
    const [key, data] = entry;

    if (key.startsWith("char")) {
      const index = parseIntWithDefault(key.substring(4), -1);
      if (index === -1) {
        continue;
      }

      if (index > nextIndex) nextIndex = index;

      const parsedChar = parsePlayerCharacter(index, data);
      if (parsedChar !== null) {
        characters.push(parsedChar);
      } else {
        console.error("Failed to parse character", data);
      }
    }
  }

  // Find missing characters and create them
  for (let i = 0; i < CHARACTERS.length; i++) {
    const localChar = CHARACTERS[i];
    const parsedChar = characters.find(
      (parsedChar) => parsedChar.kitName === localChar.kitName
    );

    if (parsedChar === undefined) {
      nextIndex++;
      characters.push(createDefaultPlayerCharacter(nextIndex, localChar));
    }
  }

  return characters;
}

export function encodePlayerCharacters(
  characters: PlayerCharacter[]
): Record<string, string> {
  let output: Record<string, string> = {};

  for (const character of characters) {
    const key = `char${character.index}`;
    output[key] = encodePlayerCharacter(character);
  }

  return output;
}

// Decoded format of a player class
export interface PlayerClass {
  index: number;
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
export function parsePlayerClass(
  index: number,
  value: string
): PlayerClass | null {
  const parts: string[] = value.split(";");
  if (parts.length < 6) return null;

  const name: string = parts[2];
  const level: number = parseIntWithDefault(parts[3]);
  const exp: string = parts[4];
  const promotions: number = parseIntWithDefault(parts[5]);

  return { index, name, level, exp, promotions };
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

function createDefaultClass(index: number, name: string): PlayerClass {
  return {
    index,
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

  let nextIndex = 1;

  // Parse all the classes data
  for (const entry of Object.entries(playerData)) {
    const [key, data] = entry;

    if (key.startsWith("class")) {
      const index = parseIntWithDefault(key.substring(5), -1);
      if (index === -1) {
        continue;
      }

      if (index > nextIndex) nextIndex = index;

      const parsedClass = parsePlayerClass(index, data);
      if (parsedClass !== null) {
        classes.push(parsedClass);
      } else {
        console.error("Failed to parse character", data);
      }
    }
  }

  // Find missing classes and create them
  for (const localClassName of LOCAL_CLASS_NAMES) {
    const parsedClass = classes.find(
      (parsedClass) => parsedClass.name === localClassName
    );

    if (parsedClass === undefined) {
      nextIndex++;
      classes.push(createDefaultClass(nextIndex, localClassName));
    }
  }

  return classes;
}

export function encodePlayerClasses(
  classes: PlayerClass[]
): Record<string, string> {
  let output: Record<string, string> = {};

  for (const playerClass of classes) {
    const key = `class${playerClass.index}`;
    output[key] = encodePlayerClass(playerClass);
  }

  return output;
}
