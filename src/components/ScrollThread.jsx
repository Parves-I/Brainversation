import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

/**
 * Floral growing vines pinned to the left & right viewport edges. The stem
 * DRAWS itself as you scroll (framer-motion pathLength bound to scroll
 * progress) and, just as the line reaches each sprig, leaves unfurl, buds
 * swell and flowers bloom in (scale / rotate / fade keyed to the scroll
 * window around the sprig's position). A few petals drift down for ambient
 * life. Purely decorative, desktop only, motion-reduced friendly.
 *
 * Geometry is authored once for the left vine; the right vine reuses it via a
 * horizontal mirror so the two edges stay symmetrical.
 */

/* viewBox is 170 x 1200 — y maps ~linearly to the viewport, so a sprig at
 * y=600 sits mid-screen and blooms around 50% scroll. */
const VB_H = 1200;

/* Meandering stem threaded through every sprig's anchor point. */
const STEM =
  'M104 -12 C 96 70, 92 112, 92 152 C 92 212, 70 252, 76 292 ' +
  'C 81 332, 78 362, 78 394 C 78 442, 112 482, 110 522 ' +
  'C 108 582, 92 622, 96 664 C 100 722, 70 772, 74 816 ' +
  'C 78 872, 88 916, 86 952 C 84 1012, 108 1042, 104 1076 ' +
  'C 101 1112, 80 1126, 82 1152 C 83 1178, 88 1198, 86 1232';

/* Sprigs anchored on the stem (left vine). type: leaf | bud | flower. */
const SPRIGS = [
  { type: 'leaf', x: 92, y: 152, rot: -24, scale: 0.95, flip: false },
  { type: 'bud', x: 76, y: 292, rot: -8, scale: 0.9 },
  { type: 'flower', x: 78, y: 394, rot: 0, scale: 1.12, rose: true, petals: 6 },
  { type: 'leaf', x: 110, y: 522, rot: 28, scale: 1.0, flip: true },
  { type: 'flower', x: 96, y: 664, rot: 12, scale: 0.95, rose: false, petals: 7 },
  { type: 'leaf', x: 74, y: 816, rot: -26, scale: 0.9, flip: false },
  { type: 'flower', x: 86, y: 952, rot: -6, scale: 1.08, rose: true, petals: 6 },
  { type: 'bud', x: 104, y: 1076, rot: 18, scale: 0.85 },
  { type: 'flower', x: 82, y: 1152, rot: 0, scale: 0.85, rose: false, petals: 6 },
];

/* Petals that drift down behind the vine (left coords, mirrored on the right). */
const DRIFT = [
  { x: 70, startY: 120, dur: 15, delay: 0, rose: true },
  { x: 102, startY: 520, dur: 18, delay: 3.5, rose: false },
  { x: 84, startY: 870, dur: 16, delay: 7, rose: true },
];

/* --------------------------------- shapes -------------------------------- */

function Flower({ rose = false, petals = 6 }) {
  const outer = rose ? 'url(#petalRose)' : 'url(#petalLav)';
  const inner = rose ? '#D67BA6' : '#A78BFA';
  const halo = rose ? 'rgba(230,155,190,0.22)' : 'rgba(167,139,250,0.22)';
  const step = 360 / petals;
  const idx = Array.from({ length: petals });
  return (
    <g>
      {/* soft bloom glow */}
      <circle r="13" fill={halo} />
      {/* full outer petals */}
      {idx.map((_, i) => (
        <path
          key={i}
          d="M0 -1 C -9 -9, -10 -27, 0 -34 C 10 -27, 9 -9, 0 -1 Z"
          fill={outer}
          transform={`rotate(${step * i})`}
          opacity="0.94"
        />
      ))}
      {/* smaller inner ring, offset between the outer petals */}
      {idx.map((_, i) => (
        <path
          key={`in${i}`}
          d="M0 -1 C -5 -6, -6 -16, 0 -20 C 6 -16, 5 -6, 0 -1 Z"
          fill={inner}
          transform={`rotate(${step * i + step / 2})`}
          opacity="0.9"
        />
      ))}
      <circle r="5" fill="url(#core)" />
      <circle r="2.2" fill="#FFF7E0" />
    </g>
  );
}

function Leaf({ flip = false }) {
  return (
    <g transform={flip ? 'scale(-1,1)' : undefined}>
      <path
        d="M0 0 C 11 -7, 18 -21, 12 -38 C 3 -28, -7 -16, 0 0 Z"
        fill="url(#leafGrad)"
        opacity="0.85"
      />
      <path
        d="M1 -2 C 5 -13, 9 -24, 11 -34"
        stroke="#3F7A57"
        strokeOpacity="0.5"
        strokeWidth="1.1"
        fill="none"
      />
    </g>
  );
}

