"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Calculator } from "lucide-react";
import { img } from "@/lib/site";
import { useLead } from "./LeadModal";

const plans = [
  {
    id: "local",
    name: "Локальный ремонт",
    tagline: "Когда течёт в одном месте.",
    price: 350,
    isPopular: false,
    features: ["Поиск точки протечки", "Вскрытие и просушка участка", "Заплата в 2 слоя с нахлёстом", "Герметизация узлов рядом", "Фотоотчёт до и после", "Гарантия 2 года"],
  },
  {
    id: "one",
    name: "Ремонт в 1 слой",
    tagline: "Старый ковёр ещё держит.",
    price: 550,
    isPopular: false,
    features: ["Всё из локального ремонта", "Ремонт вздутий и трещин", "Праймер по всей площади", "Новый верхний слой с посыпкой", "Обновление примыканий", "Гарантия 5 лет"],
  },
  {
    id: "two",
    name: "Капитальный в 2 слоя",
    tagline: "Забыть о протечках на 15+ лет.",
    price: 850,
    isPopular: true,
    features: ["Подготовка и сушка основания", "Подкладочный + верхний слой", "Парапеты и фартуки заново", "Новые воронки и узлы", "Акты КС-2 / КС-3 для УК", "Гарантия до 10 лет"],
  },
];

const fmt = (n: number) => new Intl.NumberFormat("ru-RU").format(Math.round(n / 100) * 100);

function DotGridIcon() {
  return (
    <div className="grid grid-cols-2 gap-1">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="w-1 h-1 rounded-full bg-white" />
      ))}
    </div>
  );
}

