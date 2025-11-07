export type Role = "admin" | "trainer" | "client";

const ROLE_KEY = "fitsync.role";
const TOKEN_KEY = "fitsync.token";

export function getRole(): Role {
  const value = (localStorage.getItem(ROLE_KEY) as Role) || "client";
  return value;
}

export function setRole(role: Role) {
  localStorage.setItem(ROLE_KEY, role);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getJwtPayload<T = any>(): T | null {
  const token = getToken();
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const payload = JSON.parse(atob(parts[1]));
    return payload as T;
  } catch {
    return null;
  }
}
