"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, GraduationCap, CheckCircle2, Award, BookOpen, ArrowUpRight } from "lucide-react";

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
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window (Sylva Alabaster Paper Sheet) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] bg-paper-card text-paper-ink border border-white/90 p-8 sm:p-10 shadow-2xl z-10"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 rounded-full bg-paper-surface hover:bg-white text-paper-label hover:text-paper-ink border border-black/5 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="space-y-2 mb-8 pr-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper-surface border border-black/5 text-[11px] font-mono tracking-widest text-paper-label uppercase">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>ANCHOR ENGINEERING ACADEMY // ADMISSIONS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-light text-paper-ink tracking-tight">
              12-Week Masterclass & Industry Curriculum
            </h3>
            <p className="text-paper-label text-xs sm:text-sm font-light leading-relaxed">
              Conducted at our Novi, Michigan Tech Center. Structured to bridge academic theoretical mechanics with production Tier-1 and OEM engineering execution.
            </p>
          </div>

          {enrolled ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-full bg-accent-pale text-paper-ink flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-normal text-paper-ink tracking-tight">Application Received</h4>
              <p className="text-paper-label text-xs max-w-md mx-auto leading-relaxed font-light">
                Your admission request for <span className="text-paper-ink font-semibold">{track}</span> has been logged. Our academic coordinator will contact you with the prerequisite syllabus packet.
              </p>
              <button
                onClick={() => setEnrolled(false)}
                className="text-xs font-mono text-paper-label hover:text-paper-ink underline uppercase pt-2"
              >
                Submit Another Enrollment
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Course Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-paper-label uppercase tracking-wider">
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
                          ? "bg-paper-surface border-paper-ink text-paper-ink font-semibold shadow-sm"
                          : "bg-paper-surface/50 border-black/5 text-paper-label hover:text-paper-ink hover:bg-paper-surface"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Syllabus Breakdown */}
              <div className="p-5 rounded-2xl bg-paper-surface border border-black/5 space-y-3">
                <h5 className="text-xs font-mono uppercase text-paper-ink font-semibold flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Core Modules Included
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-paper-ink/85 font-light">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-paper-label flex-shrink-0 mt-0.5" />
                    <span>CATIA V6 & Siemens NX Class-A/B Surfacing</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-paper-label flex-shrink-0 mt-0.5" />
                    <span>Sheet Metal Stamping, Flanging & Welding Feasibility</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-paper-label flex-shrink-0 mt-0.5" />
                    <span>FEA Crashworthiness, NVH & Torsional Rigidity</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-paper-label flex-shrink-0 mt-0.5" />
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
                    className="w-full px-4 py-3 rounded-2xl bg-paper-surface border border-black/10 text-paper-ink text-xs placeholder-paper-muted focus:border-paper-ink focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Work / University Email"
                    className="w-full px-4 py-3 rounded-2xl bg-paper-surface border border-black/10 text-paper-ink text-xs placeholder-paper-muted focus:border-paper-ink focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] font-mono text-paper-label">
                    LOCATION: 44593 ELLERY LN, NOVI, MI
                  </span>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sylva-deep hover:bg-black text-white text-xs font-mono uppercase tracking-widest transition-all shadow-md"
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
