"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue, AnimatePresence } from "framer-motion";
import {
  Layers,
  Wrench,
  GraduationCap,
  FileLock2,
  Compass,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";

interface DockItemProps {
  mouseX: MotionValue<number>;
  icon?: React.ElementType;
  label: string;
  href: string;
  isCta?: boolean;
}

function DockItem({ mouseX, icon: Icon, label, href, isCta }: DockItemProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  // Proximity-based gentle scaling
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const scaleSync = useTransform(distance, [-160, 0, 160], [1, 1.05, 1]);
  const scale = useSpring(scaleSync, { mass: 0.1, stiffness: 260, damping: 20 });

  const ySync = useTransform(distance, [-160, 0, 160], [0, -2, 0]);
  const y = useSpring(ySync, { mass: 0.1, stiffness: 260, damping: 20 });

  if (isCta) {
    return (
      <motion.a
        ref={ref}
        href={href}
        style={{ scale, y }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-white/12 hover:bg-paper-card text-white hover:text-paper-ink border border-white/20 hover:border-transparent transition-all text-xs font-medium tracking-wide shadow-sm flex-none select-none cursor-pointer"
      >
        <span>{label}</span>
        <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
      </motion.a>
    );
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ scale, y }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-2xl border border-transparent hover:border-white/10 hover:bg-white/8 text-sylva-ink-soft hover:text-white transition-all text-xs font-light tracking-wide whitespace-nowrap flex-none select-none"
    >
      {Icon && <Icon className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />}
      <span>{label}</span>
    </motion.a>
  );
}

export function SylvaDock() {
  const mouseX = useMotionValue(Infinity);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const items = [
    { label: "About", href: "#about", icon: Compass },
    { label: "Services", href: "#services", icon: Layers },
    { label: "Rework Lab", href: "#rework", icon: Wrench },
    { label: "Academy", href: "#academy", icon: GraduationCap },
    { label: "Consultation", href: "#consultancy", icon: FileLock2, isCta: true },
  ];

  return (
    <>
      <div className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
        {/* ── Desktop Dock (Clean Navigation Links Only) ───────────────── */}
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="hidden md:flex pointer-events-auto items-center gap-1.5 p-1.5 sm:p-2 rounded-[1.75rem] border border-white/15 bg-sylva-surface/90 backdrop-blur-2xl shadow-dock-glow"
        >
          {items.map((item, idx) => (
            <DockItem
              key={idx}
              mouseX={mouseX}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isCta={item.isCta}
            />
          ))}
        </motion.nav>

        {/* ── Mobile / Tablet Compact Navbar (Visible below md) ───────── */}
        <div className="flex md:hidden w-full max-w-sm pointer-events-auto items-center justify-between p-2.5 rounded-2xl border border-white/15 bg-sylva-surface/90 backdrop-blur-xl shadow-dock-glow">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-xs font-semibold tracking-wider text-white pl-1"
          >
            ANCHOR <span className="font-light text-sylva-ink-soft">AUTO</span>
          </a>

          {/* Right Action & Menu Toggle */}
          <div className="flex items-center gap-2">
            <a
              href="#consultancy"
              className="px-3 py-1.5 rounded-xl bg-white/12 text-white text-[11px] font-medium border border-white/15"
            >
              Consult
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 rounded-xl bg-white/5 text-white border border-white/10 flex items-center justify-center"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Full Navigation Overlay Sheet ────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden p-5 rounded-[2rem] bg-paper-card text-paper-ink shadow-2xl border border-white/90"
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
    </>
  );
}
