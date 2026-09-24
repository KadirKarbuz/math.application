import { Fragment, memo, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  useAnimatedProps,
  useAnimatedReaction,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Line, Path } from 'react-native-svg';
import { scheduleOnRN } from 'react-native-worklets';

import { fmt, type Curve } from '@/components/math/curves';
import { ThemedText } from '@/components/themed-text';
import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/** Path points per curve; enough for smooth curves while staying cheap to rebuild each frame. */
const SAMPLES = 180;
/** How many times per curve the live equation text refreshes. */
const LIVE_STEPS = 45;
const PADDING = 12;

type Props = {
  curves: Curve[];
  size: number;
  /** Time to draw one curve. */
  drawMs?: number;
  /** Pause on a finished curve before the next one starts. */
  holdMs?: number;
  loop?: boolean;
  /** Called when a new curve starts drawing. */
  onCurveStart?: (index: number) => void;
  /** Called after the last curve when `loop` is false. */
  onDone?: () => void;
};

/**
 * Draws real parametric curves on graph paper, one after another,
 * while showing the equation with live values substituted in.
 */
export function CurvePlotter({
  curves,
  size,
  drawMs = 1600,
  holdMs = 500,
  loop = true,
  onCurveStart,
  onDone,
}: Props) {
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  const [liveStep, setLiveStep] = useState(0);
  const progress = useSharedValue(0);
  const holdTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const curve = curves[index];
  const scale = (size / 2 - PADDING) / curve.extent;
  const center = size / 2;

  // Keep the latest callbacks without restarting the animation when they change.
  const callbacks = useRef({ onCurveStart, onDone });
  useEffect(() => {
    callbacks.current = { onCurveStart, onDone };
  });

  useEffect(() => {
    const finishCurve = () => {
      holdTimer.current = setTimeout(() => {
        if (index < curves.length - 1) setIndex(index + 1);
        else if (loop) setIndex(0);
        else callbacks.current.onDone?.();
      }, holdMs);
    };

    callbacks.current.onCurveStart?.(index);
    progress.set(0);
    progress.set(
      withTiming(1, { duration: drawMs, easing: Easing.inOut(Easing.cubic) }, (finished) => {
        'worklet';
        if (finished) scheduleOnRN(finishCurve);
      }),
    );
    return () => clearTimeout(holdTimer.current);
  }, [index, curves.length, drawMs, holdMs, loop, progress]);

  useAnimatedReaction(
    () => Math.round(progress.get() * LIVE_STEPS),
    (step, previous) => {
      if (step !== previous) scheduleOnRN(setLiveStep, step);
    },
  );

  const { point, t0, t1 } = curve;

  const pathProps = useAnimatedProps(() => {
    const p = progress.get();
    const n = Math.max(2, Math.ceil(SAMPLES * p));
    let d = '';
    for (let i = 0; i <= n; i++) {
      const [x, y] = point(t0 + (t1 - t0) * p * (i / n));
      d += `${i === 0 ? 'M' : 'L'}${(center + x * scale).toFixed(1)} ${(center - y * scale).toFixed(1)}`;
    }
    return { d };
  });

  const penProps = useAnimatedProps(() => {
    const [x, y] = point(t0 + (t1 - t0) * progress.get());
    return { cx: center + x * scale, cy: center - y * scale };
  });

  const liveT = t0 + ((t1 - t0) * liveStep) / LIVE_STEPS;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <GraphPaper size={size} scale={scale} color={theme.text} />
        <AnimatedPath
          animatedProps={pathProps}
          stroke={theme.primary}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <AnimatedCircle animatedProps={penProps} r={9} fill={theme.primary} opacity={0.25} />
        <AnimatedCircle animatedProps={penProps} r={4.5} fill={theme.primary} />
      </Svg>
      <Animated.View key={index} entering={FadeIn.duration(250)} style={styles.labels}>
        <ThemedText type="smallBold" style={styles.equation} numberOfLines={1}>
          {curve.equation}
        </ThemedText>
      </Animated.View>
      <ThemedText type="small" themeColor="textSecondary" style={styles.live} numberOfLines={1}>
        {liveText(curve, liveT)}
      </ThemedText>
    </View>
  );
}

function liveText(curve: Curve, t: number) {
  if (curve.live) return curve.live(t);
  const [x, y] = curve.point(t);
  return `t = ${fmt(t)} → (${fmt(x)}, ${fmt(y)})`;
}

/** Static grid + axes; memoised so it never re-renders while the curve animates. */
const GraphPaper = memo(function GraphPaper({
  size,
  scale,
  color,
}: {
  size: number;
  scale: number;
  color: string;
}) {
  const center = size / 2;
  // Grid positions at every whole unit on both sides of the axes.
  const lines: number[] = [];
  for (let offset = scale; offset < center; offset += scale) lines.push(center - offset, center + offset);

  return (
    <>
      {lines.map((p) => (
        <Fragment key={p}>
          <Line x1={p} y1={0} x2={p} y2={size} stroke={color} strokeOpacity={0.07} />
          <Line x1={0} y1={p} x2={size} y2={p} stroke={color} strokeOpacity={0.07} />
        </Fragment>
      ))}
      <Line x1={0} y1={center} x2={size} y2={center} stroke={color} strokeOpacity={0.25} strokeWidth={1.5} />
      <Line x1={center} y1={0} x2={center} y2={size} stroke={color} strokeOpacity={0.25} strokeWidth={1.5} />
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Spacing.one,
  },
  labels: {
    marginTop: Spacing.two,
  },
  equation: {
    fontFamily: Fonts.mono,
    fontSize: 16,
    textAlign: 'center',
  },
  live: {
    fontFamily: Fonts.mono,
    fontVariant: ['tabular-nums'],
    textAlign: 'center',
  },
});
