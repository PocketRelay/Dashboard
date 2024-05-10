/**
 * Parsers, types, and encoders for the various pieces of player data
 */

import type { PlayerDataMap } from "$lib/api/players";
import {
  PLAYER_BASE_KEY,
  createDefaultPlayerBase,
  encodePlayerBase,
  parsePlayerBase,
  type PlayerBase,
} from "./base";
import {
  encodePlayerCharacters,
  getPlayerCharacters,
  type PlayerCharacter,
} from "./character";
import {
  encodePlayerClasses,
  getPlayerClasses,
  type PlayerClass,
} from "./classes";

export * from "./character";
export * from "./classes";
export * from "./base";

export interface PlayerData {
  // Base player data
  base: PlayerBase;
  // All classes for the player (Uses default for those that are missing)
  classes: PlayerClass[];
  // All characters for the player (Uses defaults for those that are missing)
  characters: PlayerCharacter[];
}

export function encodePlayerData(input: PlayerData): PlayerDataMap {
  const baseValue = encodePlayerBase(input.base);
  const characters = encodePlayerCharacters(input.characters);
  const classes = encodePlayerClasses(input.classes);

  return {
    [PLAYER_BASE_KEY]: baseValue,
    ...classes,
    ...characters,
  };
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
