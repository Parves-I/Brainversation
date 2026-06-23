import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import NeuralCanvas from '../NeuralCanvas';

const trust = [
  'Consultant Psychologist & Psychotherapist',
  'Apollo Hospitals Experience',
  '255+ Individuals Supported',
  'Evidence-Based Approaches',
  'Online & In-Person',
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-grad-soft pt-32 pb-28">
      {/* particle field */}
      <NeuralCanvas className="absolute inset-0 h-full w-full" />

      {/* gradient orbs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-brand/30 blur-[80px] animate-blob" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-rose/25 blur-[80px] animate-blob" style={{ animationDelay: '-4s' }} />
      <div className="pointer-events-none absolute right-[15%] top-[30%] h-56 w-56 rounded-full bg-soft/40 blur-[80px] animate-blob" style={{ animationDelay: '-8s' }} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container relative z-10 max-w-4xl text-center"
      >
        <motion.span variants={item} className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand backdrop-blur">
          <Sparkles size={14} /> Counselling &amp; Psychotherapy
        </motion.span>

        <motion.h1 variants={item} className="mt-6 font-display text-[clamp(2.6rem,2rem+4.5vw,5.2rem)] font-bold leading-[1.08] text-brand-dark">
          Every Healing Journey Begins With{' '}
          <em className="not-italic text-brand">A Conversation.</em>
        </motion.h1>

        <motion.p variants={item} className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          At Brainversation, we provide a safe, confidential, and supportive space where meaningful conversations lead to understanding, healing, and positive change.
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap justify-center gap-4">
          <a href="#contact" className="btn btn-primary">Book A Consultation</a>
          <a href="#contact" className="btn btn-outline">Talk To A Psychologist</a>
        </motion.div>

        <motion.div variants={item} className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {trust.map((t) => (
            <span key={t} className="flex items-center gap-2 text-xs text-brand-dark/80">
              <span className="text-rose">✦</span> {t}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.7rem] uppercase tracking-[0.15em] text-brand-dark/70">
        Scroll
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-brand-dark/60 to-transparent" />
      </div>
    </section>
  );
}
