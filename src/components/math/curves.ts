/**
 * Real parametric curves used by <CurvePlotter />.
 * `point` runs on the UI thread every frame, so it must be a worklet.
 */
export type Curve = {
  /** The curve's equation, shown as a title. */
  equation: string;
  /** Parametric point in math units. */
  point: (t: number) => [number, number];
  t0: number;
  t1: number;
  /** Largest |x| or |y| the curve reaches; used to scale it into the plot. */
  extent: number;
  /** The equation with the current values substituted in. Defaults to "t = … → (x, y)". */
  live?: (t: number) => string;
};

export const fmt = (n: number) => (Math.abs(n) < 0.005 ? '0.00' : n.toFixed(2));

export const CIRCLE: Curve = {
  equation: 'x² + y² = 4',
  point: (t) => {
    'worklet';
    return [2 * Math.cos(t), 2 * Math.sin(t)];
  },
  t0: 0,
  t1: Math.PI * 2,
  extent: 2.4,
  live: (t) => {
    const [x, y] = CIRCLE.point(t);
    return `(${fmt(x)})² + (${fmt(y)})² = ${fmt(x * x + y * y)}`;
  },
};

export const SINE: Curve = {
  equation: 'y = 2·sin(x)',
  point: (t) => {
    'worklet';
    return [t, 2 * Math.sin(t)];
  },
  t0: -Math.PI,
  t1: Math.PI,
  extent: 3.3,
  live: (t) => `2·sin(${fmt(t)}) = ${fmt(2 * Math.sin(t))}`,
};

export const PARABOLA: Curve = {
  equation: 'y = x² − 2',
  point: (t) => {
    'worklet';
    return [t, t * t - 2];
  },
  t0: -2,
  t1: 2,
  extent: 2.4,
  live: (t) => `(${fmt(t)})² − 2 = ${fmt(t * t - 2)}`,
};

export const ROSE: Curve = {
  equation: 'r = 2·cos(3θ)',
  point: (t) => {
    'worklet';
    const r = 2 * Math.cos(3 * t);
    return [r * Math.cos(t), r * Math.sin(t)];
  },
  t0: 0,
  t1: Math.PI,
  extent: 2.4,
  live: (t) => `θ = ${fmt(t)} → r = ${fmt(2 * Math.cos(3 * t))}`,
};

export const HEART: Curve = {
  equation: 'x = 16·sin³(t)',
  point: (t) => {
    'worklet';
    const s = Math.sin(t);
    return [
      (16 * s * s * s) / 8,
      (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 8,
    ];
  },
  t0: 0,
  t1: Math.PI * 2,
  extent: 2.4,
};
