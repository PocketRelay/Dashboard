import { POWERS, type Power } from "./powers";

// The unlocked value
export const UNLOCKED: number = 1;
// The locked value
export const LOCKED: number = 0;
// The maximum not normal level value
export const UNSAFE_MAX: number = 255;

// Maximum normal level for weapons
export const MAX_WEAPON_LEVEL: number = 10;
// Maximum normal level for characters
export const MAX_CHARACTER_LEVEL: number = 5;
// Maximum normal level for weapon mods
export const MAX_WEAPON_MOD_LEVEL: number = 5;
// Maximum normal level for gear
export const MAX_GEAR_LEVEL: number = 5;

/// The number of skill points awarded for each class level
export const POINTS_AT_LEVEL: number[] = [
  2, 5, 8, 11, 14, 17, 20, 24, 28, 32, 36, 40, 45, 50, 55, 60, 66, 72, 78, 84,
];

// Rarity level of a specific item
export enum Rarity {
  Common,
  Uncommon,
  Rare,
  UltraRare,
}

// Structure of a weapon definition
export interface Weapon {
  // Index of weapon level in inventory
  level_index: number;
  // The rarity of the weapon
  rarity: Rarity;
  // Name of the weapon
  name: string;
  // Path to the weapon image
  image: string;
  // Unused flag for unused weapons
  unused?: boolean;
}

// Structure defining a character
export interface Character {
  // The character level index
  index: number;
  // The name of the character
  name: string;
  // The character image
  image: string;

  className: string;
  kitName: string;
  characterName: string;

  health: number;
  shield?: number;
  barrier?: number;
  base_encumbrance: number;
  light_melee_base_dmg: number;
  light_melee_modifiers?: {
    health: number;
    armor: number;
    barrier: number;
    shield: number;
  };
  heavy_melee_base_dmg: number;
  Ra?: number;
  heavy_melee_modifiers?: {
    health: number;
    armor: number;
    barrier: number;
    shield: number;
  };
  race?: number;
  XC?: string;
  arrows?: number;
  mutually_exclusive?: number[];
  powers: Power[];
}

// Structure for defining a weapon mod
export interface WeaponMod {
  // The level index of the mod
  level_index: number;
  // The name of the mod
  name: string;
  // The image for the mod
  image: string;
}

// Structure representing a named category of values
export interface Category<V /* The type of values stored */> {
  // The name of the category
  name: string;
  // The values stored in the category
  values: V[];
}

// Structure of a consumable which has multiple tier levels each
// with their own index
export interface TieredConsumable {
  // The base name of the consumable
  name: string;
  // The consumable icon image
  image: string;
  // The indexes of each tier of the consumable
  indexes: number[];
  /// Optional unused marker flag
  unused?: boolean;
}

// Structure of gear consumables
export interface GearConsumable {
  // The index of the consumable
  index: number;
  // The name of the consumable
  name: string;
  // The text of the consumable
  text: string;
  // The image of the consumable
  image: string;
}

// Structure of a core consumable
export interface CoreConsumable {
  // The index of the stock value
  stock_index: number;
  // The index of the capacity value
  capacity_index: number;
  // The name of the consumable
  name: string;
  // The text for the consumable
  text: string;
  // The stock image for the consumable
  stock_image: string;
  // The capacity image for the consumable
  capacity_image: string;
}

// Structure for other consumable types
export interface OtherConsumable {
  // The index of the consumable
  index: number;
  // The name of the consumable
  name: string;
  // The image of the consumable
  image: string;
}

// Structure for a toggle flag
export interface Flag {
  // The index of the flag
  index: number;
  // The name of the flag
  name: string;
}

export const SNIPER_RIFLES: Weapon[] = [
  {
    level_index: 136,
    rarity: Rarity.UltraRare,
    name: "Black Widow",
    image: "SniperRifle_Widow.webp",
  },
  {
    level_index: 10,
    rarity: Rarity.Uncommon,
    name: "M-13 Raptor",
    image: "SniperRifle_Raptor.webp",
  },
  {
    level_index: 12,
    rarity: Rarity.Uncommon,
    name: "M-97 Viper",
    image: "SniperRifle_Viper.webp",
  },
  {
    level_index: 110,
    rarity: Rarity.UltraRare,
    name: "N7 Valiant",
    image: "SniperRifle_Valiant.webp",
  },
  {
    level_index: 9,
    rarity: Rarity.Common,
    name: "M-92 Mantis",
    image: "SniperRifle_Mantis.webp",
  },
  {
    level_index: 11,
    rarity: Rarity.UltraRare,
    name: "Javelin",
    image: "SniperRifle_Javelin.webp",
  },
  {
    level_index: 369,
    rarity: Rarity.UltraRare,
    name: "M-90 Indra",
    image: "SniperRifle_Indra.webp",
  },
  {
    level_index: 8,
    rarity: Rarity.Uncommon,
    name: "M-29 Incisor",
    image: "SniperRifle_Incisor.webp",
  },
  {
    level_index: 13,
    rarity: Rarity.Rare,
    name: "M-98 Widow",
    image: "SniperRifle_Widow.webp",
  },
  {
    level_index: 275,
    rarity: Rarity.Rare,
    name: "Kishock Harpoon Gun",
    image: "SniperRifle_Batarian.webp",
  },
  {
    level_index: 288,
    rarity: Rarity.Rare,
    name: "Krysae Sniper Rifle",
    image: "SniperRifle_Turian.webp",
  },
  {
    level_index: 532,
    rarity: Rarity.Rare,
    name: "Collector Sniper Rifle",
    image: "SniperRifle_Collector.webp",
  },
];

export const ASSAULT_RIFLES: Weapon[] = [
  {
    level_index: 0,
    rarity: Rarity.Common,
    name: "M-8 Avenger",
    image: "AssaultRifle_Avenger.webp",
  },
  {
    level_index: 2,
    rarity: Rarity.Rare,
    name: "Geth Pulse Rifle",
    image: "AssaultRifle_Geth.webp",
  },
  {
    level_index: 4,
    rarity: Rarity.Uncommon,
    name: "Phaeston",
    image: "AssaultRifle_Cobra.webp",
  },
  {
    level_index: 3,
    rarity: Rarity.Uncommon,
    name: "M-96 Mattock",
    image: "AssaultRifle_Mattock.webp",
  },
  {
    level_index: 367,
    rarity: Rarity.Rare,
    name: "M-55 Argus",
    image: "AssaultRifle_Argus.webp",
  },
  {
    level_index: 7,
    rarity: Rarity.Uncommon,
    name: "M-15 Vindicator",
    image: "AssaultRifle_Vindicator.webp",
  },
  {
    level_index: 368,
    rarity: Rarity.UltraRare,
    name: "N7 Valkyrie",
    image: "AssaultRifle_Valkyrie.webp",
  },
  {
    level_index: 135,
    rarity: Rarity.UltraRare,
    name: "M-99 Saber",
    image: "AssaultRifle_Saber.webp",
  },
  {
    level_index: 6,
    rarity: Rarity.Rare,
    name: "M-76 Revenant",
    image: "AssaultRifle_Revenant.webp",
  },
  {
    level_index: 5,
    rarity: Rarity.Rare,
    name: "M-37 Falcon",
    image: "AssaultRifle_Falcon.webp",
  },
  {
    level_index: 1,
    rarity: Rarity.Rare,
    name: "Collector Rifle",
    image: "AssaultRifle_Collector.webp",
  },
  {
    level_index: 274,
    rarity: Rarity.Rare,
    name: "Striker Assault Rifle",
    image: "AssaultRifle_Krogan.webp",
  },
  {
    level_index: 358,
    rarity: Rarity.UltraRare,
    name: "Particle Rifle",
    image: "AssaultRifle_Prothean_MP.webp",
  },
  {
    level_index: 286,
    rarity: Rarity.UltraRare,
    name: "Cerberus Harrier",
    image: "AssaultRifle_Cerberus.webp",
  },
  {
    level_index: 468,
    rarity: Rarity.UltraRare,
    name: "N7 Typhoon",
    image: "AssaultRifle_LMG.webp",
  },
  {
    level_index: 626,
    rarity: Rarity.UltraRare,
    name: "Geth Spitfire",
    image: "AssaultRifle_Spitfire.webp",
  },
  {
    level_index: 623,
    rarity: Rarity.UltraRare,
    name: "M-7 Lancer",
    image: "AssaultRifle_Lancer_MP.webp",
  },
  {
    level_index: 627,
    rarity: Rarity.Rare,
    name: "Adas Anti-Synthetic Rifle",
    image: "AssaultRifle_Adas_MP.webp",
  },
  {
    level_index: 289,
    rarity: Rarity.Rare,
    name: "Chakram Launcher",
    image: "AssaultRifle_Reckoning.webp",
  },
];

export const SUB_MACHINE_GUNS: Weapon[] = [
  {
    level_index: 28,
    rarity: Rarity.Rare,
    name: "M-25 Hornet",
    image: "SMG_Hornet.webp",
  },
  {
    level_index: 29,
    rarity: Rarity.Common,
    name: "M-4 Shuriken",
    image: "SMG_Shuriken.webp",
  },
  {
    level_index: 264,
    rarity: Rarity.UltraRare,
    name: "N7 Hurricane",
    image: "SMG_Hurricane.webp",
  },
  {
    level_index: 30,
    rarity: Rarity.Uncommon,
    name: "M-9 Tempest",
    image: "SMG_Tempest.webp",
  },
  {
    level_index: 27,
    rarity: Rarity.Uncommon,
    name: "M-12 Locust",
    image: "SMG_Locust.webp",
  },
  {
    level_index: 276,
    rarity: Rarity.Rare,
    name: "Geth Plasma SMG",
    image: "SMG_Geth.webp",
  },
  {
    level_index: 533,
    rarity: Rarity.UltraRare,
    name: "Collector SMG",
    image: "SMG_Collector.webp",
  },
  {
    level_index: 624,
    rarity: Rarity.UltraRare,
    name: "Blood Pack Punisher",
    image: "SMG_Bloodpack_MP.webp",
  },
];

export const SHOTGUNS: Weapon[] = [
  {
    level_index: 17,
    rarity: Rarity.Common,
    name: "M-23 Katana",
    image: "Shotgun_Katana.webp",
  },
  {
    level_index: 16,
    rarity: Rarity.Rare,
    name: "Geth Plasma Shotgun",
    image: "Shotgun_Geth.webp",
  },
  {
    level_index: 137,
    rarity: Rarity.UltraRare,
    name: "M-11 Wraith",
    image: "Shotgun_Striker.webp",
  },
  {
    level_index: 20,
    rarity: Rarity.Uncommon,
    name: "M-27 Scimitar",
    image: "Shotgun_Scimitar.webp",
  },
  {
    level_index: 370,
    rarity: Rarity.Rare,
    name: "AT-12 Raider",
    image: "Shotgun_Raider.webp",
  },
  {
    level_index: 18,
    rarity: Rarity.Rare,
    name: "Graal Spike Thrower",
    image: "Shotgun_Graal.webp",
  },
  {
    level_index: 15,
    rarity: Rarity.Uncommon,
    name: "M-22 Eviscerator",
    image: "Shotgun_Eviscerator.webp",
  },
  {
    level_index: 19,
    rarity: Rarity.Rare,
    name: "Disciple",
    image: "Shotgun_Disciple.webp",
  },
  {
    level_index: 262,
    rarity: Rarity.UltraRare,
    name: "N7 Crusader",
    image: "Shotgun_Crusader.webp",
  },
  {
    level_index: 14,
    rarity: Rarity.Rare,
    name: "M-300 Claymore",
    image: "Shotgun_Claymore.webp",
  },
  {
    level_index: 287,
    rarity: Rarity.Rare,
    name: "Reegar Carbine",
    image: "Shotgun_Quarian.webp",
  },
  {
    level_index: 469,
    rarity: Rarity.Rare,
    name: "N7 Piranha",
    image: "Shotgun_Assault.webp",
  },
  {
    level_index: 525,
    rarity: Rarity.UltraRare,
    name: "Venom Shotgun",
    image: "Shotgun_Salarian_MP.webp",
  },
];

export const PISTOLS: Weapon[] = [
  {
    level_index: 24,
    rarity: Rarity.Uncommon,
    name: "M-5 Phalanx",
    image: "Pistol_Phalanx.webp",
  },
  {
    level_index: 22,
    rarity: Rarity.UltraRare,
    name: "M-358 Talon",
    image: "Pistol_Talon.webp",
  },
  {
    level_index: 23,
    rarity: Rarity.Rare,
    name: "Arc Pistol",
    image: "Pistol_Thor.webp",
  },
  {
    level_index: 26,
    rarity: Rarity.UltraRare,
    name: "Scorpion",
    image: "Pistol_Scorpion.webp",
  },
  {
    level_index: 25,
    rarity: Rarity.Common,
    name: "M-3 Predator",
    image: "Pistol_Predator.webp",
  },
  {
    level_index: 138,
    rarity: Rarity.UltraRare,
    name: "M-77 Paladin",
    image: "Pistol_Ivory.webp",
  },
  {
    level_index: 263,
    rarity: Rarity.UltraRare,
    name: "N7 Eagle",
    image: "Pistol_Eagle.webp",
  },
  {
    level_index: 21,
    rarity: Rarity.Rare,
    name: "M-6 Carnifex",
    image: "Pistol_Carnifex.webp",
  },
  {
    level_index: 470,
    rarity: Rarity.Rare,
    name: "Acolyte",
    image: "Pistol_Asari.webp",
  },
  {
    level_index: 629,
    rarity: Rarity.Rare,
    name: "M-11 Suppressor",
    image: "Pistol_Silencer_MP.webp",
  },
  {
    level_index: 628,
    rarity: Rarity.Rare,
    name: "Executioner Pistol",
    image: "Pistol_Bloodpack_MP.webp",
  },
];

export const WEAPON_CATEGORIES: Category<Weapon>[] = [
  { name: "Sniper Rifles", values: SNIPER_RIFLES },
  { name: "Assault Rifles", values: ASSAULT_RIFLES },
  { name: "Sub Machine Guns", values: SUB_MACHINE_GUNS },
  { name: "Shotguns", values: SHOTGUNS },
  { name: "Pistols", values: PISTOLS },
];

export function getCharacterByKitName(kitName: string): Character | undefined {
  for (const character of CHARACTERS) {
    if (character.kitName === kitName) {
      return character;
    }
  }

  return undefined;
}

const l = { health: 1, armor: 0.75, barrier: 1, shield: 1 };

