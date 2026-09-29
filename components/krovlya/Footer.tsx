"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Check, Loader2, MapPin, Clock, Send } from "lucide-react";
import Logo from "./Logo";
import { formatPhone, sendLead, useLead } from "./LeadModal";
import { NAV, PHONE, PHONE_HREF, REGION, img } from "@/lib/site";

function CallbackInline() {
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const valid = phone.replace(/\D/g, "").length === 11;

  if (state === "done")
    return (
      <div className="mt-8 md:mt-10 w-full max-w-[560px] h-16 rounded-full bg-leaf/90 backdrop-blur-md flex items-center justify-center gap-2 text-white font-semibold">
        <Check className="w-5 h-5" /> Спасибо! Перезвоним в течение 15 минут
      </div>
    );

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!valid) return;
        setState("sending");
        await sendLead({ phone, source: "footer-inline" }).catch(() => {});
        setState("done");
      }}
      className="mt-8 md:mt-10 w-full max-w-[560px] h-16 bg-white/15 backdrop-blur-md rounded-full border border-white/25 flex overflow-hidden p-1.5"
    >
      <input
        type="tel"
        inputMode="tel"
        value={phone}
        onChange={(e) => setPhone(formatPhone(e.target.value))}
        onFocus={() => !phone && setPhone("+7")}
        placeholder="+7 (___) ___-__-__"
        aria-label="Ваш телефон"
        className="flex-1 min-w-0 bg-transparent px-4 md:px-6 text-[16px] text-white placeholder:text-white/60 outline-none"
      />
      <button type="submit" disabled={!valid || state === "sending"} className="h-full px-5 md:px-8 bg-fire text-white rounded-full text-[13px] font-bold tracking-[0.06em] uppercase whitespace-nowrap disabled:opacity-60 flex items-center gap-2">
        {state === "sending" ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Перезвоните <span className="hidden sm:inline">мне</span></>}
      </button>
    </form>
  );
}

export default function Footer({ className }: { className?: string }) {
  const { openLead } = useLead();

  return (
    <section id="contacts" className={"w-full bg-paper pb-24 md:pb-2 " + (className || "")}>
      <div className="m-2 rounded-[22px] overflow-hidden relative min-h-[100svh] md:min-h-[860px] flex flex-col">
        <div className="absolute inset-0 z-0" style={{ backgroundImage: `url('${img("rain.webp")}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink/85" />

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 md:px-20 pt-20 pb-10 text-center">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-amber text-[12px] font-bold uppercase tracking-[0.2em] mb-5">
            Каждый дождь делает протечку больше
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" as const }}
            className="font-display text-[40px] sm:text-[56px] md:text-[84px] font-bold text-white leading-[0.98] tracking-[-0.03em]"
          >
            Не ждите <br className="md:hidden" />
            <span className="italic text-fire">следующего</span> <br />
            дождя.
          </motion.h2>
          <motion.a
            href={PHONE_HREF}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 inline-flex items-center gap-3 font-display text-[26px] sm:text-[34px] md:text-[44px] font-semibold text-white hover:text-amber transition-colors"
          >
            <span className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-fire flex items-center justify-center shrink-0">
              <span className="absolute inset-0 rounded-full bg-flame/60 pulse-ring" />
              <Phone className="w-6 h-6 relative" />
            </span>
            {PHONE}
          </motion.a>
          <p className="text-white/60 mt-3">или оставьте номер — перезвоним за 15 минут</p>
          <CallbackInline />
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} className="relative z-10 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[22px] mx-3 md:mx-5 mb-3 md:mb-5 p-6 md:p-10 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-8 md:gap-10">
            <div className="col-span-2 md:col-span-1">
              <Logo />
              <p className="mt-4 text-white/55 text-[13px] leading-relaxed max-w-[280px]">
                Ремонт плоской кровли наплавляемыми материалами. Устраняем протечки, делаем текущий и капитальный ремонт с гарантией по договору.
              </p>
            </div>
            <div>
              <h4 className="text-white text-[13px] font-semibold mb-4">Разделы</h4>
              <ul className="space-y-2">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} className="text-white/60 text-[13px] hover:text-white transition-colors">{n.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white text-[13px] font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2">
                {["Устранение протечек", "Текущий ремонт", "Капитальный ремонт", "Примыкания", "Кровельные воронки"].map((s) => (
                  <li key={s}>
                    <button
                      onClick={() => openLead({ title: s, subtitle: "Инженер перезвонит и назовёт цену для вашего объекта.", button: "Узнать цену", source: "footer-" + s, extra: "area" })}
                      className="text-white/60 text-[13px] hover:text-white transition-colors text-left"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-white text-[13px] font-semibold mb-4">Контакты</h4>
              <ul className="space-y-3 text-[13px]">
                <li><a href={PHONE_HREF} className="flex items-center gap-2 text-white hover:text-amber font-semibold text-[15px]"><Phone className="w-4 h-4 text-amber" /> {PHONE}</a></li>
                <li className="flex items-center gap-2 text-white/60"><MapPin className="w-4 h-4 text-amber" /> {REGION}</li>
                <li className="flex items-center gap-2 text-white/60"><Clock className="w-4 h-4 text-amber" /> Принимаем заявки ежедневно</li>
                <li>
                  <button
                    onClick={() => openLead({ title: "Написать нам", subtitle: "Оставьте номер — ответим в WhatsApp или Telegram, как вам удобнее.", button: "Написать", source: "footer-messenger", extra: "comment" })}
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-white hover:bg-white/10 transition"
                  >
                    <Send className="w-4 h-4" /> Написать в мессенджер
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-5 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 text-white/40 text-[12px]">
            <span>© {new Date().getFullYear()} Кровля Сервис. Ремонт плоской кровли в Москве и МО.</span>
            <span>Информация на сайте не является публичной офертой</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
