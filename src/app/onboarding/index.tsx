import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { OnboardingScreen } from '@/components/onboarding/onboarding-screen';
import { PrimaryButton } from '@/components/onboarding/primary-button';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function WelcomeScreen() {
  const theme = useTheme();

  return (
    <OnboardingScreen
      footer={<PrimaryButton title="Başlayalım" onPress={() => router.push('/onboarding/goal')} />}>
      <View style={styles.hero}>
        <View style={[styles.badge, { backgroundColor: theme.primaryBackground }]}>
          <ThemedText style={[styles.symbol, { color: theme.primary }]}>∑</ThemedText>
        </View>
        <ThemedText type="subtitle" style={styles.center}>
          Matematiği sana göre öğrenelim
        </ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.center}>
          Birkaç soruyla seviyeni ve hedefini öğrenip sana özel bir çalışma planı hazırlayacağız.
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          ⏱ Yaklaşık 3 dakika sürer
        </ThemedText>
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
  },
  badge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.three,
  },
  symbol: {
    fontSize: 64,
    lineHeight: 76,
    fontWeight: 700,
  },
  center: {
    textAlign: 'center',
  },
});
