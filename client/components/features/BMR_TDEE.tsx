import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import "@/lib/chart";
import { Bar } from "react-chartjs-2";

function bmr({ gender, weight, height, age }: { gender: "male" | "female"; weight: number; height: number; age: number; }) {
  // Mifflin-St Jeor Equation
  if (gender === "male") return 10 * weight + 6.25 * height - 5 * age + 5;
  return 10 * weight + 6.25 * height - 5 * age - 161;
}

const activityMultiplier: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

export default function BMR_TDEE() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState<number | "">(30);
  const [weight, setWeight] = useState<number | "">(70);
  const [height, setHeight] = useState<number | "">(175);
  const [activity, setActivity] = useState<keyof typeof activityMultiplier>("moderate");
  const [result, setResult] = useState<{ bmr: number; tdee: number } | null>(null);

  const compute = () => {
    if (!age || !weight || !height) return setResult(null);
    const b = Math.round(bmr({ gender, weight: Number(weight), height: Number(height), age: Number(age) }));
    const t = Math.round(b * activityMultiplier[activity]);
    setResult({ bmr: b, tdee: t });
  };

  const chartData = useMemo(() => {
    const b = result?.bmr ?? 1600;
    const t = result?.tdee ?? Math.round(b * activityMultiplier[activity]);
    return {
      labels: ["BMR", "TDEE"],
      datasets: [
        { label: "Calories", data: [b, t], backgroundColor: ["hsl(var(--primary))", "hsl(var(--accent))"] },
      ],
    };
  }, [result, activity]);

  return (
    <div className="rounded-xl border p-6 bg-card">
      <h3 className="text-lg font-semibold mb-2">BMR & TDEE Calculator</h3>
      <div className="grid sm:grid-cols-3 gap-3">
        <div>
          <label className="text-xs text-muted-foreground">Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value as any)} className="mt-1 rounded-md border px-3 py-2 w-full">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Age</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))} className="mt-1 rounded-md border px-3 py-2 w-full" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Activity</label>
          <select value={activity} onChange={(e) => setActivity(e.target.value as any)} className="mt-1 rounded-md border px-3 py-2 w-full">
            <option value="sedentary">Sedentary</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="active">Active</option>
            <option value="very_active">Very Active</option>
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mt-3">
        <div>
          <label className="text-xs text-muted-foreground">Weight (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value === "" ? "" : Number(e.target.value))} className="mt-1 rounded-md border px-3 py-2 w-full" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Height (cm)</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value === "" ? "" : Number(e.target.value))} className="mt-1 rounded-md border px-3 py-2 w-full" />
        </div>
        <div className="flex items-end">
          <Button onClick={compute} size="sm">Calculate</Button>
        </div>
      </div>

      {result && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <div className="text-sm">BMR: <span className="font-semibold">{result.bmr} kcal/day</span></div>
            <div className="text-sm">TDEE: <span className="font-semibold">{result.tdee} kcal/day</span></div>
          </div>
          <div className="max-w-md">
            <Bar data={chartData as any} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, title: { display: true, text: "Calories comparison" } }, animation: false as const }} />
          </div>
        </div>
      )}
    </div>
  );
}
