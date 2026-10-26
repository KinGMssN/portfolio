import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { EducationCard } from "./EducationCard";

afterEach(cleanup);

const qualifications = [
  {
    degree: "BS in Data Science",
    institution: "Indian Institute of Technology Madras",
    mode: "Hybrid",
    modeLabel: "Hybrid Learning",
    duration: "2025 – Present",
    number: "01",
  },
  {
    degree: "B.Tech in Computer Science and Engineering (CSE)",
    institution: "MVGR College of Engineering",
    mode: "Full-Time",
    modeLabel: "Full-Time",
    duration: "2025 – Present",
    number: "02",
  },
];

describe("EducationCard", () => {
  it("shows the supplied qualifications and study details", () => {
    qualifications.forEach((qualification) => {
      const { container, unmount } = render(<EducationCard qualification={qualification} />);
      expect(screen.getByRole("heading", { name: qualification.degree })).toBeInTheDocument();
      expect(screen.getByText(qualification.institution)).toBeInTheDocument();
      expect(container.querySelector(".education-card-mode-badge")).toHaveTextContent(
        qualification.modeLabel,
      );
      expect(screen.getByText(qualification.duration)).toBeInTheDocument();
      expect(screen.getByLabelText(`Study mode: ${qualification.mode}`)).toBeInTheDocument();
      unmount();
    });
  });

  it("supports alternating number placement", () => {
    const { container } = render(<EducationCard qualification={qualifications[1]} reversed />);

    expect(container.querySelector(".education-card")).toHaveClass("education-card-reversed");
    expect(container.querySelector(".education-card-art-circuit")).toBeInTheDocument();
    expect(container.querySelector(".education-card-art-sakura")).not.toBeInTheDocument();
  });

  it("omits the sakura blossom decoration", () => {
    const { container } = render(<EducationCard qualification={qualifications[0]} />);

    expect(container.querySelector(".education-card-art-sakura")).not.toBeInTheDocument();
  });
});
