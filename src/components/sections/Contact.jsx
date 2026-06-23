import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Video, Check, Loader2 } from 'lucide-react';
import { supportOptions } from '../../data';
import { Reveal } from '../ui/primitives';
import { cn } from '../../lib/utils';

function Field({ id, label, type = 'text', required, as = 'input', rows }) {
  const Tag = as;
  return (
    <div className="relative">
      <Tag
        id={id}
        name={id}
        type={type}
        rows={rows}
        required={required}
        placeholder=" "
        className="peer w-full rounded-xl border border-input bg-wash px-4 pb-2.5 pt-5 text-[0.92rem] text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-4 text-sm text-muted transition-all peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-brand peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs"
      >
        {label}{required && ' *'}
      </label>
    </div>
  );
}

const contactItems = [
  { icon: Phone, label: 'Phone', value: '+91 74488 45098' },
  { icon: Mail, label: 'Email', value: 'chaandinibalachandran@gmail.com' },
  { icon: Video, label: 'Consultation Modes', value: 'Online & In-Person' },
];

export default function Contact() {
  const [status, setStatus] = useState('idle'); // idle | loading | done

  const onSubmit = (e) => {
    e.preventDefault();
    if (status !== 'idle') return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('done');
      setTimeout(() => { setStatus('idle'); e.target.reset(); }, 2600);
    }, 1100);
  };

  return (
    <section id="contact" className="bg-cream py-28">
      <div className="container grid items-start gap-16 md:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <p className="eyebrow mb-3">Get In Touch</p>
          <h2 className="section-title mb-5">Let's Start The <em className="not-italic text-brand">Conversation</em></h2>
          <p className="mb-8 text-muted">Taking the first step can often feel difficult, but you don't have to do it alone — whether you're looking for support, guidance, clarity, or simply someone to listen.</p>
          <div className="space-y-5">
            {contactItems.map((c) => (
              <div key={c.label} className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-wash text-brand">
                  <c.icon size={22} strokeWidth={1.8} />
                </span>
                <div className="text-[0.95rem]"><strong className="text-brand-dark">{c.label}</strong><br />{c.value}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-cream p-8 shadow-soft sm:p-10">
            <h3 className="mb-7 font-display text-2xl font-semibold text-brand-dark">Book Your Consultation</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="fullName" label="Full Name" required />
              <Field id="phone" label="Phone Number" type="tel" required />
              <Field id="email" label="Email Address" type="email" required />
              <Field id="age" label="Age" type="number" />
            </div>

            <div className="mt-4">
              <Field id="occupation" label="Occupation" />
            </div>

            <fieldset className="mt-6">
              <legend className="mb-2 text-sm font-semibold text-brand-dark">Preferred Consultation Mode *</legend>
              <div className="flex gap-3">
                {['Online', 'In-Person'].map((m) => (
                  <label key={m} className="flex flex-1 cursor-pointer items-center gap-2 rounded-xl border border-input bg-wash px-4 py-3 text-sm transition has-[:checked]:border-brand has-[:checked]:bg-brand/5">
                    <input type="radio" name="mode" value={m} required className="accent-brand" /> {m}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-6">
              <legend className="mb-2 text-sm font-semibold text-brand-dark">What would you like support with?</legend>
              <div className="flex flex-wrap gap-2">
                {supportOptions.map((o) => (
                  <label key={o} className="cursor-pointer rounded-full border border-input bg-wash px-3.5 py-1.5 text-xs font-medium text-ink transition has-[:checked]:border-brand has-[:checked]:bg-brand has-[:checked]:text-white">
                    <input type="checkbox" name="support" value={o} className="sr-only" /> {o}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-6">
              <Field id="concern" label="Tell us about your concern" as="textarea" rows={4} />
            </div>

            <div className="mt-5 space-y-2 text-sm text-muted">
              <label className="flex items-start gap-2"><input type="checkbox" required className="mt-1 accent-brand" /> I understand this form is not for emergencies.</label>
              <label className="flex items-start gap-2"><input type="checkbox" required className="mt-1 accent-brand" /> I consent to being contacted by Brainversation.</label>
            </div>

            <button
              type="submit"
              disabled={status !== 'idle'}
              className={cn('btn btn-primary mt-7 w-full', status === 'done' && '!bg-none !bg-brand')}
            >
              {status === 'idle' && 'Book My Consultation'}
              {status === 'loading' && <><Loader2 size={18} className="animate-spin" /> Sending…</>}
              {status === 'done' && <><Check size={18} /> Submitted!</>}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
