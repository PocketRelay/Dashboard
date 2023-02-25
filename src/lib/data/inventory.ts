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

// Rarity level of a specific item
export enum Rarity {
    Common,
    Uncommon,
    Rare,
    UltraRare
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
    index: number,
    // The name of the character
    name: string,
    // The character image
    image: string,
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
    { level_index: 136, rarity: Rarity.UltraRare, name: "Black Widow", image: "SniperRifle_Widow.png", },
    { level_index: 10, rarity: Rarity.Uncommon, name: "M-13 Raptor", image: "SniperRifle_Raptor.png", },
    { level_index: 12, rarity: Rarity.Uncommon, name: "M-97 Viper", image: "SniperRifle_Viper.png", },
    { level_index: 110, rarity: Rarity.UltraRare, name: "N7 Valiant", image: "SniperRifle_Valiant.png", },
    { level_index: 9, rarity: Rarity.Common, name: "M-92 Mantis", image: "SniperRifle_Mantis.png", },
    { level_index: 11, rarity: Rarity.UltraRare, name: "Javelin", image: "SniperRifle_Javelin.png", },
    { level_index: 369, rarity: Rarity.UltraRare, name: "M-90 Indra", image: "SniperRifle_Indra.png", },
    { level_index: 8, rarity: Rarity.Uncommon, name: "M-29 Incisor", image: "SniperRifle_Incisor.png", },
    { level_index: 13, rarity: Rarity.Rare, name: "M-98 Widow", image: "SniperRifle_Widow.png", },
    { level_index: 275, rarity: Rarity.Rare, name: "Kishock Harpoon Gun", image: "SniperRifle_Batarian.png", },
    { level_index: 288, rarity: Rarity.Rare, name: "Krysae Sniper Rifle", image: "SniperRifle_Turian.png", },
    { level_index: 532, rarity: Rarity.Rare, name: "Collector Sniper Rifle", image: "SniperRifle_Collector.png", },
];

export const ASSAULT_RIFLES: Weapon[] = [
    { level_index: 0, rarity: Rarity.Common, name: "M-8 Avenger", image: "AssaultRifle_Avenger.png", },
    { level_index: 2, rarity: Rarity.Rare, name: "Geth Pulse Rifle", image: "AssaultRifle_Geth.png" },
    { level_index: 4, rarity: Rarity.Uncommon, name: "Phaeston", image: "AssaultRifle_Cobra.png" },
    { level_index: 3, rarity: Rarity.Uncommon, name: "M-96 Mattock", image: "AssaultRifle_Mattock.png" },
    { level_index: 367, rarity: Rarity.Rare, name: "M-55 Argus", image: "AssaultRifle_Argus.png" },
    { level_index: 7, rarity: Rarity.Uncommon, name: "M-15 Vindicator", image: "AssaultRifle_Vindicator.png" },
    { level_index: 368, rarity: Rarity.UltraRare, name: "N7 Valkyrie", image: "AssaultRifle_Valkyrie.png" },
    { level_index: 135, rarity: Rarity.UltraRare, name: "M-99 Saber", image: "AssaultRifle_Saber.png" },
    { level_index: 6, rarity: Rarity.Rare, name: "M-76 Revenant", image: "AssaultRifle_Revenant.png" },
    { level_index: 5, rarity: Rarity.Rare, name: "M-37 Falcon", image: "AssaultRifle_Falcon.png" },
    { level_index: 1, rarity: Rarity.Rare, name: "Collector Rifle", image: "AssaultRifle_Collector.png" },
    { level_index: 274, rarity: Rarity.Rare, name: "Striker Assault Rifle", image: "AssaultRifle_Krogan.png" },
    { level_index: 358, rarity: Rarity.UltraRare, name: "Particle Rifle", image: "AssaultRifle_Prothean_MP.png" },
    { level_index: 286, rarity: Rarity.UltraRare, name: "Cerberus Harrier", image: "AssaultRifle_Cerberus.png" },
    { level_index: 468, rarity: Rarity.UltraRare, name: "N7 Typhoon", image: "AssaultRifle_LMG.png" },
    { level_index: 626, rarity: Rarity.UltraRare, name: "Geth Spitfire", image: "AssaultRifle_Spitfire.png" },
    { level_index: 623, rarity: Rarity.UltraRare, name: "M-7 Lancer", image: "AssaultRifle_Lancer_MP.png" },
    { level_index: 627, rarity: Rarity.Rare, name: "Adas Anti-Synthetic Rifle", image: "AssaultRifle_Adas_MP.png" },
];

