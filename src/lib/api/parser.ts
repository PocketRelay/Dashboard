export interface PlayerBase {
    credits: number;
    u1: string;
    u2: string;
    creditsSpent: number;
    u3: string;
    gamesPlayed: string;
    secondsPlayed: string;
    u4: string;
    inventory: string;
}
// 20; 4; CREDITS; UNKNOWN; UKNOWN; CREDITS_SPENT; UKNOWN; GAMES_PLAYED; SECONDS_PLAYED; UKNOWN; INVENTORY


export function parsePlayerBase(value: string): PlayerBase | null {
    const parts: string[] = value.split(";");
    if (parts.length < 11) return null;
    let credits: number = parseInt(parts[2]);
    if (Number.isNaN(credits)) credits = 0;
    let u1: string = parts[3];
    let u2: string = parts[4];
    let creditsSpent: number = parseInt(parts[5]);
    if (Number.isNaN(creditsSpent)) creditsSpent = 0;
    let u3: string = parts[6];
    let gamesPlayed: string = parts[7];
    let secondsPlayed: string = parts[8];
    let u4: string = parts[9];
    let inventory: string = parts[10];

    return {
        credits,
        u1,
        u2,
        creditsSpent,
        u3,
        gamesPlayed,
        secondsPlayed,
        u4,
        inventory
    }
}

export function parseInventory(inventory: string): number[] {
    let values: number[] = [];
    for (let index = 0; index < inventory.length; index += 2) {
        let first: string = inventory.substring(index, index + 2);
        let value: number = parseInt(first, 16);
        values.push(value);
    }
    return values;
}

export function encodePlayerBase(value: PlayerBase) {
    return `20;4;${value.credits};${value.u1};${value.u2};${value.creditsSpent};${value.u3};${value.gamesPlayed};${value.secondsPlayed};${value.u4};${value.inventory}`;
}


export function encodeInventory(inventory: number[]): string {
    let output = "";
    for (let value of inventory) {
        if (value > 255) {
            output += "ff";
        } else {
            let hex = value.toString(16).toLowerCase();
            while (hex.length < 2) {
                hex = "0" + hex;
            }
            output += hex;
        }
    }
    return output;
}


export interface PlayerClass {
    name: string;
    level: number;
    exp: string;
    promotions: number;
}

// 20;4;NAME;LEVEL;EXP;PROMOTIONS

export function parsePlayerClass(value: string): PlayerClass | null {
    const parts: string[] = value.split(";");
    if (parts.length < 6) return null;

    const name: string = parts[2];
    let level: number = parseInt(parts[3]);
    if (Number.isNaN(level)) level = 0;
    const exp: string = parts[4];
    let promotions: number = parseInt(parts[5]);
    if (Number.isNaN(level)) promotions = 0;
    return { name, level, exp, promotions }
}

export function encodePlayerClass(value: PlayerClass): string {
    return `20;4;${value.name};${value.level};${value.exp};${value.promotions}`;

}