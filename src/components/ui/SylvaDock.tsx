"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import {
  Layers,
  Wrench,
  GraduationCap,
  FileLock2,
  Anchor,
  Compass,
  ArrowRight,
} from "lucide-react";

interface DockItemProps {
  mouseX: MotionValue<number>;
  icon?: React.ElementType;
  label: string;
  href: string;
  isMark?: boolean;
}

function DockItem({ mouseX, icon: Icon, label, href, isMark }: DockItemProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-130, 0, 130], [isMark ? 36 : 90, isMark ? 46 : 125, isMark ? 36 : 90]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 220, damping: 18 });

  const heightSync = useTransform(distance, [-130, 0, 130], [36, 44, 36]);
  const height = useSpring(heightSync, { mass: 0.1, stiffness: 220, damping: 18 });

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  if (isMark) {
    return (
      <motion.a
        ref={ref}
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex items-center justify-center p-1.5 rounded-xl bg-paper-card text-paper-ink border border-white/40 hover:bg-white transition-all shadow-sm flex-none select-none cursor-pointer overflow-hidden"
        aria-label="Scroll to top of Anchor Automotive Group"
      >
        <img
          src={`${basePath}/images/logo.png`}
          alt="Anchor Automotive Group Logo"
          className="w-full h-full object-contain"
        />
      </motion.a>
    );
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative inline-flex items-center justify-center gap-1.5 px-3 rounded-xl border border-transparent hover:border-white/20 bg-white/5 hover:bg-sylva-deep/95 text-sylva-ink-soft hover:text-white transition-all text-[11px] font-medium tracking-wider uppercase whitespace-nowrap flex-none select-none"
    >
      {Icon && <Icon className="w-3.5 h-3.5 opacity-70" />}
      <span>{label}</span>
    </motion.a>
  );
}

export function SylvaDock() {
  const mouseX = useMotionValue(Infinity);

  const items = [
    { label: "Anchor", href: "#", isMark: true },
    { label: "About", href: "#about", icon: Compass },
    { label: "Services", href: "#services", icon: Layers },
    { label: "Rework Lab", href: "#rework", icon: Wrench },
    { label: "Academy", href: "#academy", icon: GraduationCap },
    { label: "Consultation", href: "#consultancy", icon: FileLock2 },
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-2xl border border-white/10 bg-sylva-surface/85 backdrop-blur-xl shadow-dock-glow"
      >
        {items.map((item, idx) => (
          <DockItem
            key={idx}
            mouseX={mouseX}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isMark={item.isMark}
          />
        ))}
      </motion.nav>
    </div>
  );
}
