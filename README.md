# Кровля Сервис — лендинг

Next.js (App Router) + Tailwind v4 + framer-motion + lucide-react. Статический экспорт, деплой на GitHub Pages через Actions.

```bash
npm install
npm run dev
```

## Что поменять перед запуском
- Телефон, регион, меню — `lib/site.ts`
- Цены — `components/krovlya/Pricing.tsx`, `Services.tsx`, `LeakDoctor.tsx`
- Сроки гарантии — `Hero.tsx`, `Pricing.tsx`, `FAQ.tsx`
- Приём заявок: задайте `NEXT_PUBLIC_FORM_ENDPOINT` (URL, принимающий POST JSON — например, вебхук Telegram-бота, CRM или Make/Zapier). Без него формы показывают «Заявка принята», но никуда не отправляют.
