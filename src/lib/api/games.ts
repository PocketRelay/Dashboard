import { HttpMethod, request } from "./api";

// Different possible game states
export const enum GameState {
    // The game is initialized 
    Init = "Init",
    // The game is currently ongoing
    InGame = "InGame",
    // The game is about to start
    InGameStarting = "InGameStarting",
    // The game has finished
    GameFinished = "GameFinished",
    // The game is migrating its host
    HostMigration = "HostMigration"
}

// Structure of a game snapshot
export interface Game {
    // The ID of the game
    id: number;
    // The current game state
    state: GameState,
    // The game setting value
    setting: number;
    // The game attributes
    attributes: Record<string, string | undefined>;
    // The game players 
    players: GamePlayer[];
}

// Structure of a snapshot of a player within a game
export interface GamePlayer {
    // The ID of the player session
    session_id: number;
    // The ID of the player
    player_id: number;
    // The player display name
    display_name: string;
    // Optional networking data provided to admins
    net: NetData | null;
}

// Player networking data (Only available to admins)
export interface NetData {
    // The player networking groups
    groups: NetGroups | null;
    // The Quality of Service networking data for the player
    qos: QosNetworkData;
    // The player network hardware flags
    hardware_flags: number;
}

// Networking groups for internal and external networking
interface NetGroups {
    // Internal network details for the player
    internal: NetGroup;
    // External network details for the player
    external: NetGroup;
}

// Quality of Service network data
interface QosNetworkData {
    // Downstream bits per second
    dbps: number;
    // NATT type
    natt: NattType | number;
    // Upstream bits per second
    ubps: number;
}

// Different known NATT types
export const enum NattType {
    Open = 0x1,
    Moderate = 0x2,
    Sequential = 0x3,
    Strict = 0x4,
}

// Network group 
export interface NetGroup {
    // IP Address for the network group
    address: string;
    // Port for the network group
    port: number;
}

// Response for querying a list of games
export interface GamesResponse {
    // The games from the query (Empty if query found nothing)
    games: Game[];
    // Whether there are more values at the next offset
    more: boolean;
}

/**
 * Queries the game server for a snapshot of the current games
 * at the provided offset and the desired number 
 * 
 * @param offset The offset to query from
 * @param count  The number of games to query for 
 * @returns The games response
 */
export function getGames(offset: number, count: number): Promise<GamesResponse> {
    return request({
        method: HttpMethod.GET,
        route: `games?offset=${offset}&count=${count}`,
    });
}