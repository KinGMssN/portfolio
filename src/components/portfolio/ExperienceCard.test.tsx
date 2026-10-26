import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ExperienceCard } from "./ExperienceCard";

afterEach(cleanup);

const organization = {
  name: "FYFP",
  fullName: "For the Youth For the People",
  role: "Media SPOC",
  duration: "2026 – Present",
  description: "Handles the organization's social media accounts and digital presence.",
};

describe("ExperienceCard", () => {
  it("shows the organization's active dates", () => {
    render(<ExperienceCard organization={organization} index={0} />);

    expect(screen.getByText("PERIOD")).toBeInTheDocument();
    expect(screen.getByText("2026 – Present")).toBeInTheDocument();
  });

  it("reveals responsibilities on request and provides a close control", () => {
    render(<ExperienceCard organization={organization} index={0} />);

    const toggle = screen.getByRole("button", { name: /explore contribution/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText(organization.description).parentElement).toHaveAttribute(
      "aria-hidden",
      "true",
    );

    fireEvent.click(toggle);
    expect(screen.getByRole("button", { name: /close details/i })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByText(organization.description).parentElement).toHaveAttribute(
      "aria-hidden",
      "false",
    );

    fireEvent.click(screen.getByRole("button", { name: /close details/i }));
    expect(screen.getByRole("button", { name: /explore contribution/i })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
});
