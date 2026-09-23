import type { Question } from './types';

/**
 * Placement question bank. Each level needs enough questions for the
 * adaptive quiz to stay on it for a while (see QUIZ_LENGTH in placement.ts).
 */
export const QUESTIONS: Question[] = [
  // Level 1 — ilkokul
  { id: 'l1-1', level: 1, topic: 'arithmetic', prompt: '7 × 8 = ?', options: ['54', '56', '58', '63'], answer: 1 },
  { id: 'l1-2', level: 1, topic: 'arithmetic', prompt: '125 + 378 = ?', options: ['493', '503', '513', '403'], answer: 1 },
  { id: 'l1-3', level: 1, topic: 'arithmetic', prompt: '72 ÷ 9 = ?', options: ['6', '7', '8', '9'], answer: 2 },
  {
    id: 'l1-4',
    level: 1,
    topic: 'problems',
    prompt: 'Bir kutuda 24 kalem var. 3 kutuda toplam kaç kalem vardır?',
    options: ['48', '64', '72', '81'],
    answer: 2,
  },

  // Level 2 — ortaokul
  { id: 'l2-1', level: 2, topic: 'fractions', prompt: '3/4 + 1/8 = ?', options: ['4/12', '7/8', '5/8', '1'], answer: 1 },
  { id: 'l2-2', level: 2, topic: 'percent', prompt: "80'in %25'i kaçtır?", options: ['15', '20', '25', '32'], answer: 1 },
  { id: 'l2-3', level: 2, topic: 'fractions', prompt: '2,5 × 0,4 = ?', options: ['0,1', '1', '10', '0,01'], answer: 1 },
  {
    id: 'l2-4',
    level: 2,
    topic: 'percent',
    prompt: '200 TL olan bir ürüne %10 indirim yapılıyor. Yeni fiyatı kaç TL olur?',
    options: ['160', '180', '190', '198'],
    answer: 1,
  },

  // Level 3 — LGS / lise başlangıç
  { id: 'l3-1', level: 3, topic: 'equations', prompt: '3x − 7 = 11 ise x kaçtır?', options: ['5', '6', '7', '8'], answer: 1 },
  { id: 'l3-2', level: 3, topic: 'exponents', prompt: '2³ · 2⁴ = ?', options: ['2¹²', '2⁷', '4⁷', '2¹'], answer: 1 },
  {
    id: 'l3-3',
    level: 3,
    topic: 'exponents',
    prompt: '√50 hangi iki ardışık tam sayı arasındadır?',
    options: ['6 ile 7', '7 ile 8', '8 ile 9', '24 ile 26'],
    answer: 1,
  },
  {
    id: 'l3-4',
    level: 3,
    topic: 'geometry',
    prompt: 'Dik kenarları 6 ve 8 olan dik üçgenin hipotenüsü kaçtır?',
    options: ['9', '10', '12', '14'],
    answer: 1,
  },

  // Level 4 — TYT
  { id: 'l4-1', level: 4, topic: 'functions', prompt: 'f(x) = 2x + 3 ise f(f(1)) kaçtır?', options: ['10', '11', '13', '15'], answer: 2 },
  {
    id: 'l4-2',
    level: 4,
    topic: 'probability',
    prompt: 'Bir zar atıldığında asal sayı gelme olasılığı kaçtır?',
    options: ['1/3', '1/2', '2/3', '1/6'],
    answer: 1,
  },
  {
    id: 'l4-3',
    level: 4,
    topic: 'equations',
    prompt: 'x² − 5x + 6 = 0 denkleminin kökler toplamı kaçtır?',
    options: ['−5', '5', '6', '−6'],
    answer: 1,
  },
  {
    id: 'l4-4',
    level: 4,
    topic: 'problems',
    prompt: 'Bir işi Ali 6 günde, Veli 3 günde bitiriyor. İkisi birlikte kaç günde bitirir?',
    options: ['2', '3', '4', '4,5'],
    answer: 0,
  },

  // Level 5 — AYT
  { id: 'l5-1', level: 5, topic: 'calculus', prompt: "f(x) = x³ − 2x ise f'(2) kaçtır?", options: ['4', '8', '10', '12'], answer: 2 },
  { id: 'l5-2', level: 5, topic: 'logarithm', prompt: 'log₂ 32 = ?', options: ['4', '5', '6', '16'], answer: 1 },
  {
    id: 'l5-3',
    level: 5,
    topic: 'calculus',
    prompt: 'lim (x→2) (x² − 4) / (x − 2) = ?',
    options: ['0', '2', '4', 'Tanımsız'],
    answer: 2,
  },
  { id: 'l5-4', level: 5, topic: 'calculus', prompt: '∫₀² 3x² dx = ?', options: ['4', '6', '8', '12'], answer: 2 },
];
