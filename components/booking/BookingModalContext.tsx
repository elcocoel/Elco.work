'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

export interface TimeSlot {
  start: string;
  end: string;
}

export type BookingStep = 1 | 2 | 3;

const AVAILABILITY_RANGE_DAYS = 14;

function getAvailabilityRange(): { start: string; end: string } {
  const start = new Date();
  const end = new Date();
  end.setDate(end.getDate() + AVAILABILITY_RANGE_DAYS);
  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
}

interface BookingModalContextValue {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  step: BookingStep;
  setStep: (s: BookingStep) => void;
  selectedSlot: TimeSlot | null;
  setSelectedSlot: (slot: TimeSlot | null) => void;
  confirmationMessage: string | null;
  setConfirmationMessage: (msg: string | null) => void;
  reset: () => void;
  prefetchedSlots: TimeSlot[] | null;
  prefetchedRange: { start: string; end: string } | null;
  prefetchError: string | null;
}

const BookingModalContext = createContext<BookingModalContextValue | null>(null);

export function useBookingModal() {
  const ctx = useContext(BookingModalContext);
  if (!ctx) throw new Error('useBookingModal must be used within BookingModalProvider');
  return ctx;
}

export function getAvailabilityRangeDays() {
  return AVAILABILITY_RANGE_DAYS;
}

export function getAvailabilityRangeForPicker() {
  return getAvailabilityRange();
}

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<BookingStep>(1);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);
  const [prefetchedSlots, setPrefetchedSlots] = useState<TimeSlot[] | null>(null);
  const [prefetchedRange, setPrefetchedRange] = useState<{ start: string; end: string } | null>(null);
  const [prefetchError, setPrefetchError] = useState<string | null>(null);

  useEffect(() => {
    const { start, end } = getAvailabilityRange();
    fetch(`/api/calendar/availability?start=${start}&end=${end}`)
      .then(async (r) => {
        const data = await r.json().catch(() => ({}));
        if (!r.ok) {
          setPrefetchError((data as { error?: string }).error || 'Prefetch failed');
          return;
        }
        const slots = (data as { slots?: TimeSlot[] }).slots ?? [];
        setPrefetchedSlots(slots);
        setPrefetchedRange({ start, end });
      })
      .catch(() => setPrefetchError('Prefetch failed'));
  }, []);

  const openModal = useCallback(() => {
    setStep(1);
    setSelectedSlot(null);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setStep(1);
    setSelectedSlot(null);
    setConfirmationMessage(null);
  }, []);

  const reset = useCallback(() => {
    setStep(1);
    setSelectedSlot(null);
    setConfirmationMessage(null);
  }, []);

  const value: BookingModalContextValue = {
    isOpen,
    openModal,
    closeModal,
    step,
    setStep,
    selectedSlot,
    setSelectedSlot,
    confirmationMessage,
    setConfirmationMessage,
    reset,
    prefetchedSlots,
    prefetchedRange,
    prefetchError,
  };

  return (
    <BookingModalContext.Provider value={value}>
      {children}
    </BookingModalContext.Provider>
  );
}
