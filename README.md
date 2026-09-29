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

## Обновить сайт на GitHub Pages
Сборка публикуется в ветку `gh-pages` (Git Bash):

```bash
MSYS_NO_PATHCONV=1 PAGES_BASE_PATH=/krovlya-servis npx next build && touch out/.nojekyll && cd out && rm -rf .git && git init -q -b gh-pages && git add -A && git commit -qm deploy && git push -f https://github.com/goodrojh/krovlya-servis.git gh-pages
```
