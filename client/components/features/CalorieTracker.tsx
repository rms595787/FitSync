import { useState } from "react";
import type { MealItem } from "@shared/api";

const MOCK: MealItem[] = [
  { id: "a", name: "Oatmeal", calories: 350 },
  { id: "b", name: "Chicken Salad", calories: 450 },
  { id: "c", name: "Protein Shake", calories: 220 },
];

export default function CalorieTracker() {
  const [items] = useState<MealItem[]>(MOCK);
  const [log, setLog] = useState<{ id: string; meal: MealItem; qty: number; date: string }[]>([]);
  const [selected, setSelected] = useState<string>(items[0].id);
  const [qty, setQty] = useState<number | "">(1);

  function add() {
    const meal = items.find((m) => m.id === selected);
    if (!meal || !qty) return;
    setLog((l) => [...l, { id: String(Date.now()), meal, qty: Number(qty), date: new Date().toISOString() }]);
  }

  const total = log.reduce((s, l) => s + l.meal.calories * l.qty, 0);

  return (
    <div className="rounded-xl border p-6 bg-card">
      <h3 className="text-lg font-semibold">Calorie Tracker</h3>
      <p className="text-sm text-muted-foreground">Log meals to track calories and macros.</p>

      <div className="mt-3 flex gap-2">
        <select value={selected} onChange={(e)=>setSelected(e.target.value)} className="rounded-md border px-3 py-2">
          {items.map(i=> <option key={i.id} value={i.id}>{i.name} — {i.calories} kcal</option>)}
        </select>
        <input type="number" value={qty} onChange={(e)=>setQty(e.target.value === "" ? "" : Number(e.target.value))} className="w-20 rounded-md border px-2 py-2" />
        <button onClick={add} className="px-3 py-2 rounded-md bg-primary text-primary-foreground">Add</button>
      </div>

      <div className="mt-4">
        <div className="text-sm text-muted-foreground">Today: <strong>{total} kcal</strong></div>
        <div className="mt-2 space-y-2">
          {log.map(l => (
            <div key={l.id} className="flex items-center justify-between bg-secondary p-2 rounded-md">
              <div>
                <div className="font-medium">{l.meal.name} x{l.qty}</div>
                <div className="text-xs text-muted-foreground">{new Date(l.date).toLocaleTimeString()}</div>
              </div>
              <div className="text-sm">{l.meal.calories * l.qty} kcal</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
