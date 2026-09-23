import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

import { configureApiClient } from '@/lib/api-client';
import { queryClient } from '@/lib/query-client';
import { secureStorage } from '@/lib/secure-storage';

const TOKEN_KEY = 'auth_token';

type AuthContextValue = {
  /** False until the stored token has been read from secure storage. */
  isReady: boolean;
  isAuthenticated: boolean;
  token: string | null;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const tokenRef = useRef<string | null>(null);

  const updateToken = useCallback((value: string | null) => {
    tokenRef.current = value;
    setToken(value);
  }, []);

  const signIn = useCallback(
    async (value: string) => {
      await secureStorage.set(TOKEN_KEY, value);
      updateToken(value);
    },
    [updateToken],
  );

  const signOut = useCallback(async () => {
    await secureStorage.remove(TOKEN_KEY);
    updateToken(null);
    queryClient.clear();
  }, [updateToken]);

  useEffect(() => {
    configureApiClient({
      getAuthToken: () => tokenRef.current,
      onUnauthorized: () => void signOut(),
    });
  }, [signOut]);

  useEffect(() => {
    secureStorage
      .get(TOKEN_KEY)
      .then(updateToken)
      .catch(() => updateToken(null))
      .finally(() => setIsReady(true));
  }, [updateToken]);

  return (
    <AuthContext.Provider value={{ isReady, isAuthenticated: !!token, token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
