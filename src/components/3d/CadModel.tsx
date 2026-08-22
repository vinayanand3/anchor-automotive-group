"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

import { SedanBiwModel } from "./SedanBiwModel";

export type AutomotiveModelType = "suspension" | "ev-battery" | "biw-chassis";

interface CadModelProps {
  modelUrl?: string;
  modelType?: AutomotiveModelType;
  wireframe?: boolean;
  exploded?: boolean;
  autoRotate?: boolean;
  scanLine?: boolean;
}

// 1. Procedural Laser Scanning Line Plane
function ScanLaserPlane() {
  const scanRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (scanRef.current) {
      scanRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.8) * 1.8;
    }
  });

  return (
    <mesh ref={scanRef} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[4.5, 4.5]} />
      <meshBasicMaterial
        color="#06b6d4"
        transparent
        opacity={0.12}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// 2. Procedural Welding Sparks Particle System
function WeldingSparks() {
  const count = 40;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 2.5,
      y: (Math.random() - 0.5) * 2.5,
      z: (Math.random() - 0.5) * 2.5,
      speed: 0.8 + Math.random() * 1.4,
      scale: 0.015 + Math.random() * 0.035,
    }));
  }, [count]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    particles.forEach((p, i) => {
      p.y += delta * p.speed;
      if (p.y > 2.0) p.y = -2.0;

      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.set(p.scale, p.scale, p.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#f59e0b" />
    </instancedMesh>
  );
}

// MODEL 1: Suspension & High-Performance Brake Assembly
function SuspensionAssembly({
  wireframe = false,
  exploded = false,
}: {
  wireframe: boolean;
  exploded: boolean;
}) {
  const rotorRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (rotorRef.current) rotorRef.current.rotation.z += delta * 0.5;
  });

  const explodeOffset = exploded ? 0.6 : 0;

  return (
    <group position={[0, 0, 0]}>
      {/* Main Wheel Hub / Axle Carrier */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.7, 0.7, 0.4, 32]} />
        <meshStandardMaterial
          color="#1e2230"
          metalness={0.85}
          roughness={0.25}
          wireframe={wireframe}
        />
      </mesh>

      {/* Ventilated Carbon-Ceramic Brake Rotor */}
      <mesh
        ref={rotorRef}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 0.25 + explodeOffset * 0.4]}
        castShadow
      >
        <torusGeometry args={[1.5, 0.35, 16, 64]} />
        <meshStandardMaterial
          color="#2a2d3d"
          metalness={0.9}
          roughness={0.3}
          wireframe={wireframe}
        />
      </mesh>

      {/* Center Locking Hub Nut */}
      <mesh
        position={[0, 0, 0.45 + explodeOffset * 0.8]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
      >
        <cylinderGeometry args={[0.3, 0.3, 0.25, 6]} />
        <meshStandardMaterial
          color="#f59e0b"
          metalness={0.95}
          roughness={0.15}
          emissive="#78350f"
          emissiveIntensity={0.2}
          wireframe={wireframe}
        />
      </mesh>

      {/* Multi-Piston Brake Caliper */}
      <mesh
        position={[0.95 + explodeOffset * 0.3, 0.75 + explodeOffset * 0.3, 0.25]}
        rotation={[0, 0, Math.PI / 4]}
        castShadow
      >
        <boxGeometry args={[0.6, 1.1, 0.5]} />
        <meshStandardMaterial
          color="#f59e0b"
          metalness={0.7}
          roughness={0.2}
          wireframe={wireframe}
        />
      </mesh>

      {/* Inverted Coilover Damper */}
      <group position={[-0.8 - explodeOffset * 0.5, 0.6 + explodeOffset * 0.5, -0.3]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 1.0, 24]} />
          <meshStandardMaterial color="#06b6d4" metalness={0.9} roughness={0.1} wireframe={wireframe} />
        </mesh>
        <mesh position={[0, -0.4, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.9, 24]} />
          <meshStandardMaterial color="#f1f5f9" metalness={0.98} roughness={0.05} wireframe={wireframe} />
        </mesh>
        {[...Array(6)].map((_, i) => (
          <mesh key={i} position={[0, 0.2 - i * 0.14, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <torusGeometry args={[0.24, 0.045, 12, 32]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.25} wireframe={wireframe} />
          </mesh>
        ))}
      </group>

      {/* Carbon Double Wishbone */}
      <mesh position={[-0.9 - explodeOffset * 0.4, -0.4, 0]} rotation={[0, 0, -Math.PI / 6]} castShadow>
        <boxGeometry args={[1.4, 0.12, 0.3]} />
        <meshStandardMaterial color="#11131a" roughness={0.4} metalness={0.4} wireframe={wireframe} />
      </mesh>
    </group>
  );
}

