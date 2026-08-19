"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, ArrowUpRight, CheckCircle2, Award, BookOpen, Layers } from "lucide-react";
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
      <section id="academy" className="py-28 relative bg-sylva-bg border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-sylva-ink-soft uppercase">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>// ANCHOR ENGINEERING ACADEMY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
                Bridging university theory with <span className="italic font-normal text-accent-pale">Tier-1 OEM standards</span>.
              </h2>
              <p className="text-sylva-ink-soft text-sm leading-relaxed font-light">
                Hands-on masterclasses designed by veteran Detroit automotive engineering directors for aspiring engineers, OEMs, and Tier-1 supplier technical staff.
              </p>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-paper-card hover:bg-white text-paper-ink text-xs font-mono uppercase tracking-widest transition-all shadow-paper-soft hover:shadow-paper-hover"
            >
              <span>View Full Syllabus</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Tracks Grid (Sylva Alabaster Cards) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {tracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setModalOpen(true)}
                className="p-8 sm:p-9 rounded-[2.5rem] bg-paper-card text-paper-ink shadow-paper-soft hover:shadow-paper-hover transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-paper-label">
                      TRACK // {track.id} • {track.level}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-paper-surface border border-black/5 flex items-center justify-center text-paper-ink group-hover:rotate-12 transition-transform shadow-sm">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-normal text-paper-ink tracking-tight mb-2">
                    {track.title}
                  </h3>
                  <p className="text-paper-label text-xs leading-relaxed mb-6 font-light">
                    {track.desc}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-black/5">
                    {track.modules.map((mod, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-paper-ink/90 font-light">
                        <CheckCircle2 className="w-3.5 h-3.5 text-paper-label flex-shrink-0 mt-0.5" />
                        <span>{mod}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-black/5 flex items-center justify-between text-[11px] font-mono text-paper-label">
                  <span>12 WEEKS • NOVI, MI TECH CENTER</span>
                  <span className="text-paper-ink font-semibold">APPLY →</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AcademyModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
