import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { OnboardingScreen } from '@/components/onboarding/onboarding-screen';
import { PrimaryButton } from '@/components/onboarding/primary-button';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { numberFact } from '@/features/onboarding/number-facts';
import { useTheme } from '@/hooks/use-theme';
import { useOnboarding } from '@/providers/onboarding-provider';

export default function NameScreen() {
  const theme = useTheme();
  const { answers, setAnswer } = useOnboarding();
  const [name, setName] = useState(answers.name ?? '');

  const trimmed = name.trim();
  const letters = [...trimmed.replace(/\s/g, '')].length;

  const next = (value: string | undefined) => {
    setAnswer('name', value);
    router.push('/onboarding/age');
  };

  return (
    <OnboardingScreen
      progress={1 / 8}
      title="Sana nasıl hitap edelim?"
      subtitle="Adını ya da takma adını yazabilirsin."
      footer={
        <>
          <PrimaryButton title="Devam" disabled={!trimmed} onPress={() => next(trimmed)} />
          <PrimaryButton variant="ghost" title="Söylemek istemiyorum" onPress={() => next(undefined)} />
        </>
      }>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Adın"
        placeholderTextColor={theme.textSecondary}
        autoCapitalize="words"
        autoComplete="given-name"
        autoCorrect={false}
        maxLength={30}
        returnKeyType="next"
        onSubmitEditing={() => trimmed && next(trimmed)}
        style={[
          styles.input,
          { color: theme.text, backgroundColor: theme.backgroundElement, borderColor: theme.primary },
        ]}
      />
      {letters > 0 && (
        <Animated.View key={letters} entering={FadeIn.duration(250)} style={styles.fact}>
          <ThemedText style={styles.greeting}>Merhaba {trimmed}! 👋</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            İsmin {letters} harf. {numberFact(letters)}
          </ThemedText>
        </Animated.View>
      )}
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 22,
    fontWeight: 600,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
    borderWidth: 2,
  },
  fact: {
    gap: Spacing.one,
    paddingHorizontal: Spacing.one,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 600,
  },
});
