"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface SedanBiwProps {
  activeDiscipline?: "biw" | "chassis" | "appearance" | string;
  wireframe?: boolean;
  exploded?: boolean;
  autoRotate?: boolean;
  scanLine?: boolean;
  sparks?: boolean;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

// ============================================================================
// 1. HELPER MATERIALS & GEOMETRIES
// ============================================================================

// Procedural Laser Scanning Line Plane
function ScanLaserPlane() {
  const scanRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (scanRef.current) {
      // Moves along the vehicle longitudinal Z-axis smoothly
      scanRef.current.position.z = Math.sin(state.clock.elapsedTime * 1.5) * 2.2;
    }
  });

  return (
    <mesh ref={scanRef} rotation={[0, 0, 0]}>
      <planeGeometry args={[2.6, 1.8]} />
      <meshBasicMaterial
        color="#38bdf8"
        transparent
        opacity={0.12}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// Procedural Welding Sparks Particle System
function WeldingSparks() {
  const count = 35;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    // Sparks originate near critical BIW weld nodes (B-pillar, Rocker, Shock towers)
    return Array.from({ length: count }, () => {
      const isLeft = Math.random() > 0.5;
      const xBase = isLeft ? -0.92 : 0.92;
      const zBase = (Math.random() - 0.5) * 3.2;
      const yBase = -0.3 + Math.random() * 0.9;
      return {
        x: xBase + (Math.random() - 0.5) * 0.2,
        y: yBase,
        z: zBase + (Math.random() - 0.5) * 0.2,
        vx: (Math.random() - 0.5) * 1.2,
        vy: 0.5 + Math.random() * 1.2,
        vz: (Math.random() - 0.5) * 1.2,
        life: Math.random(),
        scale: 0.012 + Math.random() * 0.02,
      };
    });
  }, [count]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    particles.forEach((p, i) => {
      p.life += delta * 1.8;
      if (p.life > 1.0) {
        p.life = 0;
        const isLeft = Math.random() > 0.5;
        p.x = (isLeft ? -0.92 : 0.92) + (Math.random() - 0.5) * 0.15;
        p.y = -0.35 + Math.random() * 0.8;
        p.z = (Math.random() - 0.5) * 3.2;
      }

      const curY = p.y + p.vy * p.life - 0.5 * 9.8 * p.life * p.life * 0.1;
      const curX = p.x + p.vx * p.life * 0.3;
      const curZ = p.z + p.vz * p.life * 0.3;
      const currentScale = p.scale * (1 - p.life);

      dummy.position.set(curX, curY, curZ);
      dummy.scale.set(currentScale, currentScale, currentScale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#38bdf8" />
    </instancedMesh>
  );
}

// Stamped Swaged Hole Ring (Automotive BIW lightening swage)
function StampedHoleRing({
  radius = 0.08,
  tube = 0.015,
  position,
  rotation,
}: {
  radius?: number;
  tube?: number;
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <mesh position={position} rotation={rotation || [0, 0, 0]} castShadow>
      <torusGeometry args={[radius, tube, 8, 24]} />
      <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
    </mesh>
  );
}

// Spot Weld Dot Array along flange seams
function SpotWeldLine({
  start,
  end,
  count = 8,
  active = false,
}: {
  start: [number, number, number];
  end: [number, number, number];
  count?: number;
  active?: boolean;
}) {
  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= count; i++) {
      const t = i / count;
      pts.push([
        start[0] + (end[0] - start[0]) * t,
        start[1] + (end[1] - start[1]) * t,
        start[2] + (end[2] - start[2]) * t,
      ]);
    }
    return pts;
  }, [start, end, count]);

  return (
    <group>
      {points.map((pt, i) => (
        <mesh key={i} position={pt}>
          <cylinderGeometry args={[0.014, 0.014, 0.008, 8]} />
          <meshStandardMaterial
            color={active ? "#38bdf8" : "#94a3b8"}
            emissive={active ? "#0284c7" : "#000000"}
            emissiveIntensity={active ? 0.6 : 0}
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

// ============================================================================
// 2. SEDAN BIW SUB-ASSEMBLIES
// ============================================================================

interface SubAssemblyProps {
  wireframe: boolean;
  explodedOffset: number;
  activeDiscipline: string;
}

// SUB-ASSEMBLY 1: Lower Platform, Sills, Floor Pan & Rails
function SedanFloorPlatform({
  wireframe,
  explodedOffset,
  activeDiscipline,
}: SubAssemblyProps) {
  const isChassisActive = activeDiscipline === "chassis";
  const isBiwActive = activeDiscipline === "biw";

  // Standard Stamped Alloy Material
  const stampedSteelMat = (
    <meshPhysicalMaterial
      color={isBiwActive ? "#e2e8f0" : "#cbd5e1"}
      roughness={0.16}
      metalness={0.92}
      clearcoat={1.0}
      clearcoatRoughness={0.08}
      wireframe={wireframe}
    />
  );

  // High-Strength Structural Rail Material
  const structuralRailMat = (
    <meshStandardMaterial
      color={isChassisActive ? "#38bdf8" : "#475569"}
      emissive={isChassisActive ? "#0369a1" : "#000000"}
      emissiveIntensity={isChassisActive ? 0.35 : 0}
      metalness={0.95}
      roughness={0.2}
      wireframe={wireframe}
    />
  );

  return (
    <group position={[0, -explodedOffset * 0.4, 0]}>
      {/* 1. Main Left & Right Rocker Sills (Boxed Extrusions) */}
      {[-0.92, 0.92].map((x, i) => (
        <group key={`rocker-${i}`} position={[x, -0.32, 0]}>
          {/* Main Boxed Sill Beam */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.16, 0.18, 3.2]} />
            {stampedSteelMat}
          </mesh>
          {/* Outer Pinch Weld Flange */}
          <mesh position={[x > 0 ? 0.085 : -0.085, -0.06, 0]} castShadow>
            <boxGeometry args={[0.02, 0.06, 3.2]} />
            {structuralRailMat}
          </mesh>
          {/* Spot welds along Rocker Flange */}
          <SpotWeldLine
            start={[x > 0 ? 0.09 : -0.09, -0.06, -1.4]}
            end={[x > 0 ? 0.09 : -0.09, -0.06, 1.4]}
            count={12}
            active={isBiwActive}
          />
        </group>
      ))}

      {/* 2. Stamped Corrugated Floor Pan with Central Tunnel */}
      <group position={[0, -0.32, 0]}>
        {/* Left & Right Floor Panels */}
        <mesh position={[-0.52, 0.02, 0]} receiveShadow castShadow>
          <boxGeometry args={[0.66, 0.03, 2.7]} />
          {stampedSteelMat}
        </mesh>
        <mesh position={[0.52, 0.02, 0]} receiveShadow castShadow>
          <boxGeometry args={[0.66, 0.03, 2.7]} />
          {stampedSteelMat}
        </mesh>

        {/* Central Structural Tunnel (Transmission / High Voltage Spine) */}
        <mesh position={[0, 0.11, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.34, 0.16, 2.7]} />
          {structuralRailMat}
        </mesh>

        {/* Transverse Seat Crossmembers (Stiffening Ribs) */}
        {[-0.8, -0.2, 0.4, 0.9].map((z, idx) => (
          <mesh key={`crossmember-${idx}`} position={[0, 0.05, z]} castShadow>
            <boxGeometry args={[1.7, 0.05, 0.14]} />
            {stampedSteelMat}
          </mesh>
        ))}

        {/* Floor Pan Stamped Lightening Swages */}
        {[-0.52, 0.52].map((x) =>
          [-0.5, 0.1, 0.65].map((z, j) => (
            <StampedHoleRing
              key={`hole-${x}-${j}`}
              radius={0.065}
              position={[x, 0.038, z]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
          ))
        )}
      </group>

      {/* 3. Front Frame Rails & Crash Absorption Assembly */}
      <group position={[0, 0, 0]}>
        {/* Twin Longitudinal Front Rails */}
        {[-0.54, 0.54].map((x, i) => (
          <group key={`front-rail-${i}`}>
            <mesh position={[x, -0.24, 1.62]} castShadow>
              <boxGeometry args={[0.14, 0.18, 1.45]} />
              {structuralRailMat}
            </mesh>
            {/* Crash Box Initiators (Accordions) */}
            <mesh position={[x, -0.24, 2.32]} castShadow>
              <boxGeometry args={[0.16, 0.19, 0.22]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.2} wireframe={wireframe} />
            </mesh>
          </group>
        ))}

        {/* Front Bumper Beam (Curved Transverse Beam) */}
        <mesh position={[0, -0.24, 2.45]} castShadow>
          <boxGeometry args={[1.65, 0.16, 0.12]} />
          {structuralRailMat}
        </mesh>
        {/* Lower Front Radiator Crossmember */}
        <mesh position={[0, -0.32, 2.05]} castShadow>
          <boxGeometry args={[1.2, 0.08, 0.1]} />
          {stampedSteelMat}
        </mesh>
      </group>

      {/* 4. Rear Frame Rails & Sedan Trunk Sub-Structure */}
      <group position={[0, 0, 0]}>
        {/* Twin Longitudinal Rear Rails (Sweeping up over rear axle) */}
        {[-0.54, 0.54].map((x, i) => (
          <group key={`rear-rail-${i}`}>
            <mesh position={[x, -0.16, -1.62]} rotation={[-0.08, 0, 0]} castShadow>
              <boxGeometry args={[0.14, 0.18, 1.35]} />
              {structuralRailMat}
            </mesh>
            {/* Rear Impact Absorbers */}
            <mesh position={[x, -0.16, -2.26]} castShadow>
              <boxGeometry args={[0.15, 0.18, 0.18]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.2} wireframe={wireframe} />
            </mesh>
          </group>
        ))}

        {/* Rear Bumper Crossmember */}
        <mesh position={[0, -0.16, -2.36]} castShadow>
          <boxGeometry args={[1.6, 0.15, 0.11]} />
          {structuralRailMat}
        </mesh>

        {/* Rear Trunk Floor Pan & Battery Drop Box */}
        <mesh position={[0, -0.22, -1.75]} receiveShadow castShadow>
          <boxGeometry args={[1.1, 0.03, 0.95]} />
          {stampedSteelMat}
        </mesh>
      </group>
    </group>
  );
}

// SUB-ASSEMBLY 2: Front End, Cast Aluminum Shock Towers & Firewall Bulkhead
function SedanFrontStructure({
  wireframe,
  explodedOffset,
  activeDiscipline,
}: SubAssemblyProps) {
  const isChassisActive = activeDiscipline === "chassis";

  // Cast Aluminum Material (Mega-Casting look)
  const castAluminumMat = (
    <meshPhysicalMaterial
      color={isChassisActive ? "#bae6fd" : "#94a3b8"}
      roughness={0.28}
      metalness={0.88}
      clearcoat={0.6}
      wireframe={wireframe}
    />
  );

  const sheetMetalMat = (
    <meshPhysicalMaterial
      color="#cbd5e1"
      roughness={0.18}
      metalness={0.92}
      clearcoat={1.0}
      wireframe={wireframe}
    />
  );

  return (
    <group position={[0, 0, explodedOffset * 0.4]}>
      {/* 1. Left & Right Front Shock Towers (Cast Mega-Casting Domes) */}
      {[-0.72, 0.72].map((x, i) => (
        <group key={`front-shock-tower-${i}`} position={[x, -0.05, 1.32]}>
          {/* Shock Tower Dome */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.22, 0.28, 0.38, 24]} />
            {castAluminumMat}
          </mesh>
          {/* Top Damper Mounting Flange Ring */}
          <mesh position={[0, 0.2, 0]} castShadow>
            <cylinderGeometry args={[0.16, 0.16, 0.04, 24]} />
            <meshStandardMaterial color="#475569" metalness={0.95} roughness={0.1} />
          </mesh>
          {/* 3 Top Mount Bolt Indicators */}
          {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, bIdx) => (
            <mesh
              key={`bolt-${bIdx}`}
              position={[Math.cos(angle) * 0.11, 0.22, Math.sin(angle) * 0.11]}
            >
              <cylinderGeometry args={[0.015, 0.015, 0.02, 6]} />
              <meshStandardMaterial color="#f8fafc" metalness={0.95} roughness={0.1} />
            </mesh>
          ))}
          {/* Stiffening Gussets connecting shock tower to firewall */}
          <mesh
            position={[x > 0 ? -0.1 : 0.1, -0.02, -0.22]}
            rotation={[0.3, x > 0 ? -0.2 : 0.2, 0]}
            castShadow
          >
            <boxGeometry args={[0.08, 0.26, 0.32]} />
            {castAluminumMat}
          </mesh>
        </group>
      ))}

      {/* 2. Firewall / Dash Panel Bulkhead */}
      <group position={[0, 0.06, 0.92]}>
        {/* Main Transverse Firewall Wall */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.68, 0.58, 0.05]} />
          {sheetMetalMat}
        </mesh>
        {/* Dash Crossbar (Upper Cowl Reinforcement) */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[1.72, 0.08, 0.1]} />
          {sheetMetalMat}
        </mesh>
        {/* Stamped HVAC / Steering Pass-Through Flange */}
        <mesh position={[-0.32, 0.02, 0.03]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.03, 16]} />
          <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* 3. Upper Shotgun Rails (Fender Aprons connecting A-Pillar to Front Radiator Ring) */}
      {[-0.86, 0.86].map((x, i) => (
        <group key={`shotgun-rail-${i}`}>
          <mesh
            position={[x > 0 ? 0.76 : -0.76, 0.12, 1.58]}
            rotation={[0.16, x > 0 ? 0.08 : -0.08, 0]}
            castShadow
          >
            <boxGeometry args={[0.08, 0.12, 1.35]} />
            {sheetMetalMat}
          </mesh>
          {/* Lightening holes in shotgun rail */}
          <StampedHoleRing
            radius={0.045}
            position={[x > 0 ? 0.76 : -0.76, 0.12, 1.45]}
            rotation={[0, Math.PI / 2, 0]}
          />
          <StampedHoleRing
            radius={0.045}
            position={[x > 0 ? 0.73 : -0.73, 0.08, 1.85]}
            rotation={[0, Math.PI / 2, 0]}
          />
        </group>
      ))}

      {/* 4. Front Radiator Perimeter Frame & Bracing */}
      <group position={[0, 0.02, 2.16]}>
        {/* Upper Radiator Tie Bar */}
        <mesh position={[0, 0.22, 0]} castShadow>
          <boxGeometry args={[1.35, 0.06, 0.08]} />
          {sheetMetalMat}
        </mesh>
        {/* Side Uprights */}
        {[-0.62, 0.62].map((x, i) => (
          <mesh key={`rad-upright-${i}`} position={[x, 0.02, 0]} castShadow>
            <boxGeometry args={[0.06, 0.38, 0.06]} />
            {sheetMetalMat}
          </mesh>
        ))}
        {/* Center Diagonal Tension Braces (V-Bracing) */}
        <mesh position={[-0.24, 0.04, 0]} rotation={[0, 0, -0.6]} castShadow>
          <boxGeometry args={[0.03, 0.44, 0.03]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0.24, 0.04, 0]} rotation={[0, 0, 0.6]} castShadow>
          <boxGeometry args={[0.03, 0.44, 0.03]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

// SUB-ASSEMBLY 3: Safety Cage (A/B/C Pillars, Roof Cantrails & Bows)
function SedanSafetyCage({
  wireframe,
  explodedOffset,
  activeDiscipline,
}: SubAssemblyProps) {
  const isBiwActive = activeDiscipline === "biw";
  const isAppearanceActive = activeDiscipline === "appearance";

  // Ultra-High-Strength Boron Steel Material (for B-Pillars & Safety Frame)
  const boronSteelMat = (
    <meshPhysicalMaterial
      color={isBiwActive ? "#38bdf8" : "#334155"}
      emissive={isBiwActive ? "#0284c7" : "#000000"}
      emissiveIntensity={isBiwActive ? 0.35 : 0}
      roughness={0.14}
      metalness={0.95}
      clearcoat={1.0}
      wireframe={wireframe}
    />
  );

  // Stamped Sheet Metal / Roof Cantrail Material
  const roofCantrailMat = (
    <meshPhysicalMaterial
      color={isAppearanceActive ? "#f8fafc" : "#e2e8f0"}
      roughness={0.12}
      metalness={0.92}
      clearcoat={1.0}
      wireframe={wireframe}
    />
  );

  return (
    <group position={[0, explodedOffset * 0.5, 0]}>
      {/* 1. A-Pillars (Sweeping aerodynamic rake from Cowl to Roof) */}
      {[-1, 1].map((side) => {
        const xSign = side;
        return (
          <group key={`a-pillar-${side}`}>
            <mesh
              position={[xSign * 0.77, 0.52, 0.46]}
              rotation={[-0.65, xSign * -0.16, xSign * -0.22]}
              castShadow
            >
              <boxGeometry args={[0.09, 0.74, 0.08]} />
              {roofCantrailMat}
            </mesh>
            {/* Spot welds along A-pillar flange */}
            <SpotWeldLine
              start={[xSign * 0.84, 0.28, 0.76]}
              end={[xSign * 0.69, 0.78, 0.16]}
              count={7}
              active={isBiwActive}
            />
          </group>
        );
      })}

      {/* Windshield Upper Header Crossmember */}
      <mesh position={[0, 0.8, 0.14]} castShadow>
        <boxGeometry args={[1.36, 0.06, 0.1]} />
        {roofCantrailMat}
      </mesh>

      {/* 2. Roof Side Rails (Cantrails running along the roofline) */}
      {[-0.67, 0.67].map((x, i) => (
        <group key={`cantrail-${i}`} position={[x, 0.82, -0.32]}>
          <mesh castShadow>
            <boxGeometry args={[0.08, 0.08, 1.15]} />
            {roofCantrailMat}
          </mesh>
          {/* Laser Brazed Seam Marker */}
          <mesh position={[0, 0.045, 0]}>
            <boxGeometry args={[0.015, 0.01, 1.15]} />
            <meshStandardMaterial
              color={isAppearanceActive ? "#38bdf8" : "#94a3b8"}
              emissive={isAppearanceActive ? "#0284c7" : "#000000"}
              emissiveIntensity={isAppearanceActive ? 0.5 : 0}
            />
          </mesh>
        </group>
      ))}

      {/* 3. Hot-Stamped Boron B-Pillars (1500 MPa High-Strength Center Pillars) */}
      {[-1, 1].map((side) => {
        const xSign = side;
        return (
          <group key={`b-pillar-${side}`} position={[xSign * 0.8, 0.24, -0.22]}>
            {/* Main B-Pillar Tapered Column */}
            <mesh rotation={[0, 0, xSign * 0.1]} castShadow receiveShadow>
              <boxGeometry args={[0.1, 1.05, 0.14]} />
              {boronSteelMat}
            </mesh>
            {/* Stamped Seatbelt / Retractor Cavity Box at bottom */}
            <mesh position={[0, -0.36, 0]} castShadow>
              <boxGeometry args={[0.13, 0.28, 0.18]} />
              {boronSteelMat}
            </mesh>
            {/* Lightening inspection hole */}
            <StampedHoleRing
              radius={0.035}
              position={[0, 0.08, 0.075]}
              rotation={[0, 0, 0]}
            />
            {/* Spot welds along B-pillar outer flange */}
            <SpotWeldLine
              start={[0, -0.45, 0.08]}
              end={[0, 0.45, 0.08]}
              count={9}
              active={isBiwActive}
            />
          </group>
        );
      })}

      {/* 4. C-Pillars (Sedan Fastback Rear Quarter Silhouette) */}
      {[-1, 1].map((side) => {
        const xSign = side;
        return (
          <group key={`c-pillar-${side}`}>
            {/* Sweeping C-Pillar Arch */}
            <mesh
              position={[xSign * 0.77, 0.56, -1.18]}
              rotation={[0.56, xSign * 0.12, xSign * -0.16]}
              castShadow
            >
              <boxGeometry args={[0.12, 0.86, 0.11]} />
              {roofCantrailMat}
            </mesh>
            {/* Rear Quarter Window Inner Flange */}
            <mesh
              position={[xSign * 0.81, 0.42, -0.74]}
              rotation={[0.2, 0, 0]}
              castShadow
            >
              <boxGeometry args={[0.06, 0.42, 0.45]} />
              {boronSteelMat}
            </mesh>
            {/* Spot welds down C-pillar quarter seam */}
            <SpotWeldLine
              start={[xSign * 0.69, 0.8, -0.85]}
              end={[xSign * 0.86, 0.26, -1.52]}
              count={8}
              active={isBiwActive}
            />
          </group>
        );
      })}

      {/* 5. Transverse Roof Bows & Structure */}
      <group position={[0, 0.82, 0]}>
        {/* Front Roof Crossmember (Windshield Header) */}
        <mesh position={[0, 0, 0.08]} castShadow>
          <boxGeometry args={[1.28, 0.04, 0.12]} />
          {roofCantrailMat}
        </mesh>
        {/* Center Roof Bow (Over B-Pillars) */}
        <mesh position={[0, 0, -0.22]} castShadow>
          <boxGeometry args={[1.28, 0.04, 0.14]} />
          {boronSteelMat}
        </mesh>
        {/* Rear Roof Crossmember (Backlight Upper Header) */}
        <mesh position={[0, 0, -0.78]} castShadow>
          <boxGeometry args={[1.28, 0.04, 0.12]} />
          {roofCantrailMat}
        </mesh>
        {/* Longitudinal Roof Reinforcement Ribs */}
        {[-0.32, 0.32].map((x, idx) => (
          <mesh key={`roof-rib-${idx}`} position={[x, 0.01, -0.35]} castShadow>
            <boxGeometry args={[0.05, 0.02, 0.78]} />
            {roofCantrailMat}
          </mesh>
        ))}
      </group>
    </group>
  );
}

// SUB-ASSEMBLY 4: Sedan Rear End, Parcel Shelf & Wheelhouses
function SedanRearStructure({
  wireframe,
  explodedOffset,
  activeDiscipline,
}: SubAssemblyProps) {
  const isAppearanceActive = activeDiscipline === "appearance";
  const isChassisActive = activeDiscipline === "chassis";

  const sheetMetalMat = (
    <meshPhysicalMaterial
      color="#cbd5e1"
      roughness={0.18}
      metalness={0.92}
      clearcoat={1.0}
      wireframe={wireframe}
    />
  );

  const castAluminumMat = (
    <meshPhysicalMaterial
      color={isChassisActive ? "#bae6fd" : "#94a3b8"}
      roughness={0.28}
      metalness={0.88}
      clearcoat={0.6}
      wireframe={wireframe}
    />
  );

  return (
    <group position={[0, 0, -explodedOffset * 0.4]}>
      {/* 1. Left & Right Rear Wheelhouses (Stamped Inner & Outer Tubs) */}
      {[-0.78, 0.78].map((x, i) => (
        <group key={`rear-wheelhouse-${i}`} position={[x, 0.02, -1.34]}>
          {/* Wheel Arch Half-Cylinder */}
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
            <cylinderGeometry args={[0.36, 0.36, 0.22, 20, 1, false, 0, Math.PI]} />
            {castAluminumMat}
          </mesh>
          {/* Rear Shock Tower Mount */}
          <mesh position={[0, 0.26, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.15, 0.22, 16]} />
            {castAluminumMat}
          </mesh>
        </group>
      ))}

      {/* 2. Sedan Rear Parcel Shelf Bulkhead (Horizontal Stamped Deck) */}
      <group position={[0, 0.32, -1.38]}>
        {/* Main Horizontal Parcel Shelf Stamping */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.56, 0.04, 0.46]} />
          {sheetMetalMat}
        </mesh>
        {/* Stamped Acoustic / Lightening Cutouts */}
        {[-0.45, 0.45].map((x, idx) => (
          <StampedHoleRing
            key={`shelf-hole-${idx}`}
            radius={0.08}
            position={[x, 0.025, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        ))}
      </group>

      {/* 3. Rear Bulkhead Ring / Diagonal Structural X-Brace */}
      <group position={[0, 0.04, -1.05]}>
        {/* Transverse Bulkhead Wall below Parcel Shelf */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.58, 0.54, 0.04]} />
          {sheetMetalMat}
        </mesh>
        {/* Diagonal X-Brace for Torsional Rigidity */}
        <mesh position={[0, 0, 0.03]} rotation={[0, 0, 0.45]} castShadow>
          <boxGeometry args={[1.45, 0.05, 0.03]} />
          <meshStandardMaterial
            color={isAppearanceActive ? "#f8fafc" : "#38bdf8"}
            metalness={0.92}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 0, 0.03]} rotation={[0, 0, -0.45]} castShadow>
          <boxGeometry args={[1.45, 0.05, 0.03]} />
          <meshStandardMaterial
            color={isAppearanceActive ? "#f8fafc" : "#38bdf8"}
            metalness={0.92}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* 4. Sedan Trunk Opening Aperture & Rear Ring */}
      <group position={[0, 0.15, -1.95]}>
        {/* Upper Trunk Decklid Header */}
        <mesh position={[0, 0.16, 0.32]} castShadow>
          <boxGeometry args={[1.32, 0.05, 0.08]} />
          {sheetMetalMat}
        </mesh>
        {/* Lower Trunk Latch Striker Crossmember */}
        <mesh position={[0, -0.16, -0.22]} castShadow>
          <boxGeometry args={[1.32, 0.08, 0.08]} />
          {sheetMetalMat}
        </mesh>
        {/* Side Trunk Aperture Gutter Flanges */}
        {[-0.66, 0.66].map((x, idx) => (
          <mesh
            key={`trunk-flange-${idx}`}
            position={[x, 0, 0.05]}
            rotation={[0.42, 0, 0]}
            castShadow
          >
            <boxGeometry args={[0.06, 0.45, 0.06]} />
            {sheetMetalMat}
          </mesh>
        ))}
      </group>
    </group>
  );
}

