import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { OnboardingScreen } from '@/components/onboarding/onboarding-screen';
import { OptionButton } from '@/components/onboarding/option-button';
import { PrimaryButton } from '@/components/onboarding/primary-button';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { nextLevel, pickQuestion, QUIZ_LENGTH, startingLevel } from '@/features/onboarding/placement';
import type { Level, Question, QuizAnswer } from '@/features/onboarding/types';
import { useTheme } from '@/hooks/use-theme';
import { useOnboarding } from '@/providers/onboarding-provider';

const FEEDBACK_MS = { correct: 700, wrong: 1200 };

export default function QuizScreen() {
  const theme = useTheme();
  const { answers, setQuizHistory } = useOnboarding();

  const [level, setLevel] = useState<Level>(() => startingLevel(answers));
  const [question, setQuestion] = useState<Question | undefined>(() => pickQuestion(level, []));
  const [history, setHistory] = useState<QuizAnswer[]>([]);
  /** Index of the tapped option, -1 for "Bilmiyorum", null while unanswered. */
  const [picked, setPicked] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  if (!question) return null;

  const answer = (index: number) => {
    if (picked !== null) return;
    setPicked(index);

    const correct = index === question.answer;
    const nextHistory = [
      ...history,
      { questionId: question.id, level: question.level, topic: question.topic, correct },
    ];

    timer.current = setTimeout(
      () => {
        if (nextHistory.length >= QUIZ_LENGTH) {
          setQuizHistory(nextHistory);
          router.replace('/onboarding/analyzing');
          return;
        }
        const newLevel = nextLevel(level, correct);
        setHistory(nextHistory);
        setLevel(newLevel);
        setQuestion(pickQuestion(newLevel, nextHistory.map((a) => a.questionId)));
        setPicked(null);
      },
      correct ? FEEDBACK_MS.correct : FEEDBACK_MS.wrong,
    );
  };

  const optionState = (index: number) => {
    if (picked === null) return undefined;
    if (index === question.answer) return 'correct';
    if (index === picked) return 'wrong';
    return undefined;
  };

  return (
    <OnboardingScreen
      progress={history.length / QUIZ_LENGTH}
      showBack={false}
      footer={
        <PrimaryButton
          variant="ghost"
          title="Bilmiyorum"
          disabled={picked !== null}
          onPress={() => answer(-1)}
        />
      }>
      <ThemedText type="small" themeColor="textSecondary">
        Soru {history.length + 1} / {QUIZ_LENGTH}
      </ThemedText>
      <Animated.View
        key={question.id}
        entering={FadeIn.duration(300)}
        style={[styles.promptCard, { backgroundColor: theme.backgroundElement }]}>
        <ThemedText style={styles.prompt}>{question.prompt}</ThemedText>
      </Animated.View>
      <View style={styles.options}>
        {question.options.map((option, index) => (
          <OptionButton
            key={`${question.id}-${option}`}
            index={index}
            label={option}
            state={optionState(index)}
            disabled={picked !== null}
            onPress={() => answer(index)}
          />
        ))}
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  promptCard: {
    padding: Spacing.four,
    borderRadius: Spacing.four,
    minHeight: 140,
    justifyContent: 'center',
  },
  prompt: {
    fontSize: 22,
    lineHeight: 32,
    fontWeight: 600,
    textAlign: 'center',
  },
  options: {
    gap: Spacing.two,
  },
});
