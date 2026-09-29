"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, ShieldCheck, FileSignature, Camera, Building2, ArrowRight, CloudRain } from "lucide-react";
import Logo from "./Logo";
import Embers from "./Embers";
import { useLead } from "./LeadModal";
import { NAV, PHONE, PHONE_HREF, img } from "@/lib/site";

function useSeason() {
  const [s, setS] = useState<{ tag: string; text: string } | null>(null);
  useEffect(() => {
    const now = new Date();
    const m = now.getMonth();
    const y = now.getFullYear();
    const days = (to: Date) => Math.max(1, Math.ceil((to.getTime() - now.getTime()) / 86400000));
    if (m >= 8 && m <= 10) {
      const d = days(new Date(y, 10, 15));
      setS({ tag: `~${d} дн. до снега`, text: "Успейте закрыть протечки до зимы — потом талая вода найдёт каждую щель" });
    } else if (m === 11 || m <= 1) {
      setS({ tag: "Зимний сезон", text: "Аварийно устраняем протечки и зимой — готовим крышу к весеннему таянию" });
    } else if (m <= 4) {
      setS({ tag: "Таяние снега", text: "Весна — пик протечек. Осмотрим крышу до того, как потечёт по стенам" });
    } else {
      setS({ tag: "Лучший сезон", text: "Сухо и тепло — идеальное время для капитального ремонта кровли" });
    }
  }, []);
  return s;
}

function useTomorrow() {
  const [t, setT] = useState("");
  useEffect(() => {
    const d = new Date(Date.now() + 86400000);
    setT(d.toLocaleDateString("ru-RU", { day: "numeric", month: "long" }));
  }, []);
  return t;
}

