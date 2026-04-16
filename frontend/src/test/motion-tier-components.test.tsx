import type { ReactElement } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Footer from "@/components/Footer";
import { MotionTierProvider } from "@/components/MotionTierProvider";
import Index from "@/pages/Index";
import type { MotionEnvironment } from "@/lib/motion-tier";

const reducedMotionEnvironment: MotionEnvironment = {
  tier: "reduced",
  isMobile: true,
  scrollBehavior: "auto",
};

const renderWithMotionTier = (ui: ReactElement, value = reducedMotionEnvironment) =>
  render(<MotionTierProvider value={value}>{ui}</MotionTierProvider>);

afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

describe("mobile motion tier components", () => {
  it("does not render the star field canvas in reduced mode", () => {
    renderWithMotionTier(<Index />);

    expect(screen.queryByTestId("starfield-canvas")).not.toBeInTheDocument();
  });

  it("uses auto scrolling for quick links in reduced mode", () => {
    const target = document.createElement("section");
    target.id = "home";
    target.scrollIntoView = vi.fn();
    document.body.appendChild(target);

    renderWithMotionTier(<Footer />);
    fireEvent.click(screen.getByRole("button", { name: "Home" }));

    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: "auto" });
  });
});
