export default {
  minions: {
    default: {
      attackDuration: 1.5,
      damage: 1.0,
      fixedDamage: 0.0,
      bodyScale: 1.0,
      weapon: "axe",
      maxArmor: 6,
      helmet: "no_helmet",
      shield: "shield_wooden",
      cape: "no_cape",
      speed: 150,
      staminaUsage: 0.3,
      block_duration: 1.0,
      roll_duration: 0.8,
      kick_duration: 0.8,
      fall_duration: 1.0,
      jump_duration: 1.0,
      fall_recovery: 1.4,
      maxHealth: 8,
      heavy: false,
      height: 1.0,
      pitch: 1.0,
    },
    hero: {
      attackDuration: 1.0,
    },
  },
  weapons: {
    axe: {
      attackAnimations: ["attack_horizontal", "attack_vertical"],
      attackDuration: 0.5,
    },
    no_weapon: {
      attackAnimations: ["punch1", "punch2"],
      attackDuration: 0.25,
    },
  },
} as const;
