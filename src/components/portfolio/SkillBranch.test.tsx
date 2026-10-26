import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SkillBranch, type SkillCategory } from "./SkillBranch";

afterEach(cleanup);

function makeSkills(count: number): SkillCategory[] {
  return Array.from({ length: count }, (_, index) => ({
    name: `Category ${index + 1}`,
    items: [`Skill ${index + 1}`],
  }));
}

function setViewportWidth(width: number) {
  Object.defineProperty(window, "innerWidth", { configurable: true, value: width });
}

describe("SkillBranch", () => {
  it.each([
    { count: 3, width: 1440, rows: [2, 1] },
    { count: 6, width: 1440, rows: [2, 2, 2] },
    { count: 8, width: 1440, rows: [2, 2, 2, 2] },
    { count: 5, width: 900, rows: [2, 2, 1] },
    { count: 5, width: 390, rows: [2, 2, 1] },
    { count: 5, width: 320, rows: [1, 1, 1, 1, 1] },
  ])("lays out $count categories at $width px", ({ count, width, rows }) => {
    setViewportWidth(width);
    const { container } = render(<SkillBranch categories={makeSkills(count)} />);

    expect(
      [...container.querySelectorAll(".skill-branch-row")].map(
        (row) => row.querySelectorAll(".skill-hanger:not(.skill-hanger-blank)").length,
      ),
    ).toEqual(rows);
  });

  it("adds one blank paper to fill the final two-card row", () => {
    setViewportWidth(1440);
    const { container } = render(<SkillBranch categories={makeSkills(5)} />);

    expect(container.querySelectorAll(".skill-hanger-blank")).toHaveLength(1);
    const finalRow = container.querySelectorAll(".skill-branch-row")[2];
    expect(finalRow.querySelectorAll(".skill-hanger")).toHaveLength(2);
    expect(finalRow.querySelector(".skill-hanger-blank")).toBeInTheDocument();
  });

  it("keeps the two branch pulses and sparse sakura atmosphere", () => {
    setViewportWidth(1440);
    const { container } = render(<SkillBranch categories={makeSkills(5)} />);

    expect(container.querySelectorAll(".skill-branch-row")).toHaveLength(3);
    expect(container.querySelectorAll(".skill-sap-pulse")).toHaveLength(3);
    expect(container.querySelectorAll(".skill-ambient-petal")).toHaveLength(6);
    expect(container.querySelector(".skill-ambient")).toHaveAttribute("aria-hidden", "true");
  });

  it("adds a filler only when a multi-column row has an open slot", () => {
    setViewportWidth(390);
    const { container, unmount } = render(<SkillBranch categories={makeSkills(5)} />);

    expect(container.querySelectorAll(".skill-hanger-blank")).toHaveLength(1);
    expect(
      [...container.querySelectorAll(".skill-branch-row")].map(
        (row) => row.querySelectorAll(".skill-hanger").length,
      ),
    ).toEqual([2, 2, 2]);

    unmount();
    setViewportWidth(320);
    const singleColumn = render(<SkillBranch categories={makeSkills(5)} />);
    expect(singleColumn.container.querySelectorAll(".skill-hanger-blank")).toHaveLength(0);
  });

  it("opens a readable dialog and restores focus and scrolling when closed", () => {
    setViewportWidth(1440);
    render(<SkillBranch categories={makeSkills(3)} />);

    const card = screen.getByRole("button", { name: "Category 1: Skill 1" });
    expect(card).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(card);
    expect(card).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("dialog", { name: "Category 1" })).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toHaveTextContent("Skill 1");
    expect(document.body.style.overflow).toBe("hidden");
    expect(screen.getByRole("button", { name: "Close expanded skill card" })).toHaveFocus();

    fireEvent.click(document.body.querySelector(".skill-expanded-backdrop")!);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
    expect(card).toHaveFocus();
    expect(card).toHaveAttribute("aria-expanded", "false");
  });

  it("closes with Escape and can expand another skill card", () => {
    setViewportWidth(1440);
    render(<SkillBranch categories={makeSkills(3)} />);

    fireEvent.click(screen.getByRole("button", { name: "Category 1: Skill 1" }));
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    const secondCard = screen.getByRole("button", { name: "Category 2: Skill 2" });
    fireEvent.click(secondCard);
    expect(screen.getByRole("dialog", { name: "Category 2" })).toHaveTextContent("Skill 2");
  });
});
