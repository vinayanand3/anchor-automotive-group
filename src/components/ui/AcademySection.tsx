"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Layers, CheckCircle2, Award } from "lucide-react";
import { LiquidMetalButton } from "./LiquidMetalButton";
import { AcademyModal } from "./AcademyModal";

export function AcademySection() {
  const [modalOpen, setModalOpen] = useState(false);

  const tracks = [
    {
      title: "Body-in-White (BIW) Architecture & Surfacing",
      level: "ADVANCED INDUSTRY TRACK",
      modules: [
        "Class-A & Class-B Surfacing in CATIA V6 / Siemens NX",
        "Sheet Metal Flanging, Hemming & Stamping Feasibility",
        "Crashworthiness Packaging & Load Path Design",
      ],
    },
    {
      title: "EV Powertrain & High-Voltage Systems",
      level: "SPECIALIZED PROFESSIONAL",
      modules: [
        "Battery Enclosure Thermal CFD & Immersion Cooling",
        "800V Busbar Routing & High-Voltage Safety Standards",
        "Electric Drive Unit (EDU) Integration & NVH",
      ],
    },
    {
      title: "Vehicle Dynamics & Multi-Body Simulation",
      level: "APPLIED CAE FEA",
      modules: [
        "Adams / MATLAB Multi-Body Kinematics & Elastokinematics",
        "Suspension Roll Center & Anti-Dive / Anti-Squat Geometry",
        "FEA Fatigue & Stress Analysis on Lightweight Castings",
      ],
    },
  ];

  return (
    <>
      <section id="academy" className="py-24 relative border-t border-carbon-800 bg-carbon-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-carbon-900 border border-cyber-500/30 text-cyber-400 text-xs">
                <GraduationCap className="w-3.5 h-3.5" />
                <span className="telemetry-tag font-semibold">// ANCHOR ENGINEERING ACADEMY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-tight">
                Bridging University Theory with Tier-1 OEM Standards
              </h2>
              <p className="text-titanium-400 text-sm max-w-2xl">
                Intensive, hands-on masterclasses designed by veteran automotive engineering directors for young engineers, OEMs, and Tier-1 supplier technical teams.
              </p>
            </div>

            <LiquidMetalButton onClick={() => setModalOpen(true)} variant="cyan">
              View Syllabus & Apply
            </LiquidMetalButton>
          </div>

          {/* Tracks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tracks.map((track, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="hud-panel p-6 sm:p-8 rounded-2xl border border-carbon-750 bg-carbon-900/70 hover:border-cyber-500/40 flex flex-col justify-between transition-all group cursor-pointer"
                onClick={() => setModalOpen(true)}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="telemetry-tag text-[10px] font-mono text-cyber-400 bg-cyber-900/60 px-2 py-0.5 rounded border border-cyber-500/30">
                      {track.level}
                    </span>
                    <Award className="w-4 h-4 text-cyber-400" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-4 group-hover:text-cyber-300 transition-colors">
                    {track.title}
                  </h3>

                  <div className="space-y-3 pt-2">
                    {track.modules.map((mod, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-titanium-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyber-400 flex-shrink-0 mt-0.5" />
                        <span>{mod}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-carbon-800 flex items-center justify-between text-[11px] font-mono text-titanium-500">
                  <span>INCLUDES CAD CERTIFICATION</span>
                  <span className="text-cyber-400 font-bold group-hover:underline">VIEW SYLLABUS &rarr;</span>
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
