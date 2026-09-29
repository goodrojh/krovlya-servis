"use client";
import { LazyMotion, domAnimation } from "framer-motion";
import { LeadProvider } from "@/components/krovlya/LeadModal";
import Hero from "@/components/krovlya/Hero";
import Features from "@/components/krovlya/Features";
import LeakDoctor from "@/components/krovlya/LeakDoctor";
import HowItWorks from "@/components/krovlya/HowItWorks";
import Services from "@/components/krovlya/Services";
import BeforeAfter from "@/components/krovlya/BeforeAfter";
import Pricing from "@/components/krovlya/Pricing";
import Objects from "@/components/krovlya/Objects";
import FAQ from "@/components/krovlya/FAQ";
import Footer from "@/components/krovlya/Footer";
import MobileBar from "@/components/krovlya/MobileBar";

export default function Home() {
  return (
    <LazyMotion features={domAnimation} strict>
    <LeadProvider>
      <main className="min-h-screen">
        <Hero />
        <Features />
        <LeakDoctor />
        <HowItWorks />
        <Services />
        <BeforeAfter />
        <Pricing />
        <Objects />
        <FAQ />
        <Footer />
      </main>
      <MobileBar />
    </LeadProvider>
    </LazyMotion>
  );
}
