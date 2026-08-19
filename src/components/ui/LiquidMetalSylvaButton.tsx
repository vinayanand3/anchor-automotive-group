"use client";

import React, { useEffect } from "react";

interface LiquidMetalSylvaButtonProps {
  className?: string;
}

export function LiquidMetalSylvaButton({ className = "" }: LiquidMetalSylvaButtonProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  useEffect(() => {
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
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="relative w-[340px] sm:w-[380px] h-[110px] sm:h-[130px] flex items-center justify-center overflow-visible">
        <iframe
          src={`${basePath}/sylva-assets/liquid-metal-explore.html`}
          title="Explore the work"
          loading="eager"
          sandbox="allow-scripts allow-same-origin"
          className="w-[420px] h-[260px] border-0 bg-transparent pointer-events-auto scale-90 sm:scale-100 transform-origin-center -my-14"
        />
      </div>
    </div>
  );
}
