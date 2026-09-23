/**
 * Environment configuration.
 * Only variables prefixed with `EXPO_PUBLIC_` are inlined into the bundle.
 * Define them in `.env` (see `.env.example`).
 */

export const Env = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000',
  apiTimeoutMs: Number(process.env.EXPO_PUBLIC_API_TIMEOUT_MS ?? 15000),
  isDev: __DEV__,
} as const;
