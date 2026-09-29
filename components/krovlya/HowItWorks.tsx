"use client";
import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ScanSearch, Camera, Ruler } from "lucide-react";
import { img } from "@/lib/site";
import { useLead } from "./LeadModal";

const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
const stepVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as const } },
};

export default function HowItWorks({ className }: { className?: string }) {
  const { openLead } = useLead();
  return (
    <section id="process" className={"w-full px-5 md:px-12 lg:px-20 py-[90px] md:py-24 bg-paper relative overflow-hidden " + (className || "")}>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ duration: 8, repeat: Infinity as number, ease: "easeInOut" as const }} className="absolute -top-24 -left-24 w-96 h-96 bg-flame/[0.07] rounded-full blur-3xl" />
        <motion.div animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }} transition={{ duration: 10, repeat: Infinity as number, ease: "easeInOut" as const, delay: 1 }} className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber/[0.08] rounded-full blur-3xl" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" as const }} viewport={{ once: true }} className="text-center mb-14 md:mb-20 flex flex-col items-center gap-4 relative z-10">
        <span className="text-flame text-[12px] font-bold uppercase tracking-[0.18em]">Как работаем</span>
        <h2 className="font-display font-semibold text-[32px] md:text-[48px] text-center leading-[1.08] tracking-[-0.02em] max-w-3xl text-ink">
          <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="block">
            Сухая крыша
          </motion.span>
          <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="block italic text-flame">
            в 3 понятных шага
          </motion.span>
        </h2>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-16 md:mb-20 max-w-7xl mx-auto relative z-10">
        {/* ШАГ 01 */}
        <motion.div variants={stepVariants} className="flex flex-col gap-6 group cursor-default">
          <div className="rounded-2xl overflow-hidden relative aspect-[4/3] w-full shadow-lg">
            <img src={img("inspect.webp")} alt="Инженер осматривает плоскую кровлю" loading="lazy" className="object-cover w-full h-full absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute inset-0 flex items-center justify-center p-8 md:p-10">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="w-full h-full bg-white/20 backdrop-blur-2xl rounded-[15px] border border-white/30 p-5 flex flex-col justify-center gap-2 shadow-2xl shadow-black/5 overflow-hidden">
                <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0, y: [0, -2, 0] }} viewport={{ once: true }} transition={{ opacity: { delay: 0.4 }, x: { delay: 0.4 }, y: { duration: 3, repeat: Infinity as number, ease: "easeInOut" as const } }} className="bg-white/50 backdrop-blur-md rounded-[8px] border border-white/40 px-2 py-1.5 flex items-center gap-2 shadow-lg shadow-black/5">
                  <div className="w-5 h-5 rounded-[6px] bg-white/40 flex items-center justify-center shrink-0"><Ruler className="h-2.5 w-2.5 text-ink/70" /></div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold leading-none mb-0.5 text-ink">Замер площади</span>
                    <span className="text-[8px] text-ink/60 leading-none">лазерная рулетка</span>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="relative bg-white rounded-[8px] px-2.5 py-2 flex items-center gap-2 shadow-2xl shadow-flame/10 z-10 border border-flame/25 overflow-hidden">
                  <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 2.5, repeat: Infinity as number, ease: "linear" as const }} className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-flame/20 to-transparent -skew-x-12 pointer-events-none" />
                  <div className="w-7 h-7 rounded-[6px] bg-flame/10 flex items-center justify-center shrink-0">
                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity as number, ease: "easeInOut" as const }}>
                      <ScanSearch className="h-3.5 w-3.5 text-flame" />
                    </motion.div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold leading-none mb-1 text-ink">Поиск точки протечки</span>
                    <span className="text-[9px] text-stone leading-none">швы, примыкания, узлы</span>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0, y: [0, 2, 0] }} viewport={{ once: true }} transition={{ opacity: { delay: 0.6 }, x: { delay: 0.6 }, y: { duration: 3, repeat: Infinity as number, ease: "easeInOut" as const, delay: 0.5 } }} className="bg-white/50 backdrop-blur-md rounded-[8px] border border-white/40 px-2 py-1.5 flex items-center gap-2 shadow-lg shadow-black/5">
                  <div className="w-5 h-5 rounded-[6px] bg-white/40 flex items-center justify-center shrink-0">
                    <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity as number, ease: "easeInOut" as const }}>
                      <Camera className="h-2.5 w-2.5 text-ink/70" />
                    </motion.div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold leading-none mb-0.5 text-ink">Фотоотчёт дефектов</span>
                    <span className="text-[8px] text-ink/60 leading-none">отправим в мессенджер</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit rounded-full text-flame text-xs font-bold px-3 py-1 border border-flame">Шаг 01 · день 1</span>
            <h3 className="font-display text-2xl font-semibold leading-tight text-ink">Бесплатный осмотр</h3>
            <p className="text-base text-stone leading-relaxed">Инженер поднимается на крышу, находит причину протечки и снимает всё на фото. Вы видите проблему своими глазами.</p>
          </div>
        </motion.div>

        {/* ШАГ 02 */}
        <motion.div variants={stepVariants} className="flex flex-col gap-6 group cursor-default">
          <div className="rounded-2xl overflow-hidden relative aspect-[4/3] w-full shadow-lg">
            <img src={img("estimate.webp")} alt="Смета на ремонт кровли и договор подряда" loading="lazy" className="object-cover w-full h-full absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 flex items-center justify-center p-8 md:p-10">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="w-full h-full bg-ink/25 backdrop-blur-2xl rounded-[15px] border border-white/30 p-5 flex items-center justify-between shadow-2xl shadow-black/5 overflow-hidden">
                <div className="relative w-1/2 h-full flex items-center justify-center">
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity as number, ease: "easeInOut" as const }} className="w-3 h-3 rounded-full bg-amber shadow-[0_0_15px_#ffb547] z-10" />
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div key={i} initial={{ opacity: 0, scale: 0.2 }} animate={{ scale: [0.2, 1.8], opacity: [0, 0.6, 0] }} transition={{ duration: 4, repeat: Infinity as number, ease: "easeOut" as const, delay: i * 0.8 }} className="absolute border border-white/40 rounded-full" style={{ width: "100%", height: "100%" }} />
                    ))}
                    {[1, 2, 3, 4].map((i) => (
                      <div key={"s" + i} className="absolute border border-white/15 rounded-full" style={{ width: i * 25 + "%", height: i * 25 + "%" }} />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end pr-1">
                  {["Смета", "Договор", "Фикс. цена"].map((text, i) => (
                    <motion.div key={text} initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.1 }} className={"rounded-[8px] px-3 py-2 shadow-xl shadow-black/10 border flex items-center justify-center min-w-[88px] " + (i === 1 ? "bg-flame border-flame text-white" : "bg-white border-white text-ink")}>
                      <span className="text-[11px] font-bold tracking-tight leading-none">{text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit rounded-full text-flame text-xs font-bold px-3 py-1 border border-flame">Шаг 02 · день 1–2</span>
            <h3 className="font-display text-2xl font-semibold leading-tight text-ink">Смета и договор</h3>
            <p className="text-base text-stone leading-relaxed">Подробная смета по позициям и договор с гарантией. Цена фиксируется — никаких «ой, тут ещё нужно» в процессе.</p>
          </div>
        </motion.div>

        {/* ШАГ 03 */}
        <motion.div variants={stepVariants} className="flex flex-col gap-6 group cursor-default">
          <div className="rounded-2xl overflow-hidden relative aspect-[4/3] w-full shadow-lg">
            <img src={img("finished.webp")} alt="Отремонтированная плоская кровля с новой воронкой" loading="lazy" className="object-cover w-full h-full absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 flex items-center justify-center p-8 md:p-10">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="w-full h-full bg-white/20 backdrop-blur-2xl rounded-[15px] border border-white/30 p-5 flex flex-col justify-center gap-3 shadow-2xl shadow-black/5 overflow-hidden">
                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="bg-white rounded-[8px] p-2.5 flex flex-col gap-2 shadow-xl shadow-black/5 border border-white relative overflow-hidden">
                  <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 3, repeat: Infinity as number, ease: "linear" as const }} className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-flame/10 to-transparent -skew-x-12 pointer-events-none" />
                  {[
                    { t: "Подготовка основания", p: 100 },
                    { t: "Подкладочный слой", p: 100 },
                    { t: "Верхний слой", p: 100 },
                  ].map((r, i) => (
                    <div key={r.t} className="flex items-center gap-2">
                      <span className="text-[9px] font-semibold text-ink w-[92px] shrink-0 leading-none">{r.t}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-sand overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: r.p + "%" }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 + i * 0.35 }} className="h-full bg-fire rounded-full" />
                      </div>
                    </div>
                  ))}
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 1.6 }} className="bg-white rounded-[8px] px-3 py-1.5 w-fit shadow-lg shadow-black/5 border border-white flex items-center gap-2">
                  <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity as number }} className="w-1.5 h-1.5 rounded-full bg-leaf" />
                  <span className="text-[10px] font-bold tracking-tight leading-none text-ink">Акт и гарантия выданы</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit rounded-full text-flame text-xs font-bold px-3 py-1 border border-flame">Шаг 03 · по договору</span>
            <h3 className="font-display text-2xl font-semibold leading-tight text-ink">Ремонт и гарантия</h3>
            <p className="text-base text-stone leading-relaxed">Работаем своей бригадой, убираем мусор, сдаём по акту с фотоотчётом. Гарантия по договору — приедем бесплатно, если что-то не так.</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }} className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 relative z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            openLead({
              title: "Записаться на бесплатный осмотр",
              subtitle: "Выберем удобное время. Инженер приедет с оборудованием и фотоотчётом.",
              button: "Записаться на осмотр",
              source: "process-inspect",
              image: "inspect.webp",
              extra: "address",
              badge: "Шаг 01",
            })
          }
          className="w-full sm:w-auto rounded-full px-10 py-4 text-sm font-bold tracking-widest uppercase bg-fire text-white shadow-xl shadow-flame/25 hover:shadow-2xl hover:shadow-flame/35 transition-all duration-300"
        >
          Записаться на осмотр
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            openLead({
              title: "Получить прайс-лист",
              subtitle: "Пришлём полный прайс на кровельные работы в WhatsApp или Telegram по этому номеру.",
              button: "Прислать прайс",
              source: "process-price",
              image: "estimate.webp",
            })
          }
          className="w-full sm:w-auto rounded-full px-10 py-4 text-sm font-bold tracking-widest uppercase bg-white text-ink border border-sand shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Получить прайс
        </motion.button>
      </motion.div>
    </section>
  );
}
