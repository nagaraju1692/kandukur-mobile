# Mana Kandukur - Mobile (Expo)

This folder contains a minimal Expo React Native skeleton to start migrating the existing web app to mobile.

Quick start

```bash
cd mobile
npm install
npx expo start
```

Notes

- I created a basic `App.tsx` with React Navigation and two placeholder screens.
- You can reuse non-UI code from `frontend/src/services` and `frontend/src/utils` — extract them into a shared package or copy them into `mobile/src/services`.
- Next steps: install navigation dependencies, port pages from `frontend/src/pages` to `mobile/src/screens`, adapt styles to React Native, and integrate the API.
