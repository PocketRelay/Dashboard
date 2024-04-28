import { dev } from "$app/environment";
import { writable, type Writable } from "svelte/store";
import { getSelf, PlayerRole, type PlayerAccount } from "../api/players";
import { base } from "$app/paths";

// Base url segment based on whether in development mode or not
const BASE_URL = dev ? "http://localhost/api/" : `${base}/api/`;

// The API token used to authenticate with the server
let token: string | null = null;
export const player: Writable<PlayerAccount> = writable(null!);

// Local storage key for the token
const TOKEN_STORAGE_KEY: string = "pr_token";

/**
 * Check whether a player is an admin
 *
 * @param player The player to check for admin permission
 *
 * @returns Whether the player is an admin
 */
export function isAdmin(player: PlayerAccount): boolean {
  return (
    player.role == PlayerRole.Admin || player.role == PlayerRole.SuperAdmin
  );
}

export function isPlayerEditable(self: PlayerAccount, other: PlayerAccount) {
  // Allow editing all default role accounts
  if (other.role == PlayerRole.Default) {
    return true;
  }

  // Don't allow editing other super admins
  return other.role != PlayerRole.SuperAdmin || self.id === other.id;
}

/**
 * Sets the current authentication token to the provided
 * value storing it in localStorage for future access and
 * clearing the active player if one is present
 *
 * @param value
 */
export function setToken(value: string) {
  player.set(null!);
  token = value;
  localStorage.setItem(TOKEN_STORAGE_KEY, value);
}

/**
 * Clears the active token and removes the token from
 * localStorage
 */
export function clearToken() {
  player.set(null!);
  token = null;
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

/**
 * Attempts to load the currently authenticated player using the
 * stored authentication token will immediately return false if
 * there is not an active token
 *
 * @returns Whether the player was loaded
 */
export async function loadPlayer(): Promise<boolean> {
  if (!token) {
    return false;
  }

  try {
    let value: PlayerAccount = await getSelf();
    player.set(value);
    return true;
  } catch (error) {
    console.error("Error while loading player", error);
    clearToken();
    return false;
  }
}

/**
 * Loads the authorization token from localStorage and clears
 * the active player in preperation for a call to `loadPlayer`
 */
export function loadToken() {
  let localToken: string | null = localStorage.getItem(TOKEN_STORAGE_KEY);
  // Ignore the token if its not set
  if (localToken == null) {
    return;
  }

  // Set the token state
  token = localToken;
  // Reset the stored user when the token changes
  player.set(null!);
}

loadToken();

// Constant enum for the different HTTP verbs
export const enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

// Configuration object structure for requests
export interface RequestConfig {
  // The http request method
  method: HttpMethod;
  // Route segment of the request URL
  route: string;
  // Body object for the request to encode as JSON
  body?: any;
  // Additional HTTP headers for the request
  headers?: Record<string, string>;
}

export async function requestInner(config: RequestConfig): Promise<Response> {
  const init: RequestInit = { method: config.method };
  const headers: Record<string, string> = config.headers ?? {};

  // Append the Authorization header if there is an API token set
  if (token !== null) {
    headers["X-Token"] = token;
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
  } catch (error) {
    throw new Error("Failed to connect", { cause: error });
  }

  return response;
}

export async function requestText(config: RequestConfig): Promise<string> {
  const response = await requestInner(config);
  /// Handle 2xx status codes
  if (response.ok) {
    // Handle invalid JSON responses
    try {
      return await response.text();
    } catch (error) {
      throw new Error("Invalid server response", {
        cause: error,
      });
    }
  }

  // Handle non 200 status codes by taking the text response
  let text: string;
  try {
    text = await response.text();
  } catch (error) {
    throw new Error("Failed to get error response text", {
      cause: error,
    });
  }

  throw new Error(text);
}

export class HttpResponseError extends Error {
  statusCode: number;

  constructor(statusCode: number, message?: string, options?: ErrorOptions) {
    super(message, options);
    this.statusCode = statusCode;
  }
}

export async function request<T>(config: RequestConfig): Promise<T> {
  const response = await requestInner(config);

  if (response.ok) {
    // Handle invalid JSON responses
    try {
      return await response.json();
    } catch (error) {
      throw new Error("Invalid server response", {
        cause: error,
      });
    }
  }

  // Handle non 200 status codes by taking the text response
  let text: string;
  try {
    text = await response.text();
  } catch (error) {
    throw new HttpResponseError(
      response.status,
      "Failed to get error response text",
      {
        cause: error,
      }
    );
  }

  throw new Error(text);
}
