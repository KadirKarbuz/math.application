import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { AppProviders } from '@/providers/app-providers';
import { useAuth } from '@/providers/auth-provider';
import { useOnboarding } from '@/providers/onboarding-provider';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}

function RootNavigator() {
  const colorScheme = useColorScheme();
  const auth = useAuth();
  const { isReady, profile } = useOnboarding();

  // Keep the native splash screen up until saved state is restored.
  if (!auth.isReady || !isReady) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* New users see onboarding first; after finishing it they only see the tabs. */}
        <Stack.Protected guard={!profile}>
          <Stack.Screen name="onboarding" />
        </Stack.Protected>
        <Stack.Protected guard={!!profile}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
      </Stack>
      <AnimatedSplashOverlay />
    </ThemeProvider>
  );
}
