import { AxiosInstance } from 'axios';

export interface TokenParams {
  client_id: string;
  client_secret?: string;
  grant_type: string;
  code?: string;
  redirect_uri?: string;
  refresh_token?: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in: number;
}

export interface RevokeTokenParams {
  client_id: string;
  client_secret?: string;
  token: string;
}

export interface AuthorizationUrlParams {
  client_id: string;
  redirect_uri: string;
  response_type: string;
  scope?: string;
  state?: string;
}

export class OAuthResource {
  constructor(private readonly http: AxiosInstance) {}

  /**
   * Generates the authorization URL to redirect the user to.
   * Note: This does not make an API call, but constructs the URL.
   */
  getAuthorizationUrl(params: AuthorizationUrlParams): string {
    const url = new URL('https://oauth.qonto.com/oauth2/auth');
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, value);
      }
    });
    return url.toString();
  }

  /**
   * Requests an access token (and optionally a refresh token) using an authorization code or refresh token.
   * Qonto's OAuth endpoints are usually on oauth.qonto.com. You might need to configure the AxiosInstance 
   * specifically for this or use a separate client if your base URL is fixed to thirdparty.qonto.com/v2.
   */
  async getToken(data: TokenParams): Promise<TokenResponse> {
    const response = await this.http.post('https://oauth.qonto.com/oauth2/token', data);
    return response.data;
  }

  /**
   * Revokes an existing access or refresh token.
   */
  async revokeToken(data: RevokeTokenParams): Promise<void> {
    await this.http.post('https://oauth.qonto.com/oauth2/revoke', data);
  }
}
