"use client";
import React from "react";
import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Единые правила: контейнер 1280, вертикальный ритм секций, один стиль заголовков и кнопок.
export const container = "max-w-7xl mx-auto w-full";
export const sectionPad = "px-4 sm:px-6 md:px-8 py-20 md:py-28";

// Неразрывный пробел после коротких предлогов и союзов — без висячих слов в конце строки
export const typo = (s: string) => s.replace(/(^|[\s(«])(а|и|в|во|с|со|к|о|об|у|на|не|по|до|за|от|из|для|при|без)\s/gi, "$1$2 ");

export function SectionHeader({
  title,
  accent,
  lead,
  dark = false,
  aside,
}: {
  title: string;
  accent?: string;
  lead?: string;
  dark?: boolean;
  aside?: React.ReactNode;
}) {
  return (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" as const }}
      className="grid gap-5 md:grid-cols-[1.35fr_1fr] md:items-end mb-10 md:mb-14"
    >
      <div>
        <h2 className={"font-display font-semibold text-[28px] sm:text-[34px] md:text-[44px] leading-[1.1] tracking-[-0.02em] text-balance " + (dark ? "text-white" : "text-ink")}>
          {typo(title)}
          {accent && (
            <>
              {" "}
              <span className={dark ? "text-amber" : "text-flame"}>{typo(accent)}</span>
            </>
          )}
        </h2>
      </div>
      {(lead || aside) && (
        <div className="flex flex-col gap-5 md:items-start">
          {lead && <p className={"text-[16px] md:text-[17px] leading-relaxed max-w-[480px] " + (dark ? "text-white/70" : "text-stone")}>{typo(lead)}</p>}
          {aside}
        </div>
      )}
    </m.div>
  );
}

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "light" | "dark" | "ghost"; arrow?: boolean; full?: boolean };

export function Button({ variant = "primary", arrow = false, full = false, className = "", children, ...rest }: BtnProps) {
  const base = "group inline-flex items-center justify-center gap-3 rounded-full font-semibold text-[15px] md:text-[16px] transition-[transform,background-color,box-shadow,color] duration-200 active:scale-[0.98] disabled:opacity-40 " + (full ? "w-full " : "w-full sm:w-auto ");
  const pad = arrow ? "pl-6 pr-1.5 py-1.5 min-h-[52px] " : "px-6 min-h-[52px] py-3 leading-tight text-center ";
  const v = {
    primary: "bg-fire text-white shadow-[0_10px_30px_-10px_rgba(240,82,24,0.7)] hover:shadow-[0_14px_36px_-10px_rgba(240,82,24,0.85)] hover:-translate-y-0.5",
    light: "bg-white text-ink hover:bg-paper hover:-translate-y-0.5",
    dark: "bg-ink text-white hover:bg-graphite hover:-translate-y-0.5",
    ghost: "bg-white/10 text-white border border-white/25 hover:bg-white/20",
  }[variant];
  return (
    <button {...rest} className={base + pad + v + " " + className}>
      <span className={arrow ? "flex-1 text-left" : ""}>{children}</span>
      {arrow && (
        <span className={"w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:translate-x-0.5 " + (variant === "primary" ? "bg-white/20" : variant === "light" ? "bg-ink text-white" : "bg-flame text-white")}>
          <ArrowRight className="w-[18px] h-[18px]" />
        </span>
      )}
    </button>
  );
}
