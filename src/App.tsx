import { MotionConfig, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { useSpotlight } from './hooks/useSpotlight';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { Hero } from './sections/Hero';
import { Journey } from './sections/Journey';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';

export default function App() {
  useSpotlight();

  return (
    <MotionConfig reducedMotion="user">
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-electric focus:px-4 focus:py-2">
        Skip to content
      </a>
      <div className="spotlight" aria-hidden="true" />
      <Navbar />
      {/* Page entrance */}
      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </motion.main>
      <div className="relative z-10">
        <Footer />
      </div>
    </MotionConfig>
  );
}
