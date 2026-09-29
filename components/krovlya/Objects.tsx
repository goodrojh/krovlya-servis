"use client";
import { motion } from "framer-motion";
import { img } from "@/lib/site";
import { useLead } from "./LeadModal";

const objects = [
  {
    id: "warehouse",
    image: "case-warehouse.webp",
    title: "Склады, ангары и производства",
    description: "Большие площади ремонтируем захватками — склад продолжает работать. Безнал, НДС, закрывающие документы.",
    tags: ["от 500 м²", "без остановки работы", "НДС"],
    cta: "Цена для склада",
  },
  {
    id: "mkd",
    image: "case-mkd.webp",
    title: "Жилые дома, УК и ТСЖ",
    description: "Протечки над верхними этажами и подъездами. Сметы для собрания жильцов, акты КС-2/КС-3, фотоотчёт для чата дома.",
    tags: ["сметы для ОСС", "КС-2 / КС-3", "фотоотчёт"],
    cta: "Смета для дома",
  },
  {
    id: "garage",
    image: "case-garage.webp",
    title: "Гаражи и гаражные кооперативы",
    description: "Один бокс или весь ряд сразу — при ремонте всего ряда цена за метр ниже. Работаем с председателями ГСК.",
    tags: ["от 1 бокса", "скидка за ряд", "1–2 дня"],
    cta: "Цена для гаража",
  },
];

export default function Objects({ className }: { className?: string }) {
  const { openLead } = useLead();
  return (
    <section id="objects" className={"bg-white py-[80px] md:py-24 px-5 md:px-20 " + (className || "")}>
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div className="max-w-2xl">
            <span className="text-flame text-[12px] font-bold uppercase tracking-[0.18em]">Объекты</span>
            <h2 className="font-display font-semibold text-[32px] md:text-[46px] text-ink leading-[1.08] tracking-[-0.02em] mt-3">С какими крышами работаем</h2>
          </div>
          <div className="relative group self-start md:self-end">
            <div className="absolute -bottom-[6px] right-0 w-[120px] h-[24px] bg-[radial-gradient(circle,_rgba(255,90,31,0.55),_rgba(255,181,71,0.3))] blur-[14px] rounded-full -z-10" />
            <button
              onClick={() =>
                openLead({
                  title: "Другой объект?",
                  subtitle: "Школа, ТЦ, котельная, частный дом с плоской крышей — расскажите, что у вас, и мы подскажем решение.",
                  button: "Обсудить объект",
                  source: "objects-other",
                  image: "finished.webp",
                  extra: "comment",
                })
              }
              className="bg-ink text-white rounded-[14px] px-6 py-3 text-[15px] font-semibold flex items-center gap-2 hover:bg-graphite transition-colors"
            >
              Другой объект <span className="text-[14px] leading-none">↳</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {objects.map((o) => (
            <motion.button
              key={o.id}
              whileHover={{ y: -3 }}
              onClick={() =>
                openLead({
                  title: o.title,
                  subtitle: o.description,
                  button: "Узнать цену",
                  source: "object-" + o.id,
                  image: o.image,
                  extra: "area",
                  context: "Объект: " + o.title,
                })
              }
              className="text-left bg-white border border-sand rounded-[18px] p-4 md:p-5 flex flex-col transition-all duration-200 hover:shadow-[0_12px_40px_rgba(12,13,15,0.1)] group"
            >
              <div className="w-full h-[230px] md:h-[250px] rounded-[12px] overflow-hidden mb-[18px] relative">
                <img src={img(o.image)} alt={o.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute left-3 bottom-3 flex flex-wrap gap-1.5">
                  {o.tags.map((t) => (
                    <span key={t} className="text-[11px] font-semibold text-white bg-black/55 backdrop-blur-md rounded-full px-2.5 py-1">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <h3 className="font-display font-semibold text-[18px] text-ink leading-[1.3] mb-2.5">{o.title}</h3>
              <p className="text-[14px] text-stone leading-[1.6] mb-5">{o.description}</p>
              <span className="mt-auto text-[14px] font-semibold text-flame inline-flex items-center gap-1.5 group-hover:gap-3 transition-all">
                {o.cta} <span className="text-[16px] leading-none">↳</span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
