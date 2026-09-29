"use client";
import React, { useMemo, useState } from "react";
import { m } from "framer-motion";
import { Check, Calculator } from "lucide-react";
import { img } from "@/lib/site";
import { useLead } from "./LeadModal";
import { SectionHeader, Button, container, sectionPad } from "./ui";

const PARAPET = 900; // ₽ за погонный метр примыкания
const DEMOLISH = 180; // ₽/м² демонтаж старого ковра

const plans = [
  {
    id: "local",
    name: "Локальный ремонт",
    tagline: "Устранение отдельных протечек и повреждений.",
    price: 350,
    recommended: false,
    features: ["Поиск места протечки", "Вскрытие и просушка участка", "Заплата в два слоя с нахлёстом", "Герметизация узлов на участке", "Фотоотчёт до и после", "Гарантия 2 года"],
  },
  {
    id: "one",
    name: "Ремонт в один слой",
    tagline: "При удовлетворительном состоянии основания.",
    price: 550,
    recommended: false,
    features: ["Ремонт вздутий и трещин", "Грунтовка праймером", "Новый верхний слой с посыпкой", "Ремонт примыканий", "Фотоотчёт по этапам", "Гарантия 5 лет"],
  },
  {
    id: "two",
    name: "Капитальный ремонт",
    tagline: "Новый кровельный ковёр в два слоя.",
    price: 850,
    recommended: true,
    features: ["Подготовка и просушка основания", "Подкладочный и верхний слой", "Новые примыкания и фартуки", "Замена воронок и узлов", "Акты КС-2 / КС-3", "Гарантия до 10 лет"],
  },
];

const fmt = (n: number) => new Intl.NumberFormat("ru-RU").format(Math.round(n / 100) * 100);