// ============================================================================
// 3. MAIN SEDAN BIW EXPORT COMPONENT
// ============================================================================

export function SedanBiwModel({
  activeDiscipline = "biw",
  wireframe = false,
  exploded = false,
  autoRotate = true,
  scanLine = true,
  sparks = true,
  scale = 1.0,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: SedanBiwProps) {
  const rootRef = useRef<THREE.Group>(null);
  const explodeOffset = exploded ? 0.65 : 0;

  // Smooth continuous turntable rotation
  useFrame((state, delta) => {
    if (autoRotate && rootRef.current) {
      rootRef.current.rotation.y += delta * 0.22;
      // Gentle pitch breathing
      rootRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.06;
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <group ref={rootRef}>
        {/* 1. Floor Platform & Rails */}
        <SedanFloorPlatform
          wireframe={wireframe}
          explodedOffset={explodeOffset}
          activeDiscipline={activeDiscipline}
        />

        {/* 2. Front End & Cast Shock Towers */}
        <SedanFrontStructure
          wireframe={wireframe}
          explodedOffset={explodeOffset}
          activeDiscipline={activeDiscipline}
        />

        {/* 3. Safety Cage (A/B/C Pillars & Roof) */}
        <SedanSafetyCage
          wireframe={wireframe}
          explodedOffset={explodeOffset}
          activeDiscipline={activeDiscipline}
        />

        {/* 4. Rear Structure & Trunk Bulkhead */}
        <SedanRearStructure
          wireframe={wireframe}
          explodedOffset={explodeOffset}
          activeDiscipline={activeDiscipline}
        />

        {/* Dynamic Scan Laser Plane */}
        {scanLine && <ScanLaserPlane />}

        {/* Procedural Welding Sparks */}
        {sparks && <WeldingSparks />}
      </group>
    </group>
  );
}
