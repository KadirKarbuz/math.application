import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      {/* No swiping back mid-quiz or after results are computed. */}
      <Stack.Screen name="quiz" options={{ gestureEnabled: false }} />
      <Stack.Screen name="analyzing" options={{ gestureEnabled: false }} />
      <Stack.Screen name="result" options={{ gestureEnabled: false }} />
    </Stack>
  );
}
