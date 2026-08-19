"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Wrench, Printer, Flame, Sparkles, Microscope } from "lucide-react";
import { LiquidMetalButton } from "./LiquidMetalButton";
import { ReworkModal } from "./ReworkModal";

export function ReworkLabSection() {
  const [modalOpen, setModalOpen] = useState(false);

  const reworkCapabilities = [
    {
      icon: Printer,
      title: "Additive Manufacturing & 3D Prototyping",
      desc: "Rapid SLA/SLS and industrial metal 3D printing for functional prototypes, bracketry iterations, and fit-up validation prior to hard tooling.",
      specs: ["Dimensional Accuracy: ±0.05mm", "Materials: PEEK, Titanium Ti6Al4V, Carbon-Nylon", "Turnaround: Under 48 Hours"],
    },
    {
      icon: Flame,
      title: "Laser Etching & Serialized Marking",
      desc: "Fiber-laser permanent 2D DataMatrix UID marking, VIN etching, and deep metal engraving conforming to SAE and OEM traceability mandates.",
      specs: ["High-Speed Fiber Laser (50W)", "Direct Part Marking (DPM)", "ISO/IEC 15415 Verified"],
    },
    {
      icon: Sparkles,
      title: "Precision TIG/MIG & Micro-Welding",
      desc: "Specialized weld rework and structural reinforcement on aluminum subframes, high-strength steel chassis members, and battery enclosures.",
      specs: ["Certified AWS D1.1 / D1.2 Welders", "Purged Inert Gas Shielding", "Destructive & Non-Destructive Quality Testing"],
    },
    {
      icon: Microscope,
      title: "Metrology & Quality Assurance",
      desc: "On-site CMM coordinate measurement, 3D optical scanning, and resident engineering support for immediate assembly-line defect remediation.",
      specs: ["Zeiss 3D Optical Metrology", "GD&T Statistical Process Control (SPC)", "Resident Engineer Dispatch"],
    },
  ];

  return (
    <>
      <section id="rework" className="py-24 relative border-t border-carbon-800 bg-carbon-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-carbon-900 border border-hazard-500/30 text-hazard-400 text-xs">
                <Wrench className="w-3.5 h-3.5" />
                <span className="telemetry-tag font-semibold">// RAPID PRODUCTION & REWORK LAB</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-tight">
                Rapid Tooling, Rework & Advanced Prototyping
              </h2>
              <p className="text-titanium-400 text-sm max-w-2xl">
                Novi, Michigan facility equipped with rapid prototyping, laser marking, certified welding, and CMM metrology to solve critical assembly-line bottlenecks.
              </p>
            </div>

            <LiquidMetalButton onClick={() => setModalOpen(true)} variant="amber">
              Request Rework Dispatch
            </LiquidMetalButton>
          </div>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reworkCapabilities.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setModalOpen(true)}
                  className="hud-panel p-6 sm:p-8 rounded-2xl border border-carbon-750 bg-carbon-900/60 hover:bg-carbon-850/80 hover:border-hazard-500/50 transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-carbon-800 border border-carbon-700 flex items-center justify-center text-hazard-400 group-hover:scale-105 group-hover:border-hazard-500/50 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-hazard-300 transition-colors">
                        {item.title}
                      </h3>
                      <span className="telemetry-tag text-titanium-500 text-[10px]">
                        MICHIGAN FACILITY • IN-HOUSE CAPABILITY
                      </span>
                    </div>
                  </div>

                  <p className="text-titanium-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-carbon-800/80">
                    {item.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-titanium-300 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-hazard-500" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <ReworkModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
