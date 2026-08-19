"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, GraduationCap, CheckCircle2, Award, Calendar, Clock, BookOpen, Send } from "lucide-react";
import { LiquidMetalButton } from "./LiquidMetalButton";

interface AcademyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AcademyModal({ isOpen, onClose }: AcademyModalProps) {
  const [enrolled, setEnrolled] = useState(false);
  const [track, setTrack] = useState("Body-in-White (BIW) Architecture & Surfacing");

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
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-carbon-900 border border-cyber-500/40 p-6 sm:p-8 shadow-2xl shadow-cyber-900/40 z-10"
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
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-cyber-900/60 border border-cyber-500/40 text-cyber-400 text-xs font-mono">
              <GraduationCap className="w-4 h-4" />
              <span>ACADEMY CURRICULUM SYLLABUS & ADMISSION</span>
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">
              Anchor Automotive Masterclass Curriculum
            </h3>
            <p className="text-titanium-400 text-xs sm:text-sm">
              Taught by former Tier-1 Chief Engineers in Novi, Michigan. Bridging university theoretical mechanics with production OEM execution.
            </p>
          </div>

          {enrolled ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 rounded-full bg-cyber-500/20 border border-cyber-500 text-cyber-400 flex items-center justify-center mx-auto shadow-neon-cyan">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-white uppercase">Application Submitted</h4>
              <p className="text-titanium-400 text-xs max-w-md mx-auto">
                Your registration for <span className="text-cyber-300 font-semibold">{track}</span> has been received. Our academic admissions coordinator will send the syllabus packet and prerequisite credentials.
              </p>
              <button
                onClick={() => setEnrolled(false)}
                className="text-xs font-mono text-cyber-400 hover:underline uppercase pt-2"
              >
                Apply for Another Course
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Course Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-titanium-300 uppercase">Select Target Track</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    "Body-in-White (BIW) Architecture & Surfacing",
                    "EV Powertrain & High-Voltage Systems",
                    "Vehicle Dynamics & Multi-Body Simulation",
                  ].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTrack(t)}
                      className={`p-3 rounded-lg border text-left text-xs font-mono transition-all ${
                        track === t
                          ? "bg-cyber-500/20 border-cyber-500 text-white font-semibold shadow-neon-cyan"
                          : "bg-carbon-800/80 border-carbon-700 text-titanium-400 hover:text-white"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Syllabus Breakdown */}
              <div className="p-4 rounded-xl bg-carbon-950 border border-carbon-800 space-y-3">
                <h5 className="text-xs font-mono uppercase text-cyber-400 font-bold flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> 12-Week Intensive Curriculum
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-titanium-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyber-400 flex-shrink-0 mt-0.5" />
                    <span>CATIA V6 / NX Class-A Surfacing</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyber-400 flex-shrink-0 mt-0.5" />
                    <span>800V SiC Battery Enclosure Packaging</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyber-400 flex-shrink-0 mt-0.5" />
                    <span>FEA Crashworthiness & Structural Fatigue</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyber-400 flex-shrink-0 mt-0.5" />
                    <span>OEM DFM & GD&T Drawing Handoff</span>
                  </div>
                </div>
              </div>

              {/* Fast Registration Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setEnrolled(true);
                }}
                className="space-y-4 pt-2"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Engineer Full Name"
                    className="w-full px-4 py-2.5 rounded-lg bg-carbon-950 border border-carbon-750 text-white text-xs placeholder-titanium-600 focus:border-cyber-500 focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Work / University Email"
                    className="w-full px-4 py-2.5 rounded-lg bg-carbon-950 border border-carbon-750 text-white text-xs placeholder-titanium-600 focus:border-cyber-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] font-mono text-titanium-500">
                    CERTIFICATION: ISO 9001 APPROVED
                  </span>
                  <LiquidMetalButton variant="cyan">
                    Submit Enrollment Application
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
