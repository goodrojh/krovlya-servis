"use client";
import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Droplet, CornerDownRight, CircleDot, Waves, Wind, Hourglass, Wrench, Timer, Wallet } from "lucide-react";
import { useLead } from "./LeadModal";
import { SectionHeader, Button, container, sectionPad } from "./ui";

const cases = [
  {
    id: "ceiling",
    icon: <Droplet className="w-5 h-5" />,
    symptom: "Протечка на потолке после дождя",
    cause: "Повреждение кровельного ковра или расхождение шва. Место проникновения воды может находиться в 3–5 м от пятна на потолке — вода распространяется по стяжке.",
    fix: "Определение места проникновения, вскрытие участка, просушка основания, наплавление заплаты в два слоя с нахлёстом.",
    time: "1 день",
    price: "от 350 ₽/м²",
  },
  {
    id: "wall",
    icon: <CornerDownRight className="w-5 h-5" />,
    symptom: "Намокание стен и углов верхнего этажа",
    cause: "Нарушение примыкания к парапету: отслоение материала, повреждение металлического фартука или штукатурного слоя.",
    fix: "Переустройство примыкания: заведение материала на вертикальную поверхность не менее 250 мм, крепление прижимной рейкой, установка фартука.",
    time: "1–2 дня",
    price: "от 900 ₽/п. м",
  },
  {
    id: "bubbles",
    icon: <CircleDot className="w-5 h-5" />,
    symptom: "Вздутия на покрытии",
    cause: "Влага под кровельным ковром — как правило, следствие укладки на влажное основание. При нагреве пар расширяется и разрывает покрытие.",
    fix: "Вскрытие вздутий, просушка основания, повторная приклейка материала и перекрытие заплатой.",
    time: "1 день",
    price: "от 350 ₽/м²",
  },
  {
    id: "puddles",
    icon: <Waves className="w-5 h-5" />,
    symptom: "Застой воды на кровле",
    cause: "Нарушение уклона или засор водосточных воронок. Постоянное воздействие воды сокращает срок службы покрытия.",
    fix: "Прочистка или замена воронок, устройство разуклонки в зонах застоя воды.",
    time: "2–4 дня",
    price: "по смете",
  },
  {
    id: "nodes",
    icon: <Wind className="w-5 h-5" />,
    symptom: "Протечки у труб, шахт и воронок",
    cause: "Разгерметизация узлов примыкания к вентиляционным шахтам, трубам, антеннам и водосточным воронкам.",
    fix: "Герметизация узлов, установка манжет и фартуков, замена воронок на модели с прижимным фланцем.",
    time: "1 день",
    price: "от 3 500 ₽/узел",
  },
  {
    id: "old",
    icon: <Hourglass className="w-5 h-5" />,
    symptom: "Износ покрытия по всей площади",
    cause: "Покрытие выработало ресурс: битум утратил эластичность, защитная посыпка разрушена. Локальный ремонт экономически нецелесообразен.",
    fix: "Капитальный ремонт в два слоя — поверх существующего покрытия при сухом основании либо с демонтажом.",
    time: "от 5 дней",
    price: "от 850 ₽/м²",
  },
];

export default function LeakDoctor({ className }: { className?: string }) {
  const [active, setActive] = useState(0);
  const { openLead } = useLead();
  const c = cases[active];

  return (
    <section id="diagnose" className={"w-full bg-ink relative overflow-hidden grain " + sectionPad + " " + (className || "")}>
      <div className={container + " relative z-10"}>
        <SectionHeader
          dark
          title="Определите вероятную"
          accent="причину протечки"
          lead="Выберите признак — покажем вероятную причину, способ устранения, сроки и ориентировочную стоимость. Точный диагноз инженер ставит на объекте."
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-4 md:gap-6">
          <div role="tablist" aria-label="Признаки протечки" className="flex lg:flex-col gap-2.5 overflow-x-auto no-scrollbar -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 snap-x snap-mandatory">
            {cases.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={
                  "snap-start shrink-0 w-[240px] lg:w-full text-left flex items-center gap-4 rounded-2xl border px-4 py-4 transition-colors " +
                  (i === active ? "bg-white text-ink border-white" : "bg-white/[0.04] text-white/85 border-white/10 hover:bg-white/[0.08]")
                }
              >
                <span className={"w-11 h-11 rounded-xl flex items-center justify-center shrink-0 " + (i === active ? "bg-fire text-white" : "bg-white/10 text-amber")}>{s.icon}</span>
                <span className="font-semibold text-[15px] leading-snug">{s.symptom}</span>
              </button>
            ))}
          </div>

          <div role="tabpanel" className="relative rounded-3xl bg-graphite border border-white/10 p-5 md:p-9 overflow-hidden min-h-[460px] flex flex-col">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="relative flex flex-col gap-5 flex-1"
              >
                <div>
                  <span className="text-[12px] uppercase tracking-[0.14em] text-white/60 font-bold">Вероятная причина</span>
                  <p className="text-white text-[17px] md:text-[19px] leading-relaxed mt-2">{c.cause}</p>
                </div>
                <div className="rounded-2xl bg-white/[0.05] border border-white/10 p-4 md:p-5 flex gap-4">
                  <span className="w-10 h-10 rounded-xl bg-flame/15 text-amber flex items-center justify-center shrink-0">
                    <Wrench className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="text-[12px] uppercase tracking-[0.14em] text-white/60 font-bold">Способ устранения</span>
                    <p className="text-white/85 text-[15px] leading-relaxed mt-1">{c.fix}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white/[0.05] border border-white/10 p-4">
                    <span className="flex items-center gap-2 text-white/60 text-[13px]"><Timer className="w-4 h-4" /> Срок</span>
                    <span className="font-display text-white text-[17px] sm:text-[20px] md:text-2xl font-semibold mt-1 block leading-tight">{c.time}</span>
                  </div>
                  <div className="rounded-2xl bg-white/[0.05] border border-white/10 p-4">
                    <span className="flex items-center gap-2 text-white/60 text-[13px]"><Wallet className="w-4 h-4" /> Стоимость</span>
                    <span className="font-display text-amber text-[17px] sm:text-[20px] md:text-2xl font-semibold mt-1 block leading-tight">{c.price}</span>
                  </div>
                </div>
                <div className="mt-auto pt-2">
                  <Button
                    arrow
                    onClick={() =>
                      openLead({
                        title: "Вызов инженера",
                        subtitle: "Инженер подтвердит причину на объекте и зафиксирует стоимость в смете.",
                        button: "Вызвать инженера",
                        source: "diagnose-" + c.id,
                        image: "inspect.webp",
                        context: "Признак: " + c.symptom,
                        extra: "address",
                      })
                    }
                  >
                    Вызвать инженера
                  </Button>
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
