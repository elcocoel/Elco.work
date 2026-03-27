import { NextRequest, NextResponse } from 'next/server';
import { getAvailableSlots } from '@/lib/booking-slots';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const start = searchParams.get('start');
  const end = searchParams.get('end');
  // timezone optional; slot generation uses config timezone

  if (!start || !end) {
    return NextResponse.json({ error: 'Query params start and end (YYYY-MM-DD) required' }, { status: 400 });
  }

  const dateRe = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRe.test(start) || !dateRe.test(end)) {
    return NextResponse.json({ error: 'start and end must be ISO dates YYYY-MM-DD' }, { status: 400 });
  }

  if (start > end) {
    return NextResponse.json({ error: 'start must be before or equal to end' }, { status: 400 });
  }

  try {
    const slots = await getAvailableSlots(start, end);
    return NextResponse.json({ slots });
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e));
    console.error('Calendar availability error:', err);
    const gaxios = e as { response?: { data?: { error?: string; error_description?: string } } };
    const googleData = gaxios.response?.data;
    if (googleData?.error) {
      console.error('Google API response:', googleData);
    }
    const raw = err.message || String(e);
    const desc = (googleData?.error_description ?? '').toLowerCase();
    let message =
      raw.includes('GOOGLE_CALENDAR') || raw.includes('Missing')
        ? 'Calendar not configured. Add GOOGLE_CALENDAR_* to .env.local and restart the dev server.'
        : raw.includes('invalid_grant')
          ? 'Google rejected the refresh token. Re-get a refresh token (OAuth Playground): authorize again, then copy the new refresh_token (not access_token) into .env.local.'
          : desc.includes('oauth client') || desc.includes('client was not found') || raw.includes('invalid_client')
            ? 'Google doesn’t recognize the OAuth client. Use the full Client ID from Google Cloud Console (e.g. 123...-xxx.apps.googleusercontent.com), no extra spaces, and the same project that has Calendar API enabled.'
            : raw.includes('token') || raw.includes('credentials') || raw.includes('auth')
              ? 'Calendar connection failed. Check your Google Calendar credentials and refresh token.'
              : 'Could not load availability. Check the server console for details.';
    const body: { error: string; errorDetail?: string } = { error: message };
    if (googleData?.error_description && typeof googleData.error_description === 'string') {
      body.errorDetail = googleData.error_description;
    }
    return NextResponse.json(body, {
      status: 500,
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  }
}
