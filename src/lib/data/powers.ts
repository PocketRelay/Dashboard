export interface Power {
  id: number;
  h?: string[];
  g?: boolean;
  Z?: any;
  iconSet: string;
  i?: {
    health?: number;
    armor?: number;
    barrier?: number;
    shield?: number;
  };
  type?: 0 | 1 | 2;
  M?: boolean;
  powerType?: PowerType;
  evolutions: PowerEvolution[];
  is_biotic_primer?: boolean;
  is_grenade_power?: boolean;
  is_inferno_glitched?: boolean;
  cryo?: boolean;
  pb?: string;
  mutually_exclusive?: number[];
  internalName: string;
}

export function replaceTemplates(
  template: string,
  data: Partial<Record<string, any>>
) {
  // Regular expression to match template placeholders like {ATTR_DMG}
  var regex = /{([^}]+)}/g;

  // Replace placeholders with values from the data object
  return template.replace(regex, function (match, key) {
    return data[key] || match; // Replace with value from data or keep the placeholder if not found
  });
}

export interface PowerEvolution {
  // Name of the power evolution
  name: string;
  // Description of the evolution
  description: string;
  // Attributes the power evolution affects
  attributes: Record<string, any>;
}

enum PowerType {
  NONE = 0,
  BIOTIC = 1,
  TECH = 2,
}
const createPowers = <T extends Record<string, Power>>(powers: T) => powers;

// Every MP player has these powers:
// Consumable_Rocket 88 1.0000 0 0 0 0 0 0 0 False,Consumable_Revive 87 1.0000 0 0 0 0 0 0 0 False,Consumable_Shield 89 1.0000 0 0 0 0 0 0 0 False,Consumable_Ammo 86 1.0000 0 0 0 0 0 0 0 False

export interface InternalPower {
  id: number;
  name: string;
}

export const INTERNAL_POWERS: InternalPower[] = [
  { id: 88, name: "Consumable_Rocket" },
  { id: 87, name: "Consumable_Revive" },
  { id: 89, name: "Consumable_Shield" },
  { id: 86, name: "Consumable_Ammo" },
];

