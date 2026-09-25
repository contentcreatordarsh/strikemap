const TOKEN_KEY = "sm_bearer_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: { code: string; message: string; requestId?: string } };

function apiBase(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? "";
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  const base = apiBase();
  const url = path.startsWith("http") ? path : `${base}${path}`;
  const res = await fetch(url, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  });
  const data = (await res.json().catch(() => ({}))) as ApiResult<T>;
  if (!res.ok || !data.ok) {
    const err = !data.ok ? data.error : { message: res.statusText };
    throw new Error(err?.message ?? "request_failed");
  }
  return data.data;
}

export async function login(email: string, password: string) {
  const data = await api<{ token: string }>("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setToken(data.token);
  return data;
}

export async function signup(email: string, username: string, password: string) {
  const data = await api<{ token: string }>("/api/v1/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, username, password }),
  });
  setToken(data.token);
  return data;
}
