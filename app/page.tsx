import { Navbar } from "./components/Navbar";
import { HeroName } from "./components/HeroName";
import { ScrollSequence } from "./components/ScrollSequence";
import { AboutMe } from "./components/AboutMe";
import { Story } from "./components/Story";
import { Work } from "./components/Work";
import { Services } from "./components/Services";
import { Process } from "./components/Process";
import { FAQ } from "./components/FAQ";
import { Testimonials } from "./components/Testimonials";
import { LogoMarquee } from "./components/LogoMarquee";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Act 1 — kinetic name reveal (dark) */}
        <HeroName />
        {/* Act 2 — scroll-driven camera reveal (white studio) */}
        <ScrollSequence />
        {/* Act 3 — About: outline -> white fill on scroll (dark) */}
        <AboutMe />
        {/* Act 4 — Story: long-form bio + real photos (dark) */}
        <Story />
        {/* Act 5 — Work: video gallery + lightbox (dark) */}
        <Work />
        {/* Act 6 — Services: accordion packages with stills (white) */}
        <Services />
        {/* Act 7 — My Practice: scroll-driven workflow timeline (dark) */}
        <Process />
        {/* Act 8 — FAQ: two-column sticky accordion (white) */}
        <FAQ />
        {/* Act 9 — Testimonials: auto-advancing pull-quote carousel (dark) */}
        <Testimonials />
        {/* Act 10 — Worked-with client logo marquee (dark band) */}
        <LogoMarquee />
        {/* Act 11 — Contact: CTA + form (white) */}
        <Contact />
      </main>
      {/* Footer (dark) */}
      <Footer />
    </>
  );
}
