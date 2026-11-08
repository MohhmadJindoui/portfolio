import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

/** Cycles through roles with a vertical slide. */
export function RoleTicker({ roles }: { roles: string[] }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % roles.length), 2600);
    return () => window.clearInterval(id);
  }, [roles.length, reduce]);

  return (
    <div className="glass inline-flex items-center gap-3 rounded-full py-1.5 pl-2 pr-4 text-sm">
      <span className="relative flex h-2 w-2 ml-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-glow opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-glow" />
      </span>
      <span className="font-mono text-[12px] text-fg-dim">role:</span>
      <span className="relative inline-block h-5 min-w-[11.5rem] overflow-hidden" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={roles[i]}
            className="absolute left-0 top-0 whitespace-nowrap font-medium text-fg"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {roles[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}
