import { HttpMethod, request } from "./api";

export const enum GameState {
    Init = "Init",
    InGame = "InGame",
    InGameStarting = "InGameStarting",
    GameFinished = "GameFinished",
    HostMigration = "HostMigration"
}

export interface Game {
    id: number;
    state: GameState,
    setting: number;
    attributes: Record<string, string | undefined>;
    players: GamePlayer[];
}

export interface GamePlayer {
    session_id: number;
    player_id: number;
    display_name: string;
    net: NetData | null;
}

export interface NetData {
    groups: null | {
        internal: NetGroup;
        external: NetGroup;
    };
    qos: {
        dbps: number;
        natt: string;
        ubps: number;
    }
    hardware_flags: number;
}

export interface NetGroup {
    address: string;
    port: number;
}

export interface GamesResponse {
    games: Game[];
    more: boolean;
}

export function getGames(offset: number, count: number): Promise<GamesResponse> {
    return request({
        method: HttpMethod.GET,
        route: `games?offset=${offset}&count=${count}`,
    })
}