export const SUB_MACHINE_GUNS: Weapon[] = [
    { level_index: 28, rarity: Rarity.Rare, name: "M-25 Hornet", image: "SMG_Hornet.png", },
    { level_index: 29, rarity: Rarity.Common, name: "M-4 Shuriken", image: "SMG_Shuriken.png", },
    { level_index: 264, rarity: Rarity.UltraRare, name: "N7 Hurricane", image: "SMG_Hurricane.png", },
    { level_index: 30, rarity: Rarity.Uncommon, name: "M-9 Tempest", image: "SMG_Tempest.png", },
    { level_index: 27, rarity: Rarity.Uncommon, name: "M-12 Locust", image: "SMG_Locust.png", },
    { level_index: 276, rarity: Rarity.Rare, name: "Geth Plasma SMG", image: "SMG_Geth.png", },
    { level_index: 533, rarity: Rarity.UltraRare, name: "Collector SMG", image: "SMG_Collector.png", },
    { level_index: 624, rarity: Rarity.UltraRare, name: "Blood Pack Punisher", image: "SMG_Bloodpack_MP.png", },
];


export const SHOTGUNS: Weapon[] = [
    { level_index: 17, rarity: Rarity.Common, name: "M-23 Katana", image: "Shotgun_Katana.png", },
    { level_index: 16, rarity: Rarity.Rare, name: "Geth Plasma Shotgun", image: "Shotgun_Geth.png", },
    { level_index: 137, rarity: Rarity.UltraRare, name: "M-11 Wraith", image: "Shotgun_Striker.png", },
    { level_index: 20, rarity: Rarity.Uncommon, name: "M-27 Scimitar", image: "Shotgun_Scimitar.png", },
    { level_index: 370, rarity: Rarity.Rare, name: "AT-12 Raider", image: "Shotgun_Raider.png", },
    { level_index: 18, rarity: Rarity.Rare, name: "Graal Spike Thrower", image: "Shotgun_Graal.png", },
    { level_index: 15, rarity: Rarity.Uncommon, name: "M-22 Eviscerator", image: "Shotgun_Eviscerator.png", },
    { level_index: 19, rarity: Rarity.Rare, name: "Disciple", image: "Shotgun_Disciple.png", },
    { level_index: 262, rarity: Rarity.UltraRare, name: "N7 Crusader", image: "Shotgun_Crusader.png", },
    { level_index: 14, rarity: Rarity.Rare, name: "M-300 Claymore", image: "Shotgun_Claymore.png", },
    { level_index: 287, rarity: Rarity.Rare, name: "Reegar Carbine", image: "Shotgun_Quarian.png", },
    { level_index: 469, rarity: Rarity.Rare, name: "N7 Piranha", image: "Shotgun_Assault.png", },
    { level_index: 525, rarity: Rarity.UltraRare, name: "Venom Shotgun", image: "Shotgun_Salarian_MP.png", },
];

