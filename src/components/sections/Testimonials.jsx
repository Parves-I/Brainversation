import { Star, Quote } from 'lucide-react';
import { testimonials } from '../../data';
import { SectionHeading } from '../ui/primitives';

function Card({ t }) {
  return (
    <figure className="relative w-[340px] shrink-0 rounded-3xl border border-border bg-cream p-7 shadow-card">
      <Quote className="absolute right-6 top-6 text-brand/10" size={40} />
      <div className="mb-4 flex gap-1 text-rose">
        {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={16} className="fill-rose" />)}
      </div>
      <blockquote className="relative text-[0.95rem] leading-relaxed text-ink">“{t.quote}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-grad-brand font-display text-sm font-semibold text-white">
          {t.name.charAt(0)}
        </span>
        <span>
          <span className="block text-sm font-semibold text-brand-dark">{t.name}</span>
          <span className="block text-xs text-muted">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const row = [...testimonials, ...testimonials];
  return (
    <section id="testimonials" className="overflow-hidden bg-cream py-28">
      <div className="container">
        <SectionHeading eyebrow="Kind Words" title="Stories Of Healing &amp;" em="Growth" subtitle="Real experiences from people who found clarity, strength, and support." />
      </div>

      {/* infinite marquee carousel, pauses on hover */}
      <div className="group relative mt-14 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max gap-6 px-3 animate-marquee group-hover:[animation-play-state:paused]">
          {row.map((t, i) => <Card key={i} t={t} />)}
        </div>
      </div>
    </section>
  );
}
