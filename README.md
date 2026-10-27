# SpaceCode

Next.js + Tailwind + Framer Motion. Firebase (Firestore) for messages, reviews, news and projects.

```bash
pnpm install
pnpm dev
```

Needs these env vars (already set on Vercel):
`NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`, `NEXT_PUBLIC_FIREBASE_PROJECT_ID`,
`NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`, `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`, `NEXT_PUBLIC_FIREBASE_APP_ID`,
`NEXT_PUBLIC_ADMIN_PANEL_PASSWORD`.

Design tokens (colours, radii, fonts) live in `app/globals.css`; prices in `lib/pricing.ts`.
