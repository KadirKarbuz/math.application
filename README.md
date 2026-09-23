# Math — Mobil Uygulama

Expo (React Native) + TypeScript + Expo Router.

## Başlangıç

```bash
npm install
cp .env.example .env   # Windows: copy .env.example .env
npm start              # QR kodu Expo Go ile okut
```

## Komutlar

| Komut | Açıklama |
| --- | --- |
| `npm start` | Geliştirme sunucusu |
| `npm run android` / `ios` / `web` | Platforma özel başlatma |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript kontrolü |
| `npm run doctor` | Bağımlılık/konfigürasyon kontrolü |

## Klasör yapısı

```
src/
  app/          Ekranlar (Expo Router, dosya tabanlı yönlendirme)
  components/   Yeniden kullanılabilir UI bileşenleri
  config/       Ortam değişkenleri (env.ts)
  constants/    Tema, renkler, boşluklar
  hooks/        Özel hook'lar
  lib/          API istemcisi, React Query, güvenli depolama
  providers/    Uygulama sağlayıcıları (Auth, Query)
```

## Altyapı

- **API:** `src/lib/api-client.ts` — `api.get/post/put/patch/delete`, zaman aşımı, `ApiError`, otomatik `Authorization` başlığı, 401'de otomatik çıkış.
- **Veri çekme:** TanStack React Query (`useQuery` / `useMutation`).
- **Kimlik doğrulama:** `useAuth()` → `signIn(token)`, `signOut()`, `isAuthenticated`. Token `expo-secure-store` ile şifreli saklanır.
- **Ortam değişkenleri:** `EXPO_PUBLIC_` önekli değişkenler `.env` dosyasından okunur.

Örnek:

```tsx
const { data, isLoading } = useQuery({
  queryKey: ['problems'],
  queryFn: () => api.get<Problem[]>('/problems'),
});
```

## Derleme (EAS)

```bash
npx eas-cli@latest build --profile development --platform android
npx eas-cli@latest build --profile preview --platform android   # test APK'sı
npx eas-cli@latest build --profile production --platform all
```
