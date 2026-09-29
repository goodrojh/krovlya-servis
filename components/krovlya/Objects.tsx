"use client";
import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { img } from "@/lib/site";
import { useLead } from "./LeadModal";
import { SectionHeader, Button, container, sectionPad } from "./ui";

const objects = [
  {
    id: "warehouse",
    image: "case-warehouse.webp",
    title: "Склады и производственные здания",
    description: "Ремонт больших площадей захватками без остановки работы объекта. Безналичный расчёт, НДС, закрывающие документы.",
    tags: ["от 500 м²", "без остановки работы"],
  },
  {
    id: "mkd",
    image: "case-mkd.webp",
    title: "Многоквартирные дома",
    description: "Для управляющих компаний и ТСЖ: сметы для общего собрания собственников, акты КС-2 / КС-3, фотоотчёт.",
    tags: ["УК и ТСЖ", "КС-2 / КС-3"],
  },
  {
    id: "garage",
    image: "case-garage.webp",
    title: "Гаражи и гаражные кооперативы",
    description: "Ремонт отдельного бокса или всего ряда. При ремонте ряда стоимость за квадратный метр ниже.",
    tags: ["от одного бокса", "1–2 дня"],
  },
];

export default function Objects({ className }: { className?: string }) {
  const { openLead } = useLead();
  return (
    <section id="objects" className={"bg-white " + sectionPad + " " + (className || "")}>
      <div className={container}>
        <SectionHeader
          title="Типы"
          accent="объектов"
          lead="Работаем с физическими и юридическими лицами на объектах любой площади."
          aside={
            <Button
              variant="dark"
              onClick={() =>
                openLead({
                  title: "Другой тип объекта",
                  subtitle: "Школы, торговые центры, котельные, частные дома с плоской кровлей. Опишите объект — инженер свяжется с вами.",
                  button: "Отправить заявку",
                  source: "objects-other",
                  image: "finished.webp",
                  extra: "comment",
                })
              }
            >
              Другой объект
            </Button>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4 lg:gap-6">
          {objects.map((o, i) => (
            <m.button
              key={o.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() =>
                openLead({
                  title: o.title,
                  subtitle: o.description,
                  button: "Запросить расчёт",
                  source: "object-" + o.id,
                  image: o.image,
                  extra: "area",
                  context: "Объект: " + o.title,
                })
              }
              className="text-left bg-paper border border-sand rounded-3xl p-4 flex flex-col transition-[border-color,box-shadow] duration-200 hover:border-flame/40 hover:shadow-[0_16px_40px_-20px_rgba(12,13,15,0.25)] group"
            >
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 relative bg-sand">
                <img src={img(o.image)} alt={o.title} loading="lazy" decoding="async" width={1000} height={747} className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-105" />
                <div className="absolute left-3 bottom-3 flex flex-wrap gap-1.5">
                  {o.tags.map((t) => (
                    <span key={t} className="text-[12px] font-semibold text-white bg-black/65 rounded-full px-2.5 py-1">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="px-1 flex flex-col flex-1">
                <h3 className="font-display font-semibold text-[19px] text-ink leading-[1.3] mb-2">{o.title}</h3>
                <p className="text-[15px] text-stone leading-[1.6] mb-5">{o.description}</p>
                <span className="mt-auto text-[15px] font-semibold text-flame-dark inline-flex items-center gap-1.5">
                  Запросить расчёт <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </m.button>
          ))}
        </div>
      </div>
    </section>
  );
}
