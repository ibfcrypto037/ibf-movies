import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase-admin';

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token) return false;
  const stored = process.env.ADMIN_PASSWORD || 'ibfmovies2024';
  return token === stored;
}

export async function GET() {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { data, error } = await supabaseAdmin.from('movies').select('*').order('created_at', { ascending: false });
  return NextResponse.json({ data, error });
}

export async function POST(request: Request) {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const formData = await request.json();
  const { data, error } = await supabaseAdmin.from('movies').insert({
    title: formData.title,
    poster: formData.poster,
    year: formData.year,
    language: formData.language,
    genre: formData.genre,
    description: formData.description,
    download_links: formData.links,
    is_active: formData.is_active,
  }).select().single();
  return NextResponse.json({ data, error });
}

export async function PUT(request: Request) {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id, ...formData } = await request.json();
  const { data, error } = await supabaseAdmin.from('movies').update({
    title: formData.title,
    poster: formData.poster,
    year: formData.year,
    language: formData.language,
    genre: formData.genre,
    description: formData.description,
    download_links: formData.links,
    is_active: formData.is_active,
  }).eq('id', id).select().single();
  return NextResponse.json({ data, error });
}

export async function PATCH(request: Request) {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id, action } = await request.json();
  
  if (action === 'toggle') {
    const { data: movie } = await supabaseAdmin.from('movies').select('is_active').eq('id', id).single();
    if (movie) {
      const { error } = await supabaseAdmin.from('movies').update({ is_active: !movie.is_active }).eq('id', id);
      return NextResponse.json({ success: !error, error });
    }
    return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}

export async function DELETE(request: Request) {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await request.json();
  const { error } = await supabaseAdmin.from('movies').delete().eq('id', id);
  return NextResponse.json({ success: !error, error });
}
