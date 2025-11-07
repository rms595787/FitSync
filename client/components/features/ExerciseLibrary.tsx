import { useState } from "react";
import type { Exercise } from "@shared/api";

const MOCK: Exercise[] = [
  { id: "sq", name: "Barbell Squat", video: "https://www.youtube.com/embed/1uDiW5--rAE", instructions: "Keep chest up, drive through heels.", muscles: ["Quads", "Glutes"] },
  { id: "dl", name: "Deadlift", video: "https://www.youtube.com/embed/ytGaGIn3SjE", instructions: "Hinge at hips, maintain neutral spine.", muscles: ["Hamstrings", "Glutes", "Back"] },
  { id: "bp", name: "Bench Press", video: "https://www.youtube.com/embed/rT7DgCr-3pg", instructions: "Full control, don't bounce the bar.", muscles: ["Chest", "Triceps"] },
];

export default function ExerciseLibrary() {
  const [items] = useState<Exercise[]>(MOCK);
  const [selected, setSelected] = useState<Exercise | null>(items[0] ?? null);

  return (
    <div className="rounded-xl border p-6 bg-card">
      <h3 className="text-lg font-semibold mb-2">Exercise Library</h3>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          {items.map((e) => (
            <button key={e.id} onClick={() => setSelected(e)} className={`w-full text-left p-3 rounded-md border ${selected?.id === e.id ? "bg-primary/5" : "bg-secondary"}`}>
              <div className="font-medium">{e.name}</div>
              <div className="text-xs text-muted-foreground">{(e.muscles || []).join(", ")}</div>
            </button>
          ))}
        </div>
        <div className="md:col-span-2">
          {selected ? (
            <div className="space-y-3">
              <div className="aspect-video bg-black/5 rounded-md overflow-hidden">
                <iframe src={selected.video} title={selected.name} className="w-full h-full" />
              </div>
              <div>
                <h4 className="font-semibold">Instructions</h4>
                <p className="text-sm text-muted-foreground">{selected.instructions}</p>
                <div className="mt-2 text-xs text-muted-foreground">Target: {(selected.muscles || []).join(", ")}</div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">Select an exercise to view details.</div>
          )}
        </div>
      </div>
    </div>
  );
}
