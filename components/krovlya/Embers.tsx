"use client";
import React, { useEffect, useRef } from "react";

// Искры от горелки, поднимающиеся над кадром. Лёгкий canvas, уважает prefers-reduced-motion.
export default function Embers({ className = "", density = 46 }: { className?: string; density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = 0, h = 0, raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const count = window.innerWidth < 768 ? Math.round(density * 0.55) : density;

    type P = { x: number; y: number; vx: number; vy: number; r: number; life: number; max: number; hue: number };
    const ps: P[] = [];
    const spawn = (initial = false): P => ({
      x: w * (0.45 + Math.random() * 0.55),
      y: initial ? Math.random() * h : h * (0.75 + Math.random() * 0.3),
      vx: (Math.random() - 0.3) * 0.35,
      vy: -(0.25 + Math.random() * 0.9),
      r: 0.6 + Math.random() * 1.8,
      life: 0,
      max: 220 + Math.random() * 320,
      hue: 18 + Math.random() * 26,
    });

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    for (let i = 0; i < count; i++) ps.push(spawn(true));

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.life++;
        p.x += p.vx + Math.sin((p.life + i * 13) / 30) * 0.25;
        p.y += p.vy;
        const t = p.life / p.max;
        const a = t < 0.1 ? t * 10 : 1 - t;
        if (t >= 1 || p.y < -10) {
          ps[i] = spawn();
          continue;
        }
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, `hsla(${p.hue}, 100%, 70%, ${0.9 * a})`);
        g.addColorStop(1, `hsla(${p.hue}, 100%, 50%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return <canvas ref={ref} className={"pointer-events-none " + className} aria-hidden />;
}
