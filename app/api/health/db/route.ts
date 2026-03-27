import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

/**
 * GET /api/health/db — Supabase connection diagnostic for Vercel.
 * Call this on your production URL to verify env vars and DB connectivity.
 */
export async function GET() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;

  const diag: Record<string, unknown> = {
    env: {
      SUPABASE_URL: url ? 'set' : 'missing',
      SUPABASE_SECRET_KEY: key ? 'set' : 'missing',
    },
    connection: null as unknown,
    ok: false,
  };

  if (!url || !key) {
    diag.error = 'Missing SUPABASE_URL or SUPABASE_SECRET_KEY';
    return NextResponse.json(diag, { status: 503 });
  }

  try {
    const supabase = createClient(url, key);
    const { data, error } = await supabase.from('contacts').select('id').limit(1);
    if (error) {
      diag.connection = { ok: false, error: error.message, code: error.code };
      return NextResponse.json(diag, { status: 503 });
    }
    diag.connection = {
      ok: true,
      message: 'SELECT succeeded',
      rowCount: data?.length ?? 0,
    };

    diag.ok = true;
    return NextResponse.json(diag);
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e));
    diag.connection = { ok: false, error: err.message };
    return NextResponse.json(diag, { status: 503 });
  }
}
