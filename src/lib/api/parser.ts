// Player data key for the player base data
export const PLAYER_BASE_KEY: string = "Base";

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

      // Pad the hex to two chars
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
  return `20;4;${value.name};${value.level};${value.exp};${value.promotions}`;
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

function createDefaultClass(name: string): PlayerClass {
  return {
    name: name,
    level: 0,
    exp: "0.0",
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
