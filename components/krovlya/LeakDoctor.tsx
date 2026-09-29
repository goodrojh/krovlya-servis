"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplet, CornerDownRight, CircleDot, Waves, Wind, Hourglass, Search, Wrench, Timer, Wallet, ArrowRight } from "lucide-react";
import { useLead } from "./LeadModal";

const cases = [
  {
    id: "ceiling",
    icon: <Droplet className="w-5 h-5" />,
    symptom: "Капает с потолка после дождя",
    cause: "Повреждён кровельный ковёр или разошёлся шов. Вода часто заходит в 3–5 метрах от пятна и идёт по стяжке — поэтому латка «над пятном» не помогает.",
    fix: "Находим точку входа воды, вскрываем участок, сушим и наплавляем заплату в два слоя с нахлёстом.",
    time: "1 день",
    price: "от 350 ₽/м²",
  },
  {
    id: "wall",
    icon: <CornerDownRight className="w-5 h-5" />,
    symptom: "Мокрые пятна у стены и в углах",
    cause: "Проблема в примыканиях к парапету: ковёр отклеился, отошёл металлический фартук, раскрошилась штукатурка.",
    fix: "Переделываем примыкания: заводим материал на парапет от 25 см, крепим рейкой и ставим новый фартук.",
    time: "1–2 дня",
    price: "от 900 ₽/п.м",
  },
  {
    id: "bubbles",
    icon: <CircleDot className="w-5 h-5" />,
    symptom: "Вздутия и пузыри на крыше",
    cause: "Под ковром скопилась влага: раньше наплавили на мокрое основание. Летом пар расширяется, пузырь лопается — и течёт.",
    fix: "Вскрываем вздутия крестом, просушиваем горелкой, приклеиваем обратно и перекрываем заплатой.",
    time: "1 день",
    price: "от 350 ₽/м²",
  },
  {
    id: "puddles",
    icon: <Waves className="w-5 h-5" />,
    symptom: "После дождя стоят лужи",
    cause: "Нарушен уклон или забиты водоприёмные воронки. Стоячая вода за 2–3 сезона разрушает любой ковёр.",
    fix: "Прочищаем или меняем воронки, делаем разуклонку в проблемных зонах, чтобы вода уходила сама.",
    time: "2–4 дня",
    price: "по смете",
  },
  {
    id: "nodes",
    icon: <Wind className="w-5 h-5" />,
    symptom: "Течёт у трубы, шахты или воронки",
    cause: "Негерметичные узлы: вокруг вентшахт, антенн, труб и старых воронок материал со временем трескается.",
    fix: "Герметизируем узлы, ставим юбки и манжеты, меняем воронки на новые с прижимным фланцем.",
    time: "1 день",
    price: "от 3 500 ₽/узел",
  },
  {
    id: "old",
    icon: <Hourglass className="w-5 h-5" />,
    symptom: "Крыше больше 10 лет, трещины везде",
    cause: "Ковёр отработал ресурс: битум потерял эластичность, посыпка осыпалась. Латать — выбрасывать деньги.",
    fix: "Капитальный ремонт в 2 слоя: поверх старого ковра, если основание сухое, или с демонтажом.",
    time: "от 5 дней",
    price: "от 850 ₽/м²",
  },
];

