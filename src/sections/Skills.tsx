import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { skillCategories } from '../data/skills';
import { trackCardGlow } from '../hooks/useSpotlight';

const ALL = 'all';

export function Skills() {
  const [filter, setFilter] = useState<string>(ALL);

  const visible = useMemo(
    () => (filter === ALL ? skillCategories : skillCategories.filter((c) => c.id === filter)),
    [filter],
  );
  const total = skillCategories.reduce((n, c) => n + c.skills.length, 0);

  return (
    <section id="skills" className="relative py-28 md:py-36">
      <div className="absolute inset-x-0 top-0 hairline" />
      <div className="container-site">
        <SectionHeading
          index="02"
          label="Technical skills"
          title={
            <>
              The toolkit, <span className="italic text-fg-muted">by category.</span>
            </>
          }
          intro="Technologies I've used in coursework and projects. Filter by area to focus on what matters to you."
        />

        <Reveal>
          <div role="tablist" aria-label="Skill categories" className="mb-10 flex flex-wrap gap-2">
            <LayoutGroup id="skill-filter">
              <FilterButton active={filter === ALL} onClick={() => setFilter(ALL)} label="All" count={total} />
              {skillCategories.map((c) => (
                <FilterButton
                  key={c.id}
                  active={filter === c.id}
                  onClick={() => setFilter(c.id)}
                  label={c.label}
                  count={c.skills.length}
                />
              ))}
            </LayoutGroup>
          </div>
        </Reveal>

        <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((cat) => {
              const Icon = cat.icon;
              return (
                <motion.article
                  key={cat.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  onPointerMove={trackCardGlow}
                  className={`card-glow group rounded-3xl border border-line bg-ink-900/60 p-6 transition-colors hover:border-electric/40 ${
                    filter !== ALL ? 'sm:col-span-2 lg:col-span-3' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-electric/30 bg-electric/10 text-electric-bright transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[11px] text-fg-dim">{String(cat.skills.length).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-medium">{cat.label}</h3>
                  <p className="mt-1 text-sm text-fg-muted">{cat.blurb}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {cat.skills.map((s, i) => (
                      <motion.li
                        key={s}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.03 * i }}
                        className="rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-[13px] text-fg transition-colors hover:border-cyan-glow/50 hover:text-cyan-soft"
                      >
                        {s}
                      </motion.li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function FilterButton({ active, onClick, label, count }: { active: boolean; onClick: () => void; label: string; count: number }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`relative rounded-full px-4 py-2 text-sm transition-colors ${active ? 'text-white' : 'text-fg-muted hover:text-fg'} border ${
        active ? 'border-transparent' : 'border-line'
      }`}
    >
      {active && (
        <motion.span
          layoutId="skill-pill"
          className="absolute inset-0 -z-10 rounded-full bg-electric"
          transition={{ type: 'spring', stiffness: 400, damping: 34 }}
        />
      )}
      {label}
      <span className={`ml-2 font-mono text-[11px] ${active ? 'text-white/70' : 'text-fg-dim'}`}>{count}</span>
    </button>
  );
}
