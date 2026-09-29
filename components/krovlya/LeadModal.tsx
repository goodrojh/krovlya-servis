"use client";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Check, ShieldCheck, Clock, Loader2 } from "lucide-react";
import { PHONE, PHONE_HREF, img } from "@/lib/site";

export type LeadPreset = {
  title: string;
  subtitle?: string;
  button?: string;
  source: string;
  image?: string;
  extra?: "area" | "comment" | "address";
  context?: string;
  badge?: string;
};

type Ctx = { openLead: (p: LeadPreset) => void };
const LeadContext = createContext<Ctx>({ openLead: () => {} });
export const useLead = () => useContext(LeadContext);

export function formatPhone(raw: string) {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (!d.startsWith("7")) d = "7" + d;
  d = d.slice(0, 11);
  const p = d.slice(1);
  let out = "+7";
  if (p.length > 0) out += " (" + p.slice(0, 3);
  if (p.length >= 3) out += ")";
  if (p.length > 3) out += " " + p.slice(3, 6);
  if (p.length > 6) out += "-" + p.slice(6, 8);
  if (p.length > 8) out += "-" + p.slice(8, 10);
  return out;
}

export async function sendLead(data: Record<string, string>) {
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
  if (endpoint) {
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, page: typeof window !== "undefined" ? window.location.href : "" }),
    });
  } else {
    await new Promise((r) => setTimeout(r, 700));
  }
}

const extraLabels = {
  area: { label: "Примерная площадь кровли, м²", placeholder: "Например, 250" },
  comment: { label: "Что случилось?", placeholder: "Течёт после дождя над кухней…" },
  address: { label: "Адрес или район объекта", placeholder: "Москва, ул. …" },
};

