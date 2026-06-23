import { MessageCircle, Phone } from 'lucide-react';
import { Reveal } from '../ui/primitives';

export default function FinalCTA() {
  return (
    <section className="bg-brand-dark py-28 text-center text-white">
      <div className="container max-w-3xl">
        <Reveal>
          <h2 className="section-title !text-white">You Don't Have To Navigate Life's Challenges <em className="not-italic text-rose">Alone.</em></h2>
          <p className="mx-auto mt-4 text-lg text-white/80">Healing begins when you're heard, understood, and supported.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="#contact" className="btn bg-rose text-white hover:bg-rose-dark hover:-translate-y-0.5">Book A Consultation</a>
            <a href="https://wa.me/917448845098" target="_blank" rel="noreferrer" className="btn btn-ghost-light">
              <MessageCircle size={18} /> WhatsApp Now
            </a>
            <a href="tel:+917448845098" className="btn btn-ghost-light"><Phone size={18} /> Call Now</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
