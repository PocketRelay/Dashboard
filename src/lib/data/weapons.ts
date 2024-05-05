import type { Category, Rarity, Races } from "./inventory";

// Maximum normal level for weapons
export const MAX_WEAPON_LEVEL: number = 10;

export function getWeaponByIndex(index: number): Weapon | undefined {
  for (const category of WEAPON_CATEGORIES) {
    for (const weapon of category.values) {
      if (weapon.level_index === index) {
        return weapon;
      }
    }
  }

  return undefined;
}

// Structure of a weapon definition
export interface Weapon {
  // Index of weapon level in inventory (Also used as an ID)
  level_index: number;
  // The rarity of the weapon
  rarity: Rarity;
  // Name of the weapon
  name: string;
  // Path to the weapon image
  image: string;
  // Unused flag for unused weapons
  unused?: boolean;

  ammo_capacity_L: number;
  ammo_capacity_H: number;
  damage_L: number;
  damage_H: number;
  magazine: number;
  mode: number;
  i: any;
  weight_L: number;
  weight_H: number;
  dlc?: boolean;
  burst?: number;
  race?: number;
  headshot_modifier?: number;
  headshot_capable?: boolean;
  armor_penalty?: boolean;
  is_venom?: boolean;
  charged?: boolean;
  charged_ammo?: boolean;
  charged_damage?: number;
  charged_shots?: number;
  uncharged_modifier?: number;
  upfront?: number;
}

