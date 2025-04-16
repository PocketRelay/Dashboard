import type { Category } from "./inventory";
import { WeaponType } from "./weapons";

// Maximum normal level for weapon mods
export const MAX_WEAPON_MOD_LEVEL: number = 5;

// Structure for defining a weapon mod
export interface WeaponMod {
  // The level index of the mod
  level_index: number;
  // The name of the mod
  name: string;
  // The image for the mod
  image: string;
}

export function getWeaponModByIndex(index: number): WeaponMod | undefined {
  for (const category of WEAPON_MODS) {
    for (const weaponMod of category.values) {
      if (weaponMod.level_index === index) {
        return weaponMod;
      }
    }
  }

  return undefined;
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

export type WeaponModCategory = Category<WeaponMod> & {
  weaponType: WeaponType;
};

export function getModsForWeaponType(
  weaponType: WeaponType | undefined
): WeaponMod[] {
  if (weaponType === undefined) return [];

  for (const category of WEAPON_MODS) {
    if (category.weaponType === weaponType) {
      return category.values;
    }
  }
  return [];
}

export const WEAPON_MODS: WeaponModCategory[] = [
  {
    name: "Assault Rifle",
    values: ASSAULT_RIFLE_MODS,
    weaponType: WeaponType.ASSAULT_RIFLE,
  },
  {
    name: "Sniper Rifle",
    values: SNIPER_RIFLE_MODS,
    weaponType: WeaponType.SNIPER_RIFLE,
  },
  { name: "Shotgun", values: SHOTGUN_MODS, weaponType: WeaponType.SHOTGUN },
  { name: "Pistol", values: PISTOL_MODS, weaponType: WeaponType.PISTOL },
  {
    name: "SMG",
    values: SUB_MACHINE_GUN_MODS,
    weaponType: WeaponType.SUB_MACHINE_GUN,
  },
];
