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
      className="relative inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-2xl border border-transparent hover:border-black/10 hover:bg-black/5 text-[#5A606D] hover:text-[#0F1115] transition-all text-xs font-medium tracking-wide whitespace-nowrap flex-none select-none cursor-pointer"
    >
      {Icon && <Icon className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 text-[#0F1115]" />}
      <span>{label}</span>
    </motion.a>
  );
}

interface SylvaDockProps {
  className?: string;
}

export function SylvaDock({ className = "" }: SylvaDockProps) {
  const mouseX = useMotionValue(Infinity);

  const items = [
    { label: "About", href: "#about", icon: Compass },
    { label: "Services", href: "#services", icon: Layers },
    { label: "Rework Lab", href: "#rework", icon: Wrench },
    { label: "Academy", href: "#academy", icon: GraduationCap },
    { label: "Consultation", href: "#consultancy", icon: FileLock2 },
  ];

  return (
    <motion.nav
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={`pointer-events-auto flex items-center gap-1 p-1 sm:p-1.5 rounded-[1.75rem] border border-black/[0.08] bg-white/90 backdrop-blur-2xl shadow-[0_8px_25px_rgba(0,0,0,0.06)] ${className}`}
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
  );
}
