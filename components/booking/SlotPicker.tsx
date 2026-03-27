'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import {
  useBookingModal,
  getAvailabilityRangeForPicker,
  type TimeSlot,
} from './BookingModalContext';

/* ─── helpers ─── */

function getTodayISO(): string {
  const t = new Date();
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
}

function filterFutureSlots(slots: TimeSlot[]): TimeSlot[] {
  const now = new Date();
  return slots.filter((s) => new Date(s.start) > now);
}

function groupSlotsByDate(slots: TimeSlot[]): Map<string, TimeSlot[]> {
  const map = new Map<string, TimeSlot[]>();
  for (const slot of slots) {
    const d = slot.start.slice(0, 10);
    if (!map.has(d)) map.set(d, []);
    map.get(d)!.push(slot);
  }
  return map;
}

function formatSlotTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

function formatDateHeading(isoDate: string): string {
  const d = new Date(isoDate + 'T12:00:00');
  return d.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
const DAY_HEADERS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

interface CalendarDay {
  date: string;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isAvailable: boolean;
  isPast: boolean;
}

function buildCalendarDays(
  year: number,
  month: number,
  availableDates: Set<string>,
  todayStr: string,
): CalendarDay[] {
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: CalendarDay[] = [];

  for (let i = 0; i < firstDow; i++) {
    days.push({
      date: '',
      day: 0,
      isCurrentMonth: false,
      isToday: false,
      isAvailable: false,
      isPast: true,
    });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    days.push({
      date,
      day: d,
      isCurrentMonth: true,
      isToday: date === todayStr,
      isAvailable: availableDates.has(date),
      isPast: date < todayStr,
    });
  }

  return days;
}

/* ─── sub-components ─── */

function CalendarSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-5 w-32 bg-gray-100 rounded-sm animate-pulse" />
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="h-10 bg-gray-50 rounded-sm animate-pulse" />
        ))}
      </div>
    </div>
  );
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M10 3L5 8l5 5" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 3l5 5-5 5" />
    </svg>
  );
}

/* ─── main component ─── */

