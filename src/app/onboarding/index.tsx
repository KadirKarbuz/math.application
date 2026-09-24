import { router } from 'expo-router';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

import { CurvePlotter } from '@/components/math/curve-plotter';
import { CIRCLE, HEART, ROSE } from '@/components/math/curves';
import { OnboardingScreen } from '@/components/onboarding/onboarding-screen';
import { PrimaryButton } from '@/components/onboarding/primary-button';
import { ThemedText } from '@/components/themed-text';
import { Fonts, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const HERO_CURVES = [HEART, ROSE, CIRCLE];

export default function WelcomeScreen() {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const plotSize = Math.min(Math.min(width, MaxContentWidth) - Spacing.four * 2, 300);

  return (
    <OnboardingScreen
      footer={
        <Animated.View entering={FadeInUp.delay(700).duration(500)}>
          <PrimaryButton title="Başlayalım" onPress={() => router.push('/onboarding/name')} />
        </Animated.View>
      }>
      <View style={styles.content}>
        <Animated.View entering={FadeInDown.duration(500)} style={styles.brand}>
          <ThemedText style={[styles.brandMark, { color: theme.primary }]}>∑</ThemedText>
          <ThemedText style={styles.brandName}>Math</ThemedText>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(150).duration(600)}>
          <CurvePlotter curves={HERO_CURVES} size={plotSize} drawMs={2200} holdMs={900} />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(350).duration(500)} style={styles.texts}>
          <ThemedText type="subtitle" style={styles.title}>
            Matematiği sana göre öğrenelim
          </ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.center}>
            Seviyeni ölçelim, hedefini öğrenelim, sana özel bir plan çizelim.
          </ThemedText>
        </Animated.View>
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.four,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  brandMark: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: 800,
  },
  brandName: {
    fontFamily: Fonts.rounded,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: 800,
    letterSpacing: 1,
  },
  texts: {
    gap: Spacing.two,
  },
  title: {
    fontSize: 28,
    lineHeight: 36,
    textAlign: 'center',
  },
  center: {
    textAlign: 'center',
  },
});