export const PISTOLS: Weapon[] = [
    { level_index: 24, rarity: Rarity.Uncommon, name: "M-5 Phalanx", image: "Pistol_Phalanx.png", },
    { level_index: 22, rarity: Rarity.UltraRare, name: "M-358 Talon", image: "Pistol_Talon.png", },
    { level_index: 23, rarity: Rarity.Rare, name: "Arc Pistol", image: "Pistol_Thor.png", },
    { level_index: 26, rarity: Rarity.UltraRare, name: "Scorpion", image: "Pistol_Scorpion.png", },
    { level_index: 25, rarity: Rarity.Common, name: "M-3 Predator", image: "Pistol_Predator.png", },
    { level_index: 138, rarity: Rarity.UltraRare, name: "M-77 Paladin", image: "Pistol_Ivory.png", },
    { level_index: 263, rarity: Rarity.UltraRare, name: "N7 Eagle", image: "Pistol_Eagle.png", },
    { level_index: 21, rarity: Rarity.Rare, name: "M-6 Carnifex", image: "Pistol_Carnifex.png", },
    { level_index: 470, rarity: Rarity.Rare, name: "Acolyte", image: "Pistol_Asari.png", },
    { level_index: 629, rarity: Rarity.Rare, name: "M-11 Suppressor", image: "Pistol_Silencer_MP.png", },
    { level_index: 628, rarity: Rarity.Rare, name: "Executioner Pistol", image: "Pistol_Bloodpack_MP.png", },
];

export const WEAPON_CATEGORIES: Category<Weapon>[] = [
    { name: "Sniper Rifles", values: SNIPER_RIFLES },
    { name: "Assault Rifles", values: ASSAULT_RIFLES },
    { name: "Sub Machine Guns", values: SUB_MACHINE_GUNS },
    { name: "Shotguns", values: SHOTGUNS },
    { name: "Pistols", values: PISTOLS },
];

export const ADEPT_CHARACTERS: Character[] = [
    { index: 248, name: "Human Male", image: "AdeptHumanMale.png" },
    { index: 247, name: "Human Female", image: "AdeptHumanFemale.png" },
    { index: 217, name: "Asari", image: "MP_Asari0.png" },
    { index: 218, name: "Drell", image: "MP_Drell0.png" },
    { index: 273, name: "Asari Justicar", image: "MP_AsariComm.png" },
    { index: 282, name: "Phoenix", image: "MP_Cerberus.png" },
    { index: 373, name: "N7 Fury", image: "MP_AllianceADP.png" },
    { index: 500, name: "Volus", image: "MP_VolusADP.png" },
    { index: 514, name: "Krogan Shaman", image: "MP_KroganADP.png" },
    { index: 508, name: "Batarian Slasher", image: "MP_BatarianADP.png" },
    { index: 577, name: "Awakened Collector", image: "MP_CollectADP.png" },
];

export const SOLDIER_CHARACTERS: Character[] = [
    { index: 256, name: "Human Male", image: "SoldierHumanMale.png" },
    { index: 255, name: "Human Female", image: "SoldierHumanFemale.png" },
    { index: 225, name: "Krogan", image: "MP_Krogan0.png" },
    { index: 226, name: "Turian", image: "MP_Turian0.png" },
    { index: 268, name: "Battlefield 3", image: "MP_BF_HMM0.png" },
    { index: 240, name: "Batarian", image: "MP_Batarian.png" },
    { index: 278, name: "Vorcha", image: "MP_Vorcha.png" },
    { index: 378, name: "N7 Destroyer", image: "MP_AllianceSOL.png" },
    { index: 480, name: "Turian Havoc", image: "MP_TurianSLD.png" },
    { index: 506, name: "Geth Trooper", image: "MP_GethSLD.png" },
    { index: 512, name: "Quarian Marksman", image: "MP_QuarianMSLD.png" },
    { index: 576, name: "Geth Juggernaut", image: "MP_GethPSLD.png" },
];

export const ENGINEER_CHARACTERS: Character[] = [
    { index: 250, name: "Human Male", image: "EngineerHumanMale.png" },
    { index: 249, name: "Human Female", image: "EngineerHumanFemale.png" },
    { index: 219, name: "Quarian", image: "MP_Quarian0.png" },
    { index: 220, name: "Salarian", image: "MP_Salarian0.png" },
    { index: 238, name: "Geth", image: "MP_GethEngineer.png" },
    { index: 280, name: "Quarian Male", image: "MP_QuarianMale0.png" },
    { index: 374, name: "N7 Demolisher", image: "MP_AllianceENG.png" },
    { index: 501, name: "Volus", image: "MP_VolusENG.png" },
    { index: 503, name: "Turian Saboteur", image: "MP_TurianENG.png" },
    { index: 509, name: "Vorcha Hunter", image: "MP_VorchaENG.png" },
    { index: 584, name: "Talon Mercenary", image: "MP_MercENG.png" },
];

