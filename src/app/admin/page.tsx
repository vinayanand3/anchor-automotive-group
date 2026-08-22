"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Users,
  Phone,
  Mail,
  Building,
  Calendar,
  Download,
  Search,
  Filter,
  RefreshCw,
  CheckCircle2,
  Clock,
  Trash2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  ArrowLeft,
  Copy,
  Check,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { Registration } from "@/lib/db";

export default function AdminDashboardPage() {
  const [pin, setPin] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);
  const [activeModalReg, setActiveModalReg] = useState<Registration | null>(null);

  // Auto-login if session pin is present
  useEffect(() => {
    const savedPin = sessionStorage.getItem("anchor_admin_pin");
    if (savedPin) {
      setPin(savedPin);
      fetchRegistrations(savedPin);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) {
      setAuthError("Please enter your Admin PIN.");
      return;
    }
    fetchRegistrations(pin);
  };

  const fetchRegistrations = async (pinCode: string) => {
    setLoading(true);
    setAuthError("");
    try {
      const res = await fetch("/api/admin/registrations", {
        headers: {
          "x-admin-pin": pinCode,
        },
      });
      const data = await res.json();
      if (data.success) {
        setRegistrations(data.registrations);
        setAuthenticated(true);
        sessionStorage.setItem("anchor_admin_pin", pinCode);
      } else {
        setAuthError(data.error || "Incorrect Admin PIN.");
        setAuthenticated(false);
      }
    } catch (err) {
      setAuthError("Failed to connect to registration server.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: Registration["status"]) => {
    try {
      const res = await fetch("/api/admin/registrations", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": pin,
        },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setRegistrations((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
        );
      }
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(`Are you sure you want to delete registration ${id}?`)) return;
    try {
      const res = await fetch(`/api/admin/registrations?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: {
          "x-admin-pin": pin,
        },
      });
      const data = await res.json();
      if (data.success) {
        setRegistrations((prev) => prev.filter((r) => r.id !== id));
        if (activeModalReg?.id === id) setActiveModalReg(null);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleCopyPhone = (phoneNumber: string) => {
    navigator.clipboard.writeText(phoneNumber);
    setCopiedPhone(phoneNumber);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  const handleExportCSV = () => {
    if (registrations.length === 0) return;
    const headers = [
      "Registration ID",
      "Name",
      "Phone",
      "Email",
      "Company",
      "Domain",
      "Source",
      "NDA Required",
      "Status",
      "Created At",
      "Notes",
    ];

    const rows = filteredRegistrations.map((r) => [
      `"${r.id}"`,
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.phone.replace(/"/g, '""')}"`,
      `"${r.email.replace(/"/g, '""')}"`,
      `"${r.company.replace(/"/g, '""')}"`,
      `"${r.domain.replace(/"/g, '""')}"`,
      `"${r.source}"`,
      `"${r.ndaRequired ? "Yes" : "No"}"`,
      `"${r.status}"`,
      `"${new Date(r.createdAt).toLocaleString()}"`,
      `"${(r.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `anchor_automotive_registrations_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter logic
  const filteredRegistrations = registrations.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDomain =
      selectedDomain === "all" || r.domain === selectedDomain;

    const matchesStatus =
      selectedStatus === "all" || r.status === selectedStatus;

    return matchesSearch && matchesDomain && matchesStatus;
  });

  // Calculate Metrics
  const totalLeads = registrations.length;
  const newLeads = registrations.filter((r) => r.status === "new").length;
  const contactedLeads = registrations.filter((r) => r.status === "contacted").length;
  const uniquePhones = new Set(registrations.map((r) => r.phone.replace(/\D/g, ""))).size;

  // Render Passcode Screen if not logged in
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#F6F5F2] flex flex-col items-center justify-center p-4 selection:bg-black/10">
        <div className="w-full max-w-md p-8 sm:p-10 rounded-[2.5rem] bg-white border border-black/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.06)] text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-[#F6F5F2] border border-black/5 text-[#0F1115] flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-6 h-6 text-[#0F1115]" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#0F1115] tracking-tight">
              Executive Admin Portal
            </h1>
            <p className="text-xs text-[#5A606D] mt-1 font-mono uppercase tracking-wider">
              ANCHOR AUTOMOTIVE GROUP // NOVI, MI
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#717682] font-semibold">
                Enter Admin Access PIN
              </label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Default PIN: anchor2026"
                className="w-full px-4 py-3 rounded-2xl bg-[#F6F5F2] border border-black/10 text-[#0F1115] text-sm placeholder-[#717682] focus:border-[#0F1115] focus:bg-white focus:outline-none transition-colors text-center font-mono"
                autoFocus
              />
            </div>

            {authError && (
              <div className="flex items-center gap-1.5 text-xs text-rose-600 justify-center bg-rose-50 p-2.5 rounded-xl border border-rose-100">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-[#0F1115] hover:bg-[#252830] text-white text-xs font-mono uppercase tracking-widest transition-all shadow-md active:scale-95 disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Unlock Dashboard"}
            </button>
          </form>

          <div className="pt-2 border-t border-black/5">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#5A606D] hover:text-[#0F1115] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F5F2] text-[#0F1115] p-4 sm:p-8 lg:p-12 selection:bg-black/10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* TOP BAR */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/[0.08] pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-xs font-mono text-[#5A606D] hover:text-[#0F1115] transition-colors uppercase tracking-wider"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Site</span>
              </Link>
              <span className="text-zinc-300">•</span>
              <span className="text-xs font-mono text-emerald-600 flex items-center gap-1 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Database Connected
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#0F1115] tracking-tight">
              Customer Registration <span className="font-normal italic text-[#5A606D]">Portal</span>
            </h1>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => fetchRegistrations(pin)}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-black/[0.08] text-xs font-mono text-[#0F1115] hover:bg-[#EFEFEA] shadow-sm transition-all active:scale-95"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0F1115] hover:bg-[#252830] text-white text-xs font-mono uppercase tracking-widest shadow-md transition-all active:scale-95"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>Export CSV</span>
            </button>
          </div>
        </header>

        {/* METRICS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-[2rem] bg-white border border-black/[0.08] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-[#717682]">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">Total Inquiries</span>
              <Users className="w-4 h-4 text-[#0F1115]" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-[#0F1115]">{totalLeads}</div>
            <p className="text-[11px] text-[#5A606D] font-mono">All-time customer entries</p>
          </div>

          <div className="p-6 rounded-[2rem] bg-white border border-black/[0.08] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-[#717682]">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">Verified Phone Numbers</span>
              <Phone className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-[#0F1115]">{uniquePhones}</div>
            <p className="text-[11px] text-[#5A606D] font-mono">Ready for direct callback</p>
          </div>

          <div className="p-6 rounded-[2rem] bg-white border border-black/[0.08] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-[#717682]">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">New Pending Inquiries</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-[#0F1115]">{newLeads}</div>
            <p className="text-[11px] text-[#5A606D] font-mono">Requires initial review</p>
          </div>

          <div className="p-6 rounded-[2rem] bg-white border border-black/[0.08] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-[#717682]">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">Contacted / Engaged</span>
              <CheckCircle2 className="w-4 h-4 text-cyan-600" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-[#0F1115]">{contactedLeads}</div>
            <p className="text-[11px] text-[#5A606D] font-mono">Consultation in progress</p>
          </div>
        </div>

        {/* SEARCH & FILTER CONTROLS */}
        <div className="p-4 rounded-[2rem] bg-white border border-black/[0.08] shadow-sm flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#717682] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by customer name, phone number, company, email or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#F6F5F2] border border-black/5 text-xs text-[#0F1115] placeholder-[#717682] focus:outline-none focus:bg-white focus:border-[#0F1115] transition-all"
            />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#5A606D]">
              <Filter className="w-3.5 h-3.5 text-[#0F1115]" />
              <span>Domain:</span>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#F6F5F2] border border-black/5 text-xs text-[#0F1115] focus:outline-none cursor-pointer"
              >
                <option value="all">All Domains</option>
                <option value="Body-in-White (BIW) & Chassis Kinematics">BIW & Chassis</option>
                <option value="EV Powertrain & Battery CTP Architecture">EV Powertrain</option>
                <option value="CFD Aerodynamics & Thermal Management">CFD & Thermal</option>
                <option value="Rapid Prototyping & Laser Rework">Rapid Rework</option>
                <option value="Anchor Engineering Academy Training">Academy</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono text-[#5A606D]">
              <span>Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#F6F5F2] border border-black/5 text-xs text-[#0F1115] focus:outline-none cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="in_review">In Review</option>
                <option value="contacted">Contacted</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* CUSTOMERS DATA TABLE */}
        <div className="rounded-[2.5rem] bg-white border border-black/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F8F7F4] border-b border-black/[0.08] text-[#717682] font-mono uppercase tracking-wider">
                  <th className="py-4 px-6 font-semibold">Customer & ID</th>
                  <th className="py-4 px-6 font-semibold">Phone Number</th>
                  <th className="py-4 px-6 font-semibold">Email & Organization</th>
                  <th className="py-4 px-6 font-semibold">Engineering Discipline</th>
                  <th className="py-4 px-6 font-semibold">Date Registered</th>
                  <th className="py-4 px-6 font-semibold">Status</th>
                  <th className="py-4 px-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.06]">
                {filteredRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-[#717682] font-mono">
                      No customer registrations match your search filters.
                    </td>
                  </tr>
                ) : (
                  filteredRegistrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-[#F9F8F5] transition-colors">
                      {/* Name & ID */}
                      <td className="py-4 px-6">
                        <div className="font-semibold text-[#0F1115] text-sm">{reg.name}</div>
                        <div className="text-[11px] font-mono text-[#717682] mt-0.5">{reg.id}</div>
                      </td>

                      {/* Phone Number with Click-to-call and Copy */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${reg.phone}`}
                            className="font-mono text-xs font-semibold text-[#0F1115] hover:text-cyan-700 transition-colors flex items-center gap-1.5"
                          >
                            <Phone className="w-3.5 h-3.5 text-cyan-600" />
                            <span>{reg.phone}</span>
                          </a>
                          <button
                            onClick={() => handleCopyPhone(reg.phone)}
                            className="p-1 rounded hover:bg-black/5 text-[#717682] transition-colors"
                            title="Copy Phone Number"
                          >
                            {copiedPhone === reg.phone ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* Email & Company */}
                      <td className="py-4 px-6">
                        <a
                          href={`mailto:${reg.email}`}
                          className="text-[#0F1115] hover:underline flex items-center gap-1.5"
                        >
                          <Mail className="w-3.5 h-3.5 text-[#5A606D]" />
                          <span>{reg.email || "—"}</span>
                        </a>
                        <div className="text-[#5A606D] text-[11px] flex items-center gap-1 mt-0.5">
                          <Building className="w-3 h-3 text-[#717682]" />
                          <span>{reg.company}</span>
                        </div>
                      </td>

                      {/* Domain */}
                      <td className="py-4 px-6">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-[#F6F5F2] border border-black/5 text-[11px] font-mono text-[#2B303A]">
                          {reg.domain}
                        </span>
                      </td>

                      {/* Timestamp */}
                      <td className="py-4 px-6 text-[#5A606D] font-mono text-[11px]">
                        {new Date(reg.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>

                      {/* Status Selector */}
                      <td className="py-4 px-6">
                        <select
                          value={reg.status}
                          onChange={(e) =>
                            handleStatusChange(
                              reg.id,
                              e.target.value as Registration["status"]
                            )
                          }
                          className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold border cursor-pointer ${
                            reg.status === "new"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : reg.status === "contacted"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : reg.status === "in_review"
                              ? "bg-cyan-50 text-cyan-700 border-cyan-200"
                              : "bg-zinc-100 text-zinc-600 border-zinc-200"
                          }`}
                        >
                          <option value="new">● New</option>
                          <option value="in_review">● In Review</option>
                          <option value="contacted">● Contacted</option>
                          <option value="archived">● Archived</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setActiveModalReg(reg)}
                            className="p-1.5 rounded-lg hover:bg-black/5 text-[#5A606D] hover:text-[#0F1115] transition-colors"
                            title="View Full Scope"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(reg.id)}
                            className="p-1.5 rounded-lg hover:bg-rose-50 text-[#717682] hover:text-rose-600 transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {activeModalReg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalReg(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="relative w-full max-w-xl rounded-[2.5rem] bg-white border border-black/[0.08] p-8 shadow-2xl z-10 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-black/5 pb-4">
                <div>
                  <span className="text-[11px] font-mono text-[#717682] uppercase tracking-wider">
                    REGISTRATION DETAILS
                  </span>
                  <h3 className="text-xl font-bold text-[#0F1115] tracking-tight mt-0.5">
                    {activeModalReg.name}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalReg(null)}
                  className="w-8 h-8 rounded-full bg-[#F6F5F2] flex items-center justify-center text-[#5A606D] hover:text-[#0F1115]"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-[#F6F5F2] border border-black/5 space-y-1">
                  <span className="text-[#717682] font-mono uppercase text-[10px]">Phone Number</span>
                  <div className="font-semibold text-sm text-[#0F1115]">{activeModalReg.phone}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F6F5F2] border border-black/5 space-y-1">
                  <span className="text-[#717682] font-mono uppercase text-[10px]">Email</span>
                  <div className="font-semibold text-sm text-[#0F1115] truncate">{activeModalReg.email || "N/A"}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F6F5F2] border border-black/5 space-y-1">
                  <span className="text-[#717682] font-mono uppercase text-[10px]">Organization</span>
                  <div className="font-semibold text-sm text-[#0F1115]">{activeModalReg.company}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F6F5F2] border border-black/5 space-y-1">
                  <span className="text-[#717682] font-mono uppercase text-[10px]">Discipline</span>
                  <div className="font-semibold text-sm text-[#0F1115]">{activeModalReg.domain}</div>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#717682] font-semibold">
                  Project Scope & Technical Targets:
                </span>
                <div className="p-4 rounded-2xl bg-[#F6F5F2] border border-black/5 text-xs text-[#2B303A] leading-relaxed max-h-48 overflow-y-auto">
                  {activeModalReg.notes || "No additional technical scope notes provided."}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <a
                  href={`tel:${activeModalReg.phone}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0F1115] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#252830] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {activeModalReg.name.split(" ")[0]}</span>
                </a>

                <button
                  onClick={() => handleDelete(activeModalReg.id)}
                  className="text-xs font-mono text-rose-600 hover:underline"
                >
                  Delete Lead
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
