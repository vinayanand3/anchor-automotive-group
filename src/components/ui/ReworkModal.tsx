"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Wrench, Printer, Flame, Sparkles, CheckCircle2, ShieldCheck, Microscope } from "lucide-react";
import { LiquidMetalButton } from "./LiquidMetalButton";

interface ReworkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReworkModal({ isOpen, onClose }: ReworkModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState("Additive Manufacturing (3D Print)");

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-carbon-900 border border-hazard-500/40 p-6 sm:p-8 shadow-2xl shadow-hazard-950/60 z-10"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-lg bg-carbon-800 text-titanium-400 hover:text-white border border-carbon-700"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="space-y-2 mb-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-hazard-900/60 border border-hazard-500/40 text-hazard-400 text-xs font-mono">
              <Wrench className="w-4 h-4" />
              <span>RAPID REWORK, 3D PRINTING & DISPATCH</span>
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">
              Michigan Lab Rework & Prototyping Dispatch
            </h3>
            <p className="text-titanium-400 text-xs sm:text-sm">
              Same-day & 48-hour turnarounds for assembly line remediation, laser marking, structural welding, and optical metrology.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 rounded-full bg-hazard-500/20 border border-hazard-500 text-hazard-400 flex items-center justify-center mx-auto shadow-neon-amber">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-white uppercase">Rework Dispatch Requested</h4>
              <p className="text-titanium-400 text-xs max-w-md mx-auto">
                Ticket <span className="font-mono text-hazard-400 font-bold">#REWORK-MI-7391</span> created. Our shop floor supervisor at Novi, MI has been alerted.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-mono text-hazard-400 hover:underline uppercase pt-2"
              >
                Submit Additional Line Item
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Service Capabilities Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-titanium-300 uppercase">Select Capability</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Additive Manufacturing (3D Print)",
                    "Fiber Laser Etching & VIN Marking",
                    "Certified TIG/MIG Micro-Welding",
                    "CMM & Optical Metrology Inspection",
                  ].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedService(s)}
                      className={`p-3 rounded-lg border text-left text-xs font-mono transition-all ${
                        selectedService === s
                          ? "bg-hazard-500/20 border-hazard-500 text-white font-semibold shadow-neon-amber"
                          : "bg-carbon-800/80 border-carbon-700 text-titanium-400 hover:text-white"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Technical Specifications Sheet */}
              <div className="p-4 rounded-xl bg-carbon-950 border border-carbon-800 space-y-3">
                <h5 className="text-xs font-mono uppercase text-hazard-400 font-bold flex items-center gap-2">
                  <Microscope className="w-4 h-4" /> Lab Machine Specifications & Tolerances
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-titanium-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-hazard-400 flex-shrink-0 mt-0.5" />
                    <span>Materials: Titanium Ti6Al4V, PEEK, Inconel 718</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-hazard-400 flex-shrink-0 mt-0.5" />
                    <span>50W High-Speed Fiber Laser (DPM Verified)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-hazard-400 flex-shrink-0 mt-0.5" />
                    <span>AWS D1.1 / D1.2 Structural Welding Certified</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-hazard-400 flex-shrink-0 mt-0.5" />
                    <span>Zeiss Optical Scanning & ±0.01mm CMM Verification</span>
                  </div>
                </div>
              </div>

              {/* Fast Quote Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-4 pt-2"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Plant / Resident Engineer"
                    className="w-full px-4 py-2.5 rounded-lg bg-carbon-950 border border-carbon-750 text-white text-xs placeholder-titanium-600 focus:border-hazard-500 focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Corporate Email"
                    className="w-full px-4 py-2.5 rounded-lg bg-carbon-950 border border-carbon-750 text-white text-xs placeholder-titanium-600 focus:border-hazard-500 focus:outline-none"
                  />
                </div>

                <textarea
                  rows={2}
                  placeholder="Part numbers, quantities, material requirements, or urgent plant line stoppage details..."
                  className="w-full px-4 py-2.5 rounded-lg bg-carbon-950 border border-carbon-750 text-white text-xs placeholder-titanium-600 focus:border-hazard-500 focus:outline-none"
                />

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] font-mono text-titanium-500 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-hazard-400" />
                    NOVI, MI LAB DISPATCH
                  </span>
                  <LiquidMetalButton variant="amber">
                    Dispatch Rework Team
                  </LiquidMetalButton>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