export const SENTINEL_CHARACTERS: Character[] = [
    { index: 254, name: "Human Male", image: "SentinelHumanMale.png" },
    { index: 253, name: "Human Female", image: "SentinelHumanFemale.png" },
    { index: 223, name: "Turian", image: "MP_Turian0.png" },
    { index: 224, name: "Krogan", image: "MP_Krogan0.png" },
    { index: 267, name: "Batarian", image: "MP_Batarian.png" },
    { index: 279, name: "Vorcha", image: "MP_Vorcha.png" },
    { index: 375, name: "N7 Paladin", image: "MP_AllianceSEN.png" },
    { index: 505, name: "Volus Mercenary", image: "MP_VolusENG2.png" },
    { index: 511, name: "Asari Valkyrie", image: "MP_AsariSEN.png" },
    { index: 583, name: "Krogan Warlord", image: "MP_BloodSEN.png" },

];

export const INFILTRATOR_CHARACTERS: Character[] = [
    { index: 252, name: "Human Male", image: "InfiltratorHumanMale.png" },
    { index: 251, name: "Human Female", image: "InfiltratorHumanFemale.png" },
    { index: 221, name: "Salarian", image: "MP_Salarian0.png" },
    { index: 222, name: "Quarian", image: "MP_Quarian0.png" },
    { index: 239, name: "Geth", image: "MP_GethInfiltrator.png" },
    { index: 281, name: "Quarian Male", image: "MP_QuarianMale0.png" },
    { index: 281, name: "N7 Shadow", image: "MP_AllianceINF.png" },
    { index: 381, name: "Turian Ghost", image: "MP_TurianINF.png" },
    { index: 504, name: "Drell Assassin", image: "MP_DrellINF.png" },
    { index: 510, name: "Asari Huntress", image: "MP_AsariINF.png" },
    { index: 602, name: "Alliance Infiltration Unit", image: "MP_FBotINF.png" },

];


export const VANGUARD_CHARACTERS: Character[] = [
    { index: 258, name: "Human Male", image: "VanguardHumanMale.png" },
    { index: 257, name: "Human Female", image: "VanguardHumanFemale.png" },
    { index: 227, name: "Drell", image: "MP_Drell0.png" },
    { index: 228, name: "Asari", image: "MP_Asari0.png" },
    { index: 272, name: "Krogan", image: "MP_Krogan0.png" },
    { index: 283, name: "Phoenix", image: "MP_Cerberus.png" },
    { index: 376, name: "N7 Slayer", image: "MP_AllianceVAN.png" },
    { index: 507, name: "Volus Protector", image: "MP_VolusVAN.png" },
    { index: 513, name: "Batarian Brawler", image: "MP_BatarianVAN.png" },
    { index: 592, name: "Cabal", image: "MP_TurianVAN.png" },
];


export const CHARACTER_CLASSES: Category<Character>[] = [
    { name: "Adept", values: ADEPT_CHARACTERS },
    { name: "Soldier", values: SOLDIER_CHARACTERS },
    { name: "Engineer", values: ENGINEER_CHARACTERS },
    { name: "Sentinel", values: SENTINEL_CHARACTERS },
    { name: "Infiltrator", values: INFILTRATOR_CHARACTERS },
    { name: "Vanguard", values: VANGUARD_CHARACTERS }
]

