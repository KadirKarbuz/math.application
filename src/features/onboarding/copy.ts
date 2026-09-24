import { EXAM_LABELS, LEVEL_LABELS } from './placement';
import type { Level, OnboardingAnswers, PlacementResult } from './types';

export function levelCaption(value: number) {
  const rounded = Math.min(5, Math.max(1, Math.round(value))) as Level;
  return `${LEVEL_LABELS[rounded]} (${value.toFixed(1)}/5)`;
}

export function targetCaption(answers: OnboardingAnswers, target: Level) {
  if (answers.goal === 'exam' && answers.exam) return `${EXAM_LABELS[answers.exam]} · ${LEVEL_LABELS[target]}`;
  return LEVEL_LABELS[target];
}

export function headline(result: PlacementResult) {
  if (result.currentLevel > result.targetLevel) {
    return 'Seviyen hedefinin üzerinde! Şimdi hız ve istikrar üzerine çalışacağız.';
  }
  if (result.currentLevel === result.targetLevel) {
    return 'Hedef seviyene ulaşmışsın! Şimdi eksiklerini kapatıp bunu kalıcı hale getireceğiz.';
  }
  return `Hedefine ulaşmak için ${result.estimatedWeeks} haftalık bir yol haritan var.`;
}
