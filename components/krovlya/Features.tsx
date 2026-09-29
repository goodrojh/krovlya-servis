"use client";
import React from "react";
import { m } from "framer-motion";
import type { Variants } from "framer-motion";
import { Flame, Layers, ArrowUpRight, Check } from "lucide-react";
import { img } from "@/lib/site";
import { useLead } from "./LeadModal";
import { SectionHeader, container, sectionPad } from "./ui";

const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const cardVariants: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } } };

// Разрез сверху вниз. Анимация собирает слои снизу вверх — в порядке монтажа.
const layers = [
  { label: "Верхний слой с посыпкой", note: "4–5 мм", h: 18, cls: "bg-[#2b2d31] [background-image:radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1.2px)] [background-size:6px_6px]" },
  { label: "Подкладочный слой", note: "3–4 мм", h: 14, cls: "bg-[#3d4046]" },
  { label: "Битумный праймер", note: "грунтовка", h: 5, cls: "bg-amber" },
  { label: "Цементно-песчаная стяжка", note: "сухое основание", h: 26, cls: "bg-[#cfc6b8] [background-image:repeating-linear-gradient(135deg,rgba(0,0,0,0.08)_0_2px,transparent_2px_8px)]" },
  { label: "Плита перекрытия", note: "ж/б", h: 30, cls: "bg-[#a8a196] [background-image:repeating-linear-gradient(45deg,rgba(0,0,0,0.1)_0_2px,transparent_2px_10px)]" },
];

const STACK_H = 250;
const ROW_H = STACK_H / 5;
const totalH = layers.reduce((a, l) => a + l.h, 0);
const layerH = layers.map((l) => (l.h / totalH) * STACK_H);
const layerMid = layerH.map((h, i) => layerH.slice(0, i).reduce((a, b) => a + b, 0) + h / 2);

const steps = [
  { t: "Заявка", d: "в день обращения" },
  { t: "Осмотр и замеры", d: "1 день" },
  { t: "Смета и договор", d: "1–2 дня" },
  { t: "Выполнение работ", d: "по графику" },
  { t: "Акт и гарантия", d: "при сдаче" },
];

const life = [
  { label: "Локальная заплата мастикой", from: 1, to: 2, tone: "bg-stone/45", text: "1–2 года" },
  { label: "Ремонт в один слой", from: 7, to: 10, tone: "bg-ember", text: "7–10 лет" },
  { label: "Капитальный ремонт в два слоя", from: 15, to: 25, tone: "bg-flame", text: "15–25 лет" },
];
const MAX = 25;

