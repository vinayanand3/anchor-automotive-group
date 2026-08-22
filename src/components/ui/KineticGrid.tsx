"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

export interface KineticGridProps {
  preset?: "studio-light" | "light" | "titanium" | "base" | "cyber" | "amber" | "monochrome";
  gridSize?: number;
  attractionRadius?: number;
  attractionStrength?: number;
  returnSpeed?: number;
  dotRadius?: number;
  lineWidth?: number;
  ambientWave?: boolean;
  ambientSpeed?: number;
  ambientAmplitude?: number;
  className?: string;
}

interface GridPoint {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  displacement: number;
}

const PRESET_CONFIGS = {
  "studio-light": {
    lineBaseColor: "rgba(0, 0, 0, 0.055)",
    lineActiveColor: "rgba(15, 17, 21, 0.42)",
    dotBaseColor: "rgba(0, 0, 0, 0.12)",
    dotActiveColor: "rgba(15, 17, 21, 0.88)",
    glowColor: "rgba(15, 17, 21, 0.2)",
    gridSize: 42,
    attractionRadius: 210,
    attractionStrength: 48,
    returnSpeed: 0.085,
    ambientAmplitude: 2.8,
    ambientSpeed: 0.9,
  },
  light: {
    lineBaseColor: "rgba(0, 0, 0, 0.055)",
    lineActiveColor: "rgba(15, 17, 21, 0.42)",
    dotBaseColor: "rgba(0, 0, 0, 0.12)",
    dotActiveColor: "rgba(15, 17, 21, 0.88)",
    glowColor: "rgba(15, 17, 21, 0.2)",
    gridSize: 42,
    attractionRadius: 210,
    attractionStrength: 48,
    returnSpeed: 0.085,
    ambientAmplitude: 2.8,
    ambientSpeed: 0.9,
  },
  titanium: {
    lineBaseColor: "rgba(255, 255, 255, 0.045)",
    lineActiveColor: "rgba(226, 222, 215, 0.38)",
    dotBaseColor: "rgba(255, 255, 255, 0.14)",
    dotActiveColor: "rgba(241, 243, 245, 0.95)",
    glowColor: "rgba(216, 211, 202, 0.4)",
    gridSize: 42,
    attractionRadius: 210,
    attractionStrength: 50,
    returnSpeed: 0.085,
    ambientAmplitude: 3.0,
    ambientSpeed: 1.0,
  },
  base: {
    lineBaseColor: "rgba(0, 0, 0, 0.055)",
    lineActiveColor: "rgba(15, 17, 21, 0.42)",
    dotBaseColor: "rgba(0, 0, 0, 0.12)",
    dotActiveColor: "rgba(15, 17, 21, 0.88)",
    glowColor: "rgba(15, 17, 21, 0.2)",
    gridSize: 42,
    attractionRadius: 210,
    attractionStrength: 48,
    returnSpeed: 0.085,
    ambientAmplitude: 2.8,
    ambientSpeed: 0.9,
  },
  cyber: {
    lineBaseColor: "rgba(6, 182, 212, 0.1)",
    lineActiveColor: "rgba(6, 182, 212, 0.65)",
    dotBaseColor: "rgba(6, 182, 212, 0.25)",
    dotActiveColor: "rgba(165, 243, 252, 1)",
    glowColor: "rgba(6, 182, 212, 0.8)",
    gridSize: 36,
    attractionRadius: 220,
    attractionStrength: 60,
    returnSpeed: 0.1,
    ambientAmplitude: 4.0,
    ambientSpeed: 1.5,
  },
  amber: {
    lineBaseColor: "rgba(245, 158, 11, 0.08)",
    lineActiveColor: "rgba(245, 158, 11, 0.6)",
    dotBaseColor: "rgba(245, 158, 11, 0.2)",
    dotActiveColor: "rgba(254, 240, 138, 1)",
    glowColor: "rgba(245, 158, 11, 0.75)",
    gridSize: 40,
    attractionRadius: 190,
    attractionStrength: 48,
    returnSpeed: 0.085,
    ambientAmplitude: 3.0,
    ambientSpeed: 1.1,
  },
  monochrome: {
    lineBaseColor: "rgba(255, 255, 255, 0.04)",
    lineActiveColor: "rgba(255, 255, 255, 0.4)",
    dotBaseColor: "rgba(255, 255, 255, 0.12)",
    dotActiveColor: "rgba(255, 255, 255, 0.9)",
    glowColor: "rgba(255, 255, 255, 0.35)",
    gridSize: 40,
    attractionRadius: 180,
    attractionStrength: 45,
    returnSpeed: 0.08,
    ambientAmplitude: 2.8,
    ambientSpeed: 1.0,
  },
};

