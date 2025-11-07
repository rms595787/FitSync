import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo/Logo";
import "@/lib/chart";
import { Line } from "react-chartjs-2";

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm hover:shadow transition-shadow">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}

function ToolCard({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <div className="rounded-xl border p-6 bg-card shadow-sm flex flex-col justify-between">
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-muted-foreground mt-2">{desc}</p>
      </div>
      <div className="mt-4">
        <Button asChild size="sm">
          <Link to={href}>Open</Link>
        </Button>
      </div>
    </div>
  );
}

export default function Index() {
  const sampleWeeks = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];
  const sampleData = {
    labels: sampleWeeks,
    datasets: [
      {
        label: "Weight",
        data: [82, 81.5, 81, 80.5, 80, 79.5, 79, 78.8],
        borderColor: "rgba(56,189,248,1)",
        backgroundColor: "rgba(56,189,248,0.15)",
        tension: 0.3,
        pointRadius: 3,
      },
      {
        label: "Calories",
        data: [2300, 2250, 2200, 2100, 2000, 2050, 1950, 1900],
        borderColor: "rgba(34,197,94,1)",
        backgroundColor: "rgba(34,197,94,0.12)",
        tension: 0.3,
        pointRadius: 3,
        yAxisID: "y1",
      },
    ],
  };

  const sampleOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" as const },
      tooltip: { mode: "index" as const, intersect: false },
      title: { display: true, text: "Recent Trends" },
    },
    interaction: { mode: "index" as const, intersect: false },
    scales: {
      y: { grid: { color: "rgba(0,0,0,0.05)" } },
      y1: { position: "right" as const, grid: { drawOnChartArea: false } },
    },
  };

  return (
    <div className="bg-[radial-gradient(50%_50%_at_50%_0%,hsl(var(--primary)/0.12)_0%,transparent_60%)] min-h-screen">
      {/* Hero */}
      <section className="container mx-auto py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary ring-1 ring-primary/20">
              <span className="inline-block h-2 w-2 rounded-full bg-primary" /> Built for teams and individuals
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
              FitSync — Personalized fitness, simplified
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-prose">
              Smart templates, guided inputs, and beautiful dashboards help you do more with less. Get started with a demo plan and track progress effortlessly.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg">
                <Link to="/dashboard">Open Interactive Dashboard</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#tools">Explore Tools</a>
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-md">
              <div className="rounded-xl p-4 bg-card border">
                <div className="text-sm text-muted-foreground">Daily Tip</div>
                <div className="font-semibold mt-1">Drink water before workouts</div>
              </div>
              <div className="rounded-xl p-4 bg-card border">
                <div className="text-sm text-muted-foreground">Quick Action</div>
                <div className="font-semibold mt-1">Start 15-min HIIT</div>
              </div>
              <div className="rounded-xl p-4 bg-card border">
                <div className="text-sm text-muted-foreground">Motivation</div>
                <div className="font-semibold mt-1">You’re 3 days from a new streak</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-primary/20 to-accent/20 blur-2xl" />
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Logo className="h-8 w-8" />
                <div className="font-semibold">Snapshot</div>
              </div>
              <div className="h-56">
                <Line data={sampleData} options={sampleOptions as any} />
              </div>
              <div className="mt-4 text-xs text-muted-foreground">Overview of recent trends — weight and calories over time.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools selection */}
      <section id="tools" className="container mx-auto py-12 md:py-20">
        <h2 className="text-2xl font-bold mb-4">Tools</h2>
        <p className="text-sm text-muted-foreground mb-6">Choose a tool to get started. Open any tool in full-page mode from the navbar too.</p>
        <div className="grid md:grid-cols-3 gap-4">
          <ToolCard title="BMI Calculator" desc="Quick BMI check and category." href="/tools?tool=bmi" />
          <ToolCard title="BMR & TDEE" desc="Estimate daily calories based on stats." href="/tools?tool=bmr_tdee" />
          <ToolCard title="Exercise Planner" desc="Build weekly schedules and templates." href="/tools?tool=exercise_planner" />
          <ToolCard title="Exercise Library" desc="Video demos and instructions." href="/tools?tool=exercise_library" />
          <ToolCard title="Progress Tracker" desc="Log workouts and view trends." href="/tools?tool=progress_tracker" />
          <ToolCard title="Calorie Tracker" desc="Log meals and track calories." href="/tools?tool=calorie_tracker" />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background/80">
        <div className="container mx-auto py-12 grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-bold">FitSync</h4>
            <p className="text-sm text-muted-foreground mt-2">Personalized fitness management for teams and individuals.</p>
          </div>
          <div>
            <h5 className="font-semibold">Quick Links</h5>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/tools">Tools</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold">Contact</h5>
            <p className="text-sm text-muted-foreground mt-2">hello@fitsync.app</p>
            <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
