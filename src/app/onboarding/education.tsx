import { router } from 'expo-router';

import { ChoiceScreen, type Choice } from '@/components/onboarding/choice-screen';
import type { Education } from '@/features/onboarding/types';
import { useOnboarding } from '@/providers/onboarding-provider';

const CHOICES: Choice<Education>[] = [
  { value: 'primary', emoji: '🧒', label: 'İlkokul' },
  { value: 'middle', emoji: '🧑', label: 'Ortaokul' },
  { value: 'high', emoji: '🎒', label: 'Lise' },
  { value: 'university', emoji: '🎓', label: 'Üniversite' },
  { value: 'graduate', emoji: '💼', label: 'Mezun / çalışıyorum' },
];

export default function EducationScreen() {
  const { answers, setAnswer } = useOnboarding();

  return (
    <ChoiceScreen
      progress={3 / 6}
      title="Şu an hangi aşamadasın?"
      subtitle="Seviye testine doğru yerden başlamamızı sağlar."
      choices={CHOICES}
      selected={answers.education}
      onSelect={(education) => {
        setAnswer('education', education);
        router.push('/onboarding/feeling');
      }}
    />
  );
}
