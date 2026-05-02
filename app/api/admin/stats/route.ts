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
    // 1. Total Movies (is_active = true)
    const { count: totalMovies } = await supabaseAdmin
      .from('movies')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);

    // 2. Pending Requests
    const { count: pendingRequests } = await supabaseAdmin
      .from('movie_requests')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    // 3. Total Languages
    const { count: totalLanguages } = await supabaseAdmin
      .from('languages')
      .select('*', { count: 'exact', head: true });

    // 4. Today Uploads
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayISO = today.toISOString();
    
    const { count: todayUploads } = await supabaseAdmin
      .from('movies')
      .select('*', { count: 'exact', head: true })
      .gte('uploaded_at', todayISO);

    return NextResponse.json({
      data: {
        totalMovies: totalMovies || 0,
        pendingRequests: pendingRequests || 0,
        totalLanguages: totalLanguages || 0,
        todayUploads: todayUploads || 0
      },
      error: null
    });
  } catch (error: any) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 });
  }
}
