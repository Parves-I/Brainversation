import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

/**
 * Two glowing neural filaments pinned to the left & right viewport edges that
 * DRAW themselves as you scroll (framer-motion pathLength bound to scroll
 * progress), with pulsing synapse nodes. Decorative, desktop only.
 */
function Filament({ progress, side }) {
  const left = side === 'left';
  // gentle vertical meander within a 170-wide column
  const d = left
    ? 'M120 -20 C 30 180, 150 340, 80 520 S 10 820, 110 1020 S 40 1180, 90 1240'
    : 'M50 -20 C 140 180, 20 340, 90 520 S 160 820, 60 1020 S 130 1180, 80 1240';
  const nodes = left ? [[80, 520], [110, 1020], [120, 60]] : [[90, 520], [60, 1020], [50, 60]];

  return (
    <svg
      className={`absolute top-0 h-full w-[170px] ${left ? 'left-0' : 'right-0'}`}
      viewBox="0 0 170 1200" preserveAspectRatio="none" fill="none"
    >
      <g style={{ filter: 'drop-shadow(0 0 6px rgba(167,139,250,0.5))' }}>
        <motion.path d={d} stroke="url(#threadGrad)" strokeWidth="1.6" strokeLinecap="round" style={{ pathLength: progress }} />
      </g>
      <motion.g style={{ opacity: useTransform(progress, [0, 0.06, 1], [0, 1, 1]) }}>
        {nodes.map(([cx, cy], i) => (
          <motion.circle
            key={i} cx={cx} cy={cy} r="3.5" fill="#C4B5FD" vectorEffect="non-scaling-stroke"
            animate={{ scale: [1, 1.7, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </motion.g>
    </svg>
  );
}

export default function ScrollThread() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 30, mass: 0.5 });
  const progressB = useTransform(progress, [0.03, 1], [0, 1]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[2] hidden opacity-70 lg:block">
      <svg width="0" height="0">
        <defs>
          <linearGradient id="threadGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#C4B5FD" stopOpacity="0" />
            <stop offset="0.12" stopColor="#C4B5FD" stopOpacity="0.95" />
            <stop offset="0.82" stopColor="#7C3AED" stopOpacity="0.95" />
            <stop offset="1" stopColor="#7C3AED" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <Filament progress={progress} side="left" />
      <Filament progress={progressB} side="right" />
    </div>
  );
}
