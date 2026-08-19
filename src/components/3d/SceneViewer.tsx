"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Float, Html } from "@react-three/drei";
import { CadModel, AutomotiveModelType } from "./CadModel";
import { Loader2 } from "lucide-react";

interface SceneViewerProps {
  modelUrl?: string;
  modelType?: AutomotiveModelType;
  wireframe?: boolean;
  exploded?: boolean;
  autoRotate?: boolean;
  className?: string;
}

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2 p-3 bg-carbon-900/90 border border-carbon-700 rounded-md backdrop-blur-md">
        <Loader2 className="w-5 h-5 text-hazard-400 animate-spin" />
        <span className="telemetry-tag text-titanium-300 text-[10px]">
          PARSING CAD MESH DATA...
        </span>
      </div>
    </Html>
  );
}

export function SceneViewer({
  modelUrl,
  modelType = "suspension",
  wireframe = false,
  exploded = false,
  autoRotate = false,
  className = "w-full h-full",
}: SceneViewerProps) {
  return (
    <div className={`relative ${className}`}>
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [3.5, 2.2, 4.2], fov: 45 }}
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="cursor-grab active:cursor-grabbing"
      >
        {/* Ambient & Key Studio Lighting */}
        <ambientLight intensity={0.65} />
        
        {/* Main Directional Key Light with Crisp Shadows */}
        <directionalLight
          position={[6, 8, 5]}
          intensity={1.8}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />

        {/* Industrial Amber Backlight */}
        <pointLight position={[-4, 3, -3]} intensity={2.5} color="#f59e0b" distance={10} />

        {/* Cyber Cyan Rim Light */}
        <pointLight position={[3, -2, -4]} intensity={2.0} color="#06b6d4" distance={8} />

        <Suspense fallback={<Loader />}>
          <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.25}>
            <CadModel
              modelUrl={modelUrl}
              modelType={modelType}
              wireframe={wireframe}
              exploded={exploded}
              autoRotate={autoRotate}
            />
          </Float>

          {/* Contact Shadows on Floor */}
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.7}
            scale={8}
            blur={2}
            far={4}
            color="#000000"
          />
        </Suspense>

        {/* User Orbit Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          dampingFactor={0.05}
          minDistance={1.8}
          maxDistance={9}
          maxPolarAngle={Math.PI / 2 + 0.1}
        />
      </Canvas>
    </div>
  );
}
