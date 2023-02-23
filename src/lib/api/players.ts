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