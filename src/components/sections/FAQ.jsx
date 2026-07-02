import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../../data';
import { SectionHeading } from '../ui/primitives';
import { Aura } from '../ui/Aura';
import { cn } from '../../lib/utils';

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-wash py-28">
      <Aura variant="left" />
      <div className="container relative">
        <SectionHeading eyebrow="Frequently Asked Questions" title="Common" em="Questions" />

        <div className="mx-auto mt-14 max-w-3xl space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={cn(
                  'overflow-hidden rounded-2xl border bg-cream transition-colors',
                  isOpen ? 'border-brand/30 shadow-card' : 'border-border'
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className={cn('font-display text-lg font-medium transition-colors', isOpen ? 'text-brand' : 'text-brand-dark')}>
                    {f.q}
                  </span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-rose">
                    <ChevronDown size={20} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="px-6 pb-5 text-[0.95rem] leading-relaxed text-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
