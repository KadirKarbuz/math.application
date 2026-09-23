import { router } from 'expo-router';

import { ChoiceScreen, type Choice } from '@/components/onboarding/choice-screen';
import type { Exam } from '@/features/onboarding/types';
import { useOnboarding } from '@/providers/onboarding-provider';

const CHOICES: Choice<Exam>[] = [
  { value: 'lgs', emoji: '🏫', label: 'LGS', description: 'Liselere geçiş sınavı' },
  { value: 'tyt', emoji: '📝', label: 'YKS – TYT', description: 'Temel yeterlilik' },
  { value: 'ayt', emoji: '📐', label: 'YKS – AYT', description: 'Sayısal / eşit ağırlık' },
  { value: 'kpss', emoji: '🏛️', label: 'KPSS' },
  { value: 'ales', emoji: '🎓', label: 'ALES' },
  { value: 'dgs', emoji: '🔁', label: 'DGS' },
  { value: 'other', emoji: '✏️', label: 'Başka bir sınav' },
];

export default function ExamScreen() {
  const { answers, setAnswer } = useOnboarding();

  return (
    <ChoiceScreen
      progress={2 / 6}
      title="Hangi sınava hazırlanıyorsun?"
      subtitle="Sınavın konularına göre öncelik vereceğiz."
      choices={CHOICES}
      selected={answers.exam}
      onSelect={(exam) => {
        setAnswer('exam', exam);
        router.push('/onboarding/education');
      }}
    />
  );
}
