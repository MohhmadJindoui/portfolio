import { motion, useReducedMotion } from 'framer-motion';
import { ImageOff } from 'lucide-react';
import type { Project } from '../data/projects';

const accentHex = { blue: '#5B9BFF', cyan: '#22D3EE', violet: '#8B7CF6' } as const;

/**
 * Shows the real screenshot when provided; otherwise an abstract, clearly
 * labeled animated placeholder that hints at what the project does.
 */
export function ProjectPreview({ project }: { project: Project }) {
  const color = accentHex[project.accent];

  if (project.screenshot) {
    return (
      <img
        src={project.screenshot}
        alt={`${project.title} screenshot`}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-60" />
      <div
        className="absolute -inset-1/4 opacity-40 blur-3xl"
        style={{ background: `radial-gradient(circle at 60% 40%, ${color}55, transparent 60%)` }}
      />
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <Diagram kind={project.preview} color={color} />
      </div>
      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full border border-line bg-ink-950/80 px-3 py-1 font-mono text-[10.5px] uppercase tracking-wider text-fg-muted">
        <ImageOff size={12} aria-hidden="true" />
        Preview placeholder · screenshot coming
      </div>
    </div>
  );
}

function Diagram({ kind, color }: { kind: Project['preview']; color: string }) {
  const reduce = useReducedMotion();
  const pulse = reduce
    ? {}
    : { animate: { opacity: [0.35, 1, 0.35] }, transition: { duration: 2.4, repeat: Infinity } };

  const box = 'rounded-lg border border-line bg-ink-900/80 px-3 py-2 font-mono text-[11px] text-fg-muted';

  if (kind === 'flow') {
    const steps = ['Report', 'Match', 'Compare', 'Book', 'Track'];
    return (
      <div className="flex flex-wrap items-center justify-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <motion.div
              className={box}
              {...(reduce ? {} : { animate: { borderColor: ['rgba(148,170,210,.12)', color, 'rgba(148,170,210,.12)'] }, transition: { duration: 5, repeat: Infinity, delay: i } })}
            >
              {s}
            </motion.div>
            {i < steps.length - 1 && <span className="text-fg-dim">→</span>}
          </div>
        ))}
      </div>
    );
  }

  if (kind === 'booking') {
    return (
      <div className="w-full max-w-[300px] space-y-3">
        <div className="flex gap-1.5 font-mono text-[10px] text-fg-dim">
          {['AR', 'HE', 'EN'].map((l, i) => (
            <span key={l} className={`rounded px-2 py-0.5 ${i === 0 ? 'text-white' : 'border border-line'}`} style={i === 0 ? { background: color } : {}}>
              {l}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {Array.from({ length: 12 }, (_, i) => (
            <motion.div
              key={i}
              className="h-7 rounded-md border border-line bg-ink-900/80"
              style={i === 6 ? { background: `${color}40`, borderColor: color } : {}}
              {...(i === 6 ? pulse : {})}
            />
          ))}
        </div>
        <div className={box}>Appointment · 14:30 · confirmed</div>
      </div>
    );
  }

  if (kind === 'shop') {
    return (
      <div className="grid w-full max-w-[300px] grid-cols-3 gap-2">
        {['250g', '500g', '1kg'].map((wgt, i) => (
          <div key={wgt} className="rounded-lg border border-line bg-ink-900/80 p-2">
            <div className="mb-2 aspect-square rounded-md" style={{ background: `linear-gradient(135deg, ${color}30, transparent)` }} />
            <div className="font-mono text-[10px] text-fg-muted">{wgt}</div>
            <motion.div className="mt-1 h-1 rounded-full" style={{ background: color }} {...(i === 1 ? pulse : { style: { background: color, opacity: 0.3 } })} />
          </div>
        ))}
        <div className={`${box} col-span-3 flex justify-between`}>
          <span>Cart</span>
          <span>3 items</span>
        </div>
      </div>
    );
  }

  if (kind === 'classes') {
    return (
      <div className="flex flex-col items-center gap-3 font-mono text-[11px]">
        <div className={box} style={{ borderColor: color, color: '#E8EDF6' }}>
          «singleton» RescueAuthority
        </div>
        <span className="text-fg-dim">│</span>
        <div className={box}>«abstract» Responder</div>
        <div className="flex gap-2">
          {['Medic', 'Drone', 'Team'].map((c) => (
            <motion.div key={c} className={box} {...pulse}>
              {c}
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // pipeline
  const nodes = ['Articles', 'PostgreSQL', 'MindsDB · LLM', 'Charts'];
  return (
    <div className="flex w-full max-w-[340px] flex-col gap-2">
      {nodes.map((n, i) => (
        <div key={n} className="flex items-center gap-3">
          <span className="w-4 font-mono text-[10px] text-fg-dim">{i + 1}</span>
          <motion.div
            className={`${box} flex-1`}
            {...(reduce ? {} : { animate: { x: [0, 6, 0] }, transition: { duration: 3, repeat: Infinity, delay: i * 0.4 } })}
            style={i === 2 ? { borderColor: color, color: '#E8EDF6' } : {}}
          >
            {n}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
