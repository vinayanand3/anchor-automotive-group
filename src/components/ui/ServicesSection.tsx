"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Layers, Wind, Cpu, ArrowUpRight, CheckCircle2, Sliders, Briefcase } from "lucide-react";

const disciplines = [
  {
    id: "01",
    tag: "STRUCTURAL ARCHITECTURE",
    title: "Body-in-White (BIW) Concepts & Engineering",
    description:
      "Comprehensive structural vehicle engineering covering design principles, manufacturing methods, sheet metal stamping feasibility, welding processes, structural integrity, NVH considerations, and crashworthiness packaging constraints.",
    metrics: [
      "Class-A & Class-B Surfacing in CATIA V6 and NX",
      "Stamping Feasibility, Hemming & Flange Design",
      "Spot, Laser & Arc Welding Joint Integrity Analysis",
      "Crashworthiness Load Paths & Torsional Rigidity",
    ],
  },
  {
    id: "02",
    tag: "COCKPIT & CABIN SYSTEMS",
    title: "Interior Trim Development & Perceived Quality",
    description:
      "End-to-end development of automotive interior systems. Expertise spans engineering plastics, soft trim, ergonomic packaging constraints, tooling draft angles, fastener integration, perceived quality, and acoustic NVH performance.",
    metrics: [
      "A/B/C-Pillar, Door Card & Instrument Panel Trim",
      "Engineering Resins, Thermoplastics & Structural Foams",
      "Tooling Draft Angles, Ribs & Attachment Features",
      "Fit-and-Finish Alignment & Gap/Flushness Audits",
    ],
  },
  {
    id: "03",
    tag: "DRIVETRAIN & HV BATTERY",
    title: "Powertrain Engineering & Thermal Integration",
    description:
      "Integrated powertrain solutions supporting ICE, Hybrid, and full 800V Battery Electric Vehicles (BEV). Encompasses engine/EDU mounting, drivetrain integration, thermal management CFD, and modular battery cell-to-pack (CTP) enclosures.",
    metrics: [
      "Engine & Electric Drive Unit (EDU) Torque Mounting",
      "800V Silicon Carbide Inverter & Busbar Packaging",
      "Liquid Cold-Plate Channels & Thermal Runaway CFD",
      "Cell-to-Pack (CTP) Structural Battery Trays",
    ],
  },
  {
    id: "04",
    tag: "END-TO-END EXECUTION",
    title: "Project Management & Resident Engineering",
    description:
      "Assisting OEM and Tier-1 clients with end-to-end engineering project management from initial planning and concept design through to construction and plant implementation. Delivering on-site resident engineers, CAD support, and strategic consulting.",
    metrics: [
      "APQP, DFMEA/PFMEA & Tooling Timeline Tracking",
      "Resident Engineers Dispatched On-Site at Assembly Plants",
      "CMM Metrology, GD&T Drawings & Supplier Audits",
      "Confidential Engineering Data Exchange under Mutual NDA",
    ],
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
              <span>// CORE ENGINEERING SERVICES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
              Integrated engineering for <span className="italic font-normal text-accent-pale">mission-critical</span> mobility.
            </h2>
            <p className="text-sylva-ink-soft text-sm leading-relaxed font-light">
              From Body-in-White concepts to interior trim, powertrain integration, and plant resident engineering, Anchor Automotive delivers deep technical rigor across every critical domain.
            </p>
          </div>

          <div className="text-xs font-mono text-sylva-ink-faint">
            CATIA V6 • SIEMENS NX • ANSYS • MATLAB
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
