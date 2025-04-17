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
  // When the player last logged in
  last_login_at: string | null;
}

// Different roles available to player accounts
export const enum PlayerRole {
  // Default role granted to all users initially
  Default = "Default",
  // Admin role granted by super admin for partial moderation
  Admin = "Admin",
  // Super admin role granted by the server for complete moderation
  SuperAdmin = "SuperAdmin",
}

export function getSelf(): Promise<PlayerAccount> {
  return request({
    method: HttpMethod.GET,
    route: "players/self",
  });
}

export interface DeleteSelfRequest {
  password: string;
}

export const deleteSelfRequest = (body: DeleteSelfRequest) =>
  requestText({
    method: HttpMethod.DELETE,
    route: "players/self",
    body,
  });

export function getPlayer(id: number): Promise<PlayerAccount> {
  return request({
    method: HttpMethod.GET,
    route: `players/${id}`,
  });
}

export const deletePlayerRequest = (id: number) =>
  requestText({
    method: HttpMethod.DELETE,
    route: `players/${id}`,
  });

export interface SetSelfDetailsRequest {
  username: string;
  email: string;
}

export const setSelfDetailsRequest = (body: SetSelfDetailsRequest) =>
  requestText({
    method: HttpMethod.PUT,
    route: "players/self/details",
    body,
  });

export interface SetSelfPasswordRequest {
  current_password: string;
  new_password: string;
}

export const setSelfPasswordRequest = (body: SetSelfPasswordRequest) =>
  requestText({
    method: HttpMethod.PUT,
    route: "players/self/password",
    body,
  });

export interface PlayerData {
  key: string;
  value: string;
}

export function getPlayerData(
  player_id: number,
  key: string
): Promise<PlayerData> {
  return request({
    method: HttpMethod.GET,
    route: `players/${player_id}/data/${key}`,
  });
}

export function setPlayerData(
  player_id: number,
  key: string,
  value: string
): Promise<string> {
  return requestText({
    method: HttpMethod.PUT,
    route: `players/${player_id}/data/${key}`,
    body: {
      value,
    },
  });
}

export function deletePlayerData(
  player_id: number,
  key: string
): Promise<PlayerData> {
  return request({
    method: HttpMethod.DELETE,
    route: `players/${player_id}/data/${key}`,
  });
}

export type PlayerDataMap = Partial<Record<string, string>>;

export function getAllPlayerData(player_id: number): Promise<PlayerDataMap> {
  return request({
    method: HttpMethod.GET,
    route: `players/${player_id}/data`,
  });
}

export async function setPlayerDetails(
  id: number,
  username: string,
  email: string
): Promise<void> {
  await requestText({
    method: HttpMethod.PUT,
    route: `players/${id}/details`,
    body: {
      username,
      email,
    },
  });
}

export async function setPlayerPassword(
  id: number,
  password: string
): Promise<void> {
  await requestText({
    method: HttpMethod.PUT,
    route: `players/${id}/password`,
    body: {
      password,
    },
  });
}

export async function setPlayerRole(
  id: number,
  role: PlayerRole
): Promise<void> {
  await requestText({
    method: HttpMethod.PUT,
    route: `players/${id}/role`,
    body: {
      role,
    },
  });
}

export interface PlayersResponse {
  players: PlayerAccount[];
  more: boolean;
  total_pages: number;
  total_items: number;
}

export function getPlayers(
  offset: number,
  count: number
): Promise<PlayersResponse> {
  return request({
    method: HttpMethod.GET,
    route: `players?offset=${offset}&count=${count}`,
  });
}