export default function Features({ className }: { className?: string }) {
  const { openLead } = useLead();
  return (
    <section id="why" className={"w-full bg-paper relative overflow-hidden " + sectionPad + " " + (className || "")}>
      <div className={container + " relative z-10"}>
        <SectionHeader
          title="Ремонт по технологии,"
          accent="а не временная заплата"
          lead="Повторные протечки чаще всего возникают после локальных заплат без устранения причины. Мы определяем источник протечки и выполняем ремонт в соответствии с СП 17.13330 «Кровли»."
        />

        <m.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* 1 — Наплавление */}
          <m.article variants={cardVariants} className="bg-ink rounded-3xl p-5 md:p-7 flex flex-col gap-10 group relative overflow-hidden min-h-[440px] md:min-h-[480px]">
            <div className="absolute inset-0 z-0">
              <img src={img("torch-close.webp")} alt="Наплавление битумно-полимерного материала газовой горелкой" loading="lazy" decoding="async" width={1000} height={747} className="w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/25 to-black/80" />
            </div>
            <div className="relative z-10">
              <h3 className="font-display text-[24px] md:text-[32px] font-semibold text-white leading-[1.12] tracking-tight">Наплавление с&nbsp;проплавом швов</h3>
              <p className="text-[15px] md:text-base text-white/85 leading-relaxed max-w-[440px] mt-3">
                Материал сплавляется с&nbsp;основанием и&nbsp;соседними полотнами в&nbsp;сплошной водонепроницаемый слой.
              </p>
            </div>
            <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
              {[
                { icon: <Layers className="h-5 w-5 text-white" />, t: "Два слоя", d: "Подкладочный и верхний с защитной посыпкой" },
                { icon: <Flame className="h-5 w-5 text-white" />, t: "Нахлёст 100 / 150 мм", d: "Продольные и торцевые швы по нормативу" },
              ].map((c) => (
                <div key={c.t} className="flex sm:flex-col gap-4 p-4 md:p-5 rounded-2xl bg-black/45 md:bg-white/10 md:backdrop-blur-xl border border-white/15">
                  <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center border border-white/25 shrink-0">{c.icon}</div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[15px] font-semibold text-white">{c.t}</span>
                    <p className="text-[13px] text-white/75 leading-snug">{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </m.article>

          {/* 2 — Разрез кровельного пирога */}
          <m.article variants={cardVariants} className="bg-white rounded-3xl border border-sand p-5 md:p-7 flex flex-col relative overflow-hidden min-h-[440px] md:min-h-[480px]">
            <div className="relative flex-1 flex items-center justify-center py-4">
              <div className="w-full max-w-[470px] flex items-stretch" role="img" aria-label="Состав кровельного ковра: верхний слой, подкладочный слой, праймер, стяжка, плита перекрытия">
                <div className="w-[38%] shrink-0 flex flex-col rounded-lg overflow-hidden shadow-[0_18px_40px_-18px_rgba(12,13,15,0.5)]" style={{ height: STACK_H }}>
                  {layers.map((l, i) => (
                    <m.div
                      key={l.label}
                      initial={{ opacity: 0, y: -16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + (layers.length - 1 - i) * 0.18, duration: 0.45, ease: "easeOut" as const }}
                      style={{ height: layerH[i] }}
                      className={"w-full shrink-0 " + l.cls}
                    />
                  ))}
                </div>
                <svg width="28" height={STACK_H} className="shrink-0 text-ink/35" aria-hidden>
                  {layers.map((l, i) => {
                    const y1 = layerMid[i];
                    const y2 = ROW_H * i + ROW_H / 2;
                    return <path key={l.label} d={`M0 ${y1} H10 L20 ${y2} H28`} fill="none" stroke="currentColor" strokeWidth="1" />;
                  })}
                </svg>
                <div className="flex-1 min-w-0 flex flex-col" style={{ height: STACK_H }}>
                  {layers.map((l, i) => (
                    <m.div
                      key={l.label}
                      initial={{ opacity: 0, x: 8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + (layers.length - 1 - i) * 0.18 }}
                      style={{ height: ROW_H }}
                      className="flex flex-col justify-center pl-2 leading-tight"
                    >
                      <span className="text-[13px] font-semibold text-ink">{l.label}</span>
                      <span className="text-[12px] text-stone mt-0.5">{l.note}</span>
                    </m.div>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative pt-6 border-t border-sand">
              <h3 className="font-display text-[20px] md:text-[22px] font-semibold text-ink">Состав кровельного ковра</h3>
              <p className="text-[15px] text-stone leading-relaxed mt-2">
                Перед наплавлением проверяем влажность основания и&nbsp;обрабатываем его праймером. На&nbsp;влажное основание материал не&nbsp;укладывается.
              </p>
            </div>
          </m.article>

          {/* 3 — Порядок работ */}
          <m.article variants={cardVariants} className="bg-white rounded-3xl border border-sand overflow-hidden flex flex-col">
            <div className="bg-paper/70 relative flex items-center justify-center border-b border-sand px-5 py-8 md:px-10 md:py-10 min-h-[300px]">
              <ol className="w-full max-w-[380px] relative">
                <span className="absolute left-[15px] top-4 bottom-4 w-px bg-sand" aria-hidden />
                <m.span
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: "easeInOut" as const, delay: 0.2 }}
                  className="absolute left-[15px] top-4 bottom-4 w-px bg-flame origin-top"
                  aria-hidden
                />
                {steps.map((s, i) => {
                  const last = i === steps.length - 1;
                  return (
                    <m.li
                      key={s.t}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.25 }}
                      className="relative flex items-center gap-4 py-2"
                    >
                      <span className={"relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0 " + (last ? "bg-leaf text-white" : "bg-white border-2 border-flame text-flame")}>
                        {last ? <Check className="w-4 h-4 stroke-[3]" /> : i + 1}
                      </span>
                      <span className="flex-1 flex items-baseline justify-between gap-3 border-b border-sand/80 pb-2">
                        <span className="text-[14px] md:text-[15px] font-semibold text-ink">{s.t}</span>
                        <span className="text-[12px] md:text-[13px] text-stone whitespace-nowrap">{s.d}</span>
                      </span>
                    </m.li>
                  );
                })}
              </ol>
            </div>
            <div className="p-5 md:p-7">
              <h3 className="font-display text-[20px] md:text-[22px] font-semibold text-ink">Порядок работ</h3>
              <p className="text-[15px] text-stone leading-relaxed mt-2">
                Аварийную протечку локализуем в&nbsp;течение 24&nbsp;часов. Плановый ремонт выполняется в&nbsp;сроки, установленные договором.
              </p>
            </div>
          </m.article>

          {/* 4 — Срок службы: диапазоны на общей шкале */}
          <m.article variants={cardVariants} className="bg-white rounded-3xl border border-sand overflow-hidden flex flex-col">
            <div className="bg-paper/70 relative flex items-center border-b border-sand px-5 py-8 md:px-10 md:py-10 min-h-[300px]">
              <div className="w-full" role="img" aria-label="Срок службы: заплата 1–2 года, ремонт в один слой 7–10 лет, капитальный ремонт в два слоя 15–25 лет">
                <div className="flex flex-col gap-5">
                  {life.map((l, i) => (
                    <div key={l.label}>
                      <div className="flex justify-between gap-3 text-[13px] md:text-[14px] mb-2">
                        <span className={"font-semibold " + (i === 2 ? "text-ink" : "text-stone")}>{l.label}</span>
                        <span className={"font-bold whitespace-nowrap " + (i === 2 ? "text-flame-dark" : "text-ink/70")}>{l.text}</span>
                      </div>
                      <div className="relative h-3 rounded-full bg-sand/70">
                        <m.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, delay: 0.2 + i * 0.2, ease: "easeOut" as const }}
                          style={{ left: (l.from / MAX) * 100 + "%", width: Math.max(((l.to - l.from) / MAX) * 100, 2.5) + "%" }}
                          className={"absolute top-0 h-full rounded-full origin-left " + l.tone}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="relative mt-4 h-5 text-[11px] text-stone">
                  {[0, 5, 10, 15, 20, 25].map((y) => (
                    <span key={y} className="absolute -translate-x-1/2 first:translate-x-0 last:-translate-x-full" style={{ left: (y / MAX) * 100 + "%" }}>
                      {y}
                    </span>
                  ))}
                </div>
                <div className="text-[11px] text-stone text-right">лет</div>
              </div>
            </div>
            <div className="p-5 md:p-7 flex flex-col">
              <h3 className="font-display text-[20px] md:text-[22px] font-semibold text-ink">Срок службы покрытия</h3>
              <p className="text-[15px] text-stone leading-relaxed mt-2">
                Ориентировочный срок службы при разных вариантах ремонта. В&nbsp;смете приводим несколько вариантов с&nbsp;расчётом стоимости.
              </p>
              <button
                onClick={() =>
                  openLead({
                    title: "Сравнение вариантов ремонта",
                    subtitle: "Подготовим расчёт нескольких вариантов ремонта для вашей кровли с указанием сроков службы.",
                    button: "Запросить сравнение",
                    source: "features-compare",
                    image: "estimate.webp",
                    extra: "area",
                  })
                }
                className="mt-3 inline-flex items-center gap-1.5 min-h-[44px] text-[15px] font-semibold text-flame-dark hover:gap-2.5 transition-all w-fit"
              >
                Запросить сравнение вариантов <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </m.article>
        </m.div>
      </div>
    </section>
  );
}
