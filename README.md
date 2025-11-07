# Ezylearn

## English Grammar Learning App 

Overview
- This is a mobile app for learning English grammar, built with React Native and Expo.
- Main entry: `App.tsx` and navigation components under the `app/navigation` folder.
- API helper functions are in `services/api.service.ts` (login, registration, AI processing, data fetching).

Key Features
- Grammar lessons and Basic Grammar screens
- Topic detail pages with structured content by topic
- Practice sections (quizzes, speaking exercises)
- User authentication (login/register flows)
- Admin dashboard (if enabled) for content management
- AI processing endpoint helper (see `processAIRequest` in `services/api.service.ts`)

Getting Started
1. Install dependencies
```sh
npm install
```

2. Run the app (Expo)
```sh
npx expo start
```

3. Open a simulator/emulator or scan the QR code with the Expo Go app on a device.

Configuration
- API base URL and other network configuration can be found and adjusted in `services/api.service.ts`.
- Replace mock login implementations with real endpoints if needed (see `checkLogin` in `services/api.service.ts`).

Important Files
- `App.tsx` — application entry
- `app/navigation/AppNavigator.tsx` — app navigation
- `services/api.service.ts` — API helpers (login, register, fetch data, AI requests)
- `app/(practice)` — practice screens (quizzes, speaking, AI practice)
- `assets/json` — packs of topic and vocabulary data used by the app

YouTube Demo
- Demo video:
  https://www.youtube.com/watch?v=VvTTeDaZl7U

# Ezylearn




