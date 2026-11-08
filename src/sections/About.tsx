import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, MapPin, Languages, Target } from 'lucide-react';
import { useRef } from 'react';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { aboutFocus, profile, timeline } from '../data/profile';
import { trackCardGlow } from '../hooks/useSpotlight';

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 40, reduce ? 0 : -40]);
  const edu = timeline[0];

  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="container-site">
        <SectionHeading
          index="01"
          label="About"
          title={
            <>
              Engineering fundamentals, <span className="italic text-fg-muted">applied.</span>
            </>
          }
        />

        <div ref={ref} className="grid gap-10 lg:grid-cols-12">
          {/* Left — editorial text */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-[clamp(1.25rem,2.2vw,1.6rem)] leading-[1.5] text-fg">
                I'm a <span className="text-electric-bright">third-year Information Systems student</span> at Yezreel
                Valley College, specializing in Software Technologies. I combine software engineering fundamentals,
                analytical thinking and hands-on development to build systems that solve concrete problems.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl leading-relaxed text-fg-muted">
                My work spans object-oriented Java systems, relational databases, full-stack web apps in React and
                Node.js, and AI-assisted data tools. I care about understanding <em>why</em> a design works, not only
                how to write it, and I'm heading toward {profile.careerGoals.slice(0, 3).join(', ').toLowerCase()} and
                data-driven AI work.
              </p>
            </Reveal>

            <ul className="mt-12 grid gap-3 sm:grid-cols-2">
              {aboutFocus.map((f, i) => (
                <Reveal as="li" key={f.title} delay={0.04 * i}>
                  <div
                    onPointerMove={trackCardGlow}
                    className="card-glow group h-full rounded-2xl border border-line bg-ink-900/60 p-5 transition-colors hover:border-electric/40"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[11px] text-fg-dim">{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="font-medium">{f.title}</h3>
                    </div>
                    <p className="mt-1.5 pl-8 text-sm text-fg-muted">{f.note}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Right — offset column with facts + education */}
          <motion.aside style={{ y }} className="lg:col-span-5 lg:pl-8 lg:pt-24">
            <Reveal className="glass rounded-3xl p-7">
              <p className="eyebrow mb-6">At a glance</p>
              <dl className="space-y-5 text-[15px]">
                <Fact icon={<GraduationCap size={16} />} k="Studying" v="B.Sc. Information Systems" />
                <Fact icon={<Target size={16} />} k="Focus" v="Software Technologies" />
                <Fact icon={<MapPin size={16} />} k="Based in" v={profile.location} />
                <Fact icon={<Languages size={16} />} k="Languages" v={profile.languages.join(' · ')} />
              </dl>
            </Reveal>

            <Reveal delay={0.15} className="mt-6 rounded-3xl border border-line p-7">
              <p className="eyebrow mb-6">Education</p>
              <ol className="relative border-l border-line pl-6">
                <li className="relative">
                  <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-electric-bright shadow-[0_0_0_4px_rgba(59,130,246,0.2)]" />
                  <p className="font-mono text-[12px] text-electric-bright">{edu.period}</p>
                  <h3 className="mt-1 font-medium leading-snug">{edu.title}</h3>
                  <p className="mt-1 text-sm text-fg-muted">{edu.org}</p>
                  {edu.status && (
                    <span className="mt-3 inline-block rounded-full border border-cyan-glow/30 bg-cyan-glow/10 px-3 py-1 font-mono text-[11px] text-cyan-soft">
                      {edu.status}
                    </span>
                  )}
                </li>
                <li className="relative mt-8">
                  <span className="absolute -left-[29px] top-1.5 h-1.5 w-1.5 rounded-full bg-fg-dim" />
                  <p className="font-mono text-[12px] text-fg-dim">2027</p>
                  <p className="mt-1 text-sm text-fg-muted">Expected graduation</p>
                </li>
              </ol>
            </Reveal>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function Fact({ icon, k, v }: { icon: React.ReactNode; k: string; v: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-electric-bright" aria-hidden="true">
        {icon}
      </span>
      <div>
        <dt className="text-fg-dim text-[13px]">{k}</dt>
        <dd className="text-fg">{v}</dd>
      </div>
    </div>
  );
}
