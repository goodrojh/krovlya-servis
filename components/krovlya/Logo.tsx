"use client";
import React from "react";

export default function Logo({ className = "", light = true }: { className?: string; light?: boolean }) {
  return (
    <span className={"inline-flex items-center gap-2.5 " + className}>
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none" aria-hidden>
        <rect width="40" height="40" rx="12" fill={light ? "rgba(255,255,255,0.08)" : "#0c0d0f"} />
        <path d="M7 27.5h26" stroke={light ? "#fff" : "#fff"} strokeWidth="2.6" strokeLinecap="round" />
        <path d="M10 22.5h20" stroke={light ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.55)"} strokeWidth="2.6" strokeLinecap="round" />
        <path
          d="M20.4 8.5c.6 2.7 3.6 4.1 3.6 7.2a4 4 0 0 1-8 0c0-1.3.6-2.2 1.3-3 .2 1 .8 1.7 1.6 1.9-.4-2.2.2-4.3 1.5-6.1Z"
          fill="url(#flameg)"
        />
        <defs>
          <linearGradient id="flameg" x1="20" y1="8" x2="20" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFB547" />
            <stop offset="1" stopColor="#FF5A1F" />
          </linearGradient>
        </defs>
      </svg>
      <span className="flex flex-col leading-none">
        <span className={"font-display font-semibold text-[15px] tracking-tight " + (light ? "text-white" : "text-ink")}>
          Кровля&nbsp;Сервис
        </span>
        <span className={"text-[10px] mt-1 tracking-[0.14em] uppercase " + (light ? "text-white/50" : "text-stone")}>
          плоские крыши · МСК и МО
        </span>
      </span>
    </span>
  );
}
