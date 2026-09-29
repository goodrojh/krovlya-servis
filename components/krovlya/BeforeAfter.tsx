"use client";
import React, { useCallback, useRef, useState } from "react";
import { m } from "framer-motion";
import { MoveHorizontal, Check } from "lucide-react";
import { img } from "@/lib/site";
import { useLead } from "./LeadModal";
import { Button, container, sectionPad } from "./ui";

const changes = [
  "Демонтаж вздутий и старых заплат",
  "Просушка и грунтовка основания праймером",
  "Наплавление нового ковра в два слоя",
  "Примыкания к парапетам и вентшахте",
  "Замена водосточной воронки",
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
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <section id="result" className={"w-full bg-ink relative overflow-hidden grain " + sectionPad + " " + (className || "")}>
      <div className={container + " relative z-10 grid lg:grid-cols-[1.55fr_1fr] gap-10 lg:gap-14 items-center"}>
        <div className="order-2 lg:order-1">
          <div
            ref={box}
            role="slider"
            tabIndex={0}
            aria-label="Сравнение кровли до и после ремонта"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
              if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
              setTouched(true);
            }}
            className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-3xl overflow-hidden select-none touch-pan-y cursor-ew-resize bg-graphite"
            onPointerDown={(e) => {
              dragging.current = true;
              setTouched(true);
              e.currentTarget.setPointerCapture(e.pointerId);
              move(e.clientX);
            }}
            onPointerMove={(e) => dragging.current && move(e.clientX)}
            onPointerUp={() => (dragging.current = false)}
            onPointerCancel={() => (dragging.current = false)}
          >
            <img src={img("after.webp")} alt="Кровля после капитального ремонта" loading="lazy" decoding="async" width={1400} height={781} className="absolute inset-0 w-full h-full object-cover pointer-events-none" draggable={false} />
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <img src={img("before.webp")} alt="Кровля до ремонта: вздутия и застой воды" loading="lazy" decoding="async" width={1400} height={781} className="absolute inset-0 w-full h-full object-cover pointer-events-none" draggable={false} />
            </div>
            <span className="absolute top-3 left-3 md:top-4 md:left-4 rounded-full bg-black/65 text-white text-[12px] font-bold uppercase tracking-[0.1em] px-3 py-1.5">До</span>
            <span className="absolute top-3 right-3 md:top-4 md:right-4 rounded-full bg-flame text-white text-[12px] font-bold uppercase tracking-[0.1em] px-3 py-1.5">После</span>
            <div className="absolute top-0 bottom-0 w-[3px] -ml-[1.5px] bg-white pointer-events-none" style={{ left: `${pos}%` }}>
              <m.div
                animate={touched ? { x: 0 } : { x: [-6, 6, -6] }}
                transition={touched ? { duration: 0.2 } : { duration: 1.6, repeat: Infinity as number, ease: "easeInOut" as const }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white text-ink flex items-center justify-center shadow-xl"
              >
                <MoveHorizontal className="w-5 h-5 md:w-6 md:h-6" />
              </m.div>
            </div>
          </div>
          <p className="text-white/60 text-[13px] mt-3">Перетащите разделитель, чтобы сравнить состояние кровли. Иллюстрация типового объёма работ.</p>
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="font-display text-[28px] sm:text-[34px] md:text-[44px] font-semibold text-white leading-[1.1] tracking-[-0.02em] text-balance">
            Капитальный ремонт <span className="text-amber">кровли жилого дома</span>
          </h2>
          <p className="text-white/70 text-[16px] md:text-[17px] leading-relaxed mt-5 mb-6">Состав работ:</p>
          <ul className="flex flex-col gap-3 mb-8">
            {changes.map((c) => (
              <li key={c} className="flex items-start gap-3 text-white/90 text-[15px] md:text-base">
                <span className="w-6 h-6 rounded-full bg-leaf/20 text-leaf flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                {c}
              </li>
            ))}
          </ul>
          <Button
            variant="light"
            arrow
            onClick={() =>
              openLead({
                title: "Расчёт ремонта для вашего объекта",
                subtitle: "Инженер оценит состояние кровли и предложит вариант ремонта: локальный или капитальный.",
                button: "Вызвать инженера",
                source: "before-after",
                image: "after.webp",
                extra: "area",
              })
            }
          >
            Рассчитать для своего объекта
          </Button>
        </div>
      </div>
    </section>
  );
}
