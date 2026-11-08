import { useEffect } from 'react';

/** Writes the pointer position to CSS variables (--mx / --my) on <html>. */
export function useSpotlight() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const root = document.documentElement;
        root.style.setProperty('--mx', `${e.clientX}px`);
        root.style.setProperty('--my', `${e.clientY}px`);
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);
}

/** Pointer handler that sets --cx / --cy on the hovered card for a local glow. */
export function trackCardGlow(e: React.PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--cx', `${e.clientX - r.left}px`);
  el.style.setProperty('--cy', `${e.clientY - r.top}px`);
}
