"use client";

import React, { useState, useEffect } from "react";

interface LiquidMetalSylvaButtonProps {
  className?: string;
}

export function LiquidMetalSylvaButton({ className = "" }: LiquidMetalSylvaButtonProps) {
  const [iframeSrc, setIframeSrc] = useState<string>("/sylva-assets/liquid-metal-explore.html");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isGhPages = window.location.pathname.startsWith("/anchor-automotive-group");
      const base = isGhPages ? "/anchor-automotive-group" : "";
      setIframeSrc(`${base}/sylva-assets/liquid-metal-explore.html`);
    }

    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === "LIQUID_BUTTON_CLICK") {
        const el = document.getElementById("services");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Clean, completely transparent wrapper without extra borders or pill frames */}
      <div className="relative w-[230px] sm:w-[250px] h-[60px] sm:h-[66px] flex items-center justify-center overflow-hidden bg-transparent">
        <iframe
          src={iframeSrc}
          title="Explore the work"
          loading="eager"
          sandbox="allow-scripts allow-same-origin"
          className="w-[340px] sm:w-[360px] h-[180px] border-0 bg-transparent pointer-events-auto scale-90 sm:scale-95 transform-origin-center cursor-pointer"
        />
      </div>
    </div>
  );
}
