"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Hammer, ShieldCheck, Wallet } from "lucide-react";
import { img } from "@/lib/site";
import { useLead } from "./LeadModal";

type Item = { question: string; answer: string };

const faqData: Record<string, Item[]> = {
  works: [
    { question: "Сколько стоит выезд инженера?", answer: "Бесплатно. Инженер приезжает в Москве и ближнем Подмосковье, осматривает крышу, делает фото дефектов и составляет смету. Вы ни к чему не обязаны." },
    { question: "Как быстро приедете, если течёт прямо сейчас?", answer: "Аварийную протечку стараемся локализовать в течение суток. Позвоните — диспетчер скажет точное время бригады на сегодня или завтра." },
    { question: "Можно ли ремонтировать крышу в дождь или зимой?", answer: "Наплавлять по мокрому основанию нельзя — будут вздутия. В дождь работаем только аварийно под укрытием. Зимой ремонтируем по сухому основанию с прогревом, при сильных морозах — временная герметизация до весны." },
    { question: "Сколько длится ремонт?", answer: "Локальный ремонт — 1 день. Кровля подъезда или небольшого дома — 2–5 дней. Склады от 1 000 м² — по графику из договора, обычно 7–14 дней." },
    { question: "Какие материалы используете?", answer: "Сертифицированные битумно-полимерные наплавляемые материалы российского производства: подкладочный слой и верхний с защитной посыпкой. В смете указываем марку каждого материала." },
    { question: "Нужно ли снимать старое покрытие?", answer: "Не всегда. Если основание сухое и ковёр держится — наплавляем поверх, это дешевле. Если под ковром вода или слоёв уже больше 5 — снимаем. Решает инженер по результатам осмотра и вскрытия." },
  ],
  guarantee: [
    { question: "Какая гарантия на работы?", answer: "От 2 лет на локальный ремонт до 10 лет на капитальный ремонт в два слоя. Срок прописываем в договоре." },
    { question: "Что будет, если после ремонта потечёт?", answer: "Приезжаем бесплатно по гарантии, находим причину и устраняем за свой счёт. Сроки реакции на гарантийный случай указаны в договоре." },
    { question: "Работаете по договору?", answer: "Всегда. Договор подряда, смета, акт выполненных работ. Для юрлиц и УК — КС-2, КС-3, счёт-фактура." },
    { question: "Как я узнаю, что работы сделаны качественно?", answer: "Присылаем фотоотчёт по каждому этапу: подготовка основания, праймер, первый и второй слой, примыкания. Можно подняться на крышу вместе с прорабом при приёмке." },
  ],
  payment: [
    { question: "Нужна ли предоплата?", answer: "Для физлиц — только на материалы, работу оплачиваете после приёмки. Для юрлиц — по условиям договора, возможна поэтапная оплата." },
    { question: "Как можно оплатить?", answer: "Наличными, переводом на карту, по счёту безналично с НДС или без." },
    { question: "Может ли цена вырасти в процессе?", answer: "Нет. Цена фиксируется в смете. Если при вскрытии найдём скрытые проблемы — сначала покажем их на фото и согласуем с вами, без самодеятельности." },
    { question: "Работаете с УК, ТСЖ и госзаказчиками?", answer: "Да. Готовим сметы для общего собрания собственников, работаем по безналу, предоставляем полный пакет закрывающих документов." },
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
    <section id="faq" className={"bg-paper py-[80px] md:py-[100px] px-5 md:px-[80px] " + (className || "")}>
      <div className="max-w-[820px] mx-auto">
        <div className="text-center mb-[36px]">
          <span className="text-flame text-[12px] font-bold uppercase tracking-[0.18em]">Вопросы</span>
          <h2 className="font-display text-[32px] md:text-[46px] font-semibold text-ink leading-[1.08] tracking-[-0.02em] mt-3 mb-[12px]">Отвечаем честно</h2>
          <p className="text-[16px] text-stone">То, что спрашивают до вызова инженера</p>
        </div>

        <div className="flex justify-center gap-[6px] border-b border-sand mb-[20px] overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setOpenIndex(0);
              }}
              className={"inline-flex items-center gap-[8px] px-[18px] py-[12px] text-[15px] transition-all border-b-2 whitespace-nowrap " + (activeTab === tab.id ? "text-flame font-semibold border-flame" : "text-stone font-medium border-transparent")}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div>
          {faqData[activeTab].map((item, index) => (
            <div key={activeTab + index} className="border-b border-sand py-[18px]">
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex justify-between items-center gap-4 text-left group">
                <span className="text-[16px] md:text-[17px] font-semibold text-ink group-hover:text-flame transition-colors">{item.question}</span>
                <span className={"w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors " + (openIndex === index ? "bg-flame text-white" : "bg-white text-stone")}>
                  {openIndex === index ? <X size={16} strokeWidth={2} /> : <Plus size={16} strokeWidth={2} />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div key="a" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" as const }} className="overflow-hidden">
                    <div className="pt-[12px] pb-[4px] text-[15px] text-[#5d5850] leading-[1.7] pr-10">{item.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-[44px] bg-ink rounded-[20px] p-[22px] md:p-[30px] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <div className="flex -space-x-[12px]">
              {["inspect.webp", "torch-close.webp", "case-garage.webp"].map((src, i) => (
                <img key={src} src={img(src)} alt="" className="w-[46px] h-[46px] rounded-full border-2 border-ink object-cover" style={{ zIndex: 3 - i }} />
              ))}
            </div>
            <div className="ml-[16px]">
              <p className="font-semibold text-[15px] text-white">Остались вопросы?</p>
              <p className="text-[14px] text-white/55">Инженер ответит по телефону за 5 минут</p>
            </div>
          </div>
          <button
            onClick={() =>
              openLead({
                title: "Задать вопрос инженеру",
                subtitle: "Напишите вопрос — инженер перезвонит и ответит без продаж и навязывания.",
                button: "Задать вопрос",
                source: "faq-question",
                image: "inspect.webp",
                extra: "comment",
              })
            }
            className="w-full md:w-auto group bg-fire text-white rounded-[16px] px-[24px] py-[14px] text-[15px] font-semibold transition-all hover:scale-[1.03] flex items-center justify-center gap-3"
          >
            Задать вопрос
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
              <path d="M7 7v6a2 2 0 0 0 2 2h9" />
              <path d="m15 11 4 4-4 4" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
