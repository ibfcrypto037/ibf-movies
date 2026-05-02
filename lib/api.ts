import { supabase } from './supabase';
import type { Movie, MovieFormData, Language, Settings } from '../types';

// ─── PUBLIC FUNCTIONS ───────────────────────────────────────────────────────

export async function getMovies(
  language?: string,
  search?: string,
  page = 0,
  pageSize = 18
) {
  let query = supabase
    .from('movies')
    .select('*', { count: 'exact' })
    .eq('is_active', true)
    .order('uploaded_at', { ascending: false })
    .range(page * pageSize, (page + 1) * pageSize - 1);

  if (language && language !== 'All') query = query.eq('language', language);
  if (search) query = query.ilike('title', `%${search}%`);

  const { data, error, count } = await query;
  return { data: (data as Movie[]) ?? [], count: count ?? 0, error };
}

export async function getTodayMovies() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .eq('is_active', true)
    .gte('uploaded_at', start.toISOString())
    .lte('uploaded_at', end.toISOString())
    .order('uploaded_at', { ascending: false })
    .limit(8);

  return { data: (data as Movie[]) ?? [], error };
}

export async function getMovieById(id: string) {
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single();
  return { data: data as Movie | null, error };
}

export async function getRelatedMovies(id: string, language: string, genre: string) {
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .eq('is_active', true)
    .neq('id', id)
    .or(`language.eq.${language},genre.eq.${genre}`)
    .order('uploaded_at', { ascending: false })
    .limit(6);

  return { data: (data as Movie[]) ?? [], error };
}

export async function getLanguages() {
  const { data, error } = await supabase
    .from('languages')
    .select('*')
    .order('name', { ascending: true });
  return { data: (data as Language[]) ?? [], error };
}



export async function checkMovieExists(movieName: string, language: string) {
  const { data, error } = await supabase
    .from('movies')
    .select('id')
    .ilike('title', `%${movieName}%`)
    .eq('language', language)
    .eq('is_active', true)
    .limit(1);
  return { exists: (data?.length ?? 0) > 0, error };
}

export async function submitRequest(movieName: string, language: string, userId?: string) {
  // Check for duplicate pending request
  const { data: existing } = await supabase
    .from('movie_requests')
    .select('id')
    .eq('movie_name', movieName)
    .eq('language', language)
    .eq('status', 'pending')
    .limit(1);

  if (existing && existing.length > 0) {
    return { data: null, error: new Error('Already requested') };
  }

  const { error } = await supabase
    .from('movie_requests')
    .insert({ movie_name: movieName, language, user_id: userId ?? null });

  return { data: { success: !error }, error };
}

// ─── ADMIN FUNCTIONS (Placeholder - Move to Edge Functions) ──────────────────

export async function getAllMoviesAdmin() {
  return { data: [], error: new Error('Use Edge Function') };
}

export async function addMovie(formData: MovieFormData) {
  return { data: null, error: new Error('Use Edge Function') };
}

export async function updateMovie(id: string, formData: MovieFormData) {
  return { data: null, error: new Error('Use Edge Function') };
}

export async function softDeleteMovie(id: string) {
  return { data: { success: false }, error: new Error('Use Edge Function') };
}

export async function restoreMovie(id: string) {
  return { data: { success: false }, error: new Error('Use Edge Function') };
}

export async function getRequestsAdmin() {
  return { data: [], error: new Error('Use Edge Function') };
}

export async function fulfillRequest(movieName: string, language: string) {
  return { data: { success: false }, error: new Error('Use Edge Function') };
}

export async function addLanguage(name: string) {
  return { data: null, error: new Error('Use Edge Function') };
}

export async function deleteLanguage(id: string) {
  return { data: { success: false }, error: new Error('Use Edge Function') };
}



export async function getAdminPassword(): Promise<string> {
  return 'ibfmovies2024';
}

// ─── EDGE FUNCTION HELPERS ──────────────────────────────────────────────────
// These call Supabase Edge Functions instead of Next.js API routes
// for operations that need secrets not available in the browser.

export async function checkMembership(userId: string): Promise<boolean> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl) return true; // fail open

    const res = await fetch(`${supabaseUrl}/functions/v1/check-membership`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });

    if (!res.ok) return true; // fail open
    const data = await res.json();
    return data.isMember ?? true;
  } catch {
    return true; // never block users on error
  }
}

export async function adminLoginEdge(password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();
    if (!res.ok) return { success: false, error: data.error ?? 'Invalid password' };
    return { success: true };
  } catch {
    return { success: false, error: 'Network error' };
  }
}
