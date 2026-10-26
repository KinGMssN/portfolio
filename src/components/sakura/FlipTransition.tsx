import { useEffect, useRef, useState } from "react";
import { SakuraScene } from "./SakuraScene";
import { petalState } from "./Petals";

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Sticky, scroll-driven section. The light scene is cut into a grid of tiles
 * that flip in a diagonal stagger to reveal the dark world behind.
 */
export function FlipTransition() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const shade = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState({ cols: 6, rows: 4 });

  useEffect(() => {
    const set = () => setGrid(window.innerWidth < 700 ? { cols: 3, rows: 6 } : window.innerWidth < 1100 ? { cols: 5, rows: 4 } : { cols: 7, rows: 4 });
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);

  useEffect(() => {
    let raf = 0;
    const tiles = () => Array.from(stage.current?.querySelectorAll<HTMLElement>("[data-tile]") ?? []);
    const update = () => {
      raf = 0;
      const el = section.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = clamp(-r.top / total);

      // Stage 1: petals speed up, scene sinks back and darkens
      const s1 = clamp(p / 0.2);
      const pastEnd = r.bottom < window.innerHeight * 0.6;
      petalState.speed = 1 + s1 * 5;
      petalState.opacity = r.top > 0 ? 1 : pastEnd ? 0 : 1 - clamp((p - 0.55) / 0.3);
      if (shade.current) shade.current.style.opacity = String(s1 * 0.2);
      if (stage.current) stage.current.style.transform = `scale(${1 - s1 * 0.06})`;

      // Stage 2–3: staggered diagonal flips
      const { cols, rows } = grid;
      for (const t of tiles()) {
        const c = Number(t.dataset["c"]), rr = Number(t.dataset["r"]);
        const order = (c + rr) / (cols + rows - 2);
        const tp = ease(clamp((p - 0.18 - order * 0.5) / 0.28));
        const lift = Math.sin(tp * Math.PI);
        t.style.transform = `translateZ(${lift * 120}px) rotateY(${tp * 180}deg) rotateX(${lift * 8}deg)`;
        t.style.boxShadow = lift > 0.05 ? `0 ${30 * lift}px ${60 * lift}px -20px rgb(0 0 0 / ${0.6 * lift})` : "none";
      }
      // Stage 4: settle
      if (stage.current) stage.current.style.opacity = p > 0.97 ? "0" : "1";
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [grid]);

  const { cols, rows } = grid;
  return (
    <section ref={section} aria-label="Transition into the portfolio" className="relative h-[320vh] bg-void">
      <div className="sticky top-0 h-svh overflow-hidden bg-void">
        <div ref={stage} className="tile-scene absolute inset-0 grid origin-center transition-opacity duration-500"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>
          {Array.from({ length: cols * rows }, (_, i) => {
            const c = i % cols, r = Math.floor(i / cols);
            return (
              <div key={`${cols}-${i}`} data-tile data-c={c} data-r={r} className="tile">
                <div className="tile-face">
                  <div className="absolute" style={{ left: `${-c * 100}%`, top: `${-r * 100}%`, width: `${cols * 100}%`, height: `${rows * 100}%` }}>
                    <div className="pointer-events-none origin-top-left" style={{ width: "100vw" }}>
                      <SakuraScene decorative />
                    </div>
                  </div>
                </div>
                <div className="tile-face tile-back" />
              </div>
            );
          })}
        </div>
        <div ref={shade} className="pointer-events-none absolute inset-0 bg-void opacity-0" />
      </div>
    </section>
  );
}
