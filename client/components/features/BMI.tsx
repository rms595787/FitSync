import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import "@/lib/chart";
import { Doughnut } from "react-chartjs-2";

function categorize(bmi: number) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obesity";
}

export default function BMI() {
  const [height, setHeight] = useState<number | "">(170);
  const [weight, setWeight] = useState<number | "">(70);
  const [bmi, setBmi] = useState<number | null>(null);

  const compute = () => {
    if (!height || !weight) return setBmi(null);
    const m = Number(height) / 100;
    const val = Number(weight) / (m * m);
    setBmi(Math.round(val * 10) / 10);
  };

  const doughnutData = useMemo(() => {
    const val = bmi ?? 22;
    // segments: underweight, normal, overweight, obesity
    const segments = [18.5, 25, 30, 40];
    const values = segments.map((s, i) => {
      if (i === 0) return Math.min(18.5, val);
      if (i === 1) return Math.max(0, Math.min(25 - 18.5, val - 18.5));
      if (i === 2) return Math.max(0, Math.min(30 - 25, val - 25));
      return Math.max(0, val - 30);
    });
    return {
      labels: ["Underweight", "Normal", "Overweight", "Obesity"],
      datasets: [
        {
          data: values.map((v) => Math.max(0.1, v)),
          backgroundColor: ["#60A5FA", "#34D399", "#FBBF24", "#F87171"],
          borderWidth: 0,
        },
      ],
    };
  }, [bmi]);

  return (
    <div className="rounded-xl border p-6 bg-card">
      <h3 className="text-lg font-semibold mb-2">BMI Calculator</h3>
      <p className="text-sm text-muted-foreground mb-4">Enter your height (cm) and weight (kg).</p>
      <div className="grid sm:grid-cols-3 gap-3">
        <label className="flex flex-col">
          <span className="text-xs text-muted-foreground">Height (cm)</span>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value === "" ? "" : Number(e.target.value))}
            className="mt-1 rounded-md border px-3 py-2"
            placeholder="170"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-xs text-muted-foreground">Weight (kg)</span>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value === "" ? "" : Number(e.target.value))}
            className="mt-1 rounded-md border px-3 py-2"
            placeholder="70"
          />
        </label>
        <div className="flex items-end">
          <Button onClick={compute} size="sm">Calculate</Button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          {bmi !== null ? (
            <>
              <div className="text-2xl font-bold">{bmi}</div>
              <div className="text-sm text-muted-foreground">{categorize(bmi)}</div>
            </>
          ) : (
            <div className="text-sm text-muted-foreground">No value yet</div>
          )}
        </div>
        <div className="max-w-xs mx-auto">
          <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" as const } }, animation: false as const }} />
        </div>
      </div>
    </div>
  );
}