export const ASSAULT_RIFLE_MODS: WeaponMod[] = [
    { level_index: 31, name: "Extended Barrel", image: "AssaultRifleDamage.png", },
    { level_index: 32, name: "Precision Scope", image: "AssaultRifleAccuracy.png", },
    { level_index: 33, name: "Stability Dampner", image: "AssaultRifleStability.png", },
    { level_index: 34, name: "Magazine Upgrade", image: "AssaultRifleMagSize.png", },
    { level_index: 35, name: "Piercing Mod", image: "AssaultRifleForce.png", },
    { level_index: 406, name: "Thermal Scope", image: "AssaultRifleSuperScope.png", },
    { level_index: 466, name: "Omni-Blade", image: "AssaultRifleMelee.png", },
    { level_index: 467, name: "High-Velocity Barrel", image: "AssaultRifleSuperPen.png", },
    { level_index: 653, name: "Ultralight Materials", image: "AssaultRifleUltraLight_MP5.png", },
];

export const SNIPER_RIFLE_MODS: WeaponMod[] = [
    { level_index: 36, name: "Extended Barrel", image: "SniperRifleDamage.png", },
    { level_index: 37, name: "Enhanced Scope", image: "SniperRifleAccuracy.png", },
    { level_index: 38, name: "Spare Thermal Clip", image: "SniperRifleReloadSpeed.png", },
    { level_index: 40, name: "Piercing Mod", image: "SniperRifleConstraintDamage.png", },
    { level_index: 414, name: "High-Velocity Barrel", image: "SniperRifleDamageAndPen.png", },
    { level_index: 415, name: "Thermal Scope", image: "SniperRifleSuperScope.png", },
    { level_index: 654, name: "Ultralight Materials", image: "SniperRifleUltraLight_MP5.png", },
];

export const SHOTGUN_MODS: WeaponMod[] = [
    { level_index: 41, name: "High Caliber Barrel", image: "ShotgunDamage.png", },
    { level_index: 42, name: "Blade Attachment", image: "ShotgunMeleeDamage.png", },
    { level_index: 43, name: "Spare Thermal Clip", image: "ShotgunReloadSpeed.png", },
    { level_index: 44, name: "Smart Choke", image: "ShotgunAccuracy.png", },
    { level_index: 45, name: "Shredder Mod", image: "ShotgunReloadSpeed.png", },
    { level_index: 410, name: "High-Velocity Barrel", image: "ShotgunDamageAndPen.png", },
    { level_index: 411, name: "Omni-Blade", image: "ShotgunSuperMelee.png", },
    { level_index: 655, name: "Ultralight Materials", image: "ShotgunUltraLight_MP5.png", },
];

export const PISTOL_MODS: WeaponMod[] = [
    { level_index: 46, name: "High-Caliber Barrel", image: "PistolDamage.png", },
    { level_index: 47, name: "Scope", image: "PistolAccuracy.png", },
    { level_index: 48, name: "Melee Stunner", image: "PistolStability.png", },
    { level_index: 49, name: "Magazine Upgrade", image: "PistolMagSize.png", },
    { level_index: 50, name: "Piercing Mod", image: "PistolReloadSpeed.png", },
    { level_index: 407, name: "Cranial Trauma System", image: "PistolHeadShot.png", },
    { level_index: 408, name: "Heavy Barrel", image: "PistolSuperDamage.png", },
    { level_index: 409, name: "Ultralight Materials", image: "PistolUltraLight.png", },
    { level_index: 656, name: "Power Magnifier", image: "PistolPowerDamage_MP5.png", },
];

export const SUB_MACHINE_GUN_MODS: WeaponMod[] = [
    { level_index: 51, name: "High Caliber Barrel", image: "SMGDamage.png", },
    { level_index: 52, name: "Scope", image: "SMGAccuracy.png", },
    { level_index: 53, name: "Ultralight Materials", image: "SMGStability.png", },
    { level_index: 54, name: "Magazine Upgrade", image: "SMGMagSize.png", },
    { level_index: 55, name: "Heat Sink", image: "SMGConstraintDamage.png", },
    { level_index: 412, name: "High-Velocity Barrel", image: "SMGPenetration.png", },
    { level_index: 413, name: "Recoil System", image: "SMGStabilization.png", },
    { level_index: 657, name: "Power Magnifier", image: "SMGPowerDamage_MP5.png", },
];


