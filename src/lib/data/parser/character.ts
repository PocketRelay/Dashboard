import { getWeaponByIndex, type Weapon } from "$lib/data/weapons";
import {
  CHARACTERS,
  getCharacterByKitName,
  type Character,
} from "$lib/data/characters";
import {
  INTERNAL_POWERS,
  getPowerByID,
  type InternalPower,
  type Power,
} from "$lib/data/powers";
import { getWeaponModByIndex, type WeaponMod } from "$lib/data/weapon_mods";
import {
  DEV_VERSION_NUMBER,
  VERSION_NUMBER,
  parseFloatWithDefault,
  parseIntWithDefault,
  serializeValues,
} from "./utils";

export interface CharacterNames {
  kitName: string;
  characterName: string;
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
  weapons: PlayerCharacterWeapon[];
  weaponMods: PlayerCharacterWeaponMods[];
  // Whether this character has been deployed (Created/used by the player)
  deployed: boolean;
  // Whether the character has leveled up
  leveledUp: boolean;

  // App state, not stored in the character data
  character: Character;
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
  const weapons: PlayerCharacterWeapon[] = decodePlayerCharacterWeapons(
    parts[18]
  );
  const weaponMods: PlayerCharacterWeaponMods[] =
    decodePlayerCharacterWeaponMods(parts[19]);
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
    weapons: [],
    weaponMods: [],
    deployed: false,
    leveledUp: true,
    character,
  };
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

      const parsedChar = parsePlayerCharacter(index, data!);
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
    encodePlayerCharacterWeapons(value.weapons),
    encodePlayerCharacterWeaponMods(value.weaponMods),
    value.deployed,
    value.leveledUp,
  ]);
}

// Singularity 179 1.0000 0 0 0 0 0 0 0 True,Warp 185 0.0000 0 0 0 0 0 0 0 True,Shockwave 177 0.0000 0 0 0 0 0 0 0 True,MPPassive 206 0.0000 0 0 0 0 0 0 0 True,MPMeleePassive 200 0.0000 0 0 0 0 0 0 0 True,Consumable_Rocket 88 0.0000 0 0 0 0 0 0 0 False,Consumable_Revive 87 0.0000 0 0 0 0 0 0 0 False,Consumable_Shield 89 0.0000 0 0 0 0 0 0 0 False,Consumable_Ammo 86 0.0000 0 0 0 0 0 0 0 False
export interface PlayerCharacterPower {
  powerName: string;
  powerID: number;
  powerProgress: number;
  powerSelections: PowerSelections;

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
      ...encodePowerSelections(power.powerSelections),
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

type PowerSelectionPair = [boolean, boolean];
type PowerSelections = [
  PowerSelectionPair,
  PowerSelectionPair,
  PowerSelectionPair
];

export function encodePowerSelections(selections: PowerSelections): number[] {
  const output = [];
  for (let i = 0; i < 3; i += 1) {
    const [a, b] = selections[i];
    const value = i + 1;

    output.push(a ? value : 0);
    output.push(b ? value : 0);
  }

  return output;
}

export function getPowerSelections(
  index: number,
  a: number,
  b: number
): PowerSelectionPair {
  const activeValue = index + 1;

  if (a === activeValue) {
    return [true, false];
  } else if (b === activeValue) {
    return [false, true];
  } else {
    return [false, false];
  }
}

export function createDefaultPowerSelections(): PowerSelections {
  return [
    [false, false],
    [false, false],
    [false, false],
  ];
}

export function createDefaultPlayerCharacterPower(
  power: Power
): PlayerCharacterPower {
  return {
    powerName: power.internalName,
    powerID: power.id,
    powerProgress: 0.0,
    powerSelections: createDefaultPowerSelections(),
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
    powerSelections: createDefaultPowerSelections(),
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
      characterPowers.push(createDefaultPlayerCharacterPower(power));
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
  const powerSelection1 = getPowerSelections(
    0,
    parseIntWithDefault(parts[3]),
    parseIntWithDefault(parts[4])
  );
  const powerSelection2 = getPowerSelections(
    1,
    parseIntWithDefault(parts[5]),
    parseIntWithDefault(parts[6])
  );
  const powerSelection3 = getPowerSelections(
    2,
    parseIntWithDefault(parts[7]),
    parseIntWithDefault(parts[8])
  );

  const powerSelections: PowerSelections = [
    powerSelection1,
    powerSelection2,
    powerSelection3,
  ];

  const gamePower = parts[9] === "True";

  const power = getPowerByID(powerID);

  return {
    powerName,
    powerID,
    powerProgress,
    powerSelections,
    charPower: gamePower,
    power,
  };
}

export interface PlayerCharacterWeapon {
  weaponIndex: number;
  weapon: Weapon | undefined;
}

function encodePlayerCharacterWeapons(
  weapons: PlayerCharacterWeapon[]
): string {
  return serializeValues(
    weapons.map((weapon) => weapon.weaponIndex),
    ","
  );
}

function decodePlayerCharacterWeapons(input: string): PlayerCharacterWeapon[] {
  const out: PlayerCharacterWeapon[] = [];
  const parts = input.split(",");
  for (const part of parts) {
    const weaponIndex = parseIntWithDefault(part, -1);
    if (weaponIndex === -1) continue; // Invalid value

    const weapon = getWeaponByIndex(weaponIndex);

    out.push({
      weaponIndex,
      weapon,
    });
  }

  return out;
}

export interface PlayerCharacterWeaponMod {
  weaponModIndex: number;
  weaponMod: WeaponMod | undefined;
}

export interface PlayerCharacterWeaponMods {
  weapon: PlayerCharacterWeapon;
  weaponMods: PlayerCharacterWeaponMod[];
}

function decodePlayerCharacterWeaponMods(
  input: string
): PlayerCharacterWeaponMods[] {
  const out: PlayerCharacterWeaponMods[] = [];
  const parts = input.split(",");
  for (const part of parts) {
    const weaponModParts = part.split(" ");
    if (weaponModParts.length < 1) continue; // Invalid value

    const weaponIndex = parseIntWithDefault(part, -1);
    if (weaponIndex === -1) continue; // Invalid value

    const weapon = getWeaponByIndex(weaponIndex);

    const rawIndexes = parts.slice(1);

    const weaponMods: PlayerCharacterWeaponMod[] = [];
    for (const rawIndex of rawIndexes) {
      const weaponModIndex = parseIntWithDefault(rawIndex, -1);
      if (weaponModIndex === -1) continue; // Invalid value
      const weaponMod = getWeaponModByIndex(weaponModIndex);
      weaponMods.push({
        weaponModIndex,
        weaponMod,
      });
    }

    out.push({
      weapon: {
        weaponIndex,
        weapon,
      },
      weaponMods,
    });
  }

  return out;
}

function encodePlayerCharacterWeaponMods(
  weapons: PlayerCharacterWeaponMods[]
): string {
  return serializeValues(
    weapons.map((weapon) =>
      serializeValues(
        [
          weapon.weapon.weaponIndex,
          ...weapon.weaponMods.map((weaponMod) => weaponMod.weaponModIndex),
        ],
        " "
      )
    ),
    ","
  );
}
