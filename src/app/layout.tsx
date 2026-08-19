import type { Metadata } from "next";
import "./globals.css";
import { SylvaDock } from "@/components/ui/SylvaDock";
import { Footer } from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Anchor Automotive Group — Advanced Mobility Engineering",
  description:
    "Tier-1 automotive engineering consultancy based in Novi, MI. Specializing in Body-in-White kinematics, 800V EV powertrain architecture, and precision rework.",
  keywords: [
    "Anchor Automotive",
    "Body in White BIW",
    "EV Powertrain",
    "Automotive Engineering Consultancy",
    "Novi Michigan",
    "FEA Simulation",
    "Rapid Prototyping",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-sylva-bg text-sylva-ink min-h-screen flex flex-col antialiased selection:bg-paper-card selection:text-paper-ink">
        {/* Floating Sylva Navigation Dock */}
        <SylvaDock />

        {/* Main Content */}
        <main className="flex-grow">{children}</main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
