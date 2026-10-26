import { useState } from "react";

type ExperienceOrganization = {
  name: string;
  fullName: string;
  role: string;
  duration: string;
  description: string;
};

export function ExperienceCard({
  organization,
  index,
}: {
  organization: ExperienceOrganization;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const titleId = `organization-title-${index}`;
  const detailsId = `organization-details-${index}`;

  return (
    <article className="experience-card" aria-labelledby={titleId}>
      <svg
        className="experience-card-border"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect
          x="0.75"
          y="0.75"
          width="98.5"
          height="98.5"
          rx="2"
          pathLength="100"
          className="experience-card-trace"
        />
      </svg>
      <span className="experience-card-particle" aria-hidden="true" />
      <span className="experience-card-node experience-card-node-one" aria-hidden="true" />
      <span className="experience-card-node experience-card-node-two" aria-hidden="true" />
      <div className="experience-card-content">
        <div className="experience-card-meta">
          <span>0{index + 1} / COMMUNITY</span>
          <span className="experience-card-spark" aria-hidden="true">
            ✿
          </span>
        </div>
        <h4 id={titleId} className="experience-card-title">
          {organization.name}
        </h4>
        <p className="experience-card-fullname">{organization.fullName}</p>
        <div className="experience-card-role">
          <span>ROLE</span>
          <p>{organization.role}</p>
        </div>
        <div className="experience-card-period">
          <span>PERIOD</span>
          <p>{organization.duration}</p>
        </div>
        <button
          type="button"
          className="experience-card-toggle"
          aria-expanded={expanded}
          aria-controls={detailsId}
          onClick={() => setExpanded((open) => !open)}
        >
          {expanded ? "Close details" : "Explore contribution"}
          <span aria-hidden="true">{expanded ? "−" : "↗"}</span>
        </button>
        <div
          id={detailsId}
          className={`experience-card-details ${expanded ? "is-expanded" : ""}`}
          aria-hidden={!expanded}
        >
          <p className="experience-card-detail-label">RESPONSIBILITY</p>
          <p className="experience-card-description">{organization.description}</p>
        </div>
      </div>
    </article>
  );
}