function Bud() {
  return (
    <g>
      {/* sepals */}
      <path
        d="M0 2 C -6 -3, -7 -14, -5 -18 M0 2 C 6 -3, 7 -14, 5 -18"
        stroke="url(#leafGrad)"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M0 -2 C -6 -8, -6 -20, 0 -26 C 6 -20, 6 -8, 0 -2 Z"
        fill="url(#petalRose)"
        opacity="0.92"
      />
      <path
        d="M0 -4 C -3 -8, -3 -18, 0 -22 C 3 -18, 3 -8, 0 -4 Z"
        fill="#D67BA6"
        opacity="0.7"
      />
    </g>
  );
}

/* ----------------------------- one sprig bloom --------------------------- */

function Sprig({ progress, x, y, rot = 0, scale = 1, type, rose, flip, petals, i, reduce }) {
  // Bloom across a short scroll window that ends just as the line arrives.
  const c = y / VB_H;
  const grow = useTransform(progress, [Math.max(0, c - 0.08), Math.min(1, c + 0.015)], [0, 1]);
  const bloom = useSpring(grow, { stiffness: 140, damping: 20, mass: 0.5 });
  const scl = useTransform(bloom, [0, 1], [0, scale]);
  const rt = useTransform(bloom, [0, 1], [rot - 40, rot]);
  const op = useTransform(bloom, [0, 0.3, 1], [0, 1, 1]);

  // Flowers pop from their center; leaves & buds unfurl from their base.
  const origin = type === 'flower' ? 'center' : 'center bottom';
  const shape =
    type === 'leaf' ? <Leaf flip={flip} /> : type === 'bud' ? <Bud /> : <Flower rose={rose} petals={petals} />;

  return (
    <g transform={`translate(${x} ${y})`}>
      <motion.g
        style={{ scale: scl, rotate: rt, opacity: op, transformBox: 'fill-box', transformOrigin: origin }}
      >
        <motion.g
          style={{ transformBox: 'fill-box', transformOrigin: origin }}
          animate={reduce ? undefined : { rotate: [0, 2.4, 0, -2.4, 0] }}
          transition={reduce ? undefined : { duration: 6 + (i % 4), repeat: Infinity, ease: 'easeInOut' }}
        >
          {shape}
        </motion.g>
      </motion.g>
    </g>
  );
}

function DriftPetal({ x, startY, dur, delay, rose }) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{
        y: [startY, startY + 300],
        x: [x, x + 12, x - 8, x + 4],
        rotate: [0, 160, 300, 420],
        opacity: [0, 0.6, 0.6, 0],
      }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path
        d="M0 0 C -3.5 -5, -2.5 -11, 0 -13 C 2.5 -11, 3.5 -5, 0 0 Z"
        fill={rose ? '#D67BA6' : '#B6A7F5'}
      />
    </motion.g>
  );
}

/* --------------------------------- vine ---------------------------------- */

function Vine({ progress, side, reduce }) {
  const left = side === 'left';
  return (
    <svg
      className={`absolute top-0 h-full w-[180px] ${left ? 'left-0' : 'right-0'}`}
      viewBox="0 0 170 1200"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
    >
      {/* mirror the right vine so both edges share one set of geometry */}
      <g transform={left ? undefined : 'translate(170,0) scale(-1,1)'}>
        <g style={{ filter: 'drop-shadow(0 0 5px rgba(124,58,237,0.25))' }}>
          <motion.path
            d={STEM}
            stroke="url(#stemGrad)"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
            style={{ pathLength: progress }}
          />
        </g>

        {!reduce && DRIFT.map((p, i) => <DriftPetal key={`d${i}`} {...p} />)}

        {SPRIGS.map((s, i) => (
          <Sprig key={i} progress={progress} i={i} reduce={reduce} {...s} />
        ))}
      </g>
    </svg>
  );
}

export default function ScrollThread() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 30, mass: 0.5 });
  // slight offset so the two vines don't draw in perfect lockstep
  const progressB = useTransform(progress, [0.03, 1], [0, 1]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[2] hidden opacity-80 lg:block"
    >
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="stemGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#9FC2A8" stopOpacity="0" />
            <stop offset="0.1" stopColor="#8BB89A" stopOpacity="0.9" />
            <stop offset="0.85" stopColor="#5E8E73" stopOpacity="0.9" />
            <stop offset="1" stopColor="#5E8E73" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="leafGrad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#6FA37B" />
            <stop offset="1" stopColor="#A9CBA6" />
          </linearGradient>
          <linearGradient id="petalRose" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#A8326A" />
            <stop offset="1" stopColor="#E69BBE" />
          </linearGradient>
          <linearGradient id="petalLav" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#7C3AED" />
            <stop offset="1" stopColor="#C9BCFB" />
          </linearGradient>
          <radialGradient id="core">
            <stop offset="0" stopColor="#FFF3CF" />
            <stop offset="0.6" stopColor="#F4CE72" />
            <stop offset="1" stopColor="#E0A53A" />
          </radialGradient>
        </defs>
      </svg>

      <Vine progress={progress} side="left" reduce={reduce} />
      <Vine progress={progressB} side="right" reduce={reduce} />
    </div>
  );
}
