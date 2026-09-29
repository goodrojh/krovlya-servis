"use client";
import React, { useEffect, useRef } from "react";
import { Droplets, Layers, Layers3, CornerRightUp, CircleDot, Waves, Thermometer, Siren, ArrowUpRight } from "lucide-react";
import { useLead } from "./LeadModal";
import { SectionHeader, Button, container } from "./ui";

type Service = { id: string; name: string; description: string; price: string; icon: React.ReactNode; image: string };

const services: Service[] = [
  { id: "leak", name: "Устранение протечек", description: "Поиск места проникновения воды и локальный ремонт покрытия", price: "от 350 ₽/м²", icon: <Droplets className="w-6 h-6" />, image: "inspect.webp" },
  { id: "one", name: "Ремонт в один слой", description: "Новый верхний слой при сохранном основании", price: "от 550 ₽/м²", icon: <Layers className="w-6 h-6" />, image: "torch-close.webp" },
  { id: "capital", name: "Капитальный ремонт", description: "Устройство нового кровельного ковра в два слоя", price: "от 850 ₽/м²", icon: <Layers3 className="w-6 h-6" />, image: "finished.webp" },
  { id: "parapet", name: "Примыкания и парапеты", description: "Заведение материала на стену, прижимная рейка, фартук", price: "от 900 ₽/п. м", icon: <CornerRightUp className="w-6 h-6" />, image: "after.webp" },
  { id: "drains", name: "Водосточные воронки", description: "Прочистка, замена, установка воронок с обогревом", price: "от 3 500 ₽/шт.", icon: <CircleDot className="w-6 h-6" />, image: "finished.webp" },
  { id: "slope", name: "Разуклонка", description: "Устранение застоя воды на кровле", price: "по смете", icon: <Waves className="w-6 h-6" />, image: "before.webp" },
  { id: "insulation", name: "Утепление кровли", description: "Минераловатные или PIR-плиты под новый ковёр", price: "по смете", icon: <Thermometer className="w-6 h-6" />, image: "case-warehouse.webp" },
  { id: "emergency", name: "Аварийный выезд", description: "Локализация протечки в течение 24 часов", price: "по звонку", icon: <Siren className="w-6 h-6" />, image: "inspect.webp" },
];
const all = [...services, ...services];

export default function Services({ className }: { className?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { openLead } = useLead();

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let pos = el.scrollLeft;
    let visible = false;
    let paused = false;
    let resumeT: ReturnType<typeof setTimeout>;
    let last = 0;

    const loop = (t: number) => {
      const dt = last ? Math.min(t - last, 50) : 16;
      last = t;
      if (!paused) {
        pos += dt * 0.03;
        const half = el.scrollWidth / 2;
        if (pos >= half) pos -= half;
        el.scrollLeft = pos;
      }
      raf = requestAnimationFrame(loop);
    };
    const run = () => {
      cancelAnimationFrame(raf);
      last = 0;
      if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const pause = () => {
      paused = true;
      clearTimeout(resumeT);
    };
    const resume = (delay = 0) => {
      clearTimeout(resumeT);
      resumeT = setTimeout(() => {
        pos = el.scrollLeft;
        paused = false;
      }, delay);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      run();
    });
    io.observe(el);
    const onEnter = () => pause();
    const onLeave = () => resume(0);
    const onTouch = () => pause();
    const onTouchEnd = () => resume(2500);
    const onWheel = () => {
      pause();
      resume(2500);
    };
    const onVis = () => run();
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("touchstart", onTouch, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("focusin", onEnter);
    el.addEventListener("focusout", onLeave);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resumeT);
      io.disconnect();
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchstart", onTouch);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("focusin", onEnter);
      el.removeEventListener("focusout", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <section id="services" className={"bg-white py-20 md:py-28 overflow-hidden " + (className || "")}>
      <div className={container + " px-4 sm:px-6 md:px-8"}>
        <SectionHeader
          title="Работы по"
          accent="плоской кровле"
          lead="Протечки, текущий и капитальный ремонт, узлы и примыкания — для объектов любой площади."
          aside={
            <Button
              variant="dark"
              onClick={() =>
                openLead({
                  title: "Консультация инженера",
                  subtitle: "Опишите ситуацию — инженер перезвонит и порекомендует вид ремонта.",
                  button: "Получить консультацию",
                  source: "services-all",
                  image: "inspect.webp",
                  extra: "comment",
                })
              }
            >
              Консультация инженера
            </Button>
          }
        />
      </div>

      <div className="relative max-w-[1440px] mx-auto">
        <div className="absolute left-0 top-0 bottom-0 w-6 md:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-6 md:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <div ref={scrollRef} className="flex flex-row gap-4 overflow-x-auto pb-2 px-4 sm:px-6 md:px-8 no-scrollbar">
          {all.map((s, i) => (
            <button
              key={s.id + "-" + i}
              aria-hidden={i >= services.length || undefined}
              tabIndex={i >= services.length ? -1 : 0}
              onClick={() =>
                openLead({
                  title: s.name,
                  subtitle: s.description + ". Инженер уточнит стоимость для вашего объекта.",
                  button: "Узнать стоимость",
                  source: "service-" + s.id,
                  context: "Услуга: " + s.name + " · " + s.price,
                  extra: "area",
                  image: s.image,
                })
              }
              className="text-left shrink-0 w-[260px] md:w-[280px] bg-paper border border-sand rounded-3xl p-6 flex flex-col gap-3 transition-[border-color,background-color] duration-200 hover:bg-white hover:border-flame/40 group"
            >
              <span className="w-12 h-12 rounded-2xl bg-ink text-amber flex items-center justify-center mb-2 transition-colors group-hover:bg-flame group-hover:text-white">{s.icon}</span>
              <h3 className="font-semibold text-[17px] text-ink leading-snug">{s.name}</h3>
              <p className="text-[14px] text-stone leading-[1.5] min-h-[42px]">{s.description}</p>
              <div className="mt-auto pt-3 flex items-center justify-between gap-3 border-t border-sand">
                <span className="font-display text-[15px] font-semibold text-ink whitespace-nowrap">{s.price}</span>
                <span className="w-9 h-9 rounded-full bg-white border border-sand text-flame flex items-center justify-center shrink-0 transition-colors group-hover:bg-flame group-hover:text-white group-hover:border-flame">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
