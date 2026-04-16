import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { MotionTierProvider } from "@/components/MotionTierProvider";
import SectionReveal from "@/components/SectionReveal";
import type { MotionEnvironment } from "@/lib/motion-tier";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className }: { children: ReactNode; className?: string }) => (
      <div data-testid="motion-div" className={className}>
        {children}
      </div>
    ),
  },
  useReducedMotion: () => false,
}));

const fullMotionEnvironment: MotionEnvironment = {
  tier: "full",
  isMobile: false,
  scrollBehavior: "smooth",
};

const reducedMotionEnvironment: MotionEnvironment = {
  tier: "reduced",
  isMobile: true,
  scrollBehavior: "auto",
};

const renderReveal = (value: MotionEnvironment) =>
  render(
    <MotionTierProvider value={value}>
      <SectionReveal animate className="sample">
        <span>Reveal Content</span>
      </SectionReveal>
    </MotionTierProvider>
  );

describe("SectionReveal", () => {
  it("renders static content in reduced mode", () => {
    renderReveal(reducedMotionEnvironment);

    expect(screen.queryByTestId("motion-div")).not.toBeInTheDocument();
    expect(screen.getByText("Reveal Content")).toBeInTheDocument();
  });

  it("renders the motion wrapper in full mode", () => {
    renderReveal(fullMotionEnvironment);

    expect(screen.getByTestId("motion-div")).toBeInTheDocument();
  });
});
