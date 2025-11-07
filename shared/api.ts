/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

export type Role = "admin" | "trainer" | "client";

export interface ProgressPoint {
  week: string;
  weight: number; // kg
  volume: number; // kg lifted
  calories: number; // daily avg
}

export interface Exercise {
  id: string;
  name: string;
  video?: string; // url
  instructions?: string;
  muscles?: string[];
}

export interface WorkoutLogEntry {
  id: string;
  date: string; // ISO
  exerciseId: string;
  sets: number;
  reps: number;
  weight?: number;
  notes?: string;
}

export interface MealItem {
  id: string;
  name: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

export interface MealPlan {
  id: string;
  name: string;
  items: { day: string; meals: MealItem[] }[];
}
