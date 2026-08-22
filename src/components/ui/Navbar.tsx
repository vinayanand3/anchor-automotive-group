"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, Cpu, ChevronRight, Menu, X, Layers } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-carbon-950/85 backdrop-blur-md border-b border-carbon-700/80 shadow-lg shadow-black/50 py-3"
          : "bg-transparent border-b border-white/5 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 bg-carbon-800 border border-hazard-500/40 rounded flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="absolute inset-0 bg-hazard-500/10 rounded animate-pulse-slow pointer-events-none" />
              <Layers className="w-5 h-5 text-hazard-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-wider text-white flex items-center gap-1.5">
                ANCHOR <span className="text-hazard-400 font-light">AUTOMOTIVE</span>
              </span>
              <span className="telemetry-tag text-[10px] text-titanium-400">
                ADVANCED MOBILITY ENGINEERING
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#services"
              className="text-xs uppercase tracking-widest text-titanium-300 hover:text-hazard-400 transition-colors"
            >
              Capabilities
            </Link>
            <Link
              href="#cad-viewer"
              className="text-xs uppercase tracking-widest text-titanium-300 hover:text-hazard-400 transition-colors"
            >
              3D CAD Engine
            </Link>
            <Link
              href="#telemetry"
              className="text-xs uppercase tracking-widest text-titanium-300 hover:text-hazard-400 transition-colors"
            >
              Telemetry
            </Link>
            <Link
              href="#consultancy"
              className="text-xs uppercase tracking-widest text-titanium-300 hover:text-hazard-400 transition-colors"
            >
              Consultancy
            </Link>
          </nav>

          {/* Status Badge & CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Live System Indicator */}
            <div className="flex items-center gap-2 px-3 py-1 rounded bg-carbon-900/90 border border-carbon-700/70 text-titanium-300 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-hazard-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-hazard-500"></span>
              </span>
              <span className="telemetry-tag text-titanium-300">SYS: LIVE 3D</span>
            </div>

            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-hazard-500 hover:bg-hazard-400 rounded transition-all duration-200 shadow-neon-amber"
            >
              <span>Engage Engineering</span>
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-titanium-300 hover:text-white rounded bg-carbon-850 border border-carbon-700"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-carbon-750 flex flex-col gap-3 pb-2 bg-carbon-900/95 p-4 rounded-lg">
            <Link
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm uppercase tracking-wider text-titanium-300 hover:text-hazard-400 py-1"
            >
              Capabilities
            </Link>
            <Link
              href="#cad-viewer"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm uppercase tracking-wider text-titanium-300 hover:text-hazard-400 py-1"
            >
              3D CAD Engine
            </Link>
            <Link
              href="#telemetry"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm uppercase tracking-wider text-titanium-300 hover:text-hazard-400 py-1"
            >
              Telemetry
            </Link>
            <Link
              href="#consultancy"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm uppercase tracking-wider text-titanium-300 hover:text-hazard-400 py-1"
            >
              Consultancy
            </Link>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center text-xs font-semibold uppercase tracking-wider text-black bg-hazard-500 py-2.5 rounded shadow-neon-amber"
            >
              Engage Engineering
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
