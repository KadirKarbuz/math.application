import { router } from 'expo-router';

import { ChoiceScreen, type Choice } from '@/components/onboarding/choice-screen';
import type { Goal } from '@/features/onboarding/types';
import { useOnboarding } from '@/providers/onboarding-provider';

const CHOICES: Choice<Goal>[] = [
  { value: 'exam', emoji: '🎯', label: 'Bir sınava hazırlanıyorum', description: 'LGS, YKS, KPSS, ALES…' },
  { value: 'school', emoji: '📚', label: 'Okul derslerime destek', description: 'Notlarımı yükseltmek istiyorum' },
  { value: 'self', emoji: '🧠', label: 'Kendimi geliştirmek', description: 'Eksiklerimi kapatmak istiyorum' },
  { value: 'fun', emoji: '🎮', label: 'Eğlenmek, zihnimi açık tutmak', description: 'Günlük beyin egzersizi' },
];

export default function GoalScreen() {
  const { answers, setAnswer } = useOnboarding();

  return (
    <ChoiceScreen
      progress={1 / 6}
      title="Matematikte hedefin ne?"
      subtitle="Planını buna göre şekillendireceğiz."
      choices={CHOICES}
      selected={answers.goal}
      onSelect={(goal) => {
        setAnswer('goal', goal);
        router.push(goal === 'exam' ? '/onboarding/exam' : '/onboarding/education');
      }}
    />
  );
}
