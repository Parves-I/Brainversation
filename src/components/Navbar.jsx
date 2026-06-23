import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../data';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 inset-x-0 z-[1000] transition-all duration-300',
        scrolled ? 'py-2.5 bg-cream/80 backdrop-blur-xl backdrop-saturate-150 border-b border-border' : 'py-4'
      )}
    >
      <div className="container flex items-center justify-between">
        <a href="#hero" className="font-display text-xl font-semibold text-brand-dark">Brainversation.</a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="group relative text-sm font-medium text-brand-dark transition-colors hover:text-brand">
              {l.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a href="#contact" className="rounded-full bg-brand-dark px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand">
            Book Consultation
          </a>
        </div>

        <button className="md:hidden p-2 text-brand-dark" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          'md:hidden fixed top-0 right-0 h-screen w-72 bg-cream shadow-2xl flex flex-col gap-6 px-10 pt-24 transition-transform duration-300',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {navLinks.map((l) => (
          <a key={l.href} href={l.href} className="text-lg font-medium text-brand-dark" onClick={() => setOpen(false)}>{l.label}</a>
        ))}
        <a href="#contact" className="btn btn-primary mt-2" onClick={() => setOpen(false)}>Book Consultation</a>
      </div>
    </nav>
  );
}
