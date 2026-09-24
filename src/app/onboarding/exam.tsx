import { router } from 'expo-router';

import { ChoiceScreen } from '@/components/onboarding/choice-screen';
import { educationOptions } from '@/features/onboarding/education';
import { EXAMS_BY_COUNTRY } from '@/features/onboarding/exams';
import { useOnboarding } from '@/providers/onboarding-provider';

export default function ExamScreen() {
  const { answers, setAnswer } = useOnboarding();

  return (
    <ChoiceScreen
      progress={5 / 8}
      title="Hangi sınava hazırlanıyorsun?"
      subtitle="Sınavın konularına göre öncelik vereceğiz."
      choices={EXAMS_BY_COUNTRY[answers.country ?? 'tr']}
      selected={answers.exam}
      onSelect={(exam) => {
        setAnswer('exam', exam);
        const options = educationOptions({ ...answers, exam });
        // Only one sensible answer (e.g. LGS → ortaokul): fill it in and skip the question.
        if (options.length === 1) {
          setAnswer('education', options[0].value);
          router.push('/onboarding/time');
        } else {
          router.push('/onboarding/education');
        }
      }}
    />
  );
}
