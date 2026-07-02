import floralCorner from '../../../assets/floral-corner.png';

/**
 * Decorative AI-painted watercolor floral spray tucked into a section corner.
 * The source art clusters in the top-left and trails out diagonally, so every
 * corner is produced by mirroring a single image. Rendered with
 * `mix-blend-multiply` so its white background melts into light (cream / wash)
 * section backgrounds with no hard image edge.
 *
 * Purely decorative: place inside a `relative overflow-hidden` section and
 * BEFORE the content container so it sits behind the content. Hidden on small
 * screens to avoid crowding.
 */
const POS = {
  tl: 'top-0 left-0',
  tr: 'top-0 right-0 -scale-x-100',
  bl: 'bottom-0 left-0 -scale-y-100',
  br: 'bottom-0 right-0 rotate-180',
};

export function FloralCorner({ at = 'tl', className = '' }) {
  return (
    <img
      src={floralCorner}
      alt=""
      aria-hidden
      draggable={false}
      className={`pointer-events-none absolute z-0 hidden w-44 select-none opacity-[0.55] mix-blend-multiply sm:block lg:w-60 ${POS[at]} ${className}`}
    />
  );
}
