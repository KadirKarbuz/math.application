This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Proje: Math

Herkes için matematik öğrenme uygulaması. İlk açılışta kullanıcının ülkesi, hedefi/sınavı ve seviyesi ölçülür, ona göre kişisel bir çalışma planı sunulur. Arayüz Türkçe. Geliştiriciler Git ve terminalde yeni; açıklamaları Türkçe ve adım adım yap.

### İş bölümü (çakışmayı önlemek için)

| Alan | Sorumlu | Dosyalar |
| --- | --- | --- |
| İlk açılış (ülke, sorular, seviye testi, sonuç/plan) | Mustafa | `src/app/onboarding/`, `src/features/onboarding/`, `src/components/onboarding/` |
| Eğitim (dersler, pratik, ilerleme) | Kadir | `src/app/(tabs)/` (ana sayfa dahil), `src/features/lessons/`, `src/components/lessons/` |
| Ortak | İkisi (değiştirmeden önce haber verin) | `src/constants/theme.ts`, `src/providers/`, `src/components/math-background.tsx`, `src/app/_layout.tsx` |

- Sorumlusu olmadığın klasördeki dosyaları değiştirme; gerekiyorsa önce kullanıcıya sor.
- İki alan arasındaki sözleşme `Profile` tipidir (`src/features/onboarding/types.ts`): ilk açılış bitince `useOnboarding().profile` doldurulur (`answers` + `result`: `currentLevel`, `targetLevel`, `weakTopics`, `strongTopics`). Eğitim kısmı bunu okur; bu tipe alan eklemek serbest, var olan alanları değiştirmek/silmek için önce haber verin.
- Çalışmaya başlamadan önce `git pull`, bitince `git add . → git commit → git push`.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md
