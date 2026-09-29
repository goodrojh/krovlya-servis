"use client";
import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Flame, Layers, Droplets, HardHat, FileSignature, Check, ShieldCheck, ArrowUpRight } from "lucide-react";
import { img } from "@/lib/site";
import { useLead } from "./LeadModal";

const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const cardVariants: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } } };

const layers = [
  { label: "Верхний слой с посыпкой", sub: "защита от УФ и града", color: "bg-[#2a2c30]", w: "100%" },
  { label: "Подкладочный слой", sub: "основная гидроизоляция", color: "bg-[#3a3d42]", w: "96%" },
  { label: "Битумный праймер", sub: "сцепление с основанием", color: "bg-amber", w: "92%" },
  { label: "Сухое основание", sub: "стяжка / старый ковёр", color: "bg-[#b9b0a2]", w: "88%" },
];

const life = [
  { label: "Латка мастикой", years: "≈ 1 год", pct: 8, tone: "bg-stone/40" },
  { label: "Ремонт в 1 слой", years: "7–10 лет", pct: 45, tone: "bg-ember/70" },
  { label: "Наш ремонт в 2 слоя", years: "15–25 лет", pct: 100, tone: "bg-fire" },
];

export default function Features({ className }: { className?: string }) {
  const { openLead } = useLead();
  return (
    <section id="why" className={"w-full px-5 md:px-6 py-[90px] md:py-[140px] bg-paper relative overflow-hidden " + (className || "")}>
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-flame/[0.07] rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber/[0.08] rounded-full blur-[100px] translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 mb-12 md:mb-16 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block text-flame text-[12px] font-bold uppercase tracking-[0.18em] mb-4"
        >
          Почему крыши после нас не текут
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" as const }}
          className="font-display text-[32px] md:text-5xl font-semibold text-ink mb-6 leading-[1.08] tracking-[-0.02em]"
        >
          Чиним так, чтобы <br className="hidden md:block" />
          <span className="italic text-flame">не пришлось чинить снова</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" as const }}
          className="text-base md:text-lg text-stone max-w-2xl mx-auto"
        >
          Большинство протечек возвращаются через сезон, потому что крышу «мажут», а не ремонтируют. Мы ищем причину и восстанавливаем кровельный ковёр по технологии.
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-7xl mx-auto relative z-10"
      >
        {/* Карточка 1 — горелка */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-ink rounded-[28px] md:rounded-[32px] p-5 md:p-6 flex flex-col gap-10 group relative overflow-hidden min-h-[460px]"
        >
          <div className="absolute inset-0 z-0">
            <img src={img("torch-close.webp")} alt="Наплавление битумной мембраны газовой горелкой" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/70" />
          </div>
          <div className="relative z-10">
            <h3 className="font-display text-[28px] md:text-4xl font-semibold text-white leading-[1.08] tracking-tight drop-shadow-lg">
              Проплавляем, <br />
              <span className="italic text-amber">а не приклеиваем.</span>
            </h3>
            <p className="text-base text-white/85 leading-relaxed max-w-[450px] mt-3 drop-shadow-md">
              Битумно-полимерный ковёр сплавляется с основанием в монолит. Воде просто некуда затечь.
            </p>
          </div>
          <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 relative z-10">
            {[
              { icon: <Layers className="h-6 w-6 text-white" />, t: "Два слоя ковра", d: "Подкладочный + верхний с посыпкой. Двойная защита на 15+ лет." },
              { icon: <Flame className="h-6 w-6 text-white" />, t: "Нахлёст от 10 см", d: "Каждый шов проплавляем до выхода битумного валика." },
            ].map((c) => (
              <div key={c.t} className="flex flex-col gap-4 p-5 md:p-6 rounded-[24px] bg-white/10 backdrop-blur-xl border border-white/20 transition-all hover:bg-white/20 group/item shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shrink-0 transition-transform group-hover/item:scale-110">
                  {c.icon}
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-bold text-white">{c.t}</span>
                  <p className="text-[12px] text-white/70 leading-relaxed">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Карточка 2 — кровельный пирог */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-white rounded-[28px] md:rounded-[32px] border border-sand p-5 md:p-6 flex flex-col overflow-hidden relative min-h-[460px]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber/15 via-paper/40 to-flame/10" />
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-flame/15 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber/20 rounded-full blur-[60px]" />

          <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center pointer-events-none select-none py-6">
            <div className="w-full max-w-[330px] bg-white/50 backdrop-blur-xl border border-white/70 rounded-[24px] p-5 md:p-6 shadow-2xl shadow-flame/10">
              <div className="flex flex-col items-center gap-1.5">
                {layers.map((l, i) => (
                  <motion.div
                    key={l.label}
                    initial={{ opacity: 0, y: -24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 - i * 0.18, type: "spring", damping: 16 }}
                    style={{ width: l.w }}
                    className="flex items-center gap-3 bg-white/85 rounded-xl p-2.5 border border-white/50 shadow-sm"
                  >
                    <div className={"w-8 h-5 rounded-md shrink-0 " + l.color} />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[12px] font-semibold text-ink leading-tight truncate">{l.label}</span>
                      <span className="text-[10px] text-stone leading-tight">{l.sub}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 bg-white/90 rounded-full border border-white p-2 flex items-center gap-3 shadow-lg shadow-flame/10">
                <div className="w-6 h-6 rounded-full border-2 border-amber/30 border-t-flame animate-spin" />
                <span className="text-[11px] font-medium text-stone flex-1">Проверяем влажность основания…</span>
                <div className="w-7 h-7 rounded-full bg-fire flex items-center justify-center">
                  <Droplets className="h-3.5 w-3.5 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto relative z-10 pt-4">
            <h3 className="font-display text-xl font-semibold text-ink">Что внутри вашей крыши</h3>
            <p className="text-sm text-stone leading-relaxed mt-2">
              Вскрываем проблемные участки, сушим основание, грунтуем праймером. По мокрому не кладём никогда — иначе вздутие через месяц.
            </p>
          </div>
        </motion.div>

        {/* Карточка 3 — путь заявки */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-white rounded-[28px] md:rounded-[32px] border border-sand overflow-hidden flex flex-col"
        >
          <div className="bg-paper h-[300px] relative flex items-center justify-center overflow-hidden border-b border-sand p-6 md:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-amber/10 via-white to-flame/10" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-12 bg-flame/15 blur-2xl rounded-full" />

            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, 5, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 6, repeat: Infinity as number, ease: "easeInOut" as const }}
              className="absolute top-8 right-6 md:right-10 w-14 h-14 rounded-2xl bg-white/50 backdrop-blur-md border border-white/70 shadow-[0_20px_40px_rgba(0,0,0,0.08)] hidden sm:flex items-center justify-center"
            >
              <HardHat className="h-7 w-7 text-flame" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 12, 0], rotate: [0, -5, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 5, repeat: Infinity as number, ease: "easeInOut" as const, delay: 1 }}
              className="absolute bottom-8 left-6 md:left-10 w-16 h-16 rounded-[22px] bg-white/50 backdrop-blur-md border border-white/70 shadow-[0_20px_40px_rgba(0,0,0,0.08)] hidden sm:flex items-center justify-center"
            >
              <ShieldCheck className="h-8 w-8 text-ember" />
            </motion.div>

            <div className="relative z-10 w-full max-w-[270px] flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-3.5 shadow-xl shadow-flame/10 border border-flame/15 flex items-center gap-3 w-full mb-8 relative"
              >
                <div className="w-10 h-10 rounded-xl bg-[#3b82f6] flex items-center justify-center shrink-0">
                  <Droplets className="h-5 w-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-ink">Протечка после дождя</span>
                  <span className="text-[10px] text-stone">«Капает в подъезде на 9 этаже»</span>
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-flame/30 to-flame/60" />
              </motion.div>

              <div className="grid grid-cols-2 gap-3 w-full relative">
                <div className="absolute -top-4 left-1/4 right-1/4 h-px bg-flame/30" />
                <div className="absolute -top-4 left-1/4 w-px h-4 bg-flame/30" />
                <div className="absolute -top-4 right-1/4 w-px h-4 bg-flame/30" />
                {[
                  { icon: <HardHat className="h-4 w-4 text-flame" />, t: "Выезд инженера" },
                  { icon: <FileSignature className="h-4 w-4 text-flame" />, t: "Смета и договор" },
                ].map((n, i) => (
                  <motion.div
                    key={n.t}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="bg-white/85 backdrop-blur-md rounded-xl p-3 shadow-lg shadow-flame/5 border border-white flex flex-col gap-2 items-center text-center"
                  >
                    <div className="w-8 h-8 rounded-lg bg-flame/10 flex items-center justify-center">{n.icon}</div>
                    <span className="text-[11px] font-bold text-ink">{n.t}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-7 bg-leaf text-white text-[11px] font-bold py-2 px-4 rounded-full shadow-lg shadow-leaf/30 flex items-center gap-2"
              >
                <Check className="h-3 w-3 stroke-[3]" />
                <span>Потолок сухой. Гарантия выдана</span>
              </motion.div>
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-display text-xl font-semibold text-ink">От звонка до сухого потолка</h3>
            <p className="text-base text-stone leading-relaxed mt-2">
              Аварийную протечку локализуем в течение суток, а капитальный ремонт планируем без спешки — по смете и в срок из договора.
            </p>
          </div>
        </motion.div>

        {/* Карточка 4 — срок службы */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-white rounded-[28px] md:rounded-[32px] border border-sand overflow-hidden flex flex-col"
        >
          <div className="bg-paper h-[300px] relative flex flex-col items-center justify-center border-b border-sand p-5 md:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-amber/10 via-white to-flame/10" />
            <div className="w-full h-full bg-white/65 backdrop-blur-xl rounded-2xl border border-white/80 shadow-2xl shadow-flame/5 p-5 md:p-6 flex flex-col gap-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-flame/10 flex items-center justify-center">
                    <Flame className="h-5 w-5 text-flame" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-ink leading-tight">Срок службы кровли</span>
                    <span className="text-[10px] text-stone leading-tight">без повторных протечек</span>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-1.5 h-6 bg-flame/10 rounded-full overflow-hidden flex items-end">
                      <motion.div
                        animate={{ height: ["20%", "90%", "20%"] }}
                        transition={{ duration: 2.5, repeat: Infinity as number, delay: i * 0.4, ease: "easeInOut" as const }}
                        className="w-full bg-flame"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center gap-4">
                {life.map((l, i) => (
                  <div key={l.label} className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-[12px]">
                      <span className={"font-semibold " + (i === 2 ? "text-ink" : "text-stone")}>{l.label}</span>
                      <span className={"font-bold " + (i === 2 ? "text-flame" : "text-stone")}>{l.years}</span>
                    </div>
                    <div className="h-3 rounded-full bg-sand/70 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: l.pct + "%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.3, delay: 0.2 + i * 0.2, ease: "easeOut" as const }}
                        className={"h-full rounded-full " + l.tone}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-6 flex flex-col">
            <h3 className="font-display text-xl font-semibold text-ink">Считаем годы без протечек, а не рубли за метр</h3>
            <p className="text-base text-stone leading-relaxed mt-2">
              Дешёвая латка обходится дороже: через год снова вода, испорченный потолок и новый вызов. Покажем честное сравнение вариантов в смете.
            </p>
            <button
              onClick={() =>
                openLead({
                  title: "Сравнить варианты ремонта",
                  subtitle: "Посчитаем 2–3 варианта для вашей крыши: латка, 1 слой, 2 слоя — со сроками службы и ценой за год.",
                  button: "Получить сравнение",
                  source: "features-compare",
                  image: "estimate.webp",
                  extra: "area",
                })
              }
              className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-flame hover:gap-2.5 transition-all w-fit"
            >
              Сравнить варианты для моей крыши <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
