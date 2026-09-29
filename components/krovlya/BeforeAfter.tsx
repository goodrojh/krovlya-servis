"use client";
import React, { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal, Check } from "lucide-react";
import { img } from "@/lib/site";
import { useLead } from "./LeadModal";

const changes = [
  "Сняли вздутия и сгнившие заплаты",
  "Просушили и прогрунтовали основание",
  "Наплавили новый ковёр в 2 слоя с посыпкой",
  "Завели материал на парапеты и вентшахту",
  "Поставили новую воронку — лужи ушли",
];

export default function BeforeAfter({ className }: { className?: string }) {
  const [pos, setPos] = useState(50);
  const [touched, setTouched] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const { openLead } = useLead();

  const move = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(2, Math.min(98, p)));
  }, []);

  return (
    <section id="result" className={"w-full bg-ink px-5 md:px-8 py-[90px] md:py-[130px] relative overflow-hidden grain " + (className || "")}>
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[400px] bg-flame/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-[1.6fr_1fr] gap-8 md:gap-12 items-center">
        <div className="order-2 lg:order-1">
          <div
            ref={box}
            className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-[24px] md:rounded-[32px] overflow-hidden select-none touch-pan-y cursor-ew-resize shadow-2xl"
            onPointerDown={(e) => {
              dragging.current = true;
              setTouched(true);
              (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
              move(e.clientX);
            }}
            onPointerMove={(e) => dragging.current && move(e.clientX)}
            onPointerUp={() => (dragging.current = false)}
            onPointerCancel={() => (dragging.current = false)}
          >
            <img src={img("after.webp")} alt="Плоская кровля после капитального ремонта" className="absolute inset-0 w-full h-full object-cover pointer-events-none" draggable={false} />
            <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <img src={img("before.webp")} alt="Плоская кровля до ремонта: вздутия и лужи" className="absolute inset-0 w-full h-full object-cover pointer-events-none" draggable={false} />
            </div>
            <span className="absolute top-4 left-4 rounded-full bg-black/60 backdrop-blur-md text-white text-[12px] font-bold uppercase tracking-[0.12em] px-3 py-1.5">Было</span>
            <span className="absolute top-4 right-4 rounded-full bg-fire text-white text-[12px] font-bold uppercase tracking-[0.12em] px-3 py-1.5">Стало</span>
            <div className="absolute top-0 bottom-0 w-[3px] bg-white shadow-[0_0_20px_rgba(0,0,0,0.5)] pointer-events-none" style={{ left: `calc(${pos}% - 1.5px)` }}>
              <motion.div
                animate={touched ? {} : { x: [-6, 6, -6] }}
                transition={{ duration: 1.6, repeat: Infinity as number, ease: "easeInOut" as const }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white text-ink flex items-center justify-center shadow-xl"
              >
                <MoveHorizontal className="w-6 h-6" />
              </motion.div>
            </div>
          </div>
          <p className="text-white/40 text-[13px] mt-3 text-center lg:text-left">Потяните ползунок — это одна и та же крыша</p>
        </div>

        <div className="order-1 lg:order-2">
          <span className="text-amber text-[12px] font-bold uppercase tracking-[0.18em]">До / после</span>
          <h2 className="font-display text-[32px] md:text-5xl font-semibold text-white leading-[1.08] tracking-[-0.02em] mt-4 mb-6">
            Крыша, которая <span className="italic text-fire">снова работает</span>
          </h2>
          <p className="text-white/60 leading-relaxed mb-6">Типичный капитальный ремонт кровли жилого дома. Что изменилось:</p>
          <ul className="flex flex-col gap-3 mb-8">
            {changes.map((c, i) => (
              <motion.li
                key={c}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="flex items-start gap-3 text-white/85"
              >
                <span className="w-6 h-6 rounded-full bg-leaf/20 text-leaf flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                {c}
              </motion.li>
            ))}
          </ul>
          <button
            onClick={() =>
              openLead({
                title: "Хочу такую же крышу",
                subtitle: "Инженер приедет, оценит состояние и предложит вариант: локальный ремонт или капитальный.",
                button: "Вызвать инженера",
                source: "before-after",
                image: "after.webp",
                extra: "area",
                badge: "Осмотр 0 ₽",
              })
            }
            className="w-full sm:w-auto rounded-full px-8 py-4 bg-white text-ink font-semibold hover:bg-amber transition-all hover:scale-[1.03] active:scale-95"
          >
            Хочу такую же крышу
          </button>
        </div>
      </div>
    </section>
  );
}
