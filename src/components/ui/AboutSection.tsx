"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, Target, Award, Users, CheckCircle2, ShieldCheck, ArrowUpRight } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-28 relative bg-sylva-surface border-t border-white/10 overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-accent-pale/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-sylva-ink-soft uppercase">
              <Compass className="w-3.5 h-3.5" />
              <span>// ABOUT ANCHOR AUTOMOTIVE GROUP</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight leading-tight">
              Innovating vehicle performance, <span className="italic font-normal text-accent-pale">empowering engineering talent</span>.
            </h2>
            <p className="text-sylva-ink-soft text-sm sm:text-base leading-relaxed font-light">
              Anchor Automotive Group is an advanced automotive engineering services firm based in Novi, Michigan. We deliver high-precision engineering design, manufacturing rework, and specialized industry training across the Detroit automotive corridor.
            </p>
          </div>

          <div className="flex flex-col text-xs font-mono text-sylva-ink-faint gap-1">
            <span>HEADQUARTERS: NOVI, MI</span>
            <span>METRO DETROIT TECH CORRIDOR</span>
          </div>
        </div>

        {/* 2-Column Editorial Grid: Mission & Market-Ready Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Card 1: Our Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 p-8 sm:p-10 rounded-[2.5rem] bg-paper-card text-paper-ink shadow-paper-soft hover:shadow-paper-hover transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-paper-label">
                  OUR MISSION // CORE PURPOSE
                </span>
                <div className="w-9 h-9 rounded-full bg-paper-surface border border-black/5 flex items-center justify-center text-paper-ink shadow-sm">
                  <Target className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-2xl font-normal text-paper-ink tracking-tight mb-4">
                Top-Notch Engineering Tailored to Automotive Realities
              </h3>
              <p className="text-paper-label text-sm leading-relaxed mb-6 font-light">
                Our mission is to provide top-notch engineering services tailored to the automotive industry by leveraging cutting-edge technologies to innovate and enhance vehicle performance. We combine advanced mechanical engineering with hands-on shop-floor pragmatism to resolve complex vehicle integration challenges.
              </p>
            </div>

            <div className="space-y-2.5 pt-6 border-t border-black/5">
              {[
                "Accelerating OEM vehicle program timelines from concept to tooling",
                "Advanced multi-physics FEA simulation and crashworthiness optimization",
                "Full compliance with ISO 9001:2015 and ISO 26262 ASIL-D functional safety",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-paper-ink/85 font-light">
                  <CheckCircle2 className="w-3.5 h-3.5 text-paper-label flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 2: The Training & Talent Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 p-8 sm:p-10 rounded-[2.5rem] bg-paper-card text-paper-ink shadow-paper-soft hover:shadow-paper-hover transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-paper-label">
                  INDUSTRY BRIDGE // TALENT DEVELOPMENT
                </span>
                <div className="w-9 h-9 rounded-full bg-paper-surface border border-black/5 flex items-center justify-center text-paper-ink shadow-sm">
                  <Users className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-2xl font-normal text-paper-ink tracking-tight mb-4">
                Bridging Academic Theory with OEM Expectations
              </h3>
              <p className="text-paper-label text-sm leading-relaxed mb-6 font-light">
                A central pillar of Anchor Automotive is bridging the gap between academic knowledge and dynamic industry demands. We empower aspiring professionals with comprehensive documentation and hands-on training across every stage of a product's lifecycle—delivering market-ready engineers whom OEMs can utilize immediately without ramp-up friction.
              </p>
            </div>

            <div className="space-y-2.5 pt-6 border-t border-black/5">
              {[
                "100% market-ready candidates equipped with CATIA V6 and NX expertise",
                "Cross-functional mastery in BIW stamping, interior trim, and powertrain",
                "Hands-on training covering DFM, GD&T, FMEA, and APQP product lifecycles",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-paper-ink/85 font-light">
                  <CheckCircle2 className="w-3.5 h-3.5 text-paper-label flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Value Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
          {[
            {
              title: "Novi, MI Tech Center",
              desc: "Located at 44593 Ellery Ln in the heart of Michigan's automotive engineering cluster.",
            },
            {
              title: "Cross-Functional Scope",
              desc: "Seamless integration spanning Body Structures, Interior Trim, and Powertrain systems.",
            },
            {
              title: "Shop-Floor Containment",
              desc: "Rapid rework dispatch including precision drilling, welding, 3D printing, and laser marking.",
            },
            {
              title: "Resident Engineering",
              desc: "Dedicated on-site engineering staff directly embedded at OEM and Tier-1 assembly facilities.",
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between"
            >
              <span className="text-[10px] font-mono tracking-widest text-accent-pale uppercase block mb-2">
                ANCHOR ADVANTAGE // 0{idx + 1}
              </span>
              <h4 className="text-sm font-medium text-white mb-1.5">{stat.title}</h4>
              <p className="text-xs text-sylva-ink-soft leading-relaxed font-light">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
