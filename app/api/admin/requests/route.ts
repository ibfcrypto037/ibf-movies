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

  try {
    const { data, error } = await supabaseAdmin
      .from('movie_requests')
      .select('movie_name, language, status')
      .eq('status', 'pending');

    if (error) throw error;

    const grouped: Record<string, { movie_name: string; language: string; count: number }> = {};
    for (const row of data ?? []) {
      const key = `${row.movie_name}__${row.language}`;
      if (!grouped[key]) {
        grouped[key] = { movie_name: row.movie_name, language: row.language, count: 0 };
      }
      grouped[key].count++;
    }

    const result = Object.values(grouped).sort((a, b) => b.count - a.count);
    return NextResponse.json({ data: result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { movie_name, language } = await request.json();
    const { error } = await supabaseAdmin
      .from('movie_requests')
      .delete()
      .eq('movie_name', movie_name)
      .eq('language', language);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