const Races = {
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

export const CHARACTERS: Character[] = [
  {
    index: 248,
    name: "Human Male",
    image: "AdeptHumanMale.webp",
    className: "Adept",
    kitName: "AdeptHumanMale",
    characterName: "MAdept",
    health: 500,
    barrier: 500,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 150,
    heavy_melee_base_dmg: 500,
    Ra: 4.5,
    heavy_melee_modifiers: { health: 1, armor: 1.5, barrier: 1.5, shield: 1.5 },
    powers: [POWERS.Pc, POWERS.fb, POWERS.Fb, POWERS.ab, POWERS.Za6],
  },
  {
    index: 247,
    name: "Human Female",
    image: "AdeptHumanFemale.webp",
    className: "Adept",
    kitName: "AdeptHumanFemale",
    characterName: "FAdept",
    health: 500,
    barrier: 500,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 150,
    heavy_melee_base_dmg: 500,
    Ra: 4.5,
    heavy_melee_modifiers: { health: 1, armor: 1.5, barrier: 1.5, shield: 1.5 },
    powers: [POWERS.Pc, POWERS.fb, POWERS.Fb, POWERS.ab, POWERS.Za6],
  },
  {
    index: 217,
    name: "Asari",
    image: "MP_Asari0.webp",
    className: "Adept",
    kitName: "AdeptAsari",
    characterName: "Asari",
    health: 500,
    barrier: 500,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 150,
    heavy_melee_base_dmg: 500,
    Ra: 4.5,
    heavy_melee_modifiers: { health: 1, armor: 1.5, barrier: 1.5, shield: 1.5 },
    powers: [POWERS.Qc, POWERS.fb, POWERS.nc, POWERS.Hd, POWERS.Ga],
  },
  {
    index: 218,
    name: "Drell",
    image: "MP_Drell0.webp",
    className: "Adept",
    kitName: "AdeptDrell",
    characterName: "Drell",
    health: 500,
    barrier: 250,
    base_encumbrance: 0.45,
    light_melee_base_dmg: 225,
    heavy_melee_base_dmg: 600,
    heavy_melee_modifiers: l,
    powers: [POWERS.tv, POWERS.Mc, POWERS.Yb, POWERS.cf, POWERS.Be],
  },
  {
    index: 273,
    name: "Asari Justicar",
    image: "MP_AsariComm.webp",
    className: "Adept",
    kitName: "AdeptAsariCommando",
    characterName: "Asari",
    health: 500,
    barrier: 600,
    base_encumbrance: 0.4,
    light_melee_base_dmg: 150,
    heavy_melee_base_dmg: 500,
    Ra: 4.5,
    heavy_melee_modifiers: { health: 1, armor: 1.5, barrier: 1.5, shield: 1.5 },
    powers: [POWERS.ke, POWERS.sv, POWERS.Mc2, POWERS.Zu, POWERS.Ga6],
  },
  {
    index: 282,
    name: "Phoenix",
    image: "MP_Cerberus.webp",
    className: "Adept",
    kitName: "AdeptHumanMaleCerberus",
    characterName: "Human Male",
    health: 500,
    barrier: 500,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 400,
    heavy_melee_base_dmg: 350,
    Ra: 6,
    heavy_melee_modifiers: { health: 1, armor: 1.5, barrier: 1.5, shield: 1.5 },
    powers: [POWERS.Pc, POWERS.Pd, POWERS.hc, POWERS.zh, POWERS.Ga7],
  },
  {
    index: 373,
    name: "N7 Fury",
    image: "MP_AllianceADP.webp",
    className: "Adept",
    kitName: "AdeptN7",
    characterName: "N7 Fury",
    health: 500,
    barrier: 500,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 350,
    heavy_melee_base_dmg: 350,
    Ra: 6,
    heavy_melee_modifiers: { health: 1, armor: 1, barrier: 1.5, shield: 1.5 },
    powers: [POWERS.bd, POWERS.yc2, POWERS.nc2, POWERS.fv, POWERS.Ga8],
  },
  {
    index: 500,
    name: "Volus",
    image: "MP_VolusADP.webp",
    className: "Adept",
    kitName: "AdeptVolus",
    characterName: "Volus Adept",
    health: 150,
    barrier: 500,
    base_encumbrance: 0.15,
    light_melee_base_dmg: 0,
    heavy_melee_base_dmg: 150,
    heavy_melee_modifiers: l,
    powers: [POWERS.Qc, POWERS.ed, POWERS.Eb, POWERS.Jd, POWERS.Ga5],
  },
  {
    index: 514,
    name: "Krogan Shaman",
    image: "MP_KroganADP.webp",
    className: "Adept",
    kitName: "AdeptKrogan",
    characterName: "Krogan Shaman",
    health: 1e3,
    barrier: 1e3,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 300,
    heavy_melee_base_dmg: 700,
    heavy_melee_modifiers: l,
    powers: [POWERS.rb, POWERS.fb, POWERS.Fb, POWERS.ef, POWERS.kd],
  },
  {
    index: 508,
    name: "Batarian Slasher",
    image: "MP_BatarianADP.webp",
    className: "Adept",
    kitName: "AdeptBatarian",
    characterName: "Baterian Slasher",
    health: 750,
    shield: 750,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 190,
    heavy_melee_base_dmg: 1e3,
    heavy_melee_modifiers: l,
    powers: [POWERS.hc2, POWERS.fb, POWERS.Yb, POWERS.Id2, POWERS.ac4],
  },
  {
    index: 577,
    name: "Awakened Collector",
    image: "MP_CollectADP.webp",
    className: "Adept",
    kitName: "AdeptCollector",
    characterName: "Awakened Collector",
    health: 500,
    barrier: 750,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 450,
    light_melee_modifiers: { health: 1, armor: 1.5, barrier: 1.5, shield: 1.5 },
    heavy_melee_base_dmg: 300,
    heavy_melee_modifiers: { health: 1, armor: 1, barrier: 1, shield: 1 },
    race: Races.Collector,
    powers: [POWERS.nf, POWERS.re, POWERS.lv, POWERS.Bo, POWERS.yc],
  },
  {
    index: 256,
    name: "Human Male",
    image: "SoldierHumanMale.webp",
    className: "Soldier",
    kitName: "SoldierHumanMale",
    characterName: "MSoldier",
    health: 500,
    shield: 500,
    base_encumbrance: 0.45,
    light_melee_base_dmg: 150,
    heavy_melee_base_dmg: 600,
    heavy_melee_modifiers: l,
    powers: [POWERS.sc, POWERS.wc, POWERS.Cc, POWERS.ab, POWERS.Za],
  },
  {
    index: 255,
    name: "Human Female",
    image: "SoldierHumanFemale.webp",
    className: "Soldier",
    kitName: "SoldierHumanFemale",
    characterName: "FSoldier",
    health: 500,
    shield: 500,
    base_encumbrance: 0.45,
    light_melee_base_dmg: 150,
    heavy_melee_base_dmg: 600,
    heavy_melee_modifiers: l,
    powers: [POWERS.sc, POWERS.wc, POWERS.Cc, POWERS.ab, POWERS.Za],
  },
  {
    index: 225,
    name: "Krogan",
    image: "MP_Krogan0.webp",
    className: "Soldier",
    kitName: "SoldierKrogan",
    characterName: "Krogan",
    health: 750,
    shield: 1e3,
    base_encumbrance: 0.6,
    light_melee_base_dmg: 300,
    XC: "Krogan Headbutt",
    heavy_melee_base_dmg: 700,
    heavy_melee_modifiers: l,
    powers: [POWERS.ld, POWERS.Xb, POWERS.td, POWERS.ef, POWERS.kd],
  },
  {
    index: 226,
    name: "Turian",
    image: "MP_Turian0.webp",
    className: "Soldier",
    kitName: "SoldierTurian",
    characterName: "Turian",
    health: 500,
    shield: 750,
    base_encumbrance: 0.65,
    light_melee_base_dmg: 200,
    heavy_melee_base_dmg: 675,
    heavy_melee_modifiers: l,
    powers: [POWERS.yd, POWERS.wc, POWERS.lc, POWERS.ff, POWERS.ac],
  },
  {
    index: 268,
    name: "Battlefield 3",
    image: "MP_BF_HMM0.webp",
    className: "Soldier",
    kitName: "SoldierHumanMaleBF3",
    characterName: "MSoldier",
    health: 500,
    shield: 500,
    base_encumbrance: 0.45,
    light_melee_base_dmg: 150,
    heavy_melee_base_dmg: 600,
    heavy_melee_modifiers: l,
    powers: [POWERS.sc, POWERS.Xb, POWERS.Cc, POWERS.ab, POWERS.Za],
  },
  {
    index: 240,
    name: "Batarian",
    image: "MP_Batarian.webp",
    className: "Soldier",
    kitName: "SoldierBatarian",
    characterName: "Batarian",
    health: 750,
    shield: 750,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 190,
    heavy_melee_base_dmg: 1e3,
    heavy_melee_modifiers: l,
    powers: [POWERS.fe, POWERS.tc, POWERS.td2, POWERS.Id, POWERS.ac3],
  },
  {
    index: 278,
    name: "Vorcha",
    image: "MP_Vorcha.webp",
    className: "Soldier",
    kitName: "SoldierVorcha",
    characterName: "Vorcha",
    health: 750,
    shield: 250,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 250,
    heavy_melee_base_dmg: 600,
    heavy_melee_modifiers: l,
    powers: [POWERS.uc, POWERS.Bc, POWERS.Xb, POWERS.gf, POWERS.bc],
  },
  {
    index: 378,
    name: "N7 Destroyer",
    image: "MP_AllianceSOL.webp",
    className: "Soldier",
    kitName: "SoldierN7",
    characterName: "N7 Destroyer",
    health: 500,
    shield: 1e3,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 450,
    heavy_melee_base_dmg: 500,
    Ra: 6,
    heavy_melee_modifiers: { health: 1, armor: 1.5, barrier: 1.5, shield: 1.5 },
    powers: [POWERS.ue, POWERS.Ke, POWERS.Te, POWERS.ev, POWERS.Fo],
  },
  {
    index: 480,
    name: "Turian Havoc",
    image: "MP_TurianSLD.webp",
    className: "Soldier",
    kitName: "N7SoldierTurian",
    characterName: "Turian Havoc",
    health: 500,
    shield: 750,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 200,
    heavy_melee_base_dmg: 600,
    heavy_melee_modifiers: l,
    powers: [POWERS.Je, POWERS.Rd, POWERS.Zb, POWERS.bf, POWERS.De],
  },
  {
    index: 506,
    name: "Geth Trooper",
    image: "MP_GethSLD.webp",
    className: "Soldier",
    kitName: "SoldierGeth",
    characterName: "Geth Trooper",
    health: 250,
    shield: 1e3,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 200,
    heavy_melee_base_dmg: 375,
    Ra: 5,
    heavy_melee_modifiers: { health: 1, armor: 1.5, barrier: 1.5, shield: 1.5 },
    race: Races.Geth,
    powers: [POWERS.Bc2, POWERS.ld, POWERS.Hc, POWERS.df, POWERS.Ce],
  },
  {
    index: 512,
    name: "Quarian Marksman",
    image: "MP_QuarianMSLD.webp",
    className: "Soldier",
    kitName: "SoldierMQuarian",
    characterName: "Geth Trooper",
    health: 500,
    shield: 500,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 150,
    heavy_melee_base_dmg: 600,
    heavy_melee_modifiers: l,
    powers: [POWERS.yd, POWERS.Sc, POWERS.Nc, POWERS.jv, POWERS.bc2],
  },
  {
    index: 576,
    name: "Geth Juggernaut",
    image: "MP_GethPSLD.webp",
    className: "Soldier",
    kitName: "SoldierGethDestroyer",
    characterName: "Geth Juggernaut",
    health: 1e3,
    shield: 2e3,
    base_encumbrance: 0.75,
    light_melee_base_dmg: 250,
    heavy_melee_base_dmg: 60,
    heavy_melee_modifiers: { health: 1, armor: 1, barrier: 2, shield: 2 },
    race: Races.Geth,
    powers: [POWERS.Le, POWERS.rf, POWERS.od, POWERS.av, POWERS.Do],
  },
  {
    index: 250,
    name: "Human Male",
    image: "EngineerHumanMale.webp",
    className: "Engineer",
    kitName: "EngineerHumanMale",
    characterName: "MEngineer",
    health: 500,
    shield: 500,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 150,
    heavy_melee_base_dmg: 600,
    heavy_melee_modifiers: l,
    powers: [POWERS.vc, POWERS.tb, POWERS.Rb, POWERS.ab, POWERS.Za2],
  },
  {
    index: 249,
    name: "Human Female",
    image: "EngineerHumanFemale.webp",
    className: "Engineer",
    kitName: "EngineerHumanFemale",
    characterName: "FEngineer",
    health: 500,
    shield: 500,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 150,
    heavy_melee_base_dmg: 600,
    heavy_melee_modifiers: l,
    powers: [POWERS.vc, POWERS.tb, POWERS.Rb, POWERS.ab, POWERS.Za2],
  },
  {
    index: 219,
    name: "Quarian",
    image: "MP_Quarian0.webp",
    className: "Engineer",
    kitName: "EngineerQuarian",
    characterName: "FEngineer",
    health: 500,
    shield: 600,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 150,
    heavy_melee_base_dmg: 600,
    heavy_melee_modifiers: l,
    powers: [POWERS.Md, POWERS.tb, POWERS.Zb, POWERS.Ah, POWERS.Ga2],
  },
  {
    index: 220,
    name: "Salarian",
    image: "MP_Salarian0.webp",
    className: "Engineer",
    kitName: "EngineerSalarian",
    characterName: "Salarian",
    health: 500,
    shield: 600,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 150,
    heavy_melee_base_dmg: 600,
    heavy_melee_modifiers: l,
    powers: [POWERS.Ac, POWERS.jd, POWERS.tb, POWERS.Ch, POWERS.Ga3],
  },
  {
    index: 238,
    name: "Geth",
    image: "MP_GethEngineer.webp",
    className: "Engineer",
    kitName: "EngineerGeth",
    characterName: "Geth",
    health: 250,
    shield: 750,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 200,
    heavy_melee_base_dmg: 375,
    Ra: 5,
    heavy_melee_modifiers: { health: 1, armor: 1.5, barrier: 1.5, shield: 1.5 },
    race: Races.Geth,
    powers: [POWERS.od2, POWERS.Hc3, POWERS.Rb2, POWERS.df2, POWERS.Ce2],
  },
  {
    index: 280,
    name: "Quarian Male",
    image: "MP_QuarianMale0.webp",
    className: "Engineer",
    kitName: "EngineerQuarianMale",
    characterName: "Quarian Male",
    health: 500,
    shield: 600,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 150,
    heavy_melee_base_dmg: 600,
    heavy_melee_modifiers: l,
    powers: [POWERS.Sc2, POWERS.tb, POWERS.Of, POWERS.Bh, POWERS.bc3],
  },
  {
    index: 374,
    name: "N7 Demolisher",
    image: "MP_AllianceENG.webp",
    className: "Engineer",
    kitName: "EngineerN7",
    characterName: "N7 Demolisher",
    health: 500,
    shield: 600,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 300,
    heavy_melee_base_dmg: 550,
    heavy_melee_modifiers: { health: 1, armor: 1.5, barrier: 1.5, shield: 1.5 },
    powers: [POWERS.tf, POWERS.uj, POWERS.Gc, POWERS.dv, POWERS.Ga4],
  },
  {
    index: 501,
    name: "Volus",
    image: "MP_VolusENG.webp",
    className: "Engineer",
    kitName: "EngineerVolus",
    characterName: "Volus Engineer",
    health: 150,
    shield: 500,
    base_encumbrance: 0.15,
    light_melee_base_dmg: 0,
    heavy_melee_base_dmg: 150,
    heavy_melee_modifiers: l,
    powers: [POWERS.Kd, POWERS.lc, POWERS.Eb, POWERS.Jd, POWERS.Ga5],
  },
  {
    index: 503,
    name: "Turian Saboteur",
    image: "MP_TurianENG.webp",
    className: "Engineer",
    kitName: "EngineerTurian",
    characterName: "Turian Saboteur",
    health: 500,
    shield: 750,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 200,
    heavy_melee_base_dmg: 600,
    heavy_melee_modifiers: l,
    powers: [POWERS.Md, POWERS.Nc, POWERS.Gc2, POWERS.bf, POWERS.De],
  },
  {
    index: 509,
    name: "Vorcha Hunter",
    image: "MP_VorchaENG.webp",
    className: "Engineer",
    kitName: "EngineerVorcha",
    characterName: "Turian Saboteur",
    health: 750,
    shield: 250,
    base_encumbrance: 0.4,
    light_melee_base_dmg: 250,
    heavy_melee_base_dmg: 600,
    heavy_melee_modifiers: l,
    powers: [POWERS.Sd, POWERS.tb, POWERS.uc2, POWERS.gf2, POWERS.bc4],
  },
  {
    index: 584,
    name: "Talon Mercenary",
    image: "MP_MercENG.webp",
    className: "Engineer",
    kitName: "EngineerMerc",
    characterName: "Talon Mercenary",
    health: 500,
    shield: 500,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 100,
    heavy_melee_base_dmg: 100,
    heavy_melee_modifiers: { health: 1, armor: 1, barrier: 1, shield: 1 },
    arrows: 3,
    powers: [POWERS.le, POWERS.me, POWERS.ae, POWERS.$u, POWERS.Io],
    mutually_exclusive: [1, 2],
  },
  {
    index: 254,
    name: "Human Male",
    image: "SentinelHumanMale.webp",
    className: "Sentinel",
    kitName: "SentinelHumanMale",
    characterName: "MSentinel",
    health: 500,
    shield: 500,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 150,
    heavy_melee_base_dmg: 600,
    heavy_melee_modifiers: l,
    powers: [POWERS.Gb, POWERS.fb, POWERS.nc, POWERS.ab, POWERS.Za3],
  },
  {
    index: 253,
    name: "Human Female",
    image: "SentinelHumanFemale.webp",
    className: "Sentinel",
    kitName: "SentinelHumanFemale",
    characterName: "FSentinel",
    health: 500,
    shield: 500,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 150,
    heavy_melee_base_dmg: 600,
    heavy_melee_modifiers: l,
    powers: [POWERS.Gb, POWERS.fb, POWERS.nc, POWERS.ab, POWERS.Za3],
  },
  {
    index: 223,
    name: "Turian",
    image: "MP_Turian0.webp",
    className: "Sentinel",
    kitName: "SentinelTurian",
    characterName: "Turian",
    health: 500,
    shield: 750,
    base_encumbrance: 0.5,
    light_melee_base_dmg: 200,
    heavy_melee_base_dmg: 675,
    heavy_melee_modifiers: l,
    powers: [POWERS.Gb2, POWERS.fb, POWERS.Rb, POWERS.ff, POWERS.ac],
  },
  {
    index: 224,
    name: "Krogan",
    image: "MP_Krogan0.webp",
    className: "Sentinel",
    kitName: "SentinelKrogan",
    characterName: "Krogan",
    health: 750,
    shield: 1e3,
    base_encumbrance: 0.6,
    light_melee_base_dmg: 300,
    heavy_melee_base_dmg: 700,
    heavy_melee_modifiers: l,
    powers: [POWERS.Gb3, POWERS.tb, POWERS.wd, POWERS.ef, POWERS.kd],
  },
  {
    index: 267,
    name: "Batarian",
    image: "MP_Batarian.webp",
    className: "Sentinel",
    kitName: "SentinelBatarian",
    characterName: "Batarian",
    health: 750,
    shield: 750,
    base_encumbrance: 0.45,
    light_melee_base_dmg: 190,
    heavy_melee_base_dmg: 1e3,
    heavy_melee_modifiers: l,
    powers: [POWERS.tc, POWERS.Fb2, POWERS.Sd2, POWERS.Id, POWERS.ac3],
  },
  {
    index: 279,
    name: "Vorcha",
    image: "MP_Vorcha.webp",
    className: "Sentinel",
    kitName: "SentinelVorcha",
    characterName: "Vorcha",
    health: 750,
    shield: 250,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 250,
    heavy_melee_base_dmg: 600,
    heavy_melee_modifiers: l,
    powers: [POWERS.uc, POWERS.Bc, POWERS.Yb, POWERS.gf, POWERS.bc],
  },
  {
    index: 375,
    name: "N7 Paladin",
    image: "MP_AllianceSEN.webp",
    className: "Sentinel",
    kitName: "SentinelN7",
    characterName: "N7 Paladin",
    health: 500,
    shield: 750,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 400,
    light_melee_modifiers: { health: 2, armor: 1.75, barrier: 2, shield: 2 },
    heavy_melee_base_dmg: 400,
    heavy_melee_modifiers: { health: 1, armor: 1, barrier: 1, shield: 1 },
    powers: [POWERS.Ac, POWERS.tb, POWERS.Qd, POWERS.gv, POWERS.Go],
  },
  {
    index: 505,
    name: "Volus Mercenary",
    image: "MP_VolusENG2.webp",
    className: "Sentinel",
    kitName: "SentinelVolus",
    characterName: "Volus Mercenary",
    health: 150,
    shield: 500,
    base_encumbrance: 0.15,
    light_melee_base_dmg: 0,
    heavy_melee_base_dmg: 150,
    heavy_melee_modifiers: l,
    powers: [POWERS.jd2, POWERS.vc, POWERS.Eb, POWERS.Jd, POWERS.Ga5],
  },
  {
    index: 511,
    name: "Asari Valkyrie",
    image: "MP_AsariSEN.webp",
    className: "Sentinel",
    kitName: "SentinelAsari",
    characterName: "Asari Valkyrie",
    health: 500,
    barrier: 500,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 150,
    heavy_melee_base_dmg: 500,
    Ra: 4.5,
    heavy_melee_modifiers: { health: 1, armor: 1.5, barrier: 1.5, shield: 1.5 },
    powers: [POWERS.Gb, POWERS.fb, POWERS.bd2, POWERS.Hd2, POWERS.Ga],
  },
  {
    index: 583,
    name: "Krogan Warlord",
    image: "MP_BloodSEN.webp",
    className: "Sentinel",
    kitName: "SentinelKroganWarlord",
    characterName: "Krogan Warlord",
    health: 1e3,
    barrier: 1250,
    base_encumbrance: 0.4,
    light_melee_base_dmg: 360,
    heavy_melee_base_dmg: 675,
    heavy_melee_modifiers: { health: 1, armor: 1, barrier: 1, shield: 1 },
    powers: [POWERS.Gb4, POWERS.ie, POWERS.ze, POWERS.cv, POWERS.Eo],
    mutually_exclusive: [1, 2],
  },
  {
    index: 252,
    name: "Human Male",
    image: "InfiltratorHumanMale.webp",
    className: "Infiltrator",
    kitName: "InfiltratorHumanMale",
    characterName: "MInfiltrate",
    health: 500,
    shield: 500,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 150,
    heavy_melee_base_dmg: 600,
    heavy_melee_modifiers: l,
    powers: [POWERS.bb, POWERS.Zb, POWERS.Rc, POWERS.ab, POWERS.Za4],
  },
  {
    index: 251,
    name: "Human Female",
    image: "InfiltratorHumanFemale.webp",
    className: "Infiltrator",
    kitName: "InfiltratorHumanFemale",
    characterName: "FInfiltrate",
    health: 500,
    shield: 500,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 150,
    heavy_melee_base_dmg: 600,
    heavy_melee_modifiers: l,
    powers: [POWERS.bb, POWERS.Zb, POWERS.Rc, POWERS.ab, POWERS.Za4],
  },
  {
    index: 221,
    name: "Salarian",
    image: "MP_Salarian0.webp",
    className: "Infiltrator",
    kitName: "InfiltratorSalarian",
    characterName: "Salarian",
    health: 500,
    shield: 600,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 150,
    heavy_melee_base_dmg: 600,
    heavy_melee_modifiers: l,
    powers: [POWERS.bb, POWERS.lc, POWERS.Ac, POWERS.Ch, POWERS.Ga3],
  },
  {
    index: 222,
    name: "Quarian",
    image: "MP_Quarian0.webp",
    className: "Infiltrator",
    kitName: "InfiltratorQuarian",
    characterName: "Quarian",
    health: 500,
    shield: 600,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 150,
    heavy_melee_base_dmg: 600,
    heavy_melee_modifiers: l,
    powers: [POWERS.bb, POWERS.Rc, POWERS.Nc, POWERS.Ah, POWERS.Ga2],
  },
  {
    index: 239,
    name: "Geth",
    image: "MP_GethInfiltrator.webp",
    className: "Infiltrator",
    kitName: "InfiltratorGeth",
    characterName: "Geth",
    health: 250,
    shield: 750,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 200,
    heavy_melee_base_dmg: 375,
    Ra: 5,
    heavy_melee_modifiers: { health: 1, armor: 1.5, barrier: 1.5, shield: 1.5 },
    race: Races.Geth,
    powers: [POWERS.bb2, POWERS.lc2, POWERS.Hc3, POWERS.df2, POWERS.Ce2],
  },
  {
    index: 281,
    name: "Quarian Male",
    image: "MP_QuarianMale0.webp",
    className: "Infiltrator",
    kitName: "InfiltratorQuarianMale",
    characterName: "Quarian Male",
    health: 500,
    shield: 600,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 150,
    heavy_melee_base_dmg: 600,
    heavy_melee_modifiers: l,
    powers: [POWERS.bb, POWERS.Sc2, POWERS.Of, POWERS.Bh, POWERS.bc3],
  },
  {
    index: 377,
    name: "N7 Shadow",
    image: "MP_AllianceINF.webp",
    className: "Infiltrator",
    kitName: "InfiltratorN7",
    characterName: "N7 Shadow",
    health: 500,
    shield: 500,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 250,
    heavy_melee_base_dmg: 700,
    Ra: 2,
    heavy_melee_modifiers: { health: 1, armor: 1, barrier: 1, shield: 1 },
    powers: [POWERS.bb3, POWERS.xe, POWERS.of, POWERS.hv, POWERS.Ho],
  },
  {
    index: 481,
    name: "Turian Ghost",
    image: "MP_TurianINF.webp",
    className: "Infiltrator",
    kitName: "N7InfiltratorTurian",
    characterName: "Turian Ghost",
    health: 500,
    shield: 750,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 200,
    heavy_melee_base_dmg: 600,
    heavy_melee_modifiers: l,
    powers: [POWERS.Tz, POWERS.Rd, POWERS.Rb, POWERS.bf, POWERS.De],
  },
  {
    index: 504,
    name: "Drell Assassin",
    image: "MP_DrellINF.webp",
    className: "Infiltrator",
    kitName: "InfiltratorDrell",
    characterName: "Drell Assassin",
    health: 500,
    shield: 250,
    base_encumbrance: 0.6,
    light_melee_base_dmg: 225,
    heavy_melee_base_dmg: 600,
    heavy_melee_modifiers: l,
    powers: [POWERS.bb, POWERS.Gc2, POWERS.Kd, POWERS.cf, POWERS.Be],
  },
  {
    index: 510,
    name: "Asari Huntress",
    image: "MP_AsariINF.webp",
    className: "Infiltrator",
    kitName: "InfiltratorAsari",
    characterName: "Drell Assassin",
    health: 500,
    shield: 500,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 150,
    heavy_melee_base_dmg: 500,
    Ra: 4.5,
    heavy_melee_modifiers: { health: 1, armor: 1.5, barrier: 1.5, shield: 1.5 },
    powers: [POWERS.Uz, POWERS.yc3, POWERS.fb, POWERS.Hd3, POWERS.Ga],
  },
  {
    index: 602,
    name: "Alliance Infiltration Unit",
    image: "MP_FBotINF.webp",
    className: "Infiltrator",
    kitName: "InfiltratorFembot",
    characterName: "Krogan Warlord",
    health: 500,
    shield: 750,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 350,
    heavy_melee_base_dmg: 650,
    heavy_melee_modifiers: l,
    powers: [POWERS.Sz, POWERS.Qd1, POWERS.kf, POWERS.kv, POWERS.Co],
  },
  {
    index: 290,
    name: "Battlefield 3 Infiltrator",
    image: "MP_BF3_INF.webp",
    className: "Infiltrator",
    kitName: "InfiltratorHumanFemaleBF3",
    characterName: "MSoldier",
    health: 500,
    shield: 500,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 150,
    heavy_melee_base_dmg: 600,
    heavy_melee_modifiers: l,
    powers: [POWERS.bb, POWERS.tb, POWERS.Rc, POWERS.ab, POWERS.Za4],
  },
  {
    index: 258,
    name: "Human Male",
    image: "VanguardHumanMale.webp",
    className: "Vanguard",
    kitName: "VanguardHumanMale",
    characterName: "MVanguard",
    health: 500,
    barrier: 500,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 150,
    heavy_melee_base_dmg: 500,
    heavy_melee_modifiers: l,
    powers: [POWERS.lb, POWERS.Fb, POWERS.Bd, POWERS.ab, POWERS.Za5],
  },
  {
    index: 257,
    name: "Human Female",
    image: "VanguardHumanFemale.webp",
    className: "Vanguard",
    kitName: "VanguardHumanFemale",
    characterName: "FVanguard",
    health: 500,
    barrier: 500,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 150,
    heavy_melee_base_dmg: 500,
    heavy_melee_modifiers: l,
    powers: [POWERS.lb, POWERS.Fb, POWERS.Bd, POWERS.ab, POWERS.Za5],
  },
  {
    index: 227,
    name: "Drell",
    image: "MP_Drell0.webp",
    className: "Vanguard",
    kitName: "VanguardDrell",
    characterName: "Drell",
    health: 500,
    barrier: 250,
    base_encumbrance: 0.6,
    light_melee_base_dmg: 225,
    heavy_melee_base_dmg: 600,
    heavy_melee_modifiers: l,
    powers: [POWERS.lb, POWERS.Mc, POWERS.Yb, POWERS.cf, POWERS.Be],
  },
  {
    index: 228,
    name: "Asari",
    image: "MP_Asari0.webp",
    className: "Vanguard",
    kitName: "VanguardAsari",
    characterName: "Asari",
    health: 500,
    barrier: 500,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 150,
    heavy_melee_base_dmg: 500,
    Ra: 4.5,
    heavy_melee_modifiers: { health: 1, armor: 1.5, barrier: 1.5, shield: 1.5 },
    powers: [POWERS.lb, POWERS.Qc, POWERS.wd, POWERS.Hd, POWERS.Ga],
  },
  {
    index: 272,
    name: "Krogan",
    image: "MP_Krogan0.webp",
    className: "Vanguard",
    kitName: "VanguardKrogan",
    characterName: "Krogan",
    health: 1e3,
    barrier: 1e3,
    base_encumbrance: 0.5,
    light_melee_base_dmg: 300,
    heavy_melee_base_dmg: 700,
    heavy_melee_modifiers: l,
    powers: [POWERS.Kk, POWERS.Xb2, POWERS.rb2, POWERS.bv, POWERS.kd2],
  },
  {
    index: 283,
    name: "Phoenix",
    image: "MP_Cerberus.webp",
    className: "Vanguard",
    kitName: "VanguardHumanMaleCerberus",
    characterName: "Human Male",
    health: 500,
    barrier: 500,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 400,
    heavy_melee_base_dmg: 350,
    Ra: 6,
    heavy_melee_modifiers: { health: 1, armor: 1.5, barrier: 1.5, shield: 1.5 },
    powers: [POWERS.lb, POWERS.Pd, POWERS.hc, POWERS.zh, POWERS.Ga7],
  },
  {
    index: 376,
    name: "N7 Slayer",
    image: "MP_AllianceVAN.webp",
    className: "Vanguard",
    kitName: "VanguardN7",
    characterName: "N7 Slayer",
    health: 500,
    barrier: 500,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 250,
    heavy_melee_base_dmg: 700,
    Ra: 2.5,
    heavy_melee_modifiers: { health: 1, armor: 1, barrier: 1, shield: 1 },
    powers: [POWERS.lb, POWERS.We, POWERS.je, POWERS.iv, POWERS.Ga9],
  },
  {
    index: 507,
    name: "Volus Protector",
    image: "MP_VolusVAN.webp",
    className: "Vanguard",
    kitName: "VanguardVolus",
    characterName: "Volus Protector",
    health: 150,
    barrier: 500,
    base_encumbrance: 0.15,
    light_melee_base_dmg: 0,
    heavy_melee_base_dmg: 150,
    heavy_melee_modifiers: l,
    powers: [POWERS.lb, POWERS.Eb, POWERS.ed, POWERS.Jd, POWERS.Ga5],
  },
  {
    index: 513,
    name: "Batarian Brawler",
    image: "MP_BatarianVAN.webp",
    className: "Vanguard",
    kitName: "VanguardBatarian",
    characterName: "Volus Protector",
    health: 750,
    barrier: 750,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 190,
    heavy_melee_base_dmg: 1e3,
    heavy_melee_modifiers: l,
    powers: [POWERS.lb, POWERS.hc2, POWERS.tc2, POWERS.Id2, POWERS.ac4],
  },
  {
    index: 592,
    name: "Cabal",
    image: "MP_TurianVAN.webp",
    className: "Vanguard",
    kitName: "VanguardTurianFemale",
    characterName: "Cabal Vanguard",
    health: 500,
    barrier: 750,
    base_encumbrance: 0.3,
    light_melee_base_dmg: 250,
    heavy_melee_base_dmg: 700,
    heavy_melee_modifiers: { health: 1, armor: 1, barrier: 1, shield: 1 },
    powers: [POWERS.Ye, POWERS.Ue, POWERS.he, POWERS.ff2, POWERS.Jo],
  },
];

function getCharactersByIndexes(indexes: number[]): Character[] {
  const out = [];

  for (const character of CHARACTERS) {
    if (indexes.includes(character.index)) {
      out.push(character);
    }
  }

  return out;
}

export const ADEPT_CHARACTERS: Character[] = getCharactersByIndexes([
  248, 247, 217, 218, 273, 282, 373, 500, 514, 508, 577,
]);

export const SOLDIER_CHARACTERS: Character[] = getCharactersByIndexes([
  256, 255, 225, 226, 268, 240, 278, 378, 480, 506, 512, 576,
]);
export const ENGINEER_CHARACTERS: Character[] = getCharactersByIndexes([
  250, 249, 219, 220, 238, 280, 374, 501, 503, 509, 584,
]);

export const SENTINEL_CHARACTERS: Character[] = getCharactersByIndexes([
  254, 253, 223, 224, 267, 279, 375, 505, 511, 583,
]);

export const INFILTRATOR_CHARACTERS: Character[] = getCharactersByIndexes([
  252, 251, 221, 222, 239, 281, 377, 481, 504, 510, 602, 290,
]);

export const VANGUARD_CHARACTERS: Character[] = getCharactersByIndexes([
  258, 257, 227, 228, 272, 283, 376, 507, 513, 592,
]);

export const CHARACTER_CLASSES: Category<Character>[] = [
  { name: "Adept", values: ADEPT_CHARACTERS },
  { name: "Soldier", values: SOLDIER_CHARACTERS },
  { name: "Engineer", values: ENGINEER_CHARACTERS },
  { name: "Sentinel", values: SENTINEL_CHARACTERS },
  { name: "Infiltrator", values: INFILTRATOR_CHARACTERS },
  { name: "Vanguard", values: VANGUARD_CHARACTERS },
];

export const MASS_EFFECT_CHALLENGES: Challenge[] = [
  { index_current_points: 102, name: "Mass Effect", image: "BOB-Fem.webp", challenge_points: 500, description: "Complete 25 of the Mass Effect Challenges", times_completed_index: 1, max_points: 25 },
  { index_current_points: 104, name: "Squad Elite", image: "OptTeamPrivate.webp", challenge_points: 200, description: "Complete Squad Elite once", times_completed_index: 1, max_points: 8 },
  { index_current_points: 105, name: "Spectre Mastery", image: "OptTeamPrivate.webp", challenge_points: 500, description: "Complete Spectre Mastery once", times_completed_index: 1, max_points: 3 },
  { index_current_points: 106, name: "Solo Mastery", image: "OptTeamPrivate.webp", challenge_points: 100, description: "Complete Solo Mastery once", times_completed_index: 1, max_points: 3 },
  { index_current_points: 107, name: "Shotgun Mastery", image: "OptTeamPrivate.webp", challenge_points: 175, description: "Complete Shotgun Mastery once", times_completed_index: 1, max_points: 9 },
  { index_current_points: 108, name: "Assault Rifle Mastery", image: "OptTeamPrivate.webp", challenge_points: 175, description: "Complete Assault Rifle Mastery once", times_completed_index: 1, max_points: 9 },
  { index_current_points: 109, name: "Pistol Mastery", image: "OptTeamPrivate.webp", challenge_points: 155, description: "Complete Pistol Mastery once", times_completed_index: 1, max_points: 8 },
  { index_current_points: 110, name: "SMG Mastery", image: "OptTeamPrivate.webp", challenge_points: 100, description: "Complete SMG Mastery once", times_completed_index: 1, max_points: 5 },
  { index_current_points: 111, name: "Sniper Mastery", image: "OptTeamPrivate.webp", challenge_points: 175, description: "Complete Sniper Mastery once", times_completed_index: 1, max_points: 9 },
  { index_current_points: 112, name: "Resurgence Mastery", image: "OptTeamPrivate.webp", challenge_points: 170, description: "Complete Resurgence Mastery once", times_completed_index: 1, max_points: 9 },
  { index_current_points: 113, name: "Rebellion Mastery", image: "OptTeamPrivate.webp", challenge_points: 170, description: "Complete Rebellion Mastery once", times_completed_index: 1, max_points: 9 },
  { index_current_points: 114, name: "Earth Mastery", image: "OptTeamPrivate.webp", challenge_points: 170, description: "Complete Earth Mastery once", times_completed_index: 1, max_points: 9 },
  { index_current_points: 115, name: "Retaliation Mastery", image: "OptTeamPrivate.webp", challenge_points: 170, description: "Complete Retaliation Mastery once", times_completed_index: 1, max_points: 6 },
  { index_current_points: 116, name: "Combat Mastery", image: "OptTeamPrivate.webp", challenge_points: 255, description: "Complete Combat Mastery once", times_completed_index: 1, max_points: 12 },
  { index_current_points: 117, name: "Cerberus Mastery", image: "OptTeamPrivate.webp", challenge_points: 250, description: "Complete Cerberus Mastery once", times_completed_index: 1, max_points: 21 },
  { index_current_points: 118, name: "Reapers Mastery", image: "OptTeamPrivate.webp", challenge_points: 250, description: "Complete Reapers Mastery once", times_completed_index: 1, max_points: 18 },
  { index_current_points: 119, name: "Geth Mastery", image: "OptTeamPrivate.webp", challenge_points: 250, description: "Complete Geth Mastery once", times_completed_index: 1, max_points: 18 },
  { index_current_points: 120, name: "Collectors Mastery", image: "OptTeamPrivate.webp", challenge_points: 250, description: "Complete Collectors Mastery once", times_completed_index: 1, max_points: 15 },
  { index_current_points: 121, name: "Bloodpack Mastery", image: "OptTeamPrivate.webp", challenge_points: 170, description: "Complete Bloodpack Mastery once", times_completed_index: 1, max_points: 9 },
  { index_current_points: 122, name: "Commando Mastery", image: "OptTeamPrivate.webp", challenge_points: 200, description: "Complete Commando Mastery once", times_completed_index: 1, max_points: 12 },
  { index_current_points: 123, name: "Machine Mastery", image: "OptTeamPrivate.webp", challenge_points: 170, description: "Complete Machine Mastery once", times_completed_index: 1, max_points: 8 },
  { index_current_points: 124, name: "Outsider Mastery", image: "OptTeamPrivate.webp", challenge_points: 170, description: "Complete Outsider Mastery once", times_completed_index: 1, max_points: 7 },
  { index_current_points: 125, name: "N7 Mastery", image: "OptTeamPrivate.webp", challenge_points: 300, description: "Complete N7 Mastery once", times_completed_index: 1, max_points: 6 },
  { index_current_points: 126, name: "Map Mastery", image: "OptTeamPrivate.webp", challenge_points: 450, description: "Complete Map Mastery once", times_completed_index: 1, max_points: 40 },
  { index_current_points: 127, name: "Biotic Mastery", image: "OptTeamPrivate.webp", challenge_points: 140, description: "Complete Biotic Mastery once", times_completed_index: 1, max_points: 14 },
  { index_current_points: 128, name: "Tech Mastery", image: "OptTeamPrivate.webp", challenge_points: 140, description: "Complete Tech Mastery once", times_completed_index: 1, max_points: 13 },
];

export const SQUAD_ELITE_CHALLENGES: Challenge[] = [
  { index_current_points: 104, name: "Squad Elite", image: "SqadMstr.png", challenge_points: 200, description: "Complete 8 of the Squad Elite Challenges", times_completed_index: 1, max_points: 8 },
  { index_current_points: 131, name: "Bronze Extractions", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Extract at least 25 times on bronze difficulty", times_completed_index: 1, max_points: 25 },
  { index_current_points: 420, name: "Silver Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract at least 25 times on silver difficulty", times_completed_index: 1, max_points: 25 },
  { index_current_points: 421, name: "Gold Extractions", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Extract at least 25 times on gold difficulty", times_completed_index: 1, max_points: 25 },
  { index_current_points: 422, name: "Platinum Extractions", image: "OptTeamPrivate.webp", challenge_points: 40, description: "Extract at least 25 times on platinum difficulty", times_completed_index: 1, max_points: 25 },
  { index_current_points: 132, name: "First Aid Medals", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 100 First Aid Medals", times_completed_index: 1, max_points: 100 },
  { index_current_points: 133, name: "Cobra Missle Launcher Use", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Earn 450000 points using the Cobra Missle Launcher", times_completed_index: 1, max_points: 450000 },
  { index_current_points: 134, name: "Survival Medals", image: "OptTeamPrivate.webp", challenge_points: 15, description: "Earn 100 survival medals", times_completed_index: 1, max_points: 100 },
  { index_current_points: 745, name: "Unknown Map Extractions", image: "OptTeamPrivate.webp", challenge_points: 15, description: "Extract 25 times from unknown locations", times_completed_index: 1, max_points: 25 },
  { index_current_points: 746, name: "Unknown Enemy Extractions", image: "OptTeamPrivate.webp", challenge_points: 15, description: "Extract 25 times against unknown enemey", times_completed_index: 1, max_points: 25 },
];

export const SPECTRE_MASTERY_CHALLENGES: Challenge[] = [
  { index_current_points: 135, name: "Spectre Mastery", image: "SpecMstr.png", challenge_points: 500, description: "Complete 3 of the Spectre Mastery Challenges", times_completed_index: 1, max_points: 3 },
  { index_current_points: 136, name: "Points Earned", image: "OptTeamPrivate.webp", challenge_points: 100, description: "Earn 25000000 points", times_completed_index: 1, max_points: 25000000 },
  { index_current_points: 137, name: "Waves Completed", image: "OptTeamPrivate.webp", challenge_points: 100, description: "Complete 2500 waves", times_completed_index: 1, max_points: 2500 },
  { index_current_points: 138, name: "In-Game Medals Earned", image: "OptTeamPrivate.webp", challenge_points: 100, description: "Earn 5000 points from medals", times_completed_index: 1, max_points: 5000 },
];

export const SOLO_MASTERY_CHALLENGES: Challenge[] = [
  { index_current_points: 139, name: "Solo Mastery", image: "SoloMstr.png", challenge_points: 100, description: "Complete 3 of the Solo Mastery Challenges", times_completed_index: 1, max_points: 3 },
  { index_current_points: 140, name: "Solo bronze", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Extract 10 times solo on bronze", times_completed_index: 1, max_points: 10 },
  { index_current_points: 141, name: "Solo silver", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Extract 5 times solo on silver", times_completed_index: 1, max_points: 5 },
  { index_current_points: 142, name: "Solo gold", image: "OptTeamPrivate.webp", challenge_points: 50, description: "Extract 2 times solo on gold", times_completed_index: 1, max_points: 2 },
  { index_current_points: 143, name: "Solo platinum", image: "OptTeamPrivate.webp", challenge_points: 100, description: "Extract 1 times solo on platinum", times_completed_index: 1, max_points: 1 },
];

export const N7_MASTERY_CHALLENGES: Challenge[] = [
  { index_current_points: 139, name: "N7 Mastery", image: "N7Mstr.png", challenge_points: 300, description: "Complete 6 of the N7 Mastery Challenges", times_completed_index: 1, max_points: 6 },
  { index_current_points: 331, name: "Promotions", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Promote 6 characters", times_completed_index: 1, max_points: 6 },
  { index_current_points: 331, name: "Promotions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Promote 12 characters", times_completed_index: 1, max_points: 12 },
  { index_current_points: 331, name: "Promotions", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Promote 24 characters", times_completed_index: 1, max_points: 24 },
  { index_current_points: 331, name: "Promotions", image: "OptTeamPrivate.webp", challenge_points: 40, description: "Promote 36 characters", times_completed_index: 1, max_points: 36 },
  { index_current_points: 331, name: "Promotions", image: "OptTeamPrivate.webp", challenge_points: 50, description: "Promote 48 characters", times_completed_index: 1, max_points: 48 },
  { index_current_points: 331, name: "Promotions", image: "OptTeamPrivate.webp", challenge_points: 60, description: "Promote 60 characters", times_completed_index: 1, max_points: 60 },
];

export const MAP_MASTERY_CHALLENGES: Challenge[] = [
  { index_current_points: 139, name: "Map Mastery", image: "MapMstr.png", challenge_points: 450, description: "Complete 40 of the Map Mastery Challenges", times_completed_index: 1, max_points: 40 },
  { index_current_points: 333, name: "Firebase Ghost: Bronze Waves", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Complete 100 bronze waves on FB Ghost", times_completed_index: 1, max_points: 100 },
  { index_current_points: 334, name: "Firebase Ghost: Silver Waves", image: "OptTeamPrivate.webp", challenge_points: 15, description: "Complete 100 silver waves on FB Ghost", times_completed_index: 1, max_points: 100 },
  { index_current_points: 335, name: "Firebase Ghost: Gold Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 100 gold waves on FB Ghost", times_completed_index: 1, max_points: 100 },
  { index_current_points: 336, name: "Firebase Ghost: Platinum Waves", image: "OptTeamPrivate.webp", challenge_points: 25, description: "Complete 100 platinum waves on FB Ghost", times_completed_index: 1, max_points: 100 },
  { index_current_points: 337, name: "Firebase White: Bronze Waves", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Complete 100 bronze waves on FB White", times_completed_index: 1, max_points: 100 },
  { index_current_points: 338, name: "Firebase White: Silver Waves", image: "OptTeamPrivate.webp", challenge_points: 15, description: "Complete 100 silver waves on FB White", times_completed_index: 1, max_points: 100 },
  { index_current_points: 339, name: "Firebase White: Gold Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 100 gold waves on FB White", times_completed_index: 1, max_points: 100 },
  { index_current_points: 340, name: "Firebase White: Platinum Waves", image: "OptTeamPrivate.webp", challenge_points: 25, description: "Complete 100 platinum waves on FB White", times_completed_index: 1, max_points: 100 },
  { index_current_points: 341, name: "Firebase Dagger: Bronze Waves", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Complete 100 bronze waves on FB Dagger", times_completed_index: 1, max_points: 100 },
  { index_current_points: 342, name: "Firebase Dagger: Silver Waves", image: "OptTeamPrivate.webp", challenge_points: 15, description: "Complete 100 silver waves on FB Dagger", times_completed_index: 1, max_points: 100 },
  { index_current_points: 343, name: "Firebase Dagger: Gold Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 100 gold waves on FB Dagger", times_completed_index: 1, max_points: 100 },
  { index_current_points: 344, name: "Firebase Dagger: Platinum Waves", image: "OptTeamPrivate.webp", challenge_points: 25, description: "Complete 100 platinum waves on FB Dagger", times_completed_index: 1, max_points: 100 },
  { index_current_points: 345, name: "Firebase Giant: Bronze Waves", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Complete 100 bronze waves on FB Giant", times_completed_index: 1, max_points: 100 },
  { index_current_points: 346, name: "Firebase Giant: Silver Waves", image: "OptTeamPrivate.webp", challenge_points: 15, description: "Complete 100 silver waves on FB Giant", times_completed_index: 1, max_points: 100 },
  { index_current_points: 347, name: "Firebase Giant: Gold Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 100 gold waves on FB Giant", times_completed_index: 1, max_points: 100 },
  { index_current_points: 348, name: "Firebase Giant: Platinum Waves", image: "OptTeamPrivate.webp", challenge_points: 25, description: "Complete 100 platinum waves on FB Giant", times_completed_index: 1, max_points: 100 },
  { index_current_points: 349, name: "Firebase Glacier: Bronze Waves", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Complete 100 bronze waves on FB Glacier", times_completed_index: 1, max_points: 100 },
  { index_current_points: 350, name: "Firebase Glacier: Silver Waves", image: "OptTeamPrivate.webp", challenge_points: 15, description: "Complete 100 silver waves on FB Glacier", times_completed_index: 1, max_points: 100 },
  { index_current_points: 351, name: "Firebase Glacier: Gold Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 100 gold waves on FB Glacier", times_completed_index: 1, max_points: 100 },
  { index_current_points: 352, name: "Firebase Glacier: Platinum Waves", image: "OptTeamPrivate.webp", challenge_points: 25, description: "Complete 100 platinum waves on FB Glacier", times_completed_index: 1, max_points: 100 },
  { index_current_points: 353, name: "Firebase Reactor: Bronze Waves", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Complete 100 bronze waves on FB Reactor", times_completed_index: 1, max_points: 100 },
  { index_current_points: 354, name: "Firebase Reactor: Silver Waves", image: "OptTeamPrivate.webp", challenge_points: 15, description: "Complete 100 silver waves on FB Reactor", times_completed_index: 1, max_points: 100 },
  { index_current_points: 355, name: "Firebase Reactor: Gold Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 100 gold waves on FB Reactor", times_completed_index: 1, max_points: 100 },
  { index_current_points: 356, name: "Firebase Reactor: Platinum Waves", image: "OptTeamPrivate.webp", challenge_points: 25, description: "Complete 100 platinum waves on FB Reactor", times_completed_index: 1, max_points: 100 },
  { index_current_points: 357, name: "Firebase Condor: Bronze Waves", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Complete 100 bronze waves on FB Condor", times_completed_index: 1, max_points: 100 },
  { index_current_points: 358, name: "Firebase Condor: Silver Waves", image: "OptTeamPrivate.webp", challenge_points: 15, description: "Complete 100 silver waves on FB Condor", times_completed_index: 1, max_points: 100 },
  { index_current_points: 359, name: "Firebase Condor: Gold Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 100 gold waves on FB Condor", times_completed_index: 1, max_points: 100 },
  { index_current_points: 360, name: "Firebase Condor: Platinum Waves", image: "OptTeamPrivate.webp", challenge_points: 25, description: "Complete 100 platinum waves on FB Condor", times_completed_index: 1, max_points: 100 },
  { index_current_points: 361, name: "Firebase Hydra: Bronze Waves", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Complete 100 bronze waves on FB Hydra", times_completed_index: 1, max_points: 100 },
  { index_current_points: 362, name: "Firebase Hydra: Silver Waves", image: "OptTeamPrivate.webp", challenge_points: 15, description: "Complete 100 silver waves on FB Hydra", times_completed_index: 1, max_points: 100 },
  { index_current_points: 363, name: "Firebase Hydra: Gold Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 100 gold waves on FB Hydra", times_completed_index: 1, max_points: 100 },
  { index_current_points: 364, name: "Firebase Hydra: Platinum Waves", image: "OptTeamPrivate.webp", challenge_points: 25, description: "Complete 100 platinum waves on FB Hydra", times_completed_index: 1, max_points: 100 },
  { index_current_points: 365, name: "Firebase Jade: Bronze Waves", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Complete 100 bronze waves on FB Jade", times_completed_index: 1, max_points: 100 },
  { index_current_points: 366, name: "Firebase Jade: Silver Waves", image: "OptTeamPrivate.webp", challenge_points: 15, description: "Complete 100 silver waves on FB Jade", times_completed_index: 1, max_points: 100 },
  { index_current_points: 367, name: "Firebase Jade: Gold Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 100 gold waves on FB Jade", times_completed_index: 1, max_points: 100 },
  { index_current_points: 368, name: "Firebase Jade: Platinum Waves", image: "OptTeamPrivate.webp", challenge_points: 25, description: "Complete 100 platinum waves on FB Jade", times_completed_index: 1, max_points: 100 },
  { index_current_points: 369, name: "Firebase Goddess: Bronze Waves", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Complete 100 bronze waves on FB Goddess", times_completed_index: 1, max_points: 100 },
  { index_current_points: 370, name: "Firebase Goddess: Silver Waves", image: "OptTeamPrivate.webp", challenge_points: 15, description: "Complete 100 silver waves on FB Goddess", times_completed_index: 1, max_points: 100 },
  { index_current_points: 371, name: "Firebase Goddess: Gold Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 100 gold waves on FB Goddess", times_completed_index: 1, max_points: 100 },
  { index_current_points: 372, name: "Firebase Goddess: Platinum Waves", image: "OptTeamPrivate.webp", challenge_points: 25, description: "Complete 100 platinum waves on FB Goddess", times_completed_index: 1, max_points: 100 },
  { index_current_points: 373, name: "Firebase Rio: Bronze Waves", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Complete 100 bronze waves on FB Rio", times_completed_index: 1, max_points: 100 },
  { index_current_points: 374, name: "Firebase Rio: Silver Waves", image: "OptTeamPrivate.webp", challenge_points: 15, description: "Complete 100 silver waves on FB Rio", times_completed_index: 1, max_points: 100 },
  { index_current_points: 375, name: "Firebase Rio: Gold Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 100 gold waves on FB Rio", times_completed_index: 1, max_points: 100 },
  { index_current_points: 376, name: "Firebase Rio: Platinum Waves", image: "OptTeamPrivate.webp", challenge_points: 25, description: "Complete 100 platinum waves on FB Rio", times_completed_index: 1, max_points: 100 },
  { index_current_points: 377, name: "Firebase Vancouver: Bronze Waves", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Complete 100 bronze waves on FB Vancouver", times_completed_index: 1, max_points: 100 },
  { index_current_points: 378, name: "Firebase Vancouver: Silver Waves", image: "OptTeamPrivate.webp", challenge_points: 15, description: "Complete 100 silver waves on FB Vancouver", times_completed_index: 1, max_points: 100 },
  { index_current_points: 379, name: "Firebase Vancouver: Gold Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 100 gold waves on FB Vancouver", times_completed_index: 1, max_points: 100 },
  { index_current_points: 380, name: "Firebase Vancouver: Platinum Waves", image: "OptTeamPrivate.webp", challenge_points: 25, description: "Complete 100 platinum waves on FB Vancouver", times_completed_index: 1, max_points: 100 },
  { index_current_points: 381, name: "Firebase London: Bronze Waves", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Complete 100 bronze waves on FB London", times_completed_index: 1, max_points: 100 },
  { index_current_points: 382, name: "Firebase London: Silver Waves", image: "OptTeamPrivate.webp", challenge_points: 15, description: "Complete 100 silver waves on FB London", times_completed_index: 1, max_points: 100 },
  { index_current_points: 383, name: "Firebase London: Gold Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 100 gold waves on FB London", times_completed_index: 1, max_points: 100 },
  { index_current_points: 384, name: "Firebase London: Platinum Waves", image: "OptTeamPrivate.webp", challenge_points: 25, description: "Complete 100 platinum waves on FB London", times_completed_index: 1, max_points: 100 },
  { index_current_points: 385, name: "Hazard: Bronze Waves", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Complete 200 bronze waves on hazard missions", times_completed_index: 1, max_points: 200 },
  { index_current_points: 386, name: "Hazard: Silver Waves", image: "OptTeamPrivate.webp", challenge_points: 15, description: "Complete 200 silver waves on hazard missions", times_completed_index: 1, max_points: 200 },
  { index_current_points: 387, name: "Hazard: Gold Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 gold on hazard missions", times_completed_index: 1, max_points: 200 },
  { index_current_points: 388, name: "Hazard: Platinum Waves", image: "OptTeamPrivate.webp", challenge_points: 25, description: "Complete 200 platinum waves on hazard missions", times_completed_index: 1, max_points: 175 },
];

export const BIOTIC_MASTERY_CHALLENGES: Challenge[] = [
  { index_current_points: 127, name: "Biotic Mastery", image: "BioticMstr.png", challenge_points: 140, description: "Complete 14 of the Biotic Mastery Challenges", times_completed_index: 1, max_points: 14 },
  { index_current_points: 390, name: "Biotic Explosions 1", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Detonate 50 biotic explosions", times_completed_index: 1, max_points: 50 },
  { index_current_points: 390, name: "Biotic Explosions 2", image: "OptTeamPrivate.webp", challenge_points: 15, description: "Detonate 250 biotic explosions", times_completed_index: 1, max_points: 250 },
  { index_current_points: 390, name: "Biotic Explosions 3", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Detonate 500 biotic explosions", times_completed_index: 1, max_points: 500 },
  { index_current_points: 391, name: "Throw Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Throw", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 392, name: "Pull Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Pull", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 393, name: "Singularity Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Singularity", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 394, name: "Shockwave Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Shockwave", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 395, name: "Warp Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Warp", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 396, name: "Biotic Charge Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Biotic Charge", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 397, name: "Reave Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Reave", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 398, name: "Stasis Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Stasis", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 400, name: "Dark Channel Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Dark Channel", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 401, name: "Annihilation Field Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Annihilation Field", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 402, name: "Biotic Slash Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Biotic Slash", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 403, name: "Lash Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Lash", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 404, name: "Nova Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Nova", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 617, name: "Smash Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Smash", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 618, name: "Biotic Orbs Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Biotic Orbs", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 619, name: "Barrier Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Barrier", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 706, name: "Dark Sphere Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Dark Sphere", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 707, name: "Seeker Swarm Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Seeker Swarm", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 708, name: "Biotic Hammer Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Biotic Hammer", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 709, name: "Poison Strike Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Poison Strike", times_completed_index: 1, max_points: 50000 },
];

export const TECH_MASTERY_CHALLENGES: Challenge[] = [
  { index_current_points: 128, name: "Tech Mastery", image: "TechMstr.png", challenge_points: 140, description: "Complete 13 of the Tech Mastery Challenges", times_completed_index: 1, max_points: 13 },
  { index_current_points: 406, name: "Tech Explosions 1", image: "OptTeamPrivate.webp", challenge_points: 15, description: "Detonate 50 Tech explosions", times_completed_index: 1, max_points: 50 },
  { index_current_points: 406, name: "Tech Explosions 2", image: "OptTeamPrivate.webp", challenge_points: 25, description: "Detonate 250 Tech explosions", times_completed_index: 1, max_points: 250 },
  { index_current_points: 406, name: "Tech Explosions 3", image: "OptTeamPrivate.webp", challenge_points: 35, description: "Detonate 500 Tech explosions", times_completed_index: 1, max_points: 500 },
  { index_current_points: 407, name: "Incinerate Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Incinerate", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 408, name: "Overload Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Overload", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 410, name: "Cryo Blast Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 25000 Points Using Cryo Blast", times_completed_index: 1, max_points: 25000 },
  { index_current_points: 411, name: "Combat Drone Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Combat Drone", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 412, name: "Tech Armor Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 25000 Points Using Tech Armor", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 413, name: "Energy Drain Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Energy Drain", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 414, name: "Sentury Turret Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Sentury Turret", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 405, name: "Submission Net Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Submission Net", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 415, name: "Flamer Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Flamer", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 416, name: "Shadow Strike Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Shadow Strike", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 417, name: "Electric Slash Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Electric Slash", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 418, name: "Snap Freeze Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Snap Freeze", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 419, name: "Geth Turret Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Geth Turret", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 710, name: "Siege Pulse Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Siege Pulse", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 711, name: "Hex Shield Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Hex Shield", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 714, name: "Electrical Hammer Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using Electrical Hammer", times_completed_index: 1, max_points: 50000 },
];

export const CHALLENGE_TYPES_GENERAL: Category<Challenge>[] = [
  { name: "Mass Effect", values: MASS_EFFECT_CHALLENGES },
  { name: "Squad Elite", values: SQUAD_ELITE_CHALLENGES },
  { name: "Spectre Mastery", values: SPECTRE_MASTERY_CHALLENGES },
  { name: "Solo Mastery", values: SOLO_MASTERY_CHALLENGES },
  { name: "N7 Mastery", values: N7_MASTERY_CHALLENGES },
  { name: "Map Mastery", values: MAP_MASTERY_CHALLENGES },
  { name: "Biotic Mastery", values: BIOTIC_MASTERY_CHALLENGES },
  { name: "Tech Mastery", values: TECH_MASTERY_CHALLENGES },
]


///////////// ALIENS
export const RESURGENCE_MASTERY_CHALLENGES: Challenge[] = [
  { index_current_points: 112, name: "Resurgence Mastery", image: "RsrgMstr.png", challenge_points: 170, description: "Complete 9 of the Resurgence Mastery Challenges", times_completed_index: 1, max_points: 9 },
  { index_current_points: 205, name: "Geth Plasma SMG Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 200000 Points Using the Geth Plasma SMG", times_completed_index: 1, max_points: 200000 },
  { index_current_points: 206, name: "Striker Assault Rifle Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 200000 Points Using the Striker Assault Rifle", times_completed_index: 1, max_points: 200000 },
  { index_current_points: 215, name: "Kishock Harpoon Gun Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 200000 Points Using the Kishock Harpoon Gun", times_completed_index: 1, max_points: 200000 },
  { index_current_points: 207, name: "Firebase Hydra Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 15 times from Firebase Hydra", times_completed_index: 1, max_points: 15 },
  { index_current_points: 208, name: "Firebase Condor Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 15 times from Firebase Condor", times_completed_index: 1, max_points: 15 },
  { index_current_points: 209, name: "Geth Infiltrator Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 10 times using Geth Infiltrator", times_completed_index: 1, max_points: 10 },
  { index_current_points: 210, name: "Geth Engineer Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 10 times using Geth Engineer", times_completed_index: 1, max_points: 10 },
  { index_current_points: 211, name: "Asari Justicar Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 10 times using Asari Justicar", times_completed_index: 1, max_points: 10 },
  { index_current_points: 212, name: "Krogan Vanguard Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 10 times using Krogan Vanguard", times_completed_index: 1, max_points: 10 },
  { index_current_points: 213, name: "Batarian Sentinel Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 10 times using Batarian Sentinel", times_completed_index: 1, max_points: 10 },
  { index_current_points: 214, name: "Batarian Soldier Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 10 times using Batarian Soldier", times_completed_index: 1, max_points: 10 },
];

export const REBELLION_MASTERY_CHALLENGES: Challenge[] = [
  { index_current_points: 113, name: "Rebellion Mastery", image: "ReblMstr.png", challenge_points: 170, description: "Complete 9 of the Rebellion Mastery Challenges", times_completed_index: 1, max_points: 9 },
  { index_current_points: 216, name: "Reegar Carbine Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 200000 Points Using the Reegar Carbine", times_completed_index: 1, max_points: 200000 },
  { index_current_points: 217, name: "Krysae Sniper Rifle Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 200000 Points Using the Krysae Sniper Rifle", times_completed_index: 1, max_points: 200000 },
  { index_current_points: 218, name: "Cerberus Harrier Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 200000 Points Using the Cerberus Harrier", times_completed_index: 1, max_points: 200000 },
  { index_current_points: 219, name: "Firebase Jade Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 15 times from Firebase Jade", times_completed_index: 1, max_points: 15 },
  { index_current_points: 220, name: "Firebase Goddess Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 15 times from Firebase Goddess", times_completed_index: 1, max_points: 15 },
  { index_current_points: 221, name: "Vorcha Soldier Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 10 times using Vorcha Soldier", times_completed_index: 1, max_points: 10 },
  { index_current_points: 222, name: "Vorcha Sentinel Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 10 times using Vorcha Sentinel", times_completed_index: 1, max_points: 10 },
  { index_current_points: 223, name: "Quarian Engineer Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 10 times using Quarian Engineer", times_completed_index: 1, max_points: 10 },
  { index_current_points: 224, name: "Quarian Infiltrator Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 10 times using Quarian Infiltrator", times_completed_index: 1, max_points: 10 },
  { index_current_points: 225, name: "Phoenix Adept Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 10 times using Phoenix Adept", times_completed_index: 1, max_points: 10 },
  { index_current_points: 226, name: "Phoenix Vanguard Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 10 times using Phoenix Vanguard", times_completed_index: 1, max_points: 10 },
];

export const EARTH_MASTERY_CHALLENGES: Challenge[] = [
  { index_current_points: 114, name: "Earth Mastery", image: "EarthMstr.png", challenge_points: 170, description: "Complete 9 of the Earth Mastery Challenges", times_completed_index: 1, max_points: 9 },
  { index_current_points: 228, name: "N7 Typhoon Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 200000 Points Using the N7 Typhoon", times_completed_index: 1, max_points: 200000 },
  { index_current_points: 229, name: "Acolyte Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 200000 Points Using the Acolyte", times_completed_index: 1, max_points: 200000 },
  { index_current_points: 230, name: "N7 Piranha Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 200000 Points Using the N7 Piranha", times_completed_index: 1, max_points: 200000 },
  { index_current_points: 231, name: "Firebase London Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 15 times from Firebase London", times_completed_index: 1, max_points: 15 },
  { index_current_points: 232, name: "Firebase Vancouver Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 15 times from Firebase Vancouver", times_completed_index: 1, max_points: 15 },
  { index_current_points: 233, name: "Firebase Rio Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 15 times from Firebase Rio", times_completed_index: 1, max_points: 15 },
  { index_current_points: 234, name: "N7 Slayer Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 10 times using N7 Slayer", times_completed_index: 1, max_points: 10 },
  { index_current_points: 235, name: "N7 Fury Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 10 times using N7 Fury", times_completed_index: 1, max_points: 10 },
  { index_current_points: 236, name: "N7 Paladin Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 10 times using N7 Paladin", times_completed_index: 1, max_points: 10 },
  { index_current_points: 237, name: "N7 Destroyer Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 10 times using N7 Destroyer", times_completed_index: 1, max_points: 10 },
  { index_current_points: 238, name: "N7 Demolisher Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 10 times using N7 Demolisher", times_completed_index: 1, max_points: 10 },
  { index_current_points: 239, name: "N7 Shadow Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 10 times using N7 Shadow", times_completed_index: 1, max_points: 10 },
];

export const RETALIATION_MASTERY_CHALLENGES: Challenge[] = [
  { index_current_points: 115, name: "Retaliation Mastery", image: "InvsnMstr.png", challenge_points: 170, description: "Complete 6 of the Earth Mastery Challenges", times_completed_index: 1, max_points: 6 },
  { index_current_points: 241, name: "Collector Sniper Rifle Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Collector Sniper Rifle", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 242, name: "Collector SMG Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Collector SMG", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 243, name: "Collector Assault Rifle Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 200000 Points Using the Collector Assault Rifle", times_completed_index: 1, max_points: 200000 },
  { index_current_points: 246, name: "Hazard Extractions", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Extract 50 times from Hazard maps", times_completed_index: 1, max_points: 50 },
  { index_current_points: 247, name: "Volus Adept Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 10 times using Volus Adept", times_completed_index: 1, max_points: 10 },
  { index_current_points: 248, name: "Volus Engineer Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 10 times using Volus Engineer", times_completed_index: 1, max_points: 10 },
  { index_current_points: 249, name: "Turian Infiltrator Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 10 times using Turian Infiltrator", times_completed_index: 1, max_points: 10 },
  { index_current_points: 250, name: "Turian Havoc Soldier Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 10 times using Turian Havoc Soldier", times_completed_index: 1, max_points: 10 },
];

export const BLOODPACK_MASTERY_CHALLENGES: Challenge[] = [
  { index_current_points: 121, name: "Bloodpack Mastery", image: "BloodPak.png", challenge_points: 170, description: "Complete 6 of the Bloodpack Mastery Challenges", times_completed_index: 1, max_points: 6 },
  { index_current_points: 288, name: "Graal Spike Thrower Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 200000 Points Using the Graal Spike Thrower", times_completed_index: 1, max_points: 200000 },
  { index_current_points: 290, name: "Krogan Sentinel Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Krogan Sentinel", times_completed_index: 1, max_points: 200 },
  { index_current_points: 291, name: "Krogan Soldier Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Krogan Soldier", times_completed_index: 1, max_points: 200 },
  { index_current_points: 292, name: "Krogan Vanguard Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Krogan Vanguard", times_completed_index: 1, max_points: 200 },
  { index_current_points: 293, name: "Vorcha Sentinel Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Vorcha Sentinel", times_completed_index: 1, max_points: 200 },
  { index_current_points: 294, name: "Vorcha Soldier Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Krogan Sentinel", times_completed_index: 1, max_points: 200 },
  { index_current_points: 295, name: "Batarian Soldier Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Batarian Soldier", times_completed_index: 1, max_points: 200 },
  { index_current_points: 296, name: "Batarian Sentinel Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Batarian Sentinel", times_completed_index: 1, max_points: 200 },
  { index_current_points: 435, name: "Krogan Adept Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Krogan Adept", times_completed_index: 1, max_points: 200 },
  { index_current_points: 436, name: "Batarian Adept Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Batarian Adept", times_completed_index: 1, max_points: 200 },
  { index_current_points: 423, name: "Vorcha Hunter Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Vorcha Hunter", times_completed_index: 1, max_points: 200 },
  { index_current_points: 424, name: "Batarian Vanguard Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Batarian Vanguard", times_completed_index: 1, max_points: 200 },
  { index_current_points: 687, name: "Krogan Warlord Sentinel Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Krogan Warlord Sentinel", times_completed_index: 1, max_points: 200 },
  { index_current_points: 297, name: "Ballastic Blade Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 points using the Ballastic Blade", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 298, name: "Submission Net Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 80000 points using the Submission Net", times_completed_index: 1, max_points: 80000 },
  { index_current_points: 299, name: "Carnage Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 points using the Carnage", times_completed_index: 1, max_points: 50000 },
];

export const COMMANDO_MASTERY_CHALLENGES: Challenge[] = [
  { index_current_points: 122, name: "Commando Mastery", image: "CmdoMstr.png", challenge_points: 200, description: "Complete 12 of the Commando Mastery Challenges", times_completed_index: 1, max_points: 12 },
  { index_current_points: 438, name: "Disciple Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 200000 Points Using the Disciple", times_completed_index: 1, max_points: 200000 },
  { index_current_points: 439, name: "Phaeston Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 200000 Points Using the Phaeston", times_completed_index: 1, max_points: 200000 },
  { index_current_points: 440, name: "Scorpion Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 200000 Points Using the Scorpion", times_completed_index: 1, max_points: 200000 },
  { index_current_points: 301, name: "Turian Soldier Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Turian Soldier", times_completed_index: 1, max_points: 200 },
  { index_current_points: 302, name: "Turian Sentinel Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Turian Sentinel", times_completed_index: 1, max_points: 200 },
  { index_current_points: 303, name: "Asari Justicar Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Asari Justicar", times_completed_index: 1, max_points: 200 },
  { index_current_points: 304, name: "Asari Adept Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Asari Adept", times_completed_index: 1, max_points: 200 },
  { index_current_points: 305, name: "Asari Vanguard Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Asari Vanguard", times_completed_index: 1, max_points: 200 },
  { index_current_points: 308, name: "Salarian Engineer Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Salarian Engineer", times_completed_index: 1, max_points: 200 },
  { index_current_points: 309, name: "Salarian Infiltrator Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Salarian Infiltrator", times_completed_index: 1, max_points: 200 },
  { index_current_points: 425, name: "Turian Havoc Soldier Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Turian Havoc", times_completed_index: 1, max_points: 200 },
  { index_current_points: 426, name: "Turian Engineer Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Turian Saboteur", times_completed_index: 1, max_points: 200 },
  { index_current_points: 428, name: "Turian  Infiltrator Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Turian Infiltrator", times_completed_index: 1, max_points: 200 },
  { index_current_points: 427, name: "Asari Sentinel Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Asari Sentinel", times_completed_index: 1, max_points: 200 },
  { index_current_points: 429, name: "Asari Infiltrator Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Asari Infiltrator", times_completed_index: 1, max_points: 200 },
  { index_current_points: 688, name: "Cabal Vanguard Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Cabal Vanguard", times_completed_index: 1, max_points: 200 },
  { index_current_points: 310, name: "Squad Revives as Council Race", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Revive 50 teammates as an alien Council race", times_completed_index: 1, max_points: 50 },
  { index_current_points: 311, name: "Turian Proximity Mine Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 points using the Turian Proximity Mine", times_completed_index: 1, max_points: 50000 },
];

export const MACHINE_MASTERY_CHALLENGES: Challenge[] = [
  { index_current_points: 123, name: "Machine Mastery", image: "MachMstr.png", challenge_points: 170, description: "Complete 8 of the Commando Mastery Challenges", times_completed_index: 1, max_points: 8 },
  { index_current_points: 312, name: "Geth Pulse Rifle Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 200000 Points Using the Geth Pulse Rifle", times_completed_index: 1, max_points: 200000 },
  { index_current_points: 313, name: "Javelin Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 200000 Points Using the Javelin", times_completed_index: 1, max_points: 200000 },
  { index_current_points: 314, name: "Arc Pistol Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 200000 Points Using the Arc Pistol", times_completed_index: 1, max_points: 200000 },
  { index_current_points: 322, name: "Geth Proximity Mine Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 50000 Points Using the Geth Proximity Mine", times_completed_index: 1, max_points: 50000 },
  { index_current_points: 317, name: "Female Quarian Infiltrator Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Female Quarian Infiltrator", times_completed_index: 1, max_points: 200 },
  { index_current_points: 320, name: "Female Quarian Engineer Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Female Quarian Engineer", times_completed_index: 1, max_points: 200 },
  { index_current_points: 318, name: "Male Quarian Engineer Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Male Quarian Engineer", times_completed_index: 1, max_points: 200 },
  { index_current_points: 319, name: "Male Quarian Infiltrator Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Male Quarian Infiltrator", times_completed_index: 1, max_points: 200 },
  { index_current_points: 431, name: "Male Quarian Soldier Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Quarian Soldier", times_completed_index: 1, max_points: 200 },
  { index_current_points: 316, name: "Geth Engineer Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Geth Engineer", times_completed_index: 1, max_points: 200 },
  { index_current_points: 430, name: "Geth Trooper Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Geth Trooper", times_completed_index: 1, max_points: 200 },
  { index_current_points: 437, name: "Geth Infiltrator Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Geth Infiltrator", times_completed_index: 1, max_points: 200 },
  { index_current_points: 689, name: "Geth Juggernaut Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Geth Juggernaut", times_completed_index: 1, max_points: 200 },
];

export const OUTSIDER_MASTERY_CHALLENGES: Challenge[] = [
  { index_current_points: 124, name: "Outsider Mastery", image: "Outsider.png", challenge_points: 170, description: "Complete 7 of the Outsider Mastery Challenges", times_completed_index: 1, max_points: 7 },
  { index_current_points: 441, name: "Raptor Sniper Rifle Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 200000 Points Using the Raptor Sniper Rifle", times_completed_index: 1, max_points: 200000 },
  { index_current_points: 442, name: "Talon Pistol Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 200000 Points Using the Talon Pistol", times_completed_index: 1, max_points: 200000 },
  { index_current_points: 323, name: "Hornet SMG Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 200000 Points Using the Hornet SMG", times_completed_index: 1, max_points: 200000 },
  { index_current_points: 324, name: "Drell Vanguard Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Drell Vanguard", times_completed_index: 1, max_points: 200 },
  { index_current_points: 325, name: "Drell Adept Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Drell Adept", times_completed_index: 1, max_points: 200 },
  { index_current_points: 433, name: "Drell Infiltrator Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Drell Infiltrator", times_completed_index: 1, max_points: 200 },
  { index_current_points: 326, name: "Phoenix Adept Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Phoenix Adept", times_completed_index: 1, max_points: 200 },
  { index_current_points: 327, name: "Phoenix Vanguard Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Phoenix Vanguard", times_completed_index: 1, max_points: 200 },
  { index_current_points: 328, name: "Volus Engineer Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Volus Engineer", times_completed_index: 1, max_points: 200 },
  { index_current_points: 329, name: "Volus Adept Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Volus Adept", times_completed_index: 1, max_points: 200 },
  { index_current_points: 432, name: "Volus Sentinel Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Volus Sentinel", times_completed_index: 1, max_points: 200 },
  { index_current_points: 434, name: "Volus Vanguard Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Volus Vanguard", times_completed_index: 1, max_points: 200 },
  { index_current_points: 686, name: "Collector Adept Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Collector Adept", times_completed_index: 1, max_points: 200 },
  { index_current_points: 690, name: "Talon Engineer Waves", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Complete 200 waves as a Talon Engineer", times_completed_index: 1, max_points: 200 },
];

export const RECKONING_MASTERY_CHALLENGES: Challenge[] = [
  { index_current_points: 692, name: "Reckoning Mastery", image: "MstrReckoning.png", challenge_points: 200, description: "Complete 10 of the Reckoning Mastery Challenges", times_completed_index: 1, max_points: 10 },
  { index_current_points: 693, name: "Collector Adept Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 10 times using the Collector Adept", times_completed_index: 1, max_points: 10 },
  { index_current_points: 694, name: "Krogan Warlord Sentinel Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 10 times using the Krogan Warlord Sentinel", times_completed_index: 1, max_points: 10 },
  { index_current_points: 695, name: "Cabal Vanguard Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 10 times using the Cabal Vanguard", times_completed_index: 1, max_points: 10 },
  { index_current_points: 696, name: "Geth Juggernaut Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 10 times using the Geth Juggernaut", times_completed_index: 1, max_points: 10 },
  { index_current_points: 697, name: "Talon Engineer Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 10 times using the Talon Engineer", times_completed_index: 1, max_points: 10 },
  { index_current_points: 698, name: "EDI Extractions", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Extract 10 times using the EDI", times_completed_index: 1, max_points: 10 },
  { index_current_points: 699, name: "Lancer Assault Rifle Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 200000 Points Using the Lancer Assault Rifle", times_completed_index: 1, max_points: 200000 },
  { index_current_points: 700, name: "Punisher SMG Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 200000 Points Using the Punisher SMG", times_completed_index: 1, max_points: 200000 },
  { index_current_points: 701, name: "Venom Shotgun Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 200000 Points Using the Venom Shotgun", times_completed_index: 1, max_points: 200000 },
  { index_current_points: 702, name: "Geth Spitfire Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 200000 Points Using the Geth Spitfire", times_completed_index: 1, max_points: 200000 },
  { index_current_points: 703, name: "Adas Assault Rifle Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 200000 Points Using the Adas Assault Rifle", times_completed_index: 1, max_points: 200000 },
  { index_current_points: 704, name: "Executioner Pistol Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 200000 Points Using the Executioner Pistol", times_completed_index: 1, max_points: 200000 },
  { index_current_points: 705, name: "Suppressor Pistol Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 200000 Points Using the Suppressor Pistol", times_completed_index: 1, max_points: 200000 },
];

export const CHALLENGE_TYPES_ALIENS: Category<Challenge>[] = [
  { name: "Resurgence Mastery", values: RESURGENCE_MASTERY_CHALLENGES },
  { name: "Rebellion Mastery", values: REBELLION_MASTERY_CHALLENGES },
  { name: "Earth Mastery", values: EARTH_MASTERY_CHALLENGES },
  { name: "Retaliation Mastery", values: RETALIATION_MASTERY_CHALLENGES },
  { name: "Bloodpack Mastery", values: BLOODPACK_MASTERY_CHALLENGES },
  { name: "Commando Mastery", values: COMMANDO_MASTERY_CHALLENGES },
  { name: "Machine Mastery", values: MACHINE_MASTERY_CHALLENGES },
  { name: "Outsider Mastery", values: OUTSIDER_MASTERY_CHALLENGES },
  { name: "Reckoning Mastery", values: RECKONING_MASTERY_CHALLENGES },
]


///////////// WEAPONS
export const SHOTGUN_MASTERY_CHALLENGES: Challenge[] = [
  { index_current_points: 107, name: "Shotgun Mastery", image: "ShtgMstr.png", challenge_points: 175, description: "Complete 9 of the Shotgun Mastery Challenges", times_completed_index: 1, max_points: 9 },
  { index_current_points: 145, name: "Katana Shotgun Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Katana", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 146, name: "Scimitar Shotgun Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Scimitar", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 147, name: "Eviscerator Shotgun Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Eviscerator", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 148, name: "Graal Spike Thrower Shotgun Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Graal Spike Thrower", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 149, name: "Claymore Shotgun Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Claymore", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 150, name: "Disciple Shotgun Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Disciple", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 151, name: "Geth Plasma Shotgun Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Geth Plasma Shotgun", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 152, name: "Wraith Shotgun Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Wraith", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 153, name: "N7 Crusader Shotgun Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the N7 Crusader", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 154, name: "Reegar Carbine Shotgun Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Reegar Carbine", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 155, name: "N7 Piranha Shotgun Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the N7 Piranha", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 156, name: "Shotgun Medals", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 100 Shotgun Medals", times_completed_index: 1, max_points: 100 },
  { index_current_points: 614, name: "AT-12 Raider Shotgun Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the AT-12 Raider", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 718, name: "Venom Shotgun Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Venom", times_completed_index: 1, max_points: 140000 },
]
export const ASSAULTRIFLE_MASTERY_CHALLENGES: Challenge[] = [
  { index_current_points: 108, name: "Assault Rifle Mastery", image: "AsltMstr.png", challenge_points: 175, description: "Complete 9 of the Assault Rifle Mastery Challenges", times_completed_index: 1, max_points: 9 },
  { index_current_points: 158, name: "Avenger AR Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Avenger", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 159, name: "Phaeston AR Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Phaeston", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 160, name: "Vindicator AR Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Vindicator", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 161, name: "Mattock AR Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Mattock", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 162, name: "Falcon AR Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Falcon", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 163, name: "Revenant AR Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Revenant", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 164, name: "Geth Pulse AR Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Geth Pulse AR", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 165, name: "Saber AR Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Saber", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 166, name: "Striker AR Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Striker", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 167, name: "Collector AR Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Collector AR", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 168, name: "Harrier AR Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Harrier", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 169, name: "N7 Typhoon AR Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the N7 Typhoon", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 443, name: "Particle AR Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 200000 Points Using the Particle AR", times_completed_index: 1, max_points: 200000 },
  { index_current_points: 613, name: "Argus AR Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Argus", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 615, name: "N7 Valkyrie AR AR Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the N7 Valkyrie", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 715, name: "Geth Spitfire AR Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 140000 Points Using the Geth Spitfire", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 716, name: "Adas AR Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 140000 Points Using the Adas AR", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 731, name: "Lancer AR Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 140000 Points Using the Lancer", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 170, name: "Assault Rifle Medals", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 100 Assault Rifle Medals", times_completed_index: 1, max_points: 100 },
];

export const SNIPERRIFLE_MASTERY_CHALLENGES: Challenge[] = [
  { index_current_points: 111, name: "Sniper Rifle Mastery", image: "SnpMstr.png", challenge_points: 175, description: "Complete 9 of the Sniper Rifle Mastery Challenges", times_completed_index: 1, max_points: 9 },
  { index_current_points: 172, name: "Mantis Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Mantis", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 173, name: "Viper Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Viper", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 174, name: "Raptor Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Raptor", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 175, name: "Incisor Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Incisor", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 176, name: "M-98 Widow Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the M-98 Widow", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 177, name: "Javelin Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Javelin", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 178, name: "Black Widow Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Black Widow", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 165, name: "Kishock Harpoon Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Kishock Harpoon", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 180, name: "Krysae Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Krysae", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 181, name: "Indra Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Indra", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 182, name: "N7 Valiant Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the N7 Valiant", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 612, name: "Collector SR Use", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 200000 Points Using the Collector SR", times_completed_index: 1, max_points: 200000 },
  { index_current_points: 183, name: "Sniper Rifle Medals", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 100 Sniper Rifle Medals", times_completed_index: 1, max_points: 100 },
];

export const SMG_MASTERY_CHALLENGES: Challenge[] = [
  { index_current_points: 110, name: "SMG Mastery", image: "SmgMstr.png", challenge_points: 100, description: "Complete 5 of the SMG Mastery Challenges", times_completed_index: 1, max_points: 5 },
  { index_current_points: 185, name: "Shuriken Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Shuriken", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 186, name: "Tempest Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Tempest", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 187, name: "Locust Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Locust", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 188, name: "Hornet Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Hornet", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 189, name: "Geth Plasma SMG Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Geth Plasma SMG", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 190, name: "N7 Hurricane Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the N7 Hurricane", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 616, name: "Collector SMG Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Collector SMG", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 191, name: "SMG Medals", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 100 SMG Medals", times_completed_index: 1, max_points: 100 },
];

export const PISTOL_MASTERY_CHALLENGES: Challenge[] = [
  { index_current_points: 109, name: "Pistol Mastery", image: "PstlMstr.png", challenge_points: 155, description: "Complete 8 of the Pistol Mastery Challenges", times_completed_index: 1, max_points: 8 },
  { index_current_points: 193, name: "Predator Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Predator", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 194, name: "Phalanx Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Phalanx", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 195, name: "Arc Pistol Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Arc Pistol", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 196, name: "Carnifex Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Carnifex", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 197, name: "Scorpion Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Scorpion", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 198, name: "Talon Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Talon", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 199, name: "Paladin Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Paladin", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 200, name: "N7 Eagle Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the N7 Eagle", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 201, name: "Acolyte Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Acolyte", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 719, name: "Executioner Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Executioner", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 732, name: "Suppressor Use", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 140000 Points Using the Suppressor", times_completed_index: 1, max_points: 140000 },
  { index_current_points: 202, name: "Pistol Medals", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 100 Pistol Medals", times_completed_index: 1, max_points: 100 },
];

export const COMBAT_MASTERY_CHALLENGES: Challenge[] = [
  { index_current_points: 116, name: "Combat Mastery", image: "CmbtMstr.png", challenge_points: 255, description: "Complete 12 of the Combat Mastery Challenges", times_completed_index: 1, max_points: 12 },
  { index_current_points: 252, name: "Melee Damage Use 1", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 250000 points with Melee Attacks", times_completed_index: 1, max_points: 250000 },
  { index_current_points: 252, name: "Melee Damage Use 2", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 500000 points with Melee Attacks", times_completed_index: 1, max_points: 500000 },
  { index_current_points: 252, name: "Melee Damage Use 3", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Earn 1000000 points with Melee Attacks", times_completed_index: 1, max_points: 1000000 },
  { index_current_points: 253, name: "Over-cover Grab 1", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Grab 50 Enemies while in cover", times_completed_index: 1, max_points: 50 },
  { index_current_points: 253, name: "Over-cover Grab 2", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Grab 100 Enemies while in cover", times_completed_index: 1, max_points: 100 },
  { index_current_points: 253, name: "Over-cover Grab 3", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Grab 250 Enemies while in cover", times_completed_index: 1, max_points: 250 },
  { index_current_points: 254, name: "Headshots 1", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Kill 250 Enemies with headshots", times_completed_index: 1, max_points: 250 },
  { index_current_points: 254, name: "Headshots 2", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Kill 500 Enemies with headshots", times_completed_index: 1, max_points: 500 },
  { index_current_points: 254, name: "Headshots 3", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Kill 1000 Enemies with headshots", times_completed_index: 1, max_points: 1000 },
  { index_current_points: 255, name: "Grenade Damage Use 1", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 100000 points with Melee Attacks", times_completed_index: 1, max_points: 100000 },
  { index_current_points: 255, name: "Grenade Damage Use 2", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 200000 points with Melee Attacks", times_completed_index: 1, max_points: 200000 },
  { index_current_points: 255, name: "Grenade Damage Use 3", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Earn 300000 points with Melee Attacks", times_completed_index: 1, max_points: 300000 },
];

export const CERBERUS_MASTERY_CHALLENGES: Challenge[] = [
  { index_current_points: 117, name: "Cerberus Mastery", image: "CrbrsMstr.png", challenge_points: 250, description: "Complete 21 of the Cerberus Mastery Challenges", times_completed_index: 1, max_points: 21 },
  { index_current_points: 258, name: "Cerberus Trooper 1", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 150000 points by killing Cerberus Troopers", times_completed_index: 1, max_points: 150000 },
  { index_current_points: 258, name: "Cerberus Trooper 2", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 300000 points by killing Cerberus Troopers", times_completed_index: 1, max_points: 300000 },
  { index_current_points: 258, name: "Cerberus Trooper 3", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Earn 450000 points by killing Cerberus Troopers", times_completed_index: 1, max_points: 450000 },
  { index_current_points: 259, name: "Centurion 1", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 150000 points by killing Centurions", times_completed_index: 1, max_points: 150000 },
  { index_current_points: 259, name: "Centurion 2", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 300000 points by killing Centurions", times_completed_index: 1, max_points: 300000 },
  { index_current_points: 259, name: "Centurion 3", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Earn 450000 points by killing Centurions", times_completed_index: 1, max_points: 450000 },
  { index_current_points: 260, name: "Nemesis 1", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 150000 points by killing Nemesises", times_completed_index: 1, max_points: 150000 },
  { index_current_points: 260, name: "Nemesis 2", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 300000 points by killing Nemesises", times_completed_index: 1, max_points: 300000 },
  { index_current_points: 260, name: "Nemesis 3", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Earn 450000 points by killing Nemesises", times_completed_index: 1, max_points: 450000 },
  { index_current_points: 261, name: "Guardian 1", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 150000 points by killing Guardians", times_completed_index: 1, max_points: 150000 },
  { index_current_points: 261, name: "Guardian 2", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 300000 points by killing Guardians", times_completed_index: 1, max_points: 300000 },
  { index_current_points: 261, name: "Guardian 3", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Earn 450000 points by killing Guardians", times_completed_index: 1, max_points: 450000 },
  { index_current_points: 262, name: "Atlas 1", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 150000 points by killing Atlases", times_completed_index: 1, max_points: 150000 },
  { index_current_points: 262, name: "Atlas 2", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 300000 points by killing Atlases", times_completed_index: 1, max_points: 300000 },
  { index_current_points: 262, name: "Atlas 3", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Earn 450000 points by killing Atlases", times_completed_index: 1, max_points: 450000 },
  { index_current_points: 263, name: "Phantom 1", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 150000 points by killing Phantoms", times_completed_index: 1, max_points: 150000 },
  { index_current_points: 263, name: "Phantom 2", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 300000 points by killing Phantoms", times_completed_index: 1, max_points: 300000 },
  { index_current_points: 263, name: "Phantom 3", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Earn 450000 points by killing Phantoms", times_completed_index: 1, max_points: 450000 },
  { index_current_points: 264, name: "Dragoon 1", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 150000 points by killing Dragoons", times_completed_index: 1, max_points: 150000 },
  { index_current_points: 264, name: "Dragoon 2", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 300000 points by killing Dragoons", times_completed_index: 1, max_points: 300000 },
  { index_current_points: 264, name: "Dragoon 3", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Earn 450000 points by killing Dragoons", times_completed_index: 1, max_points: 450000 },
];

export const REAPERS_MASTERY_CHALLENGES: Challenge[] = [
  { index_current_points: 118, name: "Reapers Mastery", image: "ReapMstr.png", challenge_points: 250, description: "Complete 18 of the Reapers Mastery Challenges", times_completed_index: 1, max_points: 18 },
  { index_current_points: 266, name: "Cannibal 1", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 150000 points by killing Cannibals", times_completed_index: 1, max_points: 150000 },
  { index_current_points: 266, name: "Cannibal 2", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 300000 points by killing Cannibals", times_completed_index: 1, max_points: 300000 },
  { index_current_points: 266, name: "Cannibal 3", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Earn 450000 points by killing Cannibals", times_completed_index: 1, max_points: 450000 },
  { index_current_points: 267, name: "Marauder 1", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 150000 points by killing Marauders", times_completed_index: 1, max_points: 150000 },
  { index_current_points: 267, name: "Marauder 2", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 300000 points by killing Marauders", times_completed_index: 1, max_points: 300000 },
  { index_current_points: 267, name: "Marauder 3", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Earn 450000 points by killing Marauders", times_completed_index: 1, max_points: 450000 },
  { index_current_points: 268, name: "Husk 1", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 150000 points by killing Husks", times_completed_index: 1, max_points: 150000 },
  { index_current_points: 268, name: "Husk 2", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 300000 points by killing Husks", times_completed_index: 1, max_points: 300000 },
  { index_current_points: 268, name: "Husk 3", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Earn 450000 points by killing Husks", times_completed_index: 1, max_points: 450000 },
  { index_current_points: 269, name: "Brute 1", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 150000 points by killing Brutes", times_completed_index: 1, max_points: 150000 },
  { index_current_points: 269, name: "Brute 2", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 300000 points by killing Brutes", times_completed_index: 1, max_points: 300000 },
  { index_current_points: 269, name: "Brute 3", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Earn 450000 points by killing Brutes", times_completed_index: 1, max_points: 450000 },
  { index_current_points: 270, name: "Ravager 1", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 150000 points by killing Ravagers", times_completed_index: 1, max_points: 150000 },
  { index_current_points: 270, name: "Ravager 2", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 300000 points by killing Ravagers", times_completed_index: 1, max_points: 300000 },
  { index_current_points: 270, name: "Ravager 3", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Earn 450000 points by killing Ravagers", times_completed_index: 1, max_points: 450000 },
  { index_current_points: 271, name: "Banshee 1", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 150000 points by killing Banshees", times_completed_index: 1, max_points: 150000 },
  { index_current_points: 271, name: "Banshee 2", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 300000 points by killing Banshees", times_completed_index: 1, max_points: 300000 },
  { index_current_points: 271, name: "Banshee 3", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Earn 450000 points by killing Banshees", times_completed_index: 1, max_points: 450000 },
];

export const GETH_MASTERY_CHALLENGES: Challenge[] = [
  { index_current_points: 119, name: "Geth Mastery", image: "GethMstr.png", challenge_points: 250, description: "Complete 18 of the Geth Mastery Challenges", times_completed_index: 1, max_points: 18 },
  { index_current_points: 273, name: "Geth Trooper 1", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 150000 points by killing Geth Troopers", times_completed_index: 1, max_points: 150000 },
  { index_current_points: 273, name: "Geth Trooper 2", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 300000 points by killing Geth Troopers", times_completed_index: 1, max_points: 300000 },
  { index_current_points: 273, name: "Geth Trooper 3", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Earn 450000 points by killing Geth Troopers", times_completed_index: 1, max_points: 450000 },
  { index_current_points: 274, name: "Pyro 1", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 150000 points by killing Pyros", times_completed_index: 1, max_points: 150000 },
  { index_current_points: 274, name: "Pyro 2", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 300000 points by killing Pyros", times_completed_index: 1, max_points: 300000 },
  { index_current_points: 274, name: "Pyro 3", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Earn 450000 points by killing Pyros", times_completed_index: 1, max_points: 450000 },
  { index_current_points: 275, name: "Rocket Trooper 1", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 150000 points by killing Rocket Troopers", times_completed_index: 1, max_points: 150000 },
  { index_current_points: 275, name: "Rocket Trooper 2", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 300000 points by killing Rocket Troopers", times_completed_index: 1, max_points: 300000 },
  { index_current_points: 275, name: "Rocket Trooper 3", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Earn 450000 points by killing Rocket Troopers", times_completed_index: 1, max_points: 450000 },
  { index_current_points: 276, name: "Hunter 1", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 150000 points by killing Hunters", times_completed_index: 1, max_points: 150000 },
  { index_current_points: 276, name: "Hunter 2", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 300000 points by killing Hunters", times_completed_index: 1, max_points: 300000 },
  { index_current_points: 276, name: "Hunter 3", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Earn 450000 points by killing Hunters", times_completed_index: 1, max_points: 450000 },
  { index_current_points: 277, name: "Prime 1", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 150000 points by killing Primes", times_completed_index: 1, max_points: 150000 },
  { index_current_points: 277, name: "Prime 2", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 300000 points by killing Primes", times_completed_index: 1, max_points: 300000 },
  { index_current_points: 277, name: "Prime 3", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Earn 450000 points by killing Primes", times_completed_index: 1, max_points: 450000 },
  { index_current_points: 278, name: "Bomber 1", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 150000 points by killing Bombers", times_completed_index: 1, max_points: 150000 },
  { index_current_points: 278, name: "Bomber 2", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 300000 points by killing Bombers", times_completed_index: 1, max_points: 300000 },
  { index_current_points: 278, name: "Bomber 3", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Earn 450000 points by killing Bombers", times_completed_index: 1, max_points: 450000 },
];

export const COLLECTORS_MASTERY_CHALLENGES: Challenge[] = [
  { index_current_points: 120, name: "Collectors Mastery", image: "CollctrMstr.png", challenge_points: 250, description: "Complete 15 of the Geth Mastery Challenges", times_completed_index: 1, max_points: 15 },
  { index_current_points: 280, name: "Collector Trooper 1", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 150000 points by killing Collector Troopers", times_completed_index: 1, max_points: 150000 },
  { index_current_points: 280, name: "Collector Trooper 2", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 300000 points by killing Collector Troopers", times_completed_index: 1, max_points: 300000 },
  { index_current_points: 280, name: "Collector Trooper 3", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Earn 450000 points by killing Collector Troopers", times_completed_index: 1, max_points: 450000 },
  { index_current_points: 281, name: "Collector Captain 1", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 150000 points by killing Collector Captains", times_completed_index: 1, max_points: 150000 },
  { index_current_points: 281, name: "Collector Captain 2", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 300000 points by killing Collector Captains", times_completed_index: 1, max_points: 300000 },
  { index_current_points: 281, name: "Collector Captain 3", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Earn 450000 points by killing Collector Captains", times_completed_index: 1, max_points: 450000 },
  { index_current_points: 282, name: "Abomination 1", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 150000 points by killing Rocket Abominations", times_completed_index: 1, max_points: 150000 },
  { index_current_points: 282, name: "Abomination 2", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 300000 points by killing Rocket Abominations", times_completed_index: 1, max_points: 300000 },
  { index_current_points: 282, name: "Abomination 3", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Earn 450000 points by killing Rocket Abominations", times_completed_index: 1, max_points: 450000 },
  { index_current_points: 283, name: "Scion 1", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 150000 points by killing Scions", times_completed_index: 1, max_points: 150000 },
  { index_current_points: 283, name: "Scion 2", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 300000 points by killing Scions", times_completed_index: 1, max_points: 300000 },
  { index_current_points: 283, name: "Scion 3", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Earn 450000 points by killing Scions", times_completed_index: 1, max_points: 450000 },
  { index_current_points: 284, name: "Praetorian 1", image: "OptTeamPrivate.webp", challenge_points: 10, description: "Earn 150000 points by killing Praetorians", times_completed_index: 1, max_points: 150000 },
  { index_current_points: 284, name: "Praetorian 2", image: "OptTeamPrivate.webp", challenge_points: 20, description: "Earn 300000 points by killing Praetorians", times_completed_index: 1, max_points: 300000 },
  { index_current_points: 284, name: "Praetorian 3", image: "OptTeamPrivate.webp", challenge_points: 30, description: "Earn 450000 points by killing Praetorians", times_completed_index: 1, max_points: 450000 },
];

export const CHALLENGE_TYPES_WEAPONS: Category<Challenge>[] = [
  { name: "Shotgun Mastery", values: SHOTGUN_MASTERY_CHALLENGES },
  { name: "Assault Rifle Mastery", values: ASSAULTRIFLE_MASTERY_CHALLENGES },
  { name: "Sniper Rifle Mastery", values: SNIPERRIFLE_MASTERY_CHALLENGES },
  { name: "SMG Mastery", values: SMG_MASTERY_CHALLENGES },
  { name: "Pistol Mastery", values: PISTOL_MASTERY_CHALLENGES },
  { name: "Combat Mastery", values: COMBAT_MASTERY_CHALLENGES },
  { name: "Cerberus Mastery", values: CERBERUS_MASTERY_CHALLENGES },
  { name: "Reapers Mastery", values: REAPERS_MASTERY_CHALLENGES },
  { name: "Geth Mastery", values: GETH_MASTERY_CHALLENGES },
  { name: "Collectors Mastery", values: COLLECTORS_MASTERY_CHALLENGES },
]



//////////////////////////////////////////////////////////// challenges end ////////////////////////////////////////////////////////////////////////////////

// Structure defining a challenge
export interface Challenge {
  // Current points progress index in the "Progress" dataset
  index_current_points: number,
  // The name of the challenge
  name: string,
  // The challenge image
  image: string,
  // The ammount of challenge points awarded upon completion
  challenge_points: number,
  // The challenge description
  description: string,
  // Number of times the challenge has been completed
  times_completed_index: number,
  // The max possible points for the challenge
  max_points: number,
}

export const ASSAULT_RIFLE_MODS: WeaponMod[] = [
  {
    level_index: 31,
    name: "Extended Barrel",
    image: "AssaultRifleDamage.webp",
  },
  {
    level_index: 32,
    name: "Precision Scope",
    image: "AssaultRifleAccuracy.webp",
  },
  { level_index: 33, name: "Stability Dampner", image: "Stability.webp" },
  { level_index: 34, name: "Magazine Upgrade", image: "MagSize.webp" },
  { level_index: 35, name: "Piercing Mod", image: "PiercingMod.webp" },
  {
    level_index: 406,
    name: "Thermal Scope",
    image: "AssaultRifleSuperScope.webp",
  },
  { level_index: 466, name: "Omni-Blade", image: "OmniBlade.webp" },
  {
    level_index: 467,
    name: "High-Velocity Barrel",
    image: "AssaultRifleSuperPen.webp",
  },
  { level_index: 653, name: "Ultralight Materials", image: "UltraLight.webp" },
];

export const SNIPER_RIFLE_MODS: WeaponMod[] = [
  { level_index: 36, name: "Extended Barrel", image: "HighCaliberBarrel.webp" },
  {
    level_index: 37,
    name: "Enhanced Scope",
    image: "SniperRifleAccuracy.webp",
  },
  {
    level_index: 38,
    name: "Spare Thermal Clip",
    image: "SpareThermalClip.webp",
  },
  { level_index: 40, name: "Piercing Mod", image: "PiercingMod.webp" },
  {
    level_index: 414,
    name: "High-Velocity Barrel",
    image: "SniperRifleDamageAndPen.webp",
  },
  {
    level_index: 415,
    name: "Thermal Scope",
    image: "SniperRifleSuperScope.webp",
  },
  { level_index: 654, name: "Ultralight Materials", image: "UltraLight.webp" },
];

export const SHOTGUN_MODS: WeaponMod[] = [
  { level_index: 41, name: "High Caliber Barrel", image: "ShotgunDamage.webp" },
  {
    level_index: 42,
    name: "Blade Attachment",
    image: "ShotgunMeleeDamage.webp",
  },
  {
    level_index: 43,
    name: "Spare Thermal Clip",
    image: "SpareThermalClip.webp",
  },
  { level_index: 44, name: "Smart Choke", image: "ShotgunAccuracy.webp" },
  { level_index: 45, name: "Shredder Mod", image: "ShotgunReloadSpeed.webp" },
  {
    level_index: 410,
    name: "High-Velocity Barrel",
    image: "ShotgunDamageAndPen.webp",
  },
  { level_index: 411, name: "Omni-Blade", image: "OmniBlade.webp" },
  { level_index: 655, name: "Ultralight Materials", image: "UltraLight.webp" },
];

export const PISTOL_MODS: WeaponMod[] = [
  {
    level_index: 46,
    name: "High Caliber Barrel",
    image: "HighCaliberBarrel.webp",
  },
  { level_index: 47, name: "Scope", image: "Scope.webp" },
  { level_index: 48, name: "Melee Stunner", image: "PistolStability.webp" },
  { level_index: 49, name: "Magazine Upgrade", image: "MagSize.webp" },
  { level_index: 50, name: "Piercing Mod", image: "PiercingMod.webp" },
  {
    level_index: 407,
    name: "Cranial Trauma System",
    image: "PistolHeadShot.webp",
  },
  { level_index: 408, name: "Heavy Barrel", image: "PistolSuperDamage.webp" },
  { level_index: 409, name: "Ultralight Materials", image: "UltraLight.webp" },
  {
    level_index: 656,
    name: "Power Magnifier",
    image: "PistolPowerDamage_MP5.webp",
  },
];

export const SUB_MACHINE_GUN_MODS: WeaponMod[] = [
  {
    level_index: 51,
    name: "High Caliber Barrel",
    image: "HighCaliberBarrel.webp",
  },
  { level_index: 52, name: "Scope", image: "Scope.webp" },
  { level_index: 53, name: "Ultralight Materials", image: "UltraLight.webp" },
  { level_index: 54, name: "Magazine Upgrade", image: "MagSize.webp" },
  { level_index: 55, name: "Heat Sink", image: "SMGConstraintDamage.webp" },
  {
    level_index: 412,
    name: "High-Velocity Barrel",
    image: "SMGPenetration.webp",
  },
  { level_index: 413, name: "Recoil System", image: "Stability.webp" },
  {
    level_index: 657,
    name: "Power Magnifier",
    image: "SMGPowerDamage_MP5.webp",
  },
];

export const WEAPON_MODS: Category<WeaponMod>[] = [
  { name: "Assault Rifle", values: ASSAULT_RIFLE_MODS },
  { name: "Sniper Rifle", values: SNIPER_RIFLE_MODS },
  { name: "Shotugn", values: SHOTGUN_MODS },
  { name: "Pistol", values: PISTOL_MODS },
  { name: "SMG", values: SUB_MACHINE_GUN_MODS },
];

export const ARMOR_CONSUMABLES: TieredConsumable[] = [
  {
    name: "Adrenaline Module",
    image: "SpeedBonus.webp",
    indexes: [126, 127, 128],
  },
  {
    name: "Cyclonic Modulator",
    image: "ShieldBonus.webp",
    indexes: [129, 130, 131, 490],
  },
  {
    name: "Power Amplifier Module",
    image: "PowerBonusDamage.webp",
    indexes: [259, 260, 261, 489],
  },
  {
    name: "Power Efficiency Module",
    image: "PowerBonus.webp",
    indexes: [105, 106, 107],
  },
  {
    name: "Shield Power Cells",
    image: "ShieldRegenBonus.webp",
    indexes: [76, 77, 78],
  },
  {
    name: "Stabilization Module",
    image: "StabilityBonus.webp",
    indexes: [73, 74, 75],
  },
];

export const WEAPON_CONSUMABLES: TieredConsumable[] = [
  {
    name: "Assault Rifle Rail Amp",
    image: "WeaponDamageBonus_AssaultRifle.webp",
    indexes: [111, 112, 113],
  },
  {
    name: "Pistol Rail Amp",
    image: "WeaponDamageBonus_Pistol.webp",
    indexes: [120, 121, 122],
  },
  {
    name: "SMG Rail Amp",
    image: "WeaponDamageBonus_SMG.webp",
    indexes: [123, 124, 125],
  },
  {
    name: "Shotgun Rail Amp",
    image: "WeaponDamageBonus_Shotgun.webp",
    indexes: [117, 118, 119],
  },
  {
    name: "Sniper Rifle Rail Amp",
    image: "WeaponDamageBonus_SniperRifle.webp",
    indexes: [114, 115, 116],
  },
  {
    name: "Strength Enhancer",
    image: "MeleeDamage.webp",
    indexes: [79, 80, 81],
  },
  {
    name: "Targeting VI",
    image: "HeadshotDamage.webp",
    indexes: [82, 83, 84],
  },
];

export const AMMO_CONSUMABLES: TieredConsumable[] = [
  {
    name: "Armor Piercing Rounds",
    image: "AmmoPower_ArmorPiercing.webp",
    indexes: [96, 97, 98, 486],
  },
  {
    name: "Cryo Rounds",
    image: "AmmoPower_Cryo.webp",
    indexes: [102, 103, 104, 488],
  },
  {
    name: "Disruptor Rounds",
    image: "AmmoPower_Disruptor.webp",
    indexes: [93, 94, 95, 485],
  },
  {
    name: "Drill Rounds",
    image: "AmmoPower_Eraser.webp",
    indexes: [518, 523, 528],
  },
  {
    name: "Explosive Rounds",
    image: "AmmoPower_Needler.webp",
    indexes: [517, 522, 527],
  },
  {
    name: "Incendiary Rounds",
    image: "AmmoPower_Incendiary.webp",
    indexes: [90, 91, 92, 484],
  },
  {
    name: "Phasic Rounds",
    image: "AmmoPower_Phasic.webp",
    indexes: [519, 524, 529],
  },
  {
    name: "Warp Rounds",
    image: "AmmoPower_Warp.webp",
    indexes: [99, 100, 101, 487],
  },
  {
    name: "Polonium Rounds",
    image: "AmmoPower_Polonium.webp",
    indexes: [515, 520, 525, 526],
    unused: true,
  },
];

export const CONSUMABLES: Category<TieredConsumable>[] = [
  { name: "Armor", values: ARMOR_CONSUMABLES },
  { name: "Weapon", values: WEAPON_CONSUMABLES },
  { name: "Ammo", values: AMMO_CONSUMABLES },
];

export const GEAR_CONSUMABLES: GearConsumable[] = [
  {
    index: 330,
    name: "Hydraulic Joints",
    text: "Improve armor joints to maximize the force and damage delivered through melee blows.",
    image: "Gear_MeleeDamage.webp",
  },
  {
    index: 331,
    name: "Vulnerability VI",
    text: "Use targeting VIs to pinpoint enemy weak points. Aim will be autocorrected to maximize damage.",
    image: "Gear_HeadshotDamage.webp",
  },
  {
    index: 332,
    name: "Mental Focuser",
    text: "Sharpen mental alertness and precision under stress to aid the performance of tech or biotic powers.",
    image: "Gear_PowerBonus_Damage.webp",
  },
  {
    index: 333,
    name: "Structural Ergonomics",
    text: "Enhance the ability of armor to bear loads, speeding up cooldown so that powers can be used more often.",
    image: "Gear_PowerBonus_Cooldown.webp",
  },
  {
    index: 334,
    name: "Shield Booster",
    text: "Amplify the power systems that generate shields to raise their effective strength.",
    image: "Gear_ShieldStrength.webp",
  },
  {
    index: 335,
    name: "Multicapacitor",
    text: "Add a backup power supply to the user's shields, decreasing the time before they can be brought back online.",
    image: "Gear_ShieldRegen.webp",
  },
  {
    index: 337,
    name: "Assault Rifle Amp",
    text: "Add power to assault rifles to increase round velocity and damage.",
    image: "Gear_WeaponDamage_AssaultRifle.webp",
  },
  {
    index: 338,
    name: "Sniper Rifle Amp",
    text: "Add power to sniper rifles to increase round velocity and damage.",
    image: "Gear_WeaponDamage_SniperRifle.webp",
  },
  {
    index: 339,
    name: "Shotgun Amp",
    text: "Add power to shotguns to increase round velocity and damage.",
    image: "Gear_WeaponDamage_Shotgun.webp",
  },
  {
    index: 340,
    name: "Pistol Amp",
    text: "Add power to pistols to increase round velocity and damage.",
    image: "Gear_WeaponDamage_Pistol.webp",
  },
  {
    index: 341,
    name: "SMG Amp",
    text: "Add power to submachine guns to increase round velocity and damage.",
    image: "Gear_WeaponDamage_SMG.webp",
  },
  {
    index: 343,
    name: "Grenade Capacity",
    text: "Add extra grenade storage compartments to the user's armor.",
    image: "Gear_GrenadeCapacity.webp",
  },
  {
    index: 344,
    name: "Warfighter Package",
    text: "Deploy this modification package to increase assault rifle power and grenade storage.",
    image: "Gear_Combo_AssaultDamageGrenadeCap.webp",
  },
  {
    index: 345,
    name: "Commando Package",
    text: "Optimize pistol and biotic amp power to increase damage.",
    image: "Gear_Combo_PistolDamageBioticDamage.webp",
  },
  {
    index: 346,
    name: "Stronghold Package",
    text: "Optimize shield strength and the speed of shield restoration.",
    image: "Gear_Combo_ShieldStrengthShieldRegen.webp",
  },
  {
    index: 347,
    name: "Berserker Package",
    text: "Optimize shotgun and armor hydraulic power to increase shotgun and melee damage.",
    image: "Gear_Combo_ShotgunDamageMeleeDamage.webp",
  },
  {
    index: 348,
    name: "Expert Package",
    text: "Optimize energy supplies with multicore VIs to increase submachine gun damage and to recharge powers faster.",
    image: "Gear_Combo_SMGDamagePowerCooldown.webp",
  },
  {
    index: 349,
    name: "Operative Package",
    text: "Optimize sniper rifle and tech power damage.",
    image: "Gear_Combo_SniperDamageTechDamage.webp",
  },
  {
    index: 416,
    name: "Combatives Upgrade",
    text: "Increase the lethality of the assault rifle and pistol.",
    image: "Gear_Combo_AssaultRifleDamagePistolDamage.webp",
  },
  {
    index: 417,
    name: "Martial Biotic Amp",
    text: "Use an advanced biotic amp to increase the strength of biotic attacks, including melee damage.",
    image: "Gear_Combo_MeleeDamageBioticDamage.webp",
  },
  {
    index: 418,
    name: "Juggernaut Shield",
    text: "Use high-capacity kinetic barrier generators to provide bonuses to both shield strength and melee damage.",
    image: "Gear_Combo_ShieldStrengthMeleeDamage.webp",
  },
  {
    index: 419,
    name: "Shock Trooper Upgrade",
    text: "Increase the lethality of the shotgun, and increase grenade storage.",
    image: "Gear_Combo_ShotgunDamageGrenadeCap.webp",
  },
  {
    index: 420,
    name: "Guerrilla Upgrade",
    text: "Increase the lethality of the sniper rifle and SMG.",
    image: "Gear_Combo_SniperDamageSMGDamage.webp",
  },
  {
    index: 421,
    name: "Omni-Capacitors",
    text: "Provide more power to tech abilities to decrease recharge time.",
    image: "Gear_Combo_TechDamagePowerCooldown.webp",
  },
  {
    index: 422,
    name: "Barrage Upgrade",
    text: "Boost the effectiveness of all weapons by increasing stability and thermal clip capacities.",
    image: "Gear_Combo_WeaponStabilityAmmoCapacity.webp",
  },
  {
    index: 423,
    name: "Thermal Clip Storage",
    text: "Add compartments to the user's armor to increase the capacity for thermal clips without sacrificing armor integrity.",
    image: "Gear_AmmoCapacity.webp",
  },
  {
    index: 424,
    name: "Adaptive War Amp",
    text: "Use an advanced biotic amp to increase the strength of damaging biotic powers.",
    image: "Gear_BioticDamage.webp",
  },
  {
    index: 425,
    name: "Engineering Kit",
    text: "Install a variety of omni-tool upgrades to enhance the potency of tech attacks.",
    image: "Gear_TechDamage.webp",
  },
  {
    index: 436,
    name: "Medi-Gel Transmitter",
    text: "Short-range transmitters control medi-gel dispensers in teammates' armor, reviving self and nearby teammates simultaneously.",
    image: "Gear_MassMedigel.webp",
  },
  {
    index: 437,
    name: "Armored Compartments",
    text: "Stores additional thermal clips and missiles in armored compartments to shield them from incoming fire.",
    image: "Gear_CobraCapacity.webp",
  },
  {
    index: 538,
    name: "Responder Loadout",
    text: "Optimizes shields for fast recovery and utilizes medi-gel dispensers more efficiently, increasing capacity.",
    image: "Gear_MedigelCapacity.webp",
  },
  {
    index: 539,
    name: "Survivor Loadout",
    text: "Increases standard kinetic barriers as well as additional shield layers if available.",
    image: "Gear_SurvivalCapacity.webp",
  },
  {
    index: 540,
    name: "Assault Loadout",
    text: "Armor capacitors boost the kinetic coil in handheld weapons for greater firing power, and larger compartments allow for more thermal clips.",
    image: "Gear_ThermalCapacity.webp",
  },
  {
    index: 603,
    name: "Geth Scanner",
    text: "Highlight enemy activity nearby with geth scanner technology. This does not stack with other target-scanning effects.",
    image: "Gear_VisionHelmet.webp",
  },
  {
    index: 604,
    name: "Batarian Gauntlet",
    text: "Batarian gauntlet that turns your heavy melee into a slow, heavy-hitting attack.",
    image: "Gear_BatarianGauntlet.webp",
  },
];

export const CORE_CONSUMABLES: CoreConsumable[] = [
  {
    stock_index: 86,
    capacity_index: 242,
    text: "Refills your thermal clips and grenade supply during a mission.",
    name: "Thermal Clip Pack",
    stock_image: "Consumable_Ammo.webp",
    capacity_image: "MPCapacity_Ammo.webp",
  },
  {
    stock_index: 87,
    capacity_index: 243,
    name: "Medi-Gel",
    text: "Revive yourself when incapacitated in combat.",
    stock_image: "Consumable_Revive.webp",
    capacity_image: "MPCapacity_Revive.webp",
  },
  {
    stock_index: 88,
    capacity_index: 244,
    name: "Cobra Missile Launcher",
    text: "A one-shot missile launcher useful for taking out hardened targets.",
    stock_image: "Consumable_Rocket.webp",
    capacity_image: "MPCapacity_Rocket.webp",
  },
  {
    stock_index: 89,
    capacity_index: 245,
    name: "Ops Survival Pack",
    text: "Emergency pack fully restores health and shields during a mission.",
    stock_image: "Consumable_Shield.webp",
    capacity_image: "MPCapacity_Shield.webp",
  },
];

export const OTHER_CONSUMABLES: OtherConsumable[] = [
  { index: 246, name: "Reset Powers", image: "MPRespec.webp" },
];

export const FLAGS: Flag[] = [
    { index: 270, name: "Wecome screen" }
];

export const CHALLENGES: Category<TieredConsumable>[] = [
  { name: "Armor", values: ARMOR_CONSUMABLES },
  { name: "Weapon", values: WEAPON_CONSUMABLES },
  { name: "Ammo", values: AMMO_CONSUMABLES }
];