// MODEL 2: 800V EV Battery Pack & Inverter Modular Assembly
function EvBatteryAssembly({
  wireframe = false,
  exploded = false,
}: {
  wireframe: boolean;
  exploded: boolean;
}) {
  const explodeOffset = exploded ? 0.7 : 0;

  return (
    <group position={[0, 0, 0]}>
      {/* Lower Enclosure Tray (Structural Aluminum CTP) */}
      <mesh position={[0, -0.4 - explodeOffset * 0.3, 0]} receiveShadow castShadow>
        <boxGeometry args={[3.2, 0.2, 2.2]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} wireframe={wireframe} />
      </mesh>

      {/* Modular Cylindrical 4680 Cell Array Block */}
      <group position={[0, 0, 0]}>
        {[-1.0, -0.35, 0.35, 1.0].map((x, xi) =>
          [-0.6, 0.6].map((z, zi) => (
            <mesh key={`${xi}-${zi}`} position={[x, 0, z]} castShadow>
              <boxGeometry args={[0.55, 0.45, 0.95]} />
              <meshStandardMaterial
                color="#06b6d4"
                metalness={0.9}
                roughness={0.15}
                emissive="#083344"
                wireframe={wireframe}
              />
            </mesh>
          ))
        )}
      </group>

      {/* 800V Silicon Carbide Inverter Box */}
      <mesh position={[0, 0.55 + explodeOffset * 0.5, 0]} castShadow>
        <boxGeometry args={[1.4, 0.45, 1.1]} />
        <meshStandardMaterial
          color="#f59e0b"
          metalness={0.85}
          roughness={0.2}
          emissive="#451a03"
          wireframe={wireframe}
        />
      </mesh>

      {/* High-Voltage Copper Busbars */}
      <mesh position={[0, 0.28 + explodeOffset * 0.2, 0]}>
        <boxGeometry args={[2.6, 0.06, 0.12]} />
        <meshStandardMaterial color="#fb923c" metalness={0.95} roughness={0.1} wireframe={wireframe} />
      </mesh>

      {/* Upper Protective Cover (Carbon-Composite Lid) */}
      <mesh position={[0, 0.85 + explodeOffset * 0.8, 0]} castShadow>
        <boxGeometry args={[3.2, 0.12, 2.2]} />
        <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.4} wireframe={wireframe} />
      </mesh>
    </group>
  );
}

