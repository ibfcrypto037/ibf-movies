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
  const { data, error } = await supabaseAdmin.from('languages').select('*').order('name', { ascending: true });
  return NextResponse.json({ data, error });
}

export async function POST(request: Request) {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { name } = await request.json();
  const { data, error } = await supabaseAdmin.from('languages').insert({ name }).select().single();
  return NextResponse.json({ data, error });
}

export async function DELETE(request: Request) {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await request.json();
  const { error } = await supabaseAdmin.from('languages').delete().eq('id', id);
  return NextResponse.json({ success: !error, error });
}
