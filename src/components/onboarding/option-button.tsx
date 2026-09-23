import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  label: string;
  description?: string;
  emoji?: string;
  selected?: boolean;
  /** Shown after answering a quiz question. */
  state?: 'correct' | 'wrong';
  disabled?: boolean;
  onPress: () => void;
};

export function OptionButton({ label, description, emoji, selected, state, disabled, onPress }: Props) {
  const theme = useTheme();

  const borderColor =
    state === 'correct'
      ? theme.success
      : state === 'wrong'
        ? theme.danger
        : selected
          ? theme.primary
          : theme.backgroundSelected;
  const backgroundColor =
    state === 'correct'
      ? theme.successBackground
      : state === 'wrong'
        ? theme.dangerBackground
        : selected
          ? theme.primaryBackground
          : theme.backgroundElement;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.option,
        { borderColor, backgroundColor },
        pressed && styles.pressed,
      ]}>
      {emoji && <ThemedText style={styles.emoji}>{emoji}</ThemedText>}
      <View style={styles.texts}>
        <ThemedText style={styles.label}>{label}</ThemedText>
        {description && (
          <ThemedText type="small" themeColor="textSecondary">
            {description}
          </ThemedText>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    minHeight: 60,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
    borderWidth: 2,
  },
  pressed: {
    opacity: 0.75,
  },
  emoji: {
    fontSize: 26,
    lineHeight: 32,
  },
  texts: {
    flex: 1,
    gap: Spacing.half,
  },
  label: {
    fontSize: 17,
    fontWeight: 600,
  },
});
