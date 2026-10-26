import type { PointerEvent } from "react";

type EducationQualification = {
  degree: string;
  institution: string;
  mode: string;
  modeLabel: string;
  duration: string;
  number: string;
};

export function EducationCard({
  qualification,
  reversed = false,
}: {
  qualification: EducationQualification;
  reversed?: boolean;
}) {
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--education-pointer-x",
      `${((event.clientX - bounds.left) / bounds.width) * 100}%`,
    );
    event.currentTarget.style.setProperty(
      "--education-pointer-y",
      `${((event.clientY - bounds.top) / bounds.height) * 100}%`,
    );
  };

  const clearPointerPosition = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.removeProperty("--education-pointer-x");
    event.currentTarget.style.removeProperty("--education-pointer-y");
  };

  return (
    <article
      className={`education-card${reversed ? " education-card-reversed" : ""}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={clearPointerPosition}
    >
      <span className="education-card-number" aria-hidden="true">
        {qualification.number}
      </span>
      {reversed && (
        <svg
          className="education-card-art education-card-art-circuit"
          viewBox="0 0 150 110"
          aria-hidden="true"
        >
          <path d="M12 88h37l19-19h24l15-15h31M30 107V76l20-20h22l13-13h28M73 20v22m40-30v22" />
          <circle cx="49" cy="88" r="3" />
          <circle cx="92" cy="69" r="2.5" />
          <circle cx="138" cy="54" r="2.5" />
          <circle cx="73" cy="42" r="2" />
          <circle cx="113" cy="12" r="2" />
        </svg>
      )}
      <div className="education-card-copy">
        <p className="education-card-kicker">QUALIFICATION / {qualification.number}</p>
        <h3 className="education-card-degree">{qualification.degree}</h3>
        <p className="education-card-institution">{qualification.institution}</p>
        <div className="education-card-footer">
          <span className="education-card-mode-badge">{qualification.modeLabel}</span>
          <span className="education-card-duration">{qualification.duration}</span>
        </div>
      </div>
      <span className="education-card-mode-rail" aria-label={`Study mode: ${qualification.mode}`}>
        {qualification.mode}
      </span>
    </article>
  );
}
