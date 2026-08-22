"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Wrench, CheckCircle2, Microscope, ArrowUpRight } from "lucide-react";

interface ReworkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReworkModal({ isOpen, onClose }: ReworkModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState("Precision Drilling & Custom Tapping");

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] bg-white text-[#0F1115] border border-black/[0.08] p-8 sm:p-10 shadow-2xl z-10"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#F6F5F2] hover:bg-black/10 text-[#5A606D] hover:text-[#0F1115] border border-black/5 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="space-y-2 mb-8 pr-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6F5F2] border border-black/5 text-[11px] font-mono tracking-widest text-[#5A606D] uppercase">
              <Wrench className="w-3.5 h-3.5 text-[#0F1115]" />
              <span>SHOP-FLOOR REWORK & RAPID DISPATCH</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0F1115] tracking-tight">
              Production Part Rework & Containment
            </h3>
            <p className="text-[#5A606D] text-xs sm:text-sm leading-relaxed">
              Rapid response for assembly plant containment, drilling, welding remediation, custom 3D printing, and laser part number engraving based in Novi, Michigan.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-[#0F1115] tracking-tight">Rework Ticket Initiated</h4>
              <p className="text-[#5A606D] text-xs max-w-md mx-auto leading-relaxed">
                Ticket Reference <span className="font-mono text-[#0F1115] font-semibold">#REWORK-NOVI-8492</span> created. Our shop floor team will review your part specifications and contact you immediately.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-mono text-[#5A606D] hover:text-[#0F1115] underline uppercase pt-2"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Service Capabilities Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#717682] uppercase tracking-wider font-semibold">
                  Select Rework Service Required
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Precision Drilling & Custom Tapping",
                    "Welding Solutions (Weld Nuts & Studs)",
                    "3D Printing & Additive Prototyping",
                    "Laser Etching & Part Number Tracking",
                  ].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedService(s)}
                      className={`p-3.5 rounded-2xl border text-left text-xs font-mono transition-all ${
                        selectedService === s
                          ? "bg-[#0F1115] border-[#0F1115] text-white font-semibold shadow-sm"
                          : "bg-[#F6F5F2] border-black/5 text-[#5A606D] hover:text-[#0F1115] hover:bg-black/[0.04]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="p-5 rounded-2xl bg-[#F6F5F2] border border-black/5 space-y-3">
                <h5 className="text-xs font-mono uppercase text-[#0F1115] font-bold flex items-center gap-2">
                  <Microscope className="w-4 h-4" /> Lab Machine Capabilities & Tolerances
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#1F232B]">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0F1115] flex-shrink-0 mt-0.5" />
                    <span>Drilling / Tapping Tolerances: ±0.025 mm (0.001 in)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0F1115] flex-shrink-0 mt-0.5" />
                    <span>AWS D1.1 & D1.2 Certified Structural Welding</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0F1115] flex-shrink-0 mt-0.5" />
                    <span>Materials: PEEK, Carbon-Nylon, Aluminum & Steel</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0F1115] flex-shrink-0 mt-0.5" />
                    <span>50W Fiber Laser Direct Part Marking (UID / VIN)</span>
                  </div>
                </div>
              </div>

              {/* Quote Form */}
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
                    placeholder="Plant Contact / Engineer Name"
                    className="w-full px-4 py-3 rounded-2xl bg-[#F6F5F2] border border-black/10 text-[#0F1115] text-xs placeholder-[#717682] focus:border-[#0F1115] focus:bg-white focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Corporate Email"
                    className="w-full px-4 py-3 rounded-2xl bg-[#F6F5F2] border border-black/10 text-[#0F1115] text-xs placeholder-[#717682] focus:border-[#0F1115] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Assembly Plant / Facility Location"
                    className="w-full px-4 py-3 rounded-2xl bg-[#F6F5F2] border border-black/10 text-[#0F1115] text-xs placeholder-[#717682] focus:border-[#0F1115] focus:bg-white focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Part Number / Quantity to Rework"
                    className="w-full px-4 py-3 rounded-2xl bg-[#F6F5F2] border border-black/10 text-[#0F1115] text-xs placeholder-[#717682] focus:border-[#0F1115] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] font-mono text-[#717682]">
                    FACILITY: 44593 ELLERY LN, NOVI, MI
                  </span>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0F1115] hover:bg-[#252830] text-white text-xs font-mono uppercase tracking-widest transition-all shadow-md active:scale-95"
                  >
                    <span>Dispatch Rework Ticket</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
