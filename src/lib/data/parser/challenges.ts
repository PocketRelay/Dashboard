
// Player data key for the player challenges data
export const PLAYER_CHALLENGES_KEY: string = "Progress";

// Decoded format of the player challenges data
export interface PlayerChallenges {
  rawnumbers: number[];
}

/**
 * Parses the player challenges data value into an editable format
 * 
 * Format: 
 * 22;0...X (overall 746 values). We are interested in only 344 values.
 * See file challenges_format.txt for more information.
 */
export function getPlayerChallenges(value: string): PlayerChallenges | null {
  const parts: string[] = value.split(",");
  if (parts.length < 347) return null;

  let rawnumbers: number[] = [];
  for (let index = 0; index < parts.length; index += 1) {
      let value: number = parseInt(parts[index]);

      // Handle invalid values
      if (Number.isNaN(value)) value = 0;

      rawnumbers.push(value);
  }

  return { rawnumbers };
}
