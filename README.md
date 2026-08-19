# Anchor Automotive Group — Next.js 3D Web Experience

> **Tier-1 Automotive & Mobility Engineering Consultancy**  
> High-end, interactive 3D WebGL web platform inspired by Meng To's *Sylva* design study, configured for static deployment on **GitHub Pages** (`github.io`).

---

## 🏎️ Key Features

- **Interactive 3D WebGL CAD Viewport**: Built on React Three Fiber (`@react-three/fiber`), Three.js, and `@react-three/drei`. Features pointer-parallax camera tracking, procedural laser scanning planes, welding spark particle systems, wireframe inspection mode, and exploded assembly views.
- **Spring-Physics Bottom Dock**: macOS-style floating navigation dock engineered with Framer Motion (`useSpring`, `useTransform`) featuring proximity magnification, moving specular rims, and haptic feedback.
- **Liquid-Metal & Brushed Chrome Shaders**: Interactive CTA buttons reacting to mouse movement with simulated liquid-metal flow and specular sheen.
- **Real-Time Telemetry HUD**: Simulated engineering diagnostics overlay (Torsional Rigidity, $C_d$ Drag Coefficient, Inverter Efficiency, Thermal Margins).
- **Core B2B Disciplines**: Dedicated interactive showcases for EV Powertrains, BIW & Chassis Dynamics, Rework & 3D Prototyping Lab, and Anchor Engineering Academy.
- **Mutual NDA & RFQ Intake**: Encrypted lead generation form ready for Supabase or webhook integration.
- **Zero-Server Static Export**: Fully compiled to HTML/CSS/JS via Next.js `output: 'export'` for free hosting on GitHub Pages.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Static Export)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom Industrial Carbon & Titanium palette)
- **3D Graphics**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Motion & Physics**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [GitHub Pages](https://pages.github.com/) via GitHub Actions

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally in Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build Static Export
```bash
npm run build
```
The compiled, production-ready static assets will be output to the `out/` directory.

---

## 📦 Ingesting Your Own 3D CAD Models (.GLB / .GLTF)

1. Export your vehicle chassis, powertrain, or BIW assembly from CATIA / SolidWorks / Blender as a `.glb` or `.gltf` file.
2. (Optional but recommended) Compress your model with Draco / `gltf-pipeline` to ensure file sizes remain under 3–5MB:
   ```bash
   npx gltf-pipeline -i input.glb -o public/models/chassis.glb -d
   ```
3. Place the file in `public/models/` (e.g. `public/models/chassis.glb`).
4. Pass the model URL to the `<ModelCanvas />` component in `src/components/ui/HeroSection.tsx`:
   ```tsx
   <ModelCanvas
     modelUrl="/models/chassis.glb"
     wireframe={wireframe}
     exploded={exploded}
     autoRotate={autoRotate}
   />
   ```

---

## 🌐 Deploying to GitHub Pages (`github.io`)

This repository includes a pre-configured GitHub Actions workflow in `.github/workflows/deploy.yml`.

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Initialize Anchor Automotive 3D Web revamp"
   git push origin main
   ```
2. In your GitHub repository, navigate to **Settings** $\rightarrow$ **Pages**.
3. Under **Build and deployment** $\rightarrow$ **Source**, select **GitHub Actions**.
4. The workflow will automatically build and publish your website to:
   `https://<your-username>.github.io/<repository-name>/` (or your custom domain `anchorautomotivegroup.com`).

*(Note: If deploying to a subpath like `/<repository-name>/`, set `basePath` in `next.config.mjs` or pass `NEXT_PUBLIC_BASE_PATH` in your workflow).*
