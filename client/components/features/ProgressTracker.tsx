import { useMemo, useState } from "react";
import type { WorkoutLogEntry } from "@shared/api";
import { Line } from "react-chartjs-2";

const MOCK: WorkoutLogEntry[] = [
  { id: "1", date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(), exerciseId: "sq", sets: 4, reps: 8, weight: 100 },
  { id: "2", date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), exerciseId: "sq", sets: 4, reps: 8, weight: 105 },
  { id: "3", date: new Date().toISOString(), exerciseId: "sq", sets: 5, reps: 5, weight: 110 },
];

export default function ProgressTracker() {
  const [logs, setLogs] = useState<WorkoutLogEntry[]>(MOCK);
  const [exercise, setExercise] = useState("sq");
  const [weight, setWeight] = useState<number | "">(100);
  const [reps, setReps] = useState<number | "">(8);
  const [sets, setSets] = useState<number | "">(4);

  const chartData = useMemo(() => ({
    labels: logs.map((l) => new Date(l.date).toLocaleDateString()),
    datasets: [
      { label: "Weight", data: logs.map((l) => l.weight || 0), borderColor: "hsl(var(--primary))", backgroundColor: "hsl(var(--primary)/.2)", tension: 0.3 },
    ],
  }), [logs]);

  function addLog() {
    if (!weight || !reps || !sets) return;
    const entry: WorkoutLogEntry = { id: String(Date.now()), date: new Date().toISOString(), exerciseId: exercise, sets: Number(sets), reps: Number(reps), weight: Number(weight) };
    setLogs((s) => [...s, entry]);
  }

  return (
    <div className="rounded-xl border p-6 bg-card">
      <h3 className="text-lg font-semibold">Progress Tracker</h3>
      <p className="text-sm text-muted-foreground">Log your workouts and see progress.</p>

      <div className="mt-4 grid md:grid-cols-3 gap-3">
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">Exercise</label>
          <input value={exercise} onChange={(e)=>setExercise(e.target.value)} className="mt-1 rounded-md border px-3 py-2 w-full" />
          <label className="text-xs text-muted-foreground mt-2">Weight (kg)</label>
          <input type="number" value={weight} onChange={(e)=>setWeight(e.target.value === "" ? "" : Number(e.target.value))} className="mt-1 rounded-md border px-3 py-2 w-full" />
          <div className="flex gap-2 mt-2">
            <input type="number" value={reps} onChange={(e)=>setReps(e.target.value === "" ? "" : Number(e.target.value))} className="rounded-md border px-3 py-2 w-1/2" />
            <input type="number" value={sets} onChange={(e)=>setSets(e.target.value === "" ? "" : Number(e.target.value))} className="rounded-md border px-3 py-2 w-1/2" />
          </div>
          <button onClick={addLog} className="mt-3 px-3 py-2 rounded-md bg-primary text-primary-foreground">Add Log</button>
        </div>

        <div className="md:col-span-2">
          <div className="h-48 md:h-64">
            <Line data={chartData as any} options={{ responsive: true, maintainAspectRatio: false, animation: false as const }} />
          </div>
          <div className="mt-3 grid grid-cols-1 gap-2">
            {logs.map((l) => (
              <div key={l.id} className="flex items-center justify-between bg-secondary p-2 rounded-md">
                <div>
                  <div className="font-medium">{l.exerciseId}</div>
                  <div className="text-xs text-muted-foreground">{new Date(l.date).toLocaleString()}</div>
                </div>
                <div className="text-sm">{l.sets}x{l.reps} @ {l.weight}kg</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