export function SlotPicker() {
  const {
    selectedSlot,
    setSelectedSlot,
    setStep,
    prefetchedSlots,
    prefetchedRange,
    prefetchError,
  } = useBookingModal();

  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [view, setView] = useState<'calendar' | 'times'>('calendar');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [viewMonth, setViewMonth] = useState<{ year: number; month: number }>(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  /* ─── fetch / use prefetched slots ─── */
  useEffect(() => {
    const { start, end } = getAvailabilityRangeForPicker();
    const rangeMatches = prefetchedRange?.start === start && prefetchedRange?.end === end;

    if (rangeMatches && prefetchedSlots !== null) {
      setSlots(prefetchedSlots);
      setLoading(false);
      setError(prefetchError || null);
      return;
    }

    setLoading(true);
    setError(null);
    fetch(`/api/calendar/availability?start=${start}&end=${end}`)
      .then(async (r) => {
        const data = await r.json().catch(() => ({}));
        if (!r.ok) {
          setError((data as { error?: string }).error || 'Failed to load');
          return;
        }
        setSlots((data as { slots: TimeSlot[] }).slots || []);
      })
      .catch((e) => setError(e.message || 'Could not load availability'))
      .finally(() => setLoading(false));
  }, [prefetchedSlots, prefetchedRange, prefetchError]);

  /* ─── derived data ─── */
  const todayStr = useMemo(() => getTodayISO(), []);
  const futureSlots = useMemo(() => filterFutureSlots(slots), [slots]);
  const byDate = useMemo(() => groupSlotsByDate(futureSlots), [futureSlots]);
  const availableDates = useMemo(() => new Set(byDate.keys()), [byDate]);

  const calendarDays = useMemo(
    () => buildCalendarDays(viewMonth.year, viewMonth.month, availableDates, todayStr),
    [viewMonth, availableDates, todayStr],
  );

  const slotsForDate = useMemo(() => {
    if (!selectedDate) return [];
    return byDate.get(selectedDate) || [];
  }, [selectedDate, byDate]);

  /* ─── month navigation constraints ─── */
  const canGoPrev = useMemo(() => {
    const now = new Date();
    return (
      viewMonth.year > now.getFullYear() ||
      (viewMonth.year === now.getFullYear() && viewMonth.month > now.getMonth())
    );
  }, [viewMonth]);

  const canGoNext = useMemo(() => {
    const dates = Array.from(availableDates);
    if (dates.length === 0) return false;
    const last = dates.sort().pop()!;
    const lastY = parseInt(last.slice(0, 4));
    const lastM = parseInt(last.slice(5, 7)) - 1;
    return viewMonth.year < lastY || (viewMonth.year === lastY && viewMonth.month < lastM);
  }, [viewMonth, availableDates]);

  /* ─── handlers ─── */
  const goMonth = useCallback((dir: 1 | -1) => {
    setViewMonth((prev) => {
      let m = prev.month + dir;
      let y = prev.year;
      if (m < 0) { m = 11; y--; }
      if (m > 11) { m = 0; y++; }
      return { year: y, month: m };
    });
  }, []);

  const handleDateClick = useCallback(
    (dateStr: string) => {
      setSelectedDate(dateStr);
      setSelectedSlot(null);
      setView('times');
    },
    [setSelectedSlot],
  );

  const handleBackToCalendar = useCallback(() => {
    setView('calendar');
  }, []);

  const handleSelectSlot = useCallback(
    (slot: TimeSlot) => setSelectedSlot(slot),
    [setSelectedSlot],
  );

  const handleContinue = useCallback(() => {
    if (selectedSlot) setStep(2);
  }, [selectedSlot, setStep]);

  /* ─── loading ─── */
  if (loading) return <CalendarSkeleton />;

  /* ─── error ─── */
  if (error) {
    return (
      <div className="space-y-3">
        <p className="text-red-600 text-sm">{error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="text-sm text-gray-500 hover:text-black transition-colors underline underline-offset-2"
        >
          Try again
        </button>
      </div>
    );
  }

  /* ─── calendar view ─── */
  if (view === 'calendar') {
    const noSlots = availableDates.size === 0;

    return (
      <div className="animate-fade-in-up">
        {/* Month header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-base font-medium text-black">
            {MONTH_NAMES[viewMonth.month]}{' '}
            <span className="text-gray-400 font-normal">{viewMonth.year}</span>
          </h3>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => goMonth(-1)}
              disabled={!canGoPrev}
              className="p-1.5 text-gray-400 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
              aria-label="Previous month"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              onClick={() => goMonth(1)}
              disabled={!canGoNext}
              className="p-1.5 text-gray-400 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
              aria-label="Next month"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* Day-of-week headers */}
        <div className="grid grid-cols-7 mb-1">
          {DAY_HEADERS.map((d) => (
            <div
              key={d}
              className="text-center font-display text-[10px] uppercase tracking-widest text-gray-400 py-2"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-px">
          {calendarDays.map((cell, i) => {
            if (!cell.isCurrentMonth) {
              return <div key={`empty-${i}`} className="h-11" />;
            }

            const clickable = cell.isAvailable && !cell.isPast;

            return (
              <button
                key={cell.date}
                type="button"
                disabled={!clickable}
                onClick={() => clickable && handleDateClick(cell.date)}
                className={[
                  'relative h-11 w-full flex items-center justify-center text-sm rounded-sm transition-colors duration-150',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400',
                  clickable
                    ? 'text-black font-medium bg-gray-100 hover:bg-black hover:text-white cursor-pointer'
                    : 'text-gray-300 cursor-default',
                  cell.isToday && !clickable ? 'text-gray-400' : '',
                ].join(' ')}
              >
                {cell.day}
                {cell.isToday && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-current" />
                )}
              </button>
            );
          })}
        </div>

        {noSlots && (
          <p className="text-gray-500 text-sm mt-6 text-center">
            No available slots in the next two weeks.
          </p>
        )}

        <p className="text-gray-400 text-xs mt-5 text-center">
          Select a date to view available times.
        </p>
      </div>
    );
  }

  /* ─── time-slot view ─── */
  return (
    <div className="animate-fade-in-up">
      {/* Header with back */}
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={handleBackToCalendar}
          className="p-1.5 text-gray-400 hover:text-black transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
          aria-label="Back to calendar"
        >
          <ChevronLeft />
        </button>
        <h3 className="font-display text-base font-medium text-black">
          {selectedDate && formatDateHeading(selectedDate)}
        </h3>
      </div>

      {/* Time slots */}
      {slotsForDate.length === 0 ? (
        <p className="text-gray-500 text-sm">No times available on this day.</p>
      ) : (
        <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
          {slotsForDate.map((slot) => {
            const isSelected =
              selectedSlot?.start === slot.start && selectedSlot?.end === slot.end;
            return (
              <button
                key={slot.start}
                type="button"
                onClick={() => handleSelectSlot(slot)}
                className={[
                  'w-full text-left px-4 py-3 border rounded-sm text-sm transition-colors duration-150',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400',
                  isSelected
                    ? 'border-black bg-black text-white'
                    : 'border-gray-100 text-gray-700 hover:border-black hover:text-black',
                ].join(' ')}
              >
                {formatSlotTime(slot.start)}
              </button>
            );
          })}
        </div>
      )}

      {/* Continue — forward actions align end */}
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={handleContinue}
          disabled={!selectedSlot}
          className="font-display text-base font-medium uppercase tracking-wide border-b-2 border-black pb-0.5 disabled:opacity-40 disabled:border-gray-300 disabled:cursor-not-allowed hover:border-gray-500 hover:text-gray-600 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