export const WEAPON_MODS: Category<WeaponMod>[] = [
    { name: "Assault Rifle", values: ASSAULT_RIFLE_MODS },
    { name: "Sniper Rifle", values: SNIPER_RIFLE_MODS },
    { name: "Shotugn", values: SHOTGUN_MODS },
    { name: "Pistol", values: PISTOL_MODS },
    { name: "SMG", values: SUB_MACHINE_GUN_MODS }
]


export const ARMOR_CONSUMABLES: TieredConsumable[] = [
    {
        name: "Adrenaline Module",
        image: "SpeedBonus.png",
        indexes: [126, 127, 128],
    },
    {
        name: "Cyclonic Modulator",
        image: "ShieldBonus.png",
        indexes: [129, 130, 131, 490],
    },
    {
        name: "Power Amplifier Module",
        image: "PowerBonusDamage.png",
        indexes: [259, 260, 261, 489],
    },
    {
        name: "Power Efficiency Module",
        image: "PowerBonus.png",
        indexes: [105, 106, 107],
    },
    {
        name: "Shield Power Cells",
        image: "ShieldRegenBonus.png",
        indexes: [76, 77, 78],
    },
    {
        name: "Stabilization Module",
        image: "StabilityBonus.png",
        indexes: [73, 74, 75],
    },

];

export const WEAPON_CONSUMABLES: TieredConsumable[] = [
    {
        name: "Assault Rifle Rail Amp",
        image: "WeaponDamageBonus_AssaultRifle.png",
        indexes: [111, 112, 113],
    },
    {
        name: "Pistol Rail Amp",
        image: "WeaponDamageBonus_Pistol.png",
        indexes: [120, 121, 122],
    },
    {
        name: "SMG Rail Amp",
        image: "WeaponDamageBonus_SMG.png",
        indexes: [123, 124, 125],
    },
    {
        name: "Shotgun Rail Amp",
        image: "WeaponDamageBonus_Shotgun.png",
        indexes: [117, 118, 119],
    },
    {
        name: "Sniper Rifle Rail Amp",
        image: "WeaponDamageBonus_SniperRifle.png",
        indexes: [114, 115, 116],
    },
    {
        name: "Strength Enhancer",
        image: "MeleeDamage.png",
        indexes: [79, 80, 81],
    },
    {
        name: "Targeting VI",
        image: "HeadshotDamage.png",
        indexes: [82, 83, 84],
    },
];

export const AMMO_CONSUMABLES: TieredConsumable[] = [
    {
        name: "Armor Piercing Rounds",
        image: "AmmoPower_ArmorPiercing.png",
        indexes: [96, 97, 98, 486],
    },
    {
        name: "Cryo Rounds",
        image: "AmmoPower_Cryo.png",
        indexes: [102, 103, 104, 488],
    },
    {
        name: "Disruptor Rounds",
        image: "AmmoPower_Disruptor.png",
        indexes: [93, 94, 95, 485],
    },
    {
        name: "Drill Rounds",
        image: "AmmoPower_Eraser.png",
        indexes: [518, 523, 528],
    },
    {
        name: "Explosive Rounds",
        image: "AmmoPower_Needler.png",
        indexes: [517, 522, 527],
    },
    {
        name: "Incendiary Rounds",
        image: "AmmoPower_Incendiary.png",
        indexes: [90, 91, 92, 484],
    },
    {
        name: "Phasic Rounds",
        image: "AmmoPower_Phasic.png",
        indexes: [519, 524, 529],
    },
    {
        name: "Warp Rounds",
        image: "AmmoPower_Warp.png",
        indexes: [99, 100, 101, 487],
    },
    {
        name: "Polonium Rounds",
        image: "AmmoPower_Polonium.png",
        indexes: [515, 520, 525],
        unused: true
    },
];


export const CONSUMABLES: Category<TieredConsumable>[] = [
    { name: "Armor", values: ARMOR_CONSUMABLES },
    { name: "Weapon", values: WEAPON_CONSUMABLES },
    { name: "Ammo", values: AMMO_CONSUMABLES }
]


