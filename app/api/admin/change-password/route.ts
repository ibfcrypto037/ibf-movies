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

export async function POST(request: Request) {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { currentPassword, newPassword } = await request.json();
    const stored = process.env.ADMIN_PASSWORD || 'ibfmovies2024';

    if (currentPassword !== stored) {
      return NextResponse.json({ error: 'Current password incorrect' }, { status: 400 });
    }

    // In a real app, you would update the DB or .env
    // For this demo, we'll just return success if the current matches.
    // NOTE: Changing process.env at runtime doesn't persist.
    
    return NextResponse.json({ success: true, message: 'Password update simulated (requires env change for persistence)' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
