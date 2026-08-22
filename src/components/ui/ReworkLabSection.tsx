"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Wrench, ArrowUpRight, Crosshair, Hammer, Box, QrCode } from "lucide-react";
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
      <section id="rework" className="py-28 relative bg-transparent border-t border-black/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/[0.08] text-xs font-mono tracking-widest text-[#5A606D] uppercase shadow-sm">
                <Wrench className="w-3.5 h-3.5 text-[#0F1115]" />
                <span>// PRODUCTION REWORK & PROTOTYPING LAB</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1115] tracking-tight">
                Rapid shop-floor rework & <span className="italic font-normal text-[#5A606D]">resident quality dispatch</span>.
              </h2>
              <p className="text-[#5A606D] text-sm sm:text-base leading-relaxed font-normal">
                Rapid containment, precision laser marking, certified welding, and custom 3D printing directly supporting assembly plants across the Detroit automotive corridor.
              </p>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#0F1115] hover:bg-[#252830] text-white text-xs font-mono uppercase tracking-widest transition-all shadow-md active:scale-95"
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
                  className="p-7 rounded-[2.5rem] bg-white text-[#0F1115] border border-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#717682] font-semibold">
                        SERVICE // {item.id}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[#F6F5F2] border border-black/5 flex items-center justify-center text-[#0F1115] group-hover:rotate-12 transition-transform shadow-sm">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-[#0F1115] tracking-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[#5A606D] text-xs leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#717682]">{item.spec}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#0F1115] opacity-40 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Rework Dispatch Modal */}
      <ReworkModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
