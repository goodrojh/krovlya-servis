"use client";
import React, { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Phone, ClipboardList } from "lucide-react";
import { PHONE_HREF } from "@/lib/site";
import { useLead } from "./LeadModal";

// Липкая панель действий на телефоне: звонок в один тап + заявка.
export default function MobileBar() {
  const [show, setShow] = useState(false);
  const { openLead } = useLead();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <m.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", damping: 26, stiffness: 300 }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-[80] px-3 pt-2"
          style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
        >
          <div className="grid grid-cols-[1fr_1.3fr] gap-2 p-1.5 rounded-full bg-ink/95 border border-white/10 shadow-2xl">
            <a href={PHONE_HREF} className="h-12 rounded-full bg-white text-ink font-semibold flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" /> Позвонить
            </a>
            <button
              onClick={() =>
                openLead({
                  title: "Вызов инженера на объект",
                  subtitle: "Инженер обследует кровлю, определит причину протечки и составит смету. Выезд бесплатный.",
                  button: "Вызвать инженера",
                  source: "mobile-bar",
                  image: "inspect.webp",
                  extra: "address",
                })
              }
              className="h-12 rounded-full bg-fire text-white font-semibold flex items-center justify-center gap-2"
            >
              <ClipboardList className="w-4 h-4" /> Вызвать инженера
            </button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
