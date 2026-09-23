import { router } from 'expo-router';

import { ChoiceScreen, type Choice } from '@/components/onboarding/choice-screen';
import { GOAL_EXAM_HINT } from '@/features/onboarding/exams';
import type { Country, Goal } from '@/features/onboarding/types';
import { useOnboarding } from '@/providers/onboarding-provider';

const choicesFor = (country: Country): Choice<Goal>[] => [
  { value: 'exam', emoji: '🎯', label: 'Bir sınava hazırlanıyorum', description: GOAL_EXAM_HINT[country] },
  { value: 'school', emoji: '📚', label: 'Okul derslerime destek', description: 'Notlarımı yükseltmek istiyorum' },
  { value: 'self', emoji: '🧠', label: 'Kendimi geliştirmek', description: 'Eksiklerimi kapatmak istiyorum' },
  { value: 'fun', emoji: '🎮', label: 'Eğlenmek, zihnimi açık tutmak', description: 'Günlük beyin egzersizi' },
];

export default function GoalScreen() {
  const { answers, setAnswer } = useOnboarding();

  return (
    <ChoiceScreen
      progress={2 / 7}
      title="Matematikte hedefin ne?"
      subtitle="Planını buna göre şekillendireceğiz."
      choices={choicesFor(answers.country ?? 'tr')}
      selected={answers.goal}
      onSelect={(goal) => {
        setAnswer('goal', goal);
        router.push(goal === 'exam' ? '/onboarding/exam' : '/onboarding/education');
      }}
    />
  );
}
