import { router } from 'expo-router';

import { ChoiceScreen, type Choice } from '@/components/onboarding/choice-screen';
import type { DailyMinutes } from '@/features/onboarding/types';
import { useOnboarding } from '@/providers/onboarding-provider';

const CHOICES: Choice<DailyMinutes>[] = [
  { value: 5, emoji: '☕', label: 'Günde 5 dakika', description: 'Hafif' },
  { value: 10, emoji: '🚶', label: 'Günde 10 dakika', description: 'Düzenli' },
  { value: 20, emoji: '🏃', label: 'Günde 20 dakika', description: 'Ciddi' },
  { value: 30, emoji: '🔥', label: 'Günde 30+ dakika', description: 'Yoğun' },
];

export default function TimeScreen() {
  const { answers, setAnswer } = useOnboarding();

  return (
    <ChoiceScreen
      progress={6 / 7}
      title="Günde ne kadar zaman ayırabilirsin?"
      subtitle="Az ama her gün, çok ama ara sıradan daha etkilidir."
      choices={CHOICES}
      selected={answers.dailyMinutes}
      onSelect={(minutes) => {
        setAnswer('dailyMinutes', minutes);
        router.push('/onboarding/quiz-intro');
      }}
    />
  );
}
