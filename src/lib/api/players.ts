import { HttpMethod, request, requestText } from "./api";

// Structure of a player account
export interface PlayerAccount {
    // The player account ID
    id: number;
    // The account email address
    email: string;
    // The account display name
    display_name: string;
    // The account role
    role: PlayerRole;
}

// Different roles available to player accounts
export const enum PlayerRole {
    // Default role granted to all users initially
    Default = "Default",
    // Admin role granted by super admin for partial moderation
    Admin = "Admin",
    // Super admin role granted by the server for complete moderation
    SuperAdmin = "SuperAdmin"
}

export function getSelf(): Promise<PlayerAccount> {
    return request({
        method: HttpMethod.GET,
        route: "players/self",
    })
}

export function deleteSelf(password: string): Promise<any> {
    return requestText({
        method: HttpMethod.DELETE,
        route: "players/self",
        body: {
            password
        }
    });
}

export function getPlayer(id: number): Promise<PlayerAccount> {
    return request({
        method: HttpMethod.GET,
        route: `players/${id}`,
    })
}

export function deletePlayer(id: number): Promise<any> {
    return requestText({
        method: HttpMethod.DELETE,
        route: `players/${id}`,
    });
}

export async function setSelfDetails(username: string, email: string): Promise<any> {
    return requestText({
        method: HttpMethod.PUT,
        route: "players/self/details",
        body: {
            username,
            email
        },
    });
}

export async function setSelfPassword(current_password: string, new_password: string): Promise<void> {
    await requestText({
        method: HttpMethod.PUT,
        route: "players/self/password",
        body: {
            current_password,
            new_password
        },
    });
}

export interface PlayerData {
    key: string;
    value: string;
}

export function getPlayerData(player_id: number, key: string): Promise<PlayerData> {
    return request({
        method: HttpMethod.GET,
        route: `players/${player_id}/data/${key}`
    })
}

export function setPlayerData(player_id: number, key: string, value: string): Promise<void> {
    return request({
        method: HttpMethod.PUT,
        route: `players/${player_id}/data/${key}`,
        body: {
            value
        }
    })
}

export function deletePlayerData(player_id: number, key: string): Promise<PlayerData> {
    return request({
        method: HttpMethod.DELETE,
        route: `players/${player_id}/data/${key}`,
    })
}

export function getAllPlayerData(player_id: number): Promise<Record<string, string>> {
    return request({
        method: HttpMethod.GET,
        route: `players/${player_id}/data`
    })
}

export async function setPlayerDetails(id: number, username: string, email: string): Promise<void> {
    await requestText({
        method: HttpMethod.PUT,
        route: `players/${id}/details`,
        body: {
            username,
            email
        },
    });
}

export async function setPlayerPassword(id: number, password: string): Promise<void> {
    await requestText({
        method: HttpMethod.PUT,
        route: `players/${id}/password`,
        body: {
            password
        },
    });
}

// Roles that are allowed to be set
export type AllowedSetRoles = PlayerRole.Default | PlayerRole.Admin;

export async function setPlayerRole(id: number, role: AllowedSetRoles): Promise<void> {
    await requestText({
        method: HttpMethod.PUT,
        route: `players/${id}/role`,
        body: {
            role
        },
    });
}


export interface PlayersResponse {
    players: PlayerAccount[];
    more: boolean;
}

export function getPlayers(offset: number, count: number): Promise<PlayersResponse> {
    return request({
        method: HttpMethod.GET,
        route: `players?offset=${offset}&count=${count}`
    })
}
