import { useEffect, useRef } from 'react';

/**
 * A lightweight 2D-canvas particle network with a slow 3D rotation.
 * Chosen over Three.js: same look for a fraction of the bundle size.
 * Nodes near the pointer brighten and connect to it.
 */
export function ParticleField({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;
    const pointer = { x: -9999, y: -9999 };

    // Points distributed on a sphere (Fibonacci lattice) + some inner noise.
    const COUNT = window.innerWidth < 700 ? 90 : 160;
    const pts = Array.from({ length: COUNT }, (_, i) => {
      const t = i / COUNT;
      const inc = Math.acos(1 - 2 * t);
      const az = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 0.75 + Math.random() * 0.25;
      return {
        x: Math.sin(inc) * Math.cos(az) * r,
        y: Math.sin(inc) * Math.sin(az) * r,
        z: Math.cos(inc) * r,
        cyan: Math.random() < 0.18,
      };
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = pointer.y = -9999;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    // Pause when hero is offscreen.
    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
      if (running && !reduce) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);

    let angle = 0.6;
    const tilt = 0.35;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.42;
      const cx = w * 0.5;
      const cy = h * 0.5;
      const ca = Math.cos(angle);
      const sa = Math.sin(angle);
      const ct = Math.cos(tilt);
      const st = Math.sin(tilt);

      const proj = pts.map((p) => {
        const x1 = p.x * ca - p.z * sa;
        const z1 = p.x * sa + p.z * ca;
        const y1 = p.y * ct - z1 * st;
        const z2 = p.y * st + z1 * ct;
        const persp = 1 / (1.9 - z2);
        return { sx: cx + x1 * R * persp * 1.4, sy: cy + y1 * R * persp * 1.4, z: z2, cyan: p.cyan };
      });

      const maxD = R * 0.36;
      for (let i = 0; i < proj.length; i++) {
        const a = proj[i];
        for (let j = i + 1; j < proj.length; j++) {
          const b = proj[j];
          const dx = a.sx - b.sx;
          const dy = a.sy - b.sy;
          const d = Math.hypot(dx, dy);
          if (d < maxD) {
            const depth = (a.z + b.z + 2) / 4;
            ctx.strokeStyle = `rgba(91,155,255,${(1 - d / maxD) * 0.22 * depth})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.stroke();
          }
        }
        const pd = Math.hypot(a.sx - pointer.x, a.sy - pointer.y);
        if (pd < 150) {
          ctx.strokeStyle = `rgba(34,211,238,${(1 - pd / 150) * 0.5})`;
          ctx.beginPath();
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
      }

      for (const p of proj) {
        const depth = (p.z + 1) / 2;
        const near = Math.hypot(p.sx - pointer.x, p.sy - pointer.y) < 150;
        const size = 0.8 + depth * 1.8 + (near ? 1 : 0);
        ctx.fillStyle = p.cyan
          ? `rgba(103,232,249,${0.35 + depth * 0.6})`
          : `rgba(156,194,255,${0.25 + depth * 0.65})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, size, 0, Math.PI * 2);
        ctx.fill();
      }

      angle += 0.0016;
      if (running && !reduce) raf = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
