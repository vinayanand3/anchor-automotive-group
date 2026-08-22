import React from "react";
import { AutomotiveStaffingHero } from "@/components/AutomotiveStaffingHero";
import { AboutSection } from "@/components/ui/AboutSection";
import { ServicesSection } from "@/components/ui/ServicesSection";
import { AsciiEngineeringInspector } from "@/components/ui/AsciiEngineeringInspector";
import { ReworkLabSection } from "@/components/ui/ReworkLabSection";
import { AcademySection } from "@/components/ui/AcademySection";
import { LeadCaptureSection } from "@/components/ui/LeadCaptureSection";
import { Footer } from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#F6F5F2] text-[#0F1115] overflow-x-hidden selection:bg-black/10 selection:text-black">
      {/* Hero Section with Integrated Header Navigation & Interactive Kinetic Grid */}
      <AutomotiveStaffingHero />

      {/* About Anchor Automotive Group Section */}
      <AboutSection />

      {/* Core Engineering Services Section */}
      <ServicesSection />

      {/* Real-Time ASCII Sweep Digital Twin Inspector Bench */}
      <AsciiEngineeringInspector />

      {/* Production Rework & Prototyping Lab */}
      <ReworkLabSection />

      {/* Anchor Engineering Academy & Masterclass */}
      <AcademySection />

      {/* B2B Confidential Engagement & Mutual NDA RFP Portal */}
      <LeadCaptureSection />

      {/* Executive Footer */}
      <Footer />
    </main>
  );
}
