"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  ArrowUpRight,
  ShieldCheck,
  Compass,
  CheckCircle2,
  Car,
  Users,
  Layers,
  Crosshair,
  Menu,
  X,
  Lock,
} from "lucide-react";
import Link from "next/link";

import { KineticGrid } from "@/components/ui/KineticGrid";
import { LiquidMetalSylvaButton } from "@/components/ui/LiquidMetalSylvaButton";
import { SylvaDock } from "@/components/ui/SylvaDock";

// ============================================================================
// 1. DATA & DISCIPLINE CONFIGURATION (ANCHOR AUTOMOTIVE GROUP)
// ============================================================================

const DISCIPLINES = [
  {
    id: "biw",
    label: "Body in White (BIW)",
    badge: "Structural Sheet Metal & FEA",
    tagline: "Stamping Tooling, Class-A Surfacing & Crashworthiness Architecture",
    metrics: "140+ Placed Senior Engineers",
    skills: [
      "Hot Stamping & Die Formability (AutoForm)",
      "LS-DYNA Non-Linear Crashworthiness",
      "CATIA V6 / Siemens NX BIW Master Modeling",
    ],
  },
  {
    id: "trim",
    label: "Interior Trim & Cabin",
    badge: "Cockpit & Perceived Quality",
    tagline: "Injection-Molded Plastics, Ergonomics & Acoustic NVH Analysis",
    metrics: "95+ Placed Senior Engineers",
    skills: [
      "A/B/C-Pillar & Instrument Panel Tooling",
      "Engineering Resins & Structural Foams",
      "Gap, Flushness & GD&T Tolerance Audits",
    ],
  },
  {
    id: "powertrain",
    label: "800V EV Powertrain",
    badge: "High-Voltage & Battery CTP",
    tagline: "Modular Battery Enclosures, Cold-Plates & Thermal CFD Integration",
    metrics: "110+ Placed Senior Engineers",
    skills: [
      "Cell-to-Pack (CTP) Structural Battery Trays",
      "800V Silicon Carbide Inverter Bus Routing",
      "Liquid Cold-Plate Channels & Thermal CFD",
    ],
  },
];

const OEM_PARTNERS = [
  "OEM Tier-1 Network",
  "Rivian",
  "Ford Mobility",
  "General Motors",
  "Stellantis",
  "Lucid Motors",
  "Magna International",
  "Bosch Mobility",
];

// ============================================================================
// 2. LIQUID METAL PILL BUTTON COMPONENT
// ============================================================================

interface LiquidDomainPillProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function LiquidDomainPill({ label, isActive, onClick }: LiquidDomainPillProps) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 450, damping: 26 }}
      style={{
        background: isActive
          ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(48, 54, 66, 1) 0%, rgba(22, 26, 35, 1) 55%, rgba(12, 14, 18, 1) 100%)`
          : isHovered
          ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 1) 0%, rgba(244, 243, 239, 1) 60%, rgba(232, 230, 224, 1) 100%)`
          : "rgba(255, 255, 255, 0.95)",
      }}
      className={`relative inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 overflow-hidden shadow-sm z-30 cursor-pointer select-none border ${
        isActive
          ? "text-white border-zinc-400/80 shadow-[0_6px_20px_rgba(0,0,0,0.22),inset_0_1px_1px_rgba(255,255,255,0.45)]"
          : "text-[#2B303A] border-black/10 hover:border-black/25 hover:shadow-md"
      }`}
    >
      {/* Specular Liquid Metal Reflection Curve */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/30 pointer-events-none rounded-full" />

      {/* Shimmer Glint Sweep */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.6)_50%,transparent_75%)] bg-[length:250%_100%] animate-[shimmer_3.5s_infinite] pointer-events-none" />

      <span className="relative z-10 font-medium">
        {label}
      </span>
    </motion.button>
  );
}

// ============================================================================
// 3. FRAMER MOTION ANIMATION VARIANTS
// ============================================================================

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ============================================================================
// 4. MAIN HERO COMPONENT (ANCHOR AUTOMOTIVE GROUP)
// ============================================================================

