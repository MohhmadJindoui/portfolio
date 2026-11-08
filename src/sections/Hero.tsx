import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, FileDown } from 'lucide-react';
import { useRef } from 'react';
import { MagneticButton } from '../components/MagneticButton';
import { ParticleField } from '../components/ParticleField';
import { TextReveal } from '../components/Reveal';
import { RoleTicker } from '../components/RoleTicker';
import { profile } from '../data/profile';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const yVisual = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const fadeUp = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section id="top" ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20">
      {/* Background: grid, soft lights */}
      <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-electric/20 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-cyan-glow/10 blur-[120px]" />

      <motion.div style={{ y: yVisual, opacity: fade }} className="absolute inset-y-0 right-[-10%] w-full md:w-[62%] opacity-35 md:opacity-100">
        <ParticleField className="h-full w-full" />
      </motion.div>

      <motion.div style={{ y: yText, opacity: fade }} className="container-site relative">
        <motion.p {...fadeUp(0.1)} className="eyebrow mb-7 flex items-center gap-3">
          <span className="h-px w-10 bg-electric-bright/60" />
          {profile.intro}
        </motion.p>

        <h1 className="max-w-5xl font-display text-[clamp(3rem,7.2vw,6.6rem)] leading-[0.95] tracking-[-0.02em]">
          <TextReveal text={profile.headline[0]} delay={0.25} className="block" />
          <TextReveal text={profile.headline[1]} delay={0.5} className="block italic text-gradient" />
        </h1>

        <motion.p {...fadeUp(0.9)} className="mt-8 max-w-xl text-[17px] leading-relaxed text-fg-muted">
          {profile.description}
        </motion.p>

        <motion.div {...fadeUp(1.05)} className="mt-8">
          <RoleTicker roles={profile.roles} />
        </motion.div>

        <motion.div {...fadeUp(1.2)} className="mt-10 flex flex-wrap gap-3">
          <MagneticButton href="#projects">
            Explore My Work <ArrowRight size={17} aria-hidden="true" />
          </MagneticButton>
          {profile.links.resume ? (
            <MagneticButton href={profile.links.resume} variant="ghost" external>
              <FileDown size={17} aria-hidden="true" /> Download Resume
            </MagneticButton>
          ) : (
            <MagneticButton variant="ghost" disabled title="Resume will be available soon">
              <FileDown size={17} aria-hidden="true" /> Resume · coming soon
            </MagneticButton>
          )}
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        {...fadeUp(1.6)}
        className="absolute bottom-7 left-1/2 hidden sm:flex -translate-x-1/2 flex-col items-center gap-2 text-fg-dim hover:text-fg"
        aria-label="Scroll to About section"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="relative flex h-9 w-5 justify-center rounded-full border border-line">
          <motion.span
            className="mt-1.5 h-1.5 w-1 rounded-full bg-electric-bright"
            animate={reduce ? {} : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </span>
        <ArrowDown size={12} className="sr-only" />
      </motion.a>
    </section>
  );
}
