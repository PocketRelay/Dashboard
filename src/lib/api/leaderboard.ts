import { HttpMethod, request } from "./api";


export interface LeaderboardEntry {
    player_id: number;
    player_name: string;
    rank: number;
    value: number;
}

export interface LeaderboardResponse {
    total: number;
    entries: LeaderboardEntry[];
    more: boolean;
}

export const enum LeaderboardName {
    N7Rating = "n7",
    ChallengePoints = "cp"
}


/**
 * Makes a request to get the leaderboard entry on a leaderboard
 * for a specific player
 * 
 * @param name The name of the leaderboard to get the entry from
 * @param id   The ID of the player to get the leaderboard entry for
 * @returns Promise that can resolve to a TokenResponse
 */
export function getPlayerEntry(name: LeaderboardName, id: number): Promise<LeaderboardEntry> {
    return request({
        method: HttpMethod.GET,
        route: `leaderboard/${name}/${id}`,
    })
}

export function getLeaderboard(name: LeaderboardName, offset: number, count: number): Promise<LeaderboardResponse> {
    return request({
        method: HttpMethod.GET,
        route: `leaderboard/${name}?offset=${offset}&count=${count}`,
    })
}