export function AutomotiveStaffingHero() {
  const [activeDiscipline, setActiveDiscipline] = useState<string>("biw");
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const selectedDisciplineData =
    DISCIPLINES.find((d) => d.id === activeDiscipline) || DISCIPLINES[0];

  return (
    <div className="relative min-h-screen w-full bg-[#F6F5F2] text-[#0F1115] overflow-hidden selection:bg-black/10 selection:text-black">
      {/* ---------------------------------------------------------------------- */}
      {/* LAYER 0: INTERACTIVE KINETIC GRID (Studio Light Mode)                  */}
      {/* ---------------------------------------------------------------------- */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        {mounted && <KineticGrid preset="studio-light" />}
      </div>

      {/* Subtle Studio Light Vignette */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_50%_35%,rgba(255,255,255,0.45),transparent_70%)]" />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_bottom,rgba(246,245,242,0.85)_15%,transparent_80%)]" />

      {/* ---------------------------------------------------------------------- */}
      {/* LAYER 10: UI FOREGROUND OVERLAY (Pointer-events-none container)        */}
      {/* ---------------------------------------------------------------------- */}
      <div className="relative z-10 pointer-events-none min-h-screen flex flex-col justify-between px-4 sm:px-8 lg:px-14 pt-6 pb-8 max-w-[1560px] mx-auto">
        
        {/* TOP BAR / NAVIGATION (Zero-Overlap Integrated Layout) */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full flex items-center justify-between pointer-events-auto border-b border-black/[0.08] pb-4 gap-4 relative"
        >
          {/* Left: Logo & Identity */}
          <div className="flex items-center gap-3 flex-none">
            <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.08] flex items-center justify-center shadow-sm">
              <Car className="w-5 h-5 text-[#0F1115]" />
            </div>
            <div>
              <span className="font-bold tracking-wider text-sm sm:text-base text-[#0F1115] uppercase block leading-none">
                ANCHOR AUTOMOTIVE
              </span>
              <p className="text-[10px] text-[#717682] font-mono tracking-wide mt-1">
                DETROIT METRO // NOVI, MI
              </p>
            </div>
          </div>

          {/* Center: Integrated Floating Capsule Dock (Desktop Viewport) */}
          <div className="hidden lg:flex items-center justify-center flex-1 px-2">
            <SylvaDock />
          </div>

          {/* Right: Action & Status Indicator + Mobile Menu Button */}
          <div className="flex items-center gap-3 flex-none">
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-black/[0.08] text-xs text-[#5A606D] font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>48h Candidate Dispatch</span>
            </div>

            <a
              href="#consultancy"
              className="group relative px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-[#0F1115] hover:bg-[#252830] transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <span>Initiate RFP</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white border border-black/[0.08] text-[#0F1115] shadow-sm hover:bg-[#F6F5F2] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.header>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden pointer-events-auto w-full bg-white/95 backdrop-blur-2xl border border-black/[0.08] rounded-[2rem] p-6 shadow-xl my-4 space-y-4"
            >
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <a
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl bg-[#F6F5F2] hover:bg-black/5 text-[#0F1115] flex items-center gap-2"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>About</span>
                </a>
                <a
                  href="#services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl bg-[#F6F5F2] hover:bg-black/5 text-[#0F1115] flex items-center gap-2"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Services</span>
                </a>
                <a
                  href="#rework"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl bg-[#F6F5F2] hover:bg-black/5 text-[#0F1115] flex items-center gap-2"
                >
                  <Crosshair className="w-3.5 h-3.5" />
                  <span>Rework Lab</span>
                </a>
                <a
                  href="#academy"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl bg-[#F6F5F2] hover:bg-black/5 text-[#0F1115] flex items-center gap-2"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Academy</span>
                </a>
              </div>

              <div className="pt-2 border-t border-black/5 flex items-center justify-between">
                <Link
                  href="/admin"
                  className="text-[11px] font-mono text-[#5A606D] hover:text-[#0F1115] flex items-center gap-1.5"
                >
                  <Lock className="w-3 h-3" />
                  <span>Admin Registration Portal</span>
                </Link>

                <a
                  href="#consultancy"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-mono font-semibold text-[#0F1115] underline"
                >
                  Contact & NDA →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HERO MAIN BODY */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-8"
        >
          {/* Left Column: Hero Copy & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 pointer-events-auto">
            
            {/* Architectural Status Tag */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/[0.08] shadow-sm">
                <Crosshair className="w-3.5 h-3.5 text-[#0F1115]" />
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#5A606D]">
                  TIER-1 ADVANCED MOBILITY CONSULTANCY
                </span>
                <span className="text-zinc-300">|</span>
                <span className="text-[11px] font-mono text-[#0F1115] font-semibold">
                  ASIL-D & ISO 26262
                </span>
              </div>
            </motion.div>

            {/* Main Headline from Anchor Automotive Group */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-[#0F1115] leading-[1.04]"
            >
              Engineering the{" "}
              <span className="text-[#5A606D] font-normal italic">
                next architecture
              </span>{" "}
              of mobility.
            </motion.h1>

            {/* Subheadline from Anchor Automotive Group */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-[#5A606D] font-normal leading-relaxed max-w-2xl"
            >
              Anchor Automotive Group provides end-to-end Body-in-White kinematics, 800V EV powertrain architecture, and precision digital-twin validation for OEM innovators.
            </motion.p>

            {/* Domain Selector Pills (Liquid Metal Styled) */}
            <motion.div variants={itemVariants} className="space-y-3 pt-2 relative z-30 pointer-events-auto">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#717682] block font-semibold">
                Select Specialized Engineering Domain:
              </span>
              <div className="flex flex-wrap gap-3">
                {DISCIPLINES.map((discipline) => (
                  <LiquidDomainPill
                    key={discipline.id}
                    label={discipline.label}
                    isActive={activeDiscipline === discipline.id}
                    onClick={() => setActiveDiscipline(discipline.id)}
                  />
                ))}
              </div>
            </motion.div>

            {/* Liquid Metal Explore Button & CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2 relative z-20 pointer-events-auto"
            >
              {/* Liquid Metal "Explore the work" shader button from the original website */}
              <div className="relative -ml-2 sm:-ml-3 my-0 flex-none">
                <LiquidMetalSylvaButton />
              </div>

              {/* Primary Consultation Action */}
              <a
                href="#consultancy"
                className="relative group px-7 py-3.5 rounded-full font-semibold text-xs uppercase tracking-wider text-white bg-[#0F1115] hover:bg-[#252830] transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 z-20 cursor-pointer"
              >
                <span>Initiate Consultation</span>
                <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </motion.div>

            {/* Interactive Grid Indicator */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 text-[11px] font-mono text-[#717682] pt-1"
            >
              <Compass className="w-3.5 h-3.5 text-[#0F1115] animate-spin-slow" />
              <span>Interactive Kinetic Drafting Canvas • Move Cursor Across Screen to Warp Mesh</span>
            </motion.div>
          </div>

          {/* Right Column: Telemetry & Discipline Inspection Card */}
          <div className="lg:col-span-5 pointer-events-auto flex justify-end">
            <motion.div
              variants={itemVariants}
              className="w-full max-w-md p-7 rounded-[2rem] bg-white border border-black/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.06)] relative overflow-hidden"
            >
              {/* Top Accent Rim Line */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-black/15 to-transparent" />

              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-md bg-black/[0.04] border border-black/[0.08] text-[10px] font-mono uppercase tracking-widest text-[#4B5563]">
                  {selectedDisciplineData.badge}
                </span>
                <span className="text-xs font-mono text-[#5A606D] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  OEM Vetted
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedDisciplineData.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="text-xl font-bold text-[#0F1115] tracking-tight">
                      {selectedDisciplineData.label}
                    </h3>
                    <p className="text-xs text-[#5A606D] mt-1 leading-relaxed">
                      {selectedDisciplineData.tagline}
                    </p>
                  </div>

                  {/* Core Skill Capabilities */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#717682] block">
                      Placement Competency Matrix:
                    </span>
                    {selectedDisciplineData.skills.map((skill, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 text-xs text-[#1F232B] bg-[#F8F7F4] border border-black/[0.05] p-2.5 rounded-xl"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0F1115] flex-shrink-0" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stat Footer in Card */}
                  <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between text-xs font-mono">
                    <span className="text-[#717682]">Active Talent Bench:</span>
                    <span className="text-[#0F1115] font-bold">
                      {selectedDisciplineData.metrics}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>

        {/* BOTTOM METRICS BAR & OEM TICKER */}
        <motion.footer
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full pointer-events-auto border-t border-black/[0.08] pt-5"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pb-4">
            {[
              { value: "48 Hrs", label: "Average Shortlist Time" },
              { value: "98.4%", label: "OEM Retention Rate" },
              { value: "350+", label: "Specialized Engineers Placed" },
              { value: "100%", label: "ASIL-D / ISO Compliant" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white border border-black/[0.06] shadow-sm"
              >
                <div className="text-xl font-bold font-mono text-[#0F1115] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[10px] text-[#717682] font-mono uppercase tracking-wider mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* OEM Trust Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-[#717682] font-mono">
            <span className="uppercase tracking-widest text-[10px]">
              Trusted By Engineering Teams At:
            </span>
            <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-[#4B5563]">
              {OEM_PARTNERS.slice(1).map((partner, idx) => (
                <span
                  key={idx}
                  className="hover:text-[#0F1115] transition-colors"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
