import { Reveal } from './Reveal';

type Props = {
  index: string;
  label: string;
  title: React.ReactNode;
  intro?: string;
};

export function SectionHeading({ index, label, title, intro }: Props) {
  return (
    <div className="mb-14 grid gap-6 md:grid-cols-12 md:items-end">
      <Reveal className="md:col-span-7">
        <p className="eyebrow mb-5 flex items-center gap-3">
          <span className="text-electric-bright">{index}</span>
          <span className="h-px w-8 bg-line" />
          {label}
        </p>
        <h2 className="font-display text-[clamp(2.4rem,5.5vw,4.4rem)] leading-[1.02] tracking-tight">{title}</h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1} className="md:col-span-5">
          <p className="max-w-md text-[15.5px] leading-relaxed text-fg-muted md:ml-auto">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
