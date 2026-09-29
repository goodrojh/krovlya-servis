"use client";
import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Plus, Hammer, ShieldCheck, Wallet } from "lucide-react";
import { useLead } from "./LeadModal";
import { SectionHeader, Button, container, sectionPad } from "./ui";

type Item = { question: string; answer: string };

const faqData: Record<string, Item[]> = {
  works: [
    { question: "Сколько стоит выезд инженера?", answer: "Выезд бесплатный. Инженер осматривает кровлю, выполняет фотофиксацию дефектов и составляет смету. Заказчик ни к чему не обязан." },
    { question: "Как быстро выезжает бригада при аварийной протечке?", answer: "Аварийную протечку локализуем в течение 24 часов. Точное время выезда бригады сообщает диспетчер при звонке." },
    { question: "Выполняются ли работы в дождь и зимой?", answer: "Наплавление на влажное основание не допускается. В дождь выполняются только аварийные работы. Зимой ремонт ведётся по сухому основанию с прогревом; при сильных морозах выполняется временная герметизация до весны." },
    { question: "Сколько длится ремонт?", answer: "Локальный ремонт — 1 день. Кровля подъезда или небольшого дома — 2–5 дней. Объекты от 1 000 м² — по графику договора, как правило 7–14 дней." },
    { question: "Какие материалы применяются?", answer: "Сертифицированные битумно-полимерные наплавляемые материалы: подкладочный слой и верхний слой с защитной посыпкой. Марка каждого материала указывается в смете." },
    { question: "Требуется ли демонтаж старого покрытия?", answer: "Не всегда. При сухом основании и прочном сцеплении материал наплавляется поверх существующего. При наличии влаги под ковром или большом количестве слоёв выполняется демонтаж. Решение принимается по результатам осмотра и вскрытия." },
  ],
  guarantee: [
    { question: "Какая гарантия на работы?", answer: "От 2 лет на локальный ремонт до 10 лет на капитальный ремонт в два слоя. Гарантийный срок указывается в договоре." },
    { question: "Что происходит при протечке в гарантийный период?", answer: "Выезжаем бесплатно, устанавливаем причину и устраняем дефект за свой счёт. Сроки реагирования на гарантийный случай указаны в договоре." },
    { question: "Работаете по договору?", answer: "Да. Договор подряда, смета, акт выполненных работ. Для юридических лиц и УК — КС-2, КС-3, счёт-фактура." },
    { question: "Как контролировать качество работ?", answer: "Фотоотчёт предоставляется по каждому этапу: подготовка основания, праймер, первый и второй слой, примыкания. Приёмка работ возможна совместно с прорабом на кровле." },
  ],
  payment: [
    { question: "Нужна ли предоплата?", answer: "Для физических лиц — только на материалы, работы оплачиваются после приёмки. Для юридических лиц — по условиям договора, возможна поэтапная оплата." },
    { question: "Какие способы оплаты доступны?", answer: "Наличный расчёт, перевод на карту, безналичный расчёт по счёту с НДС или без НДС." },
    { question: "Может ли стоимость измениться в ходе работ?", answer: "Нет. Стоимость фиксируется в смете. Если при вскрытии обнаружены скрытые дефекты, дополнительные работы согласовываются с заказчиком заранее, с фотофиксацией." },
    { question: "Работаете с УК, ТСЖ и госзаказчиками?", answer: "Да. Готовим сметы для общего собрания собственников, работаем по безналичному расчёту, предоставляем полный пакет закрывающих документов." },
  ],
};

const tabs = [
  { id: "works", label: "Работы", icon: <Hammer className="w-4 h-4" /> },
  { id: "guarantee", label: "Гарантия", icon: <ShieldCheck className="w-4 h-4" /> },
  { id: "payment", label: "Оплата", icon: <Wallet className="w-4 h-4" /> },
];

export default function FAQ({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState("works");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { openLead } = useLead();

  return (
    <section id="faq" className={"bg-paper " + sectionPad + " " + (className || "")}>
      <div className={container + " grid lg:grid-cols-[1fr_1.6fr] gap-8 lg:gap-16"}>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader title="Частые" accent="вопросы" />
          <div className="-mt-4 md:-mt-6 rounded-3xl bg-ink p-6 flex flex-col gap-4">
            <div>
              <p className="font-semibold text-[16px] text-white">Не нашли ответ?</p>
              <p className="text-[15px] text-white/70 mt-1">Инженер проконсультирует по телефону.</p>
            </div>
            <Button
              arrow
              onClick={() =>
                openLead({
                  title: "Вопрос инженеру",
                  subtitle: "Опишите вопрос — инженер перезвонит и проконсультирует.",
                  button: "Отправить вопрос",
                  source: "faq-question",
                  image: "inspect.webp",
                  extra: "comment",
                })
              }
            >
              Задать вопрос
            </Button>
          </div>
        </div>

        <div>
          <div role="tablist" aria-label="Темы вопросов" className="flex gap-1 border-b border-sand mb-2 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setOpenIndex(0);
                }}
                className={"inline-flex items-center gap-2 px-4 min-h-[48px] text-[15px] transition-colors border-b-2 -mb-px whitespace-nowrap " + (activeTab === tab.id ? "text-flame-dark font-semibold border-flame" : "text-stone font-medium border-transparent hover:text-ink")}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div role="tabpanel">
            {faqData[activeTab].map((item, index) => {
              const open = openIndex === index;
              return (
                <div key={activeTab + index} className="border-b border-sand">
                  <button onClick={() => setOpenIndex(open ? null : index)} aria-expanded={open} className="w-full flex justify-between items-center gap-4 text-left py-5 group">
                    <span className="text-[16px] md:text-[17px] font-semibold text-ink group-hover:text-flame transition-colors">{item.question}</span>
                    <span className={"w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-[transform,background-color,color] duration-300 " + (open ? "bg-flame text-white rotate-45" : "bg-white text-stone")}>
                      <Plus size={16} strokeWidth={2} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <m.div key="a" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: "easeOut" as const }} className="overflow-hidden">
                        <p className="pb-5 text-[15px] md:text-base text-stone leading-[1.7] pr-12">{item.answer}</p>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
