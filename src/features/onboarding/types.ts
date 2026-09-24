export type Country = 'tr' | 'eu';
export type Goal = 'exam' | 'school' | 'self' | 'fun';
export type Exam =
  // Türkiye
  | 'lgs'
  | 'tyt'
  | 'ayt'
  | 'kpss'
  | 'ales'
  | 'dgs'
  // Avrupa
  | 'eu-secondary'
  | 'eu-matura'
  | 'ib'
  | 'sat'
  | 'other';
export type Education = 'primary' | 'middle' | 'high' | 'associate' | 'university' | 'graduate';
export type DailyMinutes = 5 | 10 | 20 | 30;

/** 1 = Temel … 5 = Uzman */
export type Level = 1 | 2 | 3 | 4 | 5;

export type Topic =
  | 'arithmetic'
  | 'fractions'
  | 'percent'
  | 'equations'
  | 'exponents'
  | 'geometry'
  | 'functions'
  | 'probability'
  | 'problems'
  | 'calculus'
  | 'logarithm';

export type Question = {
  id: string;
  level: Level;
  topic: Topic;
  prompt: string;
  options: string[];
  /** Index of the correct option. */
  answer: number;
};

export type QuizAnswer = {
  questionId: string;
  level: Level;
  topic: Topic;
  correct: boolean;
};

export type OnboardingAnswers = {
  /** Undefined when the user skipped the question. */
  name?: string;
  age?: number;
  country?: Country;
  goal?: Goal;
  exam?: Exam;
  education?: Education;
  dailyMinutes?: DailyMinutes;
};

export type PlacementResult = {
  /** Estimated level, 1–5 with one decimal. */
  currentLevel: number;
  targetLevel: Level;
  correctCount: number;
  total: number;
  weakTopics: Topic[];
  strongTopics: Topic[];
  estimatedWeeks: number;
};

export type Profile = {
  answers: OnboardingAnswers;
  result: PlacementResult;
  completedAt: string;
};
