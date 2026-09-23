import * as SecureStore from 'expo-secure-store';

/**
 * Encrypted key-value storage (Keychain on iOS, Keystore on Android).
 * Use for tokens and other secrets.
 */
export const secureStorage = {
  get: (key: string) => SecureStore.getItemAsync(key),
  set: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  remove: (key: string) => SecureStore.deleteItemAsync(key),
};
