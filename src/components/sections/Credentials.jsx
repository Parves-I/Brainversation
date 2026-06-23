import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GraduationCap, ScrollText, Award, Landmark, ArrowUpRight } from 'lucide-react';
import { degrees, diplomas, shortCourses, memberships } from '../../data';
import { SectionHeading } from '../ui/primitives';
import { TextureOverlay } from '../ui/MediaBackdrop';
import { cn } from '../../lib/utils';

const categories = [
  { key: 'degrees', icon: GraduationCap, label: 'Degrees & Specialisations', blurb: 'Core academic foundation in clinical and counselling psychology.', items: degrees },
  { key: 'diplomas', icon: ScrollText, label: 'Postgraduate Diplomas', blurb: 'Focused postgraduate training in specialised counselling areas.', items: diplomas },
  { key: 'short', icon: Award, label: 'Certifications & Short Courses', blurb: 'Continued learning across applied mental-health disciplines.', items: shortCourses },
  { key: 'memberships', icon: Landmark, label: 'Professional Memberships', blurb: 'Affiliations upholding ethical, professional standards.', items: memberships },
];

export default function Credentials() {
  const [active, setActive] = useState(0);
  const cat = categories[active];

  return (
    <section id="qualifications" className="relative overflow-hidden bg-brand-dark py-28 text-white">
      {/* ambient glow + grid texture */}
      <TextureOverlay opacity={0.14} blend="mix-blend-screen" />
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand/40 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-rose/25 blur-[120px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '48px 48px' }}
      />

      <div className="container relative">
        <SectionHeading
          light
          eyebrow="Credentials & Expertise"
          title="Built On A Foundation Of"
          em="Knowledge"
          subtitle="A continuously evolving body of academic training, specialised diplomas, and professional practice — select a category to explore."
        />

        <div className="mt-16 grid items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
          {/* LEFT — vertical tabs */}
          <div className="flex flex-col justify-center gap-2 lg:col-span-5">
            {categories.map((c, i) => {
              const isActive = i === active;
              return (
                <button
                  key={c.key}
                  onClick={() => setActive(i)}
                  className="relative flex items-center gap-4 rounded-2xl px-4 py-4 text-left transition-colors"
                >
                  {isActive && (
                    <motion.span
                      layoutId="cred-active"
                      className="absolute inset-0 rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className={cn('relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors',
                    isActive ? 'bg-grad-brand text-white' : 'bg-white/5 text-soft')}>
                    <c.icon size={20} strokeWidth={1.8} />
                  </span>
                  <span className="relative z-10 flex-1">
                    <span className={cn('block text-[0.97rem] font-semibold transition-colors', isActive ? 'text-white' : 'text-white/70')}>
                      {c.label}
                    </span>
                    <span className="block text-xs text-white/45">{c.items.length} entries</span>
                  </span>
                  <ArrowUpRight size={18} className={cn('relative z-10 transition-all', isActive ? 'text-soft opacity-100' : 'opacity-0 -translate-x-1')} />
                </button>
              );
            })}
          </div>

          {/* RIGHT — animated detail panel */}
          <div className="lg:col-span-7">
            <div className="relative min-h-[26rem] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-md sm:p-10">
            {/* giant watermark index */}
            <span className="pointer-events-none absolute -right-2 -top-8 select-none font-display text-[10rem] font-bold leading-none text-white/[0.04]">
              0{active + 1}
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mb-8 flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-grad-brand text-white shadow-glow">
                    <cat.icon size={26} strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-white">{cat.label}</h3>
                    <p className="text-sm text-white/60">{cat.blurb}</p>
                  </div>
                </div>

                <ul className="divide-y divide-white/10">
                  {cat.items.map((item, idx) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.08 + idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
                      className="group flex items-center gap-5 py-4"
                    >
                      <span className="font-display text-sm font-semibold text-rose/80 tabular-nums">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1 text-[1.02rem] text-white/90 transition-colors group-hover:text-white">
                        {item}
                      </span>
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-soft/40 transition-all group-hover:scale-150 group-hover:bg-soft" />
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
