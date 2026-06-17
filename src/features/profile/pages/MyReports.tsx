import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";
import {
  FileText,
  Calendar,
  Tag,
  Clock,
  AlertCircle,
  Info,
  ChevronRight,
  Siren,
  ShieldX,
  FilePlus,
  MapPin,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FirReport {
  id: string | number;
  display_type: string;
  fir_type: string;
  report_date: string;
  status?: string;
}

interface SosReport {
  id: string | number;
  created_at: string;
  latitude?: number;
  longitude?: number;
  message?: string;
  status?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const typeLabels: Record<string, string> = {
  cyber_crimes: "Cyber Crime",
  theft_efirs: "Theft",
  lost_items: "Lost Item",
  missing_persons: "Missing Person",
  domestic_forms: "Domestic Help / Tenant",
  rape_cases: "Sensitive Case",
  mv_thefts: "Motor Vehicle Theft",
};

const getStatusStyle = (status?: string) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-700";
    case "investigating":
      return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700";
    case "resolved":
      return "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-700";
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700";
  }
};

const getFirIcon = (type: string) => {
  switch (type?.toLowerCase()) {
    case "theft_efirs":
    case "mv_thefts":
      return <Tag className="w-5 h-5" />;
    case "cyber_crimes":
      return <Info className="w-5 h-5" />;
    default:
      return <FileText className="w-5 h-5" />;
  }
};

const getFirIconBg = (type: string) => {
  switch (type?.toLowerCase()) {
    case "theft_efirs":
    case "mv_thefts":
      return "bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400";
    case "cyber_crimes":
      return "bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400";
    case "missing_persons":
      return "bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400";
    default:
      return "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
  }
};

// ─── Spinner ─────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-12 h-12 rounded-full border-4 border-slate-200 dark:border-slate-700 border-t-blue-600 animate-spin" />
    </div>
  );
}

// ─── Empty State ─────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Icon */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <ShieldX className="w-12 h-12 text-slate-400 dark:text-slate-500" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center border-2 border-white dark:border-slate-900">
          <FilePlus className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
        No Reports Yet
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm mb-8">
        You haven't submitted any E-FIRs or SOS alerts yet. Stay safe and use
        SafeSphere to report incidents quickly.
      </p>

      {/* Action cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
        <button
          onClick={() => (window.location.href = "/FirRegister")}
          className="flex items-center gap-4 p-5 rounded-2xl border-2 border-dashed border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center group-hover:scale-110 transition-transform">
            <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white text-sm">
              File an E-FIR
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Report a crime online
            </p>
          </div>
        </button>

        <button
          onClick={() => (window.location.href = "/sos")}
          className="flex items-center gap-4 p-5 rounded-2xl border-2 border-dashed border-red-200 dark:border-red-800 hover:border-red-400 dark:hover:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all group text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Siren className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white text-sm">
              SOS Emergency
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Trigger an SOS alert
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MyReports() {
  const [firReports, setFirReports] = useState<FirReport[]>([]);
  const [sosReports, setSosReports] = useState<SosReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFirs = apiClient
      .get("/api/profile/firs")
      .then((res) => {
        const rawData = res.data;
        const flattened: FirReport[] = [];

        Object.keys(rawData).forEach((key) => {
          if (Array.isArray(rawData[key])) {
            rawData[key].forEach((report: any) => {
              flattened.push({
                ...report,
                id: report.id || report.auth_id,
                display_type: typeLabels[key] || key,
                fir_type: key,
                report_date:
                  report.created_at ||
                  report.registration_date ||
                  report.date_of_incident ||
                  report.date_of_theft ||
                  report.loss_datetime ||
                  report.datetimelastseen ||
                  new Date().toISOString(),
              });
            });
          }
        });

        flattened.sort(
          (a, b) =>
            new Date(b.report_date).getTime() -
            new Date(a.report_date).getTime()
        );
        setFirReports(flattened);
      })
      .catch(() => {
        setError("There are no files filled yet. Please fill the form to see your reports.");
      });

    const fetchSos = apiClient
      .get("/api/profile/sos")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setSosReports(data);
      })
      .catch(() => {
        // SOS endpoint might not exist yet — fail silently
        setSosReports([]);
      });

    Promise.all([fetchFirs, fetchSos]).finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  const totalReports = firReports.length + sosReports.length;
  const hasNoReports = totalReports === 0 && !error;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            My Reports
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Track your submitted E-FIRs and SOS alerts
          </p>
        </div>
        {!hasNoReports && (
          <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-4 py-2 rounded-xl border border-blue-100 dark:border-blue-800 text-sm font-semibold">
            {totalReports} Total Report{totalReports !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      {/* API Error Banner */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3 text-red-700 dark:text-red-400">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* ── Empty State ── */}
      {hasNoReports && <EmptyState />}

      {/* ── FIR Reports Section ── */}
      {firReports.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">
              E-FIR Reports
            </h2>
            <span className="ml-auto text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
              {firReports.length}
            </span>
          </div>

          <div className="grid gap-3">
            {firReports.map((report) => (
              <div
                key={`fir-${report.fir_type}-${report.id}`}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 p-5 hover:shadow-md hover:border-blue-100 dark:hover:border-blue-900 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-xl ${getFirIconBg(report.fir_type)}`}
                    >
                      {getFirIcon(report.fir_type)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {report.display_type}
                      </h3>
                      <div className="flex items-center gap-4 mt-1 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(report.report_date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          ID: {report.id}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(report.status)}`}
                    >
                      {report.status || "Pending"}
                    </span>
                    <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── SOS Reports Section ── */}
      {sosReports.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Siren className="w-5 h-5 text-red-600 dark:text-red-400" />
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">
              SOS Alerts
            </h2>
            <span className="ml-auto text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
              {sosReports.length}
            </span>
          </div>

          <div className="grid gap-3">
            {sosReports.map((sos) => (
              <div
                key={`sos-${sos.id}`}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 p-5 hover:shadow-md hover:border-red-100 dark:hover:border-red-900 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                      <Siren className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {sos.message || "Emergency SOS Alert"}
                      </h3>
                      <div className="flex items-center gap-4 mt-1 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(sos.created_at).toLocaleDateString()}
                        </span>
                        {sos.latitude && sos.longitude && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {sos.latitude.toFixed(4)}, {sos.longitude.toFixed(4)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(sos.status)}`}
                  >
                    {sos.status || "Sent"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
