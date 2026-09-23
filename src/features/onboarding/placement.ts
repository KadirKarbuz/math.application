import { QUESTIONS } from './questions';
import type {
  Education,
  Exam,
  Level,
  OnboardingAnswers,
  PlacementResult,
  Question,
  QuizAnswer,
  Topic,
} from './types';

export const QUIZ_LENGTH = 8;

export const LEVEL_LABELS: Record<Level, string> = {
  1: 'Temel',
  2: 'Başlangıç',
  3: 'Orta',
  4: 'İleri',
  5: 'Uzman',
};

export const TOPIC_LABELS: Record<Topic, string> = {
  arithmetic: 'Dört işlem',
  fractions: 'Kesirler ve ondalıklar',
  percent: 'Yüzdeler',
  equations: 'Denklemler',
  exponents: 'Üslü ve köklü sayılar',
  geometry: 'Geometri',
  functions: 'Fonksiyonlar',
  probability: 'Olasılık',
  problems: 'Problemler',
  calculus: 'Limit, türev, integral',
  logarithm: 'Logaritma',
};

export const EXAM_LABELS: Record<Exam, string> = {
  lgs: 'LGS',
  tyt: 'YKS – TYT',
  ayt: 'YKS – AYT',
  kpss: 'KPSS',
  ales: 'ALES',
  dgs: 'DGS',
  other: 'Sınav',
};

const EXAM_TARGET: Record<Exam, Level> = {
  lgs: 3,
  tyt: 4,
  ayt: 5,
  kpss: 4,
  ales: 4,
  dgs: 4,
  other: 4,
};

const EDUCATION_START: Record<Education, Level> = {
  primary: 1,
  middle: 2,
  high: 3,
  associate: 3,
  university: 3,
  graduate: 2,
};

const SCHOOL_TARGET: Record<Education, Level> = {
  primary: 2,
  middle: 3,
  high: 4,
  associate: 4,
  university: 5,
  graduate: 4,
};

const clampLevel = (value: number) => Math.min(5, Math.max(1, Math.round(value))) as Level;

export function startingLevel(answers: OnboardingAnswers): Level {
  const base = answers.education ? EDUCATION_START[answers.education] : 2;
  if (answers.goal === 'exam' && answers.exam) {
    // Start one step below the exam's target so the quiz can climb or fall.
    return clampLevel(Math.max(base, EXAM_TARGET[answers.exam] - 1));
  }
  return base;
}

export function nextLevel(level: Level, correct: boolean): Level {
  return clampLevel(level + (correct ? 1 : -1));
}

/** Picks an unused question at `level`, falling back to the nearest level that still has one. */
export function pickQuestion(level: Level, usedIds: string[]): Question | undefined {
  const unused = QUESTIONS.filter((q) => !usedIds.includes(q.id));
  const byDistance = [...unused].sort(
    (a, b) => Math.abs(a.level - level) - Math.abs(b.level - level) || Math.random() - 0.5,
  );
  return byDistance[0];
}

/** Level estimate from the last answers: each answer counts as its level ± 0.5. */
export function estimateLevel(history: QuizAnswer[]): number {
  const recent = history.slice(-4);
  if (recent.length === 0) return 1;
  const sum = recent.reduce((acc, a) => acc + a.level + (a.correct ? 0.5 : -0.5), 0);
  const value = Math.min(5, Math.max(1, sum / recent.length));
  return Math.round(value * 10) / 10;
}

export function targetLevel(answers: OnboardingAnswers, current: number): Level {
  if (answers.goal === 'exam' && answers.exam) return EXAM_TARGET[answers.exam];
  if (answers.goal === 'school' && answers.education) return SCHOOL_TARGET[answers.education];
  return clampLevel(Math.ceil(current) + 1);
}

/** Rough, motivating estimate — more daily minutes shortens the path (with diminishing returns). */
export function estimateWeeks(current: number, target: number, dailyMinutes: number): number {
  const gap = Math.max(0.5, target - current);
  return Math.max(2, Math.ceil(gap * 5 * Math.sqrt(20 / dailyMinutes)));
}

export function buildResult(answers: OnboardingAnswers, history: QuizAnswer[]): PlacementResult {
  const currentLevel = estimateLevel(history);
  const target = targetLevel(answers, currentLevel);

  const score = new Map<Topic, number>();
  for (const a of history) score.set(a.topic, (score.get(a.topic) ?? 0) + (a.correct ? 1 : -1));
  const topics = [...score.entries()];

  return {
    currentLevel,
    targetLevel: target,
    correctCount: history.filter((a) => a.correct).length,
    total: history.length,
    weakTopics: topics.filter(([, s]) => s < 0).map(([t]) => t).slice(0, 3),
    strongTopics: topics.filter(([, s]) => s > 0).map(([t]) => t).slice(0, 3),
    estimatedWeeks: estimateWeeks(currentLevel, target, answers.dailyMinutes ?? 10),
  };
}
