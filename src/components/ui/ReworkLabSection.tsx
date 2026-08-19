"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Wrench, ArrowUpRight, CheckCircle2, QrCode, Hammer, Box, Crosshair } from "lucide-react";
import { ReworkModal } from "./ReworkModal";

export function ReworkLabSection() {
  const [modalOpen, setModalOpen] = useState(false);

  const capabilities = [
    {
      id: "01",
      icon: Crosshair,
      title: "Precision Drilling & Custom Tapping",
      spec: "Tolerances: ±0.025 mm (0.001 in)",
      desc: "Drilling precision pilot holes, custom mounting patterns, and metric/SAE thread tapping for complex stamping assemblies.",
    },
    {
      id: "02",
      icon: Hammer,
      title: "Certified Welding & Fastener Remediation",
      spec: "AWS D1.1 / D1.2 Certified",
      desc: "Addition and retrofitting of weld nuts, weld studs, and structural spot/MIG/TIG weld reinforcement on automotive sheet metal.",
    },
    {
      id: "03",
      icon: Box,
      title: "Additive 3D Rapid Prototyping",
      spec: "Materials: PEEK, Carbon-Nylon, Ti-6Al-4V",
      desc: "High-speed functional 3D printing of custom vehicle brackets, sensor housings, and ergonomic assembly jigs.",
    },
    {
      id: "04",
      icon: QrCode,
      title: "Laser Etching & Part Number Tracking",
      spec: "50W Fiber Laser • 2D DataMatrix UID",
      desc: "Direct Part Marking (DPM) for serialized part numbers, VIN traceability, and AIAG-compliant high-contrast barcoding.",
    },
  ];

  return (
    <>
      <section id="rework" className="py-28 relative bg-sylva-bg border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-sylva-ink-soft uppercase">
                <Wrench className="w-3.5 h-3.5" />
                <span>// PRODUCTION REWORK & PROTOTYPING LAB</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
                Rapid shop-floor rework & <span className="italic font-normal text-accent-pale">resident quality dispatch</span>.
              </h2>
              <p className="text-sylva-ink-soft text-sm leading-relaxed font-light">
                Rapid containment, precision laser marking, certified welding, and custom 3D printing directly supporting assembly plants across the Detroit automotive corridor.
              </p>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-paper-card hover:bg-white text-paper-ink text-xs font-mono uppercase tracking-widest transition-all shadow-paper-soft hover:shadow-paper-hover"
            >
              <span>Dispatch Rework Team</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  onClick={() => setModalOpen(true)}
                  className="p-7 rounded-[2.5rem] bg-paper-card text-paper-ink shadow-paper-soft hover:shadow-paper-hover transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-paper-label">
                        SERVICE // {item.id}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-paper-surface border border-black/5 flex items-center justify-center text-paper-ink group-hover:rotate-12 transition-transform shadow-sm">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <h3 className="text-lg font-normal text-paper-ink tracking-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-paper-label text-xs leading-relaxed mb-4 font-light">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/5 flex items-center gap-2 text-[11px] font-mono text-paper-ink/80">
                    <CheckCircle2 className="w-3 h-3 text-paper-label" />
                    <span>{item.spec}</span>
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
