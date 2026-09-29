"use client";
import React from "react";
import { m } from "framer-motion";
import type { Variants } from "framer-motion";
import { ScanSearch, Camera, Ruler, Check, FileText } from "lucide-react";
import { img } from "@/lib/site";
import { useLead } from "./LeadModal";
import { SectionHeader, Button, container, sectionPad } from "./ui";

const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.18 } } };
const stepVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] as const } },
};

const glass = "w-full max-w-[320px] bg-white/90 md:bg-white/75 md:backdrop-blur-md rounded-2xl border border-white/60 p-4 shadow-2xl shadow-black/10";

function Chip({ icon, t, s, active = false, delay }: { icon: React.ReactNode; t: string; s: string; active?: boolean; delay: number }) {
  return (
    <m.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={"relative rounded-xl px-3 py-2.5 flex items-center gap-3 overflow-hidden " + (active ? "bg-white shadow-lg border border-flame/30" : "bg-white/70 border border-white/60")}
    >
      {active && (
        <m.span
          animate={{ x: ["-100%", "220%"] }}
          transition={{ duration: 2.6, repeat: Infinity as number, ease: "linear" as const }}
          className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-flame/15 to-transparent -skew-x-12 pointer-events-none"
        />
      )}
      <span className={"w-8 h-8 rounded-lg flex items-center justify-center shrink-0 " + (active ? "bg-flame/10 text-flame" : "bg-ink/5 text-ink/70")}>{icon}</span>
      <span className="flex flex-col leading-tight">
        <span className="text-[13px] font-semibold text-ink">{t}</span>
        <span className="text-[11px] text-stone">{s}</span>
      </span>
    </m.div>
  );
}

