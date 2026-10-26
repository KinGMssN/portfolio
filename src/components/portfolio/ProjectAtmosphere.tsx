import { useEffect, useRef, type CSSProperties } from "react";

const petals = [
  ["6%", "9s", "-4s", "0.74rem", "petal-pink", "32px", "170deg", "7%"],
  ["14%", "12s", "-9s", "0.52rem", "petal-blush", "-24px", "240deg", "25%"],
  ["24%", "10s", "-2s", "0.62rem", "petal-ice", "20px", "195deg", "45%"],
  ["36%", "14s", "-11s", "0.48rem", "petal-pink", "-30px", "280deg", "70%"],
  ["48%", "11s", "-6s", "0.7rem", "petal-blush", "27px", "215deg", "88%"],
  ["59%", "13s", "-1s", "0.54rem", "petal-ice", "-22px", "155deg", "16%"],
  ["69%", "9.5s", "-8s", "0.64rem", "petal-pink", "25px", "250deg", "38%"],
  ["79%", "12.5s", "-3s", "0.48rem", "petal-blush", "-28px", "185deg", "62%"],
  ["91%", "10.5s", "-10s", "0.58rem", "petal-pink", "18px", "265deg", "80%"],
] as const;

const particles = [
  ["11%", "18s", "-5s", "particle-ice", "16px", "20%"],
  ["28%", "22s", "-13s", "particle-pink", "-12px", "42%"],
  ["44%", "19s", "-8s", "particle-ice", "11px", "75%"],
  ["63%", "24s", "-17s", "particle-ice", "-18px", "30%"],
  ["86%", "20s", "-3s", "particle-pink", "13px", "62%"],
] as const;

export function ProjectAtmosphere() {
  const atmosphereRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const atmosphere = atmosphereRef.current;
    const section = atmosphere?.closest("section");
    if (!atmosphere || !section) return;

    const observer = new ResizeObserver(() => {
      const sectionStyle = getComputedStyle(section);
      const sectionHeight = section.getBoundingClientRect().height;
      atmosphere.style.inset = `-${sectionStyle.paddingTop} -${sectionStyle.paddingRight} -${sectionStyle.paddingBottom} -${sectionStyle.paddingLeft}`;
      atmosphere.style.setProperty("--project-travel-distance", `${sectionHeight}px`);
    });
    observer.observe(section, { box: "border-box" });
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={atmosphereRef} className="project-atmosphere" aria-hidden="true">
      <div className="project-atmosphere-glow" />
      <div className="project-atmosphere-connections">
        <span />
        <span />
        <span />
      </div>
      {petals.map(([left, duration, delay, size, tone, drift, rotation, staticTop], index) => (
        <span
          key={`petal-${index}`}
          className={`project-atmosphere-petal ${tone}`}
          style={
            {
              "--particle-left": left,
              "--particle-duration": duration,
              "--particle-delay": delay,
              "--particle-size": size,
              "--particle-drift": drift,
              "--particle-rotation": rotation,
              "--particle-static-top": staticTop,
            } as CSSProperties
          }
        />
      ))}
      {particles.map(([left, duration, delay, tone, drift, staticTop], index) => (
        <span
          key={`particle-${index}`}
          className={`project-atmosphere-dot ${tone}`}
          style={
            {
              "--particle-left": left,
              "--particle-duration": duration,
              "--particle-delay": delay,
              "--particle-drift": drift,
              "--particle-static-top": staticTop,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
