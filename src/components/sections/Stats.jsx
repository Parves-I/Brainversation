import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { stats } from '../../data';

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);
  return (
    <span ref={ref} className="font-display text-[clamp(2rem,1.5rem+3vw,3.5rem)] font-bold leading-none text-white">
      {n}
      <span className="text-rose">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  return (
    <div className="bg-brand-600 py-12">
      <div className="container grid grid-cols-2 gap-y-8 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative px-2 text-center lg:border-l lg:border-white/20 lg:first:border-l-0"
          >
            <Counter value={s.value} suffix={s.suffix} />
            <span className="mt-2 block text-xs font-medium uppercase tracking-[0.08em] text-white/70">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
