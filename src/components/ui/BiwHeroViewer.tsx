"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sliders, Sparkles, Layers, Eye, Scan, CheckCircle2 } from "lucide-react";

type ViewMode = "spotlight" | "slider" | "solid" | "mesh";

export function BiwHeroViewer() {
  const [mode, setMode] = useState<ViewMode>("spotlight");
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Pointer Parallax calculations
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-4, 4]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [3, -3]);
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xNorm = (e.clientX - rect.left) / rect.width;
    const yNorm = (e.clientY - rect.top) / rect.height;

    mouseX.set(xNorm - 0.5);
    mouseY.set(yNorm - 0.5);

    setSpotlightPos({
      x: xNorm * 100,
      y: yNorm * 100,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const hotspots = [
    {
      id: 1,
      x: 75,
      y: 54,
      title: "Front Mega-Casting",
      spec: "Single-piece high-pressure die-cast aluminum (HPDC)",
    },
    {
      id: 2,
      x: 33,
      y: 42,
      title: "Boron B-Pillar",
      spec: "1,500 MPa press-hardened steel for roof crush resistance",
    },
    {
      id: 3,
      x: 52,
      y: 68,
      title: "Integrated Battery Cradle",
      spec: "Cell-to-pack (CTP) structural sill with 42,500 Nm/deg rigidity",
    },
    {
      id: 4,
      x: 12,
      y: 46,
      title: "Rear Kinematic Node",
      spec: "Multi-link suspension mounting with zero elastokinematic compliance",
    },
  ];

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* ── Mode Selection Toolbar (Sylva Glass Pill) ────────────────── */}
      <div className="flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-2xl bg-sylva-surface/90 border border-white/10 shadow-lg backdrop-blur-md mb-6 z-20 max-w-[calc(100vw-2rem)] overflow-x-auto no-scrollbar">
        <button
          onClick={() => setMode("spotlight")}
          className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-medium tracking-wide transition-all whitespace-nowrap ${
            mode === "spotlight"
              ? "bg-paper-card text-paper-ink shadow-md"
              : "text-sylva-ink-soft hover:text-white hover:bg-white/5"
          }`}
        >
          <Scan className="w-3.5 h-3.5" />
          <span>Interactive <span className="hidden xs:inline">X-Ray</span></span>
        </button>

        <button
          onClick={() => setMode("slider")}
          className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-medium tracking-wide transition-all whitespace-nowrap ${
            mode === "slider"
              ? "bg-paper-card text-paper-ink shadow-md"
              : "text-sylva-ink-soft hover:text-white hover:bg-white/5"
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Split Wipe</span>
        </button>

        <button
          onClick={() => setMode("solid")}
          className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-medium tracking-wide transition-all whitespace-nowrap ${
            mode === "solid"
              ? "bg-paper-card text-paper-ink shadow-md"
              : "text-sylva-ink-soft hover:text-white hover:bg-white/5"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Solid<span className="hidden xs:inline"> Alloy</span></span>
        </button>

        <button
          onClick={() => setMode("mesh")}
          className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-medium tracking-wide transition-all whitespace-nowrap ${
            mode === "mesh"
              ? "bg-paper-card text-paper-ink shadow-md"
              : "text-sylva-ink-soft hover:text-white hover:bg-white/5"
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>FEA<span className="hidden xs:inline"> Wireframe</span></span>
        </button>
      </div>

      {/* ── Main Interactive BIW Viewport ────────────────────────────── */}
      <motion.div
        ref={containerRef}
        onClick={() => setActiveHotspot(null)}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: 1200,
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
        }}
        className="relative w-full max-w-5xl h-[340px] sm:h-[460px] md:h-[540px] flex items-center justify-center cursor-crosshair select-none"
      >
        {/* Soft Floor Shadow */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-16 bg-black/40 blur-2xl rounded-full pointer-events-none" />

        {/* 1. Base Layer: Solid Stamped Stamping BIW (images/1.png) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/biw-solid.png`}
            alt="Anchor Automotive BIW Stamped Chassis Structure"
            className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.45)]"
          />
        </div>

        {/* 2. Overlay Layer: FEA / CAD Wireframe Mesh (images/2.png) */}
        <div
          style={{
            clipPath:
              mode === "mesh"
                ? "inset(0% 0% 0% 0%)"
                : mode === "solid"
                ? "inset(100% 0% 0% 0%)"
                : mode === "slider"
                ? `inset(0% ${100 - sliderPosition}% 0% 0%)`
                : isHovered
                ? `circle(140px at ${spotlightPos.x}% ${spotlightPos.y}%)`
                : `circle(120px at 50% 50%)`,
            transition: mode === "spotlight" && !isHovered ? "clip-path 0.6s ease-out" : "none",
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/biw-mesh.png`}
            alt="Anchor Automotive BIW Wireframe Mesh"
            className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]"
          />

          {/* X-Ray Laser Ring Indicator when in spotlight mode */}
          {mode === "spotlight" && (
            <div
              style={{
                left: `${spotlightPos.x}%`,
                top: `${spotlightPos.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              className="absolute w-[280px] h-[280px] rounded-full border border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.25)] pointer-events-none transition-opacity duration-300"
            />
          )}
        </div>

        {/* 3. Slider Wipe Handle when in slider mode */}
        {mode === "slider" && (
          <div
            style={{ left: `${sliderPosition}%` }}
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_15px_#fff] pointer-events-none z-30"
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-paper-card text-paper-ink border border-white/60 shadow-xl flex items-center justify-center font-mono text-[10px] font-bold">
              ⇄
            </div>
          </div>
        )}

        {/* 4. Interactive Hotspots (Click to view) */}
        {hotspots.map((h) => {
          const isActive = activeHotspot === h.id;
          return (
            <div
              key={h.id}
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(isActive ? null : h.id);
                }}
                className={`relative w-7 h-7 rounded-full border transition-all shadow-lg flex items-center justify-center cursor-pointer ${
                  isActive
                    ? "bg-white border-white text-paper-ink scale-110 shadow-white/20"
                    : "bg-sylva-deep/95 border-white/60 text-white hover:scale-115 hover:border-white"
                }`}
                aria-label={`Inspect ${h.title}`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isActive ? "bg-paper-ink" : "bg-accent-pale"
                  }`}
                />
                {!isActive && (
                  <span className="absolute inset-0 rounded-full border border-white/30 animate-ping pointer-events-none" />
                )}
              </button>

              {/* Hotspot Popover — Only renders when this specific button is clicked */}
              {isActive && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-3.5 rounded-2xl bg-paper-card text-paper-ink shadow-paper-soft border border-white/90 z-50 pointer-events-auto animate-in fade-in zoom-in-95 duration-200"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-paper-label">
                      SUB-ASSEMBLY // 0{h.id}
                    </span>
                    <button
                      onClick={() => setActiveHotspot(null)}
                      className="p-1 -mr-1 -mt-1 text-paper-label hover:text-paper-ink rounded-full"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="text-xs font-semibold text-paper-ink">{h.title}</div>
                  <p className="text-[11px] text-paper-ink/80 leading-snug mt-1 font-light">
                    {h.spec}
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {/* Draggable slider input overlay */}
        {mode === "slider" && (
          <input
            type="range"
            min={5}
            max={95}
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-40"
          />
        )}
      </motion.div>

      {/* Interactive Helper Caption */}
      <div className="text-[11px] font-mono tracking-widest text-sylva-ink-faint uppercase text-center mt-2">
        {mode === "spotlight"
          ? "Hover pointer across body to reveal underlying FEA wireframe mesh"
          : mode === "slider"
          ? "Drag slider horizontally to wipe between stamped alloy and CAE mesh"
          : mode === "solid"
          ? "Viewing production stamped aluminum / high-strength steel BIW"
          : "Viewing structural finite-element polygonal mesh architecture"}
      </div>
    </div>
  );
}
