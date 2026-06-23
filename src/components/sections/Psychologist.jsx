import { Reveal } from '../ui/primitives';
import { Aura } from '../ui/Aura';

export default function Psychologist() {
  return (
    <section id="psychologist" className="relative overflow-hidden bg-cream py-28">
      <Aura variant="right" />
      <div className="container relative grid items-center gap-16 md:grid-cols-[1fr_1.2fr]">
        <Reveal className="relative mx-auto w-full max-w-sm">
          <div className="relative z-10 overflow-hidden rounded-3xl shadow-soft">
            <img src="/assets/psychologist.png" alt="Chaandini Balachandran" className="aspect-[4/5] w-full object-cover" />
          </div>
          <div className="absolute -bottom-5 -right-5 left-5 top-5 z-0 rounded-3xl border-2 border-brand/60" />
        </Reveal>

        <Reveal delay={0.15}>
          <p className="eyebrow mb-3">Meet Your Psychologist</p>
          <h2 className="section-title mb-2">Chaandini <em className="not-italic text-brand">Balachandran</em></h2>
          <p className="mb-5 text-lg font-medium text-brand">Consultant Psychologist &amp; Psychotherapist</p>
          <div className="space-y-4 text-muted">
            <p>A dedicated mental health professional committed to helping individuals improve their emotional wellbeing through compassionate, evidence-based psychological care.</p>
            <p>She currently serves at Brainversation and works as a Psychologist at Apollo Hospitals, Chennai. She has provided grief counselling support to more than 255 individuals.</p>
            <p>Currently pursuing a PhD in Neuropsychology while continuing to expand her expertise in advanced counselling and psychotherapeutic interventions.</p>
          </div>
          <a href="#contact" className="btn btn-primary mt-7">Book A Session With Chaandini</a>
        </Reveal>
      </div>
    </section>
  );
}
