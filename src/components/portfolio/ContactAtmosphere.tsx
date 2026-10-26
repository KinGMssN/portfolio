import type { CSSProperties } from "react";

const petals = [
  ["3%", "16s", "-7s", "0.9rem", "petal-pink", "96px", "510deg", "8%", "foreground"],
  ["11%", "25s", "-15s", "0.54rem", "petal-ice", "-72px", "340deg", "78%", "background"],
  ["20%", "20s", "-4s", "0.68rem", "petal-blush", "84px", "450deg", "38%", "midground"],
  ["32%", "23s", "-19s", "0.46rem", "petal-pink", "-92px", "380deg", "91%", "background"],
  ["42%", "18s", "-11s", "0.82rem", "petal-blush", "110px", "540deg", "18%", "foreground"],
  ["55%", "27s", "-2s", "0.5rem", "petal-ice", "-70px", "410deg", "65%", "background"],
  ["65%", "21s", "-17s", "0.72rem", "petal-pink", "90px", "490deg", "44%", "midground"],
  ["77%", "19s", "-9s", "0.98rem", "petal-blush", "-112px", "570deg", "12%", "foreground"],
  ["88%", "26s", "-22s", "0.48rem", "petal-pink", "78px", "360deg", "84%", "background"],
  ["97%", "22s", "-5s", "0.76rem", "petal-ice", "-88px", "470deg", "51%", "midground"],
  ["27%", "29s", "-25s", "0.62rem", "petal-pink", "66px", "420deg", "58%", "background"],
  ["71%", "24s", "-13s", "0.58rem", "petal-blush", "-82px", "520deg", "72%", "background"],
] as const;

const dataParticles = [
  ["15%", "21s", "-12s", "particle-ice", "120px", "51%"],
  ["45%", "26s", "-23s", "particle-pink", "-96px", "14%"],
  ["80%", "24s", "-6s", "particle-ice", "110px", "84%"],
] as const;

export function ContactAtmosphere() {
  return (
    <div className="contact-atmosphere" aria-hidden="true">
      <div className="contact-atmosphere-glow" />
      <svg className="contact-network" viewBox="0 0 1000 700" preserveAspectRatio="none">
        <path
          className="contact-network-line contact-network-line-one"
          d="M 0 150 H 165 L 226 213 H 335"
        />
        <path
          className="contact-network-line contact-network-line-two"
          d="M 1000 95 H 854 L 804 145 H 714"
        />
        <path
          className="contact-network-line contact-network-line-three"
          d="M 0 578 H 114 L 176 516 H 246"
        />
        <path
          className="contact-network-line contact-network-line-four"
          d="M 1000 530 H 882 L 830 582 H 738"
        />
        <path
          className="contact-network-runner contact-network-runner-one"
          d="M 0 150 H 165 L 226 213 H 335"
        />
        <path
          className="contact-network-runner contact-network-runner-two"
          d="M 1000 95 H 854 L 804 145 H 714"
        />
        <path
          className="contact-network-runner contact-network-runner-three"
          d="M 0 578 H 114 L 176 516 H 246"
        />
        <path
          className="contact-network-runner contact-network-runner-four"
          d="M 1000 530 H 882 L 830 582 H 738"
        />
        {[165, 226, 335, 854, 804, 714, 114, 176, 246, 882, 830, 738].map((x, index) => (
          <circle
            className="contact-network-node"
            key={x}
            cx={x}
            cy={[150, 213, 213, 95, 145, 145, 578, 516, 516, 530, 582, 582][index]}
            r={index % 3 === 0 ? 2.1 : 1.35}
          />
        ))}
      </svg>
      {petals.map(([left, duration, delay, size, tone, drift, rotation, top, depth], index) => (
        <span
          key={`contact-petal-${index}`}
          className={`contact-petal ${tone} contact-petal-${depth}`}
          style={
            {
              "--contact-left": left,
              "--contact-duration": duration,
              "--contact-delay": delay,
              "--contact-size": size,
              "--contact-drift": drift,
              "--contact-rotation": rotation,
              "--contact-top": top,
              "--contact-index": index,
            } as CSSProperties
          }
        />
      ))}
      {dataParticles.map(([left, duration, delay, tone, drift, top], index) => (
        <span
          key={`contact-data-${index}`}
          className={`contact-data-particle ${tone}`}
          style={
            {
              "--contact-left": left,
              "--contact-duration": duration,
              "--contact-delay": delay,
              "--contact-drift": drift,
              "--contact-top": top,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