export default function Pricing({ className }: { className?: string }) {
  const { openLead } = useLead();
  const [plan, setPlan] = useState(2);
  const [areas, setAreas] = useState<[number, number, number]>([20, 200, 200]);
  const [demolish, setDemolish] = useState(false);
  const [parapet, setParapet] = useState(true);

  const isLocal = plan === 0;
  const area = areas[plan];
  const range = isLocal ? { min: 5, max: 200, step: 5 } : { min: 20, max: 3000, step: 10 };
  const setArea = (v: number) => setAreas((a) => a.map((x, i) => (i === plan ? v : x)) as [number, number, number]);

  const calc = useMemo(() => {
    const rows: { label: string; value: number }[] = [{ label: `Кровельные работы · ${area} м² × ${plans[plan].price} ₽`, value: area * plans[plan].price }];
    if (!isLocal && demolish) rows.push({ label: `Демонтаж старого покрытия · ${area} м² × ${DEMOLISH} ₽`, value: area * DEMOLISH });
    if (!isLocal && parapet) {
      const perimeter = Math.round(4 * Math.sqrt(area));
      rows.push({ label: `Примыкания к парапету · ≈${perimeter} п. м × ${PARAPET} ₽`, value: perimeter * PARAPET });
    }
    const total = rows.reduce((s, r) => s + r.value, 0);
    return { rows, total };
  }, [area, plan, isLocal, demolish, parapet]);

  const summary = `${plans[plan].name}, ${area} м²${!isLocal && demolish ? ", с демонтажом" : ""}${!isLocal && parapet ? ", с примыканиями" : ""} — ≈ ${fmt(calc.total)} ₽`;

  const orderPlan = (i: number) =>
    openLead({
      title: plans[i].name,
      subtitle: plans[i].tagline + " Инженер осмотрит кровлю и подтвердит стоимость.",
      button: "Заказать осмотр",
      source: "plan-" + plans[i].id,
      image: "estimate.webp",
      context: `Вариант: ${plans[i].name} · от ${plans[i].price} ₽/м²`,
      extra: "area",
    });

  const pct = ((area - range.min) / (range.max - range.min)) * 100;

  return (
    <section id="prices" className={"w-full bg-paper overflow-hidden " + sectionPad + " " + (className || "")}>
      <div className={container}>
        <SectionHeader title="Стоимость" accent="работ" lead="Предварительный расчёт стоимости работ. Окончательная стоимость фиксируется в договоре после осмотра." />

        <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="relative rounded-3xl bg-ink overflow-hidden">
          <img src={img("rooftops.webp")} alt="" aria-hidden loading="lazy" decoding="async" width={1600} height={893} className="absolute inset-0 w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 to-ink/30" />

          {/* Калькулятор */}
          <div className="relative z-10 m-3 md:m-8 rounded-2xl bg-ink/85 md:bg-ink/65 md:backdrop-blur-xl border border-white/10 p-5 md:p-8 grid lg:grid-cols-[1.3fr_1fr] gap-6 md:gap-10">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 text-white">
                <span className="w-10 h-10 rounded-xl bg-fire flex items-center justify-center"><Calculator className="w-5 h-5" /></span>
                <span className="font-display text-[18px] md:text-xl font-semibold">Калькулятор</span>
              </div>

              <div role="radiogroup" aria-label="Вид ремонта" className="grid grid-cols-3 gap-2">
                {plans.map((p, i) => (
                  <button
                    key={p.id}
                    role="radio"
                    aria-checked={plan === i}
                    onClick={() => setPlan(i)}
                    className={"rounded-xl px-2 py-3 text-[13px] md:text-[14px] font-semibold border transition-colors leading-tight min-h-[52px] " + (plan === i ? "bg-white text-ink border-white" : "bg-white/5 text-white/80 border-white/15 hover:bg-white/10")}
                  >
                    {p.name}
                  </button>
                ))}
              </div>

              <div>
                <div className="flex justify-between items-baseline gap-3 mb-2">
                  <label htmlFor="area" className="text-white/75 text-[14px]">{isLocal ? "Площадь ремонтируемого участка" : "Площадь кровли"}</label>
                  <span className="font-display text-white text-[22px] md:text-2xl font-semibold whitespace-nowrap">{area} м²</span>
                </div>
                <input
                  id="area"
                  type="range"
                  min={range.min}
                  max={range.max}
                  step={range.step}
                  value={area}
                  onChange={(e) => setArea(+e.target.value)}
                  className="range"
                  style={{ "--p": pct + "%" } as React.CSSProperties}
                />
                <div className="flex justify-between text-[12px] text-white/55 mt-1">
                  <span>{range.min} м²</span>
                  <span>{fmt(range.max)} м²</span>
                </div>
              </div>

              {!isLocal && (
                <div className="flex flex-wrap gap-2">
                  {[
                    { on: demolish, set: setDemolish, t: "Демонтаж старого покрытия" },
                    { on: parapet, set: setParapet, t: "Примыкания к парапету" },
                  ].map((o) => (
                    <button
                      key={o.t}
                      role="checkbox"
                      aria-checked={o.on}
                      onClick={() => o.set(!o.on)}
                      className={"inline-flex items-center gap-2 rounded-full px-4 min-h-[44px] text-[14px] border transition-colors " + (o.on ? "bg-flame/20 border-flame/60 text-white" : "border-white/20 text-white/75 hover:text-white")}
                    >
                      <span className={"w-4 h-4 rounded-[5px] border flex items-center justify-center " + (o.on ? "bg-flame border-flame" : "border-white/50")}>{o.on && <Check className="w-3 h-3 text-white stroke-[3]" />}</span>
                      {o.t}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-5 md:p-6 flex flex-col">
              <span className="text-white/65 text-[14px]">Стоимость работ, ориентировочно</span>
              <span className="font-display text-white text-[30px] md:text-[36px] font-semibold leading-tight mt-1 tabular-nums">{fmt(calc.total)} ₽</span>
              <ul className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4">
                {calc.rows.map((r) => (
                  <li key={r.label} className="flex justify-between gap-4 text-[13px]">
                    <span className="text-white/65">{r.label}</span>
                    <span className="text-white whitespace-nowrap tabular-nums">{fmt(r.value)} ₽</span>
                  </li>
                ))}
              </ul>
              <span className="text-white/55 text-[12px] mt-4 leading-snug">Материалы рассчитываются отдельно по смете. Итог зависит от состояния основания.</span>
              <div className="mt-6">
                <Button
                  full
                  onClick={() =>
                    openLead({
                      title: "Фиксация стоимости",
                      subtitle: "Инженер проверит площадь и состояние кровли, стоимость будет зафиксирована в договоре.",
                      button: "Зафиксировать стоимость",
                      source: "calc",
                      image: "estimate.webp",
                      context: "Расчёт: " + summary,
                      extra: "address",
                    })
                  }
                >
                  Зафиксировать стоимость
                </Button>
              </div>
            </div>
          </div>

          {/* Варианты */}
          <div className="relative z-10 bg-paper m-3 md:m-8 mt-0 md:mt-0 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-ink/10">
              {plans.map((p, idx) => (
                <div key={p.id} className={"flex flex-col px-5 md:px-8 py-7 md:py-9 " + (p.recommended ? "bg-white" : "")}>
                  <div className="pb-6 border-b border-ink/10">
                    <div className="h-6 mb-3 hidden lg:block">
                      {p.recommended && <span className="inline-flex px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] bg-ink text-white rounded-full">Рекомендуем</span>}
                    </div>
                    {p.recommended && <span className="lg:hidden inline-flex mb-3 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] bg-ink text-white rounded-full">Рекомендуем</span>}
                    <h3 className="font-display font-semibold text-[20px] md:text-[22px] text-ink leading-tight mb-2">{p.name}</h3>
                    <p className="text-[15px] text-stone">{p.tagline}</p>
                    <div className="mt-6 flex items-baseline gap-1.5">
                      <span className="text-[15px] text-stone">от</span>
                      <span className="font-display font-semibold text-[44px] md:text-5xl text-ink leading-none tabular-nums">{p.price}</span>
                      <span className="text-[15px] font-semibold text-stone">₽/м²</span>
                    </div>
                    <div className="mt-6">
                      <Button full variant={p.recommended ? "primary" : "dark"} onClick={() => orderPlan(idx)}>
                        Заказать осмотр
                      </Button>
                    </div>
                  </div>
                  <ul className="pt-6 flex flex-col gap-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-flame/10 flex items-center justify-center flex-shrink-0 mt-px">
                          <Check className="h-3 w-3 text-flame stroke-[3]" />
                        </span>
                        <span className="text-[15px] text-ink/85 leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
