import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MathBackground } from '@/components/math-background';
import { ProgressBar } from '@/components/onboarding/progress-bar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';

type Props = {
  /** 0–1; when set, a progress bar and back button are shown. */
  progress?: number;
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  footer?: ReactNode;
  showBack?: boolean;
};

export function OnboardingScreen({ progress, title, subtitle, children, footer, showBack = true }: Props) {
  const hasHeader = progress !== undefined;

  return (
    <ThemedView style={styles.root}>
      <MathBackground />
      <SafeAreaView style={styles.safeArea}>
        {hasHeader && (
          <View style={styles.header}>
            {showBack && router.canGoBack() ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Geri"
                hitSlop={12}
                onPress={() => router.back()}>
                <ThemedText style={styles.back}>‹</ThemedText>
              </Pressable>
            ) : (
              <View style={styles.backPlaceholder} />
            )}
            <ProgressBar progress={progress} />
          </View>
        )}

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {title && (
            <ThemedText type="subtitle" style={styles.title}>
              {title}
            </ThemedText>
          )}
          {subtitle && (
            <ThemedText themeColor="textSecondary" style={styles.subtitle}>
              {subtitle}
            </ThemedText>
          )}
          {children}
        </ScrollView>

        {footer && <View style={styles.footer}>{footer}</View>}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
    height: 48,
  },
  back: {
    fontSize: 36,
    lineHeight: 40,
    width: 20,
  },
  backPlaceholder: {
    width: 20,
  },
  content: {
    flexGrow: 1,
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.four,
  },
  title: {
    fontSize: 28,
    lineHeight: 36,
  },
  subtitle: {
    marginBottom: Spacing.two,
  },
  footer: {
    gap: Spacing.two,
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.three,
  },
});
