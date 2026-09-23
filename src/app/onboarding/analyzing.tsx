import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { OnboardingScreen } from '@/components/onboarding/onboarding-screen';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const STEPS = [
  'Cevapların değerlendiriliyor',
  'Güçlü ve zayıf konuların belirleniyor',
  'Hedefine göre konular sıralanıyor',
  'Kişisel planın hazırlanıyor',
];
const STEP_MS = 800;

export default function AnalyzingScreen() {
  const theme = useTheme();
  const [done, setDone] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setDone((d) => d + 1), STEP_MS);
    const finish = setTimeout(() => router.replace('/onboarding/result'), STEP_MS * (STEPS.length + 0.5));
    return () => {
      clearInterval(interval);
      clearTimeout(finish);
    };
  }, []);

  return (
    <OnboardingScreen>
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.primary} />
        <ThemedText type="subtitle" style={styles.title}>
          Analiz ediliyor…
        </ThemedText>
        <View style={styles.steps}>
          {STEPS.map((step, index) => {
            const isDone = index < done;
            return (
              <View key={step} style={styles.step}>
                <ThemedText style={{ color: isDone ? theme.success : theme.textSecondary }}>
                  {isDone ? '✓' : '○'}
                </ThemedText>
                <ThemedText themeColor={isDone ? 'text' : 'textSecondary'}>{step}</ThemedText>
              </View>
            );
          })}
        </View>
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing.four,
  },
  title: {
    fontSize: 28,
    lineHeight: 36,
    textAlign: 'center',
  },
  steps: {
    gap: Spacing.three,
    alignSelf: 'center',
  },
  step: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
});