export const POWERS = createPowers({
  sc: {
    id: 139,
    h: ["baseRechargeSpeed", "duration", "weaponDamage", "damageReduction"],
    g: true,
    iconSet: "AdrenalineRush",
    evolutions: [
      {
        name: "Adrenaline Rush",
        description:
          "Accelerate reflexes, granting time to line up the perfect shot.\n\nMore weapon damage.",
        attributes: {
          baseRechargeSpeed: 6,
          duration: 4,
          weaponDamage: 0.5,
          damageReduction: 0,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Duration",
        description: "Increase power duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.3,
        },
      },
      {
        name: "Hardening",
        description:
          "Decrease health and shield damage taken by {damageReduction}%.",
        attributes: {
          damageReduction: 0.4,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.2,
        },
      },
      {
        name: "Duration",
        description: "Increase power duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.4,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.5,
        },
      },
      {
        name: "Shield Boost",
        description: "Increase shield strength by {shieldStrength}%.",
        attributes: {
          shieldStrength: 1,
        },
      },
      {
        name: "Power Use",
        description:
          "Use {ATTR_INT} offensive power while Adrenaline Rush is active.",
        attributes: {
          ATTR_INT: 1,
        },
      },
    ],
    internalName: "AdrenalineRush",
  },
  bd: {
    id: 433,
    Z: {
      damage: "Blast Damage",
    },
    h: ["baseRechargeSpeed", "dot", "duration", "radius", "damage"],
    g: true,
    iconSet: "AnnihilationSphere",
    evolutions: [
      {
        name: "Annihilation Field",
        description:
          "Spin this fiery effect around you to burn nearby enemies. When active, the field can be recast to blast a short-range area and to detonate combos.",
        attributes: {
          baseRechargeSpeed: 8,
          dot: 100,
          duration: 45,
          radius: 4,
          damage: 500,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Impact Radius",
        description: "Increase impact radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.3,
        },
      },
      {
        name: "Damage Taken",
        description:
          "Targets caught in the field take {enemyDamageTaken}% additional damage from all sources.",
        attributes: {
          enemyDamageTaken: 0.15,
        },
      },
      {
        name: "Movement Speed",
        description:
          "Increase movement speed by {movementSpeed}% while active.",
        attributes: {
          movementSpeed: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.65,
        },
      },
      {
        name: "Drain",
        description:
          "Increase duration by {powerDuration}%.\nDrain {ATTR_PCT}% of the damage done to enemy shields/barriers to restore your own shields.",
        attributes: {
          powerDuration: 1,
          ATTR_PCT: 1,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1.5,
      barrier: 1.5,
      shield: 1,
    },
    type: 1,
    is_biotic_primer: true,
    internalName: "AnnihilationSphere",
  },
  bd2: {
    id: 556,
    Z: {
      damage: "Blast Damage",
    },
    h: ["baseRechargeSpeed", "dot", "duration", "radius", "damage"],
    g: true,
    iconSet: "AnnihilationSphere",
    evolutions: [
      {
        name: "Annihilation Field",
        description:
          "Spin this fiery effect around you to burn nearby enemies. When active, the field can be recast to blast a short-range area and to detonate combos.",
        attributes: {
          baseRechargeSpeed: 8,
          dot: 100,
          duration: 45,
          radius: 4,
          damage: 500,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Impact Radius",
        description: "Increase impact radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.3,
        },
      },
      {
        name: "Damage Taken",
        description:
          "Targets caught in the field take {enemyDamageTaken}% additional damage from all sources.",
        attributes: {
          enemyDamageTaken: 0.15,
        },
      },
      {
        name: "Movement Speed",
        description:
          "Increase movement speed by {movementSpeed}% while active.",
        attributes: {
          movementSpeed: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.65,
        },
      },
      {
        name: "Drain",
        description:
          "Increase duration by {powerDuration}%.\nDrain {ATTR_PCT}% of the damage done to enemy shields/barriers to restore your own shields.",
        attributes: {
          powerDuration: 1,
          ATTR_PCT: 1,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1.5,
      barrier: 1.5,
      shield: 1,
    },
    type: 1,
    is_biotic_primer: true,
    internalName: "AnnihilationSphere",
  },
  uj: {
    id: 474,
    h: ["damage", "radius"],
    g: false,
    iconSet: "EMPGrenade",
    M: true,
    evolutions: [
      {
        name: "Arc Grenade",
        description:
          "Stun and electrocute your enemies with an EMP-packed grenade. Effective against shields and barriers.",
        attributes: {
          damage: 400,
          radius: 6,
        },
      },
      {
        name: "Max Grenades",
        description: "Increase grenade capacity by {grenadeCapacity}.",
        attributes: {
          grenadeCapacity: 1,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.3,
        },
      },
      {
        name: "Max Grenades",
        description: "Increase grenade capacity by {grenadeCapacity}.",
        attributes: {
          grenadeCapacity: 1,
        },
      },
      {
        name: "Electrical Damage",
        description:
          "Add an electrical effect that does {powerDOT}% additional damage over {ATTR_TIME} seconds.",
        attributes: {
          powerDOT: 0.4,
          ATTR_TIME: 10,
        },
      },
      {
        name: "Armor-Piercing",
        description: "Increase damage to armor by {powerDamageArmor}%.",
        attributes: {
          powerDamageArmor: 0.75,
        },
      },
      {
        name: "Shield Overload",
        description:
          "Increase damage to shields and barriers by {powerDamageBarrier}%.",
        attributes: {
          powerDamageBarrier: 0.75,
          powerDamageShield: 0.75,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1,
      barrier: 2,
      shield: 2,
    },
    is_grenade_power: true,
    type: 2,
    internalName: "EMPGrenade",
  },
  Of: {
    id: 362,
    h: ["damage", "radius"],
    g: false,
    iconSet: "EMPGrenade",
    M: true,
    evolutions: [
      {
        name: "Arc Grenade",
        description:
          "Stun and electrocute your enemies with an EMP-packed grenade. Effective against shields and barriers.",
        attributes: {
          damage: 400,
          radius: 8,
        },
      },
      {
        name: "Max Grenades",
        description: "Increase grenade capacity by {grenadeCapacity}.",
        attributes: {
          grenadeCapacity: 1,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.3,
        },
      },
      {
        name: "Max Grenades",
        description: "Increase grenade capacity by {grenadeCapacity}.",
        attributes: {
          grenadeCapacity: 1,
        },
      },
      {
        name: "Electrical Damage",
        description:
          "Add an electrical effect that does {powerDOT}% additional damage over {ATTR_TIME} seconds.",
        attributes: {
          powerDOT: 0.4,
          ATTR_TIME: 10,
        },
      },
      {
        name: "Armor-Piercing",
        description: "Increase damage to armor by {powerDamageArmor}%.",
        attributes: {
          powerDamageArmor: 0.75,
        },
      },
      {
        name: "Shield Overload",
        description:
          "Increase damage to shields and barriers by {powerDamageBarrier}%.",
        attributes: {
          powerDamageBarrier: 0.75,
          powerDamageShield: 0.75,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1,
      barrier: 2,
      shield: 2,
    },
    is_grenade_power: true,
    type: 2,
    internalName: "EMPGrenade",
  },
  ae: {
    id: 587,
    h: ["bonusGrenade", "bow", "arrowCount"],
    g: true,
    iconSet: "BowModalTwo",
    M: true,
    evolutions: [
      {
        name: "Armor-Piercing Arrows",
        description:
          "Load {ATTR_INT} armor-piercing charges into your omni-bow to increase damage as well as the number of arrows fired simultaneously. When you run out of these armor-piercing charges, you will fire normal arrows again.\n\nHighly effective against armor.\nConsumes a grenade.",
        attributes: {
          bonusGrenade: 1,
          bow: 75,
          arrowCount: 5,
          ATTR_INT: 3,
        },
      },
      {
        name: "Grenade Capacity",
        description: "Increase grenade capacity by {grenadeCapacity}.",
        attributes: {
          bonusGrenade: 1,
          grenadeCapacity: 1,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Grenade Capacity",
        description: "Increase grenade capacity by {grenadeCapacity}.",
        attributes: {
          bonusGrenade: 1,
          grenadeCapacity: 1,
        },
      },
      {
        name: "Shred",
        description:
          "Shreds targets, doing an additional {powerDOT}% damage over {ATTR_TIME} seconds.",
        attributes: {
          powerDOT: 0.5,
          ATTR_TIME: 5,
        },
      },
      {
        name: "Armor Damage",
        description:
          "Increase damage done to armor by {powerDamageArmor}% to weaken the target's armor resistance to weapons by {arrowArmorWeakening}% for {ATTR_TIME} seconds.",
        attributes: {
          powerDamageArmor: 0.35,
          arrowArmorWeakening: 0.5,
          ATTR_TIME: 8,
        },
      },
      {
        name: "Arrow Count",
        description:
          "Increase the number of arrows released per shot by {arrowCount}.",
        attributes: {
          arrowCount: 1,
        },
      },
      {
        name: "Grenade Capacity",
        description: "Increase grenade capacity by {grenadeCapacity}.",
        attributes: {
          bonusGrenade: 2,
          grenadeCapacity: 2,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1.5,
      barrier: 1,
      shield: 1,
    },
    pb: "",
    is_grenade_power: true,
    mutually_exclusive: [1, 2],
    internalName: "BowModalTwo",
  },
  fe: {
    id: 231,
    h: ["baseRechargeSpeed", "damage", "duration", "radius"],
    g: false,
    iconSet: "BatarianAttack",
    evolutions: [
      {
        name: "Ballistic Blades",
        description:
          "Fire a salvo of blades to impale your enemies, inflicting massive bleed damage.\n\nThe closer your target is, the more damage you deal.",
        attributes: {
          baseRechargeSpeed: 8,
          damage: 900,
          duration: 10,
          radius: 12,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Cone Spread",
        description: "Increase cone spread by {ATTR_INT} degrees.",
        attributes: {
          ATTR_INT: 20,
        },
      },
      {
        name: "Range",
        description: "Increase attack range by {rangePct}%.",
        attributes: {
          rangePct: 0.5,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.35,
        },
      },
      {
        name: "Damage & Bleed",
        description:
          "Increase damage by {powerDamage}%.\nIncrease bleed duration by {powerDuration}%.",
        attributes: {
          powerDamage: 0.5,
          powerDuration: 0.5,
        },
      },
      {
        name: "Explosive Blades",
        description:
          "Blades explode after {ATTR_TIME} seconds, doing {bladeDamage} damage but ending the bleed effect.",
        attributes: {
          ATTR_TIME: 3,
          bladeDamage: 400,
        },
      },
    ],
    internalName: "BatarianAttack",
  },
  rb: {
    id: 545,
    Z: {
      armor: "Blast Damage",
      radius: "Blast Radius",
    },
    h: ["baseRechargeSpeed", "damageReduction", "armor", "radius"],
    g: true,
    iconSet: "Barrier",
    evolutions: [
      {
        name: "Barrier",
        description:
          "Reinforce armor with this biotic field. Detonate the field to lift and dangle nearby targets.\n\nReduce all forms of damage taken.\nSlows power use by {globalRecharge}%.",
        attributes: {
          baseRechargeSpeed: 6,
          damageReduction: 0.25,
          armor: 500,
          radius: 3,
          globalRecharge: -0.5,
        },
      },
      {
        name: "Recharge",
        description:
          "Increase recharge speed after detonation by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
          powerDamage: 0.3,
          powerForce: 0.3,
          radiusPct: 0.3,
        },
      },
      {
        name: "Blast Effect",
        description:
          "Increase the damage, force, and radius of the detonation by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
          powerForce: 0.2,
          radiusPct: 0.2,
        },
      },
      {
        name: "Blast Effect",
        description:
          "Increase the damage, force, and radius of the detonation by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
          powerForce: 0.3,
          radiusPct: 0.3,
        },
      },
      {
        name: "Barrier Strength",
        description: "Decrease damage taken by {damageReduction}%.",
        attributes: {
          damageReduction: 0.05,
        },
      },
      {
        name: "Shield Recharge",
        description:
          "Increase shield regeneration rate by {shieldRechargeRate}% while Barrier is active.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Power Synergy",
        description:
          "Increase damage and force by {globalPowerDamage}% while Barrier is active.",
        attributes: {
          globalPowerDamage: 0.3,
          globalPowerForce: 0.3,
        },
      },
      {
        name: "Power Recharge",
        description: "Reduce power speed penalty by {globalRecharge}%.",
        attributes: {
          globalRecharge: 0.3,
        },
      },
      {
        name: "Barrier Strength",
        description: "Increase damage protection by {damageReduction}%.",
        attributes: {
          damageReduction: 0.1,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1,
      barrier: 1.5,
      shield: 1,
    },
    pb: "",
    type: 1,
    internalName: "Barrier",
  },
  rb2: {
    id: 66,
    Z: {
      armor: "Blast Damage",
      radius: "Blast Radius",
    },
    h: ["baseRechargeSpeed", "damageReduction", "armor", "radius"],
    g: true,
    iconSet: "Barrier",
    evolutions: [
      {
        name: "Barrier",
        description:
          "Reinforce armor with this biotic field. Detonate the field to lift and dangle nearby targets.\n\nReduce all forms of damage taken.\nSlows power use by {globalRecharge}%.",
        attributes: {
          baseRechargeSpeed: 6,
          damageReduction: 0.25,
          armor: 500,
          radius: 3,
          globalRecharge: -0.5,
        },
      },
      {
        name: "Recharge",
        description:
          "Increase recharge speed after detonation by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
          powerDamage: 0.3,
          powerForce: 0.3,
          radiusPct: 0.3,
        },
      },
      {
        name: "Blast Effect",
        description:
          "Increase the damage, force, and radius of the detonation by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
          powerForce: 0.2,
          radiusPct: 0.2,
        },
      },
      {
        name: "Blast Effect",
        description:
          "Increase the damage, force, and radius of the detonation by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
          powerForce: 0.3,
          radiusPct: 0.3,
        },
      },
      {
        name: "Barrier Strength",
        description: "Decrease damage taken by {damageReduction}%.",
        attributes: {
          damageReduction: 0.05,
        },
      },
      {
        name: "Shield Recharge",
        description:
          "Increase shield regeneration rate by {shieldRechargeRate}% while Barrier is active.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Power Synergy",
        description:
          "Increase damage and force by {globalPowerDamage}% while Barrier is active.",
        attributes: {
          globalPowerDamage: 0.3,
          globalPowerForce: 0.3,
        },
      },
      {
        name: "Power Recharge",
        description: "Reduce power speed penalty by {globalRecharge}%.",
        attributes: {
          globalRecharge: 0.3,
        },
      },
      {
        name: "Barrier Strength",
        description: "Increase damage protection by {damageReduction}%.",
        attributes: {
          damageReduction: 0.1,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1,
      barrier: 1.5,
      shield: 1,
    },
    pb: "",
    type: 1,
    internalName: "Barrier",
  },
  lb: {
    id: 143,
    Z: {
      barrierRestored: "Barrier Restored",
    },
    h: [
      "baseRechargeSpeed",
      "damage",
      "force",
      "barrierRestored",
      "damageReduction",
    ],
    g: true,
    iconSet: "BioticCharge",
    evolutions: [
      {
        name: "Biotic Charge",
        description:
          "Smash into a target while encased in this biotic barrier, leveling your opponents.\n\nInvulnerable while this power is in effect.",
        attributes: {
          barrierRestored: 0.5,
          damage: 400,
          force: 650,
          baseRechargeSpeed: 10,
          damageReduction: 0.5,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Force & Damage",
        description: "Increase damage and force by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
          powerForce: 0.3,
        },
      },
      {
        name: "Force & Damage",
        description: "Increase damage and force by {powerDamage}%.",
        attributes: {
          powerDamage: 0.4,
          powerForce: 0.4,
        },
      },
      {
        name: "Radius",
        description:
          "Hit up to {areaTargetBonus} additional targets within {radius} meters of the impact point.",
        attributes: {
          areaTargetBonus: 2,
          radius: 2,
        },
      },
      {
        name: "Weapon Synergy",
        description:
          "Increase weapon damage by {weaponDamage}% for {ATTR_TIME} seconds after a successful Biotic Charge.",
        attributes: {
          weaponDamage: 0.25,
          ATTR_TIME: 5,
        },
      },
      {
        name: "Power Synergy",
        description:
          "Increase power damage and force by {globalPowerDamage}% for {ATTR_TIME} seconds after a successful Biotic Charge.",
        attributes: {
          globalPowerDamage: 0.4,
          globalPowerForce: 0.4,
          ATTR_TIME: 10,
        },
      },
      {
        name: "Bonus Power",
        description:
          "Give Biotic Charge a {ATTR_PCT}% chance of not triggering a cooldown.",
        attributes: {
          ATTR_PCT: 0.5,
        },
      },
      {
        name: "Barrier",
        description:
          "Increase barriers by an additional {barrierRestored}% after a successful Biotic Charge.",
        attributes: {
          barrierRestored: 0.5,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1,
      barrier: 1.5,
      shield: 1,
    },
    type: 1,
    internalName: "BioticCharge",
  },
  Kk: {
    id: 63,
    Z: {
      barrierRestored: "Barrier Restored",
    },
    h: [
      "baseRechargeSpeed",
      "damage",
      "force",
      "barrierRestored",
      "damageReduction",
    ],
    g: true,
    iconSet: "KroganBioticCharge",
    evolutions: [
      {
        name: "Biotic Charge",
        description:
          "Smash into a target while encased in this biotic barrier, leveling your opponents.\n\nInvulnerable while this power is in effect.",
        attributes: {
          barrierRestored: 0.5,
          baseRechargeSpeed: 14,
          damage: 500,
          force: 750,
          damageReduction: 0.5,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Force & Damage",
        description: "Increase damage and force by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
          powerForce: 0.3,
        },
      },
      {
        name: "Force & Damage",
        description: "Increase damage and force by {powerDamage}%.",
        attributes: {
          powerDamage: 0.4,
          powerForce: 0.4,
        },
      },
      {
        name: "Radius",
        description:
          "Hit up to {areaTargetBonus} additional targets within {radius} meters of the impact point.",
        attributes: {
          areaTargetBonus: 2,
          radius: 2,
        },
      },
      {
        name: "Weapon Synergy",
        description:
          "Increase weapon damage by {weaponDamage}% for {ATTR_TIME} seconds after a successful Biotic Charge.",
        attributes: {
          weaponDamage: 0.25,
          ATTR_TIME: 5,
        },
      },
      {
        name: "Melee Synergy",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after a successful Biotic Charge.",
        attributes: {
          meleeDamage: 0.4,
          ATTR_TIME: 5,
        },
      },
      {
        name: "Bonus Power",
        description:
          "Give Biotic Charge a {ATTR_PCT}% chance of not triggering a cooldown.",
        attributes: {
          ATTR_PCT: 0.5,
        },
      },
      {
        name: "Barrier",
        description:
          "Increase barriers by an additional {barrierRestored}% after a successful Biotic Charge.",
        attributes: {
          barrierRestored: 0.5,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1,
      barrier: 1.5,
      shield: 1,
    },
    type: 1,
    internalName: "KroganBioticCharge",
  },
  he: {
    id: 622,
    h: [
      "baseRechargeSpeed",
      "duration",
      "damageReduction",
      "meleeDamage",
      "movementSpeed",
    ],
    g: true,
    iconSet: "BioticFocus",
    evolutions: [
      {
        name: "Biotic Focus",
        description:
          "Focus your biotic energy and atavistic muscle structure to decrease damage taken and to increase melee damage and movement speed for a short time.",
        attributes: {
          baseRechargeSpeed: 10,
          damageReduction: 0.15,
          duration: 12,
          meleeDamage: 0.15,
          movementSpeed: 0.1,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Duration",
        description: "Increase power duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.3,
        },
      },
      {
        name: "Damage Taken",
        description: "Decrease damage taken by {damageReduction}%.",
        attributes: {
          damageReduction: 0.1,
        },
      },
      {
        name: "Movement Speed",
        description: "Increase movement speed by {movementSpeed}%.",
        attributes: {
          movementSpeed: 0.075,
        },
      },
      {
        name: "Duration",
        description: "Increase duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.4,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Biotic Shield",
        description:
          "Activate to regenerate barriers by {barrierRestored}% and to gain an invulnerability effect for {ATTR_TIME} seconds.",
        attributes: {
          barrierRestored: 0.4,
          ATTR_TIME: 0.5,
        },
      },
      {
        name: "Heightened Focus",
        description:
          "Enter a heightened biotic state to reduce damage taken by {damageReduction}% and to increase movement speed by {movementSpeed}% and melee damage by {meleeDamage}%.",
        attributes: {
          damageReduction: 0.2,
          meleeDamage: 0.3,
          movementSpeed: 0.075,
        },
      },
    ],
    internalName: "BioticFocus",
  },
  ie: {
    id: 609,
    h: ["baseRechargeSpeed", "hammer", "force", "hammerCharges"],
    g: false,
    iconSet: "BioticHammerModal",
    evolutions: [
      {
        name: "Biotic Hammer",
        description:
          "Charge your hammer with biotic energy, drastically increasing direct damage and force. Your melee attacks will expend these charges.\n\nHighly effective against armor and barriers.",
        attributes: {
          baseRechargeSpeed: 18,
          hammer: 750,
          force: 500,
          hammerCharges: 1,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Force & Damage",
        description: "Increase damage and force by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
          powerForce: 0.2,
        },
      },
      {
        name: "Force & Damage",
        description:
          "Increase damage by {powerDamage}%.\nIncrease force by {powerForce}%.",
        attributes: {
          powerDamage: 0.3,
          powerForce: 0.4,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.35,
        },
      },
      {
        name: "Biotic Combo",
        description:
          "Increase damage and force of biotic detonations by {comboDamage}%.",
        attributes: {
          comboDamage: 0.5,
          comboForce: 0.5,
        },
      },
      {
        name: "Armor Damage",
        description: "Increase damage done to armor by {ATTR_PCT}%.",
        attributes: {
          ATTR_PCT: 0.5,
          powerDamageArmor: 0.75,
        },
      },
      {
        name: "Power Hammer",
        description:
          "Increase the force of impacts by {powerForce}%.\nImpact passes through armor, shields, or barriers to knock down humanoid targets.",
        attributes: {
          powerForce: 1,
        },
      },
      {
        name: "Number of Charges",
        description:
          "Increase the number of charges generated by Biotic Hammer by {hammerCharges}.",
        attributes: {
          hammerCharges: 1,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1.5,
      barrier: 1.5,
      shield: 1,
    },
    type: 1,
    internalName: "BioticHammerModal",
  },
  ed: {
    id: 483,
    Z: {
      orbRecharge: "Recharge Speed Per Orb",
    },
    h: ["baseRechargeSpeed", "damage", "radius", "orbRecharge"],
    g: true,
    iconSet: "BioticOrbs",
    internalName: "BIOTICORBS",
    evolutions: [
      {
        name: "Biotic Orbs",
        description:
          "Summon {bioticOrbs} biotic orbs to float around you. Use the power again to launch an orb at your target. Each floating orb increases the recharge speed of your powers by {orbRecharge}%.\n\nHighly effective against armor and barriers.",
        attributes: {
          baseRechargeSpeed: 24,
          damage: 250,
          radius: 1.5,
          bioticOrbs: 3,
          orbRecharge: 0.1,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Impact Radius",
        description: "Increase impact radius by {radiusPct}%.",
        attributes: {
          radiusPct: 1,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.4,
        },
      },
      {
        name: "Recharge Speed",
        description:
          "Increase the recharge speed bonus of each orb by {orbRecharge}%.",
        attributes: {
          orbRecharge: 0.05,
        },
      },
      {
        name: "Expose",
        description:
          "Each orb impact causes the target to take {ATTR_PCT}% more damage from all sources for {ATTR_TIME} seconds. This effect can stack up to {ATTR_INT} times.",
        attributes: {
          ATTR_PCT: 0.15,
          enemyDamageTaken: 0.45,
          ATTR_TIME: 6,
          ATTR_INT: 3,
        },
      },
      {
        name: "Orb Count",
        description:
          "Increase the number of orbs summoned by {bioticOrbs}. This also boosts the maximum recharge speed bonus applied by the orbs.",
        attributes: {
          bioticOrbs: 1,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1.5,
      barrier: 1.5,
      shield: 1,
    },
    type: 1,
  },
  je: {
    id: 400,
    h: ["baseRechargeSpeed", "damage", "range", "radius"],
    g: false,
    iconSet: "SonicSlash",
    evolutions: [
      {
        name: "Biotic Slash",
        description:
          "Charge your sword with biotic energy and slash nearby enemies in a wide swath, flattening unshielded opponents.",
        attributes: {
          baseRechargeSpeed: 8,
          damage: 550,
          range: 20,
          radius: 2,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.3,
        },
      },
      {
        name: "Detonate",
        description:
          "Increase force and damage of biotic detonations by {comboDamage}%.",
        attributes: {
          comboDamage: 0.5,
          comboForce: 0.5,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.4,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.5,
        },
      },
      {
        name: "Range",
        description: "Increase range by {rangePct}%.",
        attributes: {
          rangePct: 0.5,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1.5,
      barrier: 1.5,
      shield: 1,
    },
    type: 1,
    internalName: "SonicSlash",
  },
  ke: {
    id: 68,
    h: [
      "baseRechargeSpeed",
      "duration",
      "radius",
      "damageReduction",
      "enemyDamageTaken",
    ],
    g: true,
    iconSet: "BubbleShield",
    evolutions: [
      {
        name: "Biotic Sphere",
        description:
          "Create a defensive shield that surrounds the caster and nearby allies.\n\nMore damage dealt to enemies entering the shielded area.",
        attributes: {
          baseRechargeSpeed: 6,
          duration: 30,
          radius: 3,
          damageReduction: 0.2,
          enemyDamageTaken: 0.1,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Duration",
        description: "Increase duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.3,
        },
      },
      {
        name: "Shield Regeneration",
        description:
          "Keep allies within the shield to decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Radius",
        description: "Increase the shield's radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.3,
        },
      },
      {
        name: "Damage Reduction",
        description:
          "Increase damage reduction to allies within the shield by {damageReduction}%.",
        attributes: {
          damageReduction: 0.1,
        },
      },
      {
        name: "Enemy Weakness",
        description:
          "Increase the damage taken by enemies within the shielded area by an additional {enemyDamageTaken}%.",
        attributes: {
          enemyDamageTaken: 0.15,
        },
      },
      {
        name: "Allied Protection",
        description:
          "Decrease the damage that shielded allies take by {damageReduction}%.\nDecrease the delay before shields regenerate by {shieldRechargeRate}%.",
        attributes: {
          damageReduction: 0.1,
          shieldRechargeRate: 0.1,
        },
      },
      {
        name: "Warp Effect",
        description:
          "Hit enemies inside the shield with Warp, dealing {ATTR_DMG} damage per second and reducing armor by {enemyArmorWeakening}%.\n\nAffect up to {ATTR_INT} enemies at a time.\nSet an enemy up for a biotic detonation.",
        attributes: {
          ATTR_DMG: 50,
          enemyArmorWeakening: 0.25,
          ATTR_INT: 3,
        },
      },
    ],
    type: 1,
    is_biotic_primer: true,
    internalName: "BubbleShield",
  },
  tc: {
    id: 241,
    Z: {
      meleeReflect: "Melee Damage Returned",
    },
    h: ["baseRechargeSpeed", "damageReduction", "meleeDamage", "meleeReflect"],
    g: true,
    iconSet: "BatarianArmor",
    evolutions: [
      {
        name: "Blade Armor",
        description:
          "Reinforce armor with razor-sharp blades to damage enemies that melee.\n\nLess damage taken.\nMore melee damage dealt.\nSlows power use by {globalRecharge}%.",
        attributes: {
          baseRechargeSpeed: 3,
          damageReduction: 0.25,
          meleeDamage: 0.15,
          meleeReflect: 0.16,
          globalRecharge: -0.5,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.1,
        },
      },
      {
        name: "Durability",
        description: "Increase damage protection by {damageReduction}%.",
        attributes: {
          damageReduction: 0.05,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.15,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase shield recharge rate by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Damage Returned",
        description:
          "Increase damage returned to targets that melee you by {meleeReflect}%.",
        attributes: {
          meleeReflect: 0.24,
        },
      },
      {
        name: "Power Recharge",
        description: "Reduce power speed penalty by {globalRecharge}%.",
        attributes: {
          globalRecharge: 0.3,
        },
      },
      {
        name: "Durability",
        description:
          "Increase damage protection by an additional {damageReduction}%.",
        attributes: {
          damageReduction: 0.1,
        },
      },
    ],
    internalName: "BatarianArmor",
  },
  tc2: {
    id: 557,
    Z: {
      meleeReflect: "Melee Damage Returned",
    },
    h: ["baseRechargeSpeed", "damageReduction", "meleeDamage", "meleeReflect"],
    g: true,
    iconSet: "BatarianArmor",
    evolutions: [
      {
        name: "Blade Armor",
        description:
          "Reinforce armor with razor-sharp blades to damage enemies that melee.\n\nLess damage taken.\nMore melee damage dealt.\nSlows power use by {globalRecharge}%.",
        attributes: {
          baseRechargeSpeed: 3,
          damageReduction: 0.25,
          meleeDamage: 0.15,
          meleeReflect: 0.16,
          globalRecharge: -0.5,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.1,
        },
      },
      {
        name: "Durability",
        description: "Increase damage protection by {damageReduction}%.",
        attributes: {
          damageReduction: 0.05,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.15,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase shield recharge rate by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Damage Returned",
        description:
          "Increase damage returned to targets that melee you by {meleeReflect}%.",
        attributes: {
          meleeReflect: 0.24,
        },
      },
      {
        name: "Power Recharge",
        description: "Reduce power speed penalty by {globalRecharge}%.",
        attributes: {
          globalRecharge: 0.3,
        },
      },
      {
        name: "Durability",
        description:
          "Increase damage protection by an additional {damageReduction}%.",
        attributes: {
          damageReduction: 0.1,
        },
      },
    ],
    internalName: "BatarianArmor",
  },
  uc: {
    id: 285,
    Z: {
      bloodlustMovementSpeed: "Movement Speed",
      bloodlustMeleeDamage: "Melee Damage",
    },
    h: [
      "baseRechargeSpeed",
      "duration",
      "bloodlustMovementSpeed",
      "bloodlustHOT",
      "bloodlustMeleeDamage",
    ],
    g: true,
    iconSet: "Bloodlust",
    evolutions: [
      {
        name: "Bloodlust",
        description:
          "The vorcha flies into a frenzy, increasing movement speed, health regeneration, and melee damage. Each kill intensifies these effects and can stack up to three times.\n\nAdditional stacks last for {duration} seconds.\nSlows power use by {globalRecharge}%.\nLasts until deactivated.",
        attributes: {
          baseRechargeSpeed: 4,
          duration: 15,
          bloodlustMovementSpeed: 0.05,
          bloodlustHOT: 50,
          bloodlustMeleeDamage: 0.1,
          globalRecharge: -0.6,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Health Regeneration",
        description: "Increase health regeneration by {bloodlustHealthRegen}%.",
        attributes: {
          bloodlustHealthRegen: 0.3,
        },
      },
      {
        name: "Melee Damage",
        description:
          "Increase melee damage of each stack by {bloodlustMeleeDamage}%.",
        attributes: {
          bloodlustMeleeDamage: 0.1,
        },
      },
      {
        name: "Health Regeneration",
        description:
          "Increase health regeneration of each stack by {bloodlustHealthRegen}%",
        attributes: {
          bloodlustHealthRegen: 0.5,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage bonus of each stack by {bloodlustPowerDamage}%.",
        attributes: {
          bloodlustPowerDamage: 0.05,
        },
      },
      {
        name: "Weapon Damage",
        description:
          "Increase weapon damage bonus of each stack by {bloodlustWeaponDamage}%.",
        attributes: {
          bloodlustWeaponDamage: 0.05,
        },
      },
      {
        name: "Movement and Melee",
        description:
          "Increase movement speed bonus by {bloodlustMovementSpeed}%.\nIncrease melee damage bonus by {bloodlustMeleeDamage}%.",
        attributes: {
          bloodlustMeleeDamage: 0.1,
          bloodlustMovementSpeed: 0.05,
        },
      },
      {
        name: "Health Regeneration",
        description:
          "Increase health regeneration of each stack by an additional {bloodlustHealthRegen}%.",
        attributes: {
          bloodlustHealthRegen: 1,
        },
      },
    ],
    internalName: "Bloodlust",
  },
  uc2: {
    id: 552,
    Z: {
      bloodlustMovementSpeed: "Movement Speed",
      bloodlustMeleeDamage: "Melee Damage",
    },
    h: [
      "baseRechargeSpeed",
      "duration",
      "bloodlustMovementSpeed",
      "bloodlustHOT",
      "bloodlustMeleeDamage",
    ],
    g: true,
    iconSet: "Bloodlust",
    evolutions: [
      {
        name: "Bloodlust",
        description:
          "The vorcha flies into a frenzy, increasing movement speed, health regeneration, and melee damage. Each kill intensifies these effects and can stack up to three times.\n\nAdditional stacks last for {duration} seconds.\nSlows power use by {globalRecharge}%.\nLasts until deactivated.",
        attributes: {
          baseRechargeSpeed: 4,
          duration: 15,
          bloodlustMovementSpeed: 0.05,
          bloodlustHOT: 50,
          bloodlustMeleeDamage: 0.1,
          globalRecharge: -0.6,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Health Regeneration",
        description: "Increase health regeneration by {bloodlustHealthRegen}%.",
        attributes: {
          bloodlustHealthRegen: 0.3,
        },
      },
      {
        name: "Melee Damage",
        description:
          "Increase melee damage of each stack by {bloodlustMeleeDamage}%.",
        attributes: {
          bloodlustMeleeDamage: 0.1,
        },
      },
      {
        name: "Health Regeneration",
        description:
          "Increase health regeneration of each stack by {bloodlustHealthRegen}%",
        attributes: {
          bloodlustHealthRegen: 0.5,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage bonus of each stack by {bloodlustPowerDamage}%.",
        attributes: {
          bloodlustPowerDamage: 0.05,
        },
      },
      {
        name: "Weapon Damage",
        description:
          "Increase weapon damage bonus of each stack by {bloodlustWeaponDamage}%.",
        attributes: {
          bloodlustWeaponDamage: 0.05,
        },
      },
      {
        name: "Movement and Melee",
        description:
          "Increase movement speed bonus by {bloodlustMovementSpeed}%.\nIncrease melee damage bonus by {bloodlustMeleeDamage}%.",
        attributes: {
          bloodlustMeleeDamage: 0.1,
          bloodlustMovementSpeed: 0.05,
        },
      },
      {
        name: "Health Regeneration",
        description:
          "Increase health regeneration of each stack by an additional {bloodlustHealthRegen}%.",
        attributes: {
          bloodlustHealthRegen: 1,
        },
      },
    ],
    internalName: "Bloodlust",
  },
  le: {
    id: 598,
    h: ["damage", "radius"],
    g: false,
    iconSet: "CainMine",
    M: true,
    evolutions: [
      {
        name: "Cain Trip Mine",
        description:
          "Attach a C4 proximity explosive to any surface that arms after {ATTR_TIME} seconds. Decimate the defenses of enemies that trip the sensor. Only {ATTR_INT} mines can be armed at a time.\n\nHighly effective against armor, shields, and barriers.\nConsumes a grenade.",
        attributes: {
          damage: 1200,
          radius: 5,
          ATTR_TIME: 1.5,
          ATTR_INT: 3,
        },
      },
      {
        name: "Grenade Capacity",
        description: "Increase grenade capacity by {grenadeCapacity}.",
        attributes: {
          grenadeCapacity: 1,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Radius",
        description: "Increase explosion radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.3,
        },
      },
      {
        name: "Armor Damage",
        description: "Increase damage done to armor by {powerDamageArmor}%.",
        attributes: {
          powerDamageArmor: 0.5,
        },
      },
      {
        name: "Grenade Capacity",
        description: "Increase grenade capacity by {grenadeCapacity}.",
        attributes: {
          grenadeCapacity: 2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.5,
        },
      },
      {
        name: "Radius",
        description: "Increase explosion radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.5,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1.5,
      barrier: 1.5,
      shield: 1.5,
    },
    is_grenade_power: true,
    internalName: "CainMine",
  },
  Xb: {
    id: 145,
    h: ["baseRechargeSpeed", "damage", "radius"],
    g: false,
    iconSet: "Carnage",
    evolutions: [
      {
        name: "Carnage",
        description:
          "Rip a target into shreds with this vicious blast.\n\nMajor collateral damage to enemies nearby.\nEffective against armor.",
        attributes: {
          baseRechargeSpeed: 10,
          damage: 350,
          radius: 1,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.5,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Incapacitate",
        description: "Incapacitate enemies by knocking them down.",
        attributes: {},
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.35,
        },
      },
      {
        name: "Armor Damage",
        description: "Increase damage to armored units by {powerDamageArmor}%.",
        attributes: {
          powerDamageArmor: 0.65,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.5,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1.5,
      barrier: 0.5,
      shield: 0.5,
    },
    internalName: "Carnage",
  },
  Xb2: {
    id: 65,
    h: ["baseRechargeSpeed", "damage", "radius"],
    g: false,
    iconSet: "Carnage",
    evolutions: [
      {
        name: "Carnage",
        description:
          "Rip a target into shreds with this vicious blast.\n\nMajor collateral damage to enemies nearby.\nEffective against armor.",
        attributes: {
          baseRechargeSpeed: 10,
          damage: 350,
          radius: 1,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.5,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Incapacitate",
        description: "Incapacitate enemies by knocking them down.",
        attributes: {},
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.35,
        },
      },
      {
        name: "Armor Damage",
        description: "Increase damage to armored units by {powerDamageArmor}%.",
        attributes: {
          powerDamageArmor: 0.65,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.5,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1.5,
      barrier: 0.5,
      shield: 0.5,
    },
    internalName: "Carnage",
  },
  Yb: {
    id: 144,
    h: ["damage", "force", "radius"],
    g: false,
    iconSet: "BioticGrenade",
    M: true,
    evolutions: [
      {
        name: "Cluster Grenade",
        description:
          "Lob this biotic grenade cluster at your enemies and watch them fly.",
        attributes: {
          damage: 500,
          force: 1000,
          radius: 4,
        },
      },
      {
        name: "Max Grenades",
        description: "Increase grenade capacity by {grenadeCapacity}.",
        attributes: {
          grenadeCapacity: 1,
        },
      },
      {
        name: "Force & Damage",
        description: "Increase damage and force by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
          powerForce: 0.2,
        },
      },
      {
        name: "Force & Damage",
        description: "Increase damage and force by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
          powerForce: 0.3,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.35,
        },
      },
      {
        name: "Max Grenades",
        description: "Increase grenade capacity by {grenadeCapacity}.",
        attributes: {
          grenadeCapacity: 2,
        },
      },
      {
        name: "Damage Combo",
        description:
          "Increase damage to already-lifted targets by {ATTR_PCT}%.",
        attributes: {
          ATTR_PCT: 1,
        },
      },
      {
        name: "Shrapnel",
        description: "Increase shrapnel count by {ATTR_INT}.",
        attributes: {
          ATTR_INT: 1,
        },
      },
      {
        name: "Force & Damage",
        description: "Increase damage and force by {powerDamage}%.",
        attributes: {
          powerDamage: 0.5,
          powerForce: 0.5,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1,
      barrier: 1.5,
      shield: 1,
    },
    is_grenade_power: true,
    type: 1,
    internalName: "BioticGrenade",
  },
  vc: {
    id: 147,
    Z: {
      damage: "Drone Damage",
      petShield: "Drone Shields",
    },
    h: ["baseRechargeSpeed", "damage", "petShield"],
    g: false,
    iconSet: "CombatDrone",
    evolutions: [
      {
        name: "Combat Drone",
        description:
          "Deploy this attack drone to stun targets and draw enemy fire.",
        attributes: {
          baseRechargeSpeed: 5,
          damage: 40,
          petShield: 500,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Shields & Damage",
        description:
          "Increase drone's damage by {powerDamage}%.\nIncrease drone's shields by {petShieldStrength}%.",
        attributes: {
          powerDamage: 0.3,
          petShieldStrength: 0.3,
        },
      },
      {
        name: "Shields & Damage",
        description:
          "Increase drone's damage by {powerDamage}%.\nIncrease drone's shields by {petShieldStrength}%.",
        attributes: {
          powerDamage: 0.4,
          petShieldStrength: 0.4,
        },
      },
      {
        name: "Detonate",
        description:
          "Drone explodes when destroyed, dealing {ATTR_DMG} points of damage across a {radius} meter radius.",
        attributes: {
          ATTR_DMG: 400,
          radius: 5,
        },
      },
      {
        name: "Shock",
        description:
          "Upgrade drone's short-range attack to deal {ATTR_DMG} points of damage across a {radius} meter radius.\nDrone stuns enemies for a short duration.",
        attributes: {
          ATTR_DMG: 100,
          radius: 5,
        },
      },
      {
        name: "Shields & Damage",
        description:
          "Increase drone's damage by {powerDamage}%.\nIncrease drone's shields by {petShieldStrength}%.",
        attributes: {
          powerDamage: 0.5,
          petShieldStrength: 0.5,
        },
      },
      {
        name: "Rockets",
        description:
          "Upgrade drone with long-range rockets that deal {ATTR_DMG} points of damage across a {radius} meter radius.",
        attributes: {
          ATTR_DMG: 300,
          radius: 2.5,
        },
      },
      {
        name: "Chain Lightning",
        description:
          "Upgrade drone's electrical pulse to jump and hit {areaTargetBonus} additional targets.",
        attributes: {
          areaTargetBonus: 3,
        },
      },
    ],
    type: 2,
    internalName: "CombatDrone",
  },
  me: {
    id: 591,
    h: ["bonusGrenade", "bow", "force", "arrowCount"],
    g: true,
    iconSet: "BowModalOne",
    M: true,
    evolutions: [
      {
        name: "Concussive Arrows",
        description:
          "Load {ATTR_INT} concussive charges into your omni-bow to increase impact force, to knock down unarmored enemies, and to increase the number of arrows fired simultaneously. When you run out of concussive charges, you will fire normal arrows again.\n\nHighly effective against barriers.\nConsumes a grenade.",
        attributes: {
          bonusGrenade: 1,
          bow: 25,
          force: 450,
          arrowCount: 5,
          ATTR_INT: 3,
        },
      },
      {
        name: "Grenade Capacity",
        description: "Increase grenade capacity by {grenadeCapacity}.",
        attributes: {
          bonusGrenade: 1,
          grenadeCapacity: 1,
        },
      },
      {
        name: "Force & Damage",
        description: "Increase damage and force by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
          powerForce: 0.2,
        },
      },
      {
        name: "Force & Damage",
        description: "Increase damage and force by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
          powerForce: 0.3,
        },
      },
      {
        name: "Grenade Capacity",
        description: "Increase grenade capacity by {grenadeCapacity}.",
        attributes: {
          bonusGrenade: 1,
          grenadeCapacity: 1,
        },
      },
      {
        name: "Shock",
        description:
          "Add an electrical effect to do an additional {powerDOT}% damage over {ATTR_TIME} seconds while briefly stunning the targets. This effect can be detonated.",
        attributes: {
          powerDOT: 1,
          ATTR_TIME: 5,
        },
      },
      {
        name: "Chill",
        description:
          "Add a chill effect to each arrow that slows enemy movement by {enemyMovementSpeed}% and increases all damage done to it by {ATTR_PCT}%. This effect lasts {ATTR_TIME} seconds and can stack {ATTR_INT} times.",
        attributes: {
          enemyMovementSpeed: -0.1,
          ATTR_PCT: 0.05,
          arrowDamageTaken: 0.15,
          ATTR_TIME: 8,
          ATTR_INT: 3,
        },
      },
      {
        name: "Arrow Count",
        description:
          "Increase the number of arrows released per shot by {arrowCount}.",
        attributes: {
          arrowCount: 1,
        },
      },
      {
        name: "Grenade Capacity",
        description: "Increase grenade capacity by {grenadeCapacity}.",
        attributes: {
          bonusGrenade: 2,
          grenadeCapacity: 2,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1,
      barrier: 1.5,
      shield: 1,
    },
    pb: "",
    is_grenade_power: true,
    mutually_exclusive: [1, 2],
    internalName: "BowModalOne",
  },
  wc: {
    id: 148,
    h: ["baseRechargeSpeed", "damage", "force"],
    g: false,
    iconSet: "ConcussiveShot",
    evolutions: [
      {
        name: "Concussive Shot",
        description:
          "Flatten your enemy with a precise blast at short or long range.\n\nEffective against barriers.",
        attributes: {
          baseRechargeSpeed: 5,
          damage: 200,
          force: 300,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Force & Damage",
        description: "Increase damage and force by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
          powerForce: 0.2,
        },
      },
      {
        name: "Force & Damage",
        description: "Increase damage and force by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
          powerForce: 0.3,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radius} meters.",
        attributes: {
          radius: 1.5,
        },
      },
      {
        name: "Shatter",
        description:
          "Increase force and damage to frozen targets by {ATTR_PCT}%.",
        attributes: {
          ATTR_PCT: 1,
          freezeDamage: 1,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Hammer",
        description:
          "Increase damage by {powerDamage}% and radius by {radius} meters.",
        attributes: {
          powerDamage: 0.5,
          radius: 1,
        },
      },
      {
        name: "Shredder",
        description:
          "Increase damage done to organics by {powerDOT}% over {ATTR_INT} seconds.\nIncrease force by {powerForce}%.",
        attributes: {
          powerDOT: 2,
          ATTR_INT: 10,
          powerForce: 0.5,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1,
      barrier: 4,
      shield: 1,
    },
    internalName: "ConcussiveShot",
  },
  Zb: {
    id: 150,
    Z: {
      duration: "Freeze Duration",
    },
    h: ["baseRechargeSpeed", "duration", "enemyMovementSpeed"],
    g: true,
    iconSet: "CryoBlast",
    evolutions: [
      {
        name: "Cryo Blast",
        description:
          "Flash-freeze and shatter unprotected enemies. Slow down the rest.\n\nWeaken armor.\nFrozen targets won't regenerate health.",
        attributes: {
          baseRechargeSpeed: 5,
          duration: 4,
          enemyArmorWeakening: 0.25,
          enemyMovementSpeed: -0.15,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Duration",
        description: "Increase power duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.4,
        },
      },
      {
        name: "Duration",
        description: "Increase power duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.6,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radius} meters.",
        attributes: {
          radius: 2,
        },
      },
      {
        name: "Speed Reduction",
        description:
          "Decrease movement speed of chilled targets by an additional {enemyMovementSpeed}%.",
        attributes: {
          enemyMovementSpeed: -0.3,
        },
      },
      {
        name: "Cryo Explosion",
        description:
          "Increase damage to chilled and frozen targets by {enemyDamageTaken}%.",
        attributes: {
          enemyDamageTaken: 0.1,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 1,
        },
      },
      {
        name: "Frozen Vulnerability",
        description:
          "Increase damage to frozen and chilled targets by {enemyDamageTaken}%.\nWeaken armored targets by an additional {enemyArmorWeakening}%.",
        attributes: {
          enemyDamageTaken: 0.15,
          enemyArmorWeakening: 0.25,
        },
      },
    ],
    type: 2,
    cryo: true,
    internalName: "CryoBlast",
  },
  yc: {
    id: 639,
    h: ["baseRechargeSpeed", "dot", "duration"],
    g: true,
    iconSet: "DarkChannel",
    evolutions: [
      {
        name: "Dark Channel",
        description:
          "Plague an opponent with a persistent, damaging biotic field.\n\nEffect transfers to a second target if the first is killed.\nEffect's length depends on Dark Channel's duration.\nOnly one field may be active at a time.",
        attributes: {
          baseRechargeSpeed: 8,
          dot: 75,
          duration: 30,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Duration",
        description: "Increase power duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.4,
        },
      },
      {
        name: "Slow",
        description: "Slow target's movement speed by {enemyMovementSpeed}%.",
        attributes: {
          enemyMovementSpeed: -0.3,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.35,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.5,
        },
      },
      {
        name: "Pierce",
        description:
          "Increase damage to armor and barriers by {powerDamageArmor}%.",
        attributes: {
          powerDamageArmor: 0.75,
          powerDamageBarrier: 0.75,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1.5,
      barrier: 2,
      shield: 0.5,
    },
    type: 1,
    is_biotic_primer: true,
    internalName: "DarkChannel",
  },
  yc2: {
    id: 432,
    h: ["baseRechargeSpeed", "dot", "duration"],
    g: true,
    iconSet: "DarkChannel",
    evolutions: [
      {
        name: "Dark Channel",
        description:
          "Plague an opponent with a persistent, damaging biotic field.\n\nEffect transfers to a second target if the first is killed.\nEffect's length depends on Dark Channel's duration.\nOnly one field may be active at a time.",
        attributes: {
          baseRechargeSpeed: 8,
          dot: 75,
          duration: 30,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Duration",
        description: "Increase power duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.4,
        },
      },
      {
        name: "Slow",
        description: "Slow target's movement speed by {enemyMovementSpeed}%.",
        attributes: {
          enemyMovementSpeed: -0.3,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.35,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.5,
        },
      },
      {
        name: "Pierce",
        description:
          "Increase damage to armor and barriers by {powerDamageArmor}%.",
        attributes: {
          powerDamageArmor: 0.75,
          powerDamageBarrier: 0.75,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1.5,
      barrier: 2,
      shield: 0.5,
    },
    type: 1,
    is_biotic_primer: true,
    internalName: "DarkChannel",
  },
  yc3: {
    id: 558,
    h: ["baseRechargeSpeed", "dot", "duration"],
    g: true,
    iconSet: "DarkChannel",
    evolutions: [
      {
        name: "Dark Channel",
        description:
          "Plague an opponent with a persistent, damaging biotic field.\n\nEffect transfers to a second target if the first is killed.\nEffect's length depends on Dark Channel's duration.\nOnly one field may be active at a time.",
        attributes: {
          baseRechargeSpeed: 8,
          dot: 75,
          duration: 30,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Duration",
        description: "Increase power duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.4,
        },
      },
      {
        name: "Slow",
        description: "Slow target's movement speed by {enemyMovementSpeed}%.",
        attributes: {
          enemyMovementSpeed: -0.3,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.35,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.5,
        },
      },
      {
        name: "Pierce",
        description:
          "Increase damage to armor and barriers by {powerDamageArmor}%.",
        attributes: {
          powerDamageArmor: 0.75,
          powerDamageBarrier: 0.75,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1.5,
      barrier: 2,
      shield: 0.5,
    },
    type: 1,
    is_biotic_primer: true,
    internalName: "DarkChannel",
  },
  re: {
    id: 637,
    Z: {
      baseRechargeSpeed: "Detonation Recharge Speed",
      damage: "Detonation Damage",
      duration: "Damage Over Time Duration",
      radius: "Detonation Radius",
    },
    h: ["baseRechargeSpeed", "damage", "radius", "dsDOT", "duration"],
    g: true,
    iconSet: "DarkSingularity",
    evolutions: [
      {
        name: "Dark Sphere",
        description:
          "Launch a slow-moving sphere of ark energy to cause damage over time to any target it passes over. The sphere can be detonated at any time to cause massive damage.\n\nThis power only has a cooldown when detonated.",
        attributes: {
          baseRechargeSpeed: 24,
          damage: 1000,
          radius: 5,
          dsDOT: 250,
          duration: 5,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.15,
        },
      },
      {
        name: "Damage",
        description:
          "Increase detonation damage by {powerDamage}%.\nIncrease damage over time by {dotDamage}%.",
        attributes: {
          powerDamage: 0.2,
          dotDamage: 0.15,
        },
      },
      {
        name: "Damage",
        description:
          "Increase detonation damage by {powerDamage}% and damage over time by {dotDamage}%.",
        attributes: {
          powerDamage: 0.3,
          dotDamage: 0.2,
        },
      },
      {
        name: "Detonation Radius",
        description:
          "Increase the detonation radius of the dark sphere by {radiusPct}%.",
        attributes: {
          radiusPct: 0.4,
        },
      },
      {
        name: "Damage Over Time",
        description:
          "Increase damage over time by {dotDamage}% and duration by {powerDuration}%.",
        attributes: {
          dotDamage: 0.4,
          powerDuration: 0.4,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.35,
        },
      },
      {
        name: "Dark Matter",
        description:
          "Dark Sphere implodes to do {powerDamage}% more damage at the expense of decreasing the detonation radius by {radiusPct}%.",
        attributes: {
          powerDamage: 1,
          radiusPct: -0.5,
        },
      },
      {
        name: "Unstable Dark Sphere",
        description:
          "Destabilize the Dark Sphere to increase the detonation radius by {radiusPct}%.\nIncrease damage over time by {dotDamage}%.\nIncrease duration by {powerDuration}%.",
        attributes: {
          radiusPct: 0.4,
          dotDamage: 0.4,
          powerDuration: 0.4,
        },
      },
    ],
    type: 1,
    is_biotic_primer: true,
    internalName: "DarkSingularity",
  },
  jd: {
    id: 151,
    h: ["baseRechargeSpeed", "duration", "decoyShield"],
    g: false,
    iconSet: "Decoy",
    evolutions: [
      {
        name: "Decoy",
        description: "Distract opponents with this decoy.",
        attributes: {
          baseRechargeSpeed: 8,
          duration: 15,
          decoyShield: 1000,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Duration",
        description: "Increase power duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.3,
        },
      },
      {
        name: "Duration",
        description: "Increase power duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.4,
        },
      },
      {
        name: "Durability",
        description: "Increase shields by {decoyShieldStrength}%.",
        attributes: {
          decoyShieldStrength: 0.4,
        },
      },
      {
        name: "Shock",
        description:
          "Shock enemies for {ATTR_DMG} points within a {radius} meter radius of the decoy.",
        attributes: {
          ATTR_DMG: 100,
          radius: 2.5,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.35,
        },
      },
      {
        name: "Exploding Decoy",
        description:
          "Decoy explodes on destruction, causing {ATTR_DMG} damage across {radius} meters.",
        attributes: {
          ATTR_DMG: 300,
          radius: 4,
        },
      },
      {
        name: "Shields & Duration",
        description:
          "Increase shields by {decoyShieldStrength}%.\nIncrease duration by {powerDuration}%.",
        attributes: {
          decoyShieldStrength: 0.5,
          powerDuration: 0.5,
        },
      },
    ],
    internalName: "Decoy",
  },
  jd2: {
    id: 567,
    h: ["baseRechargeSpeed", "duration", "decoyShield"],
    g: false,
    iconSet: "Decoy",
    evolutions: [
      {
        name: "Decoy",
        description: "Distract opponents with this decoy.",
        attributes: {
          baseRechargeSpeed: 8,
          duration: 15,
          decoyShield: 1000,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Duration",
        description: "Increase power duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.3,
        },
      },
      {
        name: "Duration",
        description: "Increase power duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.4,
        },
      },
      {
        name: "Durability",
        description: "Increase shields by {decoyShieldStrength}%.",
        attributes: {
          decoyShieldStrength: 0.4,
        },
      },
      {
        name: "Shock",
        description:
          "Shock enemies for {ATTR_DMG} points within a {radius} meter radius of the decoy.",
        attributes: {
          ATTR_DMG: 100,
          radius: 2.5,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.35,
        },
      },
      {
        name: "Exploding Decoy",
        description:
          "Decoy explodes on destruction, causing {ATTR_DMG} damage across {radius} meters.",
        attributes: {
          ATTR_DMG: 300,
          radius: 4,
        },
      },
      {
        name: "Shields & Duration",
        description:
          "Increase shields by {decoyShieldStrength}%.\nIncrease duration by {powerDuration}%.",
        attributes: {
          decoyShieldStrength: 0.5,
          powerDuration: 0.5,
        },
      },
    ],
    internalName: "Decoy",
  },
  ue: {
    id: 394,
    Z: {
      magazineSize: "Magazine Size",
    },
    h: ["baseRechargeSpeed", "weaponDamage", "weaponROF", "magazineSize"],
    g: true,
    iconSet: "DevestatorMode",
    evolutions: [
      {
        name: "Devastator Mode",
        description:
          "Turn into a powerful turret with the T5-V Battlesuit.\n\nIncrease weapon damage, rate of fire, and magazine size.\nSlows movement speed.\nStays active until disabled.",
        attributes: {
          baseRechargeSpeed: 3,
          weaponDamage: 0.1,
          weaponROF: 0.1,
          magazineSize: 0.15,
          movementSpeed: -0.1,
        },
      },
      {
        name: "Magazine Size",
        description: "Increase magazine size by {magazineSize}%.",
        attributes: {
          magazineSize: 0.05,
        },
      },
      {
        name: "Damage Bonus",
        description: "Increase damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.05,
        },
      },
      {
        name: "Shield Recharge Delay",
        description:
          "Reduce the delay before shields start regenerating by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Weapon Accuracy",
        description:
          "Increase weapon accuracy bonus by {accuracy}% while active.",
        attributes: {
          accuracy: 0.25,
        },
      },
      {
        name: "Magazine Size",
        description: "Increase magazine size by {magazineSize}%.",
        attributes: {
          magazineSize: 0.15,
        },
      },
      {
        name: "Rate of Fire",
        description: "Increase rate of fire by {weaponROF}%.",
        attributes: {
          weaponROF: 0.15,
        },
      },
      {
        name: "Max Shields",
        description: "Increase max shields by {shieldStrength}%.",
        attributes: {
          shieldStrength: 0.4,
        },
      },
      {
        name: "Damage Bonus",
        description: "Increase damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.15,
        },
      },
    ],
    internalName: "DevestatorMode",
  },
  ze: {
    id: 610,
    Z: {
      radius: "Impact Radius",
    },
    h: ["baseRechargeSpeed", "hammer", "radius", "hammerCharges"],
    g: true,
    iconSet: "TechHammerModal",
    evolutions: [
      {
        name: "Electrical Hammer",
        description:
          "Charge your hammer with electric energy, making all hammer impacts do electrical damage in a large area while stunning enemies. Your melee attacks will expend these charges.\n\nHighly effective against shields and barriers.",
        attributes: {
          baseRechargeSpeed: 18,
          hammer: 250,
          radius: 4,
          hammerCharges: 2,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Radius",
        description: "Increase damage radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.2,
        },
      },
      {
        name: "Shields & Barrier",
        description:
          "Increase damage done to shields/barrier by {powerDamageBarrier}%.",
        attributes: {
          powerDamageBarrier: 0.75,
          powerDamageShield: 0.75,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.4,
        },
      },
      {
        name: "Fire Damage",
        description:
          "Add a fire effect to impacted targets to do {ATTR_DMG} damage over {ATTR_TIME} seconds.\n\nApplies fire DoT.",
        attributes: {
          ATTR_DMG: 250,
          ATTR_TIME: 5,
          fireDoT: true,
        },
      },
      {
        name: "Chill",
        description:
          "Add a chill effect to impacted targets that decreases movement speed by {enemyMovementSpeed}% and increases all damage by {enemyDamageTaken}%.\nThis effect lasts {ATTR_TIME} seconds.",
        attributes: {
          enemyMovementSpeed: -0.3,
          enemyDamageTaken: 0.2,
          ATTR_TIME: 5,
        },
      },
      {
        name: "Radius & Combo",
        description:
          "Increase impact radius by {radiusPct}%.\nIncrease the damage of tech combo detonations by {techCombo}%.",
        attributes: {
          radiusPct: 0.3,
          techCombo: 0.65,
        },
      },
      {
        name: "Number of Charges",
        description:
          "Increase the number of charges generated by Electric Hammer by {hammerCharges}.",
        attributes: {
          hammerCharges: 2,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1,
      barrier: 3,
      shield: 3,
    },
    type: 2,
    internalName: "TechHammerModal",
  },
  xe: {
    id: 476,
    h: ["baseRechargeSpeed", "damage", "range", "radius"],
    g: false,
    iconSet: "ElectricSlash",
    internalName: "ELECTRICSLASH",
    evolutions: [
      {
        name: "Electric Slash",
        description:
          "Unleash a wave of electrical energy from your sword to stun and damage all enemies in a cone.\n\nHighly effective against shields/barriers.\nConsidered a power attack.\nReceives damage bonuses from power upgrades.",
        attributes: {
          baseRechargeSpeed: 8,
          damage: 550,
          range: 20,
          radius: 2,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.3,
        },
      },
      {
        name: "Detonate",
        description: "This evolution is bugged and doesn't work.",
        attributes: {
          ATTR_PCT: 1,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.4,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.5,
        },
      },
      {
        name: "Range",
        description: "Increase range by {rangePct}%.",
        attributes: {
          rangePct: 0.5,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1,
      barrier: 1.5,
      shield: 1.5,
    },
    type: 2,
  },
  Ac: {
    id: 156,
    Z: {
      shieldRestored: "Shield Restored",
    },
    h: [
      "baseRechargeSpeed",
      "damage",
      "radius",
      "shieldRestored",
      "damageReduction",
    ],
    g: true,
    iconSet: "EnergyDrain",
    evolutions: [
      {
        name: "Energy Drain",
        description:
          "Hit an enemy with this energy pulse to inflict damage and to steal barrier and shield power.",
        attributes: {
          baseRechargeSpeed: 8,
          damage: 220,
          radius: 1.5,
          shieldRestored: 0.5,
          damageReduction: 0,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radiusPct}%.",
        attributes: {
          radiusPct: 1,
        },
      },
      {
        name: "Drain",
        description:
          "Increase shield restoration rate by {shieldRestored}% when draining shields, barriers, or power from synthetic enemies.",
        attributes: {
          shieldRestored: 0.5,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.4,
        },
      },
      {
        name: "Armor Boost",
        description:
          "Reduce damage taken by {damageReduction}% for {ATTR_TIME} seconds by gaining a temporary layer of armor by draining shields, barriers, or energy from synthetics.",
        attributes: {
          damageReduction: 0.4,
          ATTR_TIME: 10,
        },
      },
    ],
    i: {
      health: 1,
      armor: 0.5,
      barrier: 3,
      shield: 3,
    },
    type: 2,
    internalName: "EnergyDrain",
  },
  Bo: {
    id: 641,
    Z: {
      ascensionDamage: "Ascension Damage",
      ascensionRecharge: "Ascension Recharge Speed",
      ascensionDR: "Ascension Damage Penalty",
    },
    h: [
      "durability",
      "meleeDamage",
      "ascensionDamage",
      "ascensionRecharge",
      "ascensionDR",
    ],
    g: true,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Ancient Warrior",
        description:
          "Boost health, shields/barriers, melee damage, and durability.\n\nUtilize heavy melee to switch to the powerful Ascension Stance to increase damage and power recharge speed at the expense of increasing the damage taken. This stance lasts {ascensionDuration} seconds.",
        attributes: {
          durability: 0.15,
          meleeDamage: 0.15,
          ascensionDamage: 0.1,
          ascensionRecharge: 0.05,
          ascensionDR: -0.15,
          ascensionDuration: 45,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.1,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Ascension Damage Bonus",
        description:
          "Increase damage bonus by {ascensionDamage}% while Ascension Stance is active.",
        attributes: {
          ascensionDamage: 0.05,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Ascension Recharge Speed",
        description:
          "Increase recharge speed by {ascensionRecharge}% while Ascension Stance is active.",
        attributes: {
          ascensionRecharge: 0.1,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Ascension Mastery",
        description:
          "Increase damage by {ascensionDamage}% and recharge speed by {ascensionRecharge}% while Ascension Stance is active at the expense of damage taken increasing by {ascensionDR}%.",
        attributes: {
          ascensionDamage: 0.1,
          ascensionRecharge: 0.1,
          ascensionDR: -0.1,
        },
      },
      {
        name: "Fitness Expert",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.25,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  Be: {
    id: 196,
    h: ["durability", "meleeDamage", "movementSpeed"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Fitness",
        description:
          "Boost health, shields/barriers, melee damage, durability, and movement speed.",
        attributes: {
          durability: 0.2,
          meleeDamage: 0.15,
          movementSpeed: 0.1,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.2,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.75,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Melee Synergy",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nIncrease weapon damage bonus by {weaponDamage}% for {ATTR_TIME} seconds after an enemy is killed by heavy melee.",
        attributes: {
          meleeDamage: 0.3,
          weaponDamage: 0.25,
          ATTR_TIME: 20,
        },
      },
      {
        name: "Fitness Expert",
        description:
          "Increase health and shield bonuses by {durability}%.\nIncrease movement speed bonus by {movementSpeed}%.",
        attributes: {
          durability: 0.25,
          movementSpeed: 0.1,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  Ce: {
    id: 543,
    h: ["durability", "meleeDamage", "shieldRechargeRate"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Advanced Hardware",
        description:
          "Boost health, shields/barriers, melee damage, durability, and shield regeneration.",
        attributes: {
          durability: 0.15,
          meleeDamage: 0.15,
          shieldRechargeRate: 0.1,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.1,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.75,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Power Synergy",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nIncrease power damage bonus by {globalPowerDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.3,
          globalPowerDamage: 0.3,
          ATTR_TIME: 20,
        },
      },
      {
        name: "Fitness Expert",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.25,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  Ce2: {
    id: 56,
    h: ["durability", "meleeDamage", "shieldRechargeRate"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Advanced Hardware",
        description:
          "Boost health, shields/barriers, melee damage, durability, and shield regeneration.",
        attributes: {
          durability: 0.15,
          meleeDamage: 0.15,
          shieldRechargeRate: 0.1,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.1,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.75,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Power Synergy",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nIncrease power damage bonus by {globalPowerDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.3,
          globalPowerDamage: 0.3,
          ATTR_TIME: 20,
        },
      },
      {
        name: "Fitness Expert",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.25,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  Do: {
    id: 581,
    h: ["durability", "meleeDamage", "meleeDrain"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Hardened Platform",
        description:
          "Boost health, shields, melee damage, and shield regeneration in addition to upgrading shield draining and advanced squad tactics. Shield upgrades also increase the strength of your Hex Shield.\n\nYour heavy melee drains energy from your target, restoring your shields.",
        attributes: {
          durability: 0.2,
          meleeDamage: 0.15,
          meleeDrain: 500,
        },
      },
      {
        name: "Durability",
        description:
          "Increase health and shield bonuses by {durability}%.\nIncrease the shields restored by heavy melee by {meleeRestore}%.",
        attributes: {
          durability: 0.15,
          meleeRestore: 0.15,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description:
          "Increase health and shield bonuses by {durability}%.\nIncrease the shields restored by heavy melee by {meleeRestore}%.",
        attributes: {
          durability: 0.2,
          meleeRestore: 0.2,
        },
      },
      {
        name: "Speed Boost",
        description:
          "Increase movement speed by {movementSpeed}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          movementSpeed: 0.15,
          ATTR_TIME: 10,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Squad Command",
        description:
          "All allies within {radius} meters do {alliedWeaponDamage}% more damage. This bonus does not affect you.\nIncrease your melee damage by {meleeDamage}%.",
        attributes: {
          alliedWeaponDamage: 0.1,
          meleeDamage: 0.3,
          radius: 4,
        },
      },
      {
        name: "Power Transfer",
        description:
          "Increase health and shield bonuses by {durability}%.\nIncrease shields restored by heavy melee by {meleeRestore}%.\nDecrease all damage done by {globalDamage}%.",
        attributes: {
          durability: 0.75,
          globalDamage: -0.15,
          meleeRestore: 0.5,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  Za: {
    id: 204,
    h: ["durability", "meleeDamage"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Fitness",
        description:
          "Boost health, shields/barriers, melee damage, and durability.",
        attributes: {
          durability: 0.15,
          meleeDamage: 0.15,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.1,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.75,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Melee Synergy",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nIncrease weapon damage bonus by {weaponDamage}% for {ATTR_TIME} seconds after an enemy is killed by heavy melee.",
        attributes: {
          meleeDamage: 0.3,
          weaponDamage: 0.25,
          ATTR_TIME: 20,
        },
      },
      {
        name: "Fitness Expert",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.25,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  Za2: {
    id: 201,
    h: ["durability", "meleeDamage"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Fitness",
        description:
          "Boost health, shields/barriers, melee damage, and durability.",
        attributes: {
          durability: 0.15,
          meleeDamage: 0.15,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.1,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.75,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Melee Synergy",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nIncrease weapon damage bonus by {weaponDamage}% for {ATTR_TIME} seconds after an enemy is killed by heavy melee.",
        attributes: {
          meleeDamage: 0.3,
          weaponDamage: 0.25,
          ATTR_TIME: 20,
        },
      },
      {
        name: "Fitness Expert",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.25,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  Za4: {
    id: 202,
    h: ["durability", "meleeDamage"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Fitness",
        description:
          "Boost health, shields/barriers, melee damage, and durability.",
        attributes: {
          durability: 0.15,
          meleeDamage: 0.15,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.1,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.75,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Melee Synergy",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nIncrease weapon damage bonus by {weaponDamage}% for {ATTR_TIME} seconds after an enemy is killed by heavy melee.",
        attributes: {
          meleeDamage: 0.3,
          weaponDamage: 0.25,
          ATTR_TIME: 20,
        },
      },
      {
        name: "Fitness Expert",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.25,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  Za3: {
    id: 203,
    h: ["durability", "meleeDamage"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Fitness",
        description:
          "Boost health, shields/barriers, melee damage, and durability.",
        attributes: {
          durability: 0.15,
          meleeDamage: 0.15,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.1,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.75,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Melee Synergy",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nIncrease weapon damage bonus by {weaponDamage}% for {ATTR_TIME} seconds after an enemy is killed by heavy melee.",
        attributes: {
          meleeDamage: 0.3,
          weaponDamage: 0.25,
          ATTR_TIME: 20,
        },
      },
      {
        name: "Fitness Expert",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.25,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  Za5: {
    id: 205,
    h: ["durability", "meleeDamage"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Fitness",
        description:
          "Boost health, shields/barriers, melee damage, and durability.",
        attributes: {
          durability: 0.15,
          meleeDamage: 0.15,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.1,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.75,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Melee Synergy",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nIncrease weapon damage bonus by {weaponDamage}% for {ATTR_TIME} seconds after an enemy is killed by heavy melee.",
        attributes: {
          meleeDamage: 0.3,
          weaponDamage: 0.25,
          ATTR_TIME: 20,
        },
      },
      {
        name: "Fitness Expert",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.25,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  Za6: {
    id: 200,
    h: ["durability", "meleeDamage"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Fitness",
        description:
          "Boost health, shields/barriers, melee damage, and durability.",
        attributes: {
          durability: 0.15,
          meleeDamage: 0.15,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.1,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.75,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Melee Synergy",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nIncrease weapon damage bonus by {weaponDamage}% for {ATTR_TIME} seconds after an enemy is killed by heavy melee.",
        attributes: {
          meleeDamage: 0.3,
          weaponDamage: 0.25,
          ATTR_TIME: 20,
        },
      },
      {
        name: "Fitness Expert",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.25,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  Co: {
    id: 633,
    h: ["durability", "meleeDamage"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Fitness Module",
        description:
          "Boost health, shields/barriers, melee damage, and durability.",
        attributes: {
          durability: 0.15,
          meleeDamage: 0.15,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.1,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.15,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.1,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.75,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.1,
        },
      },
      {
        name: "Melee Synergy",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nIncrease weapon damage bonus by {weaponDamage}% for {ATTR_TIME} seconds after an enemy is killed by heavy melee.",
        attributes: {
          meleeDamage: 0.1,
          weaponDamage: 0.25,
          ATTR_TIME: 20,
        },
      },
      {
        name: "Fitness Expert",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.2,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  kd: {
    id: 207,
    h: ["durability", "meleeDamage", "rageDR", "rageMeleeDamage"],
    g: true,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Rage",
        description:
          "Boost health, shields, melee damage, and durability.\n\nMelee and kill {ATTR_INT} enemies within {ATTR_TIME} seconds to send the krogan into a frenzy, increasing melee damage and reducing damage taken for {rageDuration} seconds.",
        attributes: {
          durability: 0.2,
          meleeDamage: 0.2,
          rageDR: 0.2,
          rageDuration: 30,
          rageMeleeDamage: 0.5,
          ATTR_INT: 3,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.25,
        },
      },
      {
        name: "Melee Damage",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nIncrease melee damage bonus by {rageMeleeDamage}% while in Rage mode.",
        attributes: {
          meleeDamage: 0.3,
          rageMeleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description:
          "Increase health and shield bonues by {durability}%.\nIncrease damage protection by an additional {rageDR}% while in Rage mode.",
        attributes: {
          durability: 0.2,
          rageDR: 0.05,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.75,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Pure Rage",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nReduce the number of melee kills required to trigger Rage to {ATTR_INT} within {ATTR_TIME} seconds.",
        attributes: {
          meleeDamage: 0.3,
          ATTR_INT: 2,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Fitness Expert",
        description:
          "Increase health and shield bonuses by {durability}%.\nIncrease damage protection by {rageDR}% while in Rage mode.",
        attributes: {
          durability: 0.3,
          rageDR: 0.05,
        },
      },
    ],
    pb: "",
    internalName: "MPMeleePassive",
  },
  kd2: {
    id: 67,
    h: ["durability", "meleeDamage", "rageDR", "rageMeleeDamage"],
    g: true,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Rage",
        description:
          "Boost health, shields, melee damage, and durability.\n\nMelee and kill {ATTR_INT} enemies within {ATTR_TIME} seconds to send the krogan into a frenzy, increasing melee damage and reducing damage taken for {rageDuration} seconds.",
        attributes: {
          durability: 0.2,
          meleeDamage: 0.2,
          rageDR: 0.2,
          rageDuration: 30,
          rageMeleeDamage: 0.5,
          ATTR_INT: 3,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.25,
        },
      },
      {
        name: "Melee Damage",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nIncrease melee damage bonus by {rageMeleeDamage}% while in Rage mode.",
        attributes: {
          meleeDamage: 0.3,
          rageMeleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description:
          "Increase health and shield bonues by {durability}%.\nIncrease damage protection by an additional {rageDR}% while in Rage mode.",
        attributes: {
          durability: 0.2,
          rageDR: 0.05,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.75,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Pure Rage",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nReduce the number of melee kills required to trigger Rage to {ATTR_INT} within {ATTR_TIME} seconds.",
        attributes: {
          meleeDamage: 0.3,
          ATTR_INT: 2,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Fitness Expert",
        description:
          "Increase health and shield bonuses by {durability}%.\nIncrease damage protection by {rageDR}% while in Rage mode.",
        attributes: {
          durability: 0.3,
          rageDR: 0.05,
        },
      },
    ],
    pb: "",
    internalName: "MPMeleePassive",
  },
  Eo: {
    id: 611,
    h: ["durability", "meleeDamage", "rageDR", "rageMeleeDamage", "rageHOT"],
    g: true,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Warlord Rage",
        description:
          "Boost health, shields, melee damage, and durability.\nThis krogan regenerates health slowly during combat, restoring {rageHOT} health per second.\n\nMelee and kill {ATTR_INT} enemies within {ATTR_TIME} seconds to go into a frenzy to increase melee damage, reduce damage taken, and to boost health regeneration for {rageDuration} seconds.",
        attributes: {
          durability: 0.1,
          meleeDamage: 0.2,
          rageDR: 0.2,
          rageDuration: 45,
          rageHOT: 100,
          rageMeleeDamage: 0.5,
          ATTR_INT: 2,
          ATTR_TIME: 45,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.1,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.25,
        },
      },
      {
        name: "Melee Damage",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nIncrease melee damage bonus by {rageMeleeDamage}% while in Rage mode.",
        attributes: {
          meleeDamage: 0.3,
          rageMeleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description:
          "Increase health and shield bonuses by {durability}%.\nIncrease damage protection by an additional {rageDR}% and health regeneration by {rageHealthRegen}% while in Rage mode.",
        attributes: {
          durability: 0.2,
          rageDR: 0.05,
          rageHealthRegen: 0.4,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.75,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Pure Rage",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nReduce the number of melee kills required to trigger Rage to {ATTR_INT} within {ATTR_TIME} seconds.",
        attributes: {
          meleeDamage: 0.3,
          ATTR_INT: 1,
          ATTR_TIME: 45,
        },
      },
      {
        name: "Fitness Expert",
        description:
          "Increase health and shield bonuses by {durability}%.\nIncrease damage protection by {rageDR}% and health regeneration by {rageHealthRegen}% while in Rage mode.",
        attributes: {
          durability: 0.3,
          rageDR: 0.05,
          rageHealthRegen: 0.6,
        },
      },
    ],
    pb: "",
    internalName: "MPMeleePassive",
  },
  ac: {
    id: 212,
    h: ["durability", "meleeDamage"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Fitness",
        description:
          "Boost health, shields/barriers, melee damage, and durability.",
        attributes: {
          durability: 0.25,
          meleeDamage: 0.15,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.2,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.75,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Melee Synergy",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nIncrease weapon damage bonus by {weaponDamage}% for {ATTR_TIME} seconds after an enemy is killed by heavy melee.",
        attributes: {
          meleeDamage: 0.3,
          weaponDamage: 0.25,
          ATTR_TIME: 20,
        },
      },
      {
        name: "Fitness Expert",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.3,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  ac3: {
    id: 230,
    h: ["durability", "meleeDamage"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Fitness",
        description:
          "Boost health, shields/barriers, melee damage, and durability.",
        attributes: {
          durability: 0.25,
          meleeDamage: 0.15,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.2,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.75,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Melee Synergy",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nIncrease weapon damage bonus by {weaponDamage}% for {ATTR_TIME} seconds after an enemy is killed by heavy melee.",
        attributes: {
          meleeDamage: 0.3,
          weaponDamage: 0.25,
          ATTR_TIME: 20,
        },
      },
      {
        name: "Fitness Expert",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.3,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  ac4: {
    id: 550,
    h: ["durability", "meleeDamage"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Fitness",
        description:
          "Boost health, shields/barriers, melee damage, and durability.",
        attributes: {
          durability: 0.25,
          meleeDamage: 0.15,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.2,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.75,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Melee Synergy",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nIncrease weapon damage bonus by {weaponDamage}% for {ATTR_TIME} seconds after an enemy is killed by heavy melee.",
        attributes: {
          meleeDamage: 0.3,
          weaponDamage: 0.25,
          ATTR_TIME: 20,
        },
      },
      {
        name: "Fitness Expert",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.3,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  Fo: {
    id: 384,
    h: ["durability", "meleeDamage"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "T5-V Internal Systems",
        description:
          "Upgrade the T5-V's internal systems to boost health, shields, melee damage, and durability.",
        attributes: {
          durability: 0.15,
          meleeDamage: 0.15,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.1,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.75,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Melee Synergy",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nIncrease weapon damage bonus by {weaponDamage}% for {ATTR_TIME} seconds after an enemy is killed by heavy melee.",
        attributes: {
          meleeDamage: 0.3,
          weaponDamage: 0.25,
          ATTR_TIME: 20,
        },
      },
      {
        name: "Fitness Expert",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.25,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  Go: {
    id: 381,
    h: ["durability", "meleeDamage", "omniShield"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Shield Mastery",
        description:
          "Boost health, shields/barriers, melee damage, and durability.",
        attributes: {
          durability: 0.15,
          meleeDamage: 0.15,
          omniShield: 3000,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.1,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Shield Durability",
        description:
          "Increase the damage the omni-shield withstands before collapsing by {omniShieldHealth}%.",
        attributes: {
          omniShieldHealth: 0.5,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Fire Shield",
        description:
          "Add a flame effect to your omni-shield. Your shield melees will burn enemies and are highly effective against armor.\n\nAdds a fire effect to impacted targets that does {omniShieldFire}% additional damage over {ATTR_TIME} seconds.\n\nApplies fire DoT.",
        attributes: {
          omniShieldFire: 0.5,
          ATTR_TIME: 5,
        },
      },
      {
        name: "Cryo Shield",
        description:
          "Add a freezing effect to your omni-shield that can chill or freeze enemies.\n\nSnap freeze unprotected enemies.\nSlow shielded and armored targets by {enemyMovementSpeed}%.\nWeaken enemy armor by {enemyArmorWeakening}% for {ATTR_TIME} seconds.",
        attributes: {
          enemyMovementSpeed: -0.3,
          enemyArmorWeakening: 0.5,
          ATTR_TIME: 5,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  Ho: {
    id: 388,
    h: ["durability", "meleeDamage", "movementSpeed"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Sword Mastery",
        description:
          "Boost health, shields, melee damage, durability, and movement speed.",
        attributes: {
          durability: 0.2,
          meleeDamage: 0.15,
          movementSpeed: 0.1,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Sword Damage",
        description: "Increase sword damage by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Sword Damage",
        description: "Increase sword damage by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.2,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase sword damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a sword attack.",
        attributes: {
          meleeDamage: 0.5,
          ATTR_TIME: 20,
        },
      },
      {
        name: "Shield Recharge & Speed",
        description:
          "Decrease shield-recharge delay by {shieldRechargeRate}%.\nIncrease movement speed by {movementSpeed}%.",
        attributes: {
          shieldRechargeRate: 0.1,
          movementSpeed: 0.1,
        },
      },
      {
        name: "Shield Damage",
        description:
          "Increase sword damage to shields/barrier by {meleeDamageShield}%.",
        attributes: {
          meleeDamageShield: 0.5,
          meleeDamageBarrier: 0.5,
        },
      },
      {
        name: "Armor Damage",
        description: "Increase sword damage to armor by {meleeDamageArmor}%.",
        attributes: {
          meleeDamageArmor: 0.5,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  Ga: {
    id: 188,
    h: ["durability", "meleeDamage"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Fitness",
        description:
          "Boost health, shields/barriers, melee damage, and durability.",
        attributes: {
          durability: 0.15,
          meleeDamage: 0.15,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.1,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.75,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Power Synergy",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nIncrease power damage bonus by {globalPowerDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.3,
          globalPowerDamage: 0.3,
          ATTR_TIME: 20,
        },
      },
      {
        name: "Fitness Expert",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.25,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  Ga2: {
    id: 198,
    h: ["durability", "meleeDamage"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Fitness",
        description:
          "Boost health, shields/barriers, melee damage, and durability.",
        attributes: {
          durability: 0.15,
          meleeDamage: 0.15,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.1,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.75,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Power Synergy",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nIncrease power damage bonus by {globalPowerDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.3,
          globalPowerDamage: 0.3,
          ATTR_TIME: 20,
        },
      },
      {
        name: "Fitness Expert",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.25,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  Ga3: {
    id: 209,
    h: ["durability", "meleeDamage"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Fitness",
        description:
          "Boost health, shields/barriers, melee damage, and durability.",
        attributes: {
          durability: 0.15,
          meleeDamage: 0.15,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.1,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.75,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Power Synergy",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nIncrease power damage bonus by {globalPowerDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.3,
          globalPowerDamage: 0.3,
          ATTR_TIME: 20,
        },
      },
      {
        name: "Fitness Expert",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.25,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  Ga4: {
    id: 386,
    h: ["durability", "meleeDamage"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Fitness",
        description:
          "Boost health, shields/barriers, melee damage, and durability.",
        attributes: {
          durability: 0.15,
          meleeDamage: 0.15,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.1,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.75,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Power Synergy",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nIncrease power damage bonus by {globalPowerDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.3,
          globalPowerDamage: 0.3,
          ATTR_TIME: 20,
        },
      },
      {
        name: "Fitness Expert",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.25,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  Ga5: {
    id: 495,
    h: ["durability", "meleeDamage"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Fitness",
        description:
          "Boost health, shields/barriers, melee damage, and durability.",
        attributes: {
          durability: 0.15,
          meleeDamage: 0.15,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.1,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.75,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Power Synergy",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nIncrease power damage bonus by {globalPowerDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.3,
          globalPowerDamage: 0.3,
          ATTR_TIME: 20,
        },
      },
      {
        name: "Fitness Expert",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.25,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  Ga6: {
    id: 72,
    h: ["durability", "meleeDamage"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Fitness",
        description:
          "Boost health, shields/barriers, melee damage, and durability.",
        attributes: {
          durability: 0.15,
          meleeDamage: 0.15,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.1,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.75,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Power Synergy",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nIncrease power damage bonus by {globalPowerDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.3,
          globalPowerDamage: 0.3,
          ATTR_TIME: 20,
        },
      },
      {
        name: "Fitness Expert",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.25,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  Ga7: {
    id: 357,
    h: ["durability", "meleeDamage"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Fitness",
        description:
          "Boost health, shields/barriers, melee damage, and durability.",
        attributes: {
          durability: 0.15,
          meleeDamage: 0.15,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.1,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.75,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Power Synergy",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nIncrease power damage bonus by {globalPowerDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.3,
          globalPowerDamage: 0.3,
          ATTR_TIME: 20,
        },
      },
      {
        name: "Fitness Expert",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.25,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  Ga8: {
    id: 392,
    h: ["durability", "meleeDamage"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Fitness",
        description:
          "Boost health, shields/barriers, melee damage, and durability.",
        attributes: {
          durability: 0.15,
          meleeDamage: 0.15,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.1,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.75,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Power Synergy",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nIncrease power damage bonus by {globalPowerDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.3,
          globalPowerDamage: 0.3,
          ATTR_TIME: 20,
        },
      },
      {
        name: "Fitness Expert",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.25,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  Ga9: {
    id: 390,
    h: ["durability", "meleeDamage"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Fitness",
        description:
          "Boost health, shields/barriers, melee damage, and durability.",
        attributes: {
          durability: 0.15,
          meleeDamage: 0.15,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.1,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.75,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Power Synergy",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nIncrease power damage bonus by {globalPowerDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.3,
          globalPowerDamage: 0.3,
          ATTR_TIME: 20,
        },
      },
      {
        name: "Fitness Expert",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.25,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  bc: {
    id: 365,
    h: ["durability", "meleeDamage"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Fitness",
        description:
          "Boost health, shields/barriers, melee damage, and durability.",
        attributes: {
          durability: 0.15,
          meleeDamage: 0.15,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.2,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.75,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Melee Synergy",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nIncrease weapon damage bonus by {weaponDamage}% for {ATTR_TIME} seconds after an enemy is killed by heavy melee.",
        attributes: {
          meleeDamage: 0.3,
          weaponDamage: 0.3,
          ATTR_TIME: 20,
        },
      },
      {
        name: "Fitness Expert",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.25,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  bc2: {
    id: 548,
    h: ["durability", "meleeDamage"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Fitness",
        description:
          "Boost health, shields/barriers, melee damage, and durability.",
        attributes: {
          durability: 0.15,
          meleeDamage: 0.15,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.2,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.75,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Melee Synergy",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nIncrease weapon damage bonus by {weaponDamage}% for {ATTR_TIME} seconds after an enemy is killed by heavy melee.",
        attributes: {
          meleeDamage: 0.3,
          weaponDamage: 0.3,
          ATTR_TIME: 20,
        },
      },
      {
        name: "Fitness Expert",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.25,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  bc3: {
    id: 363,
    h: ["durability", "meleeDamage"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Fitness",
        description:
          "Boost health, shields/barriers, melee damage, and durability.",
        attributes: {
          durability: 0.15,
          meleeDamage: 0.15,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.2,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.75,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Melee Synergy",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nIncrease weapon damage bonus by {weaponDamage}% for {ATTR_TIME} seconds after an enemy is killed by heavy melee.",
        attributes: {
          meleeDamage: 0.3,
          weaponDamage: 0.3,
          ATTR_TIME: 20,
        },
      },
      {
        name: "Fitness Expert",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.25,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  bc4: {
    id: 555,
    h: ["durability", "meleeDamage"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Fitness",
        description:
          "Boost health, shields/barriers, melee damage, and durability.",
        attributes: {
          durability: 0.15,
          meleeDamage: 0.15,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.2,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.75,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Melee Synergy",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nIncrease weapon damage bonus by {weaponDamage}% for {ATTR_TIME} seconds after an enemy is killed by heavy melee.",
        attributes: {
          meleeDamage: 0.3,
          weaponDamage: 0.3,
          ATTR_TIME: 20,
        },
      },
      {
        name: "Fitness Expert",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.25,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  Io: {
    id: 589,
    Z: {
      meleeDamage: "Omni-Bow Damage",
    },
    h: ["durability", "meleeDamage"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Omni-Bow Mastery",
        description:
          "Boost health, shields, and omni-bow damage. Your omni-bow attacks are considered melee attacks and receive bonuses from melee upgrades. Concussive and armor-piercing arrows are considered power attacks and receive bonuses from power upgrades. While active, concussive and armor-piercing arrow damage supplements the base omni-bow damage.",
        attributes: {
          durability: 0.15,
          meleeDamage: 0.15,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.1,
        },
      },
      {
        name: "Omni-Bow Damage",
        description: "Increase omni-bow damage by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.25,
        },
      },
      {
        name: "Omni-Bow Damage",
        description: "Increase omni-bow damage by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.35,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Killing Spree",
        description:
          "Increase omni-bow damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by your omni-bow.",
        attributes: {
          meleeDamage: 0.25,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Omni-Bow Damage",
        description: "Increase omni-bow damage by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.5,
        },
      },
      {
        name: "Fitness Expert",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.25,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  De: {
    id: 563,
    h: ["durability", "meleeDamage"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Fitness",
        description:
          "Boost health, shields/barriers, melee damage, and durability.",
        attributes: {
          durability: 0.15,
          meleeDamage: 0.15,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.1,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.75,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Melee Synergy",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nIncrease weapon damage bonus by {weaponDamage}% for {ATTR_TIME} seconds after an enemy is killed by heavy melee.",
        attributes: {
          meleeDamage: 0.3,
          weaponDamage: 0.3,
          ATTR_TIME: 20,
        },
      },
      {
        name: "Fitness Expert",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.25,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  Jo: {
    id: 644,
    h: ["durability", "meleeDamage"],
    g: false,
    iconSet: "MPMeleePassive",
    M: true,
    evolutions: [
      {
        name: "Venom Gauntlets",
        description:
          "Boost health, shields, melee damage, and durability.\n\n{ATTR_PCT} of melee damage is applied as poison damage over {ATTR_TIME} seconds.",
        attributes: {
          durability: 0.25,
          meleeDamage: 0.15,
          ATTR_PCT: 0.3,
          ATTR_TIME: 5,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.15,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage bonus by {meleeDamage}%.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Durability",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.2,
        },
      },
      {
        name: "Martial Artist",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after an enemy is killed by a heavy melee.",
        attributes: {
          meleeDamage: 0.75,
          ATTR_TIME: 30,
        },
      },
      {
        name: "Shield Recharge",
        description: "Decrease shield-recharge delay by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Melee Synergy",
        description:
          "Increase melee damage bonus by {meleeDamage}%.\nIncrease weapon damage bonus by {weaponDamage}% for {ATTR_TIME} seconds after an enemy is killed by heavy melee.",
        attributes: {
          meleeDamage: 0.3,
          weaponDamage: 0.25,
          ATTR_TIME: 20,
        },
      },
      {
        name: "Fitness Expert",
        description: "Increase health and shield bonuses by {durability}%.",
        attributes: {
          durability: 0.3,
        },
      },
    ],
    internalName: "MPMeleePassive",
  },
  Bc: {
    id: 85,
    internalName: "FLAMER",
    h: ["baseRechargeSpeed", "dot", "duration", "range"],
    g: true,
    iconSet: "Flamer",
    evolutions: [
      {
        name: "Flamer",
        description:
          "Fire a powerful short-range flame attack. The flames will persist for a max duration and can be canceled early for a faster recharge.\n\nHighly effective against armor.\n\nSubject to a self-stacking glitch; damage can reach 3 times the presented value with continuous fire. Applies fire DoT.",
        attributes: {
          baseRechargeSpeed: 8,
          dot: 200,
          duration: 5,
          range: 10,
          fireDoT: true,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Reach",
        description: "Increase range by {rangePct}%.",
        attributes: {
          rangePct: 0.5,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.4,
        },
      },
      {
        name: "Duration",
        description: "Increase duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.6,
        },
      },
      {
        name: "Armor Damage",
        description: "Increase damage to armor by {powerDamageArmor}%.",
        attributes: {
          powerDamageArmor: 0.5,
        },
      },
      {
        name: "Shield Damage",
        description:
          "Increase damage to shields and barriers by {powerDamageBarrier}%.",
        attributes: {
          powerDamageBarrier: 0.5,
          powerDamageShield: 0.5,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1.5,
      barrier: 1,
      shield: 1,
    },
    type: 2,
  },
  Bc2: {
    id: 559,
    internalName: "FLAMER",
    h: ["baseRechargeSpeed", "dot", "duration", "range"],
    g: true,
    iconSet: "Flamer",
    evolutions: [
      {
        name: "Flamer",
        description:
          "Fire a powerful short-range flame attack. The flames will persist for a max duration and can be canceled early for a faster recharge.\n\nHighly effective against armor.\n\nSubject to a self-stacking glitch; damage can reach 3 times the presented value with continuous fire. Applies fire DoT.",
        attributes: {
          baseRechargeSpeed: 8,
          dot: 200,
          duration: 5,
          range: 10,
          fireDoT: true,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Reach",
        description: "Increase range by {rangePct}%.",
        attributes: {
          rangePct: 0.5,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.4,
        },
      },
      {
        name: "Duration",
        description: "Increase duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.6,
        },
      },
      {
        name: "Armor Damage",
        description: "Increase damage to armor by {powerDamageArmor}%.",
        attributes: {
          powerDamageArmor: 0.5,
        },
      },
      {
        name: "Shield Damage",
        description:
          "Increase damage to shields and barriers by {powerDamageBarrier}%.",
        attributes: {
          powerDamageBarrier: 0.5,
          powerDamageShield: 0.5,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1.5,
      barrier: 1,
      shield: 1,
    },
    type: 2,
  },
  ld: {
    id: 158,
    Z: {
      duration: "Melee Damage Duration",
    },
    h: ["baseRechargeSpeed", "damageReduction", "meleeDamage", "duration"],
    g: true,
    iconSet: "Fortification",
    evolutions: [
      {
        name: "Fortification",
        description:
          "Reinforce armor using protective Foucault currents.\nPurge the current and send its charge to your gauntlets for increased melee damage.\n\nSlow power use by {globalRecharge}%.",
        attributes: {
          baseRechargeSpeed: 5,
          damageReduction: 0.25,
          meleeDamage: 0.5,
          duration: 20,
          globalRecharge: -0.5,
        },
      },
      {
        name: "Recharge Speed",
        description:
          "Increase recharge speed by {rechargeSpeed}% when armor is purged.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Melee Damage",
        description:
          "Increase melee damage bonus by {meleeDamage}% when armor is purged.",
        attributes: {
          meleeDamage: 0.2,
        },
      },
      {
        name: "Durability",
        description: "Increase damage protection by {damageReduction}%.",
        attributes: {
          damageReduction: 0.05,
        },
      },
      {
        name: "Melee Damage",
        description:
          "Increase melee damage bonus by {meleeDamage}% when armor is purged.",
        attributes: {
          meleeDamage: 0.3,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase shield recharge rate by {shieldRechargeRate}%.",
        attributes: {
          shieldRechargeRate: 0.15,
        },
      },
      {
        name: "Power Synergy",
        description:
          "Increase power damage and force by {globalPowerDamage}% while Fortification is active.",
        attributes: {
          globalPowerDamage: 0.3,
          globalPowerForce: 0.3,
        },
      },
      {
        name: "Power Recharge",
        description: "Reduce power speed penalty by {globalRecharge}%.",
        attributes: {
          globalRecharge: 0.3,
        },
      },
      {
        name: "Durability",
        description: "Increase damage protection by {damageReduction}%.",
        attributes: {
          damageReduction: 0.1,
        },
      },
    ],
    internalName: "Fortification",
  },
  Cc: {
    id: 159,
    h: ["damage", "radius"],
    g: false,
    iconSet: "FragGrenade",
    M: true,
    evolutions: [
      {
        name: "Frag Grenade",
        description:
          "Rip your enemies apart with this shrapnel-packed grenade.",
        attributes: {
          damage: 900,
          radius: 6.5,
        },
      },
      {
        name: "Max Grenades",
        description: "Increase grenade capacity by {grenadeCapacity}.",
        attributes: {
          grenadeCapacity: 1,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.3,
        },
      },
      {
        name: "Max Grenades",
        description: "Increase grenade capacity by {grenadeCapacity}.",
        attributes: {
          grenadeCapacity: 2,
        },
      },
      {
        name: "Bleed Damage",
        description:
          "Increase damage to organics by {powerDOT}% over {ATTR_TIME} seconds.",
        attributes: {
          powerDOT: 0.5,
          ATTR_TIME: 5,
        },
      },
      {
        name: "Armor-Piercing",
        description: "Increase damage to armor by {ATTR_PCT}%.",
        attributes: {
          ATTR_PCT: 0.75,
          powerDamageArmor: 0.5,
        },
      },
      {
        name: "Shield Overload",
        description: "Increase damage to shields by {ATTR_PCT}%.",
        attributes: {
          ATTR_PCT: 0.75,
          powerDamageShield: 0.5,
        },
      },
    ],
    is_grenade_power: true,
    internalName: "FragGrenade",
  },
  od: {
    id: 659,
    Z: {
      damage: "Turret Damage",
      petShield: "Turret Shields",
    },
    h: ["baseRechargeSpeed", "damage", "petShield", "turretRestore"],
    g: false,
    iconSet: "GethTurret",
    internalName: "GETHTURRET",
    evolutions: [
      {
        name: "Geth Turret",
        description:
          "Deploy a multifunctional turret that deals heavy damage and repairs the shields of allies within {ATTR_INT} meters every {ATTR_TIME} seconds.",
        attributes: {
          baseRechargeSpeed: 5,
          damage: 150,
          petShield: 1000,
          turretRestore: 350,
          ATTR_INT: 8,
          ATTR_TIME: 8,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Shields & Damage",
        description:
          "Increase turret's shields by {petShieldStrength}%.\nIncrease turret's damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
          petShieldStrength: 0.3,
        },
      },
      {
        name: "Shields & Damage",
        description:
          "Increase turret's shields by {petShieldStrength}%.\nIncrease turret's damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.4,
          petShieldStrength: 0.4,
        },
      },
      {
        name: "Shield Restore",
        description:
          "Increase the shields restored to allies by {turretRestorePct}%.",
        attributes: {
          turretRestorePct: 0.5,
        },
      },
      {
        name: "Armor Damage",
        description:
          "Increase the turret's damage by {powerDamage}%.\nIncrease the damage done to armor by {powerDamageArmor}%.",
        attributes: {
          powerDamage: 0.3,
          powerDamageArmor: 0.5,
        },
      },
      {
        name: "Restore Range",
        description:
          "Increase the shields restored to allies by {turretRestorePct}%.\nIncrease the range of this ability by {rangePct}%.",
        attributes: {
          turretRestorePct: 0.5,
          rangePct: 0.4,
        },
      },
      {
        name: "Flamethrower",
        description:
          "Upgrade turret with a close-range flamethrower that deals {ATTR_DMG} points of damage per second.",
        attributes: {
          ATTR_DMG: 55,
        },
      },
      {
        name: "Restore Frequency",
        description:
          "Increase the frequency of restoring shields by {ATTR_PCT}%.",
        attributes: {
          ATTR_PCT: 0.6,
        },
      },
    ],
    type: 2,
  },
  od2: {
    id: 57,
    Z: {
      damage: "Turret Damage",
      petShield: "Turret Shields",
    },
    h: ["baseRechargeSpeed", "damage", "petShield", "turretRestore"],
    g: false,
    iconSet: "GethTurret",
    internalName: "GETHTURRET",
    evolutions: [
      {
        name: "Geth Turret",
        description:
          "Deploy a multifunctional turret that deals heavy damage and repairs the shields of allies within {ATTR_INT} meters every {ATTR_TIME} seconds.",
        attributes: {
          baseRechargeSpeed: 5,
          damage: 150,
          petShield: 1000,
          turretRestore: 350,
          ATTR_INT: 8,
          ATTR_TIME: 8,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Shields & Damage",
        description:
          "Increase turret's shields by {petShieldStrength}%.\nIncrease turret's damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
          petShieldStrength: 0.3,
        },
      },
      {
        name: "Shields & Damage",
        description:
          "Increase turret's shields by {petShieldStrength}%.\nIncrease turret's damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.4,
          petShieldStrength: 0.4,
        },
      },
      {
        name: "Shield Restore",
        description:
          "Increase the shields restored to allies by {turretRestorePct}%.",
        attributes: {
          turretRestorePct: 0.5,
        },
      },
      {
        name: "Armor Damage",
        description:
          "Increase the turret's damage by {powerDamage}%.\nIncrease the damage done to armor by {powerDamageArmor}%.",
        attributes: {
          powerDamage: 0.3,
          powerDamageArmor: 0.5,
        },
      },
      {
        name: "Restore Range",
        description:
          "Increase the shields restored to allies by {turretRestorePct}%.\nIncrease the range of this ability by {rangePct}%.",
        attributes: {
          turretRestorePct: 0.5,
          rangePct: 0.4,
        },
      },
      {
        name: "Flamethrower",
        description:
          "Upgrade turret with a close-range flamethrower that deals {ATTR_DMG} points of damage per second.",
        attributes: {
          ATTR_DMG: 55,
        },
      },
      {
        name: "Restore Frequency",
        description:
          "Increase the frequency of restoring shields by {ATTR_PCT}%.",
        attributes: {
          ATTR_PCT: 0.6,
        },
      },
    ],
    type: 2,
  },
  Je: {
    id: 561,
    h: ["baseRechargeSpeed", "damage", "force"],
    g: true,
    iconSet: "HavocStrike",
    evolutions: [
      {
        name: "Havoc Strike",
        description:
          "Use the propulsion pack to launch a devastating strike on multiple targets.",
        attributes: {
          baseRechargeSpeed: 8,
          damage: 600,
          force: 650,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Force & Damage",
        description: "Increase damage and force by {powerDamage}%.",
        attributes: {
          powerDamage: 0.25,
          powerForce: 0.25,
        },
      },
      {
        name: "Force & Damage",
        description: "Increase damage and force by {powerDamage}%.",
        attributes: {
          powerDamage: 0.35,
          powerForce: 0.35,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.3,
        },
      },
      {
        name: "Weapon Synergy",
        description:
          "Increase weapon damage by {weaponDamage}% for {ATTR_TIME} seconds after a successful charge.",
        attributes: {
          weaponDamage: 0.25,
          ATTR_TIME: 5,
        },
      },
      {
        name: "Melee Damage",
        description:
          "Increase melee damage by {meleeDamage}% for {ATTR_TIME} seconds after a successful charge.",
        attributes: {
          meleeDamage: 0.4,
          ATTR_TIME: 5,
        },
      },
      {
        name: "Force & Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.55,
          powerForce: 0.55,
        },
      },
      {
        name: "Incendiary Strike",
        description:
          "Expand the spread of the flame to hit up to {areaTargetBonus} additional targets within {radius} meters of the impact point.",
        attributes: {
          areaTargetBonus: 2,
          radius: 3,
        },
      },
    ],
    internalName: "HavocStrike",
  },
  Ke: {
    id: 395,
    h: ["baseRechargeSpeed", "missileRefire", "damage", "radius", "force"],
    g: true,
    iconSet: "MissileLauncher",
    evolutions: [
      {
        name: "Hawk Missile Launcher",
        description:
          "Rip a target into shreds with the T5-V's autofiring shoulder cannon.\n\nLock onto a target to launch a stinger missile.\nStays active until disabled.\nDecreases max shields by {shieldStrength}% while active.",
        attributes: {
          baseRechargeSpeed: 3,
          missileRefire: 4,
          damage: 200,
          radius: 0.5,
          force: 200,
          shieldStrength: -0.5,
        },
      },
      {
        name: "Refire Time",
        description: "Reduce refire time by {missileFrequency}%.",
        attributes: {
          missileFrequency: 0.1,
        },
      },
      {
        name: "Missile Damage",
        description: "Increase missile damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
          powerForce: 0.3,
        },
      },
      {
        name: "Shield Penalty",
        description: "Reduce shield penalty by {shieldStrength}%.",
        attributes: {
          shieldStrength: 0.4,
        },
      },
      {
        name: "Damage and Force",
        description: "Increase missile damage and force by {powerDamage}%.",
        attributes: {
          powerDamage: 0.4,
          powerForce: 0.4,
        },
      },
      {
        name: "Refire Time",
        description: "Reduce refire time by {missileFrequency}%.",
        attributes: {
          missileFrequency: 0.35,
        },
      },
      {
        name: "Armor Damage",
        description:
          "Increase effectiveness against armored targets by {powerDamageArmor}%.",
        attributes: {
          powerDamageArmor: 0.5,
        },
      },
      {
        name: "Hydra Missiles",
        description:
          "Upgrade missile housing to fire {ATTR_INT} extra seeking projectiles.\n\nDecreases the payload of each missile by {powerDamage}%.",
        attributes: {
          ATTR_INT: 2,
          powerDamage: -0.25,
          powerForce: 0.25,
        },
      },
      {
        name: "Cobra Missiles",
        description:
          "Upgrade missile munitions to increase damage and force by {powerDamage}%.\nIncrease impact radius by {radiusPct}%.",
        attributes: {
          powerDamage: 1.5,
          powerForce: 1.5,
          radiusPct: 3,
        },
      },
    ],
    internalName: "MissileLauncher",
  },
  Le: {
    id: 582,
    h: ["baseRechargeSpeed", "hexShield", "duration"],
    g: true,
    iconSet: "HexShield",
    evolutions: [
      {
        name: "Hex Shield",
        description:
          "Spawn a geth energy barrier that blocks all fast-moving projectiles, including bullets.",
        attributes: {
          baseRechargeSpeed: 8,
          hexShield: 2000,
          duration: 18,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Shield Strength",
        description: "Increase shield strength by {hexShieldStrength}%.",
        attributes: {
          hexShieldStrength: 0.2,
        },
      },
      {
        name: "Pulse",
        description:
          "Upon spawning, an electric pulse is emitted that does {ATTR_DMG} damage in a {radius} meter radius.",
        attributes: {
          ATTR_DMG: 400,
          radius: 3,
        },
      },
      {
        name: "Shield Strength",
        description: "Increase shield strength by {hexShieldStrength}%.",
        attributes: {
          hexShieldStrength: 0.3,
        },
      },
      {
        name: "Shock",
        description:
          "Enemies passing through the shield are electrified, taking {ATTR_DMG} damage over {ATTR_TIME} seconds. This effect can be detonated.",
        attributes: {
          ATTR_DMG: 500,
          ATTR_TIME: 5,
        },
      },
      {
        name: "Duration",
        description: "Increase duration by {powerDuration}%.",
        attributes: {
          powerDuration: 1,
        },
      },
      {
        name: "Damage Synergy",
        description:
          "While active, generate additional energy for all your systems to increase damage by {globalDamage}%.",
        attributes: {
          globalDamage: 0.1,
        },
      },
      {
        name: "Large Shield",
        description:
          "Spawn a wider shield and increase shield strength by {hexShieldStrength}%.",
        attributes: {
          hexShieldStrength: 0.4,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1,
      barrier: 1.5,
      shield: 1.5,
    },
    type: 2,
    internalName: "HexShield",
  },
  Gc: {
    id: 475,
    h: ["damage", "radius"],
    g: true,
    iconSet: "HomingGrenade",
    M: true,
    evolutions: [
      {
        name: "Homing Grenade",
        description:
          "Launch this seeking grenade to track down a target, causing a massive explosion on impact.",
        attributes: {
          damage: 800,
          radius: 2,
        },
      },
      {
        name: "Capacity",
        description: "Increase grenade capacity by {grenadeCapacity}.",
        attributes: {
          grenadeCapacity: 1,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Impact Radius",
        description: "Increase impact radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.3,
        },
      },
      {
        name: "Capacity",
        description: "Increase grenade capacity by {grenadeCapacity}.",
        attributes: {
          grenadeCapacity: 1,
        },
      },
      {
        name: "Fire Damage",
        description:
          "Add a fire effect to targets, dealing {powerDOT}% additional damage over {ATTR_TIME} seconds.\n\nApplies fire DoT.",
        attributes: {
          powerDOT: 0.5,
          ATTR_TIME: 5,
          fireDoT: true,
        },
      },
      {
        name: "Armor Damage",
        description:
          "Increase damage to armor by {powerDamageArmor}%.\nDecrease weapon damage mitigation of armored targets by {homingGrenadeArmor}% for {ATTR_TIME} seconds.",
        attributes: {
          powerDamageArmor: 0.6,
          homingGrenadeArmor: 0.5,
          ATTR_TIME: 8,
        },
      },
      {
        name: "Split Grenade",
        description:
          "Split a grenade in half to seek two targets that do {ATTR_PCT}% damage each.",
        attributes: {
          ATTR_PCT: 0.6,
        },
      },
    ],
    is_grenade_power: true,
    type: 2,
    internalName: "HomingGrenade",
  },
  Gc2: {
    id: 551,
    h: ["damage", "radius"],
    g: true,
    iconSet: "HomingGrenade",
    M: true,
    evolutions: [
      {
        name: "Homing Grenade",
        description:
          "Launch this seeking grenade to track down a target, causing a massive explosion on impact.",
        attributes: {
          damage: 800,
          radius: 2,
        },
      },
      {
        name: "Capacity",
        description: "Increase grenade capacity by {grenadeCapacity}.",
        attributes: {
          grenadeCapacity: 1,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Impact Radius",
        description: "Increase impact radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.3,
        },
      },
      {
        name: "Capacity",
        description: "Increase grenade capacity by {grenadeCapacity}.",
        attributes: {
          grenadeCapacity: 1,
        },
      },
      {
        name: "Fire Damage",
        description:
          "Add a fire effect to targets, dealing {powerDOT}% additional damage over {ATTR_TIME} seconds.\n\nApplies fire DoT.",
        attributes: {
          powerDOT: 0.5,
          ATTR_TIME: 5,
          fireDoT: true,
        },
      },
      {
        name: "Armor Damage",
        description:
          "Increase damage to armor by {powerDamageArmor}%.\nDecrease weapon damage mitigation of armored targets by {homingGrenadeArmor}% for {ATTR_TIME} seconds.",
        attributes: {
          powerDamageArmor: 0.6,
          homingGrenadeArmor: 0.5,
          ATTR_TIME: 8,
        },
      },
      {
        name: "Split Grenade",
        description:
          "Split a grenade in half to seek two targets that do {ATTR_PCT}% damage each.",
        attributes: {
          ATTR_PCT: 0.6,
        },
      },
    ],
    is_grenade_power: true,
    type: 2,
    internalName: "HomingGrenade",
  },
  Hc: {
    id: 541,
    Z: {
      radius: "Enhanced Vision Range",
    },
    h: [
      "baseRechargeSpeed",
      "radius",
      "globalDamage",
      "accuracy",
      "movementSpeed",
    ],
    g: true,
    iconSet: "Supercharge",
    evolutions: [
      {
        name: "Hunter Mode",
        description:
          "Advanced diagnostics redirect power into offensive systems, boosting combat capabilities.\n\nFaster movement.\nSee through smoke and objects.\nMore weapon, power, and melee damage.\nGreater weapon accuracy.\nShields reduced by {shieldStrength}%.",
        attributes: {
          baseRechargeSpeed: 3,
          radius: 15,
          globalDamage: 0.05,
          accuracy: 0.1,
          movementSpeed: 0.05,
          shieldStrength: -0.5,
        },
      },
      {
        name: "Movement Speed",
        description: "Increase movement speed by {movementSpeed}%.",
        attributes: {
          movementSpeed: 0.05,
        },
      },
      {
        name: "Damage",
        description: "Increase damage bonus by {globalDamage}%.",
        attributes: {
          globalDamage: 0.025,
        },
      },
      {
        name: "Power Recharge",
        description:
          "Increase recharge speed of all powers by {globalRecharge}% while active.",
        attributes: {
          globalRecharge: 0.2,
        },
      },
      {
        name: "Weapon Accuracy",
        description: "Increase weapon accuracy bonus by {accuracy}%.",
        attributes: {
          accuracy: 0.15,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase damage of all powers by {globalPowerDamage}% while active.",
        attributes: {
          globalPowerDamage: 0.15,
        },
      },
      {
        name: "Rate of Fire",
        description:
          "Increase rate of fire of all weapons by {weaponROF}% while active.",
        attributes: {
          weaponROF: 0.15,
        },
      },
      {
        name: "Speed & Vision",
        description:
          "Increase movement speed bonus by {movementSpeed}%.\nIncrease the range of your enhanced vision by {radiusPct}%.",
        attributes: {
          movementSpeed: 0.1,
          radiusPct: 0.6,
        },
      },
      {
        name: "Damage",
        description: "Increase damage bonus by {globalDamage}%.",
        attributes: {
          globalDamage: 0.1,
        },
      },
    ],
    internalName: "Supercharge",
  },
  Hc2: {
    id: 48,
    Z: {
      radius: "Enhanced Vision Range",
    },
    h: [
      "baseRechargeSpeed",
      "radius",
      "globalDamage",
      "accuracy",
      "movementSpeed",
    ],
    g: true,
    iconSet: "Supercharge",
    evolutions: [
      {
        name: "Hunter Mode",
        description:
          "Advanced diagnostics redirect power into offensive systems, boosting combat capabilities.\n\nFaster movement.\nSee through smoke and objects.\nMore weapon, power, and melee damage.\nGreater weapon accuracy.\nShields reduced by {shieldStrength}%.",
        attributes: {
          baseRechargeSpeed: 3,
          radius: 15,
          globalDamage: 0.05,
          accuracy: 0.1,
          movementSpeed: 0.05,
          shieldStrength: -0.5,
        },
      },
      {
        name: "Movement Speed",
        description: "Increase movement speed by {movementSpeed}%.",
        attributes: {
          movementSpeed: 0.05,
        },
      },
      {
        name: "Damage",
        description: "Increase damage bonus by {globalDamage}%.",
        attributes: {
          globalDamage: 0.025,
        },
      },
      {
        name: "Power Recharge",
        description:
          "Increase recharge speed of all powers by {globalRecharge}% while active.",
        attributes: {
          globalRecharge: 0.2,
        },
      },
      {
        name: "Weapon Accuracy",
        description: "Increase weapon accuracy bonus by {accuracy}%.",
        attributes: {
          accuracy: 0.15,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase damage of all powers by {globalPowerDamage}% while active.",
        attributes: {
          globalPowerDamage: 0.15,
        },
      },
      {
        name: "Rate of Fire",
        description:
          "Increase rate of fire of all weapons by {weaponROF}% while active.",
        attributes: {
          weaponROF: 0.15,
        },
      },
      {
        name: "Speed & Vision",
        description:
          "Increase movement speed bonus by {movementSpeed}%.\nIncrease the range of your enhanced vision by {radiusPct}%.",
        attributes: {
          movementSpeed: 0.1,
          radiusPct: 0.6,
        },
      },
      {
        name: "Damage",
        description: "Increase damage bonus by {globalDamage}%.",
        attributes: {
          globalDamage: 0.1,
        },
      },
    ],
    internalName: "Supercharge",
  },
  Hc3: {
    id: 58,
    Z: {
      radius: "Enhanced Vision Range",
    },
    h: [
      "baseRechargeSpeed",
      "radius",
      "globalDamage",
      "accuracy",
      "movementSpeed",
    ],
    g: true,
    iconSet: "Supercharge",
    evolutions: [
      {
        name: "Hunter Mode",
        description:
          "Advanced diagnostics redirect power into offensive systems, boosting combat capabilities.\n\nFaster movement.\nSee through smoke and objects.\nMore weapon, power, and melee damage.\nGreater weapon accuracy.\nShields reduced by {shieldStrength}%.",
        attributes: {
          baseRechargeSpeed: 3,
          radius: 15,
          globalDamage: 0.05,
          accuracy: 0.1,
          movementSpeed: 0.05,
          shieldStrength: -0.5,
        },
      },
      {
        name: "Movement Speed",
        description: "Increase movement speed by {movementSpeed}%.",
        attributes: {
          movementSpeed: 0.05,
        },
      },
      {
        name: "Damage",
        description: "Increase damage bonus by {globalDamage}%.",
        attributes: {
          globalDamage: 0.025,
        },
      },
      {
        name: "Power Recharge",
        description:
          "Increase recharge speed of all powers by {globalRecharge}% while active.",
        attributes: {
          globalRecharge: 0.2,
        },
      },
      {
        name: "Weapon Accuracy",
        description: "Increase weapon accuracy bonus by {accuracy}%.",
        attributes: {
          accuracy: 0.15,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase damage of all powers by {globalPowerDamage}% while active.",
        attributes: {
          globalPowerDamage: 0.15,
        },
      },
      {
        name: "Rate of Fire",
        description:
          "Increase rate of fire of all weapons by {weaponROF}% while active.",
        attributes: {
          weaponROF: 0.15,
        },
      },
      {
        name: "Speed & Vision",
        description:
          "Increase movement speed bonus by {movementSpeed}%.\nIncrease the range of your enhanced vision by {radiusPct}%.",
        attributes: {
          movementSpeed: 0.1,
          radiusPct: 0.6,
        },
      },
      {
        name: "Damage",
        description: "Increase damage bonus by {globalDamage}%.",
        attributes: {
          globalDamage: 0.1,
        },
      },
    ],
    internalName: "Supercharge",
  },
  tb: {
    id: 162,
    h: ["baseRechargeSpeed", "damage"],
    g: true,
    iconSet: "Incinerate",
    evolutions: [
      {
        name: "Incinerate",
        description:
          "Burn your opponents and incinerate their armor.\n\nHeavy damage to health and armor.\nMake an enemy panic, stopping health regeneration.\n\nApplies fire DoT.",
        attributes: {
          baseRechargeSpeed: 8,
          damage: 330,
          fireDoT: true,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radius} meters.",
        attributes: {
          radius: 1.5,
        },
      },
      {
        name: "Burning Damage",
        description:
          "Increase damage by an additional {powerDOT}% over {ATTR_TIME} seconds.",
        attributes: {
          powerDOT: 0.5,
          ATTR_TIME: 8,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Freeze Combo",
        description:
          "Increase damage to frozen and chilled targets by an additional {freezeDamage}%.",
        attributes: {
          freezeDamage: 1,
        },
      },
      {
        name: "Armor Damage",
        description:
          "Increase damage to armored targets by {powerDamageArmor}%.",
        attributes: {
          powerDamageArmor: 0.5,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1.5,
      barrier: 0.5,
      shield: 0.5,
    },
    type: 2,
    internalName: "Incinerate",
  },
  td: {
    id: 163,
    h: ["dot", "duration", "radius"],
    g: true,
    iconSet: "InfernoGrenade",
    M: true,
    evolutions: [
      {
        name: "Inferno Grenade",
        description:
          "Cluster-bomb a small area with incendiary munitions.\n\nDamage can be sustained indefinitely with Incendiary ammo. Applies fire DoT.",
        attributes: {
          dot: 150,
          duration: 8,
          radius: 5,
          fireDoT: true,
        },
      },
      {
        name: "Max Grenades",
        description: "Increase grenade capacity by {grenadeCapacity}.",
        attributes: {
          grenadeCapacity: 1,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.3,
        },
      },
      {
        name: "Max Grenades",
        description: "Increase grenade capacity by {grenadeCapacity}.",
        attributes: {
          grenadeCapacity: 2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.4,
        },
      },
      {
        name: "Armor Damage",
        description: "Increase damage to armor by {powerDamageArmor}%.",
        attributes: {
          powerDamageArmor: 0.5,
        },
      },
      {
        name: "Radius & Shrapnel",
        description:
          "Increase impact radius by {radiusPct}%.\nIncrease shrapnel by {ATTR_INT} fragments.",
        attributes: {
          radiusPct: 0.5,
          ATTR_INT: 1,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1.5,
      barrier: 1,
      shield: 1,
    },
    is_grenade_power: true,
    is_inferno_glitched: true,
    internalName: "InfernoGrenade",
  },
  td2: {
    id: 61,
    h: ["dot", "duration", "radius"],
    g: true,
    iconSet: "InfernoGrenade",
    M: true,
    evolutions: [
      {
        name: "Inferno Grenade",
        description:
          "Cluster-bomb a small area with incendiary munitions.\n\nDamage can be sustained indefinitely with Incendiary ammo. Applies fire DoT.",
        attributes: {
          dot: 150,
          duration: 8,
          radius: 5,
          fireDoT: true,
        },
      },
      {
        name: "Max Grenades",
        description: "Increase grenade capacity by {grenadeCapacity}.",
        attributes: {
          grenadeCapacity: 1,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.3,
        },
      },
      {
        name: "Max Grenades",
        description: "Increase grenade capacity by {grenadeCapacity}.",
        attributes: {
          grenadeCapacity: 2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.4,
        },
      },
      {
        name: "Armor Damage",
        description: "Increase damage to armor by {powerDamageArmor}%.",
        attributes: {
          powerDamageArmor: 0.5,
        },
      },
      {
        name: "Radius & Shrapnel",
        description:
          "Increase impact radius by {radiusPct}%.\nIncrease shrapnel by {ATTR_INT} fragments.",
        attributes: {
          radiusPct: 0.5,
          ATTR_INT: 1,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1.5,
      barrier: 1,
      shield: 1,
    },
    is_grenade_power: true,
    is_inferno_glitched: true,
    internalName: "InfernoGrenade",
  },
  hc: {
    id: 284,
    h: ["baseRechargeSpeed", "damage", "force"],
    g: true,
    iconSet: "Lash",
    internalName: "LASH",
    evolutions: [
      {
        name: "Lash",
        description:
          "Latch this biotic field onto enemies to jerk them toward you, doing massive damage in the process.",
        attributes: {
          baseRechargeSpeed: 6,
          damage: 150,
          force: 1200,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Detonate",
        description:
          "Increase force and damage of biotic detonations by {comboDamage}%.",
        attributes: {
          comboDamage: 0.5,
          comboForce: 0.5,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.35,
        },
      },
      {
        name: "Damage Over Time",
        description:
          "Do an additional {ATTR_PCT}% damage over {ATTR_TIME} seconds.",
        attributes: {
          ATTR_PCT: 1,
          ATTR_TIME: 10,
          powerDOT: 1,
        },
      },
      {
        name: "Fast Recharge",
        description:
          "Give the power a {ATTR_PCT}% chance of not causing a cooldown.\nIncrease the time that lifted targets can be detonated by {lashCombo}%.",
        attributes: {
          ATTR_PCT: 0.35,
          lashCombo: 1,
        },
      },
      {
        name: "Shield Penetration",
        description:
          "Penetrate through shields and barriers, lifting any target without armor but with reduced force.",
        attributes: {},
      },
    ],
    type: 1,
    is_biotic_primer: true,
  },
  hc2: {
    id: 546,
    h: ["baseRechargeSpeed", "damage", "force"],
    g: true,
    iconSet: "Lash",
    internalName: "LASH",
    evolutions: [
      {
        name: "Lash",
        description:
          "Latch this biotic field onto enemies to jerk them toward you, doing massive damage in the process.",
        attributes: {
          baseRechargeSpeed: 6,
          damage: 150,
          force: 1200,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Detonate",
        description:
          "Increase force and damage of biotic detonations by {comboDamage}%.",
        attributes: {
          comboDamage: 0.5,
          comboForce: 0.5,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.35,
        },
      },
      {
        name: "Damage Over Time",
        description:
          "Do an additional {ATTR_PCT}% damage over {ATTR_TIME} seconds.",
        attributes: {
          ATTR_PCT: 1,
          ATTR_TIME: 10,
          powerDOT: 1,
        },
      },
      {
        name: "Fast Recharge",
        description:
          "Give the power a {ATTR_PCT}% chance of not causing a cooldown.\nIncrease the time that lifted targets can be detonated by {lashCombo}%.",
        attributes: {
          ATTR_PCT: 0.35,
          lashCombo: 1,
        },
      },
      {
        name: "Shield Penetration",
        description:
          "Penetrate through shields and barriers, lifting any target without armor but with reduced force.",
        attributes: {},
      },
    ],
    type: 1,
    is_biotic_primer: true,
  },
  wd: {
    id: 166,
    h: ["damage", "radius", "duration"],
    g: false,
    iconSet: "LiftGrenade",
    M: true,
    evolutions: [
      {
        name: "Lift Grenade",
        description:
          "Lob this grenade into a group of enemies to send them flying.\n\nDeal high damage.",
        attributes: {
          damage: 900,
          radius: 5,
          duration: 4,
        },
      },
      {
        name: "Max Grenades",
        description: "Increase grenade capacity by {grenadeCapacity}.",
        attributes: {
          grenadeCapacity: 1,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.3,
        },
      },
      {
        name: "Max Grenades",
        description: "Increase grenade capacity by {grenadeCapacity}.",
        attributes: {
          grenadeCapacity: 2,
        },
      },
      {
        name: "Duration",
        description: "Increase power duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.5,
        },
      },
      {
        name: "Slam",
        description:
          "Slam floating targets to the ground as Lift wears off, stunning them for {ATTR_TIME} seconds.",
        attributes: {
          ATTR_TIME: 3,
        },
      },
      {
        name: "Damage & Radius",
        description:
          "Increase damage by {powerDamage}%.\nIncrease impact radius by {radiusPct}%.",
        attributes: {
          powerDamage: 0.3,
          radiusPct: 0.3,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1,
      barrier: 1.5,
      shield: 1,
    },
    is_grenade_power: true,
    type: 1,
    internalName: "LiftGrenade",
  },
  yd: {
    id: 168,
    h: ["baseRechargeSpeed", "duration", "weaponROF", "accuracy"],
    g: true,
    iconSet: "Marksman",
    evolutions: [
      {
        name: "Marksman",
        description: "Boost weapon accuracy and firing rate for a short time.",
        attributes: {
          baseRechargeSpeed: 6,
          duration: 6,
          weaponROF: 0.25,
          accuracy: 0.35,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Duration",
        description: "Increase duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.3,
        },
      },
      {
        name: "Accuracy",
        description: "Increase accuracy bonus by {accuracy}%.",
        attributes: {
          accuracy: 0.15,
        },
      },
      {
        name: "Firing Rate",
        description: "Increase firing rate bonus by {weaponROF}%.",
        attributes: {
          weaponROF: 0.15,
        },
      },
      {
        name: "Duration",
        description: "Increase duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.4,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage by {ATTR_PCT}%.",
        attributes: {
          ATTR_PCT: 0.25,
          headshotMod: 0.3125,
        },
      },
      {
        name: "Accuracy & Firing Rate",
        description:
          "Increase accuracy and firing rate bonuses by {accuracy}%.",
        attributes: {
          accuracy: 0.1,
          weaponROF: 0.1,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.4,
        },
      },
    ],
    internalName: "Marksman",
  },
  Te: {
    id: 477,
    h: ["damage", "force", "radius"],
    g: false,
    iconSet: "MultiFragGrenade",
    M: true,
    evolutions: [
      {
        name: "Multi-Frag Grenade",
        description:
          "Launch multiple frag grenades by upgrading the T5-V's right gauntlet.",
        attributes: {
          damage: 350,
          force: 1000,
          radius: 4,
        },
      },
      {
        name: "Max Grenades",
        description: "Increase grenade capacity by {grenadeCapacity}.",
        attributes: {
          grenadeCapacity: 1,
        },
      },
      {
        name: "Force & Damage",
        description: "Increase damage and force by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
          powerForce: 0.2,
        },
      },
      {
        name: "Force & Damage",
        description: "Increase damage and force by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
          powerForce: 0.2,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.35,
        },
      },
      {
        name: "Max Grenades",
        description: "Increase grenade capacity by {grenadeCapacity}.",
        attributes: {
          grenadeCapacity: 2,
        },
      },
      {
        name: "Force & Damage",
        description: "Increase damage and force by {powerDamage}%.",
        attributes: {
          powerDamage: 0.4,
          powerForce: 0.4,
        },
      },
      {
        name: "Grenade Count",
        description: "Increase the number of grenades launched by {ATTR_INT}.",
        attributes: {
          ATTR_INT: 2,
        },
      },
      {
        name: "Force & Damage",
        description: "Increase damage and force by {powerDamage}%.",
        attributes: {
          powerDamage: 0.5,
          powerForce: 0.5,
        },
      },
    ],
    is_grenade_power: true,
    internalName: "MultiFragGrenade",
  },
  Ue: {
    id: 621,
    Z: {
      damage: "Blade Damage",
      duration: "Poison Duration",
    },
    h: ["damage", "poison", "duration", "paralyze", "range"],
    g: false,
    iconSet: "VenomTippedBlades",
    M: true,
    evolutions: [
      {
        name: "Nightshade Blades",
        description:
          "Launch a short-range volley of venom tipped blades to paralyze non-shielded targets. These blades cause instant damage and poison the target, causing damage over time.\n\nBlade damage is most effective at close-range.\nA limited number of these blades can be carried.",
        attributes: {
          damage: 1200,
          poison: 50,
          duration: 8,
          paralyze: 5,
          range: 15,
        },
      },
      {
        name: "Capacity",
        description: "Increase blade carrying capacity by {grenadeCapacity}.",
        attributes: {
          grenadeCapacity: 1,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
          poisonDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
          poisonDamage: 0.3,
        },
      },
      {
        name: "Capacity",
        description: "Increase blade carrying capacity by {grenadeCapacity}.",
        attributes: {
          grenadeCapacity: 1,
        },
      },
      {
        name: "Range",
        description: "Increase range by {rangePct}%.",
        attributes: {
          rangePct: 0.5,
        },
      },
      {
        name: "Poison Duration",
        description:
          "Boost the concentration of neurotoxins to increase the paralyze duration by {paralyzeDuration}% and poison duration by {powerDuration}%.",
        attributes: {
          paralyzeDuration: 0.4,
          powerDuration: 0.4,
        },
      },
      {
        name: "Enhanced Blades",
        description:
          "Boost the concentration of venom in the blades to increase direct damage by {powerDamage}% and poison damage by {poisonDamage}%.",
        attributes: {
          powerDamage: 0.4,
          poisonDamage: 0.6,
        },
      },
      {
        name: "Exploding Blades",
        description:
          "Blades explode after {ATTR_TIME} seconds, doing {bladeDamage} poisonous area damage.",
        attributes: {
          ATTR_TIME: 3,
          bladeDamage: 400,
        },
      },
    ],
    is_grenade_power: true,
    internalName: "VenomTippedBlades",
  },
  Bd: {
    id: 152,
    h: ["damage", "force", "radius"],
    g: true,
    iconSet: "Discharge",
    evolutions: [
      {
        name: "Nova",
        description:
          "Transfer the energy of your biotic barrier to charge and spark this deadly blast.\n\nBarrier strength determines blast intensity.",
        attributes: {
          damage: 350,
          force: 450,
          radius: 4,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.25,
        },
      },
      {
        name: "Force & Damage",
        description: "Increase damage and force by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
          powerForce: 0.3,
        },
      },
      {
        name: "Force & Damage",
        description: "Increase damage and force by {powerDamage}%.",
        attributes: {
          powerDamage: 0.4,
          powerForce: 0.4,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.4,
        },
      },
      {
        name: "Power Recharge",
        description:
          "Increase recharge speed of all powers by {globalRecharge}% for {ATTR_TIME} seconds.",
        attributes: {
          globalRecharge: 0.15,
          ATTR_TIME: 15,
        },
      },
      {
        name: "Half Blast",
        description:
          "Gain the option to use Nova two times in a row by reducing its barrier consumption by {ATTR_PCT}% but at the cost of reducing damage and force by {powerDamage}%.",
        attributes: {
          ATTR_PCT: 0.5,
          powerDamage: -0.4,
          powerForce: -0.4,
        },
      },
      {
        name: "Pierce",
        description:
          "Increase damage to barriers, shields, and armored targets by {powerDamageArmor}%.",
        attributes: {
          powerDamageArmor: 1,
          powerDamageBarrier: 1,
          powerDamageShield: 1,
        },
      },
      {
        name: "Sustain",
        description:
          "Nova gains a {ATTR_PCT}% change of not using up barriers.",
        attributes: {
          ATTR_PCT: 0.25,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1,
      barrier: 1.5,
      shield: 1,
    },
    type: 1,
    internalName: "Discharge",
  },
  Rb: {
    id: 170,
    h: ["baseRechargeSpeed", "overload"],
    g: false,
    iconSet: "Overload",
    evolutions: [
      {
        name: "Overload",
        description:
          "Overload electronics with this power surge, stunning your enemy.\n\nEffective against shields, barriers, and synthetics.\nNot as effective against organics.",
        attributes: {
          baseRechargeSpeed: 8,
          overload: 220,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Chain Overload",
        description:
          "Hit {areaTargetBonus} additional target within {radius} meters with {ATTR_PCT}% less damage.",
        attributes: {
          areaTargetBonus: 1,
          radius: 8,
          ATTR_PCT: 0.6,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Neural Shock",
        description:
          "Incapacitate weaker organic enemies for a short duration.",
        attributes: {
          neuralShock: 1,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Chain Overload",
        description:
          "Increase damage by {powerDamage}%.\nHit {areaTargetBonus} additional target within {radius} meters with {ATTR_PCT}% less damage.",
        attributes: {
          powerDamage: 0.15,
          areaTargetBonus: 1,
          radius: 8,
          ATTR_PCT: 0.6,
        },
      },
      {
        name: "Shield Damage",
        description:
          "Increase damage to barriers and shields by an additional {powerDamageShield}%.",
        attributes: {
          powerDamageBarrier: 1,
          powerDamageShield: 1,
        },
      },
    ],
    i: {
      health: 0.5,
      armor: 0.5,
      barrier: 3,
      shield: 3,
    },
    type: 2,
    internalName: "Overload",
  },
  Rb2: {
    id: 132,
    h: ["baseRechargeSpeed", "overload"],
    g: false,
    iconSet: "Overload",
    evolutions: [
      {
        name: "Overload",
        description:
          "Overload electronics with this power surge, stunning your enemy.\n\nEffective against shields, barriers, and synthetics.\nNot as effective against organics.",
        attributes: {
          baseRechargeSpeed: 8,
          overload: 220,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Chain Overload",
        description:
          "Hit {areaTargetBonus} additional target within {radius} meters with {ATTR_PCT}% less damage.",
        attributes: {
          areaTargetBonus: 1,
          radius: 8,
          ATTR_PCT: 0.6,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Neural Shock",
        description:
          "Incapacitate weaker organic enemies for a short duration.",
        attributes: {
          neuralShock: 1,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Chain Overload",
        description:
          "Increase damage by {powerDamage}%.\nHit {areaTargetBonus} additional target within {radius} meters with {ATTR_PCT}% less damage.",
        attributes: {
          powerDamage: 0.15,
          areaTargetBonus: 1,
          radius: 8,
          ATTR_PCT: 0.6,
        },
      },
      {
        name: "Shield Damage",
        description:
          "Increase damage to barriers and shields by an additional {powerDamageShield}%.",
        attributes: {
          powerDamageBarrier: 1,
          powerDamageShield: 1,
        },
      },
    ],
    i: {
      health: 0.5,
      armor: 0.5,
      barrier: 3,
      shield: 3,
    },
    type: 2,
    internalName: "Overload",
  },
  We: {
    id: 403,
    h: ["damage", "radius"],
    g: false,
    iconSet: "PalmBlaster",
    evolutions: [
      {
        name: "Phase Disruptor",
        description:
          "Focus the energy of your barrier to fire a high-powered beam at a target from afar.\n\nFiring the beam consumes {ATTR_PCT}% of max barrier.",
        attributes: {
          damage: 400,
          radius: 4,
          ATTR_PCT: 0.4,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.3,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.5,
        },
      },
      {
        name: "Knockdown",
        description: "Knock weaker enemies to the ground.",
        attributes: {},
      },
      {
        name: "Efficient Blast",
        description: "Reduce the amount of barrier drained by {ATTR_PCT}%.",
        attributes: {
          ATTR_PCT: 0.5,
        },
      },
      {
        name: "Armor Damage",
        description: "Increase damage to armor by {powerDamageArmor}%.",
        attributes: {
          powerDamageArmor: 0.75,
        },
      },
      {
        name: "Shield Damage",
        description:
          "Increase damage to shields/barriers by {powerDamageShield}%.",
        attributes: {
          powerDamageBarrier: 0.75,
          powerDamageShield: 0.75,
        },
      },
    ],
    internalName: "PalmBlaster",
  },
  Ye: {
    id: 620,
    Z: {
      damage: "Biotic Damage",
      duration: "Poison Duration",
    },
    h: ["baseRechargeSpeed", "range", "damage", "poison", "duration"],
    g: false,
    iconSet: "LineStrike",
    evolutions: [
      {
        name: "Poison Strike",
        description:
          "Slash through an enemy line while encased in this biotic barrier causing instant biotic damage and applying a poison effect that does damage over time to every hit enemy.\n\nInvulnerable while this power is in effect.",
        attributes: {
          baseRechargeSpeed: 8,
          range: 12,
          damage: 500,
          poison: 75,
          duration: 5,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
          poisonDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
          poisonDamage: 0.3,
        },
      },
      {
        name: "Range",
        description: "Increase range by {rangePct}%.",
        attributes: {
          rangePct: 0.4,
        },
      },
      {
        name: "Poison Duration",
        description: "Increase poison duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.6,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.35,
        },
      },
      {
        name: "Poison Strength",
        description:
          "Increase poison damage by {poisonDamage}%.\nParalyze up to {ATTR_INT} unshielded enemies for {ATTR_TIME} seconds.",
        attributes: {
          poisonDamage: 0.5,
          ATTR_INT: 2,
          ATTR_TIME: 4,
        },
      },
      {
        name: "Double Dash",
        description:
          "Reduce dash range by {rangePct}%, but only every other dash triggers a cooldown.",
        attributes: {
          rangePct: -0.4,
        },
      },
    ],
    type: 1,
    internalName: "LineStrike",
  },
  lc: {
    id: 172,
    h: ["baseRechargeSpeed", "damage", "radius"],
    g: true,
    iconSet: "ProximityMine",
    evolutions: [
      {
        name: "Proximity Mine",
        description:
          "Fire this sticky mine into traffic. It will detonate when an enemy steps within range.",
        attributes: {
          baseRechargeSpeed: 10,
          damage: 400,
          radius: 3,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.5,
        },
      },
      {
        name: "Damage Taken",
        description:
          "Increase damage dealt to targets from all sources by {enemyDamageTaken}% for {ATTR_TIME} seconds.",
        attributes: {
          enemyDamageTaken: 0.2,
          ATTR_TIME: 8,
        },
      },
      {
        name: "Slow",
        description:
          "Slow target's movement speed by {enemyMovementSpeed}% for {ATTR_TIME} seconds.",
        attributes: {
          enemyMovementSpeed: -0.3,
          ATTR_TIME: 8,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.5,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.4,
        },
      },
    ],
    internalName: "ProximityMine",
  },
  lc2: {
    id: 134,
    h: ["baseRechargeSpeed", "damage", "radius"],
    g: true,
    iconSet: "ProximityMine",
    evolutions: [
      {
        name: "Proximity Mine",
        description:
          "Fire this sticky mine into traffic. It will detonate when an enemy steps within range.",
        attributes: {
          baseRechargeSpeed: 10,
          damage: 400,
          radius: 3,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.5,
        },
      },
      {
        name: "Damage Taken",
        description:
          "Increase damage dealt to targets from all sources by {enemyDamageTaken}% for {ATTR_TIME} seconds.",
        attributes: {
          enemyDamageTaken: 0.2,
          ATTR_TIME: 8,
        },
      },
      {
        name: "Slow",
        description:
          "Slow target's movement speed by {enemyMovementSpeed}% for {ATTR_TIME} seconds.",
        attributes: {
          enemyMovementSpeed: -0.3,
          ATTR_TIME: 8,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.5,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.4,
        },
      },
    ],
    internalName: "ProximityMine",
  },
  Mc: {
    id: 173,
    h: ["baseRechargeSpeed", "duration"],
    g: true,
    iconSet: "Pull",
    evolutions: [
      {
        name: "Pull",
        description: "Yank an opponent helplessly off the ground.",
        attributes: {
          baseRechargeSpeed: 4,
          duration: 4,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Duration",
        description: "Increase duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.5,
        },
      },
      {
        name: "Duration",
        description: "Increase duration by {powerDuration}%.",
        attributes: {
          powerDuration: 1,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radius} meters.",
        attributes: {
          radius: 2.5,
        },
      },
      {
        name: "Lift Damage",
        description: "Inflict {ATTR_DMG} damage per second to lifted targets.",
        attributes: {
          ATTR_DMG: 75,
        },
      },
      {
        name: "Expose",
        description:
          "Increase all damage to targets lifted by Pull by {enemyDamageTaken}%.",
        attributes: {
          enemyDamageTaken: 0.3,
        },
      },
      {
        name: "Duration & Combo",
        description:
          "Increase duration by {powerDuration}%, and increase the force and damage of biotic detonations on affected targets by {comboDamage}%.",
        attributes: {
          powerDuration: 0.5,
          comboDamage: 0.75,
          comboForce: 0.75,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 1.5,
        },
      },
    ],
    type: 1,
    internalName: "Pull",
  },
  Mc2: {
    id: 71,
    h: ["baseRechargeSpeed", "duration"],
    g: true,
    iconSet: "Pull",
    evolutions: [
      {
        name: "Pull",
        description: "Yank an opponent helplessly off the ground.",
        attributes: {
          baseRechargeSpeed: 4,
          duration: 4,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Duration",
        description: "Increase duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.5,
        },
      },
      {
        name: "Duration",
        description: "Increase duration by {powerDuration}%.",
        attributes: {
          powerDuration: 1,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radius} meters.",
        attributes: {
          radius: 2.5,
        },
      },
      {
        name: "Lift Damage",
        description: "Inflict {ATTR_DMG} damage per second to lifted targets.",
        attributes: {
          ATTR_DMG: 75,
        },
      },
      {
        name: "Expose",
        description:
          "Increase all damage to targets lifted by Pull by {enemyDamageTaken}%.",
        attributes: {
          enemyDamageTaken: 0.3,
        },
      },
      {
        name: "Duration & Combo",
        description:
          "Increase duration by {powerDuration}%, and increase the force and damage of biotic detonations on affected targets by {comboDamage}%.",
        attributes: {
          powerDuration: 0.5,
          comboDamage: 0.75,
          comboForce: 0.75,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 1.5,
        },
      },
    ],
    type: 1,
    internalName: "Pull",
  },
  ab: {
    id: 206,
    h: ["weaponDamage", "globalPowerDamage", "encumbrance"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "Alliance Training",
        description:
          "A decade of rigorous combat training in the Alliance starts to click.\n\nMore power damage.\nMore weapon damage.\nMore strength.",
        attributes: {
          encumbrance: 10,
          globalPowerDamage: 0.05,
          globalPowerForce: 0.05,
          weaponDamage: 0.05,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.05,
          globalPowerForce: 0.05,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.05,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.075,
        },
      },
      {
        name: "Damage & Capacity",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.\nIncrease weight capacity bonus by {encumbrance} points.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 20,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage bonus by {headshot}%.",
        attributes: {
          headshot: 0.2,
        },
      },
      {
        name: "Weapon Weight",
        description: "Decrease weight of all weapons by {weaponWeight}%.",
        attributes: {
          weaponWeight: 0.2,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.1,
        },
      },
    ],
    internalName: "MPPassive",
  },
  bf: {
    id: 564,
    h: ["weaponDamage", "stability", "encumbrance"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "Armiger Legion",
        description:
          "The turian's lethal 26th Armiger Legion is a respected and feared frontline assault squad.\n\nMore weapon damage.\nGreater stability and weapon control.\nMore strength.",
        attributes: {
          encumbrance: 15,
          stability: 0.2,
          weaponDamage: 0.075,
        },
      },
      {
        name: "Weapon Stability",
        description: "Increase weapon stability bonus by {stability}%.",
        attributes: {
          stability: 0.15,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.05,
        },
      },
      {
        name: "Damage & Stability",
        description:
          "Increase weapon damage bonus by {weaponDamage}%.\nIncrease weapon stability bonus by {stability}%.",
        attributes: {
          weaponDamage: 0.075,
          stability: 0.1,
        },
      },
      {
        name: "Damage & Capacity",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.\nIncrease weight capacity bonus by {encumbrance} points.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 25,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage bonus by {headshot}%.",
        attributes: {
          headshot: 0.2,
        },
      },
      {
        name: "Assault Rifles",
        description: "Decrease assault rifle weight by {weaponWeightAssault}%.",
        attributes: {
          weaponWeightAssault: 0.3,
        },
      },
      {
        name: "Damage & Stability",
        description:
          "Increase weapon damage bonus by {weaponDamage}%.\nIncrease weapon stability bonus by {stability}%.",
        attributes: {
          weaponDamage: 0.1,
          stability: 0.1,
        },
      },
    ],
    internalName: "MPPassive",
  },
  Hd: {
    id: 189,
    h: ["weaponDamage", "globalPowerDamage", "encumbrance"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "Asari Justicar",
        description:
          "Centuries of training as a justicar come into focus on the battlefield.\n\nMore power damage.\nMore weapon damage.\nMore strength.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          weaponDamage: 0.025,
          encumbrance: 10,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.025,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.075,
        },
      },
      {
        name: "Damage & Capacity",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.\nIncrease weight capacity bonus by {encumbrance} points.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 20,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage bonus by {headshot}%.",
        attributes: {
          headshot: 0.2,
        },
      },
      {
        name: "Pistols",
        description:
          "Decrease the weight of heavy pistols by {weaponWeightPistol}%.",
        attributes: {
          weaponWeightPistol: 0.3,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.1,
        },
      },
    ],
    internalName: "MPPassive",
  },
  Hd2: {
    id: 566,
    h: ["weaponDamage", "globalPowerDamage", "encumbrance"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "Asari Justicar",
        description:
          "Centuries of training as a justicar come into focus on the battlefield.\n\nMore power damage.\nMore weapon damage.\nMore strength.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          weaponDamage: 0.025,
          encumbrance: 10,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.025,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.075,
        },
      },
      {
        name: "Damage & Capacity",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.\nIncrease weight capacity bonus by {encumbrance} points.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 20,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage bonus by {headshot}%.",
        attributes: {
          headshot: 0.2,
        },
      },
      {
        name: "Pistols",
        description:
          "Decrease the weight of heavy pistols by {weaponWeightPistol}%.",
        attributes: {
          weaponWeightPistol: 0.3,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.1,
        },
      },
    ],
    internalName: "MPPassive",
  },
  Hd3: {
    id: 565,
    h: ["weaponDamage", "globalPowerDamage", "encumbrance"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "Asari Justicar",
        description:
          "Centuries of training as a justicar come into focus on the battlefield.\n\nMore power damage.\nMore weapon damage.\nMore strength.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          weaponDamage: 0.025,
          encumbrance: 10,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.025,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.075,
        },
      },
      {
        name: "Damage & Capacity",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.\nIncrease weight capacity bonus by {encumbrance} points.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 20,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage bonus by {headshot}%.",
        attributes: {
          headshot: 0.2,
        },
      },
      {
        name: "Pistols",
        description:
          "Decrease the weight of heavy pistols by {weaponWeightPistol}%.",
        attributes: {
          weaponWeightPistol: 0.3,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.1,
        },
      },
    ],
    internalName: "MPPassive",
  },
  Zu: {
    id: 69,
    h: ["weaponDamage", "globalDuration", "encumbrance"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "Asari Justicar",
        description:
          "Centuries of rigid training gives the asari greater martial prowess and the mental focus to strengthen their biotics.\n\nLonger power duration.\nMore weapon damage.\nMore strength.",
        attributes: {
          weaponDamage: 0.05,
          globalDuration: 0.15,
          encumbrance: 10,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.05,
        },
      },
      {
        name: "Power Duration",
        description: "Increase power duration bonuses by {globalDuration}%.",
        attributes: {
          globalDuration: 0.2,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.075,
        },
      },
      {
        name: "Duration & Capacity",
        description:
          "Increase power duration by {globalDuration}%.\nIncrease weight capacity bonus by {encumbrance} points.",
        attributes: {
          globalDuration: 0.25,
          encumbrance: 20,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage bonus by {headshot}%.",
        attributes: {
          headshot: 0.2,
        },
      },
      {
        name: "Assault Rifles",
        description: "Decrease assault rifle weight by {weaponWeightAssault}%.",
        attributes: {
          weaponWeightAssault: 0.3,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.1,
        },
      },
    ],
    internalName: "MPPassive",
  },
  Id: {
    id: 229,
    Z: {
      ammoCapacity: "Spare Ammo",
    },
    h: ["weaponDamage", "globalPowerDamage", "ammoCapacity", "encumbrance"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "Batarian Enforcer",
        description:
          "The destruction of their home system has made the batarians even more ruthless in their struggle for survival.\n\nMore power damage.\nMore weapon damage.\nGreater thermal clip capacity.\nMore strength.",
        attributes: {
          weaponDamage: 0.025,
          globalPowerDamage: 0.075,
          globalPowerForce: 0.075,
          encumbrance: 15,
          ammoCapacity: 0.1,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.05,
          globalPowerForce: 0.05,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.05,
        },
      },
      {
        name: "Weapon Damage",
        description:
          "Increase weapon damage bonus by {weaponDamage}%.\nIncrease spare ammunition by {ammoCapacity}%.",
        attributes: {
          weaponDamage: 0.075,
          ammoCapacity: 0.05,
        },
      },
      {
        name: "Damage & Capacity",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.\nIncrease weight capacity bonus by {encumbrance} points.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 25,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage bonus by {headshot}%.",
        attributes: {
          headshot: 0.2,
        },
      },
      {
        name: "Snipers & Shotguns",
        description:
          "Reduce the weight of sniper rifles and shotguns by {weaponWeightShotgun}%.",
        attributes: {
          weaponWeightShotgun: 0.25,
          weaponWeightSniper: 0.25,
        },
      },
      {
        name: "Damage & Ammo",
        description:
          "Increase weapon damage by {weaponDamage}%.\nIncrease spare ammunition by {ammoCapacity}%.",
        attributes: {
          weaponDamage: 0.1,
          ammoCapacity: 0.1,
        },
      },
    ],
    internalName: "MPPassive",
  },
  Id2: {
    id: 549,
    Z: {
      ammoCapacity: "Spare Ammo",
    },
    h: ["weaponDamage", "globalPowerDamage", "ammoCapacity", "encumbrance"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "Batarian Enforcer",
        description:
          "The destruction of their home system has made the batarians even more ruthless in their struggle for survival.\n\nMore power damage.\nMore weapon damage.\nGreater thermal clip capacity.\nMore strength.",
        attributes: {
          weaponDamage: 0.025,
          globalPowerDamage: 0.075,
          globalPowerForce: 0.075,
          encumbrance: 15,
          ammoCapacity: 0.1,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.05,
          globalPowerForce: 0.05,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.05,
        },
      },
      {
        name: "Weapon Damage",
        description:
          "Increase weapon damage bonus by {weaponDamage}%.\nIncrease spare ammunition by {ammoCapacity}%.",
        attributes: {
          weaponDamage: 0.075,
          ammoCapacity: 0.05,
        },
      },
      {
        name: "Damage & Capacity",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.\nIncrease weight capacity bonus by {encumbrance} points.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 25,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage bonus by {headshot}%.",
        attributes: {
          headshot: 0.2,
        },
      },
      {
        name: "Snipers & Shotguns",
        description:
          "Reduce the weight of sniper rifles and shotguns by {weaponWeightShotgun}%.",
        attributes: {
          weaponWeightShotgun: 0.25,
          weaponWeightSniper: 0.25,
        },
      },
      {
        name: "Damage & Ammo",
        description:
          "Increase weapon damage by {weaponDamage}%.\nIncrease spare ammunition by {ammoCapacity}%.",
        attributes: {
          weaponDamage: 0.1,
          ammoCapacity: 0.1,
        },
      },
    ],
    internalName: "MPPassive",
  },
  cf: {
    id: 197,
    h: ["weaponDamage", "globalPowerDamage", "encumbrance"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "Drell Assassin",
        description:
          "Practice makes perfect, and years spent tuning reflexes for the perfect killshot are paying dividends.\n\nMore power damage.\nMore weapon damage.\nMore strength.",
        attributes: {
          weaponDamage: 0.05,
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 10,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.05,
          globalPowerForce: 0.05,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.05,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.1,
        },
      },
      {
        name: "Damage & Capacity",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.\nIncrease weight capacity bonus by {encumbrance} points.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
          encumbrance: 20,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.2,
          globalPowerForce: 0.2,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage bonus by {headshot}%.",
        attributes: {
          headshot: 0.3,
        },
      },
      {
        name: "Weapon Weight",
        description:
          "Decrease weight of heavy pistols by {weaponWeightPistol}%.",
        attributes: {
          weaponWeightPistol: 0.3,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.125,
        },
      },
    ],
    internalName: "MPPassive",
  },
  $u: {
    id: 588,
    Z: {
      baseRechargeSpeed: "Charge Regeneration",
    },
    h: ["weaponDamage", "globalPowerDamage", "baseRechargeSpeed"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "Elite Mercenary",
        description:
          "Years of experience working for hire have honed your combat abilities.\n\nIncrease power and weapon damage. Your battery pack also slowly regenerates a charge that can be consumed to lay Cain Trip Mines or to equip Concussive or Armor-Piercing Arrows.",
        attributes: {
          weaponDamage: 0.05,
          globalPowerDamage: 0.05,
          globalPowerForce: 0.05,
          baseRechargeSpeed: 60,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.05,
          globalPowerForce: 0.05,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.05,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.075,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.125,
          globalPowerForce: 0.125,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage bonus by {headshot}%.",
        attributes: {
          headshot: 0.2,
        },
      },
      {
        name: "Charge Generation",
        description:
          "Increase the rate that charges are regenerated by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 1,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.1,
        },
      },
    ],
    internalName: "MPPassive",
  },
  av: {
    id: 580,
    Z: {
      ammoCapacity: "Spare Ammo",
    },
    h: ["weaponDamage", "stability", "ammoCapacity", "encumbrance"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "Geth Juggernaut",
        description:
          "This advanced combat platform fine-tunes powers and weapons.\n\nMore weapon damage.\nMore weapon stability and spare ammunition.\nMore strength.",
        attributes: {
          ammoCapacity: 0.1,
          encumbrance: 20,
          stability: 0.25,
          weaponDamage: 0.05,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.05,
        },
      },
      {
        name: "Stability & Ammo",
        description:
          "Increase weapon stability by {stability}%.\nIncrease spare ammunition by {ammoCapacity}%.",
        attributes: {
          ammoCapacity: 0.05,
          stability: 0.05,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.075,
        },
      },
      {
        name: "Damage & Capacity",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.\nIncrease weight capacity bonus by {encumbrance} points.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 20,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
        },
      },
      {
        name: "Stability & Ammo",
        description:
          "Increase weapon stability by {stability}%.\nIncrease spare ammunition by {ammoCapacity}%.",
        attributes: {
          ammoCapacity: 0.15,
          stability: 0.15,
        },
      },
      {
        name: "Weapon Weight",
        description: "Decrease weight of all weapons by {weaponWeight}%.",
        attributes: {
          weaponWeight: 0.2,
        },
      },
      {
        name: "Weapon Damage",
        description:
          "Increase weapon damage bonus by {weaponDamage}%.\nIncrease damage done with geth weapons by {gethWeaponDamage}%.",
        attributes: {
          gethWeaponDamage: 0.05,
          weaponDamage: 0.1,
        },
      },
    ],
    internalName: "MPPassive",
  },
  df: {
    id: 542,
    Z: {
      gethWeaponDamage: "Geth Weapon Damage",
    },
    h: ["weaponDamage", "gethWeaponDamage", "globalPowerDamage", "encumbrance"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "Networked AI",
        description:
          "Advanced combat platform fine-tunes powers and weapons, especially geth weapons.\n\nMore power damage.\nMore weapon damage.\nMore geth weapon damage.\nMore strength.",
        attributes: {
          weaponDamage: 0.025,
          gethWeaponDamage: 0.05,
          globalPowerDamage: 0.05,
          globalPowerForce: 0.05,
          encumbrance: 10,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.025,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.075,
        },
      },
      {
        name: "Damage & Capacity",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.\nIncrease weight capacity bonus by {encumbrance} points.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 20,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage bonus by {headshot}%.",
        attributes: {
          headshot: 0.2,
        },
      },
      {
        name: "Sniper & Assault Rifles",
        description:
          "Reduce the weight of assault rifles and sniper rifles by {weaponWeightAssault}%.",
        attributes: {
          weaponWeightAssault: 0.25,
          weaponWeightSniper: 0.25,
        },
      },
      {
        name: "Weapon Damage",
        description:
          "Increase weapon damage bonus by {weaponDamage}%.\nIncrease geth weapon damage bonus by {gethWeaponDamage}%.",
        attributes: {
          weaponDamage: 0.1,
          gethWeaponDamage: 0.05,
        },
      },
    ],
    internalName: "MPPassive",
  },
  df2: {
    id: 277,
    Z: {
      gethWeaponDamage: "Geth Weapon Damage",
    },
    h: ["weaponDamage", "gethWeaponDamage", "globalPowerDamage", "encumbrance"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "Networked AI",
        description:
          "Advanced combat platform fine-tunes powers and weapons, especially geth weapons.\n\nMore power damage.\nMore weapon damage.\nMore geth weapon damage.\nMore strength.",
        attributes: {
          weaponDamage: 0.025,
          gethWeaponDamage: 0.05,
          globalPowerDamage: 0.05,
          globalPowerForce: 0.05,
          encumbrance: 10,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.025,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.075,
        },
      },
      {
        name: "Damage & Capacity",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.\nIncrease weight capacity bonus by {encumbrance} points.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 20,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage bonus by {headshot}%.",
        attributes: {
          headshot: 0.2,
        },
      },
      {
        name: "Sniper & Assault Rifles",
        description:
          "Reduce the weight of assault rifles and sniper rifles by {weaponWeightAssault}%.",
        attributes: {
          weaponWeightAssault: 0.25,
          weaponWeightSniper: 0.25,
        },
      },
      {
        name: "Weapon Damage",
        description:
          "Increase weapon damage bonus by {weaponDamage}%.\nIncrease geth weapon damage bonus by {gethWeaponDamage}%.",
        attributes: {
          weaponDamage: 0.1,
          gethWeaponDamage: 0.05,
        },
      },
    ],
    internalName: "MPPassive",
  },
  bv: {
    id: 64,
    h: ["weaponDamage", "globalPowerDamage", "encumbrance"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "Krogan Berserker",
        description:
          "Battle-skills hardened on unforgiving Tuchanka come into play.\n\nMore power damage.\nMore weapon damage.\nMore strength.",
        attributes: {
          weaponDamage: 0.05,
          globalPowerDamage: 0.05,
          globalPowerForce: 0.05,
          encumbrance: 10,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.05,
          globalPowerForce: 0.05,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.05,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.075,
        },
      },
      {
        name: "Damage & Capacity",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.\nIncrease weight capacity bonus by {encumbrance} points.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 20,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage bonus by {headshot}%.",
        attributes: {
          headshot: 0.2,
        },
      },
      {
        name: "Shotguns",
        description:
          "Decrease the weight of shotguns by {weaponWeightShotgun}%.",
        attributes: {
          weaponWeightShotgun: 0.3,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.1,
        },
      },
    ],
    internalName: "MPPassive",
  },
  ef: {
    id: 208,
    h: ["weaponDamage", "globalPowerDamage", "encumbrance"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "Krogan Berserker",
        description:
          "Battle-skills hardened on unforgiving Tuchanka come into play.\n\nMore power damage.\nMore weapon damage.\nMore strength.",
        attributes: {
          weaponDamage: 0.025,
          globalPowerDamage: 0.025,
          globalPowerForce: 0.025,
          encumbrance: 20,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.05,
          globalPowerForce: 0.05,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.05,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.075,
        },
      },
      {
        name: "Damage & Capacity",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.\nIncrease weight capacity bonus by {encumbrance} points.",
        attributes: {
          globalPowerDamage: 0.05,
          globalPowerForce: 0.05,
          encumbrance: 30,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage bonus by {headshot}%.",
        attributes: {
          headshot: 0.2,
        },
      },
      {
        name: "Shotguns",
        description:
          "Decrease the weight of shotguns by {weaponWeightShotgun}%.",
        attributes: {
          weaponWeightShotgun: 0.3,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.1,
        },
      },
    ],
    internalName: "MPPassive",
  },
  cv: {
    id: 636,
    h: ["weaponDamage", "globalPowerDamage", "encumbrance"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "Krogan Warlord",
        description:
          "Battle-skills hardened on unforgiving Tuchanka come into play.\n\nMore power damage.\nMore weapon damage.\nMore strength.",
        attributes: {
          weaponDamage: 0.025,
          globalPowerDamage: 0.025,
          globalPowerForce: 0.025,
          encumbrance: 20,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.05,
          globalPowerForce: 0.05,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.05,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.075,
        },
      },
      {
        name: "Damage & Capacity",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.\nIncrease weight capacity bonus by {encumbrance} points.",
        attributes: {
          globalPowerDamage: 0.05,
          globalPowerForce: 0.05,
          encumbrance: 30,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage bonus by {headshot}%.",
        attributes: {
          headshot: 0.2,
        },
      },
      {
        name: "Shotguns",
        description:
          "Decrease the weight of shotguns by {weaponWeightShotgun}%.",
        attributes: {
          weaponWeightShotgun: 0.3,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.1,
        },
      },
    ],
    internalName: "MPPassive",
  },
  dv: {
    id: 385,
    h: ["weaponDamage", "globalPowerDamage", "grenadeCapacity"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "N7 Demolisher",
        description:
          "Combat skills are perfected to an art with N7 training.\n\nMore power damage.\nMore weapon damage.\nGreater grenade capacity.",
        attributes: {
          weaponDamage: 0.025,
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          grenadeCapacity: 1,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.05,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.075,
        },
      },
      {
        name: "Damage & Max Grenades",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.\nIncrease grenade capacity by {grenadeCapacity}.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          grenadeCapacity: 1,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage bonus by {headshot}%.",
        attributes: {
          headshot: 0.2,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.2,
          globalPowerForce: 0.2,
        },
      },
      {
        name: "Weapon Damage & Max Grenades",
        description:
          "Increase weapon damage bonus by {weaponDamage}%.\nIncrease grenade capacity by {grenadeCapacity}.",
        attributes: {
          weaponDamage: 0.1,
          grenadeCapacity: 1,
        },
      },
    ],
    internalName: "MPPassive",
  },
  ev: {
    id: 383,
    h: ["weaponDamage", "globalPowerDamage", "encumbrance"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "T5-V Battlesuit",
        description:
          "Upgrade the cutting-edge T5-V Battlesuit.\n\nMore power damage.\nMore weapon damage.\nMore strength.",
        attributes: {
          weaponDamage: 0.05,
          globalPowerDamage: 0.05,
          globalPowerForce: 0.05,
          encumbrance: 10,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.05,
          globalPowerForce: 0.05,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.05,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.075,
        },
      },
      {
        name: "Damage & Capacity",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.\nIncrease weight capacity bonus by {encumbrance} points.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 20,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage bonus by {headshot}%.",
        attributes: {
          headshot: 0.2,
        },
      },
      {
        name: "Weapon Weight",
        description: "Decrease weight of all weapons by {weaponWeight}%.",
        attributes: {
          weaponWeight: 0.2,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.1,
        },
      },
    ],
    internalName: "MPPassive",
  },
  fv: {
    id: 391,
    h: ["weaponDamage", "globalPowerDamage", "encumbrance"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "N7 Fury",
        description:
          "Combat skills are perfected to an art with N7 training.\n\nMore power damage.\nMore weapon damage.\nMore strength.",
        attributes: {
          encumbrance: 10,
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          weaponDamage: 0.025,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.05,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.075,
        },
      },
      {
        name: "Damage & Capacity",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.\nIncrease weight capacity bonus by {encumbrance} points.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 20,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage bonus by {headshot}%.",
        attributes: {
          headshot: 0.2,
        },
      },
      {
        name: "Weapon Weight",
        description: "Decrease weight of all weapons by {weaponWeight}%.",
        attributes: {
          weaponWeight: 0.2,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.1,
        },
      },
    ],
    internalName: "MPPassive",
  },
  gv: {
    id: 380,
    h: ["weaponDamage", "globalPowerDamage", "encumbrance"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "N7 Paladin",
        description:
          "Combat skills are perfected to an art with N7 training.\n\nMore power damage.\nMore weapon damage.\nMore strength.",
        attributes: {
          encumbrance: 10,
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          weaponDamage: 0.025,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.05,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.075,
        },
      },
      {
        name: "Damage & Capacity",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.\nIncrease weight capacity bonus by {encumbrance} points.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 20,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage bonus by {headshot}%.",
        attributes: {
          headshot: 0.2,
        },
      },
      {
        name: "Weapon Weight",
        description: "Decrease weight of all weapons by {weaponWeight}%.",
        attributes: {
          weaponWeight: 0.2,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.1,
        },
      },
    ],
    internalName: "MPPassive",
  },
  hv: {
    id: 387,
    h: ["weaponDamage", "globalPowerDamage", "encumbrance"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "N7 Shadow",
        description:
          "Combat skills are perfected to an art with N7 training.\n\nMore power damage.\nMore weapon damage.\nMore strength.",
        attributes: {
          encumbrance: 10,
          globalPowerDamage: 0.05,
          globalPowerForce: 0.05,
          weaponDamage: 0.05,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.05,
          globalPowerForce: 0.05,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.05,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.075,
        },
      },
      {
        name: "Damage & Capacity",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.\nIncrease weight capacity bonus by {encumbrance} points.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 20,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage bonus by {headshot}%.",
        attributes: {
          headshot: 0.2,
        },
      },
      {
        name: "Weapon Weight",
        description: "Decrease weight of all weapons by {weaponWeight}%.",
        attributes: {
          weaponWeight: 0.2,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.1,
        },
      },
    ],
    internalName: "MPPassive",
  },
  iv: {
    id: 389,
    h: ["weaponDamage", "globalPowerDamage", "encumbrance"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "N7 Slayer",
        description:
          "Combat skills are perfected to an art with N7 training.\n\nMore power damage.\nMore weapon damage.\nMore strength.",
        attributes: {
          encumbrance: 10,
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          weaponDamage: 0.025,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.05,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.075,
        },
      },
      {
        name: "Damage & Capacity",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.\nIncrease weight capacity bonus by {encumbrance} points.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 20,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage bonus by {headshot}%.",
        attributes: {
          headshot: 0.2,
        },
      },
      {
        name: "Weapon Weight",
        description: "Decrease weight of all weapons by {weaponWeight}%.",
        attributes: {
          weaponWeight: 0.2,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.1,
        },
      },
    ],
    internalName: "MPPassive",
  },
  zh: {
    id: 356,
    h: ["weaponDamage", "globalPowerDamage", "encumbrance"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "Phoenix Training",
        description:
          "These operatives had upgrades installed by their former employer Cerberus to dramatically improve biotic and combat skills.\n\nMore power damage.\nMore weapon damage.\nMore strength.",
        attributes: {
          weaponDamage: 0.025,
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 10,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.05,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.075,
        },
      },
      {
        name: "Damage & Capacity",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.\nIncrease weight capacity bonus by {encumbrance} points.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 20,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage bonus by {headshot}%.",
        attributes: {
          headshot: 0.2,
        },
      },
      {
        name: "Pistols & Shotguns",
        description:
          "Reduce the weight of pistols and shotguns by {weaponWeightPistol}%.",
        attributes: {
          weaponWeightPistol: 0.25,
          weaponWeightShotgun: 0.25,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.1,
        },
      },
    ],
    internalName: "MPPassive",
  },
  Ah: {
    id: 199,
    h: ["weaponDamage", "globalPowerDamage", "encumbrance"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "Quarian Defender",
        description:
          "Built on a lifetime spent defending the flotilla from the geth, combat skills reach new heights.\n\nMore power damage.\nMore weapon damage.\nMore strength.",
        attributes: {
          weaponDamage: 0.025,
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 10,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.025,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.075,
        },
      },
      {
        name: "Damage & Capacity",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.\nIncrease weight capacity bonus by {encumbrance} points.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 20,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage bonus by {headshot}%.",
        attributes: {
          headshot: 0.2,
        },
      },
      {
        name: "SMGs",
        description: "Reduce the weight of SMGs by {weaponWeightSMG}%.",
        attributes: {
          weaponWeightSMG: 0.3,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.1,
        },
      },
    ],
    internalName: "MPPassive",
  },
  Bh: {
    id: 364,
    h: ["weaponDamage", "globalPowerDamage", "encumbrance"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "Quarian Defender",
        description:
          "Built on a lifetime spent defending the flotilla from the geth, combat skills reach new heights.\n\nMore power damage.\nMore weapon damage.\nMore strength.",
        attributes: {
          weaponDamage: 0.025,
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 10,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.025,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.075,
        },
      },
      {
        name: "Damage & Capacity",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.\nIncrease weight capacity bonus by {encumbrance} points.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 20,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage bonus by {headshot}%.",
        attributes: {
          headshot: 0.2,
        },
      },
      {
        name: "Weapon Weight",
        description: "Decrease weight of all weapons by {weaponWeight}%.",
        attributes: {
          weaponWeight: 0.2,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.1,
        },
      },
    ],
    internalName: "MPPassive",
  },
  jv: {
    id: 547,
    h: ["weaponDamage", "globalPowerDamage", "encumbrance"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "Quarian Defender",
        description:
          "Built on a lifetime spent defending the flotilla from the geth, combat skills reach new heights.\n\nMore power damage.\nMore weapon damage.\nMore strength.",
        attributes: {
          weaponDamage: 0.075,
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 10,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.025,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.075,
        },
      },
      {
        name: "Damage & Capacity",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.\nIncrease weight capacity bonus by {encumbrance} points.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 20,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage bonus by {headshot}%.",
        attributes: {
          headshot: 0.2,
        },
      },
      {
        name: "Weapon Weight",
        description: "Decrease weight of all weapons by {weaponWeight}%.",
        attributes: {
          weaponWeight: 0.2,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.125,
        },
      },
    ],
    internalName: "MPPassive",
  },
  Ch: {
    id: 210,
    h: ["weaponDamage", "globalPowerDamage", "encumbrance"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "Salarian Operative",
        description:
          "Years spent training as an STG operative are paying off.\n\nMore power damage.\nMore weapon damage.\nMore strength.",
        attributes: {
          weaponDamage: 0.025,
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 10,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.025,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.075,
        },
      },
      {
        name: "Damage & Capacity",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.\nIncrease weight capacity bonus by {encumbrance} points.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 20,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage bonus by {headshot}%.",
        attributes: {
          headshot: 0.2,
        },
      },
      {
        name: "Sniper Rifles",
        description:
          "Decrease weight of sniper rifles by {weaponWeightSniper}%.",
        attributes: {
          weaponWeightSniper: 0.3,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.1,
        },
      },
    ],
    internalName: "MPPassive",
  },
  ff: {
    id: 213,
    h: ["weaponDamage", "stability", "encumbrance"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "Turian Veteran",
        description:
          "Seasoned by years of hard fighting across the galaxy, combat skills come into their own.\n\nMore weapon damage.\nGreater stability and weapon control.\nMore strength.",
        attributes: {
          encumbrance: 15,
          stability: 0.2,
          weaponDamage: 0.1,
        },
      },
      {
        name: "Weapon Stability",
        description: "Increase weapon stability bonus by {stability}%.",
        attributes: {
          stability: 0.15,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.05,
        },
      },
      {
        name: "Damage & Stability",
        description:
          "Increase weapon damage bonus by {weaponDamage}%.\nIncrease weapon stability bonus by {stability}%.",
        attributes: {
          weaponDamage: 0.1,
          stability: 0.1,
        },
      },
      {
        name: "Damage & Capacity",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.\nIncrease weight capacity bonus by {encumbrance} points.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
          encumbrance: 25,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.2,
          globalPowerForce: 0.2,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage bonus by {headshot}%.",
        attributes: {
          headshot: 0.3,
        },
      },
      {
        name: "Assault Rifles",
        description: "Decrease assault rifle weight by {weaponWeightAssault}%.",
        attributes: {
          weaponWeightAssault: 0.3,
        },
      },
      {
        name: "Damage & Stability",
        description:
          "Increase weapon damage bonus by {weaponDamage}%.\nIncrease weapon stability bonus by {stability}%.",
        attributes: {
          weaponDamage: 0.125,
          stability: 0.1,
        },
      },
    ],
    internalName: "MPPassive",
  },
  ff2: {
    id: 643,
    h: ["weaponDamage", "stability", "encumbrance"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "Turian Veteran",
        description:
          "Seasoned by years of hard fighting across the galaxy, combat skills come into their own.\n\nMore weapon damage.\nGreater stability and weapon control.\nMore strength.",
        attributes: {
          encumbrance: 15,
          stability: 0.2,
          weaponDamage: 0.1,
        },
      },
      {
        name: "Weapon Stability",
        description: "Increase weapon stability bonus by {stability}%.",
        attributes: {
          stability: 0.15,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.05,
        },
      },
      {
        name: "Damage & Stability",
        description:
          "Increase weapon damage bonus by {weaponDamage}%.\nIncrease weapon stability bonus by {stability}%.",
        attributes: {
          weaponDamage: 0.1,
          stability: 0.1,
        },
      },
      {
        name: "Damage & Capacity",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.\nIncrease weight capacity bonus by {encumbrance} points.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
          encumbrance: 25,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.2,
          globalPowerForce: 0.2,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage bonus by {headshot}%.",
        attributes: {
          headshot: 0.3,
        },
      },
      {
        name: "Assault Rifles",
        description: "Decrease assault rifle weight by {weaponWeightAssault}%.",
        attributes: {
          weaponWeightAssault: 0.3,
        },
      },
      {
        name: "Damage & Stability",
        description:
          "Increase weapon damage bonus by {weaponDamage}%.\nIncrease weapon stability bonus by {stability}%.",
        attributes: {
          weaponDamage: 0.125,
          stability: 0.1,
        },
      },
    ],
    internalName: "MPPassive",
  },
  kv: {
    id: 632,
    h: ["weaponDamage", "globalPowerDamage", "encumbrance"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "Unshackled A.I.",
        description:
          "An infiltration unit designed for close-quarters combat.\n\nMore power damage.\nMore weapon damage.\nMore strength.",
        attributes: {
          weaponDamage: 0.025,
          globalPowerDamage: 0.1,
          encumbrance: 10,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.05,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.075,
        },
      },
      {
        name: "Damage & Capacity",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.\nIncrease weight capacity bonus by {encumbrance} points.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 20,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage bonus by {headshot}%.",
        attributes: {
          headshot: 0.2,
        },
      },
      {
        name: "Pistols & Shotguns",
        description:
          "Reduce the weight of pistols and shotguns by {weaponWeightPistol}%.",
        attributes: {
          weaponWeightPistol: 0.25,
          weaponWeightShotgun: 0.25,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.1,
        },
      },
    ],
    internalName: "MPPassive",
  },
  lv: {
    id: 640,
    Z: {
      protheanWeaponDamage: "Collector/Prothean Weapon Damage",
    },
    h: [
      "weaponDamage",
      "protheanWeaponDamage",
      "globalPowerDamage",
      "encumbrance",
    ],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "Vengeful Ancient",
        description:
          "Boost biotic and offensive abilities.\nIncrease Collector and Prothean weapon damage.",
        attributes: {
          weaponDamage: 0.025,
          protheanWeaponDamage: 0.05,
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 10,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.025,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.075,
        },
      },
      {
        name: "Damage & Capacity",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.\nIncrease weight capacity bonus by {encumbrance} points.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 20,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage bonus by {headshot}%.",
        attributes: {
          headshot: 0.2,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.2,
          globalPowerForce: 0.2,
        },
      },
      {
        name: "Collector/Prothean Weapon Damage",
        description:
          "Increase weapon damage bonus by {weaponDamage}%.\nIncrease Collector and Prothean weapon damage bonus by {protheanWeaponDamage}%.",
        attributes: {
          weaponDamage: 0.1,
          protheanWeaponDamage: 0.05,
        },
      },
    ],
    internalName: "MPPassive",
  },
  Jd: {
    id: 494,
    h: ["weaponDamage", "globalPowerDamage", "encumbrance"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "Volus Training",
        description:
          "Upgrades to the advanced power armor suit provide enhanced combat abilities.\n\nMore power damage.\nMore weapon damage.\nMore strength.",
        attributes: {
          weaponDamage: 0.025,
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 10,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.025,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.075,
        },
      },
      {
        name: "Damage & Capacity",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.\nIncrease weight capacity bonus by {encumbrance} points.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 20,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
        },
      },
      {
        name: "Shield Boost",
        description:
          "Increase the amount of shields restored by Shield Boost by {shieldBoostPassive}%.",
        attributes: {
          shieldBoostPassive: 0.3,
        },
      },
      {
        name: "Weapon Weight",
        description: "Decrease weight of all weapons by {weaponWeight}%.",
        attributes: {
          weaponWeight: 0.2,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.1,
        },
      },
    ],
    internalName: "MPPassive",
  },
  gf: {
    id: 366,
    h: ["weaponDamage", "globalPowerDamage", "encumbrance"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "Vorcha Resilience",
        description:
          "A vorcha's adaptable nature gives them advantages in combat.\n\nMore power damage.\nMore weapon damage.\nMore strength.",
        attributes: {
          weaponDamage: 0.05,
          globalPowerDamage: 0.05,
          globalPowerForce: 0.05,
          encumbrance: 10,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.05,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.05,
          globalPowerForce: 0.05,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.075,
        },
      },
      {
        name: "Damage & Capacity",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.\nIncrease weight capacity bonus by {encumbrance} points.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 20,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage bonus by {headshot}%.",
        attributes: {
          headshot: 0.2,
        },
      },
      {
        name: "Shotguns and Assault Rifles",
        description:
          "Reduce the weight of shotguns and assault rifles by {weaponWeightAssault}%.",
        attributes: {
          weaponWeightAssault: 0.25,
          weaponWeightShotgun: 0.25,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.1,
        },
      },
    ],
    internalName: "MPPassive",
  },
  gf2: {
    id: 554,
    h: ["weaponDamage", "globalPowerDamage", "encumbrance"],
    g: false,
    iconSet: "MPPassive",
    M: true,
    evolutions: [
      {
        name: "Vorcha Resilience",
        description:
          "A vorcha's adaptable nature gives them advantages in combat.\n\nMore power damage.\nMore weapon damage.\nMore strength.",
        attributes: {
          weaponDamage: 0.05,
          globalPowerDamage: 0.05,
          globalPowerForce: 0.05,
          encumbrance: 10,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.05,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.05,
          globalPowerForce: 0.05,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.075,
        },
      },
      {
        name: "Damage & Capacity",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.\nIncrease weight capacity bonus by {encumbrance} points.",
        attributes: {
          globalPowerDamage: 0.1,
          globalPowerForce: 0.1,
          encumbrance: 20,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force bonuses by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.15,
          globalPowerForce: 0.15,
        },
      },
      {
        name: "Headshots",
        description: "Increase headshot damage bonus by {headshot}%.",
        attributes: {
          headshot: 0.2,
        },
      },
      {
        name: "Shotguns and Assault Rifles",
        description:
          "Reduce the weight of shotguns and assault rifles by {weaponWeightAssault}%.",
        attributes: {
          weaponWeightAssault: 0.25,
          weaponWeightShotgun: 0.25,
        },
      },
      {
        name: "Weapon Damage",
        description: "Increase weapon damage bonus by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.1,
        },
      },
    ],
    internalName: "MPPassive",
  },
  sv: {
    id: 70,
    h: ["baseRechargeSpeed", "dot", "duration", "damageReduction"],
    g: true,
    iconSet: "Reave",
    evolutions: [
      {
        name: "Reave",
        description:
          "Drain a target's health and disrupt their resistances, receiving increased damage protection while this power is in effect.\n\nEffective against barriers and armor.",
        attributes: {
          baseRechargeSpeed: 8,
          dot: 100,
          duration: 4,
          damageReduction: 0.15,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Duration",
        description: "Increase duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.35,
        },
      },
      {
        name: "Duration",
        description: "Increase duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.4,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radius} meters.",
        attributes: {
          radius: 3,
        },
      },
      {
        name: "Damage Reduction",
        description: "Increase damage protection by {damageReduction}%.",
        attributes: {
          damageReduction: 0.1,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.35,
        },
      },
      {
        name: "Barriers & Armor",
        description:
          "Increase effectiveness against armor and barriers by {powerDamageArmor}%.",
        attributes: {
          powerDamageArmor: 0.75,
          powerDamageBarrier: 0.75,
        },
      },
      {
        name: "Damage & Duration",
        description:
          "Increase damage by {powerDamage}%.\nIncrease duration by {powerDuration}%.\nIncrease damage protection bonus by {damageReduction}%.",
        attributes: {
          powerDamage: 0.3,
          powerDuration: 0.3,
          damageReduction: 0.15,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1.5,
      barrier: 2,
      shield: 0.5,
    },
    type: 1,
    is_biotic_primer: true,
    internalName: "Reave",
  },
  tv: {
    id: 174,
    h: ["baseRechargeSpeed", "dot", "duration", "damageReduction"],
    g: true,
    iconSet: "Reave",
    evolutions: [
      {
        name: "Reave",
        description:
          "Drain a target's health and disrupt their resistances, receiving increased damage protection while this power is in effect.\n\nEffective against barriers and armor.",
        attributes: {
          baseRechargeSpeed: 8,
          dot: 70,
          duration: 4,
          damageReduction: 0.15,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Duration",
        description: "Increase duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.35,
        },
      },
      {
        name: "Duration",
        description: "Increase duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.4,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radius} meters.",
        attributes: {
          radius: 3,
        },
      },
      {
        name: "Damage Reduction",
        description: "Increase damage protection by {damageReduction}%.",
        attributes: {
          damageReduction: 0.1,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.35,
        },
      },
      {
        name: "Barriers & Armor",
        description:
          "Increase effectiveness against armor and barriers by {powerDamageArmor}%.",
        attributes: {
          powerDamageArmor: 0.75,
          powerDamageBarrier: 0.75,
        },
      },
      {
        name: "Damage & Duration",
        description:
          "Increase damage by {powerDamage}%.\nIncrease duration by {powerDuration}%.\nIncrease damage protection bonus by {damageReduction}%.",
        attributes: {
          powerDamage: 0.3,
          powerDuration: 0.3,
          damageReduction: 0.15,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1.5,
      barrier: 2,
      shield: 0.5,
    },
    type: 1,
    is_biotic_primer: true,
    internalName: "Reave",
  },
  Kd: {
    id: 493,
    Z: {
      radius: "Explosion Radius",
      range: "Scan Radius",
    },
    h: ["baseRechargeSpeed", "damage", "radius", "range"],
    g: true,
    iconSet: "ReconMine",
    evolutions: [
      {
        name: "Recon Mine",
        description:
          "Launch a mine that sticks to the first surface it touches and arms after {ATTR_TIME} seconds. The mine scans the area for enemies to provide a tactical overlay, and it can be detonated at any time to deal massive damage to nearby targets.\n\nOnly one mine can be active at a time.",
        attributes: {
          baseRechargeSpeed: 20,
          damage: 700,
          radius: 6,
          range: 8,
          ATTR_TIME: 3,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Radius",
        description: "Increase scan and explosion radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.5,
          rangePct: 0.5,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.4,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.35,
        },
      },
      {
        name: "Armor Damage",
        description:
          "Increase damage to armored targets by {powerDamageArmor}%.",
        attributes: {
          powerDamageArmor: 0.75,
        },
      },
      {
        name: "Invasive Scan",
        description:
          "Scanned enemies take {enemyDamageTaken}% more damage from all sources and move {enemyMovementSpeed}% more slowly.",
        attributes: {
          enemyDamageTaken: 0.25,
          enemyMovementSpeed: -0.3,
        },
      },
    ],
    type: 2,
    internalName: "ReconMine",
  },
  kf: {
    id: 630,
    h: ["repairMatrix", "duration", "RMDR", "movementSpeed"],
    g: true,
    iconSet: "RepairMatrix",
    M: true,
    evolutions: [
      {
        name: "Repair Matrix",
        description:
          "Reinforce armor with metal-repelling Foucault currents to increase movement speed, decrease damage taken, and to regenerate shields for a short duration. When activated, the fallen caster instantly gets back on their feet. This can only occur once, and a limited number of charges can be carried for this power.",
        attributes: {
          repairMatrix: 75,
          duration: 8,
          RMDR: 0.15,
          movementSpeed: 0.1,
        },
      },
      {
        name: "Charge Capacity",
        description:
          "Increase the maximum number of charges that can be carried by {grenadeCapacity}.",
        attributes: {
          grenadeCapacity: 1,
        },
      },
      {
        name: "Shields Restored",
        description:
          "Increase the amount of shields restored by {repairShields}%.",
        attributes: {
          repairShields: 0.2,
        },
      },
      {
        name: "Survivability",
        description:
          "Decrease damage taken by 5%.\nIncrease movement speed by {movementSpeed}%.",
        attributes: {
          RMDR: 0.05,
          movementSpeed: 0.1,
        },
      },
      {
        name: "Shields Restored",
        description:
          "Increase the amount of shields restored by {repairShields}%.",
        attributes: {
          repairShields: 0.3,
        },
      },
      {
        name: "Charge Capacity",
        description:
          "Increase the maximum number of charges that can be carried by {grenadeCapacity}.",
        attributes: {
          grenadeCapacity: 1,
        },
      },
      {
        name: "Duration",
        description: "Increase duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.5,
        },
      },
      {
        name: "Lasting Repair Matrix",
        description:
          "When getting back up from a downed state, take 75% less damage for {ATTR_TIME} seconds.",
        attributes: {
          ATTR_TIME: 5,
        },
      },
      {
        name: "Enhanced Repair Matrix",
        description:
          "Increase the amount of shields restored by {repairShields}%.\nReduce damage taken by 10%.",
        attributes: {
          repairShields: 0.35,
          RMDR: 0.1,
        },
      },
    ],
    is_grenade_power: true,
    pb: "",
    internalName: "RepairMatrix",
  },
  Nc: {
    id: 140,
    Z: {
      duration: "Hack Duration",
      damage: "Backfire",
    },
    h: ["baseRechargeSpeed", "duration", "radius", "damage"],
    g: true,
    iconSet: "Hacking",
    evolutions: [
      {
        name: "Sabotage",
        description:
          "Sabotage weapons and hack synthetics.\n\nCompromised synthetics fight on your side.\nAffected weapons overheat.",
        attributes: {
          baseRechargeSpeed: 10,
          duration: 10,
          radius: 2.5,
          damage: 250,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.3,
        },
      },
      {
        name: "Duration",
        description: "Increase duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.5,
        },
      },
      {
        name: "Backfire",
        description:
          "Increase damage taken by {powerDamage}% when enemy weapons overheat.",
        attributes: {
          powerDamage: 0.6,
        },
      },
      {
        name: "Explosive Hack",
        description:
          "Synthetics explode when destroyed, dealing {ATTR_DMG} points of damage across a {ATTR_INT} meter radius.",
        attributes: {
          ATTR_DMG: 350,
          ATTR_INT: 4,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.35,
        },
      },
      {
        name: "Berserk",
        description:
          "Hacked synthetics fighting on your side move faster and do {ATTR_PCT}% more damage.",
        attributes: {
          ATTR_PCT: 0.5,
        },
      },
      {
        name: "Tech Vulnerability",
        description:
          "Increase all tech power damage done to target by {powerDamage}% for {ATTR_TIME} seconds.",
        attributes: {
          powerDamage: 0.5,
          ATTR_TIME: 10,
          sabotageMelee: 0.5,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1,
      barrier: 1,
      shield: 2,
    },
    type: 2,
    internalName: "Hacking",
  },
  nf: {
    id: 638,
    Z: {
      duration: "Movement Speed Duration",
    },
    h: [
      "baseRechargeSpeed",
      "damage",
      "enemyMovementSpeed",
      "duration",
      "seekerSwarmDR",
    ],
    g: true,
    iconSet: "SeekerSwarm",
    evolutions: [
      {
        name: "Seeker Swarm",
        description:
          "Summon {seekerSwarm} Seeker Swarms to cloud around you. Use the power again to launch a swarm at your target that deals damage and slows movement.",
        attributes: {
          baseRechargeSpeed: 24,
          damage: 150,
          enemyMovementSpeed: -0.1,
          duration: 4,
          seekerSwarm: 3,
          seekerSwarmDR: 0,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.15,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Slow",
        description:
          "Decrease target movement speed by an additional {enemyMovementSpeed}%.\nIncrease the duration of the slowdown by {powerDuration}%.",
        attributes: {
          enemyMovementSpeed: -0.1,
          powerDuration: 0.4,
        },
      },
      {
        name: "Damage Reduction",
        description:
          "Upgrade the Seeker Swarm field for 10% damage protection for each active swarm.",
        attributes: {
          seekerSwarmDR: 0.3,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.4,
        },
      },
      {
        name: "Swarm Count",
        description: "Increase the number of Seeker Swarms by {seekerSwarm}.",
        attributes: {
          seekerSwarm: 1,
          seekerSwarmDR: 0.1,
        },
      },
      {
        name: "Damage & Slow",
        description:
          "Increase damage by {powerDamage}%.\nDecrease target movement speed by an additional {enemyMovementSpeed}%.\nIncrease the duration of the slowdown by {powerDuration}%.",
        attributes: {
          powerDamage: 0.5,
          enemyMovementSpeed: -0.15,
          powerDuration: 0.2,
        },
      },
    ],
    type: 1,
    internalName: "SeekerSwarm",
  },
  Md: {
    id: 176,
    Z: {
      damage: "Turret Damage",
      petShield: "Turret Shields",
    },
    h: ["baseRechargeSpeed", "damage", "petShield"],
    g: false,
    iconSet: "SentryTurret",
    internalName: "SENTRYTURRET",
    evolutions: [
      {
        name: "Sentry Turret",
        description: "Deploy this heavy-weapon turret for cover fire.",
        attributes: {
          baseRechargeSpeed: 5,
          damage: 75,
          petShield: 1000,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Shields & Damage",
        description:
          "Increase turret's shields by {petShieldStrength}%.\nIncrease turret's damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
          petShieldStrength: 0.3,
        },
      },
      {
        name: "Shields & Damage",
        description:
          "Increase turret's shields by {petShieldStrength}%.\nIncrease turret's damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.4,
          petShieldStrength: 0.4,
        },
      },
      {
        name: "Shock",
        description: "Upgrade turret with shock attack to stun enemies.",
        attributes: {},
      },
      {
        name: "Cryo Ammo",
        description:
          "Upgrade turret with cryo ammo, giving it a chance to freeze enemies for {ATTR_TIME} seconds.",
        attributes: {
          ATTR_TIME: 3,
        },
      },
      {
        name: "Armor-Piercing Ammo",
        description:
          "Upgrade turret with armor-piercing ammo, giving it a {powerDamageArmor}% damage bonus against armor.",
        attributes: {
          powerDamageArmor: 1,
        },
      },
      {
        name: "Rockets",
        description:
          "Upgrade turret with long-range rockets that deal {ATTR_DMG} points of damage across a {radius} meter radius.",
        attributes: {
          ATTR_DMG: 300,
          radius: 2.5,
        },
      },
      {
        name: "Flamethrower",
        description:
          "Upgrade turret with a close-range flamethrower that deals {ATTR_DMG} points of damage per second.",
        attributes: {
          ATTR_DMG: 65,
        },
      },
    ],
    type: 2,
  },
  of: {
    id: 401,
    h: ["baseRechargeSpeed", "shadowstrike", "damageReduction"],
    g: true,
    iconSet: "ShadowStrike",
    internalName: "SHADOWSTRIKE",
    evolutions: [
      {
        name: "Shadow Strike",
        description:
          "Cloak and sneak behind your target to unleash a vicious sword attack.\n\nReceives damage bonuses from sword upgrades.\nConsidered a melee attack.",
        attributes: {
          baseRechargeSpeed: 8,
          shadowstrike: 600,
          damageReduction: 0,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Damage Protection",
        description:
          "Reduce all damage taken by {damageReduction}% for {ATTR_TIME} seconds after decloaking.",
        attributes: {
          damageReduction: 0.4,
          ATTR_TIME: 5,
        },
      },
      {
        name: "Electric Damage",
        description:
          "Hit your opponent with an electrical attack that does {powerDOT}% additional damage over {ATTR_TIME} seconds.\n\nDetonate this effect with other powers.",
        attributes: {
          powerDOT: 0.4,
          ATTR_TIME: 5,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.35,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.5,
        },
      },
      {
        name: "Shield Drain",
        description:
          "Strike shields or barriers to drain their energy to refill your shields.\nIncrease movement speed by {movementSpeed}% for {ATTR_TIME} seconds after decloaking.",
        attributes: {
          movementSpeed: 0.15,
          ATTR_TIME: 4,
        },
      },
    ],
    type: 2,
  },
  Eb: {
    id: 482,
    Z: {
      duration: "Restore Duration",
    },
    h: [
      "baseRechargeSpeed",
      "radius",
      "shieldBoost",
      "shieldBoostRegen",
      "duration",
      "damageReduction",
    ],
    g: true,
    iconSet: "ShieldBoost",
    evolutions: [
      {
        name: "Shield Boost",
        description:
          "Repair your shields and those of nearby allies, providing a large initial boost to shields, and then restoring shields every second for {ATTR_TIME} seconds.",
        attributes: {
          baseRechargeSpeed: 12,
          radius: 5,
          shieldBoost: 400,
          shieldBoostRegen: 100,
          duration: 3,
          ATTR_TIME: 3,
          damageReduction: 0,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Shields",
        description: "Increase shields restored by {shieldBoostPower}%.",
        attributes: {
          shieldBoostPower: 0.3,
        },
      },
      {
        name: "Impact Radius",
        description: "Increase impact radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.4,
        },
      },
      {
        name: "Shields",
        description: "Increase shields restored by {shieldBoostPower}%.",
        attributes: {
          shieldBoostPower: 0.4,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.35,
        },
      },
      {
        name: "Regeneration",
        description:
          "Reduce the delay before shields start regenerating by {shieldRechargeRate}% for {ATTR_TIME} seconds for you and affected allies.",
        attributes: {
          shieldRechargeRate: 0.2,
          ATTR_TIME: 12,
        },
      },
      {
        name: "Duration",
        description:
          "Increase the duration that shields are restored by {powerDuration}%.",
        attributes: {
          powerDuration: 1,
        },
      },
      {
        name: "Protection",
        description:
          "Increase shield restoration by {shieldBoostPower}%, causing you and affected allies to take {damageReduction}% less damage for {ATTR_TIME} seconds.\nTotal damage reduction from all sources cannot exceed {ATTR_PCT}%.",
        attributes: {
          shieldBoostPower: 0.5,
          damageReduction: 0.5,
          ATTR_TIME: 6,
          ATTR_PCT: 0.9,
        },
      },
    ],
    internalName: "ShieldBoost",
  },
  Fb: {
    id: 177,
    h: ["baseRechargeSpeed", "damage", "force", "radius", "range"],
    g: false,
    iconSet: "Shockwave",
    evolutions: [
      {
        name: "Shockwave",
        description: "Topple a row of enemies with this cascading shockwave.",
        attributes: {
          baseRechargeSpeed: 8,
          damage: 300,
          force: 700,
          radius: 2,
          range: 16,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Force & Damage",
        description: "Increase damage and force by {powerDamage}%.",
        attributes: {
          powerDamage: 0.25,
          powerForce: 0.25,
        },
      },
      {
        name: "Force & Damage",
        description: "Increase damage and force by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
          powerForce: 0.3,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.3,
        },
      },
      {
        name: "Detonate",
        description:
          "Increase force and damage of biotic detonations by {comboDamage}%.",
        attributes: {
          comboDamage: 0.65,
          comboForce: 0.65,
        },
      },
      {
        name: "Reach",
        description:
          "Increase the distance that Shockwave cascades by {rangePct}%.",
        attributes: {
          rangePct: 0.5,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.4,
        },
      },
      {
        name: "Lifting Shockwave",
        description: "Suspend targets in the air for a short time.",
        attributes: {},
      },
    ],
    i: {
      health: 1,
      armor: 1,
      barrier: 1.5,
      shield: 1,
    },
    type: 1,
    internalName: "Shockwave",
  },
  Fb2: {
    id: 62,
    h: ["baseRechargeSpeed", "damage", "force", "radius", "range"],
    g: false,
    iconSet: "Shockwave",
    evolutions: [
      {
        name: "Shockwave",
        description: "Topple a row of enemies with this cascading shockwave.",
        attributes: {
          baseRechargeSpeed: 8,
          damage: 300,
          force: 700,
          radius: 2,
          range: 16,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Force & Damage",
        description: "Increase damage and force by {powerDamage}%.",
        attributes: {
          powerDamage: 0.25,
          powerForce: 0.25,
        },
      },
      {
        name: "Force & Damage",
        description: "Increase damage and force by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
          powerForce: 0.3,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.3,
        },
      },
      {
        name: "Detonate",
        description:
          "Increase force and damage of biotic detonations by {comboDamage}%.",
        attributes: {
          comboDamage: 0.65,
          comboForce: 0.65,
        },
      },
      {
        name: "Reach",
        description:
          "Increase the distance that Shockwave cascades by {rangePct}%.",
        attributes: {
          rangePct: 0.5,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.4,
        },
      },
      {
        name: "Lifting Shockwave",
        description: "Suspend targets in the air for a short time.",
        attributes: {},
      },
    ],
    i: {
      health: 1,
      armor: 1,
      barrier: 1.5,
      shield: 1,
    },
    type: 1,
    internalName: "Shockwave",
  },
  rf: {
    id: 578,
    Z: {
      knockdown: "Knockdown Chance",
    },
    h: [
      "baseRechargeSpeed",
      "damage",
      "radius",
      "knockdown",
      "siegeCharge",
      "siegeDR",
    ],
    g: true,
    iconSet: "SiegePulse",
    evolutions: [
      {
        name: "Siege Pulse",
        description:
          "Generate {siegeCharge} electric charges that are stored in your platform's batteries. Use the power again to consume a charge to launch a long-range pulse that blasts a massive area. Each shot has a chance of incapacitating unarmored enemies.\n\nHighly effective against armor, shields, and barriers.",
        attributes: {
          baseRechargeSpeed: 24,
          damage: 600,
          radius: 1.5,
          knockdown: 0.35,
          siegeCharge: 3,
          siegeDR: 0,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.6,
        },
      },
      {
        name: "Damage Protection",
        description:
          "Each stored charge on your platform reduces all damage taken by 10%.",
        attributes: {
          siegeDR: 0.3,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.4,
        },
      },
      {
        name: "Number of Shots",
        description:
          "Increase the number of shots fired by {siegeCharge}, and increase the chance of knocking down enemies by {knockdown}%.",
        attributes: {
          siegeCharge: 1,
          knockdown: 0.15,
          siegeDR: 0.1,
        },
      },
      {
        name: "Resistance Damage",
        description:
          "Increase damage done to armor, shields, and barriers by {ATTR_PCT}%.",
        attributes: {
          ATTR_PCT: 0.6,
          powerDamageArmor: 0.4,
          powerDamageBarrier: 0.4,
          powerDamageShield: 0.4,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1.35,
      barrier: 1.35,
      shield: 1.35,
    },
    type: 2,
    internalName: "SiegePulse",
  },
  Pc: {
    id: 179,
    h: ["baseRechargeSpeed", "duration", "radius", "dot"],
    g: true,
    iconSet: "Singularity",
    evolutions: [
      {
        name: "Singularity",
        description:
          "Create a sphere of dark energy that traps and dangles enemies caught in its field.",
        attributes: {
          baseRechargeSpeed: 8,
          duration: 8,
          radius: 1.5,
          dot: 100,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Duration",
        description: "Increase duration by {powerDuration}%.",
        attributes: {
          powerDuration: 1.5,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.35,
        },
      },
      {
        name: "Lift Damage",
        description: "Inflict {ATTR_DMG} damage per second to lifted targets.",
        attributes: {
          ATTR_DMG: 50,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.35,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.5,
        },
      },
      {
        name: "Detonate",
        description:
          "Detonate Singularity when the field dies to inflict {ATTR_DMG} damage across {ATTR_INT} meters.",
        attributes: {
          ATTR_DMG: 500,
          ATTR_INT: 7,
        },
      },
    ],
    type: 1,
    is_biotic_primer: true,
    internalName: "Singularity",
  },
  Pd: {
    id: 361,
    h: ["baseRechargeSpeed", "damage", "force", "radius"],
    g: true,
    iconSet: "WhipSmash",
    evolutions: [
      {
        name: "Smash",
        description:
          "Drive the lash into the ground to cause area-of-effect damage and devastating direct damage.",
        attributes: {
          baseRechargeSpeed: 8,
          damage: 550,
          force: 450,
          radius: 1.5,
          range: 8,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Force & Damage",
        description: "Increase force and damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
          powerForce: 0.2,
        },
      },
      {
        name: "Biotic Combo",
        description:
          "Add a biotic effect to a target that can be detonated.\nIncrease damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Electrical Damage",
        description:
          "Add an electrical effect to a target that can be detonated.\nIncrease damage by an additional {powerDOT}% for {ATTR_TIME} seconds.",
        attributes: {
          powerDOT: 0.5,
          ATTR_TIME: 7.5,
        },
      },
      {
        name: "Force & Damage",
        description: "Increase force and damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.4,
          powerForce: 0.4,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.4,
        },
      },
      {
        name: "Armor Damage",
        description:
          "Increase effectiveness against armor and barriers by {powerDamageArmor}%.",
        attributes: {
          powerDamageArmor: 0.75,
          powerDamageBarrier: 0.75,
        },
      },
      {
        name: "Impact Radius",
        description:
          "Increase radius by {radiusPct}%.\nIncrease the number of targets hit by {areaTargetBonus}.",
        attributes: {
          radiusPct: 0.5,
          areaTargetBonus: 1,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1.5,
      barrier: 1.5,
      shield: 1.5,
    },
    type: 1,
    is_biotic_primer: true,
    internalName: "WhipSmash",
  },
  Qd: {
    id: 379,
    Z: {
      duration: "Freeze Duration",
    },
    h: [
      "baseRechargeSpeed",
      "damage",
      "range",
      "duration",
      "enemyMovementSpeed",
    ],
    g: true,
    iconSet: "CryoCone",
    evolutions: [
      {
        name: "Snap Freeze",
        description:
          "Flash-freeze unprotected enemies and slow down the rest with a wave of ice damage.\n\nFrozen targets don't regenerate health.\nWeaken armor by {enemyArmorWeakening}%.",
        attributes: {
          baseRechargeSpeed: 8,
          damage: 250,
          range: 10,
          duration: 6,
          enemyArmorWeakening: 0.25,
          enemyMovementSpeed: -0.15,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Reach",
        description: "Increase range by {rangePct}%.",
        attributes: {
          rangePct: 0.5,
        },
      },
      {
        name: "Duration & Slow",
        description:
          "Increase the duration of freeze effects by {powerDuration}%.\nDecrease the movement speed of chilled targets by an additional {enemyMovementSpeed}%.",
        attributes: {
          powerDuration: 0.5,
          enemyMovementSpeed: -0.2,
        },
      },
      {
        name: "Cryo Explosion",
        description:
          "Increase damage to chilled and frozen targets by {enemyDamageTaken}%.",
        attributes: {
          enemyDamageTaken: 0.1,
        },
      },
      {
        name: "Damage & Weakness",
        description:
          "Increase damage by {powerDamage}%.\nWeaken armored targets by an additional {enemyArmorWeakening}%.",
        attributes: {
          powerDamage: 0.4,
          enemyArmorWeakening: 0.25,
        },
      },
      {
        name: "Tech Combo",
        description: "Increase the damage of tech combos by {techCombo}%.",
        attributes: {
          techCombo: 1,
        },
      },
    ],
    type: 2,
    cryo: true,
    internalName: "CryoCone",
  },
  Qd1: {
    id: 646,
    Z: {
      duration: "Freeze Duration",
    },
    h: [
      "baseRechargeSpeed",
      "damage",
      "range",
      "duration",
      "enemyMovementSpeed",
    ],
    g: true,
    iconSet: "CryoCone",
    evolutions: [
      {
        name: "Snap Freeze",
        description:
          "Flash-freeze unprotected enemies and slow down the rest with a wave of ice damage.\n\nFrozen targets don't regenerate health.\nWeaken armor by {enemyArmorWeakening}%.",
        attributes: {
          baseRechargeSpeed: 8,
          damage: 250,
          range: 10,
          duration: 6,
          enemyArmorWeakening: 0.25,
          enemyMovementSpeed: -0.15,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Reach",
        description: "Increase range by {rangePct}%.",
        attributes: {
          rangePct: 0.5,
        },
      },
      {
        name: "Duration & Slow",
        description:
          "Increase the duration of freeze effects by {powerDuration}%.\nDecrease the movement speed of chilled targets by an additional {enemyMovementSpeed}%.",
        attributes: {
          powerDuration: 0.5,
          enemyMovementSpeed: -0.2,
        },
      },
      {
        name: "Cryo Explosion",
        description:
          "Increase damage to chilled and frozen targets by {enemyDamageTaken}%.",
        attributes: {
          enemyDamageTaken: 0.1,
        },
      },
      {
        name: "Damage & Weakness",
        description:
          "Increase damage by {powerDamage}%.\nWeaken armored targets by an additional {enemyArmorWeakening}%.",
        attributes: {
          powerDamage: 0.4,
          enemyArmorWeakening: 0.25,
        },
      },
      {
        name: "Tech Combo",
        description: "Increase the damage of tech combos by {techCombo}%.",
        attributes: {
          techCombo: 1,
        },
      },
    ],
    type: 2,
    cryo: true,
    internalName: "CryoCone",
  },
  Qc: {
    id: 181,
    h: ["baseRechargeSpeed", "duration"],
    g: true,
    iconSet: "Stasis",
    evolutions: [
      {
        name: "Stasis",
        description:
          "Stop an enemy in its tracks with this powerful mass effect field. No effect on armored targets.\n\nEnemies eventually break out of Stasis after taking major damage.",
        attributes: {
          duration: 6,
          baseRechargeSpeed: 10,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Duration",
        description: "Increase duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.3,
        },
      },
      {
        name: "Duration",
        description: "Increase duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.4,
        },
      },
      {
        name: "Stasis Strength",
        description:
          "Deal {stasisStrength}% more damage to targets before Stasis breaks.",
        attributes: {
          stasisStrength: 1.5,
        },
      },
      {
        name: "Bonus Power",
        description:
          "Use two powers in a row by giving the first power a {ATTR_PCT}% chance to cause no cooldown.",
        attributes: {
          ATTR_PCT: 0.3,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.35,
        },
      },
      {
        name: "Bubble",
        description:
          "Unleash a Stasis bubble to trap enemies that walk into it.",
        attributes: {},
      },
      {
        name: "Vulnerability",
        description:
          "Increase all damage done to target by {enemyDamageTaken}%.\nDeal {stasisStrength}% more damage to targets before Stasis breaks.",
        attributes: {
          enemyDamageTaken: 0.5,
          stasisStrength: 0.35,
        },
      },
    ],
    type: 1,
    is_biotic_primer: true,
    internalName: "Stasis",
  },
  Rc: {
    id: 182,
    h: ["damage", "radius"],
    g: false,
    iconSet: "StickyGrenade",
    M: true,
    evolutions: [
      {
        name: "Sticky Grenade",
        description:
          "Stick this grenade to your opponent, and the explosion will tear apart the target and the shrapnel will damage other enemies caught in the blast.",
        attributes: {
          damage: 1100,
          radius: 2,
        },
      },
      {
        name: "Max Grenades",
        description: "Increase grenade capacity by {grenadeCapacity}.",
        attributes: {
          grenadeCapacity: 1,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radiusPct}%.",
        attributes: {
          radiusPct: 0.3,
        },
      },
      {
        name: "Max Grenades",
        description: "Increase grenade capacity by {grenadeCapacity}.",
        attributes: {
          grenadeCapacity: 2,
        },
      },
      {
        name: "Armor-Piercing",
        description: "Increase damage to armored units by {powerDamageArmor}%.",
        attributes: {
          powerDamageArmor: 0.5,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.4,
        },
      },
      {
        name: "Proximity Trap",
        description:
          "Grenades stay active for {ATTR_TIME} seconds when attached to a wall or surface, exploding when an enemy approaches.\nIncrease impact radius by {radiusPct}%.",
        attributes: {
          ATTR_TIME: 15,
          radiusPct: 0.5,
        },
      },
    ],
    is_grenade_power: true,
    internalName: "StickyGrenade",
  },
  Rd: {
    id: 560,
    Z: {
      stimpackDamage: "Damage",
    },
    h: ["stimpackShields", "stimpackDamage", "duration"],
    g: true,
    iconSet: "StimPack",
    M: true,
    evolutions: [
      {
        name: "Stimulant Pack",
        description:
          "A specially designed ops survival pack that temporarily increases survivability and all damage output.\n\nA limited number of these packs can be carried.",
        attributes: {
          stimpackShields: 1200,
          stimpackDamage: 0.05,
          duration: 6,
        },
      },
      {
        name: "Pack Capacity",
        description: "Increase pack capacity by {grenadeCapacity}.",
        attributes: {
          grenadeCapacity: 1,
        },
      },
      {
        name: "Damage",
        description: "Increase damage bonus by {stimpackDamage}%.",
        attributes: {
          stimpackDamage: 0.025,
        },
      },
      {
        name: "Damage",
        description: "Increase damage bonus by {stimpackDamage}%.",
        attributes: {
          stimpackDamage: 0.05,
        },
      },
      {
        name: "Max Shields",
        description: "Increase max shield bonus by {stimpackShieldStrength}%.",
        attributes: {
          stimpackShieldStrength: 0.4,
        },
      },
      {
        name: "Pack Capacity",
        description: "Increase pack capacity by {grenadeCapacity}.",
        attributes: {
          grenadeCapacity: 1,
        },
      },
      {
        name: "Duration",
        description: "Increase duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.5,
        },
      },
      {
        name: "Weapon Damage",
        description:
          "Increase weapon damage by {stimpackWeaponDamage}% for the duration of the power.",
        attributes: {
          stimpackWeaponDamage: 0.08,
        },
      },
      {
        name: "Survival",
        description:
          "Increase max shield bonus by {stimpackShieldStrength}% and melee damage by {stimpackMeleeDamage}% for the duration of the power.",
        attributes: {
          stimpackShieldStrength: 0.6,
          stimpackMeleeDamage: 0.25,
        },
      },
    ],
    is_grenade_power: true,
    internalName: "StimPack",
  },
  Sd: {
    id: 553,
    Z: {
      duration: "Grapple Duration",
    },
    h: ["baseRechargeSpeed", "duration", "incapacitate", "damage"],
    g: false,
    iconSet: "BatarianNet",
    evolutions: [
      {
        name: "Submission Net",
        description:
          "Entangle opponents in an electrified net, dealing massive damage to armored targets and incapacitating unarmored targets as they break free.\n\nTargets build up resistances to the grappling effects of the net.",
        attributes: {
          baseRechargeSpeed: 6,
          damage: 600,
          duration: 6,
          incapacitate: 4,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage & Duration",
        description:
          "Increase damage by {powerDamage}%.\nIncrease duration by {powerDuration}%.",
        attributes: {
          powerDamage: 0.3,
          powerDuration: 0.3,
          incapacitateDuration: 0.3,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.4,
        },
      },
      {
        name: "Incapacitate",
        description: "Incapacitate targets {incapacitateDuration}% longer.",
        attributes: {
          incapacitateDuration: 1,
        },
      },
      {
        name: "Damage & Slow",
        description:
          "Increase damage by {powerDamage}%.\nSlow armored targets by {netMovementSpeed}% for {ATTR_TIME} seconds.",
        attributes: {
          powerDamage: 0.4,
          netMovementSpeed: 0.3,
          ATTR_TIME: 10,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.45,
        },
      },
      {
        name: "Shield & Barrier",
        description:
          "Increase damage to shields and barriers by {powerDamageBarrier}%.",
        attributes: {
          powerDamageBarrier: 0.5,
          powerDamageShield: 0.5,
        },
      },
      {
        name: "Electric Field",
        description:
          "Improve the electrified net to deal {netAOE} points of damage across {radius} meters every {ATTR_TIME} seconds.",
        attributes: {
          netAOE: 150,
          radius: 6,
          ATTR_TIME: 1,
        },
      },
    ],
    type: 2,
    internalName: "BatarianNet",
  },
  Sd2: {
    id: 39,
    Z: {
      duration: "Grapple Duration",
    },
    h: ["baseRechargeSpeed", "duration", "incapacitate", "damage"],
    g: false,
    iconSet: "BatarianNet",
    evolutions: [
      {
        name: "Submission Net",
        description:
          "Entangle opponents in an electrified net, dealing massive damage to armored targets and incapacitating unarmored targets as they break free.\n\nTargets build up resistances to the grappling effects of the net.",
        attributes: {
          baseRechargeSpeed: 6,
          damage: 600,
          duration: 6,
          incapacitate: 4,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage & Duration",
        description:
          "Increase damage by {powerDamage}%.\nIncrease duration by {powerDuration}%.",
        attributes: {
          powerDamage: 0.3,
          powerDuration: 0.3,
          incapacitateDuration: 0.3,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.4,
        },
      },
      {
        name: "Incapacitate",
        description: "Incapacitate targets {incapacitateDuration}% longer.",
        attributes: {
          incapacitateDuration: 1,
        },
      },
      {
        name: "Damage & Slow",
        description:
          "Increase damage by {powerDamage}%.\nSlow armored targets by {netMovementSpeed}% for {ATTR_TIME} seconds.",
        attributes: {
          powerDamage: 0.4,
          netMovementSpeed: 0.3,
          ATTR_TIME: 10,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.45,
        },
      },
      {
        name: "Shield & Barrier",
        description:
          "Increase damage to shields and barriers by {powerDamageBarrier}%.",
        attributes: {
          powerDamageBarrier: 0.5,
          powerDamageShield: 0.5,
        },
      },
      {
        name: "Electric Field",
        description:
          "Improve the electrified net to deal {netAOE} points of damage across {radius} meters every {ATTR_TIME} seconds.",
        attributes: {
          netAOE: 150,
          radius: 6,
          ATTR_TIME: 1,
        },
      },
    ],
    type: 2,
    internalName: "BatarianNet",
  },
  tf: {
    id: 393,
    h: [
      "baseRechargeSpeed",
      "ammoResupply",
      "grenadeResupply",
      "shieldStrength",
      "radius",
    ],
    g: true,
    iconSet: "SupplyTurret",
    evolutions: [
      {
        name: "Supply Pylon",
        description:
          "Deploy an immobile pylon that supplies ammo and grenades. A built-in tech generator also increases maximum shields for nearby allies.\n\nOnly one pylon can be active at a time.\nAmmo and grenades expire after {ATTR_TIME}s.",
        attributes: {
          baseRechargeSpeed: 30,
          ammoResupply: 17.5,
          grenadeResupply: 24,
          shieldStrength: 0.25,
          radius: 4,
          ATTR_TIME: 17.5,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Resupply Frequency",
        description:
          "Increase the rate of ammunition generation by {ammoFrequency}%.\nIncrease the rate of grenade generation by {grenadeFrequency}%.",
        attributes: {
          ammoFrequency: 0.15,
          grenadeFrequency: 0.15,
        },
      },
      {
        name: "Resupply Frequency",
        description:
          "Increase the rate of ammunition generation by {ammoFrequency}%.\nIncrease the rate of grenade generation by {grenadeFrequency}%.",
        attributes: {
          ammoFrequency: 0.25,
          grenadeFrequency: 0.25,
        },
      },
      {
        name: "Radius",
        description:
          "Increase the radius in which the pylon gives bonuses to allies by {radiusPct}%.",
        attributes: {
          radiusPct: 0.4,
        },
      },
      {
        name: "Weapon Damage",
        description:
          "Upgrade the tech generator to also increase allied weapon damage by {weaponDamage}%.",
        attributes: {
          weaponDamage: 0.1,
        },
      },
      {
        name: "Power Damage",
        description:
          "Upgrade the tech generator to also increase allied power damage by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.1,
        },
      },
      {
        name: "Extra Grenade",
        description: "Increase the number of grenades generated by {ATTR_INT}.",
        attributes: {
          ATTR_INT: 1,
        },
      },
      {
        name: "Max Shields",
        description: "Increase max shields by an additional {shieldStrength}%.",
        attributes: {
          shieldStrength: 0.25,
        },
      },
    ],
    internalName: "SupplyTurret",
  },
  bb: {
    id: 146,
    h: ["baseRechargeSpeed", "duration", "globalDamage"],
    g: true,
    iconSet: "Cloak",
    evolutions: [
      {
        name: "Tactical Cloak",
        description:
          "Become invisible.\n\nGain a massive damage bonus when breaking from cloak to attack.",
        attributes: {
          baseRechargeSpeed: 10,
          globalDamage: 0.4,
          duration: 4,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Duration",
        description: "Increase power duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.3,
        },
      },
      {
        name: "Duration",
        description: "Increase power duration by {powerDuration}%.",
        attributes: {
          powerDuration: 1.5,
        },
      },
      {
        name: "Damage",
        description: "Increase damage bonus by {globalDamage}%.",
        attributes: {
          globalDamage: 0.4,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.3,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage by {meleeDamage}% while cloaked.",
        attributes: {
          meleeDamage: 0.5,
        },
      },
      {
        name: "Bonus Power",
        description: "Fire one power while cloaked and remain hidden.",
        attributes: {},
      },
      {
        name: "Sniper Damage",
        description:
          "Increase sniper rifle damage by {tcDamageSniper}% while cloaked.",
        attributes: {
          tcDamageSniper: 0.25,
        },
      },
    ],
    internalName: "Cloak",
  },
  bb2: {
    id: 133,
    h: ["baseRechargeSpeed", "duration", "globalDamage"],
    g: true,
    iconSet: "Cloak",
    evolutions: [
      {
        name: "Tactical Cloak",
        description:
          "Become invisible.\n\nGain a massive damage bonus when breaking from cloak to attack.",
        attributes: {
          baseRechargeSpeed: 10,
          globalDamage: 0.4,
          duration: 4,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Duration",
        description: "Increase power duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.3,
        },
      },
      {
        name: "Duration",
        description: "Increase power duration by {powerDuration}%.",
        attributes: {
          powerDuration: 1.5,
        },
      },
      {
        name: "Damage",
        description: "Increase damage bonus by {globalDamage}%.",
        attributes: {
          globalDamage: 0.4,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.3,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage by {meleeDamage}% while cloaked.",
        attributes: {
          meleeDamage: 0.5,
        },
      },
      {
        name: "Bonus Power",
        description: "Fire one power while cloaked and remain hidden.",
        attributes: {},
      },
      {
        name: "Sniper Damage",
        description:
          "Increase sniper rifle damage by {tcDamageSniper}% while cloaked.",
        attributes: {
          tcDamageSniper: 0.25,
        },
      },
    ],
    internalName: "Cloak",
  },
  bb3: {
    id: 402,
    h: ["baseRechargeSpeed", "duration", "globalDamage"],
    g: true,
    iconSet: "Cloak",
    evolutions: [
      {
        name: "Tactical Cloak",
        description:
          "Become invisible.\n\nGain a massive damage bonus when breaking from cloak to attack.",
        attributes: {
          baseRechargeSpeed: 10,
          globalDamage: 0.4,
          duration: 4,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Duration",
        description: "Increase power duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.3,
        },
      },
      {
        name: "Duration",
        description: "Increase power duration by {powerDuration}%.",
        attributes: {
          powerDuration: 1.5,
        },
      },
      {
        name: "Damage",
        description: "Increase damage bonus by {globalDamage}%.",
        attributes: {
          globalDamage: 0.4,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.3,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage by {meleeDamage}% while cloaked.",
        attributes: {
          meleeDamage: 0.5,
        },
      },
      {
        name: "Bonus Power",
        description: "Fire one power while cloaked and remain hidden.",
        attributes: {},
      },
      {
        name: "Sniper Damage",
        description:
          "Increase sniper rifle damage by {tcDamageSniper}% while cloaked.",
        attributes: {
          tcDamageSniper: 0.25,
        },
      },
    ],
    internalName: "Cloak",
  },
  Sz: {
    id: 631,
    h: ["baseRechargeSpeed", "duration", "globalDamage"],
    g: true,
    iconSet: "Cloak",
    evolutions: [
      {
        name: "Tactical Cloak",
        description:
          "Become invisible.\n\nGain a massive damage bonus when breaking from cloak to attack.",
        attributes: {
          baseRechargeSpeed: 10,
          globalDamage: 0.4,
          duration: 4,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Duration",
        description: "Increase power duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.3,
        },
      },
      {
        name: "Duration",
        description: "Increase power duration by {powerDuration}%.",
        attributes: {
          powerDuration: 1.5,
        },
      },
      {
        name: "Damage",
        description: "Increase damage bonus by {globalDamage}%.",
        attributes: {
          globalDamage: 0.4,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.3,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage by {meleeDamage}% while cloaked.",
        attributes: {
          meleeDamage: 0.5,
        },
      },
      {
        name: "Bonus Power",
        description: "Fire one power while cloaked and remain hidden.",
        attributes: {},
      },
      {
        name: "Shotgun Damage",
        description:
          "Shotguns fired during cloak do {tcDamageShotgun}% more damage.",
        attributes: {
          tcDamageShotgun: 0.25,
        },
      },
    ],
    internalName: "Cloak",
  },
  Tz: {
    id: 562,
    h: ["baseRechargeSpeed", "duration", "globalDamage"],
    g: true,
    iconSet: "Cloak",
    evolutions: [
      {
        name: "Tactical Cloak",
        description:
          "Become invisible.\n\nGain a massive damage bonus when breaking from cloak to attack.",
        attributes: {
          baseRechargeSpeed: 10,
          globalDamage: 0.4,
          duration: 4,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Duration",
        description: "Increase power duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.3,
        },
      },
      {
        name: "Duration",
        description: "Increase power duration by {powerDuration}%.",
        attributes: {
          powerDuration: 1.5,
        },
      },
      {
        name: "Damage",
        description: "Increase damage bonus by {globalDamage}%.",
        attributes: {
          globalDamage: 0.4,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.3,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage by {meleeDamage}% while cloaked.",
        attributes: {
          meleeDamage: 0.5,
        },
      },
      {
        name: "Bonus Power",
        description: "Fire one power while cloaked and remain hidden.",
        attributes: {},
      },
      {
        name: "Assault Rifle Damage",
        description:
          "When Tactical Cloak is activated, assault rifles do {tcDamageAssault}% more damage for {ATTR_TIME} seconds.",
        attributes: {
          tcDamageAssault: 0.2,
          ATTR_TIME: 20,
        },
      },
    ],
    internalName: "Cloak",
  },
  Uz: {
    id: 570,
    h: ["baseRechargeSpeed", "duration", "globalPowerDamage"],
    g: true,
    iconSet: "Cloak",
    evolutions: [
      {
        name: "Tactical Cloak",
        description:
          "Become invisible.\n\nGain a massive damage bonus when breaking from cloak to attack.",
        attributes: {
          baseRechargeSpeed: 10,
          globalPowerDamage: 0.6,
          meleeDamage: 0.6,
          duration: 4,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Duration",
        description: "Increase power duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.3,
        },
      },
      {
        name: "Duration",
        description: "Increase power duration by {powerDuration}%.",
        attributes: {
          powerDuration: 1.5,
        },
      },
      {
        name: "Damage",
        description: "Increase damage bonus by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.6,
          meleeDamage: 0.6,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.3,
        },
      },
      {
        name: "Melee Damage",
        description: "Increase melee damage by {meleeDamage}% while cloaked.",
        attributes: {
          meleeDamage: 0.5,
        },
      },
      {
        name: "Bonus Power",
        description: "Fire one power while cloaked and remain hidden.",
        attributes: {},
      },
      {
        name: "Power Damage",
        description: "Increase power damage by {globalPowerDamage}%.",
        attributes: {
          globalPowerDamage: 0.4,
        },
      },
    ],
    internalName: "Cloak",
  },
  Sc: {
    id: 544,
    Z: {
      enemyMovementSpeed: "Movement Speed Penalty",
    },
    h: [
      "baseRechargeSpeed",
      "duration",
      "enemyDamageTaken",
      "enemyMovementSpeed",
    ],
    g: true,
    iconSet: "Damping",
    evolutions: [
      {
        name: "Tactical Scan",
        description:
          "Reveal weaknesses in defenses, increasing all damage done to the target and slowing its movement speed.\n\nProvide the entire squad with a tactical readout. Only one scan can be active on a target.",
        attributes: {
          baseRechargeSpeed: 4,
          duration: 20,
          enemyDamageTaken: 0.15,
          enemyMovementSpeed: 0.15,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.5,
        },
      },
      {
        name: "Duration",
        description: "Increase duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.3,
        },
      },
      {
        name: "Weapon Damage",
        description:
          "Increase all weapon damage done to the target by {enemyWeaponDamageTaken}%.",
        attributes: {
          enemyWeaponDamageTaken: 0.075,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase all power damage done to the target by {enemyPowerDamageTaken}%.",
        attributes: {
          enemyPowerDamageTaken: 0.075,
        },
      },
      {
        name: "Headshots",
        description: "This evolution is bugged and doesn't work.",
        attributes: {
          ATTR_PCT: 0.25,
        },
      },
      {
        name: "Movement Speed",
        description:
          "Increase the target's movement speed penalty by {enemyMovementSpeed}%.",
        attributes: {
          enemyMovementSpeed: 0.15,
        },
      },
      {
        name: "Damage",
        description:
          "Increase all damage done to the target by {enemyDamageTaken}%.",
        attributes: {
          enemyDamageTaken: 0.1,
        },
      },
      {
        name: "Area Scan",
        description:
          "Increase scan duration by {powerDuration}%.\nMomentarily reveal enemies within {ATTR_INT} meters of the target with an initial scanning pulse.",
        attributes: {
          powerDuration: 1,
          ATTR_INT: 20,
        },
      },
    ],
    internalName: "Damping",
  },
  Sc2: {
    id: 342,
    Z: {
      enemyMovementSpeed: "Movement Speed Penalty",
    },
    h: [
      "baseRechargeSpeed",
      "duration",
      "enemyDamageTaken",
      "enemyMovementSpeed",
    ],
    g: true,
    iconSet: "Damping",
    evolutions: [
      {
        name: "Tactical Scan",
        description:
          "Reveal weaknesses in defenses, increasing all damage done to the target and slowing its movement speed.\n\nProvide the entire squad with a tactical readout. Only one scan can be active on a target.",
        attributes: {
          baseRechargeSpeed: 4,
          duration: 20,
          enemyDamageTaken: 0.15,
          enemyMovementSpeed: 0.15,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.5,
        },
      },
      {
        name: "Duration",
        description: "Increase duration by {powerDuration}%.",
        attributes: {
          powerDuration: 0.3,
        },
      },
      {
        name: "Weapon Damage",
        description:
          "Increase all weapon damage done to the target by {enemyWeaponDamageTaken}%.",
        attributes: {
          enemyWeaponDamageTaken: 0.075,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase all power damage done to the target by {enemyPowerDamageTaken}%.",
        attributes: {
          enemyPowerDamageTaken: 0.075,
        },
      },
      {
        name: "Headshots",
        description: "This evolution is bugged and doesn't work.",
        attributes: {
          ATTR_PCT: 0.25,
        },
      },
      {
        name: "Movement Speed",
        description:
          "Increase the target's movement speed penalty by {enemyMovementSpeed}%.",
        attributes: {
          enemyMovementSpeed: 0.15,
        },
      },
      {
        name: "Damage",
        description:
          "Increase all damage done to the target by {enemyDamageTaken}%.",
        attributes: {
          enemyDamageTaken: 0.1,
        },
      },
      {
        name: "Area Scan",
        description:
          "Increase scan duration by {powerDuration}%.\nMomentarily reveal enemies within {ATTR_INT} meters of the target with an initial scanning pulse.",
        attributes: {
          powerDuration: 1,
          ATTR_INT: 20,
        },
      },
    ],
    internalName: "Damping",
  },
  Gb: {
    id: 183,
    Z: {
      armor: "Explosion Damage",
      radius: "Explosion Radius",
    },
    h: ["baseRechargeSpeed", "damageReduction", "armor", "radius"],
    g: true,
    iconSet: "TechArmor",
    evolutions: [
      {
        name: "Tech Armor",
        description:
          "Protect yourself with this holographic armor or detonate it to damage nearby enemies.\n\nSlows power use by {globalRecharge}%.",
        attributes: {
          baseRechargeSpeed: 6,
          damageReduction: 0.35,
          armor: 400,
          radius: 3,
          globalRecharge: -0.5,
        },
      },
      {
        name: "Recharge Speed",
        description:
          "Increase recharge speed after armor detonation by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage & Radius",
        description:
          "Increase detonation damage by {powerDamage}%.\nIncrease impact radius by {radiusPct}%.",
        attributes: {
          powerDamage: 0.2,
          radiusPct: 0.2,
        },
      },
      {
        name: "Damage & Radius",
        description:
          "Increase detonation damage by {powerDamage}%.\nIncrease impact radius by {radiusPct}%.",
        attributes: {
          powerDamage: 0.3,
          radiusPct: 0.3,
        },
      },
      {
        name: "Durability",
        description:
          "Increase damage protection by an additional {damageReduction}%.",
        attributes: {
          damageReduction: 0.05,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force by {globalPowerDamage}% while armor is active.",
        attributes: {
          globalPowerDamage: 0.3,
          globalPowerForce: 0.3,
        },
      },
      {
        name: "Melee Damage",
        description:
          "Increase melee damage by {meleeDamage}% while the power is active.",
        attributes: {
          meleeDamage: 0.4,
        },
      },
      {
        name: "Power Recharge",
        description: "Reduce power speed penalty by {globalRecharge}%.",
        attributes: {
          globalRecharge: 0.3,
        },
      },
      {
        name: "Durability",
        description:
          "Increase damage protection by an additional {damageReduction}%.",
        attributes: {
          damageReduction: 0.1,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1,
      barrier: 1,
      shield: 1.5,
    },
    pb: "",
    type: 2,
    internalName: "TechArmor",
  },
  Gb2: {
    id: 265,
    Z: {
      armor: "Explosion Damage",
      radius: "Explosion Radius",
    },
    h: ["baseRechargeSpeed", "damageReduction", "armor", "radius"],
    g: true,
    iconSet: "TechArmor",
    evolutions: [
      {
        name: "Tech Armor",
        description:
          "Protect yourself with this holographic armor or detonate it to damage nearby enemies.\n\nSlows power use by {globalRecharge}%.",
        attributes: {
          baseRechargeSpeed: 6,
          damageReduction: 0.35,
          armor: 400,
          radius: 3,
          globalRecharge: -0.5,
        },
      },
      {
        name: "Recharge Speed",
        description:
          "Increase recharge speed after armor detonation by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage & Radius",
        description:
          "Increase detonation damage by {powerDamage}%.\nIncrease impact radius by {radiusPct}%.",
        attributes: {
          powerDamage: 0.2,
          radiusPct: 0.2,
        },
      },
      {
        name: "Damage & Radius",
        description:
          "Increase detonation damage by {powerDamage}%.\nIncrease impact radius by {radiusPct}%.",
        attributes: {
          powerDamage: 0.3,
          radiusPct: 0.3,
        },
      },
      {
        name: "Durability",
        description:
          "Increase damage protection by an additional {damageReduction}%.",
        attributes: {
          damageReduction: 0.05,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force by {globalPowerDamage}% while armor is active.",
        attributes: {
          globalPowerDamage: 0.3,
          globalPowerForce: 0.3,
        },
      },
      {
        name: "Melee Damage",
        description:
          "Increase melee damage by {meleeDamage}% while the power is active.",
        attributes: {
          meleeDamage: 0.4,
        },
      },
      {
        name: "Power Recharge",
        description: "Reduce power speed penalty by {globalRecharge}%.",
        attributes: {
          globalRecharge: 0.3,
        },
      },
      {
        name: "Durability",
        description:
          "Increase damage protection by an additional {damageReduction}%.",
        attributes: {
          damageReduction: 0.1,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1,
      barrier: 1,
      shield: 1.5,
    },
    pb: "",
    type: 2,
    internalName: "TechArmor",
  },
  Gb3: {
    id: 266,
    Z: {
      armor: "Explosion Damage",
      radius: "Explosion Radius",
    },
    h: ["baseRechargeSpeed", "damageReduction", "armor", "radius"],
    g: true,
    iconSet: "TechArmor",
    evolutions: [
      {
        name: "Tech Armor",
        description:
          "Protect yourself with this holographic armor or detonate it to damage nearby enemies.\n\nSlows power use by {globalRecharge}%.",
        attributes: {
          baseRechargeSpeed: 6,
          damageReduction: 0.35,
          armor: 400,
          radius: 3,
          globalRecharge: -0.5,
        },
      },
      {
        name: "Recharge Speed",
        description:
          "Increase recharge speed after armor detonation by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage & Radius",
        description:
          "Increase detonation damage by {powerDamage}%.\nIncrease impact radius by {radiusPct}%.",
        attributes: {
          powerDamage: 0.2,
          radiusPct: 0.2,
        },
      },
      {
        name: "Damage & Radius",
        description:
          "Increase detonation damage by {powerDamage}%.\nIncrease impact radius by {radiusPct}%.",
        attributes: {
          powerDamage: 0.3,
          radiusPct: 0.3,
        },
      },
      {
        name: "Durability",
        description:
          "Increase damage protection by an additional {damageReduction}%.",
        attributes: {
          damageReduction: 0.05,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force by {globalPowerDamage}% while armor is active.",
        attributes: {
          globalPowerDamage: 0.3,
          globalPowerForce: 0.3,
        },
      },
      {
        name: "Melee Damage",
        description:
          "Increase melee damage by {meleeDamage}% while the power is active.",
        attributes: {
          meleeDamage: 0.4,
        },
      },
      {
        name: "Power Recharge",
        description: "Reduce power speed penalty by {globalRecharge}%.",
        attributes: {
          globalRecharge: 0.3,
        },
      },
      {
        name: "Durability",
        description:
          "Increase damage protection by an additional {damageReduction}%.",
        attributes: {
          damageReduction: 0.1,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1,
      barrier: 1,
      shield: 1.5,
    },
    pb: "",
    type: 2,
    internalName: "TechArmor",
  },
  Gb4: {
    id: 635,
    Z: {
      armor: "Explosion Damage",
      radius: "Explosion Radius",
    },
    h: ["baseRechargeSpeed", "damageReduction", "armor", "radius"],
    g: true,
    iconSet: "TechArmor",
    evolutions: [
      {
        name: "Tech Armor",
        description:
          "Protect yourself with this holographic armor or detonate it to damage nearby enemies.\n\nSlows power use by {globalRecharge}%.",
        attributes: {
          baseRechargeSpeed: 6,
          damageReduction: 0.35,
          armor: 400,
          radius: 3,
          globalRecharge: -0.5,
        },
      },
      {
        name: "Recharge Speed",
        description:
          "Increase recharge speed after armor detonation by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage & Radius",
        description:
          "Increase detonation damage by {powerDamage}%.\nIncrease impact radius by {radiusPct}%.",
        attributes: {
          powerDamage: 0.2,
          radiusPct: 0.2,
        },
      },
      {
        name: "Damage & Radius",
        description:
          "Increase detonation damage by {powerDamage}%.\nIncrease impact radius by {radiusPct}%.",
        attributes: {
          powerDamage: 0.3,
          radiusPct: 0.3,
        },
      },
      {
        name: "Durability",
        description:
          "Increase damage protection by an additional {damageReduction}%.",
        attributes: {
          damageReduction: 0.05,
        },
      },
      {
        name: "Power Damage",
        description:
          "Increase power damage and force by {globalPowerDamage}% while armor is active.",
        attributes: {
          globalPowerDamage: 0.3,
          globalPowerForce: 0.3,
        },
      },
      {
        name: "Melee Damage",
        description:
          "Increase melee damage by {meleeDamage}% while the power is active.",
        attributes: {
          meleeDamage: 0.4,
        },
      },
      {
        name: "Power Recharge",
        description: "Reduce power speed penalty by {globalRecharge}%.",
        attributes: {
          globalRecharge: 0.3,
        },
      },
      {
        name: "Durability",
        description:
          "Increase damage protection by an additional {damageReduction}%.",
        attributes: {
          damageReduction: 0.1,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1,
      barrier: 1,
      shield: 1.5,
    },
    pb: "",
    type: 2,
    internalName: "TechArmor",
  },
  nc: {
    id: 184,
    h: ["baseRechargeSpeed", "force"],
    g: false,
    iconSet: "Throw",
    evolutions: [
      {
        name: "Throw",
        description: "Toss your enemy through the air with this biotic blast.",
        attributes: {
          baseRechargeSpeed: 4,
          force: 600,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Force",
        description: "Increase force by {powerForce}%.",
        attributes: {
          powerForce: 0.3,
        },
      },
      {
        name: "Force",
        description: "Increase force by {powerForce}%.",
        attributes: {
          powerForce: 0.4,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radius} meters.",
        attributes: {
          radius: 2,
        },
      },
      {
        name: "Detonate",
        description:
          "Increase force and damage of biotic detonations by {comboDamage}%.",
        attributes: {
          comboDamage: 0.5,
          comboForce: 0.5,
        },
      },
      {
        name: "Recharge Combo",
        description: "Reset recharge time after a biotic combo detonates.",
        attributes: {},
      },
      {
        name: "Force & Damage",
        description:
          "Increase force by {powerForce}%, and do an additional {ATTR_DMG} damage on impact.",
        attributes: {
          powerForce: 0.5,
          ATTR_DMG: 200,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.6,
        },
      },
    ],
    type: 1,
    internalName: "Throw",
  },
  nc2: {
    id: 473,
    h: ["baseRechargeSpeed", "force"],
    g: false,
    iconSet: "Throw",
    evolutions: [
      {
        name: "Throw",
        description: "Toss your enemy through the air with this biotic blast.",
        attributes: {
          baseRechargeSpeed: 4,
          force: 600,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Force",
        description: "Increase force by {powerForce}%.",
        attributes: {
          powerForce: 0.3,
        },
      },
      {
        name: "Force",
        description: "Increase force by {powerForce}%.",
        attributes: {
          powerForce: 0.4,
        },
      },
      {
        name: "Radius",
        description: "Increase impact radius by {radius} meters.",
        attributes: {
          radius: 2,
        },
      },
      {
        name: "Detonate",
        description:
          "Increase force and damage of biotic detonations by {comboDamage}%.",
        attributes: {
          comboDamage: 0.5,
          comboForce: 0.5,
        },
      },
      {
        name: "Recharge Combo",
        description: "Reset recharge time after a biotic combo detonates.",
        attributes: {},
      },
      {
        name: "Force & Damage",
        description:
          "Increase force by {powerForce}%, and do an additional {ATTR_DMG} damage on impact.",
        attributes: {
          powerForce: 0.5,
          ATTR_DMG: 200,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.6,
        },
      },
    ],
    type: 1,
    internalName: "Throw",
  },
  fb: {
    id: 185,
    h: ["baseRechargeSpeed", "damage", "duration"],
    g: true,
    iconSet: "Warp",
    evolutions: [
      {
        name: "Warp",
        description:
          "Rip your enemy apart at a molecular level.\n\nStop targeted enemy from regenerating health.\nWeaken armor.\n\nApplies fire DoT.",
        attributes: {
          baseRechargeSpeed: 8,
          damage: 250,
          duration: 10,
          enemyArmorWeakening: 0.25,
          fireDoT: true,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.25,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.2,
        },
      },
      {
        name: "Damage",
        description: "Increase damage by {powerDamage}%.",
        attributes: {
          powerDamage: 0.3,
        },
      },
      {
        name: "Detonate",
        description:
          "Increase force, damage, and impact radius of combo detonations by {comboDamage}%.",
        attributes: {
          comboDamage: 0.5,
          comboForce: 0.5,
          comboRadius: 0.5,
        },
      },
      {
        name: "Lasting Damage",
        description:
          "Increase damage by {powerDamage}%.\nIncrease duration by {powerDuration}%.",
        attributes: {
          powerDamage: 0.4,
          powerDuration: 0.6,
        },
      },
      {
        name: "Expose",
        description:
          "Increase weapon damage taken by a target by {enemyWeaponDamageTaken}%.\nIncrease power damage taken by a target by {enemyPowerDamageTaken}% for {ATTR_TIME} seconds.",
        attributes: {
          enemyWeaponDamageTaken: 0.15,
          enemyPowerDamageTaken: 0.15,
          ATTR_TIME: 10,
        },
      },
      {
        name: "Pierce",
        description:
          "Increase damage to barriers and armor by {powerDamageArmor}%.\nWeaken armored targets by an additional {enemyArmorWeakening}%.",
        attributes: {
          powerDamageArmor: 0.5,
          powerDamageBarrier: 0.5,
          enemyArmorWeakening: 0.25,
        },
      },
      {
        name: "Recharge Speed",
        description: "Increase recharge speed by {rechargeSpeed}%.",
        attributes: {
          rechargeSpeed: 0.35,
        },
      },
    ],
    i: {
      health: 1,
      armor: 1.5,
      barrier: 2,
      shield: 0.5,
    },
    type: 1,
    is_biotic_primer: true,
    internalName: "Warp",
  },
});

export function getPowerByID(id: number): Power | undefined {
  for (const powerKey in POWERS) {
    const power: Power | undefined = (POWERS as Partial<Record<string, Power>>)[
      powerKey
    ] as any;
    if (power !== undefined && power.id === id) {
      return power;
    }
  }

  return undefined;
}

// let out = {};

// for (const powerKey in POWERS) {
//   const power = POWERS[powerKey];
//   if (power.internalName === undefined) {
//     power.internalName = power.iconSet;
//   }

//   out[powerKey] = power;
// }

// console.log(out);
