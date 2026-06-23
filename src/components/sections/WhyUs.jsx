import { motion } from 'framer-motion';
import { features } from '../../data';
import { Icon } from '../ui/Icon';
import { SectionHeading } from '../ui/primitives';
import { VideoBackdrop } from '../ui/MediaBackdrop';

export default function WhyUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-brand-dark py-28">
      <VideoBackdrop opacity={0.45} scrim="bg-brand-dark/70" />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-brand/30 blur-[100px]" />
      <div className="container relative">
        <SectionHeading
          light
          eyebrow="Why Choose Brainversation"
          title="Professional Support Grounded In"
          em="Compassion"
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:bg-white/[0.1]"
            >
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.08] text-soft">
                <Icon name={f.icon} size={26} strokeWidth={1.8} />
              </div>
              <h3 className="mb-2.5 text-lg font-semibold text-white">{f.title}</h3>
              <p className="text-[0.9rem] leading-relaxed text-white/75">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