// MODEL 3: Body-in-White (BIW) Lightweight Spaceframe Chassis
function BiwChassisAssembly({
  wireframe = false,
  exploded = false,
}: {
  wireframe: boolean;
  exploded: boolean;
}) {
  const explodeOffset = exploded ? 0.6 : 0;

  return (
    <group position={[0, 0, 0]}>
      {/* Longitudinal Main Frame Rails */}
      <mesh position={[-1.1, 0, 0]} castShadow>
        <boxGeometry args={[0.15, 0.2, 3.2]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} wireframe={wireframe} />
      </mesh>
      <mesh position={[1.1, 0, 0]} castShadow>
        <boxGeometry args={[0.15, 0.2, 3.2]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} wireframe={wireframe} />
      </mesh>

      {/* Crossmembers */}
      {[-1.2, 0, 1.2].map((z, i) => (
        <mesh key={i} position={[0, 0, z]} castShadow>
          <boxGeometry args={[2.2, 0.15, 0.15]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.15} wireframe={wireframe} />
        </mesh>
      ))}

      {/* Front & Rear Crash Absorption Tubes (Hazard Amber) */}
      <mesh position={[0, 0, 1.7 + explodeOffset * 0.5]} castShadow>
        <boxGeometry args={[1.8, 0.3, 0.25]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.2} wireframe={wireframe} />
      </mesh>
      <mesh position={[0, 0, -1.7 - explodeOffset * 0.5]} castShadow>
        <boxGeometry args={[1.8, 0.3, 0.25]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.2} wireframe={wireframe} />
      </mesh>

      {/* Upper Safety Cage Pillars (A-Pillars & B-Pillars) */}
      <group position={[0, 0.75 + explodeOffset * 0.4, 0]}>
        <mesh position={[-0.9, 0, 0]} rotation={[0, 0, Math.PI / 12]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 1.4, 16]} />
          <meshStandardMaterial color="#06b6d4" metalness={0.9} roughness={0.1} wireframe={wireframe} />
        </mesh>
        <mesh position={[0.9, 0, 0]} rotation={[0, 0, -Math.PI / 12]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 1.4, 16]} />
          <meshStandardMaterial color="#06b6d4" metalness={0.9} roughness={0.1} wireframe={wireframe} />
        </mesh>
        {/* Roof Crossbar */}
        <mesh position={[0, 0.65, 0]}>
          <boxGeometry args={[1.7, 0.08, 1.6]} />
          <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} wireframe={wireframe} />
        </mesh>
      </group>
    </group>
  );
}

// GLTF Loader for external CAD models (.glb / .gltf)
function GltfModel({
  url,
  wireframe = false,
}: {
  url: string;
  wireframe: boolean;
}) {
  const { scene } = useGLTF(url);

  React.useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        const applyWireframe = (mat: THREE.Material) => {
          if ("wireframe" in mat) {
            (mat as THREE.MeshStandardMaterial).wireframe = wireframe;
          }
        };

        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(applyWireframe);
        } else if (mesh.material) {
          applyWireframe(mesh.material);
        }
      }
    });
  }, [scene, wireframe]);

  return <primitive object={scene} scale={[1, 1, 1]} position={[0, 0, 0]} />;
}

// Pointer Parallax Camera Rig (Inspired by Sylva's cursor-responsive camera movement)
function PointerParallaxRig() {
  const { camera, pointer } = useThree();

  useFrame(() => {
    const targetX = 3.5 + pointer.x * 0.45;
    const targetY = 2.2 + pointer.y * 0.35;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export function CadModel({
  modelUrl,
  modelType = "suspension",
  wireframe = false,
  exploded = false,
  autoRotate = true,
  scanLine = true,
}: CadModelProps) {
  const rootRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (autoRotate && rootRef.current) {
      rootRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <>
      <PointerParallaxRig />
      <group ref={rootRef}>
        {modelUrl ? (
          <GltfModel url={modelUrl} wireframe={wireframe} />
        ) : modelType === "ev-battery" ? (
          <EvBatteryAssembly wireframe={wireframe} exploded={exploded} />
        ) : modelType === "biw-chassis" ? (
          <SedanBiwModel
            wireframe={wireframe}
            exploded={exploded}
            autoRotate={false}
            scanLine={false}
            sparks={false}
            scale={0.85}
          />
        ) : (
          <SuspensionAssembly wireframe={wireframe} exploded={exploded} />
        )}
      </group>
      {scanLine && <ScanLaserPlane />}
      <WeldingSparks />
    </>
  );
}
