import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

// Reusable scroll-reveal wrapper
export function Reveal({ children, className, delay = 0, y = 40, once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Section heading block (eyebrow + title with emphasised word + optional subtitle)
export function SectionHeading({ eyebrow, title, em, subtitle, center = true, light = false }) {
  return (
    <div className={cn('max-w-2xl', center && 'mx-auto text-center')}>
      <Reveal>
        <p className={cn('eyebrow mb-3', light && 'text-soft')}>{eyebrow}</p>
        <h2 className={cn('section-title mb-5', light && '!text-white')}>
          {title} {em && <em className={cn('not-italic', light ? 'text-soft' : 'text-brand')}>{em}</em>}
        </h2>
        {subtitle && <p className={cn('lead', center && 'mx-auto', light && '!text-white/80')}>{subtitle}</p>}
      </Reveal>
    </div>
  );
}
