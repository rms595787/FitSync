import { useMemo } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import "@/lib/chart";
import { Button } from "@/components/ui/button";
import { getRole } from "@/lib/auth";
import type { ProgressPoint, Role } from "@shared/api";

const weeks = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];

function toCSV(rows: (string | number)[][]) {
  return rows
    .map((r) => r.map((v) => `"${String(v).replace(/\"/g, '""')}"`).join(","))
    .join("\n");
}

function download(filename: string, content: string, type = "text/csv") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl p-4 bg-gradient-to-br from-white to-transparent border">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}

export default function Dashboard() {
  const role: Role = getRole();

  const progress: ProgressPoint[] = useMemo(
    () =>
      weeks.map((w, i) => ({
        week: w,
        weight: 80 - i * 0.6 + (i % 2 === 0 ? 0.2 : -0.1),
        volume: 10000 + i * 700,
        calories: 2200 - i * 12,
      })),
    [],
  );

  const lineData = useMemo(() => {
    return {
      labels: weeks,
      datasets: [
        {
          label: "Weight (kg)",
          data: progress.map((p) => p.weight),
          borderColor: "rgba(56,189,248,1)",
          backgroundColor: "rgba(56,189,248,0.12)",
          fill: true,
          tension: 0.35,
          pointRadius: 4,
          borderWidth: 2,
        },
        {
          label: "Calories",
          data: progress.map((p) => p.calories),
          borderColor: "rgba(34,197,94,1)",
          backgroundColor: "rgba(34,197,94,0.12)",
          fill: true,
          tension: 0.35,
          pointRadius: 4,
          borderWidth: 2,
          yAxisID: "y1",
        },
      ],
    };
  }, [progress]);

  const lineOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, labels: { usePointStyle: true } },
        title: { display: true, text: "8-Week Progress" },
        tooltip: { mode: "index" as const, intersect: false, padding: 8 },
      },
      interaction: { intersect: false, mode: "index" as const },
      animation: { duration: 300 },
      scales: {
        y: { grid: { color: "rgba(0,0,0,0.04)" } },
        y1: { position: "right" as const, grid: { drawOnChartArea: false } },
      },
    }),
    [],
  );

  const macroData = useMemo(() => ({
    labels: ["Protein", "Carbs", "Fat"],
    datasets: [
      {
        label: "Macros",
        data: [35, 45, 20],
        backgroundColor: ["#60A5FA", "#34D399", "#FCA5A5"],
        borderWidth: 0,
      },
    ],
  }), []);

  const exportCSV = () => {
    const header = ["week", "weight", "volume", "calories"];
    const rows = [header, ...progress.map((p) => [p.week, p.weight, p.volume, p.calories])];
    download("fitsync-progress.csv", toCSV(rows));
  };

  return (
    <div className="container mx-auto py-8 md:py-12">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Role: <span className="font-medium capitalize">{role}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportCSV} variant="outline">Export CSV</Button>
          <Button onClick={() => window.print()}>Print / PDF</Button>
        </div>
      </div>

      {/* Top stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Stat label="Active Plans" value={role === "admin" ? "128" : role === "trainer" ? "24" : "3"} />
        <Stat label="Weekly Volume" value={Intl.NumberFormat().format(progress[progress.length - 1]!.volume) + " kg"} />
        <Stat label="Avg Calories" value={`${Math.round(progress.reduce((a,b)=>a+b.calories,0)/progress.length)}`} />
        <Stat label="Habit Streak" value={role === "client" ? "21 days" : "N/A"} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border p-4 bg-card">
          <div className="h-72 md:h-96">
            <Line data={lineData} options={lineOptions} updateMode="none" />
          </div>
        </div>
        <div className="rounded-xl border p-4 bg-card">
          <h3 className="font-semibold mb-4">Macro Breakdown</h3>
          <div className="h-72">
            <Doughnut data={macroData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" as const } }, animation: { duration: 300 } as any }} />
          </div>
        </div>
      </div>

      {/* Role-based modules */}
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        {role === "admin" && (
          <div className="rounded-xl border p-4 bg-card">
            <h3 className="font-semibold mb-1">User Management</h3>
            <p className="text-sm text-muted-foreground">Review signups, assign roles, and audit activity.</p>
          </div>
        )}
        {role !== "admin" && (
          <div className="rounded-xl border p-4 bg-card">
            <h3 className="font-semibold mb-1">Plan Templates</h3>
            <p className="text-sm text-muted-foreground">Create reusable workouts with predictive fields.</p>
          </div>
        )}
        <div className="rounded-xl border p-4 bg-card">
          <h3 className="font-semibold mb-1">Auto-fill Inputs</h3>
          <p className="text-sm text-muted-foreground">We remember recent entries to minimize typing.</p>
        </div>
        <div className="rounded-xl border p-4 bg-card">
          <h3 className="font-semibold mb-1">Report Center</h3>
          <p className="text-sm text-muted-foreground">Export progress to CSV/PDF for offline review.</p>
        </div>
      </div>
    </div>
  );
}
