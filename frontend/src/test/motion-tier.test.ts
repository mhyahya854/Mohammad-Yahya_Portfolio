import { afterEach, describe, expect, it, vi } from "vitest";
import { detectMotionEnvironment } from "@/lib/motion-tier";

const setWindowWidth = (width: number) => {
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    writable: true,
    value: width,
  });
};

const setMatchMedia = (matchesByQuery: Record<string, boolean>) => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: matchesByQuery[query] ?? false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }));
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("detectMotionEnvironment", () => {
  it("uses the full tier on desktop with normal motion", () => {
    setWindowWidth(1280);
    setMatchMedia({
      "(pointer: coarse)": false,
      "(prefers-reduced-motion: reduce)": false,
    });

    expect(detectMotionEnvironment()).toEqual({
      tier: "full",
      isMobile: false,
      scrollBehavior: "smooth",
    });
  });

  it("uses the reduced tier on phone-sized coarse pointer devices", () => {
    setWindowWidth(390);
    setMatchMedia({
      "(pointer: coarse)": true,
      "(prefers-reduced-motion: reduce)": false,
    });

    expect(detectMotionEnvironment()).toEqual({
      tier: "reduced",
      isMobile: true,
      scrollBehavior: "auto",
    });
  });

  it("uses the reduced tier when the OS prefers reduced motion", () => {
    setWindowWidth(1440);
    setMatchMedia({
      "(pointer: coarse)": false,
      "(prefers-reduced-motion: reduce)": true,
    });

    expect(detectMotionEnvironment()).toEqual({
      tier: "reduced",
      isMobile: false,
      scrollBehavior: "auto",
    });
  });
});
