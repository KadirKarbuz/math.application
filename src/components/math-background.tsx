import { useEffect } from 'react';
import { StyleSheet, type DimensionValue } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '@/hooks/use-theme';

type Item = {
  text: string;
  top: DimensionValue;
  left: DimensionValue;
  size: number;
  rotate: number;
};

// Fixed positions so the layout is the same on every render and device.
const ITEMS: Item[] = [
  { text: '2 + 3 = 5', top: '4%', left: '6%', size: 18, rotate: -12 },
  { text: 'π', top: '7%', left: '72%', size: 34, rotate: 10 },
  { text: '7 × 8', top: '15%', left: '40%', size: 20, rotate: 6 },
  { text: '√16 = 4', top: '19%', left: '78%', size: 16, rotate: -8 },
  { text: 'x²', top: '24%', left: '10%', size: 30, rotate: 14 },
  { text: '½ + ½ = 1', top: '31%', left: '55%', size: 16, rotate: -4 },
  { text: '∑', top: '36%', left: '4%', size: 38, rotate: -10 },
  { text: '9 − 4', top: '40%', left: '80%', size: 20, rotate: 12 },
  { text: 'a² + b² = c²', top: '47%', left: '28%', size: 16, rotate: -6 },
  { text: '%', top: '52%', left: '86%', size: 30, rotate: 8 },
  { text: '∞', top: '57%', left: '8%', size: 34, rotate: -14 },
  { text: '12 ÷ 3', top: '62%', left: '58%', size: 18, rotate: 10 },
  { text: 'y = 2x + 1', top: '68%', left: '20%', size: 16, rotate: 4 },
  { text: 'Δ', top: '72%', left: '78%', size: 32, rotate: -8 },
  { text: '3³ = 27', top: '78%', left: '4%', size: 18, rotate: 12 },
  { text: '∫', top: '82%', left: '48%', size: 38, rotate: -4 },
  { text: '1 + 1 = 2', top: '88%', left: '70%', size: 16, rotate: -12 },
  { text: 'θ', top: '93%', left: '18%', size: 28, rotate: 8 },
];

/** Decorative, non-interactive layer of faint math doodles that drift gently. */
export function MathBackground() {
  return (
    <Animated.View
      pointerEvents="none"
      aria-hidden
      importantForAccessibility="no-hide-descendants"
      style={StyleSheet.absoluteFill}>
      {ITEMS.map((item, i) => (
        <FloatingSymbol key={item.text} item={item} index={i} />
      ))}
    </Animated.View>
  );
}

function FloatingSymbol({ item, index }: { item: Item; index: number }) {
  const theme = useTheme();
  const offset = useSharedValue(0);

  useEffect(() => {
    offset.set(
      withDelay(
        (index % 5) * 400,
        withRepeat(
          withTiming(1, { duration: 3500 + (index % 4) * 700, easing: Easing.inOut(Easing.sin) }),
          -1,
          true,
        ),
      ),
    );
  }, [index, offset]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -8 * offset.get() }, { rotate: `${item.rotate}deg` }],
  }));

  return (
    <Animated.Text
      style={[
        styles.symbol,
        { top: item.top, left: item.left, fontSize: item.size, color: theme.text },
        animatedStyle,
      ]}>
      {item.text}
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  symbol: {
    position: 'absolute',
    fontWeight: 600,
    opacity: 0.07,
  },
});
