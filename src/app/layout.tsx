import type { Metadata } from "next";
import "./globals.css";

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
    "Detroit Automotive Corridor",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#F6F5F2] text-[#0F1115] min-h-screen antialiased selection:bg-black/10 selection:text-black">
        {children}
      </body>
    </html>
  );
}
