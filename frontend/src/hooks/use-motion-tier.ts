import { useContext } from "react";
import { MotionTierContext } from "@/components/MotionTierContext";

export function useMotionTier() {
  return useContext(MotionTierContext);
}
