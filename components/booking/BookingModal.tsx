'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useBookingModal } from './BookingModalContext';
import { SlotPicker } from './SlotPicker';
import { BookingForm } from './BookingForm';
import { BookingConfirmation } from './BookingConfirmation';
import { BOOKING_CONFIG } from '@/lib/booking-config';
import { ELCO_PORTRAIT_ILLUSTRATION } from '@/lib/headerBackground';

function getFocusable(container: HTMLElement): HTMLElement[] {
  const sel =
    'button:not([disabled]), a[href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';
  return Array.from(container.querySelectorAll<HTMLElement>(sel)).filter(
    (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true',
  );
}

function formatSelectedSlot(start: string): string {
  const d = new Date(start);
  const weekday = d.toLocaleDateString('en-GB', { weekday: 'long' });
  const day = d.getDate();
  const month = d.toLocaleDateString('en-GB', { month: 'long' });
  const time = d.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return `${weekday}, ${day} ${month} · ${time}`;
}

export function BookingModal() {
  const { isOpen, closeModal, step, selectedSlot } = useBookingModal();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, closeModal]);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;
    const focusable = getFocusable(containerRef.current);
    if (focusable[0]) focusable[0].focus();
  }, [isOpen, step]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const tz = BOOKING_CONFIG.availability.timezone.replace('/', ' / ');

  const content = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40"
      role="presentation"
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        className="w-full max-w-3xl border border-gray-100 rounded-sm bg-white shadow-lg overflow-hidden relative animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-4 right-4 z-10 p-1.5 text-gray-400 hover:text-black transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
          aria-label="Close"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>

        <div className="flex flex-col sm:flex-row min-h-[460px]">
          {/* ── Left panel: event info ── */}
          <div className="sm:w-[260px] shrink-0 border-b sm:border-b-0 sm:border-r border-gray-100 p-6 bg-gray-50/30">
            <h2
              id="booking-modal-title"
              className="font-display text-lg font-semibold text-black mb-3"
            >
              Discovery Call
            </h2>
            <div className="mb-4">
              <div className="relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-full border border-gray-100 bg-gray-100">
                <img
                  src={ELCO_PORTRAIT_ILLUSTRATION}
                  alt=""
                  width={72}
                  height={72}
                  className="h-full w-full object-cover object-[30%_46%]"
                  decoding="async"
                />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6">Elementary Complexity</p>

            <div className="space-y-4">
              {/* Duration */}
              <div className="flex items-center gap-2.5 text-gray-600 text-sm">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="shrink-0 text-gray-400"
                >
                  <circle cx="8" cy="8" r="6.5" />
                  <path d="M8 4.5V8l2.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{BOOKING_CONFIG.slotDurationMinutes} min</span>
              </div>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed">
                A free conversation to explore your challenge and see if there&apos;s a fit.
              </p>

              {/* Timezone */}
              <div className="flex items-center gap-2.5 text-gray-400 text-xs">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="shrink-0"
                >
                  <circle cx="8" cy="8" r="6.5" />
                  <ellipse cx="8" cy="8" rx="3" ry="6.5" />
                  <path d="M1.5 8h13" />
                </svg>
                <span>{tz}</span>
              </div>

              {/* Selected slot (steps 2+) */}
              {selectedSlot && step >= 2 && (
                <div className="pt-4 mt-2 border-t border-gray-200 animate-fade-in-up">
                  <p className="font-display text-xs uppercase tracking-widest text-gray-400 mb-1">
                    Your slot
                  </p>
                  <p className="text-sm text-black font-medium">
                    {formatSelectedSlot(selectedSlot.start)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ── Right panel: step content (extra pr clears absolute close control) ── */}
          <div className="flex-1 p-6 pr-14 sm:pr-16 overflow-y-auto">
            <div key={step} className="animate-fade-in-up">
              {step === 1 && <SlotPicker />}
              {step === 2 && <BookingForm />}
              {step === 3 && <BookingConfirmation />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