export default function LeakDoctor({ className }: { className?: string }) {
  const [active, setActive] = useState(0);
  const { openLead } = useLead();
  const c = cases[active];

  return (
    <section id="diagnose" className={"w-full bg-ink px-5 md:px-8 py-[90px] md:py-[130px] relative overflow-hidden grain " + (className || "")}>
      <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-flame/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <span className="inline-flex items-center gap-2 text-amber text-[12px] font-bold uppercase tracking-[0.18em] mb-4">
              <Search className="w-4 h-4" /> Экспресс-диагностика
            </span>
            <h2 className="font-display text-[32px] md:text-5xl font-semibold text-white leading-[1.08] tracking-[-0.02em] max-w-2xl">
              Что происходит <span className="italic text-fire whitespace-nowrap">с&nbsp;вашей</span> <span className="italic text-fire">крышей?</span>
            </h2>
          </div>
          <p className="text-white/55 max-w-sm text-[15px] leading-relaxed">
            Выберите, что видите. Расскажем вероятную причину, как чиним и сколько это стоит — ещё до выезда.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-4 md:gap-6">
          {/* Симптомы */}
          <div className="flex lg:flex-col gap-2.5 overflow-x-auto no-scrollbar -mx-5 px-5 lg:mx-0 lg:px-0 snap-x" style={{ scrollbarWidth: "none" } as React.CSSProperties}>
            {cases.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className={
                  "snap-start shrink-0 w-[230px] lg:w-full text-left flex items-center gap-4 rounded-2xl border px-4 py-4 transition-all " +
                  (i === active ? "bg-white text-ink border-white shadow-[0_10px_40px_-10px_rgba(255,138,61,0.5)]" : "bg-white/[0.04] text-white/80 border-white/10 hover:bg-white/[0.08]")
                }
              >
                <span className={"w-11 h-11 rounded-xl flex items-center justify-center shrink-0 " + (i === active ? "bg-fire text-white" : "bg-white/10 text-amber")}>{s.icon}</span>
                <span className="font-semibold text-[15px] leading-snug">{s.symptom}</span>
              </button>
            ))}
          </div>

          {/* Результат */}
          <div className="relative rounded-[28px] bg-graphite border border-white/10 p-6 md:p-9 overflow-hidden min-h-[440px] flex flex-col">
            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-flame/15 blur-[90px]" />
            <AnimatePresence mode="wait">
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="relative flex flex-col gap-6 flex-1"
              >
                <div>
                  <span className="text-[11px] uppercase tracking-[0.16em] text-white/40 font-bold">Вероятная причина</span>
                  <p className="text-white text-lg md:text-xl leading-relaxed mt-2">{c.cause}</p>
                </div>
                <div className="rounded-2xl bg-white/[0.05] border border-white/10 p-5 flex gap-4">
                  <span className="w-10 h-10 rounded-xl bg-flame/15 text-amber flex items-center justify-center shrink-0">
                    <Wrench className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.16em] text-white/40 font-bold">Как чиним</span>
                    <p className="text-white/85 leading-relaxed mt-1">{c.fix}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white/[0.05] border border-white/10 p-4">
                    <span className="flex items-center gap-2 text-white/45 text-[12px]"><Timer className="w-4 h-4" /> Срок</span>
                    <span className="font-display text-white text-xl md:text-2xl font-semibold mt-1 block">{c.time}</span>
                  </div>
                  <div className="rounded-2xl bg-white/[0.05] border border-white/10 p-4">
                    <span className="flex items-center gap-2 text-white/45 text-[12px]"><Wallet className="w-4 h-4" /> Стоимость</span>
                    <span className="font-display text-amber text-xl md:text-2xl font-semibold mt-1 block">{c.price}</span>
                  </div>
                </div>
                <button
                  onClick={() =>
                    openLead({
                      title: "Вызвать инженера с этой проблемой",
                      subtitle: "Инженер приедет, подтвердит причину на месте и зафиксирует цену в смете.",
                      button: "Вызвать инженера бесплатно",
                      source: "diagnose-" + c.id,
                      image: "inspect.webp",
                      context: "Проблема: " + c.symptom,
                      extra: "address",
                      badge: "Диагностика 0 ₽",
                    })
                  }
                  className="mt-auto group w-full sm:w-fit rounded-full pl-6 pr-2 py-2 bg-fire text-white font-semibold flex items-center justify-between gap-4 transition hover:scale-[1.02] active:scale-95"
                >
                  Вызвать инженера с этой проблемой
                  <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition">
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
