"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Layers, Wind, Cpu, ArrowUpRight, CheckCircle2 } from "lucide-react";

const disciplines = [
  {
    id: "01",
    tag: "800V ARCHITECTURE",
    title: "EV Powertrain & High-Voltage Systems",
    description:
      "Design and integration of ultra-efficient electric drive units (EDU), 800V Silicon Carbide inverters, and modular battery cell-to-pack (CTP) structural enclosures.",
    metrics: ["98.4% Peak Inverter Efficiency", "Immersion & Cold-Plate Cooling", "ISO 26262 ASIL-D Validated"],
  },
  {
    id: "02",
    tag: "MULTI-BODY KINEMATICS",
    title: "Body-in-White (BIW) & Chassis Dynamics",
    description:
      "Advanced suspension kinematics, carbon-composite lightweighting, elastokinematics optimization, and multi-body chassis dynamics simulation.",
    metrics: ["-25% Unsprung Mass Reduction", "Finite Element (FEA) Stress Analysis", "Active Damping & Roll Control"],
  },
  {
    id: "03",
    tag: "AERO & THERMAL CFD",
    title: "Aerodynamic CFD & Thermal Management",
    description:
      "High-fidelity computational fluid dynamics (CFD) for drag minimization, brake cooling airflow, and battery pack thermodynamic stability under extreme track loads.",
    metrics: ["Cd 0.20-0.23 Target Windows", "Transient Thermal Runaway CFD", "Active Aero Shutter Integration"],
  },
  {
    id: "04",
    tag: "REAL-TIME VEHICLE BUS",
    title: "AUTOSAR Embedded Systems & Telemetry",
    description:
      "End-to-end electronic control unit (ECU) firmware, CAN-FD / Automotive Ethernet communication, and real-time cloud digital-twin telemetry pipelines.",
    metrics: ["1000 Hz Subsystem Logging", "Secure OTA Update Architecture", "Hardware-in-the-Loop (HIL) Rig"],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-28 relative bg-sylva-bg border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-sylva-ink-soft uppercase">
              <span>// ENGINEERING DISCIPLINES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
              Integrated engineering for <span className="italic font-normal text-accent-pale">mission-critical</span> mobility.
            </h2>
            <p className="text-sylva-ink-soft text-sm leading-relaxed font-light">
              From concept kinematics to production tooling, Anchor Automotive delivers deep technical rigor across every critical vehicle domain.
            </p>
          </div>

          <div className="text-xs font-mono text-sylva-ink-faint">
            TOOLCHAINS: CATIA V6 • ANSYS • MATLAB
          </div>
        </div>

        {/* Disciplines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {disciplines.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-8 sm:p-10 rounded-[2.5rem] bg-paper-card text-paper-ink shadow-paper-soft hover:shadow-paper-hover transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono uppercase tracking-widest text-paper-label">
                    {item.id} / {item.tag}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-paper-surface border border-black/5 flex items-center justify-center text-paper-ink group-hover:rotate-12 transition-transform shadow-sm">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-2xl font-normal text-paper-ink tracking-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-paper-label text-sm leading-relaxed mb-6 font-light">
                  {item.description}
                </p>
              </div>

              <div className="space-y-2 pt-6 border-t border-black/5">
                {item.metrics.map((metric, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-paper-ink/85 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-paper-label flex-shrink-0" />
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
