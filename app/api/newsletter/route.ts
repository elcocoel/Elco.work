import { NextRequest, NextResponse } from 'next/server';
import { createLead } from '@/lib/leads';

export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Inline newsletter signup (homepage / in-flow). Writes to contacts with
 * newsletter_consent true; no calendar event.
 */
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const email = typeof b?.email === 'string' ? b.email.trim() : '';
  const consent = Boolean(b?.newsletter_consent);

  if (!consent) {
    return NextResponse.json({ error: 'Newsletter signup requires consent' }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
  }

  try {
    await createLead({
      email,
      newsletter_consent: true,
      source: 'elco.work / newsletter_inline',
    });
  } catch (e) {
    console.error('Newsletter signup insert error:', e);
    return NextResponse.json({ error: 'Could not save signup. Try again later.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
