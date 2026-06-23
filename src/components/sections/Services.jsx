import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { services } from '../../data';
import { Icon } from '../ui/Icon';
import { SectionHeading } from '../ui/primitives';
import { Aura } from '../ui/Aura';

function ServiceCard({ s, i }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-cream p-8 shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-brand/25 hover:shadow-soft"
    >
      {/* spotlight glow following cursor */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(420px circle at var(--mx) var(--my), rgba(124,58,237,0.10), transparent 45%)' }}
      />
      {/* top accent bar */}
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-grad-brand transition-transform duration-500 group-hover:scale-x-100" />

      <div className="relative">
        <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-grad-soft text-brand transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105">
          <Icon name={s.icon} size={28} strokeWidth={1.8} />
        </div>
        <h3 className="mb-3 font-display text-xl font-semibold text-brand-dark">{s.title}</h3>
        <p className="mb-5 text-[0.92rem] leading-relaxed text-muted">{s.desc}</p>
        <div className="mb-6 flex flex-wrap gap-2">
          {s.tags.map((t) => (
            <span key={t} className="rounded-full bg-wash px-3 py-1 text-xs font-medium text-brand-dark">{t}</span>
          ))}
        </div>
        <a href="#contact" className="mt-auto inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand transition-colors hover:text-rose">
          {s.cta} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-wash py-28">
      <Aura variant="right" />
      <div className="container relative">
        <SectionHeading
          eyebrow="Our Services"
          title="How We Can"
          em="Help"
          subtitle="Every person's experiences, struggles, and goals are unique. Our services are tailored to meet your individual needs."
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => <ServiceCard key={s.title} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}
