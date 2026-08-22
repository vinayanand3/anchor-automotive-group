import { NextRequest, NextResponse } from "next/server";
import {
  getAllRegistrations,
  updateRegistrationStatus,
  deleteRegistration,
} from "@/lib/db";

const ADMIN_PIN = process.env.ADMIN_PIN || "anchor2026";

function isAuthorized(req: NextRequest): boolean {
  const authHeader = req.headers.get("x-admin-pin") || req.headers.get("authorization");
  if (!authHeader) return false;
  const pin = authHeader.replace(/^Bearer\s+/i, "").trim();
  return pin === ADMIN_PIN;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Please enter valid Admin PIN." },
      { status: 401 }
    );
  }

  const registrations = getAllRegistrations();
  return NextResponse.json({ success: true, registrations });
}

export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Missing registration ID or status." },
        { status: 400 }
      );
    }

    const updated = updateRegistrationStatus(id, status);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Registration not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, registration: updated });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Failed to update status." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized." },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { success: false, error: "Registration ID is required." },
      { status: 400 }
    );
  }

  const success = deleteRegistration(id);
  return NextResponse.json({ success });
}
