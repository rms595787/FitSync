import { useState } from "react";
import type { MealItem, MealPlan } from "@shared/api";

const MOCK_MEALS: MealItem[] = [
  { id: "m1", name: "Oatmeal", calories: 350, protein: 12, carbs: 55, fat: 8 },
  { id: "m2", name: "Chicken Salad", calories: 450, protein: 35, carbs: 20, fat: 18 },
  { id: "m3", name: "Salmon & Rice", calories: 600, protein: 40, carbs: 60, fat: 20 },
];

export default function MealPlanner() {
  const [meals] = useState<MealItem[]>(MOCK_MEALS);
  const [plans, setPlans] = useState<MealPlan[]>([]);
  const [name, setName] = useState("Weekly Balanced");

  function createPlan() {
    const plan: MealPlan = { id: String(Date.now()), name, items: [
      { day: "Mon", meals: [meals[0]] },
      { day: "Tue", meals: [meals[1]] },
      { day: "Wed", meals: [meals[2]] },
    ] };
    setPlans((p) => [plan, ...p]);
  }

  return (
    <div className="rounded-xl border p-6 bg-card">
      <h3 className="text-lg font-semibold">Meal Planner</h3>
      <p className="text-sm text-muted-foreground">Create weekly meal plans aligned with goals.</p>

      <div className="mt-3 flex gap-2">
        <input value={name} onChange={(e)=>setName(e.target.value)} className="rounded-md border px-3 py-2" />
        <button onClick={createPlan} className="px-3 py-2 rounded-md bg-primary text-primary-foreground">Create Plan</button>
      </div>

      <div className="mt-4 space-y-3">
        {plans.length === 0 && <div className="text-sm text-muted-foreground">No plans yet. Create one to see it here.</div>}
        {plans.map((p) => (
          <div key={p.id} className="rounded-md border p-3 bg-secondary">
            <div className="flex items-center justify-between">
              <div className="font-medium">{p.name}</div>
              <div className="text-xs text-muted-foreground">{p.items.length} days</div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              {p.items.map((d) => (
                <div key={d.day}><strong>{d.day}:</strong> {d.meals.map(m=>m.name).join(", ")}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
