import { HttpMethod, request, requestText } from "./api";


export interface ServerDetails {
    ident: string;
    version: string;
}


/**
 * Makes a request to get the server details
 * 
 * @returns Promise that can resolve to a TokenResponse
 */
export function getServerDetails(): Promise<ServerDetails> {
    return request({
        method: HttpMethod.GET,
        route: "server",
    })
}

export interface LogsResponse {
    files: string[];
}

export function getServerLog(): Promise<string> {
    return requestText({
        method: HttpMethod.GET,
        route: "server/log",
    })
}

export interface DashboardDetails {
    disable_registration: boolean;
}

export function getDashboardDetails(): Promise<DashboardDetails> {
    return request({
        method: HttpMethod.GET,
        route: "server/dashboard",
    })
}