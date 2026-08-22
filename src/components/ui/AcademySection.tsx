"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { AcademyModal } from "./AcademyModal";

export function AcademySection() {
  const [modalOpen, setModalOpen] = useState(false);

  const tracks = [
    {
      id: "01",
      title: "Body-in-White (BIW) Concepts & Surfacing",
      level: "ADVANCED INDUSTRY TRACK",
      desc: "Comprehensive vehicle structural engineering bridging CAD theory with OEM production stamping.",
      modules: [
        "Class-A & Class-B Surfacing in CATIA V6 & Siemens NX",
        "Sheet Metal Flanging, Hemming & Stamping Feasibility",
        "Welding Processes (Spot, Laser, MIG/TIG) & Joint Integrity",
        "Crashworthiness Packaging, Load Paths & NVH Dampening",
      ],
    },
    {
      id: "02",
      title: "Interior Trim & Cockpit Architecture",
      level: "PRODUCTION FIT & FINISH",
      desc: "End-to-end interior systems development from injection-molded plastics to occupant ergonomics.",
      modules: [
        "Engineering Plastics, Resins & Structural Foams Selection",
        "A/B/C-Pillar & Door Card Trim Packaging Constraints",
        "Tooling Draft Angles, Rib Design & Fastener Integration",
        "Perceived Quality, Fit-and-Finish & Acoustic NVH Analysis",
      ],
    },
    {
      id: "03",
      title: "Powertrain Integration & 800V Systems",
      level: "HIGH-VOLTAGE MOBILITY",
      desc: "Modular EV drivetrain, battery cell-to-pack structural sill integration, and ICE/Hybrid thermal loops.",
      modules: [
        "Cell-to-Pack (CTP) Enclosure Design & Die-Cast Housing",
        "Engine / EDU Dynamic Mounting & Torque Reaction Brackets",
        "Thermal Management CFD & Liquid Cold-Plate Channels",
        "ISO 26262 ASIL-D Functional Safety & High-Voltage Bus Routing",
      ],
    },
  ];

  return (
    <>
      <section id="academy" className="py-28 relative bg-transparent border-t border-black/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/[0.08] text-xs font-mono tracking-widest text-[#5A606D] uppercase shadow-sm">
                <GraduationCap className="w-3.5 h-3.5 text-[#0F1115]" />
                <span>// ANCHOR ENGINEERING ACADEMY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1115] tracking-tight">
                Bridging university theory with <span className="italic font-normal text-[#5A606D]">Tier-1 OEM standards</span>.
              </h2>
              <p className="text-[#5A606D] text-sm sm:text-base leading-relaxed font-normal">
                Hands-on masterclasses designed by veteran Detroit automotive engineering directors for aspiring engineers, OEMs, and Tier-1 supplier technical staff.
              </p>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#0F1115] hover:bg-[#252830] text-white text-xs font-mono uppercase tracking-widest transition-all shadow-md active:scale-95"
            >
              <span>View Full Syllabus</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Tracks Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {tracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setModalOpen(true)}
                className="p-8 sm:p-9 rounded-[2.5rem] bg-white text-[#0F1115] border border-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#717682] font-semibold">
                      TRACK // {track.id} • {track.level}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-[#F6F5F2] border border-black/5 flex items-center justify-center text-[#0F1115] group-hover:rotate-12 transition-transform shadow-sm">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#0F1115] tracking-tight mb-2">
                    {track.title}
                  </h3>
                  <p className="text-[#5A606D] text-xs leading-relaxed mb-6">
                    {track.desc}
                  </p>
                </div>

                <div className="space-y-2 pt-6 border-t border-black/[0.06]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#717682] block mb-2 font-semibold">
                    Core Curriculum Modules:
                  </span>
                  {track.modules.map((mod, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[#1F232B]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0F1115] flex-shrink-0 mt-0.5" />
                      <span>{mod}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus Enrollment Modal */}
      <AcademyModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
