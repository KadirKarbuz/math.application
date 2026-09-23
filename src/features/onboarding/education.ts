import type { Education, OnboardingAnswers } from './types';

export type EducationOption = {
  value: Education;
  label: string;
  description?: string;
  emoji: string;
};

const GENERIC: Record<Education, EducationOption> = {
  primary: { value: 'primary', emoji: '🧒', label: 'İlkokul' },
  middle: { value: 'middle', emoji: '🧑', label: 'Ortaokul' },
  high: { value: 'high', emoji: '🎒', label: 'Lise' },
  associate: { value: 'associate', emoji: '🏫', label: 'Önlisans', description: '2 yıllık' },
  university: { value: 'university', emoji: '🎓', label: 'Üniversite', description: '4 yıllık' },
  graduate: { value: 'graduate', emoji: '💼', label: 'Mezun / çalışıyorum' },
};

const ALL = Object.values(GENERIC);
// Önlisans is a Turkish-specific level.
const ALL_EU = ALL.filter((o) => o.value !== 'associate');

const YKS: EducationOption[] = [
  { value: 'high', emoji: '🎒', label: 'Lise öğrencisiyim' },
  { value: 'graduate', emoji: '🔁', label: 'Lise mezunuyum', description: 'Tekrar hazırlanıyorum' },
  { value: 'university', emoji: '🎓', label: 'Üniversitedeyim', description: 'Bölüm değiştirmek istiyorum' },
];

/**
 * Education options that make sense for the chosen goal / exam
 * (e.g. nobody takes KPSS from primary school).
 */
export function educationOptions(answers: OnboardingAnswers): EducationOption[] {
  if (answers.goal === 'exam') {
    switch (answers.exam) {
      case 'lgs':
        return [{ value: 'middle', emoji: '🧑', label: 'Ortaokul öğrencisiyim', description: '7. veya 8. sınıf' }];
      case 'tyt':
      case 'ayt':
        return YKS;
      case 'kpss':
        return [
          { value: 'high', emoji: '🎒', label: 'Lise mezunuyum', description: 'KPSS Ortaöğretim' },
          { value: 'associate', emoji: '🏫', label: 'Önlisans öğrencisi / mezunuyum', description: 'KPSS Önlisans' },
          { value: 'university', emoji: '🎓', label: 'Lisans öğrencisiyim', description: 'KPSS Lisans' },
          { value: 'graduate', emoji: '💼', label: 'Lisans mezunuyum', description: 'KPSS Lisans' },
        ];
      case 'ales':
        return [
          { value: 'university', emoji: '🎓', label: 'Lisans son sınıf öğrencisiyim' },
          { value: 'graduate', emoji: '💼', label: 'Lisans mezunuyum', description: 'Yüksek lisans / akademik kariyer' },
        ];
      case 'dgs':
        return [{ value: 'associate', emoji: '🏫', label: 'Önlisans öğrencisi / mezunuyum' }];
      case 'eu-secondary':
        return [
          { value: 'middle', emoji: '🧑', label: 'Ortaokul öğrencisiyim', description: 'Realschule, GCSE, Collège…' },
        ];
      case 'eu-matura':
        return [
          { value: 'high', emoji: '🎒', label: 'Lise öğrencisiyim', description: 'Gymnasium, Sixth Form, Lycée…' },
          { value: 'graduate', emoji: '🔁', label: 'Mezunum, tekrar giriyorum' },
        ];
      case 'ib':
        return [{ value: 'high', emoji: '🎒', label: 'Lise öğrencisiyim', description: 'IB Diploma Programme' }];
      case 'sat':
        return [
          { value: 'high', emoji: '🎒', label: 'Lise öğrencisiyim' },
          { value: 'graduate', emoji: '🔁', label: 'Lise mezunuyum' },
        ];
    }
  }
  const all = answers.country === 'eu' ? ALL_EU : ALL;
  // "Okul derslerime destek" only makes sense while still in school.
  if (answers.goal === 'school') return all.filter((o) => o.value !== 'graduate');
  return all;
}
