import { HttpMethod, request } from "./api";

// Token response from the server which contains an
// authentication token
export interface TokenResponse {
    // The authentication token
    token: string;
}

/**
 * Makes a request to the backend to attempt to login with
 * the provided credentials
 * 
 * @param email    The account email address
 * @param password The account password
 * @returns Promise that can resolve to a TokenResponse
 */
export function doLogin(email: string, password: string): Promise<TokenResponse> {
    return request({
        method: HttpMethod.POST,
        route: "auth/login",
        body: {
            email,
            password
        }
    });
}

/**
 * Makes a request to the backend to attempt to create a 
 * new account with the provided credentials
 * 
 * @param username The account username
 * @param email    The account email address
 * @param password The account password
 * @returns Promise that can resolve to a TokenResponse
 */
export function doCreate(username: string, email: string, password: string): Promise<TokenResponse> {
    return request({
        method: HttpMethod.POST,
        route: "auth/create",
        body: {
            username,
            email,
            password
        }
    });
}