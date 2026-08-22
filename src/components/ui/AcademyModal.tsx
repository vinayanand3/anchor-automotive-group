"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, GraduationCap, CheckCircle2, BookOpen, ArrowUpRight } from "lucide-react";

interface AcademyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AcademyModal({ isOpen, onClose }: AcademyModalProps) {
  const [enrolled, setEnrolled] = useState(false);
  const [track, setTrack] = useState("Body-in-White (BIW) Concepts & Surfacing");

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
              <GraduationCap className="w-3.5 h-3.5 text-[#0F1115]" />
              <span>ANCHOR ENGINEERING ACADEMY // ADMISSIONS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0F1115] tracking-tight">
              12-Week Masterclass & Industry Curriculum
            </h3>
            <p className="text-[#5A606D] text-xs sm:text-sm leading-relaxed">
              Conducted at our Novi, Michigan Tech Center. Structured to bridge academic theoretical mechanics with production Tier-1 and OEM engineering execution.
            </p>
          </div>

          {enrolled ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-[#0F1115] tracking-tight">Application Received</h4>
              <p className="text-[#5A606D] text-xs max-w-md mx-auto leading-relaxed">
                Your admission request for <span className="text-[#0F1115] font-semibold">{track}</span> has been logged. Our academic coordinator will contact you with the prerequisite syllabus packet.
              </p>
              <button
                onClick={() => setEnrolled(false)}
                className="text-xs font-mono text-[#5A606D] hover:text-[#0F1115] underline uppercase pt-2"
              >
                Submit Another Enrollment
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Course Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#717682] uppercase tracking-wider font-semibold">
                  Target Specialization Track
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    "Body-in-White (BIW) Concepts & Surfacing",
                    "Interior Trim Development & Packaging",
                    "Powertrain Engineering & 800V Systems",
                  ].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTrack(t)}
                      className={`p-3.5 rounded-2xl border text-left text-xs font-mono transition-all ${
                        track === t
                          ? "bg-[#0F1115] border-[#0F1115] text-white font-semibold shadow-sm"
                          : "bg-[#F6F5F2] border-black/5 text-[#5A606D] hover:text-[#0F1115] hover:bg-black/[0.04]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Syllabus Breakdown */}
              <div className="p-5 rounded-2xl bg-[#F6F5F2] border border-black/5 space-y-3">
                <h5 className="text-xs font-mono uppercase text-[#0F1115] font-bold flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Core Modules Included
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#1F232B]">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0F1115] flex-shrink-0 mt-0.5" />
                    <span>CATIA V6 & Siemens NX Class-A/B Surfacing</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0F1115] flex-shrink-0 mt-0.5" />
                    <span>Sheet Metal Stamping, Flanging & Welding Feasibility</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0F1115] flex-shrink-0 mt-0.5" />
                    <span>FEA Crashworthiness, NVH & Torsional Rigidity</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0F1115] flex-shrink-0 mt-0.5" />
                    <span>DFM, GD&T Drawings & APQP Lifecycle Documentation</span>
                  </div>
                </div>
              </div>

              {/* Registration Form */}
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
                    placeholder="Engineer / Candidate Full Name"
                    className="w-full px-4 py-3 rounded-2xl bg-[#F6F5F2] border border-black/10 text-[#0F1115] text-xs placeholder-[#717682] focus:border-[#0F1115] focus:bg-white focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Work / University Email"
                    className="w-full px-4 py-3 rounded-2xl bg-[#F6F5F2] border border-black/10 text-[#0F1115] text-xs placeholder-[#717682] focus:border-[#0F1115] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] font-mono text-[#717682]">
                    LOCATION: 44593 ELLERY LN, NOVI, MI
                  </span>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0F1115] hover:bg-[#252830] text-white text-xs font-mono uppercase tracking-widest transition-all shadow-md active:scale-95"
                  >
                    <span>Submit Application</span>
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
