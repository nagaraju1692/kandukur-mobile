# Mana Kandukur - Mobile (Expo)

This folder contains a minimal Expo React Native skeleton to start migrating the existing web app to mobile.

Quick start

```bash
cd mobile
npm install
npx expo start
```

Backend configuration

1. Copy `backend/.env.example` to `backend/.env` and set your PostgreSQL `DATABASE_URL`.
2. Run `npm install` and `npm run dev` from `backend`.
3. Copy `.env.example` to `.env` in this folder and set `EXPO_PUBLIC_API_URL` to the backend's reachable URL. For a physical device, use the computer's LAN IP instead of `localhost`.

The mobile app loads categories, businesses, announcements, image URLs, and gallery image URLs from the backend. PostgreSQL table data must use the response fields shown in `backend/README.md`.

Notes

- I created a basic `App.tsx` with React Navigation and two placeholder screens.
- You can reuse non-UI code from `frontend/src/services` and `frontend/src/utils` — extract them into a shared package or copy them into `mobile/src/services`.
- Next steps: install navigation dependencies, port pages from `frontend/src/pages` to `mobile/src/screens`, adapt styles to React Native, and integrate the API.
