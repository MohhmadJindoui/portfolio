import { ArrowUpRight, Check, Copy, FileDown, Github, Linkedin, Mail } from 'lucide-react';
import { MagneticButton } from '../components/MagneticButton';
import { Reveal } from '../components/Reveal';
import { profile } from '../data/profile';
import { useCopy } from '../hooks/useCopy';
import { trackCardGlow } from '../hooks/useSpotlight';

export function Contact() {
  const { email, linkedin, github, resume } = profile.links;
  const { status, copy } = useCopy();

  return (
    <section id="contact" className="relative overflow-hidden py-28 md:py-40">
      <div className="absolute inset-x-0 top-0 hairline" />
      <div className="absolute left-1/2 top-1/2 h-[480px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/15 blur-[140px]" />
      <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      <div className="container-site relative text-center">
        <Reveal>
          <p className="eyebrow mb-6">05 · Contact</p>
          <h2 className="mx-auto max-w-4xl font-display text-[clamp(2.8rem,8vw,6.4rem)] leading-[0.98] tracking-tight">
            Let's Build Something <span className="italic text-gradient">Meaningful.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-[17px] leading-relaxed text-fg-muted">
            I'm open to student opportunities, software development roles, collaborations, and interesting technical
            challenges.
          </p>
        </Reveal>

        {email && (
          <Reveal delay={0.1} className="mt-10 flex flex-col items-center gap-3">
            <div className="glass inline-flex max-w-full items-center gap-1 rounded-full p-1.5 pl-5">
              <Mail size={16} className="shrink-0 text-electric-bright" aria-hidden="true" />
              <a href={`mailto:${email}`} className="truncate px-2 font-mono text-[14px] text-fg hover:text-electric-bright sm:text-[15px]">
                {email}
              </a>
              <button
                type="button"
                onClick={() => copy(email)}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-electric px-4 py-2 text-sm text-white transition-colors hover:bg-electric-bright"
                aria-label="Copy email address"
              >
                {status === 'copied' ? <Check size={15} /> : <Copy size={15} />}
                {status === 'copied' ? 'Copied' : status === 'error' ? 'Select & copy' : 'Copy'}
              </button>
            </div>
            <span className="sr-only" aria-live="polite">
              {status === 'copied' ? 'Email copied to clipboard' : ''}
            </span>
          </Reveal>
        )}

        <Reveal delay={0.18} className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-3">
          <LinkCard href={linkedin} icon={<Linkedin size={18} />} label="LinkedIn" sub="mohammad-heib" />
          <LinkCard href={github} icon={<Github size={18} />} label="GitHub" sub={github ? github.replace('https://github.com/', '') : 'Coming soon'} />
          <LinkCard href={resume} icon={<FileDown size={18} />} label="Resume" sub={resume ? 'Download PDF' : 'Coming soon'} />
        </Reveal>

        {!email && (
          <Reveal delay={0.2} className="mt-10">
            <MagneticButton href={linkedin}>Message me on LinkedIn</MagneticButton>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function LinkCard({ href, icon, label, sub }: { href: string | null; icon: React.ReactNode; label: string; sub: string }) {
  const inner = (
    <>
      <span className="grid h-10 w-10 place-items-center rounded-xl border border-line text-electric-bright" aria-hidden="true">
        {icon}
      </span>
      <span className="flex-1 text-left">
        <span className="block font-medium">{label}</span>
        <span className="block truncate font-mono text-[11.5px] text-fg-dim">{sub}</span>
      </span>
      {href && <ArrowUpRight size={16} className="text-fg-dim transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" aria-hidden="true" />}
    </>
  );
  const cls = 'card-glow group flex items-center gap-3 rounded-2xl border border-line bg-ink-900/70 p-4 transition-colors';

  if (!href) {
    return <div className={`${cls} opacity-60`}>{inner}</div>;
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" onPointerMove={trackCardGlow} className={`${cls} hover:border-electric/50`}>
      {inner}
    </a>
  );
}
