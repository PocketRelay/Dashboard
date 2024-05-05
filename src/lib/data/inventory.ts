// The unlocked value
export const UNLOCKED: number = 1;
// The locked value
export const LOCKED: number = 0;
// The maximum not normal level value
export const UNSAFE_MAX: number = 255;

// Maximum normal level for characters
export const MAX_CHARACTER_LEVEL: number = 5;

/// The number of skill points awarded for each class level
export const POINTS_AT_LEVEL: number[] = [
  2, 5, 8, 11, 14, 17, 20, 24, 28, 32, 36, 40, 45, 50, 55, 60, 66, 72, 78, 84,
];

export const Races = {
  eb: 0,
  be: 1,
  ve: 2,
  OC: 3,
  vd: 4,
  Ze: 5,
  mf: 6,
  vf: 7,
  ge: 8,
  Geth: 9, // Ua
  Collector: 10, // Sb
  Cf: 11,
  Bf: 12,
  JC: 13,
};

// Rarity level of a specific item
export enum Rarity {
  Common,
  Uncommon,
  Rare,
  UltraRare,
}

// Structure representing a named category of values
export interface Category<V /* The type of values stored */> {
  // The name of the category
  name: string;
  // The values stored in the category
  values: V[];
}

// Structure for a toggle flag
export interface Flag {
  // The index of the flag
  index: number;
  // The name of the flag
  name: string;
}

export const FLAGS: Flag[] = [{ index: 270, name: "Wecome screen" }];