function LeadForm({ preset, onDone }: { preset: LeadPreset; onDone: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [extra, setExtra] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const valid = phone.replace(/\D/g, "").length === 11;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setState("sending");
    try {
      await sendLead({ name, phone, extra, source: preset.source, context: preset.context || "" });
      setState("done");
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center text-center py-6">
        <div className="relative w-16 h-16 mb-5">
          <span className="absolute inset-0 rounded-full bg-leaf/40 pulse-ring" />
          <div className="relative w-16 h-16 rounded-full bg-leaf flex items-center justify-center">
            <Check className="w-8 h-8 text-white stroke-[3]" />
          </div>
        </div>
        <h3 className="font-display text-2xl font-semibold text-white mb-2">Заявка принята</h3>
        <p className="text-white/70 max-w-[320px] leading-relaxed">
          Инженер перезвонит в течение 15 минут в рабочее время. Если течёт прямо сейчас — звоните, не ждите.
        </p>
        <a href={PHONE_HREF} className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-ink px-6 py-3 font-semibold">
          <Phone className="w-4 h-4" /> {PHONE}
        </a>
        <button onClick={onDone} className="mt-4 text-sm text-white/50 hover:text-white">Закрыть</button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      {preset.context && (
        <div className="rounded-2xl bg-flame/10 border border-flame/30 px-4 py-3 text-[13px] text-amber leading-snug">
          {preset.context}
        </div>
      )}
      <label className="flex flex-col gap-1.5">
        <span className="text-[12px] text-white/50 pl-1">Как к вам обращаться</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Имя"
          autoComplete="name"
          className="h-14 rounded-2xl bg-white/[0.06] border border-white/10 px-5 text-white placeholder:text-white/30 outline-none focus:border-flame/70 focus:bg-white/[0.09] transition"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-[12px] text-white/50 pl-1">Телефон *</span>
        <input
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          onFocus={() => !phone && setPhone("+7")}
          placeholder="+7 (___) ___-__-__"
          inputMode="tel"
          autoComplete="tel"
          required
          className="h-14 rounded-2xl bg-white/[0.06] border border-white/10 px-5 text-white text-lg tracking-wide placeholder:text-white/30 outline-none focus:border-flame/70 focus:bg-white/[0.09] transition"
        />
      </label>
      {preset.extra && (
        <label className="flex flex-col gap-1.5">
          <span className="text-[12px] text-white/50 pl-1">{extraLabels[preset.extra].label}</span>
          <input
            value={extra}
            onChange={(e) => setExtra(e.target.value)}
            placeholder={extraLabels[preset.extra].placeholder}
            inputMode={preset.extra === "area" ? "numeric" : "text"}
            className="h-14 rounded-2xl bg-white/[0.06] border border-white/10 px-5 text-white placeholder:text-white/30 outline-none focus:border-flame/70 focus:bg-white/[0.09] transition"
          />
        </label>
      )}
      <button
        type="submit"
        disabled={!valid || state === "sending"}
        className="mt-2 h-14 rounded-full bg-fire text-white font-semibold text-[16px] shadow-[0_12px_40px_-8px_rgba(255,90,31,0.7)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:hover:scale-100 flex items-center justify-center gap-2"
      >
        {state === "sending" ? <Loader2 className="w-5 h-5 animate-spin" /> : preset.button || "Отправить заявку"}
      </button>
      {state === "error" && <p className="text-sm text-red-400 text-center">Не отправилось. Позвоните нам: {PHONE}</p>}
      <p className="text-[11px] text-white/35 text-center leading-snug mt-1">
        Нажимая кнопку, вы соглашаетесь на обработку персональных данных. Никакого спама — только звонок инженера.
      </p>
    </form>
  );
}

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [preset, setPreset] = useState<LeadPreset | null>(null);
  const [key, setKey] = useState(0);

  const openLead = useCallback((p: LeadPreset) => {
    setPreset(p);
    setKey((k) => k + 1);
  }, []);
  const close = () => setPreset(null);

  useEffect(() => {
    document.body.style.overflow = preset ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPreset(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [preset]);

  return (
    <LeadContext.Provider value={{ openLead }}>
      {children}
      <AnimatePresence>
        {preset && (
          <motion.div
            key="lead-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-6"
            onClick={close}
          >
            <motion.div
              key={"lead-" + key}
              role="dialog"
              aria-modal="true"
              aria-label={preset.title}
              initial={{ y: 60, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full sm:max-w-[880px] max-h-[94vh] overflow-y-auto no-scrollbar rounded-t-[28px] sm:rounded-[32px] bg-graphite border border-white/10 shadow-2xl grid sm:grid-cols-[1fr_1.1fr]"
            >
              {/* Левая колонка с фото */}
              <div className="relative hidden sm:block min-h-[520px] overflow-hidden">
                <img src={img(preset.image || "torch-close.webp")} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7 flex flex-col gap-3">
                  {[
                    { icon: <Clock className="w-4 h-4" />, t: "Перезвоним за 15 минут" },
                    { icon: <ShieldCheck className="w-4 h-4" />, t: "Выезд инженера и смета — бесплатно" },
                  ].map((i) => (
                    <div key={i.t} className="flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 px-4 py-3 text-white text-sm">
                      <span className="text-amber">{i.icon}</span>
                      {i.t}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 pt-8 sm:p-10 flex flex-col">
                <div className="sm:hidden absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/20" />
                <button
                  onClick={close}
                  aria-label="Закрыть"
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition z-10"
                >
                  <X className="w-5 h-5" />
                </button>
                {preset.badge && (
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-flame/40 text-amber text-[11px] font-semibold uppercase tracking-[0.12em] px-3 py-1 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-flame" /> {preset.badge}
                  </span>
                )}
                <h3 className="font-display text-[26px] sm:text-[30px] leading-[1.1] font-semibold text-white pr-10">{preset.title}</h3>
                {preset.subtitle && <p className="text-white/60 mt-3 mb-6 leading-relaxed">{preset.subtitle}</p>}
                {!preset.subtitle && <div className="h-6" />}
                <LeadForm key={key} preset={preset} onDone={close} />
                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between gap-3 text-sm">
                  <span className="text-white/45">Быстрее по телефону:</span>
                  <a href={PHONE_HREF} className="font-semibold text-white hover:text-amber transition whitespace-nowrap">{PHONE}</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LeadContext.Provider>
  );
}
