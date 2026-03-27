'use client';

import { useState } from 'react';
import { Section } from './ui/Section';

/**
 * In-page newsletter capture. Same storage as booking opt-in (contacts.newsletter_consent).
 */
export function NewsletterSignupSection() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    if (!consent) {
      setStatus('error');
      setMessage('Please confirm you want to receive the newsletter.');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newsletter_consent: true }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus('error');
        setMessage(data.error ?? 'Something went wrong.');
        return;
      }
      setStatus('success');
      setMessage("You're on the list. Thank you.");
      setEmail('');
      setConsent(false);
    } catch {
      setStatus('error');
      setMessage('Network error. Try again in a moment.');
    }
  }

  return (
    <Section variant="default" contained className="border-t border-gray-100 py-16 lg:py-20">
      <div className="max-w-reading">
        <p className="mb-3 font-display text-xs uppercase tracking-widest text-gray-400">Newsletter</p>
        <h2 className="mb-3 font-display text-2xl font-semibold uppercase tracking-wide text-black sm:text-3xl">
          Notes from the studio
        </h2>
        <p className="mb-8 text-gray-600 leading-relaxed">
          Occasional writing on coordination, narrative, and governance — no spam, unsubscribe anytime.
        </p>

        {status === 'success' ? (
          <p className="font-display text-sm uppercase tracking-wide text-gray-600" role="status">
            {message}
          </p>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="newsletter-email" className="sr-only">
                Email
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                placeholder="you@example.com"
                className="w-full border border-gray-100 rounded-sm bg-white px-4 py-3 font-display text-sm text-black placeholder:text-gray-400 transition-colors hover:border-black focus:border-black focus:outline-none"
              />
            </div>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={consent}
                onChange={(ev) => setConsent(ev.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 rounded-sm border-gray-500 text-black focus:ring-gray-500"
              />
              <span className="text-sm leading-relaxed text-gray-600 transition-colors group-hover:text-gray-800">
                I agree to receive email updates from Elementary Complexity. I can unsubscribe at any time.
              </span>
            </label>
            {message && status === 'error' && (
              <p className="text-sm text-gray-700" role="alert">
                {message}
              </p>
            )}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="font-display text-xs font-medium uppercase tracking-wide text-black border border-gray-100 rounded-sm px-6 py-3 transition-colors hover:border-black hover:bg-black hover:text-white disabled:opacity-50 disabled:pointer-events-none"
            >
              {status === 'loading' ? 'Signing up…' : 'Subscribe'}
            </button>
          </form>
        )}
      </div>
    </Section>
  );
}
