import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { LevelMeter } from '@/components/onboarding/level-meter';
import { OnboardingScreen } from '@/components/onboarding/onboarding-screen';
import { PrimaryButton } from '@/components/onboarding/primary-button';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import {
  FEELING_MESSAGES,
  headline,
  levelCaption,
  targetCaption,
} from '@/features/onboarding/copy';
import { buildResult, TOPIC_LABELS } from '@/features/onboarding/placement';
import type { Topic } from '@/features/onboarding/types';
import { useTheme } from '@/hooks/use-theme';
import { useOnboarding } from '@/providers/onboarding-provider';

export default function ResultScreen() {
  const theme = useTheme();
  const { answers, quizHistory, completeOnboarding } = useOnboarding();
  const result = useMemo(() => buildResult(answers, quizHistory), [answers, quizHistory]);
  const [saving, setSaving] = useState(false);

  const minutes = answers.dailyMinutes ?? 10;
  const focusTopics = result.weakTopics.length > 0 ? result.weakTopics : result.strongTopics;

  const start = async () => {
    setSaving(true);
    // Saving the profile flips the root guard, which navigates to the tabs.
    await completeOnboarding(result).catch(() => setSaving(false));
  };

  return (
    <OnboardingScreen
      footer={<PrimaryButton title="Hadi başlayalım 🚀" disabled={saving} onPress={start} />}>
      <ThemedText type="subtitle" style={styles.title}>
        Planın hazır! 🎉
      </ThemedText>
      <ThemedText themeColor="textSecondary">{headline(result)}</ThemedText>

      <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
        <LevelMeter
          label="Şu anki seviyen"
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
        <ThemedText type="small" themeColor="textSecondary">
          Testte {result.total} sorudan {result.correctCount} tanesini doğru yaptın.
        </ThemedText>
      </View>

      {answers.feeling && (
        <View style={[styles.card, { backgroundColor: theme.primaryBackground }]}>
          <ThemedText>{FEELING_MESSAGES[answers.feeling]}</ThemedText>
        </View>
      )}

      {result.strongTopics.length > 0 && (
        <TopicGroup title="💪 Güçlü olduğun konular" topics={result.strongTopics} color={theme.success} />
      )}
      {result.weakTopics.length > 0 && (
        <TopicGroup title="🎯 Önce buradan başlayacağız" topics={result.weakTopics} color={theme.danger} />
      )}

      <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
        <ThemedText type="smallBold">Senin planın</ThemedText>
        <PlanStep n={1} text={`Her gün ${minutes} dakikalık kısa bir ders`} />
        <PlanStep
          n={2}
          text={
            focusTopics.length > 0
              ? `Önce ${focusTopics.map((t) => TOPIC_LABELS[t]).join(', ')}`
              : 'Seviyene uygun konulardan başlayarak'
          }
        />
        <PlanStep n={3} text="Her hafta ilerlemeni gösteren mini bir sınav" />
        <ThemedText type="small" themeColor="textSecondary">
          Tahmini süre: ~{result.estimatedWeeks} hafta. Düzenli çalıştıkça plan sana göre güncellenir.
        </ThemedText>
      </View>
    </OnboardingScreen>
  );
}

function TopicGroup({ title, topics, color }: { title: string; topics: Topic[]; color: string }) {
  return (
    <View style={styles.group}>
      <ThemedText type="smallBold">{title}</ThemedText>
      <View style={styles.chips}>
        {topics.map((topic) => (
          <View key={topic} style={[styles.chip, { borderColor: color }]}>
            <ThemedText type="small">{TOPIC_LABELS[topic]}</ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
}

function PlanStep({ n, text }: { n: number; text: string }) {
  const theme = useTheme();
  return (
    <View style={styles.planStep}>
      <View style={[styles.stepBadge, { backgroundColor: theme.primary }]}>
        <ThemedText type="smallBold" style={{ color: theme.onPrimary }}>
          {n}
        </ThemedText>
      </View>
      <ThemedText style={styles.stepText}>{text}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    lineHeight: 36,
  },
  card: {
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Spacing.three,
  },
  group: {
    gap: Spacing.two,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  chip: {
    borderWidth: 1.5,
    borderRadius: Spacing.four,
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
  },
  planStep: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  stepBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: {
    flex: 1,
  },
});