export default function Pricing({ className }: { className?: string }) {
  const { openLead } = useLead();
  const [area, setArea] = useState(200);
  const [plan, setPlan] = useState(2);
  const [demolish, setDemolish] = useState(false);
  const [parapet, setParapet] = useState(true);

  const total = useMemo(() => {
    let per = plans[plan].price;
    if (demolish) per += 180;
    let sum = per * area;
    if (parapet) sum += Math.sqrt(area) * 4 * 900 * 0.6;
    return { from: sum, to: sum * 1.3 };
  }, [area, plan, demolish, parapet]);

  const fixPrice = (planIdx: number, withCalc: boolean) =>
    openLead({
      title: withCalc ? "Зафиксировать цену" : plans[planIdx].name,
      subtitle: withCalc
        ? "Инженер приедет, проверит площадь и состояние — и закрепит цену в договоре."
        : plans[planIdx].tagline + " Инженер оценит крышу и подтвердит цену бесплатно.",
      button: withCalc ? "Зафиксировать цену" : "Заказать бесплатный осмотр",
      source: withCalc ? "calc" : "plan-" + plans[planIdx].id,
      image: "estimate.webp",
      context: withCalc
        ? `Расчёт: ${plans[plan].name}, ${area} м²${demolish ? ", с демонтажом" : ""}${parapet ? ", с парапетами" : ""} — ≈ ${fmt(total.from)}–${fmt(total.to)} ₽`
        : `Тариф: ${plans[planIdx].name} · от ${plans[planIdx].price} ₽/м²`,
      extra: withCalc ? "address" : "area",
    });

  return (
    <section id="prices" className={"w-full px-0 py-[80px] md:py-24 bg-paper overflow-hidden relative " + (className || "")}>
      <div className="text-center px-5 mb-10 relative z-10">
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-flame text-[12px] font-bold uppercase tracking-[0.18em]">
          Цены
        </motion.span>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="font-display font-semibold text-[32px] md:text-[48px] text-ink leading-[1.06] tracking-[-0.02em] mt-3">
          Честные цены. <span className="italic text-flame">Без сюрпризов.</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }} className="mt-4 text-sm md:text-base text-stone max-w-xl mx-auto">
          Посчитайте ориентировочную стоимость работ прямо сейчас. Точную цену инженер зафиксирует в договоре после осмотра.
        </motion.p>
      </div>

      <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} className="mx-3 md:mx-10 lg:mx-auto max-w-[1440px] relative rounded-[24px] md:rounded-[28px] bg-ink shadow-[0_30px_80px_-30px_rgba(12,13,15,0.5)] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={img("rooftops.webp")} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-ink/30" />
        </div>

        {/* Калькулятор */}
        <div className="relative z-10 mx-3 mt-3 md:mx-10 md:mt-10 rounded-[18px] bg-ink/60 backdrop-blur-2xl border border-white/10 p-5 md:p-8 grid lg:grid-cols-[1.4fr_1fr] gap-6 md:gap-10">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-white">
              <span className="w-10 h-10 rounded-xl bg-fire flex items-center justify-center"><Calculator className="w-5 h-5" /></span>
              <span className="font-display text-lg md:text-xl font-semibold">Калькулятор ремонта</span>
            </div>
            <div>
              <div className="flex justify-between items-baseline mb-3">
                <span className="text-white/60 text-sm">Площадь кровли</span>
                <span className="font-display text-white text-2xl font-semibold">{area} м²</span>
              </div>
              <input
                type="range"
                min={20}
                max={3000}
                step={10}
                value={area}
                onChange={(e) => setArea(+e.target.value)}
                aria-label="Площадь кровли"
                className="w-full accent-[#ff5a1f] h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-white/35 mt-1"><span>20 м²</span><span>гараж · подъезд · дом · склад</span><span>3 000 м²</span></div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {plans.map((p, i) => (
                <button key={p.id} onClick={() => setPlan(i)} className={"rounded-xl px-2 py-3 text-[12px] md:text-[13px] font-semibold border transition leading-tight " + (plan === i ? "bg-white text-ink border-white" : "bg-white/5 text-white/75 border-white/15 hover:bg-white/10")}>
                  {p.name}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { on: demolish, set: setDemolish, t: "Демонтаж старого ковра" },
                { on: parapet, set: setParapet, t: "Примыкания к парапетам" },
              ].map((o) => (
                <button key={o.t} onClick={() => o.set(!o.on)} className={"inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] border transition " + (o.on ? "bg-flame/20 border-flame/60 text-white" : "border-white/15 text-white/60 hover:text-white")}>
                  <span className={"w-4 h-4 rounded-[5px] border flex items-center justify-center " + (o.on ? "bg-flame border-flame" : "border-white/40")}>{o.on && <Check className="w-3 h-3 text-white stroke-[3]" />}</span>
                  {o.t}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-5 md:p-6 flex flex-col">
            <span className="text-white/50 text-sm">Ориентировочно, работы</span>
            <motion.span key={Math.round(total.from)} initial={{ opacity: 0.4, y: 4 }} animate={{ opacity: 1, y: 0 }} className="font-display text-white text-[28px] md:text-[34px] font-semibold leading-tight mt-2">
              {fmt(total.from)} – {fmt(total.to)} ₽
            </motion.span>
            <span className="text-white/40 text-[12px] mt-2 leading-snug">Материалы — по смете, закупаем по оптовым ценам без наценки. Итог зависит от состояния основания.</span>
            <button onClick={() => fixPrice(plan, true)} className="mt-6 h-14 rounded-full bg-fire text-white font-semibold shadow-[0_12px_40px_-8px_rgba(255,90,31,0.7)] hover:scale-[1.02] active:scale-95 transition">
              Зафиксировать цену
            </button>
          </div>
        </div>

        {/* Тарифы */}
        <div className="relative z-10 bg-paper/85 backdrop-blur-xl m-3 md:m-10 rounded-[18px] overflow-hidden border border-white/20">
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-ink/10">
            {plans.map((p, idx) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.25 + idx * 0.1 }} className={"flex flex-col px-6 md:px-8 py-8 md:py-10 " + (p.isPopular ? "bg-white/70" : "")}>
                <div className="pb-7 border-b border-ink/10">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-display font-semibold text-[21px] md:text-2xl text-ink leading-tight">{p.name}</h3>
                    {p.isPopular && <span className="inline-flex items-center px-3 py-1 text-[10px] font-bold tracking-[0.12em] uppercase bg-fire text-white rounded-full shrink-0">Выбор УК</span>}
                  </div>
                  <p className="text-sm text-stone mt-1">{p.tagline}</p>
                  <div className="mt-7 flex items-baseline gap-1">
                    <span className="text-sm text-stone mr-1">от</span>
                    <span className="font-display font-semibold text-5xl text-ink leading-none">{p.price}</span>
                    <span className="text-xs font-semibold tracking-[0.08em] uppercase text-stone ml-1">₽ / м²</span>
                  </div>
                  <button onClick={() => fixPrice(idx, false)} className={"mt-6 w-full flex items-center justify-between rounded-full p-1.5 group transition-colors " + (p.isPopular ? "bg-fire text-white" : "bg-ink text-white hover:bg-graphite")}>
                    <span className="flex-1 px-5 py-3 text-sm font-semibold text-left">Заказать осмотр</span>
                    <span className={"w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors " + (p.isPopular ? "bg-white/20" : "bg-flame group-hover:bg-ember")}>
                      <DotGridIcon />
                    </span>
                  </button>
                </div>
                <div className="pt-7 flex flex-col gap-3">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-sm bg-flame/10 border border-flame/25 flex items-center justify-center flex-shrink-0">
                        <Check className="h-2.5 w-2.5 text-flame stroke-[3]" />
                      </div>
                      <span className="text-[12px] font-semibold tracking-[0.04em] uppercase text-ink/85">{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
