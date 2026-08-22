"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import {
  Box,
  Layers,
  Wrench,
  GraduationCap,
  Activity,
  FileLock2,
  Sparkles,
} from "lucide-react";

interface DockItemProps {
  mouseX: MotionValue<number>;
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
}

function DockIcon({ mouseX, icon: Icon, label, href, active }: DockItemProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Calculate magnification width/height based on proximity
  const widthSync = useTransform(distance, [-150, 0, 150], [42, 68, 42]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 15 });

  const iconSizeSync = useTransform(distance, [-150, 0, 150], [18, 28, 18]);
  const iconSize = useSpring(iconSizeSync, { mass: 0.1, stiffness: 200, damping: 15 });

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ width, height: width }}
      whileTap={{ scale: 0.92 }}
      className={`relative group rounded-2xl flex items-center justify-center transition-colors border backdrop-blur-xl ${
        active
          ? "bg-hazard-500/20 border-hazard-500/80 shadow-neon-amber text-hazard-400"
          : "bg-carbon-850/80 border-carbon-700/80 hover:border-hazard-500/60 hover:bg-carbon-750 text-titanium-300 hover:text-white"
      }`}
    >
      {/* Moving Specular Rim Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-white/5 to-white/15 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Dynamic Sized Icon */}
      <motion.div style={{ width: iconSize, height: iconSize }} className="flex items-center justify-center">
        <Icon className="w-full h-full" />
      </motion.div>

      {/* Active Indicator Dot */}
      {active && (
        <span className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full bg-hazard-400 shadow-[0_0_8px_#f59e0b]" />
      )}

      {/* Floating Tooltip Pill */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-carbon-900/95 border border-carbon-700 text-[10px] font-mono uppercase tracking-wider text-white opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 whitespace-nowrap shadow-xl z-50">
        {label}
      </div>
    </motion.a>
  );
}

export function SpringDock() {
  const mouseX = useMotionValue(Infinity);

  const dockItems = [
    { icon: Box, label: "3D CAD Engine", href: "#cad-viewer", active: true },
    { icon: Layers, label: "BIW & Powertrain", href: "#services" },
    { icon: Wrench, label: "Rework & Prototyping", href: "#rework" },
    { icon: GraduationCap, label: "Engineering Academy", href: "#academy" },
    { icon: Activity, label: "Live Telemetry", href: "#telemetry" },
    { icon: FileLock2, label: "NDA & RFQ Portal", href: "#consultancy" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex items-center gap-3 px-4 py-3 rounded-3xl bg-carbon-950/85 backdrop-blur-2xl border border-carbon-700/80 shadow-2xl shadow-black/80"
      >
        {dockItems.map((item, index) => (
          <DockIcon
            key={index}
            mouseX={mouseX}
            icon={item.icon}
            label={item.label}
            href={item.href}
            active={item.active}
          />
        ))}
      </motion.div>
    </div>
  );
}
