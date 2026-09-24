import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MathBackground } from '@/components/math-background';
import { LevelMeter } from '@/components/onboarding/level-meter';
import { PrimaryButton } from '@/components/onboarding/primary-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { levelCaption, targetCaption } from '@/features/onboarding/copy';
import { TOPIC_LABELS } from '@/features/onboarding/placement';
import { useTheme } from '@/hooks/use-theme';
import { useOnboarding } from '@/providers/onboarding-provider';

export default function HomeScreen() {
  const theme = useTheme();
  const { profile, resetOnboarding } = useOnboarding();

  if (!profile) return null;
  const { answers, result } = profile;

  return (
    <ThemedView style={styles.root}>
      <MathBackground />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <ThemedText type="subtitle" style={styles.title}>
            {answers.name ? `Merhaba, ${answers.name} 👋` : 'Merhaba 👋'}
          </ThemedText>
          <ThemedText themeColor="textSecondary">
            Bugünkü hedefin: {answers.dailyMinutes ?? 10} dakika matematik.
          </ThemedText>

          <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
            <LevelMeter
              label="Seviyen"
              value={result.currentLevel}
              caption={levelCaption(result.currentLevel)}
              color={theme.primary}
            />
            <LevelMeter
              label="Hedefin"
              value={result.targetLevel}
              caption={targetCaption(answers, result.targetLevel)}
              color={theme.success}
            />
          </View>

          {result.weakTopics.length > 0 && (
            <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
              <ThemedText type="smallBold">🎯 Odak konuların</ThemedText>
              {result.weakTopics.map((topic) => (
                <ThemedText key={topic}>• {TOPIC_LABELS[topic]}</ThemedText>
              ))}
            </View>
          )}

          <ThemedText type="small" themeColor="textSecondary">
            Dersler yakında burada olacak.
          </ThemedText>

          <PrimaryButton variant="ghost" title="Seviye testini yeniden yap" onPress={resetOnboarding} />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
  },
  content: {
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
    // On web the tab bar floats over the top of the screen.
    paddingTop: Platform.OS === 'web' ? Spacing.six + Spacing.four : Spacing.four,
    paddingBottom: BottomTabInset + Spacing.four,
  },
  title: {
    fontSize: 28,
    lineHeight: 36,
  },
  card: {
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Spacing.three,
  },
});
