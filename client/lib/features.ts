export type FeatureKey =
  | "bmi"
  | "bmr_tdee"
  | "exercise_planner"
  | "exercise_library"
  | "progress_tracker"
  | "meal_planner"
  | "calorie_tracker"
  | "challenges";

const STORAGE_KEY = "fitsync.features";

const DEFAULTS: Record<FeatureKey, boolean> = {
  bmi: true,
  bmr_tdee: true,
  exercise_planner: true,
  exercise_library: true,
  progress_tracker: true,
  meal_planner: true,
  calorie_tracker: true,
  challenges: true,
};

export function getFeatures(): Record<FeatureKey, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<Record<FeatureKey, boolean>>;
    return { ...DEFAULTS, ...parsed };
  } catch {
    return DEFAULTS;
  }
}

export function setFeature(key: FeatureKey, value: boolean) {
  const current = getFeatures();
  current[key] = value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
}

export function resetFeatures() {
  localStorage.removeItem(STORAGE_KEY);
}
