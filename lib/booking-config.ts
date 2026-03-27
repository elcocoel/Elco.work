/**
 * Single source of truth for booking: availability windows, slot duration, form fields.
 * Used by API routes and BookingForm.
 */
export const BOOKING_CONFIG = {
  availability: {
    timezone: 'Europe/Amsterdam',
    windows: [
      { days: [1, 2, 3, 4, 5], start: '09:00', end: '17:00' }, // Mon–Fri
    ],
  },
  slotDurationMinutes: 30,
  paddingBetweenSlotsMinutes: 0,

  formFields: [
    { id: 'email', type: 'email', required: true, label: 'Email' },
    { id: 'name', type: 'text', required: true, label: 'Name' },
    { id: 'what_brings_you', type: 'textarea', required: false, label: 'What brings you here?' },
    { id: 'organization_role', type: 'text', required: false, label: 'Organization or role' },
    { id: 'anything_specific', type: 'textarea', required: false, label: 'Anything specific you want to explore?' },
    { id: 'newsletter_consent', type: 'checkbox', required: false, label: 'Add me to your newsletter' },
  ],
} as const;

export type FormFieldId = (typeof BOOKING_CONFIG.formFields)[number]['id'];
