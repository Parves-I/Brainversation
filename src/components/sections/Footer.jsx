import { navLinks } from '../../data';

export default function Footer() {
  return (
    <footer className="bg-[#241846] py-16 text-white/70">
      <div className="container grid items-center gap-10 text-center md:grid-cols-3 md:text-left">
        <div>
          <h3 className="font-display text-xl font-semibold text-cream">Brainversation.</h3>
          <p className="mt-2 font-display text-sm text-cool">Where Minds Find Clarity, Strength &amp; Growth</p>
        </div>
        <nav className="flex flex-wrap justify-center gap-6">
          <a href="#hero" className="text-sm transition-colors hover:text-rose">Home</a>
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm transition-colors hover:text-rose">{l.label}</a>
          ))}
        </nav>
        <div className="text-sm md:text-right">
          <p>Phone: +91 74488 45098</p>
          <p className="break-all">Email: chaandinibalachandran@gmail.com</p>
        </div>
      </div>
      <div className="container mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Brainversation. All Rights Reserved.
      </div>
    </footer>
  );
}
