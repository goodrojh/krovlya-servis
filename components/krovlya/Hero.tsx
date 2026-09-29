"use client";
import React, { useEffect, useRef, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, ShieldCheck, FileSignature, Camera, Building2 } from "lucide-react";
import Logo from "./Logo";
import Embers from "./Embers";
import { useLead } from "./LeadModal";
import { Button } from "./ui";
import { NAV, PHONE, PHONE_HREF, img } from "@/lib/site";

const gutter = "px-4 sm:px-6 md:px-8";

export default function Hero({ className }: { className?: string }) {
  const { openLead } = useLead();
  const [menu, setMenu] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    setShowVideo(wide && !calm && !saveData);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = 0.8;
    // Видео не крутится, когда первый экран не виден
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()));
    io.observe(v);
    return () => io.disconnect();
  }, [showVideo]);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  const callEngineer = () =>
    openLead({
      title: "Вызов инженера на объект",
      subtitle: "Инженер обследует кровлю, определит причину протечки и составит смету. Выезд бесплатный.",
      button: "Вызвать инженера",
      source: "hero-engineer",
      image: "inspect.webp",
      extra: "address",
    });

  const trust = [
    { icon: <ShieldCheck className="w-5 h-5" />, t: "Гарантия до 10 лет", s: "по договору подряда" },
    { icon: <FileSignature className="w-5 h-5" />, t: "Фиксированная смета", s: "стоимость не меняется" },
    { icon: <Camera className="w-5 h-5" />, t: "Фотоотчёт", s: "по каждому этапу работ" },
    { icon: <Building2 className="w-5 h-5" />, t: "Юрлица, УК и ТСЖ", s: "безнал, НДС, КС-2 / КС-3" },
  ];

  return (
    <>
      {/* Навигация — по ширине колонки текста */}
      <nav className={"fixed top-0 left-0 right-0 z-50 pt-3 md:pt-4 rise " + gutter} style={{ "--d": "0s" } as React.CSSProperties}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 p-2 md:p-2.5 rounded-full bg-ink/80 md:bg-ink/55 md:backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)]">
          <a href="#top" className="flex items-center pl-1.5 md:pl-2 shrink-0" aria-label="Кровля Сервис — наверх">
            <Logo />
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="text-[14px] font-medium text-white/75 hover:text-white transition-colors relative group py-1">
                {item.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-flame transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 md:gap-3 shrink-0">
            <a href={PHONE_HREF} className="hidden md:flex flex-col items-end leading-tight px-2">
              <span className="text-[15px] font-semibold text-white hover:text-amber transition-colors whitespace-nowrap">{PHONE}</span>
              <span className="text-[11px] text-white/60">ежедневно</span>
            </a>
            <a href={PHONE_HREF} aria-label="Позвонить" className="md:hidden w-11 h-11 rounded-full bg-fire flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </a>
            <button
              onClick={() =>
                openLead({
                  title: "Обратный звонок",
                  subtitle: "Оставьте номер телефона — инженер перезвонит и ответит на вопросы по вашему объекту.",
                  button: "Заказать звонок",
                  source: "nav-callback",
                  image: "torch-close.webp",
                })
              }
              className="hidden md:inline-flex h-11 items-center rounded-full px-5 text-[14px] font-semibold bg-white text-ink hover:bg-paper transition-colors whitespace-nowrap"
            >
              Заказать звонок
            </button>
            <button onClick={() => setMenu(true)} aria-label="Открыть меню" className="lg:hidden w-11 h-11 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <section id="top" className={"min-h-[100svh] flex flex-col bg-ink relative w-full overflow-hidden " + (className || "")}>
        <div className="absolute inset-0 z-0 overflow-hidden">
          <picture>
            <source media="(max-width: 767px)" srcSet={img("hero-mobile.webp")} width={828} height={1484} />
            <img
              src={img("hero.webp")}
              width={1920}
              height={1072}
              alt="Кровельщик наплавляет битумно-полимерный материал на плоской кровле"
              className="w-full h-full object-cover object-[70%_50%] kenburns"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          {showVideo && (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={img("hero.webp")}
              onCanPlayThrough={() => setVideoReady(true)}
              aria-hidden
              className={"absolute inset-0 w-full h-full object-cover object-[70%_50%] transition-opacity duration-1000 " + (videoReady ? "opacity-100" : "opacity-0")}
            >
              <source src={img("hero.mp4")} type="video/mp4" />
            </video>
          )}
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-ink/90 via-ink/55 to-ink/10" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-ink via-ink/10 to-ink/60" />
        <Embers className="absolute inset-0 w-full h-full z-[2]" />

        <div className={"relative flex-1 flex flex-col justify-center pt-[112px] md:pt-[140px] pb-10 md:pb-14 z-10 " + gutter}>
          <div className="max-w-7xl mx-auto w-full flex flex-col items-start">
            <h1
              className="rise-y font-display font-semibold text-[34px] leading-[1.08] sm:text-5xl md:text-6xl lg:text-[68px] md:leading-[1.04] tracking-[-0.03em] text-white max-w-[900px] mb-5 md:mb-6 text-balance"
              style={{ "--d": "0.05s" } as React.CSSProperties}
            >
              Ремонт плоской кровли <span className="text-amber">с&nbsp;гарантией до&nbsp;10&nbsp;лет</span>
            </h1>

            <p className="rise-y text-[16px] md:text-lg text-white/80 max-w-[560px] leading-relaxed mb-8" style={{ "--d": "0.15s" } as React.CSSProperties}>
              Устранение протечек, текущий и&nbsp;капитальный ремонт наплавляемыми битумно-полимерными материалами в&nbsp;Москве и&nbsp;Московской области.
            </p>

            <div className="rise flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto" style={{ "--d": "0.25s" } as React.CSSProperties}>
              <Button arrow onClick={callEngineer}>Вызвать инженера</Button>
              <Button
                variant="ghost"
                onClick={() =>
                  openLead({
                    title: "Расчёт стоимости ремонта",
                    subtitle: "Укажите площадь кровли — инженер подготовит предварительный расчёт и свяжется с вами.",
                    button: "Получить расчёт",
                    source: "hero-calc",
                    image: "estimate.webp",
                    extra: "area",
                  })
                }
              >
                Рассчитать стоимость
              </Button>
            </div>
            <span className="rise text-[14px] text-white/65 mt-4" style={{ "--d": "0.32s" } as React.CSSProperties}>
              Выезд инженера и&nbsp;составление сметы — бесплатно
            </span>

            <ul className="mt-12 md:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-3 w-full">
              {trust.map((t, i) => (
                <li
                  key={t.t}
                  className="rise flex items-center gap-3 rounded-2xl bg-ink/70 md:bg-white/[0.07] md:backdrop-blur-xl border border-white/10 p-3 md:p-4"
                  style={{ "--d": 0.4 + i * 0.07 + "s" } as React.CSSProperties}
                >
                  <span className="w-10 h-10 rounded-xl bg-flame/15 text-amber flex items-center justify-center shrink-0">{t.icon}</span>
                  <span className="flex flex-col min-w-0">
                    <span className="text-[13px] md:text-[15px] font-semibold text-white leading-tight">{t.t}</span>
                    <span className="text-[12px] md:text-[13px] text-white/65 leading-tight mt-1">{t.s}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Мобильное меню */}
      <AnimatePresence>
        {menu && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] bg-ink flex flex-col px-4 sm:px-6 pt-3 pb-6"
            role="dialog"
            aria-modal="true"
            aria-label="Меню"
          >
            <div className="flex items-center justify-between p-2">
              <Logo />
              <button onClick={() => setMenu(false)} aria-label="Закрыть меню" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex flex-col mt-8">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setMenu(false)} className="font-display text-[26px] text-white py-4 border-b border-white/10">
                  {n.label}
                </a>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3">
              <a href={PHONE_HREF} className="h-[52px] rounded-full bg-white text-ink font-semibold flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" /> {PHONE}
              </a>
              <Button
                full
                onClick={() => {
                  setMenu(false);
                  callEngineer();
                }}
              >
                Вызвать инженера
              </Button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
