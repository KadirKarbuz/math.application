import { Env } from '@/config/env';

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly body?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined>;
};

let getAuthToken: () => string | null = () => null;
let onUnauthorized: () => void = () => {};

/** Wired up by AuthProvider so the client can attach tokens and react to 401s. */
export function configureApiClient(options: {
  getAuthToken: () => string | null;
  onUnauthorized: () => void;
}) {
  getAuthToken = options.getAuthToken;
  onUnauthorized = options.onUnauthorized;
}

function buildUrl(path: string, query?: RequestOptions['query']) {
  const url = new URL(path.replace(/^\//, ''), Env.apiUrl.replace(/\/?$/, '/'));
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

async function request<T>(path: string, { body, query, headers, ...init }: RequestOptions = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), Env.apiTimeoutMs);
  init.signal?.addEventListener('abort', () => controller.abort());

  const token = getAuthToken();

  try {
    const response = await fetch(buildUrl(path, query), {
      ...init,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...(body !== undefined && { 'Content-Type': 'application/json' }),
        ...(token && { Authorization: `Bearer ${token}` }),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    const text = await response.text();
    const data = text ? safeJsonParse(text) : undefined;

    if (!response.ok) {
      if (response.status === 401) onUnauthorized();
      throw new ApiError(`Request failed with status ${response.status}`, response.status, data);
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (controller.signal.aborted) throw new ApiError('Request timed out or was cancelled', 0);
    throw new ApiError(error instanceof Error ? error.message : 'Network error', 0);
  } finally {
    clearTimeout(timeout);
  }
}

function safeJsonParse(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export const api = {
  get: <T>(path: string, options?: RequestOptions) => request<T>(path, { ...options, method: 'GET' }),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'POST', body }),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'PUT', body }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'PATCH', body }),
  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'DELETE' }),
};
