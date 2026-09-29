"use client";
import React, { useEffect, useRef } from "react";

// Искры от горелки. Один заранее отрисованный спрайт, пауза вне экрана и на скрытой вкладке.
export default function Embers({ className = "", density = 40 }: { className?: string; density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
    const count = mobile ? Math.round(density * 0.45) : density;

    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = 32;
    const s = sprite.getContext("2d")!;
    const g = s.createRadialGradient(16, 16, 0, 16, 16, 16);
    g.addColorStop(0, "rgba(255,210,140,1)");
    g.addColorStop(0.25, "rgba(255,140,50,0.8)");
    g.addColorStop(1, "rgba(255,90,20,0)");
    s.fillStyle = g;
    s.fillRect(0, 0, 32, 32);

    let w = 0, h = 0, raf = 0, running = false, visible = true;
    type P = { x: number; y: number; vx: number; vy: number; r: number; life: number; max: number; seed: number };
    const ps: P[] = [];
    const spawn = (initial = false): P => ({
      x: w * (0.5 + Math.random() * 0.5),
      y: initial ? Math.random() * h : h * (0.72 + Math.random() * 0.3),
      vx: (Math.random() - 0.35) * 0.3,
      vy: -(0.25 + Math.random() * 0.8),
      r: 3 + Math.random() * 6,
      life: 0,
      max: 220 + Math.random() * 300,
      seed: Math.random() * 100,
    });

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "lighter";
    };
    resize();
    for (let i = 0; i < count; i++) ps.push(spawn(true));

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.life++;
        p.x += p.vx + Math.sin((p.life + p.seed) / 30) * 0.22;
        p.y += p.vy;
        const t = p.life / p.max;
        if (t >= 1 || p.y < -10) {
          ps[i] = spawn();
          continue;
        }
        ctx.globalAlpha = (t < 0.1 ? t * 10 : 1 - t) * 0.85;
        ctx.drawImage(sprite, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
      }
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (running || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(resize, 150);
    };
    window.addEventListener("resize", onResize);
    start();

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
    };
  }, [density]);

  return <canvas ref={ref} className={"pointer-events-none " + className} aria-hidden />;
}