export const GEAR_CONSUMABLES: GearConsumable[] = [
    { index: 330, name: "Hydraulic Joints", text: "Improve armor joints to maximize the force and damage delivered through melee blows.", image: "Gear_MeleeDamage.png" },
    { index: 331, name: "Vulnerability VI", text: "Use targeting VIs to pinpoint enemy weak points. Aim will be autocorrected to maximize damage.", image: "Gear_HeadshotDamage.png" },
    { index: 332, name: "Mental Focuser", text: "Sharpen mental alertness and precision under stress to aid the performance of tech or biotic powers.", image: "Gear_PowerBonus_Damage.png" },
    { index: 333, name: "Structural Ergonomics", text: "Enhance the ability of armor to bear loads, speeding up cooldown so that powers can be used more often.", image: "Gear_PowerBonus_Cooldown.png" },
    { index: 334, name: "Shield Booster", text: "Amplify the power systems that generate shields to raise their effective strength.", image: "Gear_ShieldStrength.png" },
    { index: 335, name: "Multicapacitor", text: "Add a backup power supply to the user's shields, decreasing the time before they can be brought back online.", image: "Gear_ShieldRegen.png" },
    { index: 337, name: "Assault Rifle Amp", text: "Add power to assault rifles to increase round velocity and damage.", image: "Gear_WeaponDamage_AssaultRifle.png" },
    { index: 338, name: "Sniper Rifle Amp", text: "Add power to sniper rifles to increase round velocity and damage.", image: "Gear_WeaponDamage_SniperRifle.png" },
    { index: 339, name: "Shotgun Amp", text: "Add power to shotguns to increase round velocity and damage.", image: "Gear_WeaponDamage_Shotgun.png" },
    { index: 340, name: "Pistol Amp", text: "Add power to pistols to increase round velocity and damage.", image: "Gear_WeaponDamage_Pistol.png" },
    { index: 341, name: "SMG Amp", text: "Add power to submachine guns to increase round velocity and damage.", image: "Gear_WeaponDamage_SMG.png" },
    { index: 343, name: "Grenade Capacity", text: "Add extra grenade storage compartments to the user's armor.", image: "Gear_GrenadeCapacity.png" },
    { index: 344, name: "Warfighter Package", text: "Deploy this modification package to increase assault rifle power and grenade storage.", image: "Gear_Combo_AssaultDamageGrenadeCap.png" },
    { index: 345, name: "Commando Package", text: "Optimize pistol and biotic amp power to increase damage.", image: "Gear_Combo_PistolDamageBioticDamage.png" },
    { index: 346, name: "Stronghold Package", text: "Optimize shield strength and the speed of shield restoration.", image: "Gear_Combo_ShieldStrengthShieldRegen.png" },
    { index: 347, name: "Berserker Package", text: "Optimize shotgun and armor hydraulic power to increase shotgun and melee damage.", image: "Gear_Combo_ShotgunDamageMeleeDamage.png" },
    { index: 348, name: "Expert Package", text: "Optimize energy supplies with multicore VIs to increase submachine gun damage and to recharge powers faster.", image: "Gear_Combo_SMGDamagePowerCooldown.png" },
    { index: 349, name: "Operative Package", text: "Optimize sniper rifle and tech power damage.", image: "Gear_Combo_SniperDamageTechDamage.png" },
    { index: 416, name: "Combatives Upgrade", text: "Increase the lethality of the assault rifle and pistol.", image: "Gear_Combo_AssaultRifleDamagePistolDamage.png" },
    { index: 417, name: "Martial Biotic Amp", text: "Use an advanced biotic amp to increase the strength of biotic attacks, including melee damage.", image: "Gear_Combo_MeleeDamageBioticDamage.png" },
    { index: 418, name: "Juggernaut Shield", text: "Use high-capacity kinetic barrier generators to provide bonuses to both shield strength and melee damage.", image: "Gear_Combo_ShieldStrengthMeleeDamage.png" },
    { index: 419, name: "Shock Trooper Upgrade", text: "Increase the lethality of the shotgun, and increase grenade storage.", image: "Gear_Combo_ShotgunDamageGrenadeCap.png" },
    { index: 420, name: "Guerrilla Upgrade", text: "Increase the lethality of the sniper rifle and SMG.", image: "Gear_Combo_SniperDamageSMGDamage.png" },
    { index: 421, name: "Omni-Capacitors", text: "Provide more power to tech abilities to decrease recharge time.", image: "Gear_Combo_TechDamagePowerCooldown.png" },
    { index: 422, name: "Barrage Upgrade", text: "Boost the effectiveness of all weapons by increasing stability and thermal clip capacities.", image: "Gear_Combo_WeaponStabilityAmmoCapacity.png" },
    { index: 423, name: "Thermal Clip Storage", text: "Add compartments to the user's armor to increase the capacity for thermal clips without sacrificing armor integrity.", image: "Gear_AmmoCapacity.png" },
    { index: 424, name: "Adaptive War Amp", text: "Use an advanced biotic amp to increase the strength of damaging biotic powers.", image: "Gear_BioticDamage.png" },
    { index: 425, name: "Engineering Kit", text: "Install a variety of omni-tool upgrades to enhance the potency of tech attacks.", image: "Gear_TechDamage.png" },
    { index: 436, name: "Medi-Gel Transmitter", text: "Short-range transmitters control medi-gel dispensers in teammates' armor, reviving self and nearby teammates simultaneously.", image: "Gear_MassMedigel.png" },
    { index: 437, name: "Armored Compartments", text: "Stores additional thermal clips and missiles in armored compartments to shield them from incoming fire.", image: "Gear_CobraCapacity.png" },
    { index: 538, name: "Responder Loadout", text: "Optimizes shields for fast recovery and utilizes medi-gel dispensers more efficiently, increasing capacity.", image: "Gear_MedigelCapacity.png" },
    { index: 539, name: "Survivor Loadout", text: "Increases standard kinetic barriers as well as additional shield layers if available.", image: "Gear_SurvivalCapacity.png" },
    { index: 540, name: "Assault Loadout", text: "Armor capacitors boost the kinetic coil in handheld weapons for greater firing power, and larger compartments allow for more thermal clips.", image: "Gear_ThermalCapacity.png" },
    { index: 603, name: "Geth Scanner", text: "Highlight enemy activity nearby with geth scanner technology. This does not stack with other target-scanning effects.", image: "Gear_VisionHelmet.png" },
    { index: 604, name: "Batarian Gauntlet", text: "Batarian gauntlet that turns your heavy melee into a slow, heavy-hitting attack.", image: "Gear_BatarianGauntlet.png" },
]


