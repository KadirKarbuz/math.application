import { router } from 'expo-router';

import { ChoiceScreen, type Choice } from '@/components/onboarding/choice-screen';
import type { Country } from '@/features/onboarding/types';
import { useOnboarding } from '@/providers/onboarding-provider';

const CHOICES: Choice<Country>[] = [
  { value: 'tr', emoji: '🇹🇷', label: 'Türkiye' },
  { value: 'eu', emoji: '🇪🇺', label: 'Avrupa', description: 'Almanya, Hollanda, Fransa, İngiltere…' },
];

export default function CountryScreen() {
  const { answers, setAnswer } = useOnboarding();

  return (
    <ChoiceScreen
      progress={3 / 8}
      title="Nerede yaşıyorsun?"
      subtitle="Sınavları ve müfredatı buna göre göstereceğiz."
      choices={CHOICES}
      selected={answers.country}
      onSelect={(country) => {
        // Exams differ per country, so a previous exam/education pick may no longer apply.
        if (country !== answers.country) {
          setAnswer('exam', undefined);
          setAnswer('education', undefined);
        }
        setAnswer('country', country);
        router.push('/onboarding/goal');
      }}
    />
  );
}
