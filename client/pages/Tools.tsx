import { useMemo, useState, useEffect } from "react";
import { getFeatures, setFeature, type FeatureKey } from "@/lib/features";
import BMI from "@/components/features/BMI";
import BMR_TDEE from "@/components/features/BMR_TDEE";
import ExercisePlanner from "@/components/features/ExercisePlanner";
import ExerciseLibrary from "@/components/features/ExerciseLibrary";
import ProgressTracker from "@/components/features/ProgressTracker";
import MealPlanner from "@/components/features/MealPlanner";
import CalorieTracker from "@/components/features/CalorieTracker";
import Challenges from "@/components/features/Challenges";
import { useSearchParams, useNavigate } from "react-router-dom";

function FeatureToggle({ k, enabled, onToggle }: { k: FeatureKey; enabled: boolean; onToggle: (k: FeatureKey, v: boolean)=>void }) {
  return (
    <label className="flex items-center gap-2">
      <input type="checkbox" checked={enabled} onChange={(e)=>onToggle(k, e.target.checked)} />
      <span className="text-sm capitalize">{k.replace(/_/g, " ")}</span>
    </label>
  );
}

export default function Tools() {
  const initial = getFeatures();
  const [features, setFeaturesState] = useState(initial);
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const selected = search.get("tool") as FeatureKey | null;

  useEffect(() => {
    // If selected tool is disabled, clear selection
    if (selected && !features[selected]) {
      navigate("/tools", { replace: true });
    }
  }, [selected, features, navigate]);

  const onToggle = (k: FeatureKey, v: boolean) => {
    setFeature(k, v);
    setFeaturesState((s)=> ({ ...s, [k]: v }));
  };

  const enabledList = useMemo(() => Object.keys(features).filter((k)=>features[k as FeatureKey]), [features]);

  function renderTool(k: FeatureKey | null) {
    switch (k) {
      case "bmi": return <BMI />;
      case "bmr_tdee": return <BMR_TDEE />;
      case "exercise_planner": return <ExercisePlanner />;
      case "exercise_library": return <ExerciseLibrary />;
      case "progress_tracker": return <ProgressTracker />;
      case "meal_planner": return <MealPlanner />;
      case "calorie_tracker": return <CalorieTracker />;
      case "challenges": return <Challenges />;
      default: return null;
    }
  }

  if (selected) {
    // Full-page tool view
    return (
      <div className="min-h-[70vh] container mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{selected.replace(/_/g, " ")}</h1>
            <p className="text-sm text-muted-foreground">Tool view — full page mode. Use the back button to exit.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={()=>navigate('/tools')} className="px-3 py-2 rounded-md border">Back</button>
            <button onClick={()=>{ setFeaturesState(getFeatures()); navigate('/tools'); }} className="px-3 py-2 rounded-md">Reset</button>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow">
          {renderTool(selected)}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">FitSync Tools</h1>
          <p className="text-sm text-muted-foreground">Enable or disable modules to control what features are active. Click a tool in the navbar to open full page view.</p>
        </div>
        <div className="flex gap-3">
          {Object.keys(features).map((k) => (
            <FeatureToggle key={k} k={k as FeatureKey} enabled={features[k as FeatureKey]} onToggle={onToggle} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {features.bmi && <BMI />}
        {features.bmr_tdee && <BMR_TDEE />}
        {features.exercise_library && <ExerciseLibrary />}
        {features.exercise_planner && <ExercisePlanner />}
        {features.progress_tracker && <ProgressTracker />}
        {features.meal_planner && <MealPlanner />}
        {features.calorie_tracker && <CalorieTracker />}
        {features.challenges && <Challenges />}
      </div>

      <div className="mt-8 text-sm text-muted-foreground">Active modules: {enabledList.join(", ")}</div>
    </div>
  );
}
