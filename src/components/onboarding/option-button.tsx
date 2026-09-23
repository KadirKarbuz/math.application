import { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

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
  /** Position in the list; used to stagger the entrance animation. */
  index?: number;
  onPress: () => void;
};

export function OptionButton({
  label,
  description,
  emoji,
  selected,
  state,
  disabled,
  index = 0,
  onPress,
}: Props) {
  const theme = useTheme();
  const scale = useSharedValue(1);
  const shakeX = useSharedValue(0);

  useEffect(() => {
    if (state === 'correct') {
      scale.set(withSequence(withTiming(1.05, { duration: 120 }), withSpring(1)));
    } else if (state === 'wrong') {
      shakeX.set(
        withSequence(
          withTiming(-8, { duration: 50 }),
          withTiming(8, { duration: 50 }),
          withTiming(-6, { duration: 50 }),
          withTiming(6, { duration: 50 }),
          withTiming(0, { duration: 50 }),
        ),
      );
    }
  }, [state, scale, shakeX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.get() }, { translateX: shakeX.get() }],
  }));

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

  // Entrance and press/feedback animations both use `transform`, so they live on separate views.
  return (
    <Animated.View entering={FadeInDown.delay(index * 70).duration(350)}>
      <Animated.View style={animatedStyle}>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ selected, disabled }}
          disabled={disabled}
          onPress={onPress}
          onPressIn={() => scale.set(withSpring(0.96))}
          onPressOut={() => scale.set(withSpring(1))}
          style={[styles.option, { borderColor, backgroundColor }]}>
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
      </Animated.View>
    </Animated.View>
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