export const SNIPER_RIFLES: Weapon[] = [
  {
    level_index: 136,
    rarity: 3,
    name: "Black Widow",
    image: "SniperRifle_BlackWidow.webp",
    ammo_capacity_L: 15,
    ammo_capacity_H: 25,
    damage_L: 739,
    damage_H: 923.8,
    magazine: 3,
    mode: 1,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 2.3,
    weight_H: 2,
  },
  {
    level_index: 10,
    rarity: 1,
    name: "M-13 Raptor",
    image: "SniperRifle_Raptor.webp",
    ammo_capacity_L: 105,
    ammo_capacity_H: 131,
    damage_L: 86,
    damage_H: 107.5,
    magazine: 15,
    mode: 1,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 1,
    weight_H: 0.7,
  },
  {
    level_index: 12,
    rarity: 1,
    name: "M-97 Viper",
    image: "SniperRifle_Viper.webp",
    ammo_capacity_L: 36,
    ammo_capacity_H: 46,
    damage_L: 292.1,
    damage_H: 365.2,
    magazine: 6,
    mode: 1,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 1.25,
    weight_H: 0.7,
  },
  {
    level_index: 110,
    rarity: 3,
    name: "N7 Valiant",
    image: "SniperRifle_Valiant.webp",
    ammo_capacity_L: 30,
    ammo_capacity_H: 39,
    damage_L: 396.2,
    damage_H: 515.5,
    magazine: 3,
    mode: 1,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 1.75,
    weight_H: 1,
  },
  {
    level_index: 9,
    rarity: 0,
    name: "M-92 Mantis",
    image: "SniperRifle_Mantis.webp",
    ammo_capacity_L: 9,
    ammo_capacity_H: 19,
    damage_L: 738.7,
    damage_H: 886.4,
    magazine: 1,
    mode: 0,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 1.75,
    weight_H: 1,
  },
  {
    level_index: 11,
    rarity: 3,
    name: "Javelin",
    image: "SniperRifle_Javelin.webp",
    ammo_capacity_L: 5,
    ammo_capacity_H: 15,
    damage_L: 1236,
    damage_H: 1545.8,
    magazine: 1,
    mode: 0,
    race: 9,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 2.7,
    weight_H: 2.4,
  },
  {
    level_index: 369,
    rarity: 3,
    name: "M-90 Indra",
    image: "SniperRifle_Indra.webp",
    ammo_capacity_L: 180,
    ammo_capacity_H: 225,
    damage_L: 72.6,
    damage_H: 92.2,
    magazine: 25,
    mode: 2,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 1,
    weight_H: 0.7,
  },
  {
    level_index: 8,
    rarity: 1,
    name: "M-29 Incisor",
    image: "SniperRifle_Incisor.webp",
    ammo_capacity_L: 120,
    ammo_capacity_H: 150,
    damage_L: 98,
    damage_H: 122.5,
    magazine: 15,
    mode: 4,
    burst: 3,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 1.5,
    weight_H: 0.9,
  },
  {
    level_index: 13,
    rarity: 2,
    name: "M-98 Widow",
    image: "SniperRifle_Widow.webp",
    ammo_capacity_L: 7,
    ammo_capacity_H: 17,
    damage_L: 997,
    damage_H: 1246,
    magazine: 1,
    mode: 0,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 2.5,
    weight_H: 2,
  },
  {
    level_index: 275,
    rarity: 2,
    name: "Kishock Harpoon Gun",
    image: "SniperRifle_Batarian.webp",
    ammo_capacity_L: 15,
    ammo_capacity_H: 25,
    damage_L: 890.7,
    damage_H: 1113.4,
    magazine: 1,
    mode: 0,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 2,
    weight_H: 1.4,
    charged: true,
    armor_penalty: false,
    charged_damage: 1.75,
    headshot_modifier: 3,
    upfront: 0.6,
    dlc: true,
  },
  {
    level_index: 288,
    rarity: 2,
    name: "Krysae Sniper Rifle",
    image: "SniperRifle_Turian.webp",
    ammo_capacity_L: 9,
    ammo_capacity_H: 18,
    damage_L: 493.4,
    damage_H: 616.8,
    magazine: 3,
    mode: 1,
    i: {
      organic: {
        health: 1,
        armor: 1.5,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 2,
    weight_H: 1.4,
    headshot_capable: false,
    armor_penalty: false,
    dlc: true,
  },
  {
    level_index: 532,
    rarity: 2,
    name: "Collector Sniper Rifle",
    image: "SniperRifle_Collector.webp",
    ammo_capacity_L: 0,
    ammo_capacity_H: 45,
    damage_L: 73,
    damage_H: 91.3,
    magazine: 35,
    mode: 2,
    race: 10,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 2,
    weight_H: 1.4,
    dlc: true,
  },
];

export const ASSAULT_RIFLES: Weapon[] = [
  {
    level_index: 0,
    rarity: 0,
    name: "M-8 Avenger",
    image: "AssaultRifle_Avenger.webp",
    ammo_capacity_L: 210,
    ammo_capacity_H: 262,
    damage_L: 38.6,
    damage_H: 48.2,
    magazine: 30,
    mode: 2,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 1,
    weight_H: 0.5,
  },
  {
    level_index: 2,
    rarity: 2,
    name: "Geth Pulse Rifle",
    image: "AssaultRifle_Geth.webp",
    ammo_capacity_L: 480,
    ammo_capacity_H: 640,
    damage_L: 28.8,
    damage_H: 36,
    magazine: 100,
    mode: 2,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 1,
    weight_H: 0.5,
    headshot_modifier: 3,
  },
  {
    level_index: 4,
    rarity: 1,
    name: "Phaeston",
    image: "AssaultRifle_Cobra.webp",
    ammo_capacity_L: 350,
    ammo_capacity_H: 450,
    damage_L: 41.9,
    damage_H: 52.4,
    magazine: 50,
    mode: 2,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 1.35,
    weight_H: 0.8,
  },
  {
    level_index: 3,
    rarity: 1,
    name: "M-96 Mattock",
    image: "AssaultRifle_Mattock.webp",
    ammo_capacity_L: 96,
    ammo_capacity_H: 120,
    damage_L: 103.6,
    damage_H: 129.5,
    magazine: 16,
    mode: 1,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 1.5,
    weight_H: 0.9,
  },
  {
    level_index: 367,
    rarity: 2,
    name: "M-55 Argus",
    image: "AssaultRifle_Argus.webp",
    ammo_capacity_L: 168,
    ammo_capacity_H: 210,
    damage_L: 164.8,
    damage_H: 206,
    magazine: 21,
    mode: 4,
    burst: 3,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 2,
    weight_H: 1.4,
  },
  {
    level_index: 7,
    rarity: 1,
    name: "M-15 Vindicator",
    image: "AssaultRifle_Vindicator.webp",
    ammo_capacity_L: 144,
    ammo_capacity_H: 180,
    damage_L: 68.6,
    damage_H: 85.8,
    magazine: 24,
    mode: 4,
    burst: 3,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 1.25,
    weight_H: 0.7,
  },
  {
    level_index: 368,
    rarity: 3,
    name: "N7 Valkyrie",
    image: "AssaultRifle_Valkyrie.webp",
    ammo_capacity_L: 144,
    ammo_capacity_H: 180,
    damage_L: 119.9,
    damage_H: 149.9,
    magazine: 16,
    mode: 3,
    burst: 2,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 1.5,
    weight_H: 1.25,
    headshot_modifier: 3,
  },
  {
    level_index: 135,
    rarity: 3,
    name: "M-99 Saber",
    image: "AssaultRifle_Saber.webp",
    ammo_capacity_L: 40,
    ammo_capacity_H: 56,
    damage_L: 460,
    damage_H: 575,
    magazine: 8,
    mode: 1,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 1.7,
    weight_H: 1.4,
  },
  {
    level_index: 6,
    rarity: 2,
    name: "M-76 Revenant",
    image: "AssaultRifle_Revenant.webp",
    ammo_capacity_L: 360,
    ammo_capacity_H: 480,
    damage_L: 63.6,
    damage_H: 79.5,
    magazine: 60,
    mode: 2,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 1.8,
    weight_H: 1.25,
  },
  {
    level_index: 5,
    rarity: 2,
    name: "M-37 Falcon",
    image: "AssaultRifle_Falcon.webp",
    ammo_capacity_L: 18,
    ammo_capacity_H: 28,
    damage_L: 279.2,
    damage_H: 349,
    magazine: 4,
    mode: 1,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 1.75,
    weight_H: 1,
    headshot_capable: false,
    armor_penalty: false,
  },
  {
    level_index: 1,
    rarity: 2,
    name: "Collector Rifle",
    image: "AssaultRifle_Collector.webp",
    ammo_capacity_L: 308,
    ammo_capacity_H: 392,
    damage_L: 55.4,
    damage_H: 69.2,
    magazine: 28,
    mode: 2,
    race: 10,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 1.6,
    weight_H: 1.2,
    dlc: true,
  },
  {
    level_index: 274,
    rarity: 2,
    name: "Striker Assault Rifle",
    image: "AssaultRifle_Krogan.webp",
    ammo_capacity_L: 60,
    ammo_capacity_H: 72,
    damage_L: 144.7,
    damage_H: 180.9,
    magazine: 12,
    mode: 2,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 2,
    weight_H: 1.4,
    headshot_capable: false,
    armor_penalty: false,
    dlc: true,
  },
  {
    level_index: 358,
    rarity: 3,
    name: "Particle Rifle",
    image: "AssaultRifle_Prothean_MP.webp",
    ammo_capacity_L: 0,
    ammo_capacity_H: 125,
    damage_L: 19.2,
    damage_H: 25.8,
    magazine: 100,
    mode: 2,
    race: 10,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 2,
    weight_H: 1.4,
    charged: true,
    charged_ammo: true,
    charged_damage: 4,
    dlc: true,
  },
  {
    level_index: 286,
    rarity: 3,
    name: "Cerberus Harrier",
    image: "AssaultRifle_Cerberus.webp",
    ammo_capacity_L: 80,
    ammo_capacity_H: 100,
    damage_L: 106.2,
    damage_H: 129.5,
    magazine: 20,
    mode: 2,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 1.75,
    weight_H: 1.25,
    dlc: true,
  },
  {
    level_index: 468,
    rarity: 3,
    name: "N7 Typhoon",
    image: "AssaultRifle_LMG.webp",
    ammo_capacity_L: 400,
    ammo_capacity_H: 500,
    damage_L: 44.4,
    damage_H: 55.5,
    magazine: 100,
    mode: 2,
    i: {
      organic: {
        health: 1,
        armor: 1.5,
        barrier: 1.5,
        shield: 1.5,
      },
    },
    weight_L: 2.5,
    weight_H: 2,
    charged: true,
    charged_ammo: true,
    charged_damage: 1.5,
    dlc: true,
  },
  {
    level_index: 626,
    rarity: 3,
    name: "Geth Spitfire",
    image: "AssaultRifle_Spitfire.webp",
    ammo_capacity_L: 600,
    ammo_capacity_H: 750,
    damage_L: 62.2,
    damage_H: 77.8,
    magazine: 220,
    mode: 2,
    race: 9,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1.75,
        shield: 1.75,
      },
    },
    weight_L: 3,
    weight_H: 2.5,
    dlc: true,
  },
  {
    level_index: 623,
    rarity: 3,
    name: "M-7 Lancer",
    image: "AssaultRifle_Lancer_MP.webp",
    ammo_capacity_L: 0,
    ammo_capacity_H: 57,
    damage_L: 67.9,
    damage_H: 84.8,
    magazine: 38,
    mode: 2,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 1.3,
    weight_H: 0.8,
    dlc: true,
  },
  {
    level_index: 627,
    rarity: 2,
    name: "Adas Anti-Synthetic Rifle",
    image: "AssaultRifle_Adas_MP.webp",
    ammo_capacity_L: 72,
    ammo_capacity_H: 96,
    damage_L: 178.1,
    damage_H: 222.6,
    magazine: 24,
    mode: 2,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 2,
        shield: 2,
      },
    },
    weight_L: 2,
    weight_H: 1.4,
    headshot_capable: false,
    armor_penalty: false,
    dlc: true,
  },
  {
    level_index: 289,
    rarity: 2,
    name: "Chakram Launcher",
    image: "AssaultRifle_Reckoning.webp",
    ammo_capacity_L: 40,
    ammo_capacity_H: 50,
    damage_L: 277.9,
    damage_H: 347.4,
    magazine: 4,
    mode: 2,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 1.75,
    weight_H: 1,
    charged: true,
    charged_damage: 3,
    charged_ammo: true,
    headshot_capable: false,
    armor_penalty: false,
  },
];

