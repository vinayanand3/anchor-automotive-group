"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FileLock2,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Building,
  Mail,
  User,
  ArrowUpRight,
} from "lucide-react";

export function LeadCaptureSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    domain: "Body-in-White (BIW) & Chassis Kinematics",
    notes: "",
    ndaRequired: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="consultancy" className="py-28 relative bg-sylva-bg border-t border-white/10 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-sylva-ink-soft uppercase">
            <Lock className="w-3.5 h-3.5" />
            <span>CONFIDENTIAL ENGAGEMENT & NDA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
            Initiate B2B Engineering <span className="italic font-normal text-accent-pale">Consultation</span>
          </h2>
          <p className="text-sylva-ink-soft text-sm max-w-xl mx-auto font-light">
            Submit your vehicle specifications or CAD packages under mutual NDA. Our engineering directors will review and respond within 24 hours.
          </p>
        </div>

        <div className="p-8 sm:p-12 rounded-[2.5rem] bg-paper-card text-paper-ink shadow-paper-soft border border-white/80">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-accent-pale text-paper-ink flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-normal text-paper-ink tracking-tight">
                Consultation Request Received
              </h3>
              <p className="text-paper-label text-sm max-w-md mx-auto">
                Reference ID: <span className="font-mono text-paper-ink font-semibold">#ANCHOR-2026-ENG-8492</span>. Our technical director at Novi, MI has been notified.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-mono text-paper-label hover:text-paper-ink underline uppercase"
                >
                  Submit Another Request
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-paper-label flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> Principal Contact
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Alex Mercer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-paper-surface border border-black/10 text-paper-ink placeholder-paper-muted text-sm focus:border-paper-ink focus:outline-none transition-colors"
                  />
                </div>

                {/* Work Email */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-paper-label flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" /> Corporate Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-paper-surface border border-black/10 text-paper-ink placeholder-paper-muted text-sm focus:border-paper-ink focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Organization */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-paper-label flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5" /> OEM / Tier-1 Organization
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NextGen Mobility Inc."
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-paper-surface border border-black/10 text-paper-ink placeholder-paper-muted text-sm focus:border-paper-ink focus:outline-none transition-colors"
                  />
                </div>

                {/* Engineering Discipline */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-paper-label flex items-center gap-1.5">
                    <FileLock2 className="w-3.5 h-3.5" /> Engineering Domain
                  </label>
                  <select
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-paper-surface border border-black/10 text-paper-ink text-sm focus:border-paper-ink focus:outline-none transition-colors cursor-pointer"
                  >
                    <option>Body-in-White (BIW) & Chassis Kinematics</option>
                    <option>EV Powertrain & Battery CTP Architecture</option>
                    <option>CFD Aerodynamics & Thermal Management</option>
                    <option>Rapid Prototyping & Laser Rework</option>
                    <option>Anchor Engineering Academy Training</option>
                  </select>
                </div>
              </div>

              {/* Project Scope */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-paper-label">
                  Project Scope & Technical Targets
                </label>
                <textarea
                  rows={4}
                  placeholder="Outline key vehicle packaging constraints, CAD file types (STEP, CATIA, Parasolid), mass targets, and delivery timelines..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-paper-surface border border-black/10 text-paper-ink placeholder-paper-muted text-sm focus:border-paper-ink focus:outline-none transition-colors"
                />
              </div>

              {/* Mutual NDA Checkbox */}
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-paper-surface border border-black/5">
                <input
                  type="checkbox"
                  id="nda"
                  checked={formData.ndaRequired}
                  onChange={(e) => setFormData({ ...formData, ndaRequired: e.target.checked })}
                  className="mt-0.5 accent-sylva-deep w-4 h-4 rounded cursor-pointer"
                />
                <label htmlFor="nda" className="text-xs text-paper-ink cursor-pointer">
                  <span className="font-medium">Execute Mutual NDA Prior to CAD Data Exchange</span>
                  <span className="block text-[11px] text-paper-label mt-0.5 font-light">
                    Anchor Automotive Group adheres to strict proprietary ISO 27001 data protection protocols.
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-black/5">
                <div className="flex items-center gap-2 text-[11px] font-mono text-paper-label">
                  <ShieldCheck className="w-4 h-4 text-paper-ink" />
                  <span>256-BIT ENCRYPTED TRANSMISSION</span>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-sylva-deep hover:bg-black text-white text-xs font-mono uppercase tracking-widest transition-all shadow-md"
                >
                  <span>Submit Engineering RFP</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