export function KineticGrid({
  preset = "titanium",
  gridSize: propGridSize,
  attractionRadius: propAttractionRadius,
  attractionStrength: propAttractionStrength,
  returnSpeed: propReturnSpeed,
  dotRadius = 1.4,
  lineWidth = 0.9,
  ambientWave = true,
  ambientSpeed: propAmbientSpeed,
  ambientAmplitude: propAmbientAmplitude,
  className = "w-full h-full",
}: KineticGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const config = PRESET_CONFIGS[preset] || PRESET_CONFIGS.base;
  const gridSize = propGridSize ?? config.gridSize;
  const attractionRadius = propAttractionRadius ?? config.attractionRadius;
  const attractionStrength = propAttractionStrength ?? config.attractionStrength;
  const returnSpeed = propReturnSpeed ?? config.returnSpeed;
  const ambientSpeed = propAmbientSpeed ?? config.ambientSpeed;
  const ambientAmplitude = propAmbientAmplitude ?? config.ambientAmplitude;

  // Mouse & interaction state
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  const pointsRef = useRef<GridPoint[][]>([]);
  const animationFrameRef = useRef<number>(0);

  // Initialize or rebuild grid points based on canvas dimensions
  const initGrid = useCallback(
    (width: number, height: number) => {
      const cols = Math.ceil(width / gridSize) + 2;
      const rows = Math.ceil(height / gridSize) + 2;
      const offsetX = (width - (cols - 1) * gridSize) / 2;
      const offsetY = (height - (rows - 1) * gridSize) / 2;

      const grid: GridPoint[][] = [];
      for (let r = 0; r < rows; r++) {
        const rowPoints: GridPoint[] = [];
        for (let c = 0; c < cols; c++) {
          const originX = c * gridSize + offsetX;
          const originY = r * gridSize + offsetY;
          rowPoints.push({
            originX,
            originY,
            x: originX,
            y: originY,
            vx: 0,
            vy: 0,
            displacement: 0,
          });
        }
        grid.push(rowPoints);
      }
      pointsRef.current = grid;
    },
    [gridSize]
  );

  // Handle Canvas Resizing with Retina DPR support
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      initGrid(rect.width, rect.height);
    };

    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [initGrid]);

  // Track Mouse movement on window / container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handlePointerLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    container.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  // Main 60/120 FPS Animation Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let startTime = performance.now();

    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) {
        animationFrameRef.current = requestAnimationFrame(render);
        return;
      }

      const width = rect.width;
      const height = rect.height;

      // Clear frame
      ctx.clearRect(0, 0, width, height);

      const grid = pointsRef.current;
      const rows = grid.length;
      if (rows === 0) {
        animationFrameRef.current = requestAnimationFrame(render);
        return;
      }
      const cols = grid[0].length;
      const mouse = mouseRef.current;

      // 1. UPDATE POINT POSITIONS & PHYSICS
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const pt = grid[r][c];

          // Distance from cursor
          let targetX = pt.originX;
          let targetY = pt.originY;
          let normalizedDisplacement = 0;

          if (mouse.active) {
            const dx = mouse.x - pt.originX;
            const dy = mouse.y - pt.originY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < attractionRadius) {
              // Smooth quadratic magnetic attraction falloff
              const factor = Math.pow(1 - dist / attractionRadius, 2);
              const angle = Math.atan2(dy, dx);
              const pull = attractionStrength * factor;

              targetX = pt.originX + Math.cos(angle) * pull;
              targetY = pt.originY + Math.sin(angle) * pull;
              normalizedDisplacement = factor;
            }
          }

          // Ambient idle breathing wave effect
          if (ambientWave) {
            const wave =
              Math.sin(
                elapsed * ambientSpeed +
                  pt.originY * 0.012 +
                  pt.originX * 0.008
              ) * ambientAmplitude;
            const waveY =
              Math.cos(
                elapsed * ambientSpeed * 0.85 +
                  pt.originX * 0.012 +
                  pt.originY * 0.008
              ) * (ambientAmplitude * 0.7);

            targetX += wave;
            targetY += waveY;
          }

          // Spring Lerp integration
          pt.x += (targetX - pt.x) * returnSpeed;
          pt.y += (targetY - pt.y) * returnSpeed;
          pt.displacement = THREE_LERP(pt.displacement, normalizedDisplacement, 0.15);
        }
      }

      // 2. DRAW HORIZONTAL GRID LINES
      ctx.lineWidth = lineWidth;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 1; c++) {
          const p1 = grid[r][c];
          const p2 = grid[r][c + 1];
          const avgDisp = (p1.displacement + p2.displacement) / 2;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          if (avgDisp > 0.02) {
            ctx.strokeStyle = config.lineActiveColor;
            ctx.globalAlpha = Math.min(0.2 + avgDisp * 0.8, 1);
          } else {
            ctx.strokeStyle = config.lineBaseColor;
            ctx.globalAlpha = 1;
          }
          ctx.stroke();
        }
      }

      // 3. DRAW VERTICAL GRID LINES
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 1; r++) {
          const p1 = grid[r][c];
          const p2 = grid[r + 1][c];
          const avgDisp = (p1.displacement + p2.displacement) / 2;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          if (avgDisp > 0.02) {
            ctx.strokeStyle = config.lineActiveColor;
            ctx.globalAlpha = Math.min(0.2 + avgDisp * 0.8, 1);
          } else {
            ctx.strokeStyle = config.lineBaseColor;
            ctx.globalAlpha = 1;
          }
          ctx.stroke();
        }
      }

      // 4. DRAW INTERSECTION DOT NODES
      ctx.globalAlpha = 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const pt = grid[r][c];
          const isElevated = pt.displacement > 0.05;

          const currentDotRadius = isElevated
            ? dotRadius + pt.displacement * 2.2
            : dotRadius;

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, currentDotRadius, 0, Math.PI * 2);

          if (isElevated) {
            ctx.fillStyle = config.dotActiveColor;
            ctx.shadowColor = config.glowColor;
            ctx.shadowBlur = 8 * pt.displacement;
          } else {
            ctx.fillStyle = config.dotBaseColor;
            ctx.shadowBlur = 0;
          }

          ctx.fill();
        }
      }

      // Reset shadow for next tick
      ctx.shadowBlur = 0;

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [
    config,
    attractionRadius,
    attractionStrength,
    returnSpeed,
    ambientWave,
    ambientSpeed,
    ambientAmplitude,
    dotRadius,
    lineWidth,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden pointer-events-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}

function THREE_LERP(current: number, target: number, speed: number): number {
  return current + (target - current) * speed;
}
