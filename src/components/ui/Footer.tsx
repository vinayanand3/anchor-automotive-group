"use client";

import React from "react";
import { Anchor, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-sylva-deep text-sylva-ink-soft text-xs relative overflow-hidden py-16 px-4 sm:px-6 lg:px-12 select-none">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-accent-pale text-paper-ink flex items-center justify-center font-bold">
                <Anchor className="w-4 h-4" />
              </div>
              <span className="font-medium tracking-wider text-white text-base">
                ANCHOR <span className="font-light text-sylva-ink-soft">AUTOMOTIVE</span>
              </span>
            </div>
            <p className="text-sylva-ink-faint text-xs leading-relaxed max-w-sm font-light">
              Tier-1 automotive engineering consultancy based in Novi, Michigan. Specializing in Body-in-White kinematics, 800V EV powertrain architecture, and precision rework.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-sylva-ink-soft">
              <ShieldCheck className="w-3.5 h-3.5 text-accent-pale" />
              <span>ISO 9001:2015 & ISO 26262 ASIL-D COMPLIANT</span>
            </div>
          </div>

          {/* Links 1 */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-white uppercase tracking-widest font-mono text-[11px]">
              Engineering Disciplines
            </h4>
            <ul className="space-y-2 text-sylva-ink-soft font-light text-xs">
              <li><a href="#services" className="hover:text-white transition-colors">Body-in-White (BIW) Architecture</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">800V EV Powertrain & Battery CTP</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Suspension Kinematics & CAE FEA</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">AUTOSAR ECU & Vehicle Bus</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-white uppercase tracking-widest font-mono text-[11px]">
              Direct Consultancy Desk
            </h4>
            <p className="text-sylva-ink-faint text-xs font-light">
              44593 Ellery Ln, Novi, MI 48377 • Detroit Metro Tech Corridor
            </p>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-widest text-accent-pale">
                CONFIDENTIAL RFQ DESK
              </div>
              <div className="text-white font-mono text-xs select-all">
                engineering@anchorautomotivegroup.com
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-sylva-ink-faint font-light">
          <div>
            © {new Date().getFullYear()} Anchor Automotive Group Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6 font-mono text-[10px]">
            <a href="#privacy" className="hover:text-white transition-colors">PRIVACY POLICY</a>
            <a href="#nda" className="hover:text-white transition-colors">MUTUAL NDA PORTAL</a>
            <a href="#iso" className="hover:text-white transition-colors">COMPLIANCE STANDARDS</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
