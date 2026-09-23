import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { OnboardingScreen } from '@/components/onboarding/onboarding-screen';
import { PrimaryButton } from '@/components/onboarding/primary-button';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { QUIZ_LENGTH } from '@/features/onboarding/placement';
import { useTheme } from '@/hooks/use-theme';

const TIPS = [
  { emoji: '🧭', text: 'Sorular cevaplarına göre kolaylaşır ya da zorlaşır.' },
  { emoji: '🤷', text: 'Bilmediğin soruda "Bilmiyorum" de. Tahmin etmek planını bozar.' },
  { emoji: '📝', text: 'Kağıt kalem kullanabilirsin, süre sınırı yok.' },
];

export default function QuizIntroScreen() {
  const theme = useTheme();

  return (
    <OnboardingScreen
      progress={1}
      title="Şimdi seviyeni ölçelim"
      subtitle={`${QUIZ_LENGTH} kısa soru. Amaç seni sınamak değil, nereden başlayacağımızı bulmak.`}
      footer={<PrimaryButton title="Teste başla" onPress={() => router.push('/onboarding/quiz')} />}>
      <View style={styles.tips}>
        {TIPS.map((tip) => (
          <View key={tip.text} style={[styles.tip, { backgroundColor: theme.backgroundElement }]}>
            <ThemedText style={styles.emoji}>{tip.emoji}</ThemedText>
            <ThemedText style={styles.tipText}>{tip.text}</ThemedText>
          </View>
        ))}
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  tips: {
    gap: Spacing.two,
  },
  tip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Spacing.three,
  },
  emoji: {
    fontSize: 24,
    lineHeight: 30,
  },
  tipText: {
    flex: 1,
  },
});
