export const MOBILE_BREAKPOINT = 768;

export type MotionTier = "full" | "reduced";

export interface MotionEnvironment {
  tier: MotionTier;
  isMobile: boolean;
  scrollBehavior: ScrollBehavior;
}

interface MotionSignals {
  viewportWidth: number;
  hasCoarsePointer: boolean;
  prefersReducedMotion: boolean;
}

const FALLBACK_MOTION_ENVIRONMENT: MotionEnvironment = {
  tier: "full",
  isMobile: false,
  scrollBehavior: "smooth",
};

export function getMotionEnvironment({
  viewportWidth,
  hasCoarsePointer,
  prefersReducedMotion,
}: MotionSignals): MotionEnvironment {
  const isMobile = viewportWidth < MOBILE_BREAKPOINT && hasCoarsePointer;
  const tier: MotionTier = prefersReducedMotion || isMobile ? "reduced" : "full";

  return {
    tier,
    isMobile,
    scrollBehavior: tier === "reduced" ? "auto" : "smooth",
  };
}

export function detectMotionEnvironment(): MotionEnvironment {
  if (typeof window === "undefined") {
    return FALLBACK_MOTION_ENVIRONMENT;
  }

  return getMotionEnvironment({
    viewportWidth: window.innerWidth,
    hasCoarsePointer: window.matchMedia("(pointer: coarse)").matches,
    prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  });
}

export function readBootstrappedMotionEnvironment(): MotionEnvironment {
  if (typeof document === "undefined") {
    return FALLBACK_MOTION_ENVIRONMENT;
  }

  const { motionTier, isMobile } = document.documentElement.dataset;
  const tier: MotionTier = motionTier === "reduced" ? "reduced" : "full";
  const mobile = isMobile === "true";

  return {
    tier,
    isMobile: mobile,
    scrollBehavior: tier === "reduced" ? "auto" : "smooth",
  };
}

export function syncMotionEnvironmentToDocument(environment: MotionEnvironment) {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.dataset.motionTier = environment.tier;
  document.documentElement.dataset.isMobile = String(environment.isMobile);
}

export function scrollToSelector(selector: string, behavior: ScrollBehavior) {
  document.querySelector(selector)?.scrollIntoView({ behavior });
}

export const DEFAULT_MOTION_ENVIRONMENT = FALLBACK_MOTION_ENVIRONMENT;
