import fs from "fs";
import path from "path";

export interface Registration {
  id: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  domain: string;
  notes?: string;
  ndaRequired?: boolean;
  source: "consultation" | "academy" | "rework";
  status: "new" | "contacted" | "in_review" | "archived";
  createdAt: string;
}

// In-memory cache for fast read/write and serverless warmup
let memoryStore: Registration[] = [
  {
    id: "ANCHOR-2026-ENG-1001",
    name: "Dr. Marcus Vance",
    phone: "+1 (248) 555-0142",
    email: "m.vance@rivian-mobility.com",
    company: "Rivian Automotive",
    domain: "Body-in-White (BIW) & Chassis Kinematics",
    notes: "Reviewing lightweight aluminum hot stamping and LS-DYNA side-impact crash simulations for Gen-2 SUV platform.",
    ndaRequired: true,
    source: "consultation",
    status: "in_review",
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
  },
  {
    id: "ANCHOR-2026-ENG-1002",
    name: "Elena Rostova",
    phone: "+1 (313) 555-0891",
    email: "e.rostova@fordtech.org",
    company: "Ford Mobility",
    domain: "EV Powertrain & Battery CTP Architecture",
    notes: "Seeking 800V silicon carbide inverter cold-plate validation and structural pack integration.",
    ndaRequired: true,
    source: "consultation",
    status: "new",
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
  {
    id: "ANCHOR-2026-ENG-1003",
    name: "David Chen",
    phone: "+1 (586) 555-4321",
    email: "dchen@magna-int.com",
    company: "Magna International",
    domain: "Anchor Engineering Academy Training",
    notes: "Candidate enrollment for 12-week advanced BIW surfacing and AutoForm die feasibility masterclass.",
    ndaRequired: false,
    source: "academy",
    status: "contacted",
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
];

function getFilePath(): string {
  // In serverless/Vercel production, /tmp is writable; locally, use .data directory
  const isVercel = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
  if (isVercel) {
    return path.join("/tmp", "anchor_registrations.json");
  }
  const dir = path.join(process.cwd(), ".data");
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch {}
  }
  return path.join(dir, "registrations.json");
}

function loadFromDisk(): Registration[] {
  try {
    const filePath = getFilePath();
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryStore = parsed;
        return memoryStore;
      }
    }
  } catch (err) {
    console.error("Failed to load registrations from disk, using memory store:", err);
  }
  return memoryStore;
}

function saveToDisk(data: Registration[]): void {
  try {
    const filePath = getFilePath();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to persist registrations to disk:", err);
  }
}

export function getAllRegistrations(): Registration[] {
  loadFromDisk();
  return [...memoryStore].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function createRegistration(
  payload: Omit<Registration, "id" | "createdAt" | "status">
): Registration {
  loadFromDisk();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const newReg: Registration = {
    id: `ANCHOR-2026-ENG-${randomSuffix}`,
    ...payload,
    status: "new",
    createdAt: new Date().toISOString(),
  };

  memoryStore.unshift(newReg);
  saveToDisk(memoryStore);
  return newReg;
}

export function updateRegistrationStatus(
  id: string,
  status: Registration["status"]
): Registration | null {
  loadFromDisk();
  const index = memoryStore.findIndex((r) => r.id === id);
  if (index === -1) return null;
  memoryStore[index].status = status;
  saveToDisk(memoryStore);
  return memoryStore[index];
}

export function deleteRegistration(id: string): boolean {
  loadFromDisk();
  const initialLength = memoryStore.length;
  memoryStore = memoryStore.filter((r) => r.id !== id);
  if (memoryStore.length !== initialLength) {
    saveToDisk(memoryStore);
    return true;
  }
  return false;
}
