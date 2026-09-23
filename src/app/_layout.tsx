import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { AppProviders } from '@/providers/app-providers';
import { useAuth } from '@/providers/auth-provider';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <AppProviders>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <SplashGate />
        <AppTabs />
      </ThemeProvider>
    </AppProviders>
  );
}

/** Keeps the native splash screen up until app state (auth) is restored. */
function SplashGate() {
  const { isReady } = useAuth();
  return isReady ? <AnimatedSplashOverlay /> : null;
}
