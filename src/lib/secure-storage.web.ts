/**
 * Web fallback: expo-secure-store is not available in the browser,
 * so values are kept in localStorage (not encrypted).
 */
export const secureStorage = {
  get: async (key: string) => globalThis.localStorage?.getItem(key) ?? null,
  set: async (key: string, value: string) => globalThis.localStorage?.setItem(key, value),
  remove: async (key: string) => globalThis.localStorage?.removeItem(key),
};
