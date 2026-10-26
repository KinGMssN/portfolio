import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { projects } from "@/content/portfolio";
import { ProjectCard, type PortfolioProject } from "./ProjectCard";

afterEach(cleanup);

const project: PortfolioProject = {
  title: "Sample Analysis",
  year: "2025",
  tags: ["SQL", "Retail"],
  summary: "A short project summary.",
  detail: "More details about the analysis.",
};

describe("ProjectCard", () => {
  it("previews on mouse hover and closes when the pointer leaves", () => {
    render(<ProjectCard project={project} index={0} isLocked={false} onLock={vi.fn()} />);
    const card = screen.getByRole("button", { name: /reveal project 1/i });

    fireEvent.pointerEnter(card.parentElement!, { pointerType: "mouse" });
    expect(card).toHaveAttribute("aria-expanded", "true");

    fireEvent.pointerLeave(card.parentElement!, { pointerType: "mouse" });
    expect(card).toHaveAttribute("aria-expanded", "false");
  });

  it("locks on click, toggles closed, and does not reopen from the same hover", () => {
    const onLock = vi.fn();
    const { rerender } = render(
      <ProjectCard project={project} index={0} isLocked={false} onLock={onLock} />,
    );
    const card = screen.getByRole("button", { name: /reveal project 1/i }).parentElement!;
    const cover = screen.getByRole("button", { name: /reveal project 1/i });

    fireEvent.pointerEnter(card, { pointerType: "mouse" });
    fireEvent.click(cover);
    expect(onLock).toHaveBeenLastCalledWith(true);
    rerender(<ProjectCard project={project} index={0} isLocked onLock={onLock} />);
    expect(screen.getByRole("button", { name: /close project 1/i })).toHaveAttribute(
      "aria-expanded",
      "true",
    );

    fireEvent.click(screen.getByRole("button", { name: /close project 1/i }));
    rerender(<ProjectCard project={project} index={0} isLocked={false} onLock={onLock} />);
    expect(screen.getByRole("button", { name: /reveal project 1/i })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("supports Escape to close and keeps details unavailable while concealed", () => {
    const onLock = vi.fn();
    render(<ProjectCard project={project} index={0} isLocked onLock={onLock} />);
    const cover = screen.getByRole("button", { name: /close project 1/i });
    const details = document.getElementById("project-details-1");

    expect(details).toHaveAttribute("aria-hidden", "false");
    fireEvent.keyDown(cover, { key: "Escape" });
    expect(onLock).toHaveBeenLastCalledWith(false);

    cleanup();
    render(<ProjectCard project={project} index={0} isLocked={false} onLock={onLock} />);
    expect(document.getElementById("project-details-1")).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("link", { name: /view on github/i })).not.toBeInTheDocument();
  });

  it("shows only a supplied repository link with safe external-link attributes", () => {
    render(
      <ProjectCard
        project={{ ...project, githubUrl: "https://github.com/example/sample" }}
        index={0}
        isLocked
        onLock={vi.fn()}
      />,
    );

    const link = screen.getByRole("link", { name: /view on github/i });
    expect(link).toHaveAttribute("href", "https://github.com/example/sample");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("links every portfolio project to its matching GitHub repository", () => {
    const expectedRepositories = [
      "https://github.com/KinGMssN/Zepto-Retail-Data-Analysis",
      "https://github.com/KinGMssN/Blinkit-Sales-Analysis",
      "https://github.com/KinGMssN/Sales-Data-Cleaning-Modeling",
    ];

    projects.forEach((portfolioProject, index) => {
      const { unmount } = render(
        <ProjectCard project={portfolioProject} index={index} isLocked onLock={vi.fn()} />,
      );

      expect(screen.getByRole("link", { name: /view on github/i })).toHaveAttribute(
        "href",
        expectedRepositories[index],
      );
      unmount();
    });
  });
});
