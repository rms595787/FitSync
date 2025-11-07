import { useState } from "react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function ExercisePlanner() {
  const [planName, setPlanName] = useState("My Weekly Plan");
  const [schedule, setSchedule] = useState<Record<string, string[]>>(() => {
    const base: Record<string, string[]> = {};
    days.forEach((d) => (base[d] = []));
    return base;
  });
  const [newExercise, setNewExercise] = useState("");

  function addExercise(day: string) {
    if (!newExercise) return;
    setSchedule((s) => ({ ...s, [day]: [...s[day], newExercise] }));
    setNewExercise("");
  }

  function removeExercise(day: string, idx: number) {
    setSchedule((s) => ({ ...s, [day]: s[day].filter((_, i) => i !== idx) }));
  }

  return (
    <div className="rounded-xl border p-6 bg-card">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Exercise Planner</h3>
        <input value={planName} onChange={(e)=>setPlanName(e.target.value)} className="rounded-md border px-3 py-1 text-sm" />
      </div>
      <p className="text-sm text-muted-foreground mt-2">Create a weekly schedule. Click a day to add exercises.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
        {days.map((d) => (
          <div key={d} className="rounded-lg border p-3 bg-secondary">
            <div className="flex items-center justify-between">
              <div className="font-medium">{d}</div>
              <div className="text-xs text-muted-foreground">{schedule[d].length} items</div>
            </div>
            <div className="mt-2 space-y-2">
              {schedule[d].map((ex, i) => (
                <div key={i} className="flex items-center justify-between bg-card p-2 rounded-md">
                  <div className="text-sm">{ex}</div>
                  <button onClick={()=>removeExercise(d,i)} className="text-xs text-destructive">Remove</button>
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <input value={newExercise} onChange={(e)=>setNewExercise(e.target.value)} placeholder="Exercise name" className="flex-1 rounded-md border px-2 py-1 text-sm" />
              <button onClick={()=>addExercise(d)} className="px-3 py-1 rounded-md bg-primary text-primary-foreground text-sm">Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
