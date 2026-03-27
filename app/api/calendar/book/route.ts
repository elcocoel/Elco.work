import { NextRequest, NextResponse } from 'next/server';
import { insertEvent } from '@/lib/google-calendar';
import { createLead } from '@/lib/leads';

export const dynamic = 'force-dynamic';

function formatAnswers(answers: Record<string, string | boolean>): string {
  return Object.entries(answers)
    .filter(([, v]) => v !== undefined && v !== '' && v !== false)
    .map(([k, v]) => `${k}: ${String(v)}`)
    .join('\n');
}

function formatConfirmationMessage(slotStart: string, name: string): string {
  const d = new Date(slotStart);
  const dateStr = d.toLocaleDateString('en-GB', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const timeStr = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
  return `You're booked for ${dateStr} at ${timeStr}.`;
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const slot = b?.slot as { start?: string; end?: string } | undefined;
  const email = typeof b?.email === 'string' ? b.email.trim() : '';
  const name = typeof b?.name === 'string' ? b.name.trim() : undefined;
  const answers = (b?.answers as Record<string, string | boolean>) ?? {};
  const newsletter_consent = Boolean(b?.newsletter_consent);
  const source = typeof b?.source === 'string' ? b.source.trim() : undefined;

  if (!slot?.start || !slot?.end) {
    return NextResponse.json({ error: 'Slot start and end required' }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
  }

  const description = formatAnswers(answers);
  const title = `Discovery call — ${name || email}`;

  let eventId: string;
  try {
    eventId = await insertEvent({
      start: slot.start,
      end: slot.end,
      title,
      description: description || undefined,
      attendees: [email],
    });
  } catch (e) {
    console.error('Calendar insert error:', e);
    return NextResponse.json({ error: 'Failed to create calendar event' }, { status: 500 });
  }

  try {
    await createLead({
      email,
      name: name || undefined,
      answers,
      calendar_event_id: eventId,
      booking_datetime: slot.start,
      source,
      newsletter_consent,
    });
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e));
    const msg = err.message;
    const code = (e as { code?: string })?.code;
    console.error('Lead insert error:', { message: msg, code, stack: err.stack });
    return NextResponse.json({ error: 'Event created but lead storage failed' }, { status: 500 });
  }

  const message = formatConfirmationMessage(slot.start, name || '');
  return NextResponse.json({ success: true, eventId, message });
}
