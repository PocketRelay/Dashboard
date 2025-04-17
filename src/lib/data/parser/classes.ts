import {
  DEV_VERSION_NUMBER,
  VERSION_NUMBER,
  parseIntWithDefault,
  serializeValues,
} from "./utils";

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

      const parsedClass = parsePlayerClass(index, data!);
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
