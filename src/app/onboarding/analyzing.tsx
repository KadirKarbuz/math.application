import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

import { CurvePlotter } from '@/components/math/curve-plotter';
import { CIRCLE, PARABOLA, ROSE, SINE } from '@/components/math/curves';
import { OnboardingScreen } from '@/components/onboarding/onboarding-screen';
import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** One curve is drawn per analysis step. */
const STEPS = [
  'Cevapların değerlendiriliyor',
  'Güçlü ve zayıf konuların belirleniyor',
  'Hedefine göre konular sıralanıyor',
  'Kişisel planın hazırlanıyor',
];
const CURVES = [CIRCLE, PARABOLA, SINE, ROSE];

export default function AnalyzingScreen() {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const [active, setActive] = useState(0);
  const plotSize = Math.min(Math.min(width, MaxContentWidth) - Spacing.four * 2, 260);

  return (
    <OnboardingScreen>
      <View style={styles.center}>
        <CurvePlotter
          curves={CURVES}
          size={plotSize}
          drawMs={1300}
          holdMs={350}
          loop={false}
          onCurveStart={setActive}
          onDone={() => router.replace('/onboarding/result')}
        />
        <ThemedText type="subtitle" style={styles.title}>
          Analiz ediliyor…
        </ThemedText>
        <View style={styles.steps}>
          {STEPS.map((step, index) => {
            const isDone = index < active;
            const isActive = index === active;
            return (
              <View key={step} style={styles.step}>
                <ThemedText
                  style={{ color: isDone ? theme.success : isActive ? theme.primary : theme.textSecondary }}>
                  {isDone ? '✓' : isActive ? '●' : '○'}
                </ThemedText>
                <ThemedText themeColor={isDone || isActive ? 'text' : 'textSecondary'}>{step}</ThemedText>
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
