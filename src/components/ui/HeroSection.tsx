"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ModelCanvas } from "@/components/3d/ModelCanvas";
import { TelemetryPanel } from "@/components/ui/TelemetryPanel";
import { AutomotiveModelType } from "@/components/3d/CadModel";
import {
  ArrowUpRight,
  Shield,
  FileCode,
  Crosshair,
  Compass,
  Upload,
} from "lucide-react";

export function HeroSection() {
  const [modelType, setModelType] = useState<AutomotiveModelType>("suspension");
  const [customModelUrl, setCustomModelUrl] = useState<string>("");
  const [wireframe, setWireframe] = useState(false);
  const [exploded, setExploded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-6 pb-16 overflow-hidden">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Technical Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-carbon-800 pb-3">
          <div className="flex items-center gap-3">
            <span className="telemetry-tag text-hazard-400 font-bold">
              // DISCIPLINE: B2B AUTOMOTIVE SYSTEMS
            </span>
            <span className="text-carbon-700">|</span>
            <span className="telemetry-tag text-titanium-400">
              SPEC: ASIL-D / ISO 26262
            </span>
          </div>

          <div className="flex items-center gap-4 text-[10px] font-mono text-titanium-500">
            <span className="flex items-center gap-1">
              <Crosshair className="w-3 h-3 text-hazard-500" /> LAT: 42.3314° N (DETROIT/NOVI)
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">CAD: CATIA / GLTF 2.0</span>
          </div>
        </div>

        {/* Grid: Split Hero (Left Copy, Right 3D Viewport) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Hero Typography & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-carbon-900 border border-hazard-500/30 text-hazard-400 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-hazard-400 animate-ping" />
              <span className="telemetry-tag font-semibold">ADVANCED MOBILITY CONSULTANCY</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black tracking-tight text-white uppercase leading-[1.08]">
              Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-hazard-400 to-amber-200">Automotive</span> & EV Powertrain Engineering
            </h1>

            {/* Description */}
            <p className="text-titanium-300 text-sm sm:text-base leading-relaxed">
              Anchor Automotive Group provides Tier-1 engineering architecture, high-voltage powertrain design, lightweight chassis kinematics, and interactive 3D digital-twin validation for OEM and mobility innovators.
            </p>

            {/* Key Value Stat Callouts */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded bg-carbon-900/90 border border-carbon-750">
                <div className="text-xl font-bold font-mono text-white">800V</div>
                <div className="telemetry-tag text-[9px] text-titanium-400 mt-0.5">SiC ARCHITECTURE</div>
              </div>
              <div className="p-3 rounded bg-carbon-900/90 border border-carbon-750">
                <div className="text-xl font-bold font-mono text-hazard-400">-38%</div>
                <div className="telemetry-tag text-[9px] text-titanium-400 mt-0.5">CYCLE TIME TO CAD</div>
              </div>
              <div className="p-3 rounded bg-carbon-900/90 border border-carbon-750">
                <div className="text-xl font-bold font-mono text-cyber-400">100%</div>
                <div className="telemetry-tag text-[9px] text-titanium-400 mt-0.5">ASIL-D COMPLIANT</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href="#consultancy"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded text-xs font-bold uppercase tracking-wider text-black bg-hazard-500 hover:bg-hazard-400 transition-all shadow-neon-amber font-mono"
              >
                <span>Request Engineering RFP</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded text-xs font-bold uppercase tracking-wider text-titanium-200 bg-carbon-850 hover:bg-carbon-750 border border-carbon-700 hover:border-carbon-600 transition-all font-mono"
              >
                <FileCode className="w-4 h-4 text-hazard-400" />
                <span>Explore Capabilities</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: 3D CAD Interactive Viewport & HUD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 relative"
            id="cad-viewer"
          >
            {/* Viewport Frame with Industrial Corner Brackets */}
            <div className="relative rounded-xl border border-carbon-700 bg-carbon-950/70 p-1 corner-brackets shadow-2xl">
              {/* Top Viewport Header Bar */}
              <div className="flex items-center justify-between px-4 py-2 bg-carbon-900/90 border-b border-carbon-750 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-hazard-500 animate-pulse" />
                  <span className="telemetry-tag text-titanium-300 text-[10px]">
                    3D VIEWPORT // CAD ASSEMBLY: {modelType.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-mono text-titanium-400">
                  <span className="text-cyber-400">FPS: 60 (LOCKED)</span>
                </div>
              </div>

              {/* 3D WebGL Canvas Viewport */}
              <div className="relative w-full h-[480px] sm:h-[540px] rounded-b-lg overflow-hidden bg-gradient-to-b from-carbon-900/40 to-carbon-950/90">
                {/* Subtle Viewport Grid Lines */}
                <div className="absolute inset-0 bg-tech-grid opacity-25 pointer-events-none" />

                {/* 3D Canvas Engine */}
                <ModelCanvas
                  modelUrl={customModelUrl || undefined}
                  modelType={modelType}
                  wireframe={wireframe}
                  exploded={exploded}
                  autoRotate={autoRotate}
                  className="w-full h-full"
                />

                {/* Overlaid Bottom Instructions */}
                <div className="absolute bottom-3 left-3 pointer-events-none">
                  <div className="px-2.5 py-1 rounded bg-carbon-900/85 border border-carbon-750 backdrop-blur-sm text-[10px] font-mono text-titanium-400 flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-hazard-400" />
                    <span>DRAG TO ROTATE • SCROLL TO ZOOM • SHIFT+DRAG TO PAN</span>
                  </div>
                </div>

                {/* Floating Telemetry & Controls Overlay (Right Aligned on Viewport) */}
                <div className="absolute top-3 right-3 w-64 sm:w-72 pointer-events-auto">
                  <TelemetryPanel
                    modelType={modelType}
                    setModelType={setModelType}
                    wireframe={wireframe}
                    setWireframe={setWireframe}
                    exploded={exploded}
                    setExploded={setExploded}
                    autoRotate={autoRotate}
                    setAutoRotate={setAutoRotate}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