export const SUB_MACHINE_GUNS: Weapon[] = [
  {
    level_index: 28,
    rarity: 2,
    name: "M-25 Hornet",
    image: "SMG_Hornet.webp",
    ammo_capacity_L: 168,
    ammo_capacity_H: 216,
    damage_L: 53.7,
    damage_H: 67.2,
    magazine: 24,
    mode: 4,
    burst: 3,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 0.85,
    weight_H: 0.45,
  },
  {
    level_index: 29,
    rarity: 0,
    name: "M-4 Shuriken",
    image: "SMG_Shuriken.webp",
    ammo_capacity_L: 360,
    ammo_capacity_H: 468,
    damage_L: 38.7,
    damage_H: 48.3,
    magazine: 36,
    mode: 5,
    burst: 6,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 0.45,
    weight_H: 0.2,
  },
  {
    level_index: 264,
    rarity: 3,
    name: "N7 Hurricane",
    image: "SMG_Hurricane.webp",
    ammo_capacity_L: 280,
    ammo_capacity_H: 360,
    damage_L: 102.5,
    damage_H: 128.1,
    magazine: 40,
    mode: 2,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 0.85,
    weight_H: 0.45,
  },
  {
    level_index: 30,
    rarity: 1,
    name: "M-9 Tempest",
    image: "SMG_Tempest.webp",
    ammo_capacity_L: 400,
    ammo_capacity_H: 500,
    damage_L: 47.5,
    damage_H: 59.4,
    magazine: 50,
    mode: 2,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 0.65,
    weight_H: 0.3,
  },
  {
    level_index: 27,
    rarity: 1,
    name: "M-12 Locust",
    image: "SMG_Locust.webp",
    ammo_capacity_L: 275,
    ammo_capacity_H: 350,
    damage_L: 40.8,
    damage_H: 51,
    magazine: 25,
    mode: 2,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 0.65,
    weight_H: 0.3,
    headshot_modifier: 3,
  },
  {
    level_index: 276,
    rarity: 2,
    name: "Geth Plasma SMG",
    image: "SMG_Geth.webp",
    ammo_capacity_L: 600,
    ammo_capacity_H: 800,
    damage_L: 16.1,
    damage_H: 20.1,
    magazine: 100,
    mode: 2,
    race: 9,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 0.65,
    weight_H: 0.3,
    charged: true,
    charged_ammo: true,
    charged_damage: 2.5,
    dlc: true,
  },
  {
    level_index: 533,
    rarity: 3,
    name: "Collector SMG",
    image: "SMG_Collector.webp",
    ammo_capacity_L: 0,
    ammo_capacity_H: 40,
    damage_L: 41.2,
    damage_H: 51.5,
    magazine: 30,
    mode: 2,
    race: 10,
    i: {
      organic: {
        health: 1,
        armor: 1.5,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 0.85,
    weight_H: 0.45,
    dlc: true,
  },
  {
    level_index: 624,
    rarity: 3,
    name: "Blood Pack Punisher",
    image: "SMG_Bloodpack_MP.webp",
    ammo_capacity_L: 320,
    ammo_capacity_H: 400,
    damage_L: 40.1,
    damage_H: 50.1,
    magazine: 40,
    mode: 2,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 0.85,
    weight_H: 0.45,
    dlc: true,
  },
];

export const SHOTGUNS: Weapon[] = [
  {
    level_index: 17,
    rarity: 0,
    name: "M-23 Katana",
    image: "Shotgun_Katana.webp",
    ammo_capacity_L: 15,
    ammo_capacity_H: 25,
    damage_L: 48.1,
    damage_H: 60.2,
    magazine: 5,
    mode: 1,
    burst: 8,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 1.5,
    weight_H: 0.9,
  },
  {
    level_index: 16,
    rarity: 2,
    name: "Geth Plasma Shotgun",
    image: "Shotgun_Geth.webp",
    ammo_capacity_L: 15,
    ammo_capacity_H: 25,
    damage_L: 714.2,
    damage_H: 892.7,
    magazine: 5,
    mode: 1,
    burst: 1.6,
    race: 9,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 2,
    weight_H: 1.4,
    uncharged_modifier: 0.45,
    charged: true,
    headshot_capable: false,
    armor_penalty: false,
    charged_damage: 1,
  },
  {
    level_index: 137,
    rarity: 3,
    name: "M-11 Wraith",
    image: "Shotgun_Striker.webp",
    ammo_capacity_L: 18,
    ammo_capacity_H: 28,
    damage_L: 117.6,
    damage_H: 147,
    magazine: 2,
    mode: 1,
    burst: 8,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 1.2,
    weight_H: 0.9,
  },
  {
    level_index: 20,
    rarity: 1,
    name: "M-27 Scimitar",
    image: "Shotgun_Scimitar.webp",
    ammo_capacity_L: 24,
    ammo_capacity_H: 34,
    damage_L: 35.4,
    damage_H: 44.2,
    magazine: 8,
    mode: 2,
    burst: 8,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 1.15,
    weight_H: 0.6,
  },
  {
    level_index: 370,
    rarity: 2,
    name: "AT-12 Raider",
    image: "Shotgun_Raider.webp",
    ammo_capacity_L: 30,
    ammo_capacity_H: 40,
    damage_L: 100,
    damage_H: 125,
    magazine: 2,
    mode: 1,
    burst: 8,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 2,
    weight_H: 1.4,
  },
  {
    level_index: 18,
    rarity: 2,
    name: "Graal Spike Thrower",
    image: "Shotgun_Graal.webp",
    ammo_capacity_L: 12,
    ammo_capacity_H: 22,
    damage_L: 88,
    damage_H: 110,
    magazine: 3,
    mode: 1,
    burst: 6,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 2,
    weight_H: 1.4,
    charged: true,
    armor_penalty: false,
    charged_ammo: true,
    charged_damage: 2,
    headshot_modifier: 3,
  },
  {
    level_index: 15,
    rarity: 1,
    name: "M-22 Eviscerator",
    image: "Shotgun_Eviscerator.webp",
    ammo_capacity_L: 15,
    ammo_capacity_H: 25,
    damage_L: 64.6,
    damage_H: 80.7,
    magazine: 3,
    mode: 1,
    burst: 8,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 1.25,
    weight_H: 0.7,
  },
  {
    level_index: 19,
    rarity: 2,
    name: "Disciple",
    image: "Shotgun_Disciple.webp",
    ammo_capacity_L: 24,
    ammo_capacity_H: 34,
    damage_L: 55.6,
    damage_H: 69.5,
    magazine: 4,
    mode: 1,
    burst: 8,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 1,
    weight_H: 0.5,
  },
  {
    level_index: 262,
    rarity: 3,
    name: "N7 Crusader",
    image: "Shotgun_Crusader.webp",
    ammo_capacity_L: 20,
    ammo_capacity_H: 30,
    damage_L: 630.7,
    damage_H: 788.4,
    magazine: 4,
    mode: 1,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 2.3,
    weight_H: 2,
  },
  {
    level_index: 14,
    rarity: 2,
    name: "M-300 Claymore",
    image: "Shotgun_Claymore.webp",
    ammo_capacity_L: 8,
    ammo_capacity_H: 18,
    damage_L: 167.8,
    damage_H: 206,
    magazine: 1,
    mode: 0,
    burst: 8,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 2.5,
    weight_H: 2,
  },
  {
    level_index: 287,
    rarity: 2,
    name: "Reegar Carbine",
    image: "Shotgun_Quarian.webp",
    ammo_capacity_L: 66,
    ammo_capacity_H: 88,
    damage_L: 52.8,
    damage_H: 66,
    magazine: 22,
    mode: 2,
    burst: 8,
    i: {
      organic: {
        health: 1,
        armor: 0.5,
        barrier: 2,
        shield: 2,
      },
    },
    weight_L: 1.75,
    weight_H: 1.25,
    dlc: true,
  },
  {
    level_index: 469,
    rarity: 2,
    name: "N7 Piranha",
    image: "Shotgun_Assault.webp",
    ammo_capacity_L: 48,
    ammo_capacity_H: 64,
    damage_L: 61.7,
    damage_H: 77.1,
    magazine: 6,
    mode: 2,
    burst: 8,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 1.5,
    weight_H: 0.9,
    dlc: true,
  },
  {
    level_index: 525,
    rarity: 3,
    name: "Venom Shotgun",
    image: "Shotgun_Salarian_MP.webp",
    ammo_capacity_L: 12,
    ammo_capacity_H: 22,
    damage_L: 636,
    damage_H: 795,
    magazine: 4,
    mode: 1,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 2,
    weight_H: 1.4,
    charged: true,
    headshot_capable: false,
    armor_penalty: false,
    charged_ammo: true,
    charged_damage: 0.4166666666666667,
    charged_shots: 3,
    is_venom: true,
    dlc: true,
  },
];

export const PISTOLS: Weapon[] = [
  {
    level_index: 24,
    rarity: 1,
    name: "M-5 Phalanx",
    image: "Pistol_Phalanx.webp",
    ammo_capacity_L: 72,
    ammo_capacity_H: 90,
    damage_L: 114.8,
    damage_H: 143.5,
    magazine: 12,
    mode: 1,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 0.6,
    weight_H: 0.25,
  },
  {
    level_index: 22,
    rarity: 3,
    name: "M-358 Talon",
    image: "Pistol_Talon.webp",
    ammo_capacity_L: 24,
    ammo_capacity_H: 36,
    damage_L: 93.7,
    damage_H: 117.1,
    magazine: 4,
    mode: 1,
    burst: 6,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1.5,
        shield: 1.5,
      },
    },
    weight_L: 0.9,
    weight_H: 0.6,
  },
  {
    level_index: 23,
    rarity: 2,
    name: "Arc Pistol",
    image: "Pistol_Thor.webp",
    ammo_capacity_L: 72,
    ammo_capacity_H: 90,
    damage_L: 77.2,
    damage_H: 96.5,
    magazine: 18,
    mode: 1,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 1.1,
    weight_H: 0.6,
    charged: true,
    charged_ammo: true,
    charged_damage: 3,
    charged_shots: 3,
  },
  {
    level_index: 26,
    rarity: 3,
    name: "Scorpion",
    image: "Pistol_Scorpion.webp",
    ammo_capacity_L: 20,
    ammo_capacity_H: 30,
    damage_L: 375.2,
    damage_H: 469,
    magazine: 4,
    mode: 1,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 1.1,
    weight_H: 0.6,
    headshot_capable: false,
    armor_penalty: false,
  },
  {
    level_index: 25,
    rarity: 0,
    name: "M-3 Predator",
    image: "Pistol_Predator.webp",
    ammo_capacity_L: 90,
    ammo_capacity_H: 112,
    damage_L: 58.8,
    damage_H: 73.5,
    magazine: 15,
    mode: 1,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 0.5,
    weight_H: 0.2,
  },
  {
    level_index: 138,
    rarity: 3,
    name: "M-77 Paladin",
    image: "Pistol_Ivory.webp",
    ammo_capacity_L: 21,
    ammo_capacity_H: 33,
    damage_L: 424.9,
    damage_H: 531.1,
    magazine: 3,
    mode: 1,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 1,
    weight_H: 0.7,
    dlc: true,
  },
  {
    level_index: 263,
    rarity: 3,
    name: "N7 Eagle",
    image: "Pistol_Eagle.webp",
    ammo_capacity_L: 192,
    ammo_capacity_H: 240,
    damage_L: 86.1,
    damage_H: 107.7,
    magazine: 24,
    mode: 2,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 0.45,
    weight_H: 0.25,
  },
  {
    level_index: 21,
    rarity: 2,
    name: "M-6 Carnifex",
    image: "Pistol_Carnifex.webp",
    ammo_capacity_L: 30,
    ammo_capacity_H: 40,
    damage_L: 276.1,
    damage_H: 345.1,
    magazine: 6,
    mode: 1,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 1.2,
    weight_H: 0.7,
  },
  {
    level_index: 470,
    rarity: 2,
    name: "Acolyte",
    image: "Pistol_Asari.webp",
    ammo_capacity_L: 12,
    ammo_capacity_H: 24,
    damage_L: 420.2,
    damage_H: 490,
    magazine: 3,
    mode: 1,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 5,
        shield: 5,
      },
    },
    weight_L: 0.5,
    weight_H: 0.2,
    headshot_capable: false,
    armor_penalty: false,
    dlc: true,
  },
  {
    level_index: 629,
    rarity: 2,
    name: "M-11 Suppressor",
    image: "Pistol_Silencer_MP.webp",
    ammo_capacity_L: 30,
    ammo_capacity_H: 40,
    damage_L: 125.7,
    damage_H: 157.1,
    magazine: 6,
    mode: 1,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 1.2,
    weight_H: 0.7,
    headshot_modifier: 4,
  },
  {
    level_index: 628,
    rarity: 2,
    name: "Executioner Pistol",
    image: "Pistol_Bloodpack_MP.webp",
    ammo_capacity_L: 15,
    ammo_capacity_H: 25,
    damage_L: 784.9,
    damage_H: 981.1,
    magazine: 1,
    mode: 0,
    i: {
      organic: {
        health: 1,
        armor: 1,
        barrier: 1,
        shield: 1,
      },
    },
    weight_L: 1.2,
    weight_H: 0.7,
    dlc: true,
  },
];

export const WEAPON_CATEGORIES: Category<Weapon>[] = [
  { name: "Sniper Rifles", values: SNIPER_RIFLES },
  { name: "Assault Rifles", values: ASSAULT_RIFLES },
  { name: "Sub Machine Guns", values: SUB_MACHINE_GUNS },
  { name: "Shotguns", values: SHOTGUNS },
  { name: "Pistols", values: PISTOLS },
];
