import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SECRET_KEY!;

function getClient() {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SECRET_KEY');
  }
  return createClient(supabaseUrl, supabaseKey);
}

export interface CreateLeadInput {
  email: string;
  name?: string;
  answers?: Record<string, string | boolean>;
  calendar_event_id?: string;
  booking_datetime?: string; // ISO
  source?: string;
  newsletter_consent?: boolean;
}

/**
 * Insert a lead/contact into the contacts table.
 * Uses SUPABASE_SECRET_KEY (server-side, bypasses RLS).
 */
export async function createLead(data: CreateLeadInput): Promise<{ id: string }> {
  const supabase = getClient();
  const { data: row, error } = await supabase
    .from('contacts')
    .insert({
      email: data.email,
      name: data.name ?? null,
      answers: data.answers ?? {},
      calendar_event_id: data.calendar_event_id ?? null,
      booking_datetime: data.booking_datetime ?? null,
      source: data.source ?? null,
      newsletter_consent: data.newsletter_consent ?? false,
    })
    .select('id')
    .single();

  if (error) throw error;
  if (!row?.id) throw new Error('Insert did not return id');
  return { id: row.id };
}
