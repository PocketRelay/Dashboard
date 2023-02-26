import { dev } from "$app/environment";
import { get, writable, type Writable } from "svelte/store";
import { getSelf, type PlayerAccount } from "../api/players";

// Base url segment based on whether in development mode or not
const BASE_URL = dev ? "http://localhost/api/" : "/api/";

// The API token used to authenticate with the server 
const token: Writable<string | null> = writable(null);
export const player: Writable<PlayerAccount> = writable(null!);

const TOKEN_STORAGE_KEY: string = "pr_token";

export function setToken(value: string) {
    player.set(null!);
    token.set(value);
    localStorage.setItem(TOKEN_STORAGE_KEY, value);
}

export function clearToken() {
    player.set(null!);
    token.set(null);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export function isAuthenticated(): boolean {
    return get(token) !== null;
}

export async function loadPlayer(): Promise<boolean> {
    if (!isAuthenticated()) {
        return false;
    }

    try {
        let value: PlayerAccount = await getSelf();
        player.set(value);
        return true;
    } catch (e) {
        const err = e as RequestError;

        switch (err.status) {
            case 500:
                console.error("Internal server error while attempting to load player")
                break;
            case 401:
                console.error("Stored token is no longer valid", err.text);
                clearToken();
                break;
        }
        return false;
    }
}

export function loadToken() {
    let localToken: string | null = localStorage.getItem(TOKEN_STORAGE_KEY);
    // Ignore the token if its not set
    if (localToken == null) {
        return;
    }
    console.debug("Loaded localStorage token", localToken);
    // Set the token state
    token.set(localToken);
    // Reset the stored user when the token changes 
    player.set(null!);
}

loadToken();



// Constant enum for the different HTTP verbs
export const enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

// Type used as an error from requests
export interface RequestError {
    /// The HTTP status code of the error
    status: number;
    /// The error message
    text: string;
}

// Configuration object structure for requests
export interface RequestConfig {
    // The http request method
    method: HttpMethod,
    // Route segment of the request URL
    route: string;
    // Body object for the request to encode as JSON
    body?: any;
    // Additional HTTP headers for the request
    headers?: Record<string, string>,
    // Skip response body JSON decoding
    skip_response?: boolean,
}

/**
 * Makes a request according to the request config
 * 
 * @param config The request configuration
 * @returns The response type for the request
 */
export async function request<T>(config: RequestConfig): Promise<T> {
    const init: RequestInit = { method: config.method };
    const headers: Record<string, string> = config.headers ?? {};

    // Append the Authorization header if there is an API token set
    const tokenValue = get(token);
    if (tokenValue !== null) {
        headers["Authorization"] = "Bearer " + tokenValue;
    }

    // Assign the body value for non GET requests if the body is present
    if (config.method != HttpMethod.GET && config.body) {
        headers["Content-Type"] = "application/json";
        init.body = JSON.stringify(config.body);
    }

    init.headers = headers;

    // Make the initial request
    let response: Response;
    try {
        let url = BASE_URL + config.route;
        response = await fetch(url, init);
    } catch {
        throw { status: -1, text: "Failed to connect" };
    }

    const status = response.status;
    // The first digit from the status code 
    const statusPrefix: number = Math.floor(status / 100);

    /// Handle 2xx status codes 
    if (statusPrefix === 2) {
        if (config.skip_response) {
            return status as T;
        }

        // Handle invalid JSON responses
        try {
            return await response.json();
        } catch (e) {
            console.error("Invalid JSON response", e);
            throw { status, text: "Invalid server response" };
        }
    }

    // Handle non 200 status codes by taking the text response
    let text: string;
    try {
        text = await response.text();
    } catch (e) {
        console.error("Failed to get error response text", e);
        throw { status, text: "Unknown error" };
    }

    throw { status, text };
}

