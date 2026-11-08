import { Briefcase, GraduationCap, Plus } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { experience, timeline, type TimelineItem } from '../data/profile';

export function Journey() {
  return (
    <section id="journey" className="relative py-28 md:py-36">
      <div className="absolute inset-x-0 top-0 hairline" />
      <div className="container-site">
        <SectionHeading
          index="04"
          label="Experience & education"
          title={
            <>
              The path <span className="italic text-fg-muted">so far.</span>
            </>
          }
        />

        <div className="grid gap-12 lg:grid-cols-2">
          <Column title="Education" icon={<GraduationCap size={16} />}>
            {timeline.map((t) => (
              <Entry key={t.title} item={t} />
            ))}
          </Column>

          <Column title="Practical experience" icon={<Briefcase size={16} />}>
            {experience.length > 0 ? (
              experience.map((t) => <Entry key={t.title + t.org} item={t} />)
            ) : (
              <Reveal>
                <div className="flex items-start gap-4 rounded-2xl border border-dashed border-line p-6">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-fg-dim">
                    <Plus size={16} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-medium">Open to my first role</p>
                    <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                      Looking for internships and student positions in software development, backend, full-stack or
                      data. This space will grow with real experience.
                    </p>
                  </div>
                </div>
              </Reveal>
            )}
          </Column>
        </div>
      </div>
    </section>
  );
}

function Column({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <Reveal>
        <p className="eyebrow mb-6 flex items-center gap-2">
          <span className="text-electric-bright" aria-hidden="true">
            {icon}
          </span>
          {title}
        </p>
      </Reveal>
      <ol className="space-y-6">{children}</ol>
    </div>
  );
}

function Entry({ item }: { item: TimelineItem }) {
  return (
    <Reveal as="li">
      <div className="glass rounded-2xl p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-mono text-[12px] text-electric-bright">{item.period}</p>
          {item.status && <span className="font-mono text-[11px] text-cyan-soft">{item.status}</span>}
        </div>
        <h3 className="mt-2 text-lg font-medium leading-snug">{item.title}</h3>
        <p className="text-sm text-fg-muted">{item.org}</p>
        <ul className="mt-4 space-y-1.5 text-sm text-fg-muted">
          {item.details.map((d) => (
            <li key={d} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fg-dim" aria-hidden="true" />
              {d}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
