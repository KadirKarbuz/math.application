import { EXAM_LABELS, LEVEL_LABELS } from './placement';
import type { Feeling, Level, OnboardingAnswers, PlacementResult } from './types';

export const FEELING_MESSAGES: Record<Feeling, string> = {
  love: 'Matematiği seviyorsun, bu en büyük avantajın. Şimdi bu enerjiyi doğru konulara yönlendireceğiz.',
  ok: 'İdare eden bir ilişki, doğru bir planla kolayca sevgiye dönüşebilir.',
  struggle:
    'Zorlanmanın sebebi çoğu zaman yetenek değil, temeldeki küçük boşluklardır. Seninkileri bulduk.',
  fear: 'Matematik kaygısı çok yaygın ve aşılabilir bir şey. Başarabileceğin küçük adımlarla başlayacağız.',
};

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
