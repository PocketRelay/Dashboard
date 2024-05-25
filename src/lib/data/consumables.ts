// Structure of a consumable which has multiple tier levels each

import type { Category } from "./inventory";

// Maximum normal level for gear
export const MAX_GEAR_LEVEL: number = 5;

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
  {
    index: 336,
    name: "Vibration Damper",
    text: "Decrease weapon kickback and improve firing stability by upgrading auto-targeting electronics.",
    image: "Gear_WeaponStability.webp",
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
