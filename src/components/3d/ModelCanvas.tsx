"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Loader2, Box } from "lucide-react";
import { AutomotiveModelType } from "./CadModel";

interface ModelCanvasProps {
  modelUrl?: string;
  modelType?: AutomotiveModelType;
  wireframe?: boolean;
  exploded?: boolean;
  autoRotate?: boolean;
  className?: string;
}

const DynamicSceneViewer = dynamic(
  () => import("./SceneViewer").then((mod) => mod.SceneViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-carbon-900/60 rounded-xl border border-carbon-750">
        <div className="flex items-center gap-3 text-hazard-400">
          <Loader2 className="w-6 h-6 animate-spin" />
          <Box className="w-6 h-6 text-cyber-400" />
        </div>
        <p className="mt-3 telemetry-tag text-titanium-400 text-xs">
          INITIALIZING WEBGL 3D CAD ENGINE...
        </p>
        <span className="text-[10px] text-titanium-500 mt-1 font-mono">
          GPU HARDWARE ACCELERATION ACTIVE
        </span>
      </div>
    ),
  }
);

export function ModelCanvas(props: ModelCanvasProps) {
  return <DynamicSceneViewer {...props} />;
}
