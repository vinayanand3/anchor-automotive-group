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
  ShieldAlert,
} from "lucide-react";
import { ForceField } from "@/components/canvasui/ForceField";

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
    <section id="consultancy" className="py-28 relative bg-transparent border-t border-black/[0.08] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/[0.08] text-xs font-mono tracking-widest text-[#5A606D] uppercase shadow-sm">
            <Lock className="w-3.5 h-3.5 text-[#0F1115]" />
            <span>CONFIDENTIAL ENGAGEMENT & NDA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1115] tracking-tight">
            Initiate B2B Engineering <span className="italic font-normal text-[#5A606D]">Consultation</span>
          </h2>
          <p className="text-[#5A606D] text-sm sm:text-base max-w-xl mx-auto font-normal">
            Submit your vehicle specifications or CAD packages under mutual NDA. Our engineering directors will review and respond within 24 hours.
          </p>
        </div>

        {/* ForceField Energy Shield Wrapper */}
        <ForceField
          shape="hexagon"
          cellScale={16}
          lineWidth={0.03}
          gridOpacity={0.15}
          gridReveal="click"
          gridRevealStrength={1.5}
          gridRevealRadius={250}
          gridFade={0.35}
          flowIntensity={0}
          flowSpeed={0.5}
          flashIntensity={0.1}
          edgeGlow={0.2}
          hoverGlow={0.25}
          hoverRadius={350}
          hoverCharge={1.6}
          hideOnHover={false}
          rippleIntensity={0.1}
          rippleSpeed={0.5}
          rippleBlend={1}
          refraction={30}
          aberration={2.5}
          haze={0.5}
          pageReact={0}
          tint={0.1}
          reveal={1}
          dim={0}
          bloom={1}
          grain={0.2}
          color={[0.149, 0.6824, 1]}
          edgeColor={[0.502, 0.8, 1]}
          className="w-full rounded-[2.5rem] overflow-hidden"
        >
          <div className="p-8 sm:p-12 rounded-[2.5rem] bg-white text-[#0F1115] shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-black/[0.08]">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F1115] tracking-tight">
                  Consultation Request Received
                </h3>
                <p className="text-[#5A606D] text-sm max-w-md mx-auto">
                  Reference ID: <span className="font-mono text-[#0F1115] font-semibold">#ANCHOR-2026-ENG-8492</span>. Our technical director at Novi, MI has been notified.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-mono text-[#5A606D] hover:text-[#0F1115] underline uppercase"
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
                    <label className="text-xs font-mono uppercase tracking-wider text-[#717682] font-semibold flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#0F1115]" /> Principal Contact
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#F6F5F2] border border-black/10 text-[#0F1115] placeholder-[#717682] text-sm focus:border-[#0F1115] focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Work Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#717682] font-semibold flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#0F1115]" /> Corporate Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#F6F5F2] border border-black/10 text-[#0F1115] placeholder-[#717682] text-sm focus:border-[#0F1115] focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Organization */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#717682] font-semibold flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-[#0F1115]" /> OEM / Tier-1 Organization
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. NextGen Mobility Inc."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#F6F5F2] border border-black/10 text-[#0F1115] placeholder-[#717682] text-sm focus:border-[#0F1115] focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Engineering Discipline */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#717682] font-semibold flex items-center gap-1.5">
                      <FileLock2 className="w-3.5 h-3.5 text-[#0F1115]" /> Engineering Domain
                    </label>
                    <select
                      value={formData.domain}
                      onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#F6F5F2] border border-black/10 text-[#0F1115] text-sm focus:border-[#0F1115] focus:bg-white focus:outline-none transition-colors cursor-pointer"
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
                  <label className="text-xs font-mono uppercase tracking-wider text-[#717682] font-semibold">
                    Project Scope & Technical Targets
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Outline key vehicle packaging constraints, CAD file types (STEP, CATIA, Parasolid), mass targets, and delivery timelines..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#F6F5F2] border border-black/10 text-[#0F1115] placeholder-[#717682] text-sm focus:border-[#0F1115] focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                {/* Mutual NDA Checkbox */}
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#F6F5F2] border border-black/5">
                  <input
                    type="checkbox"
                    id="nda"
                    checked={formData.ndaRequired}
                    onChange={(e) => setFormData({ ...formData, ndaRequired: e.target.checked })}
                    className="mt-0.5 accent-black w-4 h-4 rounded cursor-pointer"
                  />
                  <label htmlFor="nda" className="text-xs text-[#0F1115] cursor-pointer">
                    <span className="font-semibold">Execute Mutual NDA Prior to CAD Data Exchange</span>
                    <span className="block text-[11px] text-[#5A606D] mt-0.5">
                      Anchor Automotive Group adheres to strict proprietary ISO 27001 data protection protocols.
                    </span>
                  </label>
                </div>

                {/* Submit CTA & Shield status */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-black/5">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#717682]">
                    <ShieldCheck className="w-4 h-4 text-cyan-600" />
                    <span>256-BIT ENCRYPTED FORCE FIELD ACTIVE</span>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0F1115] hover:bg-[#252830] text-white text-xs font-mono uppercase tracking-widest transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <span>Submit Engineering RFP</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </ForceField>
      </div>
    </section>
  );
}