export default function HowItWorks({ className }: { className?: string }) {
  const { openLead } = useLead();

  const steps = [
    {
      badge: "Этап 1 · день обращения",
      title: "Осмотр и диагностика",
      text: "Инженер обследует кровлю, определяет причины протечек, выполняет замеры и фотофиксацию дефектов. Выезд бесплатный.",
      image: "inspect.webp",
      alt: "Инженер осматривает повреждённое примыкание плоской кровли",
      mock: (
        <div className={glass + " flex flex-col gap-2"}>
          <Chip icon={<Ruler className="w-4 h-4" />} t="Замер площади" s="лазерный дальномер" delay={0.3} />
          <Chip icon={<ScanSearch className="w-4 h-4" />} t="Поиск места протечки" s="швы, примыкания, узлы" active delay={0.4} />
          <Chip icon={<Camera className="w-4 h-4" />} t="Фотофиксация дефектов" s="передаём заказчику" delay={0.5} />
        </div>
      ),
    },
    {
      badge: "Этап 2 · 1–2 дня",
      title: "Смета и договор",
      text: "Составляем смету с перечнем работ и материалов. Стоимость фиксируется в договоре и не меняется в ходе работ.",
      image: "estimate.webp",
      alt: "Смета на ремонт кровли и договор подряда",
      mock: (
        <div className={glass}>
          <div className="flex items-center gap-2 pb-2.5 mb-2.5 border-b border-ink/10">
            <span className="w-8 h-8 rounded-lg bg-flame/10 text-flame flex items-center justify-center"><FileText className="w-4 h-4" /></span>
            <span className="text-[13px] font-semibold text-ink">Смета на ремонт кровли</span>
          </div>
          {["Перечень и объёмы работ", "Материалы и марки", "Сроки выполнения", "Гарантийный срок"].map((r, i) => (
            <m.div key={r} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.12 }} className="flex items-center gap-2 py-1">
              <span className="w-4 h-4 rounded-full bg-leaf text-white flex items-center justify-center shrink-0"><Check className="w-2.5 h-2.5 stroke-[3.5]" /></span>
              <span className="text-[12px] text-ink/85">{r}</span>
            </m.div>
          ))}
          <m.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.9 }} className="mt-2.5 inline-flex rounded-full bg-ink text-white text-[11px] font-semibold px-3 py-1">
            Стоимость зафиксирована
          </m.div>
        </div>
      ),
    },
    {
      badge: "Этап 3 · по графику договора",
      title: "Выполнение работ и сдача",
      text: "Работы выполняет штатная бригада. Сдача по акту с фотоотчётом, гарантийные обязательства — по договору.",
      image: "finished.webp",
      alt: "Отремонтированная плоская кровля с новой водосточной воронкой",
      mock: (
        <div className={glass + " flex flex-col gap-2.5"}>
          {["Подготовка основания", "Подкладочный слой", "Верхний слой", "Примыкания и узлы"].map((r, i) => (
            <div key={r} className="flex items-center gap-3">
              <span className="text-[12px] font-medium text-ink w-[132px] shrink-0">{r}</span>
              {/* Триггер на дорожке: сжатая до нуля полоса внутри overflow-hidden не видна IntersectionObserver */}
              <m.div initial="off" whileInView="on" viewport={{ once: true }} className="flex-1 h-1.5 rounded-full bg-ink/10 overflow-hidden">
                <m.div variants={{ off: { scaleX: 0 }, on: { scaleX: 1, transition: { duration: 0.8, delay: 0.3 + i * 0.25 } } }} className="h-full bg-fire rounded-full origin-left" />
              </m.div>
            </div>
          ))}
          <m.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.4 }} className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-ink">
            <span className="w-1.5 h-1.5 rounded-full bg-leaf" /> Акт подписан, гарантия выдана
          </m.div>
        </div>
      ),
    },
  ];

  return (
    <section id="process" className={"w-full bg-paper relative overflow-hidden " + sectionPad + " " + (className || "")}>
      <div className={container + " relative z-10"}>
        <SectionHeader title="Порядок работы:" accent="три этапа" lead="От обращения до сдачи объекта по акту. На каждом этапе вы знаете, что сделано и сколько это стоит." />

        <m.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8 mb-12 md:mb-16">
          {steps.map((s) => (
            <m.div key={s.title} variants={stepVariants} className="flex flex-col md:flex-row lg:flex-col md:items-center lg:items-stretch gap-6 md:gap-8 lg:gap-6">
              <div className="rounded-3xl overflow-hidden relative aspect-[4/3] lg:aspect-square xl:aspect-[4/3.4] w-full md:w-1/2 lg:w-full shrink-0 bg-sand">
                <img src={img(s.image)} alt={s.alt} loading="lazy" decoding="async" width={1000} height={747} className="object-cover w-full h-full absolute inset-0" />
                <div className="absolute inset-0 bg-black/15" />
                <div className="absolute inset-0 flex items-center justify-center p-6 md:p-7 lg:p-9">{s.mock}</div>
              </div>
              <div className="flex flex-col gap-3">
                <span className="inline-flex w-fit rounded-full text-flame-dark text-[12px] font-bold px-3 py-1 border border-flame/60">{s.badge}</span>
                <h3 className="font-display text-[20px] md:text-[22px] font-semibold leading-tight text-ink">{s.title}</h3>
                <p className="text-[15px] md:text-base text-stone leading-relaxed">{s.text}</p>
              </div>
            </m.div>
          ))}
        </m.div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            arrow
            onClick={() =>
              openLead({
                title: "Запись на осмотр",
                subtitle: "Согласуем удобное время выезда инженера.",
                button: "Записаться",
                source: "process-inspect",
                image: "inspect.webp",
                extra: "address",
              })
            }
          >
            Записаться на осмотр
          </Button>
          <Button
            variant="light"
            className="border border-sand"
            onClick={() =>
              openLead({
                title: "Прайс-лист",
                subtitle: "Отправим прайс-лист на кровельные работы в WhatsApp или Telegram на указанный номер.",
                button: "Получить прайс-лист",
                source: "process-price",
                image: "estimate.webp",
              })
            }
          >
            Запросить прайс-лист
          </Button>
        </div>
      </div>
    </section>
  );
}
