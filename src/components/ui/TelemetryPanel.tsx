"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Maximize2,
  Minimize2,
  RotateCw,
  Eye,
  Sliders,
  Cpu,
  Flame,
  Wind,
  Gauge,
  Box,
  Layers,
  Zap,
} from "lucide-react";
import { AutomotiveModelType } from "@/components/3d/CadModel";

interface TelemetryPanelProps {
  modelType: AutomotiveModelType;
  setModelType: (type: AutomotiveModelType) => void;
  wireframe: boolean;
  setWireframe: (val: boolean | ((prev: boolean) => boolean)) => void;
  exploded: boolean;
  setExploded: (val: boolean | ((prev: boolean) => boolean)) => void;
  autoRotate: boolean;
  setAutoRotate: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export function TelemetryPanel({
  modelType,
  setModelType,
  wireframe,
  setWireframe,
  exploded,
  setExploded,
  autoRotate,
  setAutoRotate,
}: TelemetryPanelProps) {
  const modelOptions: { id: AutomotiveModelType; label: string; icon: React.ElementType }[] = [
    { id: "suspension", label: "Suspension & Brake", icon: Box },
    { id: "ev-battery", label: "800V EV Battery Pack", icon: Zap },
    { id: "biw-chassis", label: "Sedan BIW Chassis", icon: Layers },
  ];

  return (
    <div className="space-y-3">
      {/* 1. CAD Subsystem Selector */}
      <div className="hud-panel p-2.5 rounded-lg border border-carbon-700/80 bg-carbon-900/85">
        <div className="flex items-center justify-between border-b border-carbon-750 pb-1.5 mb-2">
          <span className="telemetry-tag text-hazard-400 flex items-center gap-1.5 text-[9px]">
            <Layers className="w-3 h-3" /> ACTIVE CAD ASSEMBLY
          </span>
          <span className="text-[9px] text-cyber-400 font-mono">SELECTABLE</span>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {modelOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = modelType === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setModelType(opt.id)}
                className={`flex flex-col items-center justify-center p-1.5 rounded text-[9px] font-mono transition-all border ${
                  isSelected
                    ? "bg-hazard-500/20 border-hazard-500 text-hazard-300 font-semibold shadow-neon-amber"
                    : "bg-carbon-800/80 border-carbon-700 text-titanium-400 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5 mb-0.5" />
                <span className="truncate w-full text-center">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. 3D Viewport Controls Toolbar */}
      <div className="hud-panel p-2.5 rounded-lg border border-carbon-700/80 bg-carbon-900/80">
        <div className="grid grid-cols-3 gap-2">
          {/* Wireframe Toggle */}
          <button
            onClick={() => setWireframe((prev) => !prev)}
            className={`flex flex-col items-center justify-center p-1.5 rounded text-xs transition-all border ${
              wireframe
                ? "bg-hazard-500/20 border-hazard-500 text-hazard-300 font-semibold shadow-neon-amber"
                : "bg-carbon-800/80 border-carbon-700 text-titanium-300 hover:border-carbon-600 hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5 mb-0.5" />
            <span className="telemetry-tag text-[9px]">Wireframe</span>
            <span className="text-[8px] font-mono opacity-70">
              {wireframe ? "ON" : "OFF"}
            </span>
          </button>

          {/* Exploded View Toggle */}
          <button
            onClick={() => setExploded((prev) => !prev)}
            className={`flex flex-col items-center justify-center p-1.5 rounded text-xs transition-all border ${
              exploded
                ? "bg-cyber-500/20 border-cyber-500 text-cyber-300 font-semibold shadow-neon-cyan"
                : "bg-carbon-800/80 border-carbon-700 text-titanium-300 hover:border-carbon-600 hover:text-white"
            }`}
          >
            {exploded ? (
              <Minimize2 className="w-3.5 h-3.5 mb-0.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5 mb-0.5" />
            )}
            <span className="telemetry-tag text-[9px]">Explode</span>
            <span className="text-[8px] font-mono opacity-70">
              {exploded ? "ACTIVE" : "STD"}
            </span>
          </button>

          {/* Auto Rotation Toggle */}
          <button
            onClick={() => setAutoRotate((prev) => !prev)}
            className={`flex flex-col items-center justify-center p-1.5 rounded text-xs transition-all border ${
              autoRotate
                ? "bg-hazard-500/20 border-hazard-500 text-hazard-300 font-semibold shadow-neon-amber"
                : "bg-carbon-800/80 border-carbon-700 text-titanium-300 hover:border-carbon-600 hover:text-white"
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 mb-0.5 ${autoRotate ? "animate-spin" : ""}`} />
            <span className="telemetry-tag text-[9px]">Orbit</span>
            <span className="text-[8px] font-mono opacity-70">
              {autoRotate ? "ACTIVE" : "PAUSED"}
            </span>
          </button>
        </div>
      </div>

      {/* 3. Real-time Engineering Telemetry Readout */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="hud-panel p-3.5 rounded-lg border border-carbon-700/80 bg-carbon-900/85"
      >
        <div className="flex items-center justify-between border-b border-carbon-750 pb-1.5 mb-2.5">
          <div className="flex items-center gap-1.5">
            <Activity className="w-3 h-3 text-cyber-400 animate-pulse" />
            <span className="telemetry-tag text-white text-[9px]">SUBSYSTEM TELEMETRY</span>
          </div>
          <span className="inline-block px-1.5 py-0.5 rounded bg-cyber-900/80 border border-cyber-500/40 text-[8px] font-mono text-cyber-300">
            SIMULATED
          </span>
        </div>

        <div className="space-y-2">
          {/* Metric 1 */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-titanium-400 flex items-center gap-1.5 text-[11px]">
              <Gauge className="w-3 h-3 text-hazard-400" /> Torsional Rigidity
            </span>
            <div className="text-right font-mono text-[11px]">
              <span className="text-white font-semibold">42,500</span>
              <span className="text-titanium-400 text-[9px] ml-1">Nm/deg</span>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-titanium-400 flex items-center gap-1.5 text-[11px]">
              <Wind className="w-3 h-3 text-cyber-400" /> Drag Coeff (Cd)
            </span>
            <div className="text-right font-mono text-[11px]">
              <span className="text-white font-semibold">0.218</span>
              <span className="text-hazard-400 text-[9px] ml-1 font-semibold">OPTIMAL</span>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-titanium-400 flex items-center gap-1.5 text-[11px]">
              <Flame className="w-3 h-3 text-amber-500" /> Thermal Margin
            </span>
            <div className="text-right font-mono text-[11px]">
              <span className="text-white font-semibold">+34.2°C</span>
              <span className="text-titanium-400 text-[9px] ml-1">BELOW LIMIT</span>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-titanium-400 flex items-center gap-1.5 text-[11px]">
              <Cpu className="w-3 h-3 text-cyan-400" /> Inverter Eff.
            </span>
            <div className="text-right font-mono text-[11px]">
              <span className="text-hazard-400 font-semibold">98.4%</span>
              <span className="text-titanium-400 text-[9px] ml-1">SiC GEN3</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
