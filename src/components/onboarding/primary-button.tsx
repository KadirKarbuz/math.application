import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'ghost';
};

export function PrimaryButton({ title, onPress, disabled, variant = 'primary' }: Props) {
  const theme = useTheme();
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        isPrimary && { backgroundColor: theme.primary },
        (pressed || disabled) && styles.dimmed,
      ]}>
      <ThemedText
        type="smallBold"
        style={[styles.label, { color: isPrimary ? theme.onPrimary : theme.textSecondary }]}>
        {title}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 54,
    borderRadius: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
  },
  label: {
    fontSize: 17,
  },
  dimmed: {
    opacity: 0.6,
  },
});
