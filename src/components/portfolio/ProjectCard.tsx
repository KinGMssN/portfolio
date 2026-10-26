import { useRef, useState, type PointerEvent, type KeyboardEvent } from "react";
import { Github } from "lucide-react";

export type PortfolioProject = {
  title: string;
  year: string;
  tags: string[];
  summary: string;
  detail: string;
  githubUrl?: string;
};

type ProjectCardProps = {
  project: PortfolioProject;
  index: number;
  isLocked: boolean;
  onLock: (open: boolean) => void;
};

export function ProjectCard({ project, index, isLocked, onLock }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const id = `project-details-${index + 1}`;
  const revealed = isLocked || ((hovered || focused) && !dismissed);

  const dismiss = () => {
    onLock(false);
    setDismissed(true);
    cardRef.current?.focus();
  };

  const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType && event.pointerType !== "mouse") return;
    setHovered(true);
    setDismissed(false);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType && event.pointerType !== "mouse") return;
    setHovered(false);
    setDismissed(false);
  };

  const toggleLock = () => {
    if (isLocked) {
      dismiss();
      return;
    }
    setDismissed(false);
    onLock(true);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" && isLocked) {
      dismiss();
      event.preventDefault();
    }
  };

  return (
    <div
      ref={cardRef}
      tabIndex={-1}
      className={`project-reveal-card${revealed ? " project-reveal-open" : ""}`}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        className="project-reveal-cover"
        aria-expanded={revealed}
        aria-controls={id}
        aria-label={`${isLocked ? "Close" : "Reveal"} project ${index + 1}: ${project.title}`}
        onClick={toggleLock}
        onFocus={() => {
          setFocused(true);
          setDismissed(false);
        }}
        onBlur={() => setFocused(false)}
      >
        <span className="project-cover-index">{String(index + 1).padStart(2, "0")}</span>
        <span className="project-cover-copy">
          <span className="project-cover-title">{project.title}</span>
          <span className="project-cover-tags">{project.tags.join(" · ")}</span>
        </span>
        <span className="project-cover-year">{project.year}</span>
        <span className="project-cover-cue" aria-hidden="true">
          {revealed ? "↗" : "→"}
        </span>
      </button>

      <div id={id} className="project-reveal-details" aria-hidden={!revealed} inert={!revealed}>
        <div className="project-reveal-copy">
          <h3 className="project-reveal-title">{project.title}</h3>
          <p className="project-reveal-summary">{project.summary}</p>
          <p className="project-reveal-description">{project.detail}</p>
          <ul className="project-reveal-tags" aria-label="Technologies">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
        <div className="project-reveal-actions">
          {project.githubUrl && (
            <a
              className="project-github-link"
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
            >
              <Github size={16} aria-hidden="true" />
              View on GitHub
            </a>
          )}
          {isLocked && (
            <button
              type="button"
              className="project-close-button"
              onClick={dismiss}
              aria-label={`Close ${project.title} details`}
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
