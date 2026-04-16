import { useMotionTier } from "@/hooks/use-motion-tier";

export function useIsMobile() {
  return useMotionTier().isMobile;
}
