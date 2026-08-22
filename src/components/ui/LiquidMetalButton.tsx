"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface LiquidMetalButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "amber" | "chrome" | "cyan";
  icon?: React.ElementType;
  className?: string;
}

export function LiquidMetalButton({
  children,
  href,
  onClick,
  variant = "amber",
  icon: Icon = ArrowUpRight,
  className = "",
}: LiquidMetalButtonProps) {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "amber":
        return {
          border: "border-hazard-500/80 hover:border-hazard-400",
          glow: "shadow-neon-amber",
          bgGradient: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(245, 158, 11, 0.45) 0%, rgba(217, 119, 6, 0.15) 45%, rgba(15, 17, 26, 0.95) 100%)`,
          textColor: "text-amber-100",
          accentColor: "text-hazard-400",
        };
      case "cyan":
        return {
          border: "border-cyber-500/80 hover:border-cyber-400",
          glow: "shadow-neon-cyan",
          bgGradient: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(6, 182, 212, 0.45) 0%, rgba(8, 145, 178, 0.15) 45%, rgba(15, 17, 26, 0.95) 100%)`,
          textColor: "text-cyan-100",
          accentColor: "text-cyber-400",
        };
      case "chrome":
      default:
        return {
          border: "border-titanium-400/60 hover:border-white",
          glow: "shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]",
          bgGradient: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.3) 0%, rgba(148, 163, 184, 0.15) 50%, rgba(15, 17, 26, 0.95) 100%)`,
          textColor: "text-white",
          accentColor: "text-white",
        };
    }
  };

  const styles = getVariantStyles();

  const content = (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{
        background: styles.bgGradient,
      }}
      className={`relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl border font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-md overflow-hidden transition-all duration-300 ${styles.border} ${styles.glow} ${styles.textColor} ${className}`}
    >
      {/* Liquid Chrome Flow Surface Reflection */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 pointer-events-none" />

      {/* Button Label */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {Icon && (
          <Icon className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${styles.accentColor}`} />
        )}
      </span>

      {/* Scanline Glint */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.4)_50%,transparent_75%)] bg-[length:250%_100%] animate-[shimmer_3s_infinite] pointer-events-none" />
    </motion.div>
  );

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={handleMouseMove}
        className="group inline-block"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      className="group inline-block"
    >
      {content}
    </button>
  );
}
