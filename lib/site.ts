export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const img = (name: string) => `${BASE}/img/${name}`;

export const PHONE = "+7 000 000 00 00";
export const PHONE_HREF = "tel:+70000000000";
export const COMPANY = "Кровля Сервис";
export const REGION = "Москва и Московская область";

export const NAV = [
  { label: "Услуги", href: "#services" },
  { label: "Цены", href: "#prices" },
  { label: "Как работаем", href: "#process" },
  { label: "До / после", href: "#result" },
  { label: "Вопросы", href: "#faq" },
];
