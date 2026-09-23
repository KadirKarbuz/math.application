import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

import type {
  OnboardingAnswers,
  PlacementResult,
  Profile,
  QuizAnswer,
} from '@/features/onboarding/types';

const PROFILE_KEY = 'profile_v1';

type OnboardingContextValue = {
  /** False until the saved profile has been read from storage. */
  isReady: boolean;
  /** Set once onboarding is finished; null means onboarding should be shown. */
  profile: Profile | null;
  answers: OnboardingAnswers;
  setAnswer: <K extends keyof OnboardingAnswers>(key: K, value: OnboardingAnswers[K]) => void;
  quizHistory: QuizAnswer[];
  setQuizHistory: (history: QuizAnswer[]) => void;
  completeOnboarding: (result: PlacementResult) => Promise<void>;
  resetOnboarding: () => Promise<void>;
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [answers, setAnswers] = useState<OnboardingAnswers>({});
  const [quizHistory, setQuizHistory] = useState<QuizAnswer[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(PROFILE_KEY)
      .then((raw) => setProfile(raw ? (JSON.parse(raw) as Profile) : null))
      .catch(() => setProfile(null))
      .finally(() => setIsReady(true));
  }, []);

  const setAnswer = useCallback<OnboardingContextValue['setAnswer']>((key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }, []);

  const completeOnboarding = useCallback(
    async (result: PlacementResult) => {
      const next: Profile = { answers, result, completedAt: new Date().toISOString() };
      await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(next));
      setProfile(next);
    },
    [answers],
  );

  const resetOnboarding = useCallback(async () => {
    await AsyncStorage.removeItem(PROFILE_KEY);
    setAnswers({});
    setQuizHistory([]);
    setProfile(null);
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        isReady,
        profile,
        answers,
        setAnswer,
        quizHistory,
        setQuizHistory,
        completeOnboarding,
        resetOnboarding,
      }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) throw new Error('useOnboarding must be used within OnboardingProvider');
  return context;
}