export const CORE_CONSUMABLES: CoreConsumable[] = [
    {
        stock_index: 86,
        capacity_index: 242,
        text: "Refills your thermal clips and grenade supply during a mission.",
        name: "Thermal Clip Pack",
        stock_image: "Consumable_Ammo.png",
        capacity_image: "MPCapacity_Ammo.png"
    },
    {
        stock_index: 87,
        capacity_index: 243,
        name: "Medi-Gel",
        text: "Revive yourself when incapacitated in combat.",
        stock_image: "Consumable_Revive.png",
        capacity_image: "MPCapacity_Revive.png"
    },
    {
        stock_index: 88,
        capacity_index: 244,
        name: "Cobra Missile Launcher",
        text: "A one-shot missile launcher useful for taking out hardened targets.",
        stock_image: "Consumable_Rocket.png",
        capacity_image: "MPCapacity_Rocket.png"
    },
    {
        stock_index: 89,
        capacity_index: 245,
        name: "Ops Survival Pack",
        text: "Emergency pack fully restores health and shields during a mission.",
        stock_image: "Consumable_Shield.png",
        capacity_image: "MPCapacity_Shield.png"
    },
];

export const OTHER_CONSUMABLES: OtherConsumable[] = [
    { index: 246, name: "Reset Powers", image: "MPRespec.png" }
]

export const FLAGS: Flag[] = [
    { index: 270, name: "Wecome screen" }
]

