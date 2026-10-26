import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ProjectAtmosphere } from "./ProjectAtmosphere";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("ProjectAtmosphere", () => {
  it("renders a hidden, pointer-transparent decorative layer with a restrained particle count", () => {
    vi.stubGlobal(
      "ResizeObserver",
      class {
        observe() {}
        disconnect() {}
      },
    );

    const { container } = render(<ProjectAtmosphere />);
    const atmosphere = container.firstElementChild;

    expect(atmosphere).toHaveAttribute("aria-hidden", "true");
    expect(atmosphere).toHaveClass("project-atmosphere");
    expect(atmosphere?.querySelectorAll(".project-atmosphere-petal")).toHaveLength(9);
    expect(atmosphere?.querySelectorAll(".project-atmosphere-dot")).toHaveLength(5);
  });
});
