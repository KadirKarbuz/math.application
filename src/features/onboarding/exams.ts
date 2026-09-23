import type { Choice } from '@/components/onboarding/choice-screen';

import type { Country, Exam } from './types';

const OTHER: Choice<Exam> = { value: 'other', emoji: '✏️', label: 'Başka bir sınav' };

export const EXAMS_BY_COUNTRY: Record<Country, Choice<Exam>[]> = {
  tr: [
    { value: 'lgs', emoji: '🏫', label: 'LGS', description: 'Liselere geçiş sınavı' },
    { value: 'tyt', emoji: '📝', label: 'YKS – TYT', description: 'Temel yeterlilik' },
    { value: 'ayt', emoji: '📐', label: 'YKS – AYT', description: 'Sayısal / eşit ağırlık' },
    { value: 'kpss', emoji: '🏛️', label: 'KPSS', description: 'Kamu personeli seçme sınavı' },
    { value: 'ales', emoji: '🎓', label: 'ALES', description: 'Yüksek lisans ve akademik kariyer' },
    { value: 'dgs', emoji: '🔁', label: 'DGS', description: 'Önlisanstan lisansa geçiş' },
    OTHER,
  ],
  eu: [
    {
      value: 'eu-secondary',
      emoji: '🏫',
      label: 'Ortaokul bitirme sınavı',
      description: 'GCSE, MSA, Brevet…',
    },
    {
      value: 'eu-matura',
      emoji: '📝',
      label: 'Lise bitirme sınavı',
      description: 'Abitur, A-Level, Baccalauréat, Matura…',
    },
    { value: 'ib', emoji: '🌍', label: 'IB Diploma', description: 'Uluslararası Bakalorya' },
    { value: 'sat', emoji: '✈️', label: 'SAT', description: 'Yurt dışı üniversite başvurusu' },
    OTHER,
  ],
};

export const GOAL_EXAM_HINT: Record<Country, string> = {
  tr: 'LGS, YKS, KPSS, ALES…',
  eu: 'Abitur, A-Level, Bac, IB…',
};
