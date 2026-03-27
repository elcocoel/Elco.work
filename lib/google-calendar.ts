import { google } from 'googleapis';
import { BOOKING_CONFIG } from './booking-config';

const CALENDAR_ID = 'primary';
const EVENT_TIMEZONE = BOOKING_CONFIG.availability.timezone;

let cachedOAuth2Client: InstanceType<typeof google.auth.OAuth2> | null = null;

function getOAuth2Client() {
  if (cachedOAuth2Client) return cachedOAuth2Client;
  const clientId = process.env.GOOGLE_CALENDAR_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CALENDAR_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_CALENDAR_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Missing GOOGLE_CALENDAR_* env vars');
  }
  // Use same redirect_uri as OAuth Playground (where the refresh token was obtained)
  const oauth2 = new google.auth.OAuth2(
    clientId,
    clientSecret,
    'https://developers.google.com/oauthplayground/'
  );
  oauth2.setCredentials({ refresh_token: refreshToken.trim() });
  cachedOAuth2Client = oauth2;
  return oauth2;
}

/** Get a short-lived access token (cached by google-auth-library for ~1h). */
export async function getAccessToken(): Promise<string> {
  const auth = getOAuth2Client();
  const res = await auth.getAccessToken();
  const token = res.token;
  if (!token) throw new Error('Failed to get Google Calendar access token');
  return token;
}

export interface BusyBlock {
  start: string;
  end: string;
}

/** Return busy blocks for the primary calendar in the given time range. */
export async function freebusyQuery(timeMin: string, timeMax: string): Promise<BusyBlock[]> {
  const auth = getOAuth2Client();
  const calendar = google.calendar({ version: 'v3', auth });
  const res = await calendar.freebusy.query({
    requestBody: {
      timeMin,
      timeMax,
      items: [{ id: CALENDAR_ID }],
    },
  });
  const cal = res.data.calendars?.[CALENDAR_ID];
  const busy = cal?.busy ?? [];
  return busy.map((b) => ({ start: b.start!, end: b.end! }));
}

export interface InsertEventParams {
  start: string; // ISO 8601
  end: string;
  title: string;
  description?: string;
  attendees?: string[];
}

/** Create an event on the primary calendar. Returns the event ID. */
export async function insertEvent(params: InsertEventParams): Promise<string> {
  const auth = getOAuth2Client();
  const calendar = google.calendar({ version: 'v3', auth });
  const event = await calendar.events.insert({
    calendarId: CALENDAR_ID,
    requestBody: {
      summary: params.title,
      description: params.description ?? undefined,
      start: { dateTime: params.start, timeZone: EVENT_TIMEZONE },
      end: { dateTime: params.end, timeZone: EVENT_TIMEZONE },
      attendees: params.attendees?.map((email) => ({ email })) ?? [],
    },
  });
  const id = event.data.id;
  if (!id) throw new Error('Google Calendar insert did not return event ID');
  return id;
}
