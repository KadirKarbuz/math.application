import { OnboardingScreen } from '@/components/onboarding/onboarding-screen';
import { OptionButton } from '@/components/onboarding/option-button';

export type Choice<T> = {
  value: T;
  label: string;
  description?: string;
  emoji?: string;
};

type Props<T> = {
  progress: number;
  title: string;
  subtitle?: string;
  choices: Choice<T>[];
  selected?: T;
  onSelect: (value: T) => void;
};

/** A single-question onboarding step: tapping a choice answers and moves on. */
export function ChoiceScreen<T extends string | number>({
  progress,
  title,
  subtitle,
  choices,
  selected,
  onSelect,
}: Props<T>) {
  return (
    <OnboardingScreen progress={progress} title={title} subtitle={subtitle}>
      {choices.map((choice) => (
        <OptionButton
          key={String(choice.value)}
          label={choice.label}
          description={choice.description}
          emoji={choice.emoji}
          selected={selected === choice.value}
          onPress={() => onSelect(choice.value)}
        />
      ))}
    </OnboardingScreen>
  );
}
