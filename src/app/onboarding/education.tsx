import { router } from 'expo-router';

import { ChoiceScreen } from '@/components/onboarding/choice-screen';
import { educationOptions } from '@/features/onboarding/education';
import { useOnboarding } from '@/providers/onboarding-provider';

export default function EducationScreen() {
  const { answers, setAnswer } = useOnboarding();
  const choices = educationOptions(answers);

  return (
    <ChoiceScreen
      progress={3 / 6}
      title="Şu an hangi aşamadasın?"
      subtitle="Seviye testine doğru yerden başlamamızı sağlar."
      choices={choices}
      selected={answers.education}
      onSelect={(education) => {
        setAnswer('education', education);
        router.push('/onboarding/feeling');
      }}
    />
  );
}
