"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import {
  Layers,
  Wrench,
  GraduationCap,
  FileLock2,
  Compass,
} from "lucide-react";

interface DockItemProps {
  mouseX: MotionValue<number>;
  icon?: React.ElementType;
  label: string;
  href: string;
}

function DockItem({ mouseX, icon: Icon, label, href }: DockItemProps) {
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

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ scale, y }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl border border-transparent hover:border-white/10 hover:bg-white/10 text-sylva-ink-soft hover:text-white transition-all text-xs font-light tracking-wide whitespace-nowrap flex-none select-none cursor-pointer"
    >
      {Icon && <Icon className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />}
      <span>{label}</span>
    </motion.a>
  );
}

export function SylvaDock() {
  const mouseX = useMotionValue(Infinity);

  const items = [
    { label: "About", href: "#about", icon: Compass },
    { label: "Services", href: "#services", icon: Layers },
    { label: "Rework Lab", href: "#rework", icon: Wrench },
    { label: "Academy", href: "#academy", icon: GraduationCap },
    { label: "Consultation", href: "#consultancy", icon: FileLock2 },
  ];

  return (
    <div className="fixed top-4 sm:top-6 left-0 right-0 z-50 justify-center pointer-events-none px-4 hidden lg:flex">
      {/* ── Desktop Floating Capsule Dock ──────────────────────────── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="pointer-events-auto flex items-center gap-1.5 p-1.5 sm:p-2 rounded-[1.75rem] border border-white/15 bg-sylva-surface/90 backdrop-blur-2xl shadow-dock-glow"
      >
        {items.map((item, idx) => (
          <DockItem
            key={idx}
            mouseX={mouseX}
            icon={item.icon}
            label={item.label}
            href={item.href}
          />
        ))}
      </motion.nav>
    </div>
  );
}
