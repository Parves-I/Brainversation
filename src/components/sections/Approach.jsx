import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { steps } from '../../data';
import { SectionHeading } from '../ui/primitives';

export default function Approach() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.4 });

  return (
    <section id="approach" className="bg-wash py-28">
      <div className="container" ref={ref}>
        <SectionHeading eyebrow="Our Approach" title="What To" em="Expect" />

        <div className="relative mt-16">
          {/* connecting line (desktop) */}
          <div className="absolute left-[12%] right-[12%] top-8 hidden h-0.5 bg-brand/15 lg:block">
            <motion.div style={{ scaleX }} className="h-full origin-left bg-grad-brand" />
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-center"
              >
                <div className="relative z-10 mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-dark font-display text-xl font-bold text-white shadow-card">
                  {s.num}
                </div>
                <h3 className="mb-2 text-[1.05rem] font-semibold text-brand-dark">{s.title}</h3>
                <p className="mx-auto max-w-[15rem] text-sm text-muted">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
