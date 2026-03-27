'use client';

import { useBookingModal } from './BookingModalContext';

export function BookingConfirmation() {
  const { confirmationMessage, closeModal } = useBookingModal();

  return (
    <div className="flex flex-col items-start justify-center min-h-[280px] space-y-6">
      <div>
        <p className="font-display text-xs uppercase tracking-widest text-gray-400 mb-3">
          Confirmed
        </p>
        <p className="text-gray-700 text-sm leading-relaxed max-w-sm">
          {confirmationMessage ?? "You\u2019re booked. We\u2019ll send a calendar invite to your email."}
        </p>
      </div>
      <button
        type="button"
        onClick={closeModal}
        className="font-display text-base font-medium uppercase tracking-wide border-b-2 border-black pb-0.5 hover:border-gray-500 hover:text-gray-600 transition-colors"
      >
        Close
      </button>
    </div>
  );
}
