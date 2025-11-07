import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getRole, setRole, type Role } from "@/lib/auth";
import Logo from "@/components/logo/Logo";
import { useEffect, useState, useRef } from "react";
import { getFeatures, type FeatureKey } from "@/lib/features";

export default function Header() {
  const location = useLocation();
  const [role, updateRole] = useState<Role>(getRole());
  const navigate = useNavigate();
  const features = getFeatures();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // keep role in sync across tabs
    const onStorage = (e: StorageEvent) => {
      if (e.key === "fitsync.role" && e.newValue) {
        updateRole(e.newValue as Role);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "px-3 py-2 rounded-md text-sm font-medium transition-colors",
      isActive ? "text-primary" : "text-foreground/70 hover:text-foreground",
    ].join(" ");

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const toolsList: { key: FeatureKey; label: string }[] = [
    { key: "bmi", label: "BMI Calculator" },
    { key: "bmr_tdee", label: "BMR & TDEE" },
    { key: "exercise_planner", label: "Exercise Planner" },
    { key: "exercise_library", label: "Exercise Library" },
    { key: "progress_tracker", label: "Progress Tracker" },
    { key: "meal_planner", label: "Meal Planner" },
    { key: "calorie_tracker", label: "Calorie Tracker" },
    { key: "challenges", label: "Challenges" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" aria-label="FitSync Home" className="flex items-center gap-2">
            <Logo className="h-6 w-6" />
            <span className="font-bold tracking-tight">FitSync</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>

            {/* Tools dropdown */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-foreground/70 hover:text-foreground flex items-center gap-2"
              >
                Tools
                <svg className="h-3 w-3" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-56 bg-card rounded-md shadow-lg border p-2">
                  {toolsList.map((t) => (
                    <button
                      key={t.key}
                      disabled={!features[t.key]}
                      onClick={() => {
                        setOpen(false);
                        navigate(`/tools?tool=${t.key}`);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm ${!features[t.key] ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/5"}`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <select
            aria-label="Select role"
            value={role}
            onChange={(e) => {
              const r = e.target.value as Role;
              setRole(r);
              updateRole(r);
            }}
            className="px-3 py-2 rounded-md bg-secondary text-sm border border-input hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <option value="client">Client</option>
            <option value="trainer">Trainer</option>
            <option value="admin">Admin</option>
          </select>
          <Button asChild size="sm">
            <Link to={location.pathname === "/dashboard" ? "/" : "/dashboard"}>
              {location.pathname === "/dashboard" ? "Back to Home" : "Open Dashboard"}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
