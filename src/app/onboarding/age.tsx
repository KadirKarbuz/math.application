import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { NumberLinePicker } from '@/components/onboarding/number-line-picker';
import { OnboardingScreen } from '@/components/onboarding/onboarding-screen';
import { PrimaryButton } from '@/components/onboarding/primary-button';
import { ThemedText } from '@/components/themed-text';
import { Fonts, Spacing } from '@/constants/theme';
import { numberFact } from '@/features/onboarding/number-facts';
import { useTheme } from '@/hooks/use-theme';
import { useOnboarding } from '@/providers/onboarding-provider';

const MIN_AGE = 6;
const MAX_AGE = 80;

export default function AgeScreen() {
  const theme = useTheme();
  const { answers, setAnswer } = useOnboarding();
  const [age, setAge] = useState(answers.age ?? 16);

  return (
    <OnboardingScreen
      progress={2 / 8}
      title={answers.name ? `Kaç yaşındasın, ${answers.name}?` : 'Kaç yaşındasın?'}
      subtitle="Sayı doğrusunu kaydır ya da − / + ile ayarla."
      footer={
        <PrimaryButton
          title="Devam"
          onPress={() => {
            setAnswer('age', age);
            router.push('/onboarding/country');
          }}
        />
      }>
      <View style={styles.picker}>
        <NumberLinePicker min={MIN_AGE} max={MAX_AGE} value={age} onChange={setAge} />
      </View>
      <Animated.View
        key={age}
        entering={FadeIn.duration(200)}
        style={[styles.fact, { backgroundColor: theme.backgroundElement }]}>
        <ThemedText type="small" themeColor="textSecondary">
          Yaşının matematiği
        </ThemedText>
        <ThemedText style={styles.factText}>{numberFact(age)}</ThemedText>
      </Animated.View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  picker: {
    marginTop: Spacing.four,
  },
  fact: {
    gap: Spacing.one,
    padding: Spacing.three,
    borderRadius: Spacing.three,
    marginTop: Spacing.three,
  },
  factText: {
    fontFamily: Fonts.mono,
    fontSize: 16,
  },
});
