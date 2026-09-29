"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Droplets, Hammer, Layers, CornerRightUp, CircleDot, Waves, Thermometer, Warehouse, Building, Car, Store, Siren } from "lucide-react";
import { useLead } from "./LeadModal";

type Service = { id: string; name: string; description: string; price: string; icon: React.ReactNode; hot?: boolean };

const services: Service[] = [
  { id: "leak", name: "Устранение протечек", description: "Находим точку входа воды и закрываем её за 1 день", price: "от 350 ₽/м²", icon: <Droplets className="w-6 h-6" />, hot: true },
  { id: "current", name: "Текущий ремонт", description: "Заплаты, вздутия, трещины, разошедшиеся швы", price: "от 350 ₽/м²", icon: <Hammer className="w-6 h-6" /> },
  { id: "capital", name: "Капитальный ремонт", description: "Новый двухслойный ковёр на 15–25 лет", price: "от 850 ₽/м²", icon: <Layers className="w-6 h-6" /> },
  { id: "parapet", name: "Примыкания и парапеты", description: "Заводка на стену, прижимная рейка, новый фартук", price: "от 900 ₽/п.м", icon: <CornerRightUp className="w-6 h-6" /> },
  { id: "drains", name: "Кровельные воронки", description: "Прочистка, замена, обогрев воронок", price: "от 3 500 ₽/шт", icon: <CircleDot className="w-6 h-6" /> },
  { id: "slope", name: "Разуклонка", description: "Убираем застой воды и лужи на крыше", price: "по смете", icon: <Waves className="w-6 h-6" /> },
  { id: "insulation", name: "Утепление кровли", description: "Минвата или PIR-плиты под новый ковёр", price: "по смете", icon: <Thermometer className="w-6 h-6" /> },
  { id: "emergency", name: "Аварийный выезд", description: "Локализуем протечку в течение суток", price: "по звонку", icon: <Siren className="w-6 h-6" />, hot: true },
  { id: "warehouse", name: "Склады и ангары", description: "Большие площади, работа без остановки склада", price: "от 700 ₽/м²", icon: <Warehouse className="w-6 h-6" /> },
  { id: "mkd", name: "Жилые дома, УК и ТСЖ", description: "Договор, акты КС-2/КС-3, отчёт для жильцов", price: "по смете", icon: <Building className="w-6 h-6" /> },
  { id: "garage", name: "Гаражи и ГСК", description: "Отдельный бокс или весь ряд целиком", price: "от 450 ₽/м²", icon: <Car className="w-6 h-6" /> },
  { id: "retail", name: "Магазины и офисы", description: "Работаем в выходные и ночью, без шума в часы работы", price: "по смете", icon: <Store className="w-6 h-6" /> },
];
const all = [...services, ...services];

export default function Services({ className }: { className?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const scrollPos = useRef(0);
  const { openLead } = useLead();

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf: number;
    const auto = () => {
      if (!isHovered) {
        scrollPos.current += 0.5;
        if (scrollPos.current >= el.scrollWidth / 2) scrollPos.current = 0;
        el.scrollLeft = scrollPos.current;
      } else {
        scrollPos.current = el.scrollLeft;
      }
      raf = requestAnimationFrame(auto);
    };
    raf = requestAnimationFrame(auto);
    return () => cancelAnimationFrame(raf);
  }, [isHovered]);

  return (
    <section id="services" className={"bg-white py-[80px] md:py-24 px-5 md:px-20 overflow-hidden " + (className || "")}>
      <div className="max-w-[1300px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div className="flex-1">
            <span className="text-flame text-[12px] font-bold uppercase tracking-[0.18em]">Услуги</span>
            <h2 className="font-display font-semibold text-[32px] md:text-[44px] text-ink mt-3 mb-2 leading-[1.08] tracking-[-0.02em]">Любые работы по плоской кровле</h2>
            <p className="text-[15px] text-stone">От одной протечки над подъездом до крыши склада в 5 000 м²</p>
          </div>
          <button
            onClick={() =>
              openLead({
                title: "Подобрать решение для вашей крыши",
                subtitle: "Не знаете, какая услуга нужна? Опишите ситуацию — инженер подскажет по телефону.",
                button: "Получить консультацию",
                source: "services-all",
                image: "case-warehouse.webp",
                extra: "comment",
              })
            }
            className="rounded-full px-6 py-3 text-sm font-semibold text-white bg-ink hover:bg-flame transition-colors"
          >
            Не знаю, что нужно — помогите
          </button>
        </div>

        <div className="relative -mx-5 md:mx-0">
          <div className="absolute left-0 top-0 bottom-0 w-10 md:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-10 md:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div
            ref={scrollRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setTimeout(() => setIsHovered(false), 2500)}
            className="flex flex-row gap-4 overflow-x-auto pb-4 px-5 md:px-0 no-scrollbar cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
          >
            {all.map((s, i) => (
              <motion.button
                key={s.id + "-" + i}
                whileHover={{ y: -4 }}
                onClick={() =>
                  openLead({
                    title: s.name,
                    subtitle: s.description + ". Узнайте точную цену для вашего объекта — инженер перезвонит.",
                    button: "Узнать цену",
                    source: "service-" + s.id,
                    context: "Услуга: " + s.name + " · " + s.price,
                    extra: "area",
                    image: s.id === "garage" ? "case-garage.webp" : s.id === "mkd" ? "case-mkd.webp" : s.id === "warehouse" ? "case-warehouse.webp" : "torch-close.webp",
                  })
                }
                className="text-left min-w-[240px] md:min-w-[270px] bg-paper border border-sand rounded-[18px] p-6 md:p-7 flex flex-col gap-3 transition-all duration-200 hover:bg-white hover:shadow-[0_8px_30px_rgba(12,13,15,0.08)] hover:border-flame/30 group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="w-12 h-12 rounded-2xl bg-ink text-amber flex items-center justify-center group-hover:bg-fire group-hover:text-white transition-colors">{s.icon}</span>
                  {s.hot && <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-flame bg-flame/10 rounded-full px-2.5 py-1">часто</span>}
                </div>
                <h3 className="font-bold text-[16px] text-ink">{s.name}</h3>
                <p className="text-[13px] text-stone leading-[1.5] min-h-[40px]">{s.description}</p>
                <div className="mt-auto pt-2 flex items-center justify-between">
                  <span className="font-display text-[15px] font-semibold text-ink whitespace-nowrap">{s.price}</span>
                  <span className="w-9 h-9 rounded-full bg-white border border-sand text-flame flex items-center justify-center shrink-0 group-hover:bg-fire group-hover:text-white group-hover:border-transparent transition-colors">&#x2197;</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
