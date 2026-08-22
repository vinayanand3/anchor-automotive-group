# CAD Models Directory

Place your `.glb` or `.gltf` automotive CAD models here.

### Example usage:
In `src/app/page.tsx` or `src/components/ui/HeroSection.tsx`:

```tsx
<ModelCanvas
  modelUrl="/models/chassis_assembly.glb"
  wireframe={wireframe}
  exploded={exploded}
  autoRotate={autoRotate}
/>
```

When no `modelUrl` is provided, the viewer automatically renders the built-in precision automotive CAD suspension & powertrain assembly demonstration.
