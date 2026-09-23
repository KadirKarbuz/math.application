import { router } from 'expo-router';

import { ChoiceScreen, type Choice } from '@/components/onboarding/choice-screen';
import type { Feeling } from '@/features/onboarding/types';
import { useOnboarding } from '@/providers/onboarding-provider';

const CHOICES: Choice<Feeling>[] = [
  { value: 'love', emoji: '😍', label: 'Seviyorum' },
  { value: 'ok', emoji: '🙂', label: 'İdare eder' },
  { value: 'struggle', emoji: '😓', label: 'Zorlanıyorum' },
  { value: 'fear', emoji: '😰', label: 'Açıkçası biraz korkuyorum' },
];

export default function FeelingScreen() {
  const { answers, setAnswer } = useOnboarding();

  return (
    <ChoiceScreen
      progress={5 / 7}
      title="Matematikle aran nasıl?"
      subtitle="Dürüst ol, burada yargılama yok 🙂"
      choices={CHOICES}
      selected={answers.feeling}
      onSelect={(feeling) => {
        setAnswer('feeling', feeling);
        router.push('/onboarding/time');
      }}
    />
  );
}
