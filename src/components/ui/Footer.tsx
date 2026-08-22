"use client";

import React from "react";
import { ShieldCheck, Car, Lock } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-black/[0.08] bg-[#EFEFEA] text-[#5A606D] text-xs relative overflow-hidden py-16 px-4 sm:px-6 lg:px-12 select-none">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.08] p-2 flex items-center justify-center shadow-sm">
                <Car className="w-5 h-5 text-[#0F1115]" />
              </div>
              <span className="font-bold tracking-wider text-[#0F1115] text-base uppercase">
                ANCHOR <span className="font-light text-[#5A606D]">AUTOMOTIVE</span>
              </span>
            </div>
            <p className="text-[#5A606D] text-xs leading-relaxed max-w-sm">
              Tier-1 automotive engineering consultancy based in Novi, Michigan. Specializing in Body-in-White kinematics, 800V EV powertrain architecture, and precision rework.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-black/[0.08] text-[11px] text-[#5A606D] shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>ISO 9001:2015 & ISO 26262 ASIL-D COMPLIANT</span>
            </div>
          </div>

          {/* Links 1 */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[#0F1115] uppercase tracking-widest font-mono text-[11px] font-bold">
              Engineering Disciplines
            </h4>
            <ul className="space-y-2 text-[#5A606D] text-xs">
              <li><a href="#services" className="hover:text-[#0F1115] transition-colors">Body-in-White (BIW) Architecture</a></li>
              <li><a href="#services" className="hover:text-[#0F1115] transition-colors">800V EV Powertrain & Battery CTP</a></li>
              <li><a href="#services" className="hover:text-[#0F1115] transition-colors">Suspension Kinematics & CAE FEA</a></li>
              <li><a href="#services" className="hover:text-[#0F1115] transition-colors">AUTOSAR ECU & Vehicle Bus</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-[#0F1115] uppercase tracking-widest font-mono text-[11px] font-bold">
              Direct Consultancy Desk
            </h4>
            <p className="text-[#5A606D] text-xs">
              44593 Ellery Ln, Novi, MI 48377 • Detroit Metro Tech Corridor
            </p>
            <div className="p-4 rounded-2xl bg-white border border-black/[0.08] space-y-1 shadow-sm">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#717682] font-semibold">
                CONFIDENTIAL RFQ DESK
              </div>
              <div className="text-[#0F1115] font-mono text-xs select-all font-semibold">
                engineering@anchorautomotivegroup.com
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-black/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#717682]">
          <div>
            © {new Date().getFullYear()} Anchor Automotive Group Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6 font-mono text-[10px]">
            <a href="#consultancy" className="hover:text-[#0F1115] transition-colors">PRIVACY POLICY</a>
            <a href="#consultancy" className="hover:text-[#0F1115] transition-colors">MUTUAL NDA PORTAL</a>
            <Link href="/admin" className="hover:text-[#0F1115] transition-colors flex items-center gap-1 text-zinc-500">
              <Lock className="w-2.5 h-2.5" />
              <span>ADMIN REGISTRATION PORTAL</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
