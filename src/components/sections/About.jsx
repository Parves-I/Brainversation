import { motion } from 'framer-motion';
import { Sun, TrendingUp } from 'lucide-react';
import { Reveal } from '../ui/primitives';

export default function About() {
  return (
    <section id="about" className="bg-cream py-28">
      <div className="container grid items-center gap-16 md:grid-cols-2">
        <Reveal>
          <p className="eyebrow mb-3">About Brainversation</p>
          <h2 className="section-title mb-5">A Safe Space To Be Heard, Understood &amp; <em className="not-italic text-brand">Supported</em></h2>
          <div className="space-y-4 text-muted">
            <p>Mental health is not merely the absence of problems—it is the ability to understand yourself, manage challenges effectively, build resilience, and live a meaningful life.</p>
            <p>We believe that everyone deserves a compassionate and non-judgmental environment where they can openly express their thoughts, emotions, fears, and aspirations.</p>
            <p>We work collaboratively with individuals to help them gain emotional clarity, develop healthy coping strategies, strengthen relationships, and enhance overall wellbeing.</p>
          </div>
          <a href="#services" className="btn btn-primary mt-7">Learn More</a>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <div className="overflow-hidden rounded-3xl shadow-soft">
            <img src="/assets/about_image.png" alt="Calming therapy space" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute -bottom-6 -right-4 flex gap-4 rounded-2xl border border-border bg-white/70 p-5 shadow-card backdrop-blur-md"
          >
            <div className="text-center text-sm font-semibold text-brand-dark">
              <Sun className="mx-auto mb-1.5 text-brand" size={22} /> Emotional<br />Clarity
            </div>
            <div className="text-center text-sm font-semibold text-brand-dark">
              <TrendingUp className="mx-auto mb-1.5 text-brand" size={22} /> Personal<br />Growth
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
