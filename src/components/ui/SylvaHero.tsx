"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiwHeroViewer } from "./BiwHeroViewer";
import {
  ArrowUpRight,
  ShieldCheck,
  Compass,
  Layers,
  Cpu,
  ArrowDown,
  Menu,
  X,
  Wrench,
  GraduationCap,
  FileLock2,
} from "lucide-react";
import { AcademyModal } from "./AcademyModal";
import { ReworkModal } from "./ReworkModal";
import { LiquidMetalSylvaButton } from "./LiquidMetalSylvaButton";

export function SylvaHero() {
  const [academyOpen, setAcademyOpen] = useState(false);
  const [reworkOpen, setReworkOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <>
      <section className="relative w-full min-h-screen sylva-hero-light flex flex-col justify-between pt-8 sm:pt-14 lg:pt-32 pb-16 px-4 sm:px-6 lg:px-12 overflow-hidden select-none">
        {/* Column Guides (Sylva Reference Design) */}
        <div className="column-guides">
          <div className="column-guide left-[12%]" />
          <div className="column-guide left-[36%]" />
          <div className="column-guide left-[64%]" />
          <div className="column-guide left-[88%]" />
        </div>

        {/* Ghost Wordmark (Sylva Typography) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/3 -translate-y-1/2 ghost-typography">
          ANCHOR
        </div>

        {/* Top Header Region (Brand Identity + Mobile Hamburger + Headline + Lede) */}
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-4">
          <div className="lg:col-span-7 space-y-4">
            {/* Top Brand Header Row: Brand Identity (Left) + Hamburger Menu (Right on Mobile) */}
            <div className="flex items-center justify-between w-full">
              {/* Left: Prominent Company Brand Identity */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 p-2 rounded-2xl bg-paper-card text-paper-ink border border-white/60 shadow-md flex items-center justify-center flex-none">
                  <img
                    src={`${basePath}/images/logo.png`}
                    alt="Anchor Automotive Group"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-sm sm:text-lg font-medium tracking-wider text-white uppercase flex items-center gap-2">
                    <span>Anchor Automotive Group</span>
                  </h2>
                  <div className="text-[10px] sm:text-[11px] font-mono tracking-widest text-accent-pale uppercase">
                    Detroit Metro Tech Center • Novi, MI
                  </div>
                </div>
              </div>

              {/* Right on Mobile/Tablet: Sleek Inline Hamburger */}
              <div className="flex lg:hidden items-center">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/15 flex items-center justify-center shadow-md transition-colors"
                  aria-label="Toggle Navigation Menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Mobile Dropdown Menu Sheet */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="lg:hidden p-5 rounded-[2rem] bg-paper-card text-paper-ink shadow-2xl border border-white/90 my-3"
                >
                  <div className="space-y-1">
                    {[
                      { label: "About Anchor Automotive", href: "#about", icon: Compass },
                      { label: "Engineering Disciplines (BIW, Powertrain, Trim)", href: "#services", icon: Layers },
                      { label: "Shop-Floor Rework Lab (Drilling, Welding, 3D Print)", href: "#rework", icon: Wrench },
                      { label: "Anchor Engineering Academy (12-Week Masterclass)", href: "#academy", icon: GraduationCap },
                      { label: "Initiate Mutual NDA & Consultation RFP", href: "#consultancy", icon: FileLock2, isCta: true },
                    ].map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={idx}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center justify-between p-3.5 rounded-2xl transition-colors ${
                            item.isCta
                              ? "bg-sylva-deep text-white font-medium mt-3"
                              : "text-paper-ink hover:bg-paper-surface font-light"
                          }`}
                        >
                          <div className="flex items-center gap-3 text-xs">
                            <Icon className="w-4 h-4 opacity-70" />
                            <span>{item.label}</span>
                          </div>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                        </a>
                      );
                    })}
                  </div>

                  <div className="mt-4 pt-3 border-t border-black/5 text-[10px] font-mono text-paper-label text-center">
                    ANCHOR AUTOMOTIVE GROUP • 44593 ELLERY LN, NOVI, MI
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-sylva-ink-soft uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-pale" />
              <span>TIER-1 ADVANCED MOBILITY CONSULTANCY</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.08]">
              Engineering the <span className="font-normal italic text-accent-pale">next architecture</span> of mobility.
            </h1>
          </div>

          <div className="lg:col-span-5 lg:pt-12 flex flex-col items-start">
            <p className="text-sylva-ink-soft text-sm sm:text-base leading-relaxed font-light mb-2">
              Anchor Automotive Group provides end-to-end Body-in-White kinematics, 800V EV powertrain architecture, and precision digital-twin validation for OEM innovators.
            </p>
            <div className="my-1">
              <LiquidMetalSylvaButton />
            </div>
            <div className="flex items-center gap-6 mt-1 text-xs font-mono text-sylva-ink-faint">
              <span>LOCATION: NOVI, MI (DETROIT METRO)</span>
              <span>•</span>
              <span>ISO 26262 ASIL-D</span>
            </div>
          </div>
        </div>

        {/* Central Interactive BIW Vehicle Inspection */}
        <div className="relative z-10 max-w-6xl mx-auto w-full my-auto">
          <BiwHeroViewer />
        </div>

        {/* Bottom Region: 2 Sylva Alabaster Paper Cards + Stats + Scroll Cue */}
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mt-8">
          {/* Paper Card 1: BIW Kinematics */}
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => setReworkOpen(true)}
            className="lg:col-span-4 p-6 sm:p-7 rounded-[2.5rem] bg-paper-card text-paper-ink shadow-paper-soft hover:shadow-paper-hover transition-all cursor-pointer relative group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-paper-label">
                01 / STRUCTURAL LAB
              </span>
              <div className="w-10 h-10 rounded-full bg-paper-surface border border-black/5 flex items-center justify-center text-paper-ink group-hover:rotate-12 transition-transform shadow-sm">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-xl font-normal text-paper-ink tracking-tight mb-2">
              Body-in-White & Rework
            </h3>
            <p className="text-xs text-paper-label leading-relaxed">
              Precision laser etching, 3D rapid prototyping, and resident quality engineering dispatch.
            </p>
          </motion.div>

          {/* Paper Card 2: Engineering Academy */}
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => setAcademyOpen(true)}
            className="lg:col-span-4 p-6 sm:p-7 rounded-[2.5rem] bg-paper-card text-paper-ink shadow-paper-soft hover:shadow-paper-hover transition-all cursor-pointer relative group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-paper-label">
                02 / OEM STANDARDS
              </span>
              <div className="w-10 h-10 rounded-full bg-paper-surface border border-black/5 flex items-center justify-center text-paper-ink group-hover:rotate-12 transition-transform shadow-sm">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-xl font-normal text-paper-ink tracking-tight mb-2">
              Engineering Academy
            </h3>
            <p className="text-xs text-paper-label leading-relaxed">
              12-week intensive masterclasses bridging university theory with Tier-1 production execution.
            </p>
          </motion.div>

          {/* Right Column: Key Metrics & Scroll Down Indicator */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full pl-0 lg:pl-6 space-y-4">
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-light text-sylva-ink-soft">Torsional Rigidity</span>
                <span className="text-xs font-mono font-medium text-white">42,500 Nm/deg</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-light text-sylva-ink-soft">Inverter Architecture</span>
                <span className="text-xs font-mono font-medium text-white">800V SiC Gen-3</span>
              </div>
            </div>

            <a
              href="#services"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sylva-ink-faint hover:text-white transition-colors pt-2"
            >
              <span>Explore Disciplines</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </a>
          </div>
        </div>
      </section>

      <AcademyModal isOpen={academyOpen} onClose={() => setAcademyOpen(false)} />
      <ReworkModal isOpen={reworkOpen} onClose={() => setReworkOpen(false)} />
    </>
  );
}
