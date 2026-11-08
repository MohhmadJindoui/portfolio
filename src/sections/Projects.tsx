import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, ChevronDown, Github, Hammer } from 'lucide-react';
import { useState } from 'react';
import { ProjectPreview } from '../components/ProjectPreview';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { projects, type Project } from '../data/projects';
import { trackCardGlow } from '../hooks/useSpotlight';

export function Projects() {
  return (
    <section id="projects" className="relative py-28 md:py-36">
      <div className="absolute inset-x-0 top-0 hairline" />
      <div className="container-site">
        <SectionHeading
          index="03"
          label="Featured projects"
          title={
            <>
              Selected work, <span className="italic text-fg-muted">problem first.</span>
            </>
          }
          intro="Each project starts with a real problem. Open a case study for the thinking behind it."
        />

        <div className="space-y-24 md:space-y-32">
          {projects.map((p, i) => (
            <ProjectRow key={p.id} project={p} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

const statusStyle: Record<string, string> = {
  Completed: 'border-cyan-glow/30 bg-cyan-glow/10 text-cyan-soft',
  'In development': 'border-amber-400/30 bg-amber-400/10 text-amber-200',
  'Design Thinking / UX': 'border-violet-soft/40 bg-violet-soft/10 text-violet-200',
};

function ProjectRow({ project: p, flip }: { project: Project; flip: boolean }) {
  const [open, setOpen] = useState(false);
  const caseId = `case-${p.id}`;

  return (
    <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12" aria-labelledby={`title-${p.id}`}>
      {/* Preview */}
      <Reveal className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
        <motion.div
          onPointerMove={trackCardGlow}
          whileHover={{ y: -6 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="card-glow group relative aspect-[16/10] overflow-hidden rounded-3xl border border-line bg-ink-900"
        >
          <div className="flex h-9 items-center gap-1.5 border-b border-line bg-ink-950/60 px-4">
            <i className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <i className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <i className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="ml-3 font-mono text-[11px] text-fg-dim">{p.id}</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 top-9 transition-transform duration-700 group-hover:scale-[1.03]">
            <ProjectPreview project={p} />
          </div>
        </motion.div>
      </Reveal>

      {/* Text */}
      <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-sm text-electric-bright">{p.index}</span>
            <span className="eyebrow">{p.category}</span>
            {p.status && (
              <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[10.5px] ${statusStyle[p.status]}`}>
                {p.status}
              </span>
            )}
          </div>
          <h3 id={`title-${p.id}`} className="mt-4 font-display text-[clamp(2.2rem,4vw,3.2rem)] leading-none tracking-tight">
            {p.title}
          </h3>
          <p className="mt-2 text-fg-muted">{p.tagline}</p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-6 rounded-2xl border-l-2 border-electric/60 bg-electric/[0.04] py-3 pl-4 pr-3">
            <p className="eyebrow mb-1 text-electric-bright">Problem</p>
            <p className="text-[15px] leading-relaxed">{p.problem}</p>
          </div>
          <p className="mt-5 text-[15px] leading-relaxed text-fg-muted">{p.description}</p>
        </Reveal>

        <Reveal delay={0.12}>
          <ul className="mt-6 space-y-2">
            {p.features.map((f) => (
              <li key={f.label} className="flex items-start gap-2.5 text-[14.5px]">
                {f.inDevelopment ? (
                  <Hammer size={15} className="mt-1 shrink-0 text-amber-300" aria-hidden="true" />
                ) : (
                  <Check size={15} className="mt-1 shrink-0 text-cyan-glow" aria-hidden="true" />
                )}
                <span>
                  {f.label}
                  {f.inDevelopment && <span className="ml-2 font-mono text-[11px] text-amber-200/80">in development</span>}
                </span>
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technology stack">
            {p.stack.map((t) => (
              <li key={t} className="rounded-md border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-[11.5px] text-fg-muted">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-electric/50"
              >
                <Github size={15} aria-hidden="true" /> GitHub
              </a>
            )}
            {p.demo && (
              <a
                href={p.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-electric px-4 py-2 text-sm text-white transition-colors hover:bg-electric-bright"
              >
                Live demo <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            )}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls={caseId}
              className="inline-flex items-center gap-2 rounded-full px-2 py-2 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              Case study
              <ChevronDown size={15} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={caseId}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <ol className="mt-5 space-y-4 border-l border-line pl-5">
                  {p.caseStudy.map((c) => (
                    <li key={c.heading}>
                      <p className="font-medium">{c.heading}</p>
                      <p className="mt-0.5 text-sm text-fg-muted">{c.body}</p>
                    </li>
                  ))}
                </ol>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </article>
  );
}
