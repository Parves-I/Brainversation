import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import Marquee from './components/sections/Marquee';
import Stats from './components/sections/Stats';
import About from './components/sections/About';
import Services from './components/sections/Services';
import WhyUs from './components/sections/WhyUs';
import Psychologist from './components/sections/Psychologist';
import Credentials from './components/sections/Credentials';
import Approach from './components/sections/Approach';
import Testimonials from './components/sections/Testimonials';
import TherapyCTA from './components/sections/TherapyCTA';
import FAQ from './components/sections/FAQ';
import Contact from './components/sections/Contact';
import FinalCTA from './components/sections/FinalCTA';
import Footer from './components/sections/Footer';

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <About />
        <Services />
        <WhyUs />
        <Psychologist />
        <Credentials />
        <Approach />
        <Testimonials />
        <TherapyCTA />
        <FAQ />
        <Contact />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}
