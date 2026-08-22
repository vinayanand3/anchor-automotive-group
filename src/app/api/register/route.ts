import { NextRequest, NextResponse } from "next/server";
import { createRegistration } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, company, domain, notes, ndaRequired, source } = body;

    // Validation: Require Name and Phone (or email)
    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Principal contact name is required." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || phone.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Contact phone number is required." },
        { status: 400 }
      );
    }

    const registration = createRegistration({
      name: name.trim(),
      phone: phone.trim(),
      email: (email || "").trim(),
      company: (company || "Individual / Independent").trim(),
      domain: domain || "Body-in-White (BIW) & Chassis Kinematics",
      notes: (notes || "").trim(),
      ndaRequired: ndaRequired !== false,
      source: source || "consultation",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Registration successfully recorded under mutual NDA protocols.",
        registration,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error while processing registration." },
      { status: 500 }
    );
  }
}
