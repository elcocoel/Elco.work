import { addMinutes, addDays, isBefore } from 'date-fns';
import { fromZonedTime, formatInTimeZone } from 'date-fns-tz';
import { parseISO } from 'date-fns';
import { BOOKING_CONFIG } from './booking-config';
import { freebusyQuery, type BusyBlock } from './google-calendar';

const TZ = BOOKING_CONFIG.availability.timezone;
const SLOT_DURATION = BOOKING_CONFIG.slotDurationMinutes;
const PADDING = BOOKING_CONFIG.paddingBetweenSlotsMinutes;

export interface TimeSlot {
  start: string;
  end: string;
}

/** Parse YYYY-MM-DD and return a Date at noon in the config timezone (for day-of-week). */
function parseDateInZone(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return fromZonedTime(new Date(y, m - 1, d, 12, 0, 0), TZ);
}

/** Day of week in config timezone (0 = Sun, 1 = Mon, ...). */
function getDayOfWeekInZone(dateStr: string): number {
  return parseDateInZone(dateStr).getUTCDay();
}

/** Create slot start Date in zone from date string and "HH:mm". */
function slotStartInZone(dateStr: string, timeStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  const [h, min] = timeStr.split(':').map(Number);
  return fromZonedTime(new Date(y, m - 1, d, h, min ?? 0, 0), TZ);
}

/**
 * Generate all theoretical slots in the date range within availability windows.
 */
function generateTheoreticalSlots(startDate: string, endDate: string): TimeSlot[] {
  const slots: TimeSlot[] = [];
  let [y, m, d] = startDate.split('-').map(Number);
  let current = new Date(y, m - 1, d, 0, 0, 0);
  const [ey, em, ed] = endDate.split('-').map(Number);
  const last = new Date(ey, em - 1, ed, 23, 59, 59);

  while (isBefore(current, last) || current.getTime() === last.getTime()) {
    const dateStr = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`;
    const day = getDayOfWeekInZone(dateStr);

    for (const win of BOOKING_CONFIG.availability.windows) {
      if (!(win.days as readonly number[]).includes(day)) continue;
      const [startH, startMin] = win.start.split(':').map(Number);
      const [endH, endMin] = win.end.split(':').map(Number);
      let slotStart = slotStartInZone(dateStr, `${String(startH).padStart(2, '0')}:${String(startMin).padStart(2, '0')}`);
      const windowEnd = slotStartInZone(dateStr, `${String(endH).padStart(2, '0')}:${String(endMin).padStart(2, '0')}`);

      while (isBefore(slotStart, windowEnd)) {
        const slotEnd = addMinutes(slotStart, SLOT_DURATION);
        if (slotEnd.getTime() > windowEnd.getTime()) break;
        slots.push({
          start: formatInTimeZone(slotStart, TZ, "yyyy-MM-dd'T'HH:mm:ssXXX"),
          end: formatInTimeZone(slotEnd, TZ, "yyyy-MM-dd'T'HH:mm:ssXXX"),
        });
        slotStart = addMinutes(slotEnd, PADDING);
      }
    }
    current = addDays(current, 1);
  }

  return slots;
}

function slotOverlapsBusy(slot: TimeSlot, busy: BusyBlock[]): boolean {
  const slotStart = parseISO(slot.start).getTime();
  const slotEnd = parseISO(slot.end).getTime();
  for (const b of busy) {
    const bStart = parseISO(b.start).getTime();
    const bEnd = parseISO(b.end).getTime();
    if (slotStart < bEnd && slotEnd > bStart) return true;
  }
  return false;
}

/**
 * Return available slots for the given date range (ISO date strings YYYY-MM-DD).
 */
export async function getAvailableSlots(startDate: string, endDate: string): Promise<TimeSlot[]> {
  const theoretical = generateTheoreticalSlots(startDate, endDate);
  if (theoretical.length === 0) return [];

  const timeMin = theoretical[0].start;
  const timeMax = theoretical[theoretical.length - 1].end;
  const busy = await freebusyQuery(timeMin, timeMax);
  return theoretical.filter((slot) => !slotOverlapsBusy(slot, busy));
}
