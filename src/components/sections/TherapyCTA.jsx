import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { checklistItems } from '../../data';

export default function TherapyCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 to-brand-dark py-28 text-white">
      <div className="pointer-events-none absolute -left-20 top-10 h-80 w-80 rounded-full bg-rose/20 blur-[100px]" />
      <div className="container relative max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="section-title !text-white"
        >
          Is This The Right Time To Seek <em className="not-italic text-soft">Therapy?</em>
        </motion.h2>
        <p className="lead mx-auto mt-4 !text-white/85">You may benefit from counselling if:</p>

        <div className="mx-auto mt-9 grid max-w-xl gap-3 text-left">
          {checklistItems.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-3.5 transition-all hover:translate-x-1.5 hover:bg-white/15"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-soft/90 text-brand-dark">
                <Check size={14} strokeWidth={3} />
              </span>
              <span className="text-[0.95rem]">{item}</span>
            </motion.div>
          ))}
        </div>
        <p className="mx-auto mt-7 max-w-xl text-sm italic text-white/75">
          You don't need to be in crisis to seek support. Sometimes, a conversation is the first step toward positive change.
        </p>
      </div>
    </section>
  );
}
