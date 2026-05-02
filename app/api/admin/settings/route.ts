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
  const { data, error } = await supabaseAdmin
    .from('settings')
    .select()
    .eq('id', '00000000-0000-0000-0000-000000000001')
    .single();
  return NextResponse.json({ data, error });
}

export async function POST(request: Request) {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const settings = await request.json();
  const { data, error } = await supabaseAdmin
    .from('settings')
    .update(settings)
    .eq('id', '00000000-0000-0000-0000-000000000001')
    .select()
    .single();
  return NextResponse.json({ data, error });
}
