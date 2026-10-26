import { useEffect, useRef } from "react";

export const petalState = { speed: 1, opacity: 1 };

type P = { x: number; y: number; s: number; vx: number; vy: number; r: number; vr: number; w: number; hue: number };

/** Lightweight canvas of falling sakura petals. Speed/opacity driven via petalState. */
export function Petals() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const count = reduced ? 12 : w < 700 ? 22 : 40;
    const make = (init: boolean): P => ({
      x: Math.random() * w, y: init ? Math.random() * h : -20,
      s: 6 + Math.random() * 9, vx: 0.2 + Math.random() * 0.6, vy: 0.4 + Math.random() * 0.8,
      r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.03, w: Math.random() * 100, hue: Math.random(),
    });
    const ps = Array.from({ length: count }, () => make(true));

    const draw = (p: P) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.scale(1, 0.6 + 0.4 * Math.sin(p.w));
      ctx.fillStyle = p.hue > 0.5 ? "rgba(225,139,163,0.88)" : "rgba(210,111,140,0.84)";
      ctx.beginPath();
      ctx.moveTo(0, -p.s);
      ctx.bezierCurveTo(p.s, -p.s * 0.6, p.s * 0.7, p.s * 0.7, 0, p.s);
      ctx.bezierCurveTo(-p.s * 0.7, p.s * 0.7, -p.s, -p.s * 0.6, 0, -p.s);
      ctx.fill();
      ctx.restore();
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      canvas.style.opacity = String(petalState.opacity);
      if (petalState.opacity > 0.01) {
        const sp = reduced ? 0.3 : petalState.speed;
        for (const p of ps) {
          p.w += 0.03 * sp;
          p.x += (p.vx + Math.sin(p.w) * 0.5) * sp;
          p.y += p.vy * sp;
          p.r += p.vr * sp;
          if (p.y > h + 20 || p.x > w + 20) Object.assign(p, make(false), { x: Math.random() * w * 1.2 - w * 0.2 });
          draw(p);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-30 h-full w-full" />;
}
