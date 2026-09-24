import { useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const TICK = 18;

type Props = {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
};

/** Pick a whole number by sliding a number line under a fixed marker. */
export function NumberLinePicker({ min, max, value, onChange }: Props) {
  const theme = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const centered = useRef(false);
  const [width, setWidth] = useState(0);
  const values = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  const scrollTo = (n: number, animated = true) =>
    scrollRef.current?.scrollTo({ x: (clamp(n) - min) * TICK, animated });

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const next = clamp(min + Math.round(e.nativeEvent.contentOffset.x / TICK));
    if (next !== value) onChange(next);
  };

  const step = (delta: number) => {
    const next = clamp(value + delta);
    onChange(next);
    scrollTo(next);
  };

  return (
    <View style={styles.container}>
      <View style={styles.valueRow}>
        <StepButton label="−" onPress={() => step(-1)} disabled={value <= min} />
        <ThemedText style={[styles.value, { color: theme.primary }]}>{value}</ThemedText>
        <StepButton label="+" onPress={() => step(1)} disabled={value >= max} />
      </View>

      <View
        style={styles.lineArea}
        onLayout={(e) => {
          setWidth(e.nativeEvent.layout.width);
          if (!centered.current) {
            // Start centred on the initial value.
            centered.current = true;
            requestAnimationFrame(() => scrollTo(value, false));
          }
        }}>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={TICK}
          decelerationRate="fast"
          scrollEventThrottle={16}
          onScroll={onScroll}
          contentContainerStyle={{ paddingHorizontal: Math.max(0, width / 2 - TICK / 2) }}>
          {values.map((n) => {
            const major = n % 5 === 0;
            return (
              <View key={n} style={styles.tickSlot}>
                <View
                  style={[
                    styles.tick,
                    {
                      height: major ? 28 : 14,
                      backgroundColor: n === value ? theme.primary : theme.textSecondary,
                      opacity: n === value ? 1 : major ? 0.7 : 0.35,
                    },
                  ]}
                />
                {major && (
                  <ThemedText type="small" themeColor="textSecondary" style={styles.tickLabel}>
                    {n}
                  </ThemedText>
                )}
              </View>
            );
          })}
        </ScrollView>
        {/* Fixed marker in the middle. */}
        <View style={[styles.marker, { backgroundColor: theme.primary }]} />
        <View style={[styles.axis, { backgroundColor: theme.textSecondary }]} />
      </View>
    </View>
  );
}

function StepButton({ label, onPress, disabled }: { label: string; onPress: () => void; disabled: boolean }) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label === '+' ? 'Bir artır' : 'Bir azalt'}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.stepButton,
        { backgroundColor: theme.backgroundElement },
        (pressed || disabled) && styles.dimmed,
      ]}>
      <ThemedText style={styles.stepLabel}>{label}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.four,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.five,
  },
  value: {
    fontFamily: Fonts.mono,
    fontSize: 72,
    lineHeight: 84,
    fontWeight: 700,
    minWidth: 110,
    textAlign: 'center',
  },
  stepButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepLabel: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: 600,
  },
  dimmed: {
    opacity: 0.4,
  },
  lineArea: {
    height: 72,
    justifyContent: 'flex-start',
  },
  tickSlot: {
    width: TICK,
    alignItems: 'center',
    paddingTop: 8,
  },
  tick: {
    width: 2,
    borderRadius: 1,
  },
  tickLabel: {
    marginTop: 4,
    fontVariant: ['tabular-nums'],
    width: 40,
    textAlign: 'center',
  },
  marker: {
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    left: '50%',
    marginLeft: -2,
    width: 4,
    height: 40,
    borderRadius: 2,
  },
  axis: {
    pointerEvents: 'none',
    position: 'absolute',
    top: 8,
    left: 0,
    right: 0,
    height: 1,
    opacity: 0.3,
  },
});
