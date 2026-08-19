import React from "react";
import { SylvaHero } from "@/components/ui/SylvaHero";
import { ServicesSection } from "@/components/ui/ServicesSection";
import { ReworkLabSection } from "@/components/ui/ReworkLabSection";
import { AcademySection } from "@/components/ui/AcademySection";
import { LeadCaptureSection } from "@/components/ui/LeadCaptureSection";
import { Check, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Sylva-Style Hero with Interactive Stamped Alloy vs. FEA Mesh BIW Structure */}
      <SylvaHero />

      {/* 2. Engineering Disciplines Showcase (Paper Alabaster Cards) */}
      <ServicesSection />

      {/* 3. Rapid Production & Rework Lab */}
      <ReworkLabSection />

      {/* 4. Anchor Engineering Academy */}
      <AcademySection />

      {/* 5. Phased Engineering Engagement Framework */}
      <section className="py-24 border-t border-white/10 bg-sylva-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-sylva-ink-soft uppercase">
              <span>// ENGAGEMENT FRAMEWORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
              From concept kinematics to <span className="italic font-normal text-accent-pale">production tooling</span>.
            </h2>
            <p className="text-sylva-ink-soft text-sm font-light">
              Structured engineering methodology ensuring ASIL-D functional safety, high structural margins, and seamless CAD handoff.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Subsystem Specification",
                desc: "Packaging envelope constraints, mass and rigidity targets, and thermal dissipation metrics.",
              },
              {
                step: "02",
                title: "Multi-Physics CAE",
                desc: "High-fidelity FEA stress analysis, multi-body kinematics, and aerodynamic optimization.",
              },
              {
                step: "03",
                title: "Production 3D CAD",
                desc: "Class-A/B parametric surfacing, GD&T drawings, and structural stampability review.",
              },
              {
                step: "04",
                title: "Tooling & HIL Sign-off",
                desc: "Rapid prototype build, hardware-in-the-loop validation, and full DFM supplier sign-off.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-7 rounded-[2rem] bg-white/5 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono tracking-widest text-accent-pale block mb-3">
                    PHASE // {item.step}
                  </span>
                  <h3 className="text-lg font-normal text-white mb-2">{item.title}</h3>
                  <p className="text-sylva-ink-soft text-xs leading-relaxed font-light">{item.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-[10px] text-accent-pale font-mono">
                  <Check className="w-3 h-3 mr-1" /> PHASE CERTIFIED
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Lead Capture & Mutual NDA Consultation Portal */}
      <LeadCaptureSection />
    </div>
  );
}
