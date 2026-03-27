'use client';

import { useState } from 'react';
import { useBookingModal } from './BookingModalContext';
import { Eyebrow } from '../ui/Eyebrow';
import { BOOKING_CONFIG } from '@/lib/booking-config';

type FormData = Record<string, string | boolean>;

export function BookingForm() {
  const { selectedSlot, setStep, setConfirmationMessage } = useBookingModal();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(() => {
    const initial: FormData = {};
    for (const f of BOOKING_CONFIG.formFields) {
      if (f.type === 'checkbox') initial[f.id] = false;
      else initial[f.id] = '';
    }
    return initial;
  });

  const handleChange = (id: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    setError(null);
    setSubmitting(true);
    const answers: Record<string, string | boolean> = {};
    for (const f of BOOKING_CONFIG.formFields) {
      if (f.id === 'email' || f.id === 'name' || f.id === 'newsletter_consent') continue;
      const v = formData[f.id];
      if (v !== undefined && v !== '') answers[f.id] = v;
    }
    try {
      const res = await fetch('/api/calendar/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slot: selectedSlot,
          email: formData.email,
          name: formData.name || undefined,
          answers,
          newsletter_consent: Boolean(formData.newsletter_consent),
          source:
            typeof window !== 'undefined'
              ? window.location.pathname || 'elco.work'
              : 'elco.work',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || res.statusText);
      setConfirmationMessage(data.message || "You're booked.");
      setStep(3);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <Eyebrow className="mb-1">Your details</Eyebrow>
        <p className="text-gray-500 text-sm">A few things so we can prepare.</p>
      </div>

      <div className="space-y-4">
        {BOOKING_CONFIG.formFields.map((field) => (
          <div key={field.id}>
            {field.type !== 'checkbox' && (
              <label htmlFor={field.id} className="block text-sm text-gray-600 mb-1">
                {field.label}
                {field.required && <span className="text-gray-400 ml-0.5">*</span>}
              </label>
            )}

            {field.type === 'textarea' && (
              <textarea
                id={field.id}
                name={field.id}
                value={typeof formData[field.id] === 'string' ? (formData[field.id] as string) : ''}
                onChange={(e) => handleChange(field.id, e.target.value)}
                required={field.required}
                rows={3}
                className="w-full border border-gray-100 rounded-sm px-3 py-2 text-sm text-gray-700 focus:border-black focus:outline-none transition-colors"
              />
            )}

            {field.type === 'checkbox' && (
              <label htmlFor={field.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  id={field.id}
                  name={field.id}
                  checked={Boolean(formData[field.id])}
                  onChange={(e) => handleChange(field.id, e.target.checked)}
                  className="rounded border-gray-300 text-black focus:ring-gray-400 accent-black"
                />
                <span className="text-sm text-gray-600">{field.label}</span>
              </label>
            )}

            {(field.type === 'text' || field.type === 'email') && (
              <input
                type={field.type}
                id={field.id}
                name={field.id}
                value={typeof formData[field.id] === 'string' ? (formData[field.id] as string) : ''}
                onChange={(e) => handleChange(field.id, e.target.value)}
                required={field.required}
                className="w-full border border-gray-100 rounded-sm px-3 py-2 text-sm text-gray-700 focus:border-black focus:outline-none transition-colors"
              />
            )}
          </div>
        ))}
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="p-1.5 text-gray-400 hover:text-black transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 shrink-0"
          aria-label="Back to slot selection"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 3L5 8l5 5" />
          </svg>
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="font-display text-base font-medium uppercase tracking-wide border-b-2 border-black pb-0.5 disabled:opacity-40 disabled:border-gray-300 disabled:cursor-not-allowed hover:border-gray-500 hover:text-gray-600 transition-colors shrink-0"
        >
          {submitting ? 'Booking\u2026' : 'Confirm booking'}
        </button>
      </div>
    </form>
  );
}
