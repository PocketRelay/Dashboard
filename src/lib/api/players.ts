import { HttpMethod, request, requestInner, requestText } from "./api";


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


export const enum PlayerRole {
    Default = "Default",
    Admin = "Admin",
    SuperAdmin = "SuperAdmin"
}

export function getSelf(): Promise<PlayerAccount> {
    return request({
        method: HttpMethod.GET,
        route: "players/self",
    })
}

export function getPlayer(id: number): Promise<PlayerAccount> {
    return request({
        method: HttpMethod.GET,
        route: `players/${id}`,
    })
}

export async function setSelfDetails(username: string, email: string): Promise<void> {
    await requestInner({
        method: HttpMethod.PUT,
        route: "players/self/details",
        body: {
            username,
            email
        },
    });
}

export async function setSelfPassword(current_password: string, new_password: string): Promise<void> {
    await requestInner({
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

export function setPlayerData(player_id: number, key: string, value: string): Promise<PlayerData> {
    return request({
        method: HttpMethod.PUT,
        route: `players/${player_id}/data/${key}`,
        body: {
            value
        }
    })
}

export function getAllPlayerData(player_id: number): Promise<Record<string, string>> {
    return request({
        method: HttpMethod.GET,
        route: `players/${player_id}/data`
    })
}

export async function setPlayerDetails(id: number, username: string, email: string): Promise<void> {
    await requestInner({
        method: HttpMethod.PUT,
        route: `players/${id}/details`,
        body: {
            username,
            email
        },
    });
}

export async function setPlayerPassword(id: number, new_password: string): Promise<void> {
    await requestInner({
        method: HttpMethod.PUT,
        route: `players/${id}/password`,
        body: {
            new_password
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
