import { HttpMethod, request, requestText } from "./api";

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

interface RequestLoginCode {
  email: string;
}

export const requestLoginCode = (body: RequestLoginCode): Promise<any> =>
  requestText({
    method: HttpMethod.POST,
    route: "auth/request-code",
    body,
  });

interface ExchangeLoginCode {
  login_code: string;
}

export const exchangeLoginCode = (
  body: ExchangeLoginCode
): Promise<TokenResponse> =>
  request({
    method: HttpMethod.POST,
    route: "auth/exchange-code",
    body,
  });
