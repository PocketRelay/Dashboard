import { HttpMethod, request } from "./api";

// Token response from the server which contains an
// authentication token
export interface TokenResponse {
  // The authentication token
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const loginRequest = (body: LoginRequest): Promise<TokenResponse> =>
  request({
    method: HttpMethod.POST,
    route: "auth/login",
    body,
  });

interface CreateRequest {
  username: string;
  email: string;
  password: string;
}

export const createRequest = (body: CreateRequest): Promise<TokenResponse> =>
  request({
    method: HttpMethod.POST,
    route: "auth/create",
    body,
  });
