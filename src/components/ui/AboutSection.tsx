"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, Target, Users, CheckCircle2 } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-28 relative bg-transparent border-t border-black/[0.08] overflow-hidden">
      {/* Background soft ambient highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-black/[0.015] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/[0.08] text-xs font-mono tracking-widest text-[#5A606D] uppercase shadow-sm">
              <Compass className="w-3.5 h-3.5 text-[#0F1115]" />
              <span>// ABOUT ANCHOR AUTOMOTIVE GROUP</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1115] tracking-tight leading-tight">
              Innovating vehicle performance, <span className="italic font-normal text-[#5A606D]">empowering engineering talent</span>.
            </h2>
            <p className="text-[#5A606D] text-sm sm:text-base leading-relaxed font-normal">
              Anchor Automotive Group is an advanced automotive engineering services firm based in Novi, Michigan. We deliver high-precision engineering design, manufacturing rework, and specialized industry training across the Detroit automotive corridor.
            </p>
          </div>

          <div className="flex flex-col text-xs font-mono text-[#717682] gap-1">
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
            className="lg:col-span-6 p-8 sm:p-10 rounded-[2.5rem] bg-white text-[#0F1115] border border-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-[#717682]">
                  OUR MISSION // CORE PURPOSE
                </span>
                <div className="w-9 h-9 rounded-full bg-[#F6F5F2] border border-black/5 flex items-center justify-center text-[#0F1115] shadow-sm">
                  <Target className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-[#0F1115] tracking-tight mb-4">
                Top-Notch Engineering Tailored to Automotive Realities
              </h3>
              <p className="text-[#5A606D] text-sm leading-relaxed mb-6">
                Our mission is to provide top-notch engineering services tailored to the automotive industry by leveraging cutting-edge technologies to innovate and enhance vehicle performance. We combine advanced mechanical engineering with hands-on shop-floor pragmatism to resolve complex vehicle integration challenges.
              </p>
            </div>

            <div className="space-y-2.5 pt-6 border-t border-black/[0.06]">
              {[
                "Accelerating OEM vehicle program timelines from concept to tooling",
                "Advanced multi-physics FEA simulation and crashworthiness optimization",
                "Full compliance with ISO 9001:2015 and ISO 26262 ASIL-D functional safety",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-[#1F232B] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0F1115] flex-shrink-0 mt-0.5" />
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
            className="lg:col-span-6 p-8 sm:p-10 rounded-[2.5rem] bg-white text-[#0F1115] border border-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-[#717682]">
                  INDUSTRY BRIDGE // TALENT DEVELOPMENT
                </span>
                <div className="w-9 h-9 rounded-full bg-[#F6F5F2] border border-black/5 flex items-center justify-center text-[#0F1115] shadow-sm">
                  <Users className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-[#0F1115] tracking-tight mb-4">
                Bridging Academic Theory with OEM Expectations
              </h3>
              <p className="text-[#5A606D] text-sm leading-relaxed mb-6">
                A central pillar of Anchor Automotive is bridging the gap between academic knowledge and dynamic industry demands. We empower aspiring professionals with comprehensive documentation and hands-on training across every stage of a product&apos;s lifecycle—delivering market-ready engineers whom OEMs can utilize immediately without ramp-up friction.
              </p>
            </div>

            <div className="space-y-2.5 pt-6 border-t border-black/[0.06]">
              {[
                "100% market-ready candidates equipped with CATIA V6 and NX expertise",
                "Cross-functional mastery in BIW stamping, interior trim, and powertrain",
                "Hands-on training covering DFM, GD&T, FMEA, and APQP product lifecycles",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-[#1F232B] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0F1115] flex-shrink-0 mt-0.5" />
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
              className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-sm flex flex-col justify-between"
            >
              <span className="text-[10px] font-mono tracking-widest text-[#717682] uppercase block mb-2 font-semibold">
                ANCHOR ADVANTAGE // 0{idx + 1}
              </span>
              <h4 className="text-sm font-bold text-[#0F1115] mb-1.5">{stat.title}</h4>
              <p className="text-xs text-[#5A606D] leading-relaxed">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
