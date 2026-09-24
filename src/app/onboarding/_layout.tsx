import { Stack, ThemeProvider, useTheme as useNavigationTheme } from 'expo-router';
import { StyleSheet } from 'react-native';

import { MathBackground } from '@/components/math-background';
import { ThemedView } from '@/components/themed-view';

export default function OnboardingLayout() {
  const navigationTheme = useNavigationTheme();
  // Screens must not paint their own background, or they'd cover the shared one.
  const transparentTheme = {
    ...navigationTheme,
    colors: { ...navigationTheme.colors, background: 'transparent' },
  };

  return (
    // One background for the whole flow: it keeps drifting across screen changes
    // and only one copy runs, instead of one per stacked screen.
    <ThemedView style={styles.root}>
      <MathBackground />
      <ThemeProvider value={transparentTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: 'transparent' },
            // Screens are transparent, so slide transitions would show both at once.
            animation: 'fade',
          }}>
          <Stack.Screen name="index" />
          {/* No swiping back mid-quiz or after results are computed. */}
          <Stack.Screen name="quiz" options={{ gestureEnabled: false }} />
          <Stack.Screen name="analyzing" options={{ gestureEnabled: false }} />
          <Stack.Screen name="result" options={{ gestureEnabled: false }} />
        </Stack>
      </ThemeProvider>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
