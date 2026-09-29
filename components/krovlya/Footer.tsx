"use client";
import React, { useState } from "react";
import { Phone, Check, Loader2, MapPin, Clock, Send } from "lucide-react";
import Logo from "./Logo";
import { formatPhone, sendLead, useLead } from "./LeadModal";
import { NAV, PHONE, PHONE_HREF, REGION, img } from "@/lib/site";

function CallbackInline() {
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [touched, setTouched] = useState(false);
  const valid = phone.replace(/\D/g, "").length === 11;

  if (state === "done")
    return (
      <div role="status" className="mt-8 w-full max-w-[520px] min-h-[60px] rounded-full bg-leaf flex items-center justify-center gap-2 px-6 text-white font-semibold text-[15px]">
        <Check className="w-5 h-5 shrink-0" /> Заявка принята. Перезвоним в течение 15 минут
      </div>
    );

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!valid) {
          setTouched(true);
          e.currentTarget.querySelector("input")?.focus();
          return;
        }
        setState("sending");
        await sendLead({ phone, source: "footer-inline" }).catch(() => {});
        setState("done");
      }}
      className="mt-8 w-full max-w-[520px] flex flex-col items-center gap-2"
    >
      <div className={"w-full bg-white rounded-[28px] sm:rounded-full flex flex-col sm:flex-row gap-1.5 p-1.5 sm:h-[60px] " + (touched && !valid ? "ring-2 ring-red-400" : "")}>
      <input
        aria-invalid={touched && !valid}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        value={phone}
        onChange={(e) => setPhone(formatPhone(e.target.value))}
        onFocus={() => !phone && setPhone("+7")}
        placeholder="+7 (___) ___-__-__"
        aria-label="Номер телефона"
        className="flex-1 min-w-0 h-12 sm:h-auto bg-transparent px-4 md:px-5 text-[16px] text-ink text-center sm:text-left placeholder:text-stone/70 outline-none"
      />
      <button type="submit" disabled={state === "sending"} className="h-12 sm:h-full px-5 md:px-7 bg-fire text-white rounded-full text-[15px] font-semibold whitespace-nowrap flex items-center justify-center gap-2">
        {state === "sending" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Перезвоните мне"}
      </button>
      </div>
      {touched && !valid && <span className="text-[13px] text-red-300">Введите номер полностью: 10 цифр после +7</span>}
    </form>
  );
}

export default function Footer({ className }: { className?: string }) {
  const { openLead } = useLead();

  return (
    <footer id="contacts" className={"w-full bg-paper p-2 pb-24 md:pb-2 " + (className || "")}>
      <div className="rounded-3xl overflow-hidden relative bg-ink flex flex-col">
        <img src={img("rain.webp")} alt="" aria-hidden loading="lazy" decoding="async" width={1600} height={893} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink/90" />

        <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 md:px-8 pt-20 md:pt-28 pb-14 md:pb-20">
          <h2 className="font-display text-[30px] sm:text-[42px] md:text-[60px] font-semibold text-white leading-[1.08] tracking-[-0.03em] max-w-[900px] text-balance">
            Вызовите инженера <span className="text-amber">до&nbsp;следующего дождя</span>
          </h2>
          <p className="text-white/75 text-[16px] md:text-lg mt-5 max-w-[520px]">Осмотр кровли и составление сметы — бесплатно. Работаем в&nbsp;Москве и&nbsp;Московской области.</p>
          <a href={PHONE_HREF} className="mt-8 inline-flex items-center gap-3 font-display text-[24px] sm:text-[32px] md:text-[40px] font-semibold text-white hover:text-amber transition-colors whitespace-nowrap">
            <span className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-fire flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 md:w-6 md:h-6" />
            </span>
            {PHONE}
          </a>
          <CallbackInline />
        </div>

        <div className="relative z-10 bg-ink/85 md:bg-white/10 md:backdrop-blur-xl border border-white/15 rounded-2xl mx-2 md:mx-5 mb-2 md:mb-5 p-6 md:p-10">
          <div className="grid grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-8 lg:gap-10">
            <div className="col-span-2 lg:col-span-1">
              <Logo />
              <p className="mt-4 text-white/65 text-[14px] leading-relaxed max-w-[300px]">
                Ремонт плоской кровли наплавляемыми материалами: устранение протечек, текущий и&nbsp;капитальный ремонт.
              </p>
            </div>
            <nav aria-label="Разделы">
              <h3 className="text-white text-[14px] font-semibold mb-4">Разделы</h3>
              <ul>
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} className="inline-flex items-center min-h-[40px] text-white/65 text-[14px] hover:text-white transition-colors">{n.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <h3 className="text-white text-[14px] font-semibold mb-4">Услуги</h3>
              <ul>
                {["Устранение протечек", "Ремонт в один слой", "Капитальный ремонт", "Примыкания", "Водосточные воронки"].map((s) => (
                  <li key={s}>
                    <button
                      onClick={() => openLead({ title: s, subtitle: "Инженер свяжется с вами и уточнит стоимость для вашего объекта.", button: "Узнать стоимость", source: "footer-" + s, extra: "area" })}
                      className="min-h-[40px] text-white/65 text-[14px] hover:text-white transition-colors text-left"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <h3 className="text-white text-[14px] font-semibold mb-4">Контакты</h3>
              <ul className="space-y-3 text-[14px]">
                <li><a href={PHONE_HREF} className="flex items-center gap-2 min-h-[44px] text-white hover:text-amber font-semibold text-[16px]"><Phone className="w-4 h-4 text-amber" /> {PHONE}</a></li>
                <li className="flex items-center gap-2 text-white/65"><MapPin className="w-4 h-4 text-amber shrink-0" /> {REGION}</li>
                <li className="flex items-center gap-2 text-white/65"><Clock className="w-4 h-4 text-amber shrink-0" /> Приём заявок ежедневно</li>
                <li>
                  <button
                    onClick={() => openLead({ title: "Связь в мессенджере", subtitle: "Оставьте номер — напишем в WhatsApp или Telegram.", button: "Отправить", source: "footer-messenger", extra: "comment" })}
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 min-h-[44px] text-white hover:bg-white/10 transition-colors"
                  >
                    <Send className="w-4 h-4" /> Написать в мессенджер
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-5 border-t border-white/10 flex flex-col md:flex-row justify-between gap-2 text-white/55 text-[13px]">
            <span>© {new Date().getFullYear()} Кровля Сервис</span>
            <span>Информация на сайте не является публичной офертой</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
