import { useState } from "react";

type Challenge = { id: string; title: string; days: number; progress: number };

const MOCK: Challenge[] = [
  { id: "c1", title: "30-day push-up challenge", days: 30, progress: 12 },
  { id: "c2", title: "14-day plank streak", days: 14, progress: 3 },
];

export default function Challenges() {
  const [challenges, setChallenges] = useState<Challenge[]>(MOCK);

  function toggleProgress(id: string) {
    setChallenges((s) => s.map(c => c.id === id ? { ...c, progress: Math.min(c.days, c.progress + 1) } : c));
  }

  return (
    <div className="rounded-xl border p-6 bg-card">
      <h3 className="text-lg font-semibold">Challenges & Goals</h3>
      <p className="text-sm text-muted-foreground">Join challenges to stay motivated. Track achievements here.</p>

      <div className="mt-4 space-y-3">
        {challenges.map(ch => (
          <div key={ch.id} className="rounded-md border p-3 bg-secondary flex items-center justify-between">
            <div>
              <div className="font-medium">{ch.title}</div>
              <div className="text-xs text-muted-foreground">{ch.progress}/{ch.days} days</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={()=>toggleProgress(ch.id)} className="px-3 py-1 rounded-md bg-primary text-primary-foreground text-sm">Mark Day</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
