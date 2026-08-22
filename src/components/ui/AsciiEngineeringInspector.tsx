"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Activity,
  Zap,
  Layers,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Database,
  Sliders,
  CheckCircle2,
} from "lucide-react";
import { AsciiSweep } from "@/components/canvasui/AsciiSweep";

export function AsciiEngineeringInspector() {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <section className="py-24 relative bg-transparent border-t border-black/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/[0.08] text-xs font-mono tracking-widest text-[#5A606D] uppercase shadow-sm">
              <Terminal className="w-3.5 h-3.5 text-[#0F1115]" />
              <span>// DIGITAL TWIN & TELEMETRY BENCH</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1115] tracking-tight">
              Real-time engineering <span className="italic font-normal text-[#5A606D]">specification inspector</span>.
            </h2>
            <p className="text-[#5A606D] text-sm sm:text-base leading-relaxed font-normal">
              Switch between vehicle domains to trigger our WebGL ASCII Sweep kernel, rendering real-time CAD kinematics and high-voltage telemetry.
            </p>
          </div>

          {/* Tab Switcher Controls */}
          <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-black/[0.08] shadow-sm">
            <button
              onClick={() => setActiveTab(0)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono tracking-wide transition-all ${
                activeTab === 0
                  ? "bg-[#0F1115] text-white shadow-sm font-semibold"
                  : "text-[#5A606D] hover:text-[#0F1115] hover:bg-black/5"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>01 // BIW Kinematics</span>
            </button>

            <button
              onClick={() => setActiveTab(1)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono tracking-wide transition-all ${
                activeTab === 1
                  ? "bg-[#0F1115] text-white shadow-sm font-semibold"
                  : "text-[#5A606D] hover:text-[#0F1115] hover:bg-black/5"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>02 // 800V EV Powertrain</span>
            </button>
          </div>
        </div>

        {/* ASCII Sweep Interactive Viewer Box */}
        <div className="relative rounded-[2.5rem] bg-white border border-black/[0.08] shadow-[0_25px_70px_rgba(0,0,0,0.06)] overflow-hidden min-h-[520px]">
          {/* Top Control Bar in Viewer */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.06] bg-[#FAFAF8] text-xs font-mono text-[#717682]">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <span className="text-[#0F1115] font-semibold">
                SYSTEM_NODE://ANCHOR-NOVI-DIGITAL-TWIN.SPEC
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1">
                <Activity className="w-3 h-3 text-emerald-600 animate-pulse" />
                ASCII KERNEL: ACTIVE
              </span>
              <span>RENDER: WEBGL2_BUFFER</span>
            </div>
          </div>

          {/* ASCII SWEEP CONTAINER */}
          <div className="relative w-full h-[540px] bg-white">
            <AsciiSweep
              index={activeTab}
              angle={0}
              duration={1.6}
              band={0.28}
              softness={0.45}
              turbulence={0.45}
              trail={0.7}
              scale={2}
              spacing={1}
              tint={0.8}
              glow={2}
              aberration={4}
              flicker={0.3}
              density={0.9}
              displace={12}
              contrast={1.2}
              brightness={0}
              invert={0}
              threshold={0.08}
              fade={0.75}
              charset="ascii"
              blend="auto"
              color="#059669"
              className="w-full h-full"
              alternate={
                /* PANEL 1: 800V EV Powertrain Telemetry */
                <div className="p-8 sm:p-12 w-full h-full overflow-y-auto bg-white text-[#0F1115] flex flex-col justify-between select-text">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-mono font-semibold border border-emerald-200">
                        800V HIGH-VOLTAGE ARCHITECTURE // TELEMETRY REPORT
                      </span>
                      <span className="text-xs font-mono text-[#717682]">
                        ISO 26262 ASIL-D COMPLIANT
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F1115] mb-2">
                      Cell-to-Pack (CTP) Enclosure & 800V SiC Inverter System
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5A606D] leading-relaxed max-w-3xl mb-8">
                      High-density silicon-carbide inverter packaging coupled with liquid cold-plate thermal management. Designed for sub-2.5°C thermal gradient across all 800V modular modules under continuous 350 kW DC fast-charging.
                    </p>

                    {/* High-Impact Stat Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                      {[
                        { label: "Nominal Voltage", val: "800V DC (900V Peak)" },
                        { label: "Inverter Efficiency", val: "99.2% SiC MOSFET" },
                        { label: "Max Thermal Delta", val: "ΔT < 2.2 °C" },
                        { label: "Charging Speed", val: "10-80% in 18 Min" },
                      ].map((s, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-2xl bg-[#F6F5F2] border border-black/5 flex flex-col justify-between"
                        >
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#717682]">
                            {s.label}
                          </span>
                          <span className="text-base sm:text-lg font-bold font-mono text-[#0F1115] mt-1">
                            {s.val}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Technical Matrix Specs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-[#1F232B]">
                      <div className="p-4 rounded-xl bg-[#F6F5F2]/70 border border-black/5 space-y-2">
                        <div className="font-bold text-[#0F1115] flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Thermal Runaway Containment:</span>
                        </div>
                        <p className="text-[11px] text-[#5A606D] leading-relaxed">
                          Integrated aerogel barrier insulation + directional top-plate venting ports with flame-arresting ceramic membranes.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#F6F5F2]/70 border border-black/5 space-y-2">
                        <div className="font-bold text-[#0F1115] flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>High-Voltage Bus Routing:</span>
                        </div>
                        <p className="text-[11px] text-[#5A606D] leading-relaxed">
                          Direct-bonded copper (DBC) busbars with low-inductance laminated power distribution and automated pyrofuse isolation.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-black/5 flex items-center justify-between text-xs font-mono text-[#717682]">
                    <span>STATUS: VALIDATED IN NOVI THERMAL CHAMBER</span>
                    <span className="text-[#0F1115] font-semibold">CAD FORMAT: CATIA V6 • STEP AP242</span>
                  </div>
                </div>
              }
            >
              {/* PANEL 0: BIW Kinematics & Structural FEA */}
              <div className="p-8 sm:p-12 w-full h-full overflow-y-auto bg-white text-[#0F1115] flex flex-col justify-between select-text">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-zinc-100 text-[#0F1115] text-[11px] font-mono font-semibold border border-black/10">
                      BODY-IN-WHITE (BIW) // STRUCTURAL CRASH ANALYSIS
                    </span>
                    <span className="text-xs font-mono text-[#717682]">
                      LS-DYNA NON-LINEAR SIMULATION
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F1115] mb-2">
                    Advanced Sheet Metal Architecture & Class-A Surfacing
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A606D] leading-relaxed max-w-3xl mb-8">
                    Comprehensive full-vehicle structural engineering spanning hot-stamped boron steels (Usibor 1500), hydroformed aluminum extrusions, and multi-piece gigacasting integration for optimal torsional stiffness.
                  </p>

                  {/* High-Impact Stat Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: "Torsional Rigidity", val: "38,400 Nm/deg" },
                      { label: "Structural Mass", val: "342.5 kg (BIW)" },
                      { label: "Tensile Strength", val: "1,500 MPa (UHSS)" },
                      { label: "Spot Weld Joints", val: "2,840 Verified Nodes" },
                    ].map((s, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-2xl bg-[#F6F5F2] border border-black/5 flex flex-col justify-between"
                      >
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#717682]">
                          {s.label}
                        </span>
                        <span className="text-base sm:text-lg font-bold font-mono text-[#0F1115] mt-1">
                          {s.val}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Technical Matrix Specs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-[#1F232B]">
                    <div className="p-4 rounded-xl bg-[#F6F5F2]/70 border border-black/5 space-y-2">
                      <div className="font-bold text-[#0F1115] flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0F1115]" />
                        <span>Frontal Crash Load Paths:</span>
                      </div>
                      <p className="text-[11px] text-[#5A606D] leading-relaxed">
                        Dual-stage octagonal crush cans with progressive folding triggers, directing 64 km/h collision energy around passenger cabin perimeter.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#F6F5F2]/70 border border-black/5 space-y-2">
                      <div className="font-bold text-[#0F1115] flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0F1115]" />
                        <span>Stamping & Hemming Feasibility:</span>
                      </div>
                      <p className="text-[11px] text-[#5A606D] leading-relaxed">
                        AutoForm formability simulation with zero thinning / wrinkling on tight door hem radii and laser-brazed Class-A roof ditches.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-black/5 flex items-center justify-between text-xs font-mono text-[#717682]">
                  <span>STATUS: CERTIFIED FOR 5-STAR NHTSA & IIHS TOP SAFETY PICK</span>
                  <span className="text-[#0F1115] font-semibold">CAD FORMAT: SIEMENS NX • PARASOLID</span>
                </div>
              </div>
            </AsciiSweep>
          </div>
        </div>
      </div>
    </section>
  );
}
