// src/client.ts

import axios, { AxiosInstance, AxiosError } from "axios";

/**
 * Configuration options for the Qonto API client.
 */
export interface QontoClientConfig {
  /** Your Qonto organisation login (slug). */
  login: string;
  /** Your Qonto secret API key. */
  secretKey: string;
  /**
   * Override the default Qonto API base URL.
   * Defaults to `https://thirdparty.qonto.com`.
   */
  baseURL?: string;
}

/**
 * Typed error thrown whenever the Qonto API returns a non-2xx response.
 */
export class QontoApiError extends Error {
  public readonly statusCode: number;
  public readonly details: any;

  constructor(message: string, statusCode: number, details: any) {
    let enhancedMessage = message;
    if (details?.errors && Array.isArray(details.errors)) {
      const specificErrors = details.errors
        .map((err: any) => `${err.parameter}: ${err.detail || err.code}`)
        .join(', ');
      enhancedMessage = `${message} (Details: ${specificErrors})`;
    }

    super(enhancedMessage);
    this.name = "QontoApiError";
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Creates a pre-configured Axios instance for the Qonto Business API.
 *
 * @example
 * const http = createHttpClient("my-org-login", "my-secret-key");
 * const { data } = await http.get("/v2/transactions");
 */
export function createHttpClient(
  login: string,
  secretKey: string,
  baseURL = "https://thirdparty.qonto.com"
): AxiosInstance {
  const instance = axios.create({
    baseURL,
    headers: {
      Authorization: `${login}:${secretKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response) {
        const statusCode = error.response.status;
        const responseData = error.response.data as any;

        // Qonto renvoie souvent les erreurs dans responseData.errors
        // On essaie de trouver un message global, sinon on met un message générique
        const message =
          responseData?.message ||
          responseData?.error ||
          (statusCode === 422 ? "Validation Error" : error.message);

        return Promise.reject(new QontoApiError(message, statusCode, responseData ?? null));
      }
      return Promise.reject(new QontoApiError(error.message || "Network error", 0, null));
    }
  );

  return instance;
}