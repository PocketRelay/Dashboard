import { HttpMethod, request } from "./api";


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

export function setSelfDetails(username: string, email: string): Promise<void> {
    return request({
        method: HttpMethod.PUT,
        route: "players/self/details",
        body: {
            username,
            email
        },
        skip_response: true
    })
}

export function setSelfPassword(current_password: string, new_password: string): Promise<void> {
    return request({
        method: HttpMethod.PUT,
        route: "players/self/password",
        body: {
            current_password,
            new_password
        },
        skip_response: true
    })
}