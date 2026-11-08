import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import type { ReactNode } from 'react';
import { useRef } from 'react';

type Common = {
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  className?: string;
};

type AsLink = Common & { href: string; external?: boolean; disabled?: never; onClick?: never; title?: string };
type AsButton = Common & { href?: undefined; onClick?: () => void; disabled?: boolean; title?: string };

const styles = {
  primary:
    'bg-electric text-white shadow-[0_10px_40px_-12px_rgba(59,130,246,0.8)] hover:bg-electric-bright border border-electric-bright/40',
  ghost: 'glass text-fg hover:border-electric/50',
};

/** A button or link that leans gently toward the cursor. */
export function MagneticButton(props: AsLink | AsButton) {
  const { children, variant = 'primary', className = '' } = props;
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-medium transition-colors duration-200 ${styles[variant]} ${className}`;

  if (props.href !== undefined) {
    return (
      <motion.a
        ref={(el) => (ref.current = el)}
        href={props.href}
        title={props.title}
        {...(props.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        style={{ x, y }}
        onPointerMove={onMove}
        onPointerLeave={reset}
        className={base}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={(el) => (ref.current = el)}
      type="button"
      onClick={props.onClick}
      disabled={props.disabled}
      title={props.title}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`${base} disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {children}
    </motion.button>
  );
}