export default function Hero({ className }: { className?: string }) {
  const { openLead } = useLead();
  const [menu, setMenu] = useState(false);
  const season = useSeason();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShowVideo(wide && !calm);
  }, []);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.8;
  }, [showVideo]);
  const tomorrow = useTomorrow();

  const callEngineer = () =>
    openLead({
      title: "Вызвать инженера на объект",
      subtitle: "Приедем, поднимемся на крышу, найдём причину протечки и составим смету. Бесплатно и без обязательств.",
      button: "Вызвать инженера бесплатно",
      source: "hero-engineer",
      image: "inspect.webp",
      extra: "address",
      badge: "Выезд 0 ₽",
    });

  const trust = [
    { icon: <ShieldCheck className="w-5 h-5" />, t: "Гарантия", s: "по договору до 10 лет" },
    { icon: <FileSignature className="w-5 h-5" />, t: "Фиксированная смета", s: "цена не растёт в процессе" },
    { icon: <Camera className="w-5 h-5" />, t: "Фотоотчёт", s: "каждого этапа работ" },
    { icon: <Building2 className="w-5 h-5" />, t: "УК, ТСЖ, юрлица", s: "безнал, НДС, закрывающие" },
  ];

  return (
    <>
      <section className={"min-h-[100svh] md:min-h-[106vh] flex flex-col bg-ink relative w-full overflow-hidden " + (className || "")}>
        {/* Фон: кровельщик с горелкой */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <picture>
            <source media="(max-width: 767px)" srcSet={img("hero-mobile.webp")} />
            <img src={img("hero.webp")} alt="Кровельщик наплавляет битумную мембрану на плоской крыше в Москве" className="w-full h-full object-cover object-[70%_50%] kenburns" fetchPriority="high" />
          </picture>
          {showVideo && (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              poster={img("hero.webp")}
              onCanPlay={() => setVideoReady(true)}
              className={"absolute inset-0 w-full h-full object-cover object-[70%_50%] transition-opacity duration-1000 " + (videoReady ? "opacity-100" : "opacity-0")}
            >
              <source src={img("hero.mp4")} type="video/mp4" />
            </video>
          )}
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-ink/85 via-ink/45 to-ink/10" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-ink via-transparent to-ink/50" />
        <Embers className="absolute inset-0 w-full h-full z-[2]" />

        {/* Навигация */}
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
          className="fixed top-0 left-0 right-0 z-50 px-3 md:px-8 pt-3 md:pt-5"
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between p-[8px] md:p-[10px] rounded-full bg-ink/55 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]">
            <a href="#top" className="flex-1 flex items-center pl-1.5 md:pl-2 flex-shrink-0 whitespace-nowrap">
              <Logo />
            </a>

            <div className="hidden lg:flex items-center gap-7 flex-shrink-0">
              {NAV.map((item) => (
                <a key={item.href} href={item.href} className="text-[14px] font-medium text-white/70 hover:text-white transition-colors relative group">
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-flame transition-all group-hover:w-full" />
                </a>
              ))}
            </div>

            <div className="flex-1 flex items-center justify-end gap-2 md:gap-3 flex-shrink-0 whitespace-nowrap">
              <a href={PHONE_HREF} className="hidden md:flex flex-col items-end leading-tight px-2">
                <span className="text-[15px] font-semibold text-white hover:text-amber transition-colors">{PHONE}</span>
                <span className="text-[11px] text-white/45">звонок бесплатный</span>
              </a>
              <a href={PHONE_HREF} aria-label="Позвонить" className="md:hidden w-11 h-11 rounded-full bg-fire flex items-center justify-center relative">
                <span className="absolute inset-0 rounded-full bg-flame/60 pulse-ring" />
                <Phone className="w-5 h-5 text-white relative" />
              </a>
              <button
                onClick={() =>
                  openLead({
                    title: "Перезвоним за 15 минут",
                    subtitle: "Оставьте номер — инженер перезвонит, задаст пару вопросов о крыше и скажет порядок цен.",
                    button: "Жду звонка",
                    source: "nav-callback",
                    image: "torch-close.webp",
                  })
                }
                className="hidden md:inline-flex rounded-full px-5 py-2.5 text-[14px] font-semibold bg-white text-ink hover:bg-amber transition-all hover:scale-105 active:scale-95"
              >
                Заказать звонок
              </button>
              <button onClick={() => setMenu(true)} aria-label="Меню" className="lg:hidden w-11 h-11 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.nav>

        <div id="top" className="relative flex-1 flex flex-col justify-center px-5 md:px-8 pt-[120px] md:pt-[150px] pb-10 md:pb-16 z-10">
          <div className="max-w-6xl mx-auto w-full flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
              className="inline-flex items-center gap-2.5 rounded-full bg-white/10 backdrop-blur-lg border border-white/15 pl-2 pr-4 py-1.5 mb-6"
            >
              <span className="relative flex w-2.5 h-2.5 ml-1">
                <span className="absolute inset-0 rounded-full bg-leaf pulse-ring" />
                <span className="relative w-2.5 h-2.5 rounded-full bg-leaf" />
              </span>
              <span className="text-[12px] md:text-[13px] text-white/85">
                Принимаем заявки сегодня{tomorrow && <> · выезд инженера <b className="text-white font-semibold">{tomorrow}</b></>}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" as const }}
              className="font-display font-semibold text-[38px] sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.02] tracking-[-0.03em] text-white max-w-4xl mb-5"
            >
              Крыша течёт?
              <br />
              Остановим протечку <span className="italic text-fire">за&nbsp;24&nbsp;часа</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" as const }}
              className="text-base md:text-lg text-white/80 max-w-[560px] leading-relaxed mb-8"
            >
              Ремонт плоской кровли наплавляемыми материалами в Москве и области. Инженер приедет бесплатно, найдёт причину и назовёт точную цену в день осмотра.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" as const }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto"
            >
              <button
                onClick={callEngineer}
                className="group rounded-full pl-7 pr-2 py-2 text-base font-semibold bg-fire text-white transition-all hover:scale-[1.03] active:scale-95 flex items-center justify-between sm:justify-start gap-4"
                style={{ boxShadow: "0 14px 44px -8px rgba(255, 90, 31, 0.65)" }}
              >
                Вызвать инженера бесплатно
                <span className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </button>
              <button
                onClick={() =>
                  openLead({
                    title: "Рассчитать стоимость ремонта",
                    subtitle: "Скажите примерную площадь — пришлём вилку цен в мессенджер или перезвоним с расчётом.",
                    button: "Получить расчёт",
                    source: "hero-calc",
                    image: "estimate.webp",
                    extra: "area",
                  })
                }
                className="rounded-full px-7 py-4 text-base font-semibold bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 transition-all hover:scale-[1.03] active:scale-95"
              >
                Рассчитать стоимость
              </button>
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="text-sm text-white/55 mt-3 pl-1"
            >
              Выезд и смета — 0 ₽ · Работаем по договору
            </motion.span>

            {/* Доверие вместо логотипов */}
            <motion.div
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.55 } } }}
              initial="hidden"
              animate="show"
              className="mt-12 md:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-3 w-full"
            >
              {trust.map((t) => (
                <motion.div
                  key={t.t}
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                  whileHover={{ y: -3 }}
                  className="flex items-center gap-3 rounded-2xl bg-white/[0.07] backdrop-blur-xl border border-white/10 p-3 md:p-4"
                >
                  <span className="w-10 h-10 rounded-xl bg-flame/15 text-amber flex items-center justify-center shrink-0">{t.icon}</span>
                  <span className="flex flex-col min-w-0">
                    <span className="text-[13px] md:text-[14px] font-semibold text-white leading-tight">{t.t}</span>
                    <span className="text-[11px] md:text-[12px] text-white/55 leading-tight mt-0.5">{t.s}</span>
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Сезонный маркер */}
        {season && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 }}
            onClick={callEngineer}
            className="hidden xl:flex absolute right-8 top-[128px] z-10 w-[270px] flex-col gap-2 text-left rounded-3xl bg-ink/50 backdrop-blur-xl border border-white/10 p-5 hover:border-flame/50 transition"
          >
            <span className="inline-flex items-center gap-2 text-amber text-[11px] font-bold uppercase tracking-[0.14em]">
              <CloudRain className="w-4 h-4" /> {season.tag}
            </span>
            <span className="text-white/85 text-[14px] leading-snug">{season.text}</span>
            <span className="text-white text-[13px] font-semibold inline-flex items-center gap-1 mt-1">
              Записаться на осмотр <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </motion.button>
        )}
      </section>

      {/* Мобильное меню */}
      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-ink/95 backdrop-blur-xl flex flex-col p-6"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button onClick={() => setMenu(false)} aria-label="Закрыть меню" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col gap-1 mt-10">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenu(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="font-display text-3xl text-white py-3 border-b border-white/10"
                >
                  {n.label}
                </motion.a>
              ))}
            </div>
            <div className="mt-auto flex flex-col gap-3">
              <a href={PHONE_HREF} className="h-14 rounded-full bg-white text-ink font-semibold flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" /> {PHONE}
              </a>
              <button
                onClick={() => {
                  setMenu(false);
                  callEngineer();
                }}
                className="h-14 rounded-full bg-fire text-white font-semibold"
              >
                Вызвать инженера бесплатно
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
