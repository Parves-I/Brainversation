/**
 * Subtle atmospheric depth for plain light sections: soft blurred gradient
 * orbs + a faint dotted "constellation". Purely decorative, behind content.
 * Place as the first child of a `relative overflow-hidden` section.
 */
export function Aura({ variant = 'left' }) {
  const right = variant === 'right';
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* soft orbs */}
      <div
        className={`absolute h-80 w-80 rounded-full bg-brand/[0.07] blur-[90px] ${right ? '-right-24 top-10' : '-left-24 top-16'}`}
      />
      <div
        className={`absolute h-72 w-72 rounded-full bg-rose/[0.06] blur-[90px] ${right ? '-left-20 bottom-0' : '-right-20 bottom-4'}`}
      />
      {/* dotted constellation */}
      <svg
        className={`absolute top-1/2 hidden -translate-y-1/2 text-brand/20 md:block ${right ? 'left-6' : 'right-6'}`}
        width="120" height="220" viewBox="0 0 120 220" fill="none"
      >
        {[[20, 20], [70, 50], [30, 90], [90, 110], [40, 150], [80, 185], [20, 200]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.5" fill="currentColor" />
        ))}
        <path d="M20 20 L70 50 L30 90 L90 110 L40 150 L80 185 L20 200" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" />
      </svg>
    </div>
  );
}
