import { ReactNode, useEffect, useState } from "react";
import {
  detectMotionEnvironment,
  MotionEnvironment,
  readBootstrappedMotionEnvironment,
  syncMotionEnvironmentToDocument,
} from "@/lib/motion-tier";
import { MotionTierContext } from "./MotionTierContext";

interface MotionTierProviderProps {
  children: ReactNode;
  value?: MotionEnvironment;
}

export function MotionTierProvider({ children, value }: MotionTierProviderProps) {
  const [environment, setEnvironment] = useState<MotionEnvironment>(() => {
    if (value) {
      return value;
    }

    return readBootstrappedMotionEnvironment();
  });

  useEffect(() => {
    if (value || typeof window === "undefined") {
      return;
    }

    const reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointerMedia = window.matchMedia("(pointer: coarse)");

    const updateEnvironment = () => {
      const nextEnvironment = detectMotionEnvironment();
      syncMotionEnvironmentToDocument(nextEnvironment);
      setEnvironment(nextEnvironment);
    };

    updateEnvironment();
    window.addEventListener("resize", updateEnvironment);
    reducedMotionMedia.addEventListener("change", updateEnvironment);
    coarsePointerMedia.addEventListener("change", updateEnvironment);

    return () => {
      window.removeEventListener("resize", updateEnvironment);
      reducedMotionMedia.removeEventListener("change", updateEnvironment);
      coarsePointerMedia.removeEventListener("change", updateEnvironment);
    };
  }, [value]);

  if (value) {
    return (
      <MotionTierContext.Provider value={value}>
        {children}
      </MotionTierContext.Provider>
    );
  }

  return (
    <MotionTierContext.Provider value={environment}>
      {children}
    </MotionTierContext.Provider>
  );
}
