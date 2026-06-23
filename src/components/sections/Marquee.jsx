import { marqueeItems } from '../../data';

export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className="overflow-hidden bg-brand-dark py-4">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.1em] text-cool">
            <span className="text-rose">✦</span> {t}
          </span>
        ))}
      </div>
    </div>
  );
}
