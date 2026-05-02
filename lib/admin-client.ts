// ADMIN CLIENT — calls Next.js API routes via fetch.
// Safe to use from any 'use client' admin component.
// Never imports supabaseAdmin or lib/api-server.

import type { Movie, MovieFormData, Language, Settings } from '@/types';

const base = '/api/admin';

async function apiFetch<T>(url: string, options?: RequestInit): Promise<{ data: T | null; error: string | null }> {
  try {
    const res = await fetch(url, { ...options, headers: { 'Content-Type': 'application/json', ...(options?.headers ?? {}) } });
    const json = await res.json();
    if (!res.ok) return { data: null, error: json.error ?? 'Request failed' };
    return { data: json.data as T, error: null };
  } catch (e: any) {
    return { data: null, error: 'Network error — check your connection' };
  }
}

// ─── Movies ────────────────────────────────────────────────────────────────

export async function adminGetMovies() {
  return apiFetch<Movie[]>(`${base}/movies`);
}

export async function adminAddMovie(data: MovieFormData) {
  return apiFetch<Movie>(`${base}/movies`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function adminUpdateMovie(id: string, data: MovieFormData) {
  return apiFetch<Movie>(`${base}/movies`, {
    method: 'PUT',
    body: JSON.stringify({ id, ...data }),
  });
}

export async function adminToggleMovie(id: string) {
  return apiFetch<{ success: boolean }>(`${base}/movies`, {
    method: 'PATCH',
    body: JSON.stringify({ id, action: 'toggle' }),
  });
}

export async function adminPermanentDeleteMovie(id: string) {
  return apiFetch<{ success: boolean }>(`${base}/movies`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
  });
}

// ─── Requests ──────────────────────────────────────────────────────────────

export interface GroupedRequest {
  movie_name: string;
  language: string;
  count: number;
}

export async function adminGetRequests() {
  return apiFetch<GroupedRequest[]>(`${base}/requests`);
}

export async function adminFulfillRequest(movie_name: string, language: string) {
  return apiFetch<{ success: boolean }>(`${base}/requests`, {
    method: 'DELETE',
    body: JSON.stringify({ movie_name, language }),
  });
}

// ─── Languages ─────────────────────────────────────────────────────────────

export async function adminAddLanguage(name: string) {
  return apiFetch<Language>(`${base}/languages`, {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
}

export async function adminDeleteLanguage(id: string) {
  return apiFetch<{ success: boolean }>(`${base}/languages`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
  });
}

// ─── Settings ──────────────────────────────────────────────────────────────

export async function adminGetStats() {
  return apiFetch<{ totalMovies: number, pendingRequests: number, totalLanguages: number, todayUploads: number }>(`${base}/stats`);
}

export async function adminBulkDeleteMovies(ids: string[]) {
  return apiFetch<{ deleted: number }>(`${base}/movies/bulk`, {
    method: 'DELETE',
    body: JSON.stringify({ ids }),
  });
}
