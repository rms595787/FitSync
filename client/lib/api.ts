import { getToken } from "./auth";

const DEFAULT_BASE = (import.meta as any).env?.VITE_API_URL || "";

function baseUrl(): string {
  const fromEnv = typeof DEFAULT_BASE === "string" ? DEFAULT_BASE : "";
  return fromEnv || window.location.origin;
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${baseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
  const token = getToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(init?.headers || {}),
  };

  const res = await fetch(url, { ...init, headers, credentials: "include" });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return (await res.json()) as T;
  }
  // Fallback for non-JSON responses: caller may cast appropriately
  return (await res.text()) as unknown as T;
}
