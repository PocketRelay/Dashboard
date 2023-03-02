import { HttpMethod, request } from "./api";

// Structure representing an entry within a leaderboard
export interface LeaderboardEntry {
    // The ID of the player for this entry
    player_id: number;
    // The name of the player for this entry
    player_name: string;
    // The leaderboard rank
    rank: number;
    // The backing value for this entry
    value: number;
}

// Response for a leaderboard query
export interface LeaderboardResponse {
    // The total number of leaderboard entries which is equal to
    // the total number of players on the server unless an error
    // occurred
    total: number;
    // The actual entries
    entries: LeaderboardEntry[];
    // Whether there are more entries at the next offset
    more: boolean;
}

// Constants for the different leaderboard type names
export const enum LeaderboardName {
    // N7 rating leaderboard
    N7Rating = "n7",
    // Challenge Points leaderboard
    ChallengePoints = "cp"
}


/**
 * Makes a request to get the leaderboard entry on a leaderboard
 * for a specific player
 * 
 * @param name The name of the leaderboard to get the entry from
 * @param id   The ID of the player to get the leaderboard entry for
 * @returns    Promise that can resolve to a TokenResponse
 */
export function getPlayerEntry(name: LeaderboardName, id: number): Promise<LeaderboardEntry> {
    return request({
        method: HttpMethod.GET,
        route: `leaderboard/${name}/${id}`,
    })
}

/**
 * Queries the leaderboard server for a specific leaderboard with
 * an offset and count
 * 
 * @param name   The name of the leaderboard to query
 * @param offset The offset within the leaderboard
 * @param count  The number of entries to query
 * @returns      The leaderboard response
 */
export function getLeaderboard(
    name: LeaderboardName,
    offset: number,
    count: number
): Promise<LeaderboardResponse> {
    return request({
        method: HttpMethod.GET,
        route: `leaderboard/${name}?offset=${offset}&count=${count}`,
    })